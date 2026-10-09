'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, RefreshCw, CircleCheck, Circle } from 'lucide-react';
import type { PageRow, SeoSettings } from '@/lib/seo/types';
import { api, Btn, Card, Dot, ISSUE_LABEL, ScoreRing, scoreStatusOf, Spinner, useToast } from '@/components/admin-seo/ui';

interface Overview {
  settings: SeoSettings;
  pages: PageRow[];
}

function ago(iso?: string) {
  if (!iso) return 'never';
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
}

export default function DashboardPage() {
  const toast = useToast();
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await api<Overview>('/api/seo'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load data.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runAudit = async () => {
    if (!data) return;
    const keys = data.pages.map((p) => p.key);
    setProgress({ done: 0, total: keys.length });
    let done = 0;
    let failed = 0;
    const queue = [...keys];
    const worker = async () => {
      while (queue.length) {
        const key = queue.shift()!;
        try {
          await api(`/api/seo/analyze/${key}`, { method: 'POST' });
        } catch {
          failed++;
        }
        done++;
        setProgress({ done, total: keys.length });
      }
    };
    await Promise.all([worker(), worker()]);
    setProgress(null);
    await load();
    toast(failed ? `Audit finished. ${failed} page(s) could not be read.` : 'Audit complete.', failed ? 'error' : 'success');
  };

  const stats = useMemo(() => {
    if (!data) return null;
    const analysed = data.pages.filter((p) => p.seo.analysis);
    const avg = analysed.length
      ? Math.round(analysed.reduce((n, p) => n + (p.seo.analysis?.seoScore ?? 0), 0) / analysed.length)
      : null;
    const good = analysed.filter((p) => (p.seo.analysis?.seoScore ?? 0) >= 80).length;
    const ok = analysed.filter((p) => {
      const s = p.seo.analysis?.seoScore ?? 0;
      return s >= 50 && s < 80;
    }).length;
    const bad = analysed.filter((p) => (p.seo.analysis?.seoScore ?? 0) < 50).length;
    const last = analysed.map((p) => p.seo.analysis!.at).sort().pop();

    // Aggregate issues
    const agg = new Map<string, { id: string; bad: number; ok: number; pages: string[] }>();
    for (const p of analysed) {
      for (const i of p.seo.analysis!.issues) {
        const row = agg.get(i.id) ?? { id: i.id, bad: 0, ok: 0, pages: [] };
        if (i.status === 'bad') row.bad++;
        else row.ok++;
        row.pages.push(p.label);
        agg.set(i.id, row);
      }
    }
    const issues = [...agg.values()].sort((a, b) => b.bad * 2 + b.ok - (a.bad * 2 + a.ok)).slice(0, 8);
    const missingKeyphrase = data.pages.filter((p) => !p.seo.focusKeyphrase).length;
    const customised = data.pages.filter((p) => p.seo.title || p.seo.description).length;
    return { analysed, avg, good, ok, bad, last, issues, missingKeyphrase, customised };
  }, [data]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data || !stats) return <Spinner />;

  const checklist = [
    { done: !!data.settings.domain, label: 'Add your live domain', note: 'Needed for correct URLs in previews, sitemap and canonical tags.', href: '/admin/seo/settings' },
    { done: stats.analysed.length > 0, label: 'Run your first full audit', note: 'Scores every page and shows what to fix first.', href: undefined },
    { done: stats.missingKeyphrase === 0, label: `Set a focus keyphrase on every page (${data.pages.length - stats.missingKeyphrase}/${data.pages.length})`, note: 'One unique target search phrase per page.', href: '/admin/seo/pages' },
    { done: stats.customised >= Math.ceil(data.pages.length / 2), label: `Write custom SEO titles & descriptions (${stats.customised}/${data.pages.length})`, note: 'This is where the biggest ranking and click-through gains are.', href: '/admin/seo/pages' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SEO Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Last audit: {ago(stats.last)} · {data.pages.length} pages managed
          </p>
        </div>
        <Btn onClick={runAudit} loading={!!progress}>
          {progress ? `Auditing ${progress.done}/${progress.total}…` : (<><Play className="w-4 h-4" /> Run full audit</>)}
        </Btn>
      </div>

      {progress && (
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-violet-600 transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-6">
          <ScoreRing score={stats.avg} size={120} label="SEO" />
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-slate-900">Overall site score</div>
            <div className="flex flex-col gap-1.5">
              <Dot status="good" label={`${stats.good} pages good`} />
              <Dot status="ok" label={`${stats.ok} need improvement`} />
              <Dot status="bad" label={`${stats.bad} have problems`} />
            </div>
            {stats.avg === null && <p className="text-xs text-slate-500">Run an audit to get your score.</p>}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-3">Getting set up</h2>
          <ul className="space-y-3">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                {c.done ? <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${c.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{c.label}</div>
                  {!c.done && <div className="text-xs text-slate-500">{c.note}</div>}
                </div>
                {!c.done && c.href && (
                  <Link href={c.href} className="text-xs font-semibold text-violet-600 hover:text-violet-800 inline-flex items-center gap-1 shrink-0">
                    Go <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-1">Fix these first</h2>
          <p className="text-xs text-slate-500 mb-4">Sorted by how many pages are affected.</p>
          {stats.issues.length === 0 ? (
            <p className="text-sm text-slate-500">{stats.analysed.length ? 'No issues found. Nice work!' : 'Run an audit to see your priorities.'}</p>
          ) : (
            <ul className="space-y-3">
              {stats.issues.map((i) => {
                const meta = ISSUE_LABEL[i.id];
                return (
                  <li key={i.id} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${i.bad ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900">
                        {meta?.label ?? i.id} <span className="text-slate-400 font-normal">· {i.bad + i.ok} page(s)</span>
                      </div>
                      {meta && <div className="text-xs text-slate-500">{meta.fix}</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-0 lg:col-span-3 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Pages</h2>
            <Link href="/admin/seo/pages" className="text-xs font-semibold text-violet-600 hover:text-violet-800">
              Manage all →
            </Link>
          </div>
          <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
            {data.pages.map((p) => {
              const a = p.seo.analysis;
              return (
                <Link key={p.key} href={`/admin/seo/pages/${p.key}`} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50">
                  <Dot status={scoreStatusOf(a?.seoScore)} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">{p.label}</div>
                    <div className="text-xs text-slate-500 truncate">
                      {p.seo.focusKeyphrase ? `“${p.seo.focusKeyphrase}”` : 'No keyphrase set'}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 w-14 text-right">{a ? `${a.seoScore}%` : '–'}</div>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-violet-50 border-violet-200">
        <p className="text-sm text-violet-900 leading-relaxed">
          <RefreshCw className="w-4 h-4 inline -mt-0.5 mr-1.5" />
          <strong>How it works right now:</strong> scores are based on what your live pages serve today. Titles and
          descriptions you save here are stored safely but are applied to the public site in the next step (connecting the
          panel to the website), which will be done after you approve this stage.
        </p>
      </Card>
    </div>
  );
}
