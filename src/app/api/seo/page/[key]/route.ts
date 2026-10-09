import { findPage } from '@/lib/seo/pages';
import { mutateDb, readDb, sanitizePage } from '@/lib/seo/store';
import { defaultPageSeo } from '@/lib/seo/types';
import { buildOthers } from '@/lib/seo/snippet';
import { fail, guard, json, readBody } from '@/lib/seo/api';

type Ctx = { params: Promise<{ key: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { key } = await params;
  const entry = findPage(key);
  if (!entry) return fail('Unknown page.', 404);
  const db = await readDb();
  return json({
    entry,
    seo: { ...defaultPageSeo(), ...db.pages[key] },
    settings: db.settings,
    others: buildOthers(db, key),
  });
}

export async function PUT(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { key } = await params;
  const entry = findPage(key);
  if (!entry) return fail('Unknown page.', 404);
  const body = await readBody<{ seo?: unknown }>(req);
  if (!body || typeof body.seo !== 'object') return fail('Invalid data.');
  const db = await mutateDb(`Edited SEO for "${entry.label}"`, (d) => {
    d.pages[key] = sanitizePage(body.seo, d.pages[key]);
  });
  return json({ ok: true, seo: db.pages[key] });
}
