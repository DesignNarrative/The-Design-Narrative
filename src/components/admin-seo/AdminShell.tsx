'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  ArrowLeftRight,
  Cpu,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Lock,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { api, Btn, inputCls, Spinner, ToastProvider } from './ui';

interface Session {
  authed: boolean;
  configured: boolean;
  viaEnv: boolean;
  canSetup: boolean;
}

const NAV = [
  { href: '/admin/seo', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/seo/pages', label: 'Pages & Posts SEO', icon: FileText },
  { href: '/admin/seo/blogs', label: 'Blog CMS', icon: BookOpen },
  { href: '/admin/seo/images', label: 'Image SEO Hub', icon: ImageIcon },
  { href: '/admin/seo/redirects', label: 'Redirects & 404s', icon: ArrowLeftRight },
  { href: '/admin/seo/technical', label: 'Technical & Speed', icon: Cpu },
  { href: '/admin/seo/settings', label: 'Settings & Backup', icon: SettingsIcon },
];

function AuthScreen({ session, onDone }: { session: Session; onDone: () => void }) {
  const setup = !session.configured;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (setup && password !== confirm) return setError('Passwords do not match.');
    setBusy(true);
    try {
      await api(setup ? '/api/seo/setup' : '/api/seo/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">TDN SEO Admin</h1>
            <p className="text-xs text-slate-500">{setup ? 'First-time setup' : 'Sign in to continue'}</p>
          </div>
        </div>

        {setup && !session.canSetup ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 leading-relaxed">
            <strong>Admin password not set.</strong> For security, first-time setup only works on your own computer
            (localhost). On a live server, set the <code className="font-mono bg-amber-100 px-1 rounded">SEO_ADMIN_PASSWORD</code>{' '}
            environment variable and redeploy.
          </div>
        ) : (
          <>
            {setup && (
              <p className="text-sm text-slate-600 leading-relaxed">
                Create the shared admin password for your SEO team. Use at least 10 characters with letters and numbers.
              </p>
            )}
            <div className="space-y-3">
              <input
                type="password"
                autoFocus
                autoComplete={setup ? 'new-password' : 'current-password'}
                className={inputCls}
                placeholder={setup ? 'Create password' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {setup && (
                <input
                  type="password"
                  autoComplete="new-password"
                  className={inputCls}
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              )}
            </div>
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            <Btn type="submit" loading={busy} disabled={!password} className="w-full">
              <Lock className="w-4 h-4" /> {setup ? 'Create password & continue' : 'Sign in'}
            </Btn>
          </>
        )}
      </form>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();

  const load = useCallback(async () => {
    try {
      setSession(await api<Session>('/api/seo/session'));
    } catch {
      setSession({ authed: false, configured: true, viaEnv: false, canSetup: false });
    }
  }, []);

  useEffect(() => {
    load();
    const onUnauth = () => setSession((s) => (s ? { ...s, authed: false } : s));
    window.addEventListener('seo-unauth', onUnauth);
    return () => window.removeEventListener('seo-unauth', onUnauth);
  }, [load]);

  const logout = async () => {
    await api('/api/seo/logout', { method: 'POST' }).catch(() => undefined);
    load();
  };

  if (!session) return <Spinner text="Loading admin…" />;
  if (!session.authed) return <AuthScreen session={session} onDone={load} />;

  return (
    <ToastProvider>
      <div className="min-h-full flex flex-col lg:flex-row">
        <aside className="lg:w-64 shrink-0 bg-slate-900 text-slate-200 lg:min-h-screen lg:sticky lg:top-0 lg:self-start lg:h-screen flex flex-col">
          <div className="px-5 py-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">TDN SEO</div>
                <div className="text-[11px] text-slate-400">Admin panel</div>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 flex lg:block gap-1 overflow-x-auto">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    active ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block px-5 py-3 mt-1 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Live Endpoints</div>
            <div className="space-y-1">
              <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white flex items-center justify-between py-1">
                <span>sitemap.xml</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">XML</span>
              </a>
              <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white flex items-center justify-between py-1">
                <span>robots.txt</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">TXT</span>
              </a>
              <a href="/llms.txt" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white flex items-center justify-between py-1">
                <span>llms.txt (AI)</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">MD</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex mt-auto p-3 border-t border-white/10 flex-col gap-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" /> View website
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden flex items-center justify-end gap-3 px-4 py-2 border-b border-slate-200 bg-white text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="text-slate-600">View website</a>
            <button onClick={logout} className="text-slate-600 cursor-pointer inline-flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
          <main className="max-w-[1400px] mx-auto p-4 md:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

export { Loader2 };
