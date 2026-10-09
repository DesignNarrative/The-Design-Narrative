import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'seo-config.json');
export const SESSION_COOKIE = 'tdn_seo_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

interface AuthConfig {
  /** scrypt hash: salt:hash (hex) */
  passwordHash: string;
  /** random secret used to sign session cookies; rotated on password change */
  sessionSecret: string;
  createdAt: string;
}

async function readConfig(): Promise<AuthConfig | null> {
  try {
    return JSON.parse(await fs.readFile(CONFIG_FILE, 'utf8')) as AuthConfig;
  } catch {
    return null;
  }
}

async function writeConfig(cfg: AuthConfig) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${CONFIG_FILE}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(cfg, null, 2), { encoding: 'utf8', mode: 0o600 });
  await fs.rename(tmp, CONFIG_FILE);
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const attempt = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return attempt.length === expected.length && crypto.timingSafeEqual(attempt, expected);
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

/** SEO_ADMIN_PASSWORD env var (if set) always wins; otherwise the saved password is used. */
export async function authState(): Promise<{ configured: boolean; viaEnv: boolean }> {
  if (process.env.SEO_ADMIN_PASSWORD) return { configured: true, viaEnv: true };
  return { configured: !!(await readConfig()), viaEnv: false };
}

function isLocalHost(host: string | null): boolean {
  const h = (host ?? '').split(':')[0].toLowerCase();
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '::1';
}

export const MIN_PASSWORD_LENGTH = 10;

export function passwordProblem(pw: string): string | null {
  if (pw.length < MIN_PASSWORD_LENGTH) return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (!/[a-z]/i.test(pw) || !/[0-9]/.test(pw)) return 'Use a mix of letters and numbers.';
  return null;
}

/** First-time password creation. Only allowed from localhost, so a stranger can never claim a live site. */
export async function setupPassword(password: string, host: string | null) {
  if ((await authState()).configured) throw new Error('Admin password is already set.');
  if (!isLocalHost(host)) {
    throw new Error(
      'First-time setup is only allowed on localhost. On a live server, set the SEO_ADMIN_PASSWORD environment variable.'
    );
  }
  const problem = passwordProblem(password);
  if (problem) throw new Error(problem);
  await writeConfig({
    passwordHash: hashPassword(password),
    sessionSecret: crypto.randomBytes(48).toString('hex'),
    createdAt: new Date().toISOString(),
  });
}

async function getSecret(): Promise<string | null> {
  if (process.env.SEO_ADMIN_PASSWORD) {
    return crypto
      .createHash('sha256')
      .update(`tdn-seo:${process.env.SEO_ADMIN_PASSWORD}`)
      .digest('hex');
  }
  return (await readConfig())?.sessionSecret ?? null;
}

export async function checkPassword(password: string): Promise<boolean> {
  const envPw = process.env.SEO_ADMIN_PASSWORD;
  if (envPw) return safeEqual(password, envPw);
  const cfg = await readConfig();
  return cfg ? verifyHash(password, cfg.passwordHash) : false;
}

export async function changePassword(newPassword: string) {
  if (process.env.SEO_ADMIN_PASSWORD) {
    throw new Error('Password is managed by the SEO_ADMIN_PASSWORD environment variable.');
  }
  const problem = passwordProblem(newPassword);
  if (problem) throw new Error(problem);
  const cfg = await readConfig();
  if (!cfg) throw new Error('Admin is not set up.');
  await writeConfig({
    ...cfg,
    passwordHash: hashPassword(newPassword),
    sessionSecret: crypto.randomBytes(48).toString('hex'), // signs everyone else out
  });
}

function sign(payload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export async function createSessionToken(): Promise<string> {
  const secret = await getSecret();
  if (!secret) throw new Error('Admin is not set up.');
  const payload = `${Date.now() + SESSION_TTL_MS}.${crypto.randomBytes(12).toString('hex')}`;
  return `${payload}.${sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = await getSecret();
  if (!secret) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  if (!safeEqual(parts[2], sign(payload, secret))) return false;
  return Number(parts[0]) > Date.now();
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Same-origin check for state-changing requests (CSRF defence in depth on top of SameSite=Strict). */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser / same-origin fetch without Origin header
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

/* ---- Login rate limit (per IP, in memory) ---- */
const attempts = new Map<string, { count: number; first: number; lockedUntil: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 6;

export function rateLimitCheck(ip: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.lockedUntil > now) {
    return { ok: false, retryAfterSec: Math.ceil((rec.lockedUntil - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

export function rateLimitFail(ip: string) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now, lockedUntil: 0 });
    return;
  }
  rec.count += 1;
  if (rec.count >= MAX_ATTEMPTS) rec.lockedUntil = now + WINDOW_MS;
}

export function rateLimitReset(ip: string) {
  attempts.delete(ip);
}

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim() || 'local';
}
