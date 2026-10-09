'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Check } from '@/lib/seo/analysis';
import { truncateToWidth } from '@/lib/seo/analysis';
import { ScoreRing, StatusIcon, scoreStatusOf } from './ui';

/* ---------- Google result preview ---------- */
export function SnippetPreview({
  title,
  description,
  displayUrl,
  siteName,
  mode,
}: {
  title: string;
  description: string;
  displayUrl: string;
  siteName: string;
  mode: 'desktop' | 'mobile';
}) {
  const mobile = mode === 'mobile';
  const shownTitle = title.trim()
    ? mobile
      ? truncateToWidth(title, 20, 300, 2)
      : truncateToWidth(title, 20, 580, 1)
    : '(No title)';
  const shownDesc = description.trim()
    ? mobile
      ? truncateToWidth(description, 14, 270, 3)
      : truncateToWidth(description, 14, 480, 2)
    : 'No meta description. Google will choose text from the page.';

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 ${mobile ? 'max-w-[360px]' : 'max-w-[640px]'}`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[12px] font-bold text-slate-600">
          {siteName.trim().charAt(0).toUpperCase() || 'S'}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[14px] text-[#202124] truncate">{siteName}</div>
          <div className="text-[12px] text-[#4d5156] truncate">{displayUrl}</div>
        </div>
      </div>
      <div
        className="text-[20px] leading-[26px] text-[#1a0dab] hover:underline cursor-pointer"
        style={{ wordBreak: 'break-word' }}
      >
        {shownTitle}
      </div>
      <div className="text-[14px] leading-[22px] text-[#4d5156] mt-0.5" style={{ wordBreak: 'break-word' }}>
        {shownDesc}
      </div>
    </div>
  );
}

/* ---------- Analysis (traffic lights) ---------- */
function CheckList({ checks, defaultOpen }: { checks: Check[]; defaultOpen: Record<string, boolean> }) {
  const [open, setOpen] = useState(defaultOpen);
  const groups: { id: 'bad' | 'ok' | 'good' | 'info'; label: string }[] = [
    { id: 'bad', label: 'Problems' },
    { id: 'ok', label: 'Improvements' },
    { id: 'good', label: 'Good results' },
    { id: 'info', label: 'Notes' },
  ];
  return (
    <div className="space-y-2">
      {groups.map((g) => {
        const items = checks.filter((c) => c.status === g.id);
        if (!items.length) return null;
        const isOpen = open[g.id];
        return (
          <div key={g.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen((o) => ({ ...o, [g.id]: !o[g.id] }))}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <StatusIcon status={g.id} /> {g.label} ({items.length})
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <ul className="divide-y divide-slate-100">
                {items.map((c) => (
                  <li key={c.id} className="flex gap-2.5 px-3.5 py-3">
                    <StatusIcon status={c.status} className="w-4 h-4 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 leading-snug">{c.title}</div>
                      <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{c.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AnalysisPanel({
  seo,
  readability,
  seoScore,
  readabilityScore,
}: {
  seo: Check[];
  readability: Check[];
  seoScore: number;
  readabilityScore: number;
}) {
  const [tab, setTab] = useState<'seo' | 'read'>('seo');
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            { id: 'seo', label: 'SEO', score: seoScore },
            { id: 'read', label: 'Readability', score: readabilityScore },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl border p-3 flex items-center gap-3 text-left transition-colors cursor-pointer ${
              tab === t.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <ScoreRing score={t.score} size={56} />
            <div>
              <div className="text-sm font-bold text-slate-900">{t.label}</div>
              <div
                className={`text-xs font-medium ${
                  scoreStatusOf(t.score) === 'good' ? 'text-emerald-600' : scoreStatusOf(t.score) === 'ok' ? 'text-amber-600' : 'text-red-600'
                }`}
              >
                {scoreStatusOf(t.score) === 'good' ? 'Good' : scoreStatusOf(t.score) === 'ok' ? 'Needs improvement' : 'Needs work'}
              </div>
            </div>
          </button>
        ))}
      </div>
      {tab === 'seo' ? (
        <CheckList checks={seo} defaultOpen={{ bad: true, ok: true, good: false, info: false }} />
      ) : (
        <CheckList checks={readability} defaultOpen={{ bad: true, ok: true, good: false, info: true }} />
      )}
    </div>
  );
}
