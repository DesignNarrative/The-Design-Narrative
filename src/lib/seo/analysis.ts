import type { PageContent, Status } from './types';

/* =====================================================================
   SEO + readability analysis engine (pure functions, no server deps).
   Used live in the browser while editing and on the server for audits.
   ===================================================================== */

export interface Check {
  id: string;
  group: 'seo' | 'readability';
  status: Status;
  title: string;
  detail: string;
}

export interface OtherPage {
  key: string;
  label: string;
  title: string;
  description: string;
  keyphrase: string;
}

export interface AnalysisInput {
  selfKey: string;
  path: string;
  keyphrase: string;
  /** The title that will be shown in Google (variables already resolved) */
  title: string;
  description: string;
  content: PageContent;
  others: OtherPage[];
}

export interface AnalysisResult {
  seo: Check[];
  readability: Check[];
  seoScore: number;
  readabilityScore: number;
  wordCount: number;
}

/* ---------- Templates & measurements ---------- */

export function resolveTemplate(
  tpl: string,
  vars: { page: string; sitename: string; sep: string; tagline: string }
): string {
  return tpl
    .replace(/%%page%%/g, vars.page)
    .replace(/%%sitename%%/g, vars.sitename)
    .replace(/%%sep%%/g, vars.sep)
    .replace(/%%tagline%%/g, vars.tagline)
    .replace(/\s+/g, ' ')
    .trim();
}

// Approximate Arial glyph widths (em fractions) to estimate how Google will truncate.
const NARROW = "iljtf.,:;!|'`I()[]";
const WIDE = 'mwMW@';
export function pixelWidth(text: string, fontPx: number): number {
  let em = 0;
  for (const ch of text) {
    if (ch === ' ') em += 0.278;
    else if (NARROW.includes(ch)) em += ch === 'I' ? 0.28 : 0.27;
    else if (WIDE.includes(ch)) em += ch === 'm' ? 0.83 : 0.8;
    else if (/[0-9]/.test(ch)) em += 0.556;
    else if (/[A-Z]/.test(ch)) em += 0.68;
    else if (/[a-z]/.test(ch)) em += 0.52;
    else em += 0.6;
  }
  return Math.round(em * fontPx);
}

export const TITLE_MAX_PX = 580; // Google desktop title ~ 600px, kept safe
export const DESC_MAX_PX = 960;
export const DESC_MAX_PX_MOBILE = 680;

export function truncateToWidth(text: string, fontPx: number, maxPx: number, lines = 1): string {
  const total = maxPx * lines;
  if (pixelWidth(text, fontPx) <= total) return text;
  let out = '';
  for (const word of text.split(' ')) {
    const next = out ? `${out} ${word}` : word;
    if (pixelWidth(`${next}…`, fontPx) > total) break;
    out = next;
  }
  return `${out || text.slice(0, 40)}…`;
}

/* ---------- Text utilities ---------- */

const STOP = new Set(
  'a an and are as at be but by for from has have how i in is it its of on or so that the their this to was we what when where which who why will with you your our us can do does'.split(
    ' '
  )
);

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 4 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 3 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function stems(s: string): string[] {
  return norm(s).split(' ').filter(Boolean).map(stem);
}

/** Does `text` contain the keyphrase (exact phrase, or every meaningful word)? */
export function containsKeyphrase(text: string, kp: string): boolean {
  const t = stems(text);
  const k = stems(kp);
  if (!k.length) return false;
  if (hasSequence(t, k)) return true;
  const content = stems(kp).filter((w) => !STOP.has(w));
  return content.length > 0 && content.every((w) => t.includes(w));
}

function hasSequence(hay: string[], needle: string[]): boolean {
  for (let i = 0; i + needle.length <= hay.length; i++) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) {
      if (hay[i + j] !== needle[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

function countSequence(hay: string[], needle: string[]): number {
  let n = 0;
  for (let i = 0; i + needle.length <= hay.length; ) {
    let ok = true;
    for (let j = 0; j < needle.length; j++) {
      if (hay[i + j] !== needle[j]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      n++;
      i += needle.length;
    } else i++;
  }
  return n;
}

function words(s: string): string[] {
  return s.split(/\s+/).filter(Boolean);
}

function sentencesOf(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“‘(])/)
    .map((s) => s.trim())
    .filter((s) => words(s).length > 1);
}

function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const m = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    .replace(/^y/, '')
    .match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}

const TRANSITIONS = [
  'however', 'therefore', 'because', 'also', 'for example', 'for instance', 'in addition', 'moreover',
  'furthermore', 'meanwhile', 'finally', 'first', 'second', 'third', 'next', 'then', 'after', 'before',
  'while', 'although', 'though', 'but', 'so', 'since', 'as a result', 'in fact', 'indeed', 'instead',
  'similarly', 'likewise', 'consequently', 'thus', 'hence', 'overall', 'in conclusion', 'besides',
  'whereas', 'unless', 'once', 'until', 'whenever', 'in other words', 'that is why', 'for this reason',
  'on the other hand', 'in contrast', 'as well as', 'not only', 'together', 'ultimately', 'especially',
];

const PASSIVE =
  /\b(is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|built|made|done|given|taken|seen|known|written|chosen|found|shown|kept|sold|held|told|brought|thought|set|run|led|sent|spent|won)\b/i;

/* ---------- The analyzer ---------- */

function pct(n: number, d: number) {
  return d ? Math.round((n / d) * 100) : 0;
}

export function analyze(input: AnalysisInput): AnalysisResult {
  const { content, keyphrase, title, description, path } = input;
  const kp = keyphrase.trim();
  const seo: Check[] = [];
  const add = (
    group: Check['group'],
    id: string,
    status: Status,
    t: string,
    detail: string
  ) => (group === 'seo' ? seo : readability).push({ id, group, status, title: t, detail });
  const readability: Check[] = [];

  const textBlocks = content.blocks.filter((b) => b.type === 'text');
  const headingBlocks = content.blocks.filter((b) => b.type === 'heading');
  const bodyText = content.text || content.blocks.map((b) => b.text).join(' ');
  const firstParagraph =
    textBlocks.find((b) => words(b.text).length >= 8)?.text ??
    textBlocks[0]?.text ??
    bodyText.split(/\s+/).slice(0, 60).join(' ');
  const wordCount = content.wordCount;

  /* ----- Keyphrase ----- */
  if (!kp) {
    add('seo', 'kp-set', 'bad', 'No focus keyphrase set',
      'Pick the search phrase you want this page to rank for (for example "branding agency in pune"). Keyphrase checks are switched off until you do.');
  } else {
    const kpWords = words(norm(kp)).length;
    add('seo', 'kp-set', 'good', 'Focus keyphrase is set', `Optimising for "${kp}".`);
    add('seo', 'kp-length',
      kpWords <= 4 ? 'good' : kpWords <= 6 ? 'ok' : 'bad',
      kpWords <= 4 ? 'Keyphrase length is good' : 'Keyphrase is long',
      kpWords <= 4 ? `${kpWords} word(s) is easy to rank for.` : `${kpWords} words. Shorter phrases (2–4 words) are easier to rank for.`);

    // Title
    if (containsKeyphrase(title, kp)) {
      const early = stems(title).slice(0, 5);
      const k = stems(kp).filter((w) => !STOP.has(w));
      const atStart = k.length > 0 && k.every((w) => early.includes(w));
      add('seo', 'kp-title', atStart ? 'good' : 'ok',
        atStart ? 'Keyphrase is at the start of the SEO title' : 'Keyphrase is in the SEO title, but not at the start',
        atStart ? 'Great, this is what Google weighs most.' : 'Moving the keyphrase to the beginning of the title usually helps rankings.');
    } else {
      add('seo', 'kp-title', 'bad', 'Keyphrase is missing from the SEO title', `Add "${kp}" to the SEO title.`);
    }

    // Description
    add('seo', 'kp-desc', containsKeyphrase(description, kp) ? 'good' : 'bad',
      containsKeyphrase(description, kp) ? 'Keyphrase appears in the meta description' : 'Keyphrase is missing from the meta description',
      containsKeyphrase(description, kp) ? 'Google bolds it in the results, which lifts clicks.' : `Write "${kp}" into the meta description naturally.`);

    // Slug
    if (path === '/' || path === '') {
      add('seo', 'kp-slug', 'info', 'Keyphrase in URL: not applicable', 'The home page URL has no slug.');
    } else {
      const slug = path.split('/').filter(Boolean).pop() ?? '';
      const inSlug = containsKeyphrase(slug.replace(/-/g, ' '), kp);
      add('seo', 'kp-slug', inSlug ? 'good' : 'ok',
        inSlug ? 'Keyphrase appears in the URL' : 'Keyphrase is not in the URL',
        inSlug ? 'Clean, keyword-rich URL.' : 'Changing existing URLs can hurt rankings. Only fix this for new pages, and always add a 301 redirect.');
    }

    // Intro
    add('seo', 'kp-intro', containsKeyphrase(firstParagraph, kp) ? 'good' : 'bad',
      containsKeyphrase(firstParagraph, kp) ? 'Keyphrase appears in the first paragraph' : 'Keyphrase is missing from the first paragraph',
      containsKeyphrase(firstParagraph, kp) ? 'It tells Google and readers what the page is about immediately.' : 'Mention the keyphrase in the opening paragraph.');

    // Headings
    const subs = content.blocks.filter((b) => b.type === 'heading' && (b.level === 2 || b.level === 3));
    const withKp = subs.filter((h) => containsKeyphrase(h.text, kp)).length;
    if (subs.length === 0) {
      add('seo', 'kp-headings', 'bad', 'No H2 or H3 subheadings found', 'Add subheadings and use the keyphrase (or a close variant) in some of them.');
    } else if (withKp === 0) {
      add('seo', 'kp-headings', 'bad', 'Keyphrase is not in any subheading', 'Use the keyphrase in at least one H2 or H3.');
    } else if (pct(withKp, subs.length) > 75 && subs.length > 3) {
      add('seo', 'kp-headings', 'ok', 'Keyphrase is in too many subheadings', 'Over-use looks spammy. Use it in roughly a third to a half of them.');
    } else {
      add('seo', 'kp-headings', 'good', 'Keyphrase appears in subheadings', `${withKp} of ${subs.length} subheadings.`);
    }

    // Density
    const kpStems = stems(kp);
    const occurrences = countSequence(stems(bodyText), kpStems);
    const density = wordCount ? (occurrences * kpWords * 100) / wordCount : 0;
    const dStr = density.toFixed(1);
    if (occurrences === 0) {
      add('seo', 'kp-density', 'bad', 'Keyphrase never appears in the page text', 'Use the exact keyphrase a few times in the body copy.');
    } else if (density < 0.5) {
      add('seo', 'kp-density', 'ok', `Keyphrase density is low (${dStr}%)`, `Found ${occurrences} time(s). Aim for roughly 0.5%–3%.`);
    } else if (density <= 3) {
      add('seo', 'kp-density', 'good', `Keyphrase density is good (${dStr}%)`, `Found ${occurrences} time(s).`);
    } else {
      add('seo', 'kp-density', 'bad', `Keyphrase density is too high (${dStr}%)`, 'This reads as keyword stuffing. Use synonyms and natural wording.');
    }

    // Image alt
    const imgs = content.images;
    if (imgs.length) {
      const hasKpAlt = imgs.some((i) => i.alt && containsKeyphrase(i.alt, kp));
      add('seo', 'kp-alt', hasKpAlt ? 'good' : 'ok',
        hasKpAlt ? 'Keyphrase appears in an image alt text' : 'No image alt text contains the keyphrase',
        hasKpAlt ? 'Helps image search and accessibility.' : 'Describe at least one relevant image using the keyphrase.');
    }

    // Cannibalization
    const nk = norm(kp);
    const clash = input.others.filter((o) => o.key !== input.selfKey && o.keyphrase && norm(o.keyphrase) === nk);
    add('seo', 'kp-cannibal', clash.length ? 'bad' : 'good',
      clash.length ? 'Keyphrase already used on another page' : 'Keyphrase is unique to this page',
      clash.length
        ? `Also targeted by: ${clash.map((c) => c.label).join(', ')}. Pages competing for the same keyphrase hurt each other. Give each page its own.`
        : 'No other page targets this keyphrase.');
  }

  /* ----- Snippet ----- */
  const tw = pixelWidth(title, 20);
  if (!title.trim()) {
    add('seo', 'title-len', 'bad', 'No SEO title', 'Google will invent one for you. Write your own.');
  } else if (tw > TITLE_MAX_PX) {
    add('seo', 'title-len', 'ok', 'SEO title is too long', `${title.length} characters (~${tw}px). Google will cut it off. Keep it under about 60 characters.`);
  } else if (tw < 300) {
    add('seo', 'title-len', 'ok', 'SEO title is short', `${title.length} characters. Use more of the available space for keywords and your brand.`);
  } else {
    add('seo', 'title-len', 'good', 'SEO title length is good', `${title.length} characters (~${tw}px of ${TITLE_MAX_PX}px).`);
  }

  const dw = pixelWidth(description, 14);
  if (!description.trim()) {
    add('seo', 'desc-len', 'bad', 'No meta description', 'Google will pick random text from the page. Write a compelling 120–155 character summary.');
  } else if (dw > DESC_MAX_PX) {
    add('seo', 'desc-len', 'ok', 'Meta description is too long', `${description.length} characters. It will be cut off. Aim for 120–155.`);
  } else if (description.length < 80) {
    add('seo', 'desc-len', 'ok', 'Meta description is short', `${description.length} characters. Use up to ~155 to sell the click.`);
  } else {
    add('seo', 'desc-len', 'good', 'Meta description length is good', `${description.length} characters.`);
  }

  const dupTitle = input.others.filter((o) => o.key !== input.selfKey && o.title && o.title === title);
  if (title.trim()) {
    add('seo', 'dup-title', dupTitle.length ? 'bad' : 'good',
      dupTitle.length ? 'SEO title duplicates another page' : 'SEO title is unique',
      dupTitle.length ? `Same title as: ${dupTitle.map((d) => d.label).join(', ')}. Every page needs its own.` : 'No other page uses this exact title.');
  }
  const dupDesc = input.others.filter((o) => o.key !== input.selfKey && o.description && o.description === description);
  if (description.trim()) {
    add('seo', 'dup-desc', dupDesc.length ? 'bad' : 'good',
      dupDesc.length ? 'Meta description duplicates another page' : 'Meta description is unique',
      dupDesc.length ? `Same description as: ${dupDesc.map((d) => d.label).join(', ')}.` : 'No other page uses this exact description.');
  }

  /* ----- Content ----- */
  add('seo', 'text-len',
    wordCount >= 300 ? 'good' : wordCount >= 150 ? 'ok' : 'bad',
    wordCount >= 300 ? 'Text length is good' : wordCount >= 150 ? 'Text is a bit thin' : 'Text is too short',
    `${wordCount} words. ${wordCount >= 300 ? 'Plenty for Google to understand the page.' : 'Pages with at least 300 words rank more reliably. Add useful detail, FAQs, or process steps.'}`);

  const h1 = content.h1s.length;
  add('seo', 'h1', h1 === 1 ? 'good' : h1 === 0 ? 'bad' : 'ok',
    h1 === 1 ? 'Exactly one H1 heading' : h1 === 0 ? 'No H1 heading' : `${h1} H1 headings found`,
    h1 === 1 ? `"${content.h1s[0].slice(0, 80)}"` : h1 === 0 ? 'Every page needs one H1 describing it.' : 'Use a single H1 and make the rest H2/H3.');
  if (kp && h1 >= 1) {
    const inH1 = content.h1s.some((h) => containsKeyphrase(h, kp));
    add('seo', 'kp-h1', inH1 ? 'good' : 'ok',
      inH1 ? 'Keyphrase appears in the H1' : 'Keyphrase is not in the H1',
      inH1 ? 'Strong relevance signal.' : 'Work the keyphrase (or a close variant) into the main heading.');
  }

  const internal = content.links.filter((l) => l.internal).length;
  const outbound = content.links.filter((l) => !l.internal).length;
  add('seo', 'links-int', internal > 0 ? 'good' : 'ok',
    internal > 0 ? `${internal} internal link(s) in the content` : 'No internal links in the content',
    internal > 0 ? 'Internal links spread ranking power and help Google crawl.' : 'Link to related pages and services from within the page copy.');
  add('seo', 'links-out', outbound > 0 ? 'good' : 'ok',
    outbound > 0 ? `${outbound} outbound link(s)` : 'No outbound links',
    outbound > 0 ? 'Linking to trusted sources builds credibility.' : 'Consider linking to one authoritative external source where relevant.');

  if (content.images.length === 0) {
    add('seo', 'img-present', 'ok', 'No images found', 'Pages with relevant images engage visitors and can appear in image search.');
  } else {
    const missing = content.images.filter((i) => !i.alt || !i.alt.trim()).length;
    add('seo', 'img-alt',
      missing === 0 ? 'good' : missing <= content.images.length / 3 ? 'ok' : 'bad',
      missing === 0 ? 'All images have alt text' : `${missing} of ${content.images.length} images have no alt text`,
      missing === 0 ? 'Good for accessibility and image search.' : 'Describe every meaningful image in its alt text.');
  }

  /* ----- Readability ----- */
  const sentences = textBlocks.flatMap((b) => sentencesOf(b.text));
  if (sentences.length < 3) {
    add('readability', 'r-enough', 'info', 'Not enough running text to assess readability',
      'This page is mostly short UI labels and headings. Readability checks apply once there are a few full sentences of copy.');
  } else {
    const long = sentences.filter((s) => words(s).length > 20).length;
    const longPct = pct(long, sentences.length);
    add('readability', 'r-sentence', longPct <= 25 ? 'good' : longPct <= 30 ? 'ok' : 'bad',
      longPct <= 25 ? 'Sentence length is good' : `${longPct}% of sentences are over 20 words`,
      longPct <= 25 ? 'Short sentences are easy to read.' : 'Aim for no more than 25% of sentences above 20 words.');

    const longParas = textBlocks.filter((b) => words(b.text).length > 150).length;
    add('readability', 'r-paragraph', longParas === 0 ? 'good' : 'bad',
      longParas === 0 ? 'Paragraph length is good' : `${longParas} paragraph(s) over 150 words`,
      longParas === 0 ? 'No walls of text.' : 'Break long paragraphs up.');

    const passive = sentences.filter((s) => PASSIVE.test(s)).length;
    const pPct = pct(passive, sentences.length);
    add('readability', 'r-passive', pPct <= 10 ? 'good' : pPct <= 15 ? 'ok' : 'bad',
      pPct <= 10 ? 'Passive voice is under control' : `${pPct}% of sentences use passive voice`,
      pPct <= 10 ? 'Active voice keeps copy punchy.' : 'Rewrite some sentences in active voice ("we design", not "is designed by us").');

    const lower = sentences.map((s) => ` ${s.toLowerCase()} `);
    const withTrans = lower.filter((s) => TRANSITIONS.some((t) => s.includes(` ${t} `) || s.trimStart().startsWith(`${t} `))).length;
    const tPct = pct(withTrans, sentences.length);
    add('readability', 'r-transition', tPct >= 30 ? 'good' : tPct >= 20 ? 'ok' : 'bad',
      tPct >= 30 ? 'Good use of transition words' : `Only ${tPct}% of sentences use transition words`,
      tPct >= 30 ? 'Ideas flow smoothly.' : 'Add linking words such as "because", "also", "for example", "however".');

    let run = 1;
    let maxRun = 1;
    for (let i = 1; i < sentences.length; i++) {
      const a = norm(sentences[i - 1]).split(' ')[0];
      const b = norm(sentences[i]).split(' ')[0];
      run = a && a === b ? run + 1 : 1;
      maxRun = Math.max(maxRun, run);
    }
    add('readability', 'r-variety', maxRun >= 3 ? 'bad' : 'good',
      maxRun >= 3 ? `${maxRun} sentences in a row start with the same word` : 'Sentence beginnings are varied',
      maxRun >= 3 ? 'Vary how consecutive sentences begin.' : 'Good rhythm.');

    const wc = words(textBlocks.map((b) => b.text).join(' '));
    const syl = wc.reduce((n, w) => n + syllables(w), 0);
    const flesch = 206.835 - 1.015 * (wc.length / sentences.length) - 84.6 * (syl / Math.max(1, wc.length));
    const f = Math.round(Math.max(0, Math.min(100, flesch)));
    add('readability', 'r-flesch', f >= 60 ? 'good' : f >= 50 ? 'ok' : 'bad',
      f >= 60 ? `Reading ease is good (${f})` : `Reading ease is ${f >= 50 ? 'fairly difficult' : 'difficult'} (${f})`,
      f >= 60 ? 'Easy for most visitors to read.' : 'Use shorter sentences and simpler words.');
  }

  // Subheading distribution
  let since = 0;
  let maxStretch = 0;
  for (const b of content.blocks) {
    if (b.type === 'heading') since = 0;
    else {
      since += words(b.text).length;
      maxStretch = Math.max(maxStretch, since);
    }
  }
  if (wordCount >= 300 || maxStretch > 0) {
    add('readability', 'r-subheads', maxStretch <= 300 ? 'good' : maxStretch <= 350 ? 'ok' : 'bad',
      maxStretch <= 300 ? 'Subheadings are well distributed' : `A section runs ${maxStretch} words without a subheading`,
      maxStretch <= 300 ? 'Easy to scan.' : 'Add a subheading at least every 300 words.');
  }
  void headingBlocks;

  return {
    seo,
    readability,
    seoScore: score(seo),
    readabilityScore: score(readability),
    wordCount,
  };
}

export function score(checks: Check[]): number {
  const scored = checks.filter((c) => c.status !== 'info');
  if (!scored.length) return 0;
  const pts = scored.reduce((n, c) => n + (c.status === 'good' ? 1 : c.status === 'ok' ? 0.5 : 0), 0);
  return Math.round((pts / scored.length) * 100);
}

export function scoreStatus(s: number): Status {
  return s >= 80 ? 'good' : s >= 50 ? 'ok' : 'bad';
}

export function counts(checks: Check[]) {
  return {
    good: checks.filter((c) => c.status === 'good').length,
    ok: checks.filter((c) => c.status === 'ok').length,
    bad: checks.filter((c) => c.status === 'bad').length,
  };
}
