import { listVersions, restoreVersion } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  return json({ versions: await listVersions() });
}

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody<{ id?: string }>(req, 5_000);
  if (!body || typeof body.id !== 'string') return fail('Invalid request.');
  const db = await restoreVersion(body.id);
  if (!db) return fail('Version not found.', 404);
  return json({ ok: true });
}
