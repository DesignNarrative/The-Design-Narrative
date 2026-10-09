'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Star, EyeOff, Pencil } from 'lucide-react';
import type { PageRow } from '@/lib/seo/types';
import { api, Card, Dot, inputCls, scoreStatusOf, Spinner } from '@/components/admin-seo/ui';

const GROUPS = ['Main', 'Services', 'Case Studies'] as const;

export default function PagesList() {
  const [rows, setRows] = useState<PageRow[] | null>(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ pages: PageRow[] }>('/api/seo')
      .then((d) => setRows(d.pages))
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load.'));
  }, []);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.label.toLowerCase().includes(needle) ||
        r.path.toLowerCase().includes(needle) ||
        r.seo.focusKeyphrase.toLowerCase().includes(needle)
    );
  }, [rows, q]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!rows) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages & Posts SEO</h1>
          <p className="text-sm text-slate-500 mt-1">Click any page to edit its keyphrase, title, description and more.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input className={`${inputCls} pl-9`} placeholder="Search pages or keyphrases…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      {GROUPS.map((g) => {
        const list = filtered.filter((r) => r.group === g);
        if (!list.length) return null;
        return (
          <Card key={g} className="overflow-hidden">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
              {g} <span className="font-normal text-slate-400">· {list.length}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="px-6 py-2 font-semibold">Page</th>
                    <th className="px-3 py-2 font-semibold">Focus keyphrase</th>
                    <th className="px-3 py-2 font-semibold">SEO</th>
                    <th className="px-3 py-2 font-semibold">Readability</th>
                    <th className="px-3 py-2 font-semibold">Words</th>
                    <th className="px-3 py-2 font-semibold">Flags</th>
                    <th className="px-6 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {list.map((r) => {
                    const a = r.seo.analysis;
                    return (
                      <tr key={r.key} className="hover:bg-slate-50">
                        <td className="px-6 py-3">
                          <Link href={`/admin/seo/pages/${r.key}`} className="font-semibold text-slate-900 hover:text-violet-700">
                            {r.label}
                          </Link>
                          <div className="text-xs text-slate-400 font-mono">{r.path}</div>
                        </td>
                        <td className="px-3 py-3 text-slate-700">
                          {r.seo.focusKeyphrase || <span className="text-slate-400">Not set</span>}
                        </td>
                        <td className="px-3 py-3">
                          <Dot status={scoreStatusOf(a?.seoScore)} label={a ? `${a.seoScore}%` : '–'} />
                        </td>
                        <td className="px-3 py-3">
                          <Dot status={scoreStatusOf(a?.readabilityScore)} label={a ? `${a.readabilityScore}%` : '–'} />
                        </td>
                        <td className="px-3 py-3 text-slate-600">{a?.wordCount ?? '–'}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2 text-slate-400">
                            {r.seo.cornerstone && <Star className="w-4 h-4 text-amber-500" aria-label="Cornerstone" />}
                            {!r.seo.robots.index && <EyeOff className="w-4 h-4 text-red-500" aria-label="Hidden from Google" />}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Link
                            href={`/admin/seo/pages/${r.key}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
      {filtered.length === 0 && <p className="text-sm text-slate-500">No pages match your search.</p>}
    </div>
  );
}
