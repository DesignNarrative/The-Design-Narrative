'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Code, Zap, FileCode, CheckCircle2, Play, Activity } from 'lucide-react';
import type { SeoSettings } from '@/lib/seo/types';
import { api, Btn, Card, Field, inputCls, Spinner, useToast } from '@/components/admin-seo/ui';

export default function TechnicalSeoPage() {
  const toast = useToast();
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // PageSpeed runner state
  const [psUrl, setPsUrl] = useState('/');
  const [psStrategy, setPsStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [psLoading, setPsLoading] = useState(false);
  const [psResult, setPsResult] = useState<{
    scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
    metrics: { lcp: string; cls: string; fcp: string; tbt: string; speedIndex: string };
    targetUrl: string;
  } | null>(null);
  const [psError, setPsError] = useState('');

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await api<{ settings: SeoSettings }>('/api/seo');
      setSettings(res.settings);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await api<{ settings: SeoSettings }>('/api/seo/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings }),
      });
      setSettings(res.settings);
      toast('Technical configuration saved.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Save failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const runPageSpeed = async () => {
    setPsLoading(true);
    setPsError('');
    setPsResult(null);
    try {
      const res = await api<{
        ok: boolean;
        scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
        metrics: { lcp: string; cls: string; fcp: string; tbt: string; speedIndex: string };
        targetUrl: string;
      }>(`/api/seo/pagespeed?path=${encodeURIComponent(psUrl)}&strategy=${psStrategy}`);
      setPsResult(res);
      toast('PageSpeed audit complete.');
    } catch (e) {
      setPsError(e instanceof Error ? e.message : 'Audit failed.');
    } finally {
      setPsLoading(false);
    }
  };

  if (loading || !settings) return <Spinner text="Loading technical configuration..." />;

  const tech = settings.technical;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Technical SEO &amp; Verification Suite</h1>
          <p className="text-sm text-slate-500 mt-1">
            Search engine verification tokens, Core Web Vitals testing, robots.txt, and Local NAP schemas.
          </p>
        </div>

        <Btn onClick={handleSave} loading={saving}>
          Save Configuration
        </Btn>
      </div>

      {/* 1. Free Google PageSpeed & Core Web Vitals Runner */}
      <Card className="p-6 space-y-6 border-violet-200 bg-violet-50/20">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-600" /> Core Web Vitals &amp; PageSpeed Runner (Free Google API)
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Directly queries Google PageSpeed Insights to verify Lighthouse performance, LCP, CLS, and FID metrics.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <input
            className={`${inputCls} max-w-md bg-white`}
            placeholder="Route path, e.g. / or /services/brand-design"
            value={psUrl}
            onChange={(e) => setPsUrl(e.target.value)}
          />

          <select
            className={`${inputCls} w-32 bg-white`}
            value={psStrategy}
            onChange={(e) => setPsStrategy(e.target.value as 'mobile' | 'desktop')}
          >
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
          </select>

          <Btn onClick={runPageSpeed} loading={psLoading}>
            <Play className="w-4 h-4" /> Run Live Audit
          </Btn>
        </div>

        {psError && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            {psError}
          </div>
        )}

        {psResult && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-2xl font-bold text-violet-600">{psResult.scores.performance}/100</div>
                <div className="text-xs font-semibold text-slate-600 mt-1">Performance</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-2xl font-bold text-emerald-600">{psResult.scores.seo}/100</div>
                <div className="text-xs font-semibold text-slate-600 mt-1">SEO Score</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-2xl font-bold text-slate-900">{psResult.scores.accessibility}/100</div>
                <div className="text-xs font-semibold text-slate-600 mt-1">Accessibility</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-2xl font-bold text-slate-900">{psResult.scores.bestPractices}/100</div>
                <div className="text-xs font-semibold text-slate-600 mt-1">Best Practices</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Largest Contentful Paint (LCP)</span>
                <span className="font-bold text-slate-800">{psResult.metrics.lcp}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Cumulative Layout Shift (CLS)</span>
                <span className="font-bold text-slate-800">{psResult.metrics.cls}</span>
              </div>
              <div>
                <span className="text-slate-400 block">First Contentful Paint (FCP)</span>
                <span className="font-bold text-slate-800">{psResult.metrics.fcp}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Blocking Time (TBT)</span>
                <span className="font-bold text-slate-800">{psResult.metrics.tbt}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Speed Index</span>
                <span className="font-bold text-slate-800">{psResult.metrics.speedIndex}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 2. Webmaster Verification Tokens */}
      <Card className="p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Search Engine Verification Tokens
        </h2>
        <p className="text-xs text-slate-500">
          Add your verification codes below to claim ownership in Google Search Console and Bing Webmaster Tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Google Site Verification (google-site-verification)" hint="Token from Google Search Console HTML tag">
            <input
              className={inputCls}
              placeholder="e.g. 7qX8R9z..._token"
              value={tech.verification.googleSiteVerification}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: {
                    ...tech,
                    verification: { ...tech.verification, googleSiteVerification: e.target.value },
                  },
                })
              }
            />
          </Field>

          <Field label="Bing Webmaster Verification (msvalidate.01)" hint="Token from Bing Webmaster Tools">
            <input
              className={inputCls}
              placeholder="e.g. 4B8329A1F8C..."
              value={tech.verification.bingValidate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: {
                    ...tech,
                    verification: { ...tech.verification, bingValidate: e.target.value },
                  },
                })
              }
            />
          </Field>
        </div>
      </Card>

      {/* 3. Tracking & Analytics IDs */}
      <Card className="p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-600" /> Tracking &amp; Analytics Tags
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Google Analytics 4 (GA4)" hint="e.g. G-XXXXXXXXXX">
            <input
              className={inputCls}
              placeholder="G-..."
              value={tech.tracking.ga4MeasurementId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: {
                    ...tech,
                    tracking: { ...tech.tracking, ga4MeasurementId: e.target.value },
                  },
                })
              }
            />
          </Field>

          <Field label="Google Tag Manager (GTM)" hint="e.g. GTM-XXXXXXX">
            <input
              className={inputCls}
              placeholder="GTM-..."
              value={tech.tracking.gtmContainerId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: {
                    ...tech,
                    tracking: { ...tech.tracking, gtmContainerId: e.target.value },
                  },
                })
              }
            />
          </Field>

          <Field label="Meta (Facebook) Pixel ID" hint="e.g. 123456789012345">
            <input
              className={inputCls}
              placeholder="Pixel ID"
              value={tech.tracking.metaPixelId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: {
                    ...tech,
                    tracking: { ...tech.tracking, metaPixelId: e.target.value },
                  },
                })
              }
            />
          </Field>
        </div>
      </Card>

      {/* 4. Local Business NAP Editor */}
      <Card className="p-6 space-y-5">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <Code className="w-5 h-5 text-violet-600" /> Local Business Schema &amp; NAP Locations
        </h2>
        <p className="text-xs text-slate-500">
          Configured Name, Address, and Phone numbers injected into Google Maps LocalBusiness structured data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tech.napList.map((nap, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                <span>{nap.city} Hub</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-100 text-violet-800">
                  {nap.postalCode}
                </span>
              </div>

              <Field label="Business Name">
                <input
                  className={inputCls}
                  value={nap.name}
                  onChange={(e) => {
                    const next = [...tech.napList];
                    next[idx].name = e.target.value;
                    setSettings({ ...settings, technical: { ...tech, napList: next } });
                  }}
                />
              </Field>

              <Field label="Street Address">
                <input
                  className={inputCls}
                  value={nap.streetAddress}
                  onChange={(e) => {
                    const next = [...tech.napList];
                    next[idx].streetAddress = e.target.value;
                    setSettings({ ...settings, technical: { ...tech, napList: next } });
                  }}
                />
              </Field>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Phone">
                  <input
                    className={inputCls}
                    value={nap.telephone}
                    onChange={(e) => {
                      const next = [...tech.napList];
                      next[idx].telephone = e.target.value;
                      setSettings({ ...settings, technical: { ...tech, napList: next } });
                    }}
                  />
                </Field>
                <Field label="Email">
                  <input
                    className={inputCls}
                    value={nap.email}
                    onChange={(e) => {
                      const next = [...tech.napList];
                      next[idx].email = e.target.value;
                      setSettings({ ...settings, technical: { ...tech, napList: next } });
                    }}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Custom robots.txt and llms.txt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-violet-600" /> Custom robots.txt Override
          </h2>
          <p className="text-xs text-slate-500">
            Leave blank to use the automatic sitemap-enabled crawler configuration.
          </p>
          <textarea
            rows={7}
            className={`${inputCls} font-mono text-xs`}
            placeholder={`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://...`}
            value={tech.customRobotsTxt}
            onChange={(e) =>
              setSettings({
                ...settings,
                technical: { ...tech, customRobotsTxt: e.target.value },
              })
            }
          />
          <div className="pt-1">
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-violet-600 hover:text-violet-800"
            >
              View Live /robots.txt ↗
            </a>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-violet-600" /> llms.txt (AI Search Content)
          </h2>
          <p className="text-xs text-slate-500">
            Structured Markdown file read by AI engines (ChatGPT Search, Perplexity, Claude).
          </p>
          <textarea
            rows={7}
            className={`${inputCls} font-mono text-xs`}
            value={tech.customLlmsTxt}
            onChange={(e) =>
              setSettings({
                ...settings,
                technical: { ...tech, customLlmsTxt: e.target.value },
              })
            }
          />
          <div className="pt-1">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-violet-600 hover:text-violet-800"
            >
              View Live /llms.txt ↗
            </a>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Btn onClick={handleSave} loading={saving}>
          Save Configuration
        </Btn>
      </div>
    </div>
  );
}
