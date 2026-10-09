'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, Loader2, TriangleAlert, XCircle, HelpCircle } from 'lucide-react';
import type { Status } from '@/lib/seo/types';

/* ---------- API helper ---------- */
export async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && !url.includes('/login')) window.dispatchEvent(new Event('seo-unauth'));
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

/* ---------- Status styling ---------- */
export const STATUS_COLOR: Record<Status, string> = {
  good: 'text-emerald-600',
  ok: 'text-amber-500',
  bad: 'text-red-500',
  info: 'text-slate-400',
};
export const STATUS_BG: Record<Status, string> = {
  good: 'bg-emerald-500',
  ok: 'bg-amber-500',
  bad: 'bg-red-500',
  info: 'bg-slate-300',
};
export const STATUS_SOFT: Record<Status, string> = {
  good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ok: 'bg-amber-50 text-amber-700 border-amber-200',
  bad: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-slate-50 text-slate-600 border-slate-200',
};

export function StatusIcon({ status, className = 'w-4 h-4' }: { status: Status; className?: string }) {
  const c = `${className} ${STATUS_COLOR[status]} shrink-0`;
  if (status === 'good') return <CheckCircle2 className={c} />;
  if (status === 'ok') return <TriangleAlert className={c} />;
  if (status === 'bad') return <XCircle className={c} />;
  return <Info className={c} />;
}

export function Dot({ status, label }: { status: Status; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${STATUS_BG[status]}`} />
      {label && <span className="text-xs text-slate-600">{label}</span>}
    </span>
  );
}

export function scoreStatusOf(score: number | undefined | null): Status {
  if (score === undefined || score === null) return 'info';
  return score >= 80 ? 'good' : score >= 50 ? 'ok' : 'bad';
}

export function ScoreRing({ score, size = 96, label }: { score: number | null | undefined; size?: number; label?: string }) {
  const s = score ?? 0;
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const status = scoreStatusOf(score);
  const stroke = status === 'good' ? '#10b981' : status === 'ok' ? '#f59e0b' : status === 'bad' ? '#ef4444' : '#cbd5e1';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#e2e8f0" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={stroke}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * s) / 100}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-slate-900" style={{ fontSize: size / 3.6 }}>
          {score === null || score === undefined ? '–' : s}
        </span>
        {label && <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>}
      </div>
    </div>
  );
}

/* ---------- Layout primitives ---------- */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>{children}</div>;
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  disabled,
  loading,
  type = 'button',
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger' | 'soft';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const styles = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm',
    soft: 'bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200',
    ghost: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${styles} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Tip({ text }: { text: string }) {
  return (
    <span className="relative group inline-flex align-middle">
      <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 cursor-help" />
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-lg bg-slate-900 text-white text-xs leading-relaxed p-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-50 font-normal normal-case tracking-normal">
        {text}
      </span>
    </span>
  );
}

export function Field({
  label,
  hint,
  tip,
  children,
  right,
}: {
  label: string;
  hint?: string;
  tip?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          {label} {tip && <Tip text={tip} />}
        </label>
        {right}
      </div>
      {children}
      {hint && <p className="text-xs text-slate-500 leading-relaxed">{hint}</p>}
    </div>
  );
}

export const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500';

export function Bar({ value, max, status }: { value: number; max: number; status: Status }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
      <div className={`h-full rounded-full transition-all ${STATUS_BG[status]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-start justify-between gap-4 text-left py-2 cursor-pointer"
    >
      <span>
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        {hint && <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">{hint}</span>}
      </span>
      <span
        className={`relative mt-0.5 shrink-0 w-10 h-6 rounded-full transition-colors ${checked ? 'bg-violet-600' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  );
}

/* ---------- Toasts ---------- */
type ToastKind = 'success' | 'error';
const ToastCtx = createContext<(msg: string, kind?: ToastKind) => void>(() => undefined);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<{ id: number; msg: string; kind: ToastKind }[]>([]);
  const push = useCallback((msg: string, kind: ToastKind = 'success') => {
    const id = Date.now() + Math.random();
    setItems((i) => [...i, { id, msg, kind }]);
    setTimeout(() => setItems((i) => i.filter((t) => t.id !== id)), 4200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200000] space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-2 max-w-sm rounded-xl px-4 py-3 text-sm font-medium shadow-lg border ${
              t.kind === 'success'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-red-600 text-white border-red-700'
            }`}
          >
            {t.kind === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-slate-500 text-sm">
      <Loader2 className="w-5 h-5 animate-spin" /> {text ?? 'Loading…'}
    </div>
  );
}

/** Human-friendly names for issue ids (dashboard "fix these first" list). */
export const ISSUE_LABEL: Record<string, { label: string; fix: string }> = {
  'kp-set': { label: 'No focus keyphrase set', fix: 'Choose the search phrase each page should rank for.' },
  'kp-title': { label: 'Keyphrase missing from SEO title', fix: 'Add the keyphrase near the start of the title.' },
  'kp-desc': { label: 'Keyphrase missing from meta description', fix: 'Mention the keyphrase in the description.' },
  'kp-intro': { label: 'Keyphrase missing from the first paragraph', fix: 'Use the keyphrase in the opening copy.' },
  'kp-headings': { label: 'Keyphrase not used in subheadings', fix: 'Use it in an H2 or H3.' },
  'kp-density': { label: 'Keyphrase density needs work', fix: 'Aim for roughly 0.5%–3% of the text.' },
  'kp-h1': { label: 'Keyphrase not in the H1', fix: 'Work it into the main heading.' },
  'kp-slug': { label: 'Keyphrase not in the URL', fix: 'Only for new pages. Never change live URLs without a 301 redirect.' },
  'kp-alt': { label: 'Keyphrase not in any image alt text', fix: 'Describe a relevant image using the keyphrase.' },
  'kp-cannibal': { label: 'Two pages target the same keyphrase', fix: 'Give every page its own keyphrase.' },
  'kp-length': { label: 'Keyphrase is too long', fix: 'Use 2–4 words.' },
  'title-len': { label: 'SEO title length', fix: 'Aim for about 50–60 characters.' },
  'desc-len': { label: 'Meta description missing or wrong length', fix: 'Write 120–155 characters.' },
  'dup-title': { label: 'Duplicate SEO titles', fix: 'Every page needs a unique title.' },
  'dup-desc': { label: 'Duplicate meta descriptions', fix: 'Every page needs a unique description.' },
  'text-len': { label: 'Page text is thin', fix: 'Add useful detail. 300+ words rank more reliably.' },
  h1: { label: 'H1 heading problem', fix: 'Each page needs exactly one H1.' },
  'links-int': { label: 'No internal links in content', fix: 'Link to related services and pages.' },
  'links-out': { label: 'No outbound links', fix: 'Link to one trusted source where relevant.' },
  'img-alt': { label: 'Images missing alt text', fix: 'Describe every meaningful image.' },
  'img-present': { label: 'No images on the page', fix: 'Add relevant imagery.' },
};
