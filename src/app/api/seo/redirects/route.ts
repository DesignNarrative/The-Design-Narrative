import { mutateDb, readDb, sanitizeRedirect } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const db = await readDb();
  return json({ redirects: db.redirects || [] });
}

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody<{ redirect?: unknown }>(req);
  if (!body || typeof body.redirect !== 'object') return fail('Invalid data.');

  const newRule = sanitizeRedirect(body.redirect);
  const db = await mutateDb(`Added redirect from ${newRule.source} to ${newRule.destination}`, (d) => {
    // Prevent duplicate source
    d.redirects = d.redirects.filter((r) => r.source !== newRule.source);
    d.redirects.unshift(newRule);
  });
  return json({ ok: true, redirects: db.redirects });
}

export async function PUT(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody<{ id?: string; redirect?: unknown }>(req);
  if (!body || !body.id || typeof body.redirect !== 'object') return fail('Invalid data.');

  const updated = sanitizeRedirect(body.redirect);
  const db = await mutateDb(`Updated redirect ${updated.source}`, (d) => {
    const idx = d.redirects.findIndex((r) => r.id === body.id);
    if (idx >= 0) {
      d.redirects[idx] = { ...d.redirects[idx], ...updated, id: body.id! };
    }
  });
  return json({ ok: true, redirects: db.redirects });
}

export async function DELETE(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return fail('Missing redirect id.');

  const db = await mutateDb(`Deleted redirect ${id}`, (d) => {
    d.redirects = d.redirects.filter((r) => r.id !== id);
  });
  return json({ ok: true, redirects: db.redirects });
}
