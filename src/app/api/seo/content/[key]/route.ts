import { findPage } from '@/lib/seo/pages';
import { fetchPageContent } from '@/lib/seo/extract';
import { fail, guard, json } from '@/lib/seo/api';

type Ctx = { params: Promise<{ key: string }> };

/** Fetches what the live page actually renders (headings, text, images, links, current meta tags). */
export async function GET(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { key } = await params;
  const entry = findPage(key);
  if (!entry) return fail('Unknown page.', 404);
  try {
    // Path comes only from the fixed registry, never from user input (no SSRF).
    const content = await fetchPageContent(new URL(req.url).origin, entry.path);
    return json({ content });
  } catch (e) {
    return fail(`Could not read the page: ${e instanceof Error ? e.message : 'unknown error'}`, 502);
  }
}
