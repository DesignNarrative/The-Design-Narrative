import { NextResponse } from 'next/server';
import {
  changePassword,
  checkPassword,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/seo/auth';
import { fail, guard, readBody } from '@/lib/seo/api';

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;
  const body = await readBody<{ current?: string; next?: string }>(req, 10_000);
  const current = typeof body?.current === 'string' ? body.current : '';
  const next = typeof body?.next === 'string' ? body.next : '';
  if (!(await checkPassword(current))) return fail('Current password is incorrect.', 401);
  try {
    await changePassword(next);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Could not change password.', 400);
  }
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions());
  return res;
}
