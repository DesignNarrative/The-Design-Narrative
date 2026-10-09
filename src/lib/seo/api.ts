import 'server-only';
import { NextResponse } from 'next/server';
import { isAuthed, sameOrigin } from './auth';

export const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export const fail = (message: string, status = 400) => json({ error: message }, status);

/**
 * Returns a Response if the request must be rejected, otherwise null.
 * Every SEO API route (except login/setup/session) calls this first.
 */
export async function guard(req: Request): Promise<NextResponse | null> {
  if (!(await isAuthed())) return fail('Please sign in.', 401);
  if (req.method !== 'GET' && req.method !== 'HEAD' && !sameOrigin(req)) {
    return fail('Cross-site request blocked.', 403);
  }
  return null;
}

export async function readBody<T = Record<string, unknown>>(req: Request, maxBytes = 2_000_000): Promise<T | null> {
  try {
    const text = await req.text();
    if (text.length > maxBytes) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
