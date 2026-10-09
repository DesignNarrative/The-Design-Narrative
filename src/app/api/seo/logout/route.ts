import { NextResponse } from 'next/server';
import { sameOrigin, SESSION_COOKIE, sessionCookieOptions } from '@/lib/seo/auth';
import { fail } from '@/lib/seo/api';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail('Cross-site request blocked.', 403);
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions(0), maxAge: 0 });
  return res;
}
