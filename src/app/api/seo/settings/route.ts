import { mutateDb, sanitizeSettings } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

export async function PUT(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody<{ settings?: unknown }>(req);
  if (!body || typeof body.settings !== 'object') return fail('Invalid data.');
  const settings = sanitizeSettings(body.settings);
  const db = await mutateDb('Edited site-wide settings', (d) => {
    d.settings = settings;
  });
  return json({ ok: true, settings: db.settings });
}
