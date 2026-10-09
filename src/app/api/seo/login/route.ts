import { NextResponse } from 'next/server';
import {
  authState,
  checkPassword,
  clientIp,
  createSessionToken,
  rateLimitCheck,
  rateLimitFail,
  rateLimitReset,
  sameOrigin,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/seo/auth';
import { fail, json, readBody } from '@/lib/seo/api';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Cross-site request blocked.', 403);
  const ip = clientIp(req);
  const limit = rateLimitCheck(ip);
  if (!limit.ok) {
    return fail(`Too many attempts. Try again in ${Math.ceil(limit.retryAfterSec / 60)} minute(s).`, 429);
  }
  if (!(await authState()).configured) return fail('Admin is not set up yet.', 409);

  const body = await readBody<{ password?: string }>(req, 10_000);
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password || !(await checkPassword(password))) {
    rateLimitFail(ip);
    // small delay slows brute force without hurting real users
    await new Promise((r) => setTimeout(r, 400));
    return fail('Incorrect password.', 401);
  }
  rateLimitReset(ip);
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions());
  return res;
}

export const GET = () => json({ error: 'Method not allowed' }, 405);
