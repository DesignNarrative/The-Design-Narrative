import { findPage } from '@/lib/seo/pages';
import { fetchPageContent } from '@/lib/seo/extract';
import { readDb, saveAnalysis } from '@/lib/seo/store';
import { analyze, counts } from '@/lib/seo/analysis';
import { buildOthers, effectiveSnippet } from '@/lib/seo/snippet';
import { defaultPageSeo, type AnalysisSummary } from '@/lib/seo/types';
import { fail, guard, json } from '@/lib/seo/api';

type Ctx = { params: Promise<{ key: string }> };

/** Runs the full analysis on one page using its saved SEO data and stores the summary (used by "Run audit"). */
export async function POST(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { key } = await params;
  const entry = findPage(key);
  if (!entry) return fail('Unknown page.', 404);

  let content;
  try {
    content = await fetchPageContent(new URL(req.url).origin, entry.path);
  } catch (e) {
    return fail(`Could not read the page: ${e instanceof Error ? e.message : 'unknown error'}`, 502);
  }

  const db = await readDb();
  const seo = { ...defaultPageSeo(), ...db.pages[key] };
  const snip = effectiveSnippet(seo, db.settings, entry.label, content);
  const result = analyze({
    selfKey: key,
    path: entry.path,
    keyphrase: seo.focusKeyphrase,
    title: snip.title,
    description: snip.description,
    content,
    others: buildOthers(db, key),
  });

  const summary: AnalysisSummary = {
    at: new Date().toISOString(),
    seoScore: result.seoScore,
    readabilityScore: result.readabilityScore,
    wordCount: result.wordCount,
    seo: counts(result.seo),
    readability: counts(result.readability),
    issues: result.seo
      .filter((c) => c.status === 'bad' || c.status === 'ok')
      .map((c) => ({ id: c.id, title: c.title, status: c.status })),
    live: {
      title: content.title,
      description: content.description,
      canonical: content.canonical,
      robots: content.robots,
      ogImage: content.ogImage,
      h1Count: content.h1s.length,
    },
  };
  await saveAnalysis(key, summary);
  return json({ ok: true, analysis: summary });
}
