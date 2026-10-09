import { NextResponse } from 'next/server';
import {
  createSessionToken,
  sameOrigin,
  SESSION_COOKIE,
  sessionCookieOptions,
  setupPassword,
} from '@/lib/seo/auth';
import { fail, readBody } from '@/lib/seo/api';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Cross-site request blocked.', 403);
  const body = await readBody<{ password?: string }>(req, 10_000);
  const password = typeof body?.password === 'string' ? body.password : '';
  try {
    await setupPassword(password, req.headers.get('host'));
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Setup failed.', 400);
  }
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions());
  return res;
}
