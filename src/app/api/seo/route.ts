import { getPageRegistry } from '@/lib/seo/pages';
import { readDb } from '@/lib/seo/store';
import { defaultPageSeo, type PageRow } from '@/lib/seo/types';
import { guard, json } from '@/lib/seo/api';

/** GET /api/seo : global settings plus every managed page with its saved SEO data. */
export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const db = await readDb();
  const pages: PageRow[] = getPageRegistry().map((entry) => ({
    ...entry,
    seo: { ...defaultPageSeo(), ...db.pages[entry.key] },
  }));
  return json({ settings: db.settings, pages, updatedAt: db.updatedAt });
}
