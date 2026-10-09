import { getPageRegistry } from '@/lib/seo/pages';
import { fetchPageContent } from '@/lib/seo/extract';
import { mutateDb, readDb } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const db = await readDb();
  const origin = new URL(req.url).origin;
  const registry = getPageRegistry();

  const imageMap = new Map<string, { src: string; pages: string[]; defaultAlt: string | null }>();

  // Fetch images across pages
  for (const page of registry) {
    try {
      const content = await fetchPageContent(origin, page.path);
      for (const img of content.images) {
        if (!img.src) continue;
        const entry = imageMap.get(img.src) || { src: img.src, pages: [], defaultAlt: img.alt };
        if (!entry.pages.includes(page.label)) {
          entry.pages.push(page.label);
        }
        if (!entry.defaultAlt && img.alt) {
          entry.defaultAlt = img.alt;
        }
        imageMap.set(img.src, entry);
      }
    } catch {
      // Continue even if a single page fails
    }
  }

  const items = Array.from(imageMap.values()).map((item) => {
    const saved = db.imageAlts[item.src];
    return {
      src: item.src,
      pages: item.pages,
      alt: saved?.alt ?? item.defaultAlt ?? '',
      title: saved?.title ?? '',
      isCustom: !!saved,
      updatedAt: saved?.updatedAt ?? null,
    };
  });

  return json({ images: items });
}

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const body = await readBody<{ src?: string; alt?: string; title?: string }>(req);
  if (!body || !body.src) return fail('Missing image source.');

  const db = await mutateDb(`Updated Alt text for ${body.src}`, (d) => {
    d.imageAlts[body.src!] = {
      src: body.src!,
      alt: (body.alt || '').trim(),
      title: (body.title || '').trim(),
      updatedAt: new Date().toISOString(),
    };
  });

  return json({ ok: true, imageAlt: db.imageAlts[body.src] });
}
