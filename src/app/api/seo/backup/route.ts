import { importDb, readDb } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

/** Download a full JSON backup. */
export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const db = await readDb();
  return new Response(JSON.stringify(db, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="seo-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      'Cache-Control': 'no-store',
    },
  });
}

/** Restore from an exported backup. */
export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody(req, 5_000_000);
  if (!body) return fail('Could not read the file.');
  try {
    await importDb(body);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Import failed.');
  }
  return json({ ok: true });
}
