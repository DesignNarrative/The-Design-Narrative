'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Plus, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import type { NotFoundLog, RedirectRule } from '@/lib/seo/types';
import { api, Btn, Card, Field, inputCls, Spinner, Toggle, useToast } from '@/components/admin-seo/ui';

export default function RedirectsPage() {
  const toast = useToast();
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [logs404, setLogs404] = useState<NotFoundLog[]>([]);
  const [loading, setLoading] = useState(true);

  // New rule form
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [permanent, setPermanent] = useState(true);
  const [saving, setSaving] = useState(false);

  // Redirect simulator
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState<{ matches: boolean; destination?: string; type?: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rRes, nRes] = await Promise.all([
        api<{ redirects: RedirectRule[] }>('/api/seo/redirects'),
        api<{ notFoundLogs: NotFoundLog[] }>('/api/seo/404'),
      ]);
      setRedirects(rRes.redirects || []);
      setLogs404(nRes.notFoundLogs || []);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim() || !destination.trim()) {
      return toast('Please provide both old URL and new URL.', 'error');
    }
    setSaving(true);
    try {
      const res = await api<{ redirects: RedirectRule[] }>('/api/seo/redirects', {
        method: 'POST',
        body: JSON.stringify({
          redirect: {
            source,
            destination,
            permanent,
            enabled: true,
          },
        }),
      });
      setRedirects(res.redirects || []);
      setSource('');
      setDestination('');
      toast('Redirect created.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not create redirect.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (rule: RedirectRule) => {
    try {
      const res = await api<{ redirects: RedirectRule[] }>('/api/seo/redirects', {
        method: 'PUT',
        body: JSON.stringify({
          id: rule.id,
          redirect: { ...rule, enabled: !rule.enabled },
        }),
      });
      setRedirects(res.redirects || []);
      toast(rule.enabled ? 'Redirect paused.' : 'Redirect activated.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Update failed.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this redirect rule?')) return;
    try {
      const res = await api<{ redirects: RedirectRule[] }>(`/api/seo/redirects?id=${id}`, {
        method: 'DELETE',
      });
      setRedirects(res.redirects || []);
      toast('Redirect deleted.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Delete failed.', 'error');
    }
  };

  const handleFix404 = (path: string) => {
    setSource(path);
    setDestination('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear404 = async (id?: string) => {
    try {
      const res = await api<{ notFoundLogs: NotFoundLog[] }>(id ? `/api/seo/404?id=${id}` : '/api/seo/404', {
        method: 'DELETE',
      });
      setLogs404(res.notFoundLogs || []);
      toast(id ? 'Log cleared.' : 'All 404 logs cleared.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to clear logs.', 'error');
    }
  };

  const testRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = testUrl.trim();
    if (!clean) return;
    const match = redirects.find((r) => r.enabled && (r.source === clean || r.source === `/${clean.replace(/^\//, '')}`));
    if (match) {
      setTestResult({ matches: true, destination: match.destination, type: match.permanent ? '301 Permanent' : '302 Temporary' });
    } else {
      setTestResult({ matches: false });
    }
  };

  if (loading) return <Spinner text="Loading redirects & 404 monitor..." />;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">301/302 Redirects & 404 Monitor</h1>
        <p className="text-sm text-slate-500 mt-1">
          Eliminate dead links, preserve backlink SEO equity, and automatically capture 404 traffic.
        </p>
      </div>

      {/* Top 2 columns: Create Rule + Live Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Create Rule */}
        <Card className="p-6 lg:col-span-7 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-violet-600" /> Add New Redirect
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Old Path (From)" hint="e.g. /old-services or /branding-agency">
                <input
                  className={inputCls}
                  placeholder="/old-path"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </Field>
              <Field label="New Destination (To)" hint="e.g. /services/brand-design or https://...">
                <input
                  className={inputCls}
                  placeholder="/services/brand-design"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={permanent}
                  onChange={(e) => setPermanent(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 w-4 h-4"
                />
                <span>
                  <strong>301 Permanent</strong> <span className="text-xs text-slate-400">(Passes 99% SEO authority)</span>
                </span>
              </label>

              <Btn type="submit" loading={saving} disabled={!source || !destination}>
                Create Redirect
              </Btn>
            </div>
          </form>
        </Card>

        {/* Live Simulator */}
        <Card className="p-6 lg:col-span-5 space-y-4 bg-slate-50 border-slate-200">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Play className="w-4 h-4 text-violet-600" /> Live Redirect Tester
          </h2>
          <p className="text-xs text-slate-500">Test if a requested URL will redirect correctly.</p>
          <form onSubmit={testRedirect} className="space-y-3">
            <input
              className={inputCls}
              placeholder="e.g. /old-services"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
            />
            <Btn variant="ghost" type="submit" disabled={!testUrl.trim()} className="w-full">
              Test URL
            </Btn>
          </form>

          {testResult && (
            <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
              testResult.matches ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              {testResult.matches ? (
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> Redirects via {testResult.type}
                  </div>
                  <div>Destination: <code className="font-mono font-bold">{testResult.destination}</code></div>
                </div>
              ) : (
                <div>No active redirect rule for this path (URL resolves directly).</div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Redirects Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Active Redirects ({redirects.length})</h2>
            <p className="text-xs text-slate-500">Managed URL routing rules enforced automatically.</p>
          </div>
        </div>

        {redirects.length === 0 ? (
          <p className="p-8 text-sm text-slate-500 text-center">No redirects added yet. Add your first rule above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Source (Old URL)</th>
                  <th className="px-4 py-3">Destination (New URL)</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Hits</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {redirects.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs font-semibold text-slate-900 truncate max-w-[200px]">
                      {r.source}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-violet-700 truncate max-w-[200px]">
                      {r.destination}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        r.permanent ? 'bg-violet-100 text-violet-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.permanent ? '301' : '302'}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-slate-600">{r.hits}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggle(r)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          r.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {r.enabled ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        title="Delete redirect"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 404 Monitor Table */}
      <Card className="overflow-hidden border-red-200">
        <div className="px-6 py-4 border-b border-red-100 bg-red-50/50 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> 404 Broken Link Monitor ({logs404.length})
            </h2>
            <p className="text-xs text-slate-500">Live logs of URLs visited by users or search engines that returned 404.</p>
          </div>
          {logs404.length > 0 && (
            <Btn variant="ghost" onClick={() => handleClear404()} className="text-xs">
              Clear All 404 Logs
            </Btn>
          )}
        </div>

        {logs404.length === 0 ? (
          <p className="p-8 text-sm text-slate-500 text-center">Zero broken link traffic recorded. Clean health!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Missing Path</th>
                  <th className="px-3 py-3">Hit Count</th>
                  <th className="px-4 py-3">Last Seen</th>
                  <th className="px-6 py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs404.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-mono text-xs font-bold text-red-700">
                      {log.path}
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-slate-900">{log.hits}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(log.lastSeen).toLocaleString()}</td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <Btn
                        variant="soft"
                        onClick={() => handleFix404(log.path)}
                        className="text-xs py-1 px-2.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" /> Create 301 Redirect
                      </Btn>
                      <button
                        onClick={() => handleClear404(log.id)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer align-middle"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
