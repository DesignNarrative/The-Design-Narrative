import 'server-only';
import type { PageContent, ContentBlock } from './types';

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', bull: '•', middot: '·', copy: '©',
};

function decode(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

function textOf(html: string): string {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  if (!m) return null;
  return decode(m[2] ?? m[3] ?? '');
}

function metaContent(head: string, key: 'name' | 'property', value: string): string {
  const tags = head.match(/<meta\b[^>]*>/gi) ?? [];
  for (const t of tags) {
    if ((attr(t, key) ?? '').toLowerCase() === value) return (attr(t, 'content') ?? '').trim();
  }
  return '';
}

function cleanImageSrc(src: string): string {
  // next/image rewrites to /_next/image?url=<encoded original>&w=..&q=..
  if (src.startsWith('/_next/image')) {
    try {
      const u = new URL(src, 'http://x');
      const original = u.searchParams.get('url');
      if (original) return decodeURIComponent(original);
    } catch {
      /* fall through */
    }
  }
  return src;
}

export function parseHtml(html: string, origin: string): PageContent {
  const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
  const head = headMatch ? headMatch[0] : '';
  const title = textOf(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const canonicalTag = (head.match(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i) ?? [''])[0];

  const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);
  let body = mainMatch ? mainMatch[0] : (html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html);
  body = body
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|noscript|template|canvas|video|iframe)\b[\s\S]*?<\/\1>/gi, ' ');

  // Ordered blocks: headings + paragraphs
  const blocks: ContentBlock[] = [];
  const blockRe = /<(h[1-6]|p|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(body))) {
    const tag = m[1].toLowerCase();
    const text = textOf(m[2]);
    if (!text) continue;
    if (tag.startsWith('h')) blocks.push({ type: 'heading', level: Number(tag[1]), text });
    else blocks.push({ type: 'text', text });
  }

  const h1s = blocks.filter((b) => b.type === 'heading' && b.level === 1).map((b) => b.text);

  const fullText = textOf(body);
  const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;

  const images: PageContent['images'] = [];
  for (const t of body.match(/<img\b[^>]*>/gi) ?? []) {
    const src = attr(t, 'src');
    if (!src || src.startsWith('data:')) continue;
    images.push({ src: cleanImageSrc(src), alt: attr(t, 'alt') });
  }

  const host = (() => {
    try {
      return new URL(origin).host;
    } catch {
      return '';
    }
  })();
  const links: PageContent['links'] = [];
  const linkRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  while ((m = linkRe.exec(body))) {
    const href = attr(`<a ${m[1]}>`, 'href');
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let internal = href.startsWith('/') && !href.startsWith('//');
    if (!internal && /^https?:\/\//i.test(href)) {
      try {
        internal = new URL(href).host === host;
      } catch {
        internal = false;
      }
    }
    links.push({ href, text: textOf(m[2]).slice(0, 80), internal });
  }

  return {
    title,
    description: metaContent(head, 'name', 'description'),
    canonical: attr(canonicalTag, 'href') ?? '',
    robots: metaContent(head, 'name', 'robots'),
    ogImage: metaContent(head, 'property', 'og:image'),
    blocks,
    h1s,
    wordCount,
    images,
    links,
    text: fullText,
  };
}

/** Fetch a page of THIS site (path must be validated by the caller) and extract its SEO-relevant content. */
export async function fetchPageContent(origin: string, pagePath: string): Promise<PageContent> {
  const res = await fetch(`${origin}${pagePath}`, {
    cache: 'no-store',
    headers: { 'user-agent': 'TDN-SEO-Admin/1.0', accept: 'text/html' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Page returned HTTP ${res.status}`);
  return parseHtml(await res.text(), origin);
}
