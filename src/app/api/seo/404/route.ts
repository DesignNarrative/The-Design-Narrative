import { mutateDb, readDb } from '@/lib/seo/store';
import { fail, guard, json } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const db = await readDb();
  return json({ notFoundLogs: db.notFoundLogs || [] });
}

export async function DELETE(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const db = await mutateDb(id ? `Cleared 404 log ${id}` : 'Cleared all 404 logs', (d) => {
    if (id) {
      d.notFoundLogs = d.notFoundLogs.filter((l) => l.id !== id);
    } else {
      d.notFoundLogs = [];
    }
  });
  return json({ ok: true, notFoundLogs: db.notFoundLogs });
}
