'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Upload, History, RotateCcw } from 'lucide-react';
import type { SeoSettings, VersionMeta } from '@/lib/seo/types';
import { api, Btn, Card, Field, inputCls, Spinner, useToast } from '@/components/admin-seo/ui';

export default function SettingsPage() {
  const toast = useToast();
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [versions, setVersions] = useState<VersionMeta[]>([]);
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwBusy, setPwBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadVersions = () =>
    api<{ versions: VersionMeta[] }>('/api/seo/versions')
      .then((d) => setVersions(d.versions))
      .catch(() => undefined);

  useEffect(() => {
    api<{ settings: SeoSettings }>('/api/seo')
      .then((d) => setSettings(d.settings))
      .catch((e) => toast(e instanceof Error ? e.message : 'Could not load settings.', 'error'));
    loadVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!settings) return <Spinner />;
  const set = <K extends keyof SeoSettings>(k: K, v: SeoSettings[K]) => setSettings({ ...settings, [k]: v });

  const save = async () => {
    setSaving(true);
    try {
      const r = await api<{ settings: SeoSettings }>('/api/seo/settings', { method: 'PUT', body: JSON.stringify({ settings }) });
      setSettings(r.settings);
      toast('Settings saved.');
      loadVersions();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Save failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const changePw = async () => {
    if (pw.next !== pw.confirm) return toast('New passwords do not match.', 'error');
    setPwBusy(true);
    try {
      await api('/api/seo/password', { method: 'POST', body: JSON.stringify({ current: pw.current, next: pw.next }) });
      setPw({ current: '', next: '', confirm: '' });
      toast('Password changed. Other sessions were signed out.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not change password.', 'error');
    } finally {
      setPwBusy(false);
    }
  };

  const importFile = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      if (!confirm('Replace ALL current SEO data with this backup? A restore point is saved first.')) return;
      await api('/api/seo/backup', { method: 'POST', body: JSON.stringify(parsed) });
      toast('Backup imported.');
      const d = await api<{ settings: SeoSettings }>('/api/seo');
      setSettings(d.settings);
      loadVersions();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Import failed.', 'error');
    }
  };

  const restore = async (v: VersionMeta) => {
    if (!confirm(`Restore the SEO data as it was before: “${v.reason}”?`)) return;
    try {
      await api('/api/seo/versions', { method: 'POST', body: JSON.stringify({ id: v.id }) });
      toast('Version restored.');
      const d = await api<{ settings: SeoSettings }>('/api/seo');
      setSettings(d.settings);
      loadVersions();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Restore failed.', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings & Backup</h1>
        <p className="text-sm text-slate-500 mt-1">Site-wide SEO defaults, security, backups and history.</p>
      </div>

      <Card className="p-6 space-y-5">
        <h2 className="font-semibold text-slate-900">Site basics</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Site name" hint="Used in Google previews and the %%sitename%% variable.">
            <input className={inputCls} value={settings.siteName} onChange={(e) => set('siteName', e.target.value)} />
          </Field>
          <Field label="Title separator" hint="Character between page name and site name, e.g. | or –">
            <input className={inputCls} value={settings.separator} onChange={(e) => set('separator', e.target.value)} />
          </Field>
        </div>
        <Field label="Tagline" hint="Short description of the business. Available as %%tagline%%.">
          <input className={inputCls} value={settings.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </Field>
        <Field label="Live domain" tip="Your real website address, e.g. https://www.yourdomain.com (no trailing slash). Needed for correct preview URLs, canonical tags and the sitemap." hint="Leave empty until the final domain is ready. Must start with https://">
          <input className={inputCls} placeholder="https://www.yourdomain.com" value={settings.domain} onChange={(e) => set('domain', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Default social image" hint="Used when a page has no social image. 1200 × 630 recommended.">
            <input className={inputCls} placeholder="/assets/…" value={settings.defaultOgImage} onChange={(e) => set('defaultOgImage', e.target.value)} />
          </Field>
          <Field label="X (Twitter) handle">
            <input className={inputCls} placeholder="@yourbrand" value={settings.twitterHandle} onChange={(e) => set('twitterHandle', e.target.value)} />
          </Field>
        </div>
        <Btn onClick={save} loading={saving}>Save settings</Btn>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Change password</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input type="password" autoComplete="current-password" className={inputCls} placeholder="Current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          <input type="password" autoComplete="new-password" className={inputCls} placeholder="New password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          <input type="password" autoComplete="new-password" className={inputCls} placeholder="Confirm new password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
        </div>
        <p className="text-xs text-slate-500">At least 10 characters with letters and numbers. If the server uses the SEO_ADMIN_PASSWORD environment variable, change it there instead.</p>
        <Btn variant="ghost" onClick={changePw} loading={pwBusy} disabled={!pw.current || !pw.next}>Update password</Btn>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Backup</h2>
        <p className="text-sm text-slate-600">Download a copy of all your SEO data, or restore from a previous download.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/api/seo/backup" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200">
            <Download className="w-4 h-4" /> Download backup
          </a>
          <Btn variant="ghost" onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" /> Import backup
          </Btn>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = ''; }} />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          <h2 className="font-semibold text-slate-900">Version history</h2>
          <span className="text-xs text-slate-400">· last {versions.length} changes</span>
        </div>
        {versions.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">Every save creates a restore point. Nothing yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
            {versions.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-4 px-6 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">Before: {v.reason}</div>
                  <div className="text-xs text-slate-500">{new Date(v.at).toLocaleString()}</div>
                </div>
                <Btn variant="soft" onClick={() => restore(v)}>
                  <RotateCcw className="w-3.5 h-3.5" /> Restore
                </Btn>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
