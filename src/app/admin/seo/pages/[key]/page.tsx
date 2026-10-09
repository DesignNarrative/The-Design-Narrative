'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Monitor, Smartphone, RefreshCw, Save, X, Loader2, Code, Plus, Trash2, Copy, Check } from 'lucide-react';
import {
  analyze,
  pixelWidth,
  resolveTemplate,
  DESC_MAX_PX,
  TITLE_MAX_PX,
  type OtherPage,
} from '@/lib/seo/analysis';
import { templateVars } from '@/lib/seo/snippet';
import { buildPageSchemaJson } from '@/lib/seo/schema';
import { VARIABLE_HELP } from '@/lib/seo/types';
import type {
  PageContent,
  PageRegistryEntry,
  PageSeo,
  PageSchema,
  SchemaType,
  SeoSettings,
  Status,
} from '@/lib/seo/types';
import { AnalysisPanel, SnippetPreview } from '@/components/admin-seo/SeoWidgets';
import {
  api,
  Bar,
  Btn,
  Card,
  Field,
  inputCls,
  Spinner,
  Toggle,
  useToast,
} from '@/components/admin-seo/ui';

type Tab = 'seo' | 'social' | 'schema' | 'advanced' | 'notes';

interface PageData {
  entry: PageRegistryEntry;
  seo: PageSeo;
  settings: SeoSettings;
  others: OtherPage[];
}

export default function PageEditor() {
  const { key } = useParams<{ key: string }>();
  const toast = useToast();

  const [data, setData] = useState<PageData | null>(null);
  const [seo, setSeo] = useState<PageSeo | null>(null);
  const savedRef = useRef('');
  const [content, setContent] = useState<PageContent | null>(null);
  const [contentError, setContentError] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('seo');
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [relatedDraft, setRelatedDraft] = useState('');

  const loadContent = useCallback(async () => {
    setLoadingContent(true);
    setContentError('');
    try {
      const r = await api<{ content: PageContent }>(`/api/seo/content/${key}`);
      setContent(r.content);
    } catch (e) {
      setContentError(e instanceof Error ? e.message : 'Could not read the page.');
    } finally {
      setLoadingContent(false);
    }
  }, [key]);

  useEffect(() => {
    api<PageData>(`/api/seo/page/${key}`)
      .then((d) => {
        setData(d);
        setSeo(d.seo);
        savedRef.current = JSON.stringify(d.seo);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load page.'));
    loadContent();
  }, [key, loadContent]);

  const dirty = !!seo && JSON.stringify(seo) !== savedRef.current;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = <K extends keyof PageSeo>(k: K, v: PageSeo[K]) => setSeo((s) => (s ? { ...s, [k]: v } : s));

  const vars = data ? templateVars(data.settings, data.entry.label) : null;
  const resolvedTitle = seo && vars ? resolveTemplate(seo.title, vars) : '';
  const resolvedDesc = seo && vars ? resolveTemplate(seo.description, vars) : '';
  const effTitle = resolvedTitle || content?.title || '';
  const effDesc = resolvedDesc || content?.description || '';

  const result = useMemo(() => {
    if (!data || !seo || !content) return null;
    return analyze({
      selfKey: key,
      path: data.entry.path,
      keyphrase: seo.focusKeyphrase,
      title: effTitle,
      description: effDesc,
      content,
      others: data.others,
    });
  }, [data, seo, content, key, effTitle, effDesc]);

  const save = async () => {
    if (!seo) return;
    setSaving(true);
    try {
      const r = await api<{ seo: PageSeo }>(`/api/seo/page/${key}`, { method: 'PUT', body: JSON.stringify({ seo }) });
      setSeo(r.seo);
      savedRef.current = JSON.stringify(r.seo);
      toast('Saved. A restorable version was recorded.');
      api(`/api/seo/analyze/${key}`, { method: 'POST' }).catch(() => undefined);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Save failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const insertVar = (field: 'title' | 'description', v: string) =>
    update(field, `${seo?.[field] ?? ''}${seo?.[field] && !seo[field].endsWith(' ') ? ' ' : ''}${v}`);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data || !seo) return <Spinner />;

  const displayDomain = (data.settings.domain || 'https://yourdomain.com').replace(/^https?:\/\//, '');
  const displayUrl = `${displayDomain}${data.entry.path === '/' ? '' : ` › ${data.entry.path.split('/').filter(Boolean).join(' › ')}`}`;

  const tw = pixelWidth(effTitle, 20);
  const titleStatus: Status = !effTitle ? 'bad' : tw > TITLE_MAX_PX ? 'ok' : tw < 300 ? 'ok' : 'good';
  const dw = pixelWidth(effDesc, 14);
  const descStatus: Status = !effDesc ? 'bad' : dw > DESC_MAX_PX ? 'ok' : effDesc.length < 80 ? 'ok' : 'good';

  const addRelated = () => {
    const v = relatedDraft.trim();
    if (!v || seo.relatedKeyphrases.length >= 5 || seo.relatedKeyphrases.includes(v)) return;
    update('relatedKeyphrases', [...seo.relatedKeyphrases, v]);
    setRelatedDraft('');
  };

  const [copiedSchema, setCopiedSchema] = useState(false);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'seo', label: 'SEO' },
    { id: 'social', label: 'Social' },
    { id: 'schema', label: 'Schema (JSON-LD)' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href="/admin/seo/pages" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-violet-700 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> All pages
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 truncate">{data.entry.label}</h1>
          <a href={data.entry.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-violet-700">
            {data.entry.path} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
          <Btn onClick={save} loading={saving} disabled={!dirty}>
            <Save className="w-4 h-4" /> Save changes
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-6 items-start">
        {/* LEFT: editor */}
        <div className="space-y-5 min-w-0">
          <div className="flex gap-1 border-b border-slate-200">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px cursor-pointer ${
                  tab === t.id ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'seo' && (
            <>
              <Card className="p-6 space-y-5">
                <Field
                  label="Focus keyphrase"
                  tip="The exact phrase a customer would type into Google to find this page. Example: “branding agency in pune”. Use a different keyphrase on every page."
                  hint="Tip: pick something people actually search for, 2–4 words, specific to this page."
                >
                  <input
                    className={inputCls}
                    value={seo.focusKeyphrase}
                    onChange={(e) => update('focusKeyphrase', e.target.value)}
                    placeholder="e.g. branding agency in pune"
                  />
                </Field>

                <Field label="Related keyphrases" hint="Up to 5 supporting phrases for your own reference. Press Enter to add.">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {seo.relatedKeyphrases.map((k) => (
                      <span key={k} className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-full pl-3 pr-1.5 py-1 text-xs font-medium">
                        {k}
                        <button onClick={() => update('relatedKeyphrases', seo.relatedKeyphrases.filter((x) => x !== k))} className="hover:text-red-600 cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    className={inputCls}
                    value={relatedDraft}
                    onChange={(e) => setRelatedDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addRelated();
                      }
                    }}
                    onBlur={addRelated}
                    placeholder="Add a related phrase…"
                    disabled={seo.relatedKeyphrases.length >= 5}
                  />
                </Field>
              </Card>

              <Card className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">Google preview</h2>
                  <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden">
                    {(['desktop', 'mobile'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                          mode === m ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {m === 'desktop' ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                        {m === 'desktop' ? 'Desktop' : 'Mobile'}
                      </button>
                    ))}
                  </div>
                </div>
                <SnippetPreview title={effTitle} description={effDesc} displayUrl={displayUrl} siteName={data.settings.siteName} mode={mode} />

                <Field
                  label="SEO title"
                  tip="The blue headline in Google. Put your keyphrase first, keep it under ~60 characters and add your brand at the end."
                  right={
                    <div className="flex gap-1.5">
                      {VARIABLE_HELP.slice(0, 3).map((v) => (
                        <button key={v.v} onClick={() => insertVar('title', v.v)} title={v.d} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 hover:bg-violet-100 hover:text-violet-700 text-slate-600 cursor-pointer">
                          {v.v}
                        </button>
                      ))}
                    </div>
                  }
                >
                  <input className={inputCls} value={seo.title} onChange={(e) => update('title', e.target.value)} placeholder={content?.title ? `Currently live: ${content.title}` : 'Write a title…'} />
                  <Bar value={tw} max={TITLE_MAX_PX} status={titleStatus} />
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{effTitle.length} characters · ~{tw}px of {TITLE_MAX_PX}px{!seo.title.trim() && effTitle ? ' (using the live title)' : ''}</span>
                    {content?.title && seo.title !== content.title && (
                      <button className="text-violet-600 font-semibold hover:underline cursor-pointer" onClick={() => update('title', content.title)}>
                        Start from live title
                      </button>
                    )}
                  </div>
                </Field>

                <Field
                  label="Meta description"
                  tip="The grey text under the title. It doesn’t change your ranking directly, but a good one gets far more people to click."
                  right={
                    <div className="flex gap-1.5">
                      {VARIABLE_HELP.slice(0, 3).map((v) => (
                        <button key={v.v} onClick={() => insertVar('description', v.v)} title={v.d} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 hover:bg-violet-100 hover:text-violet-700 text-slate-600 cursor-pointer">
                          {v.v}
                        </button>
                      ))}
                    </div>
                  }
                >
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={seo.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder={content?.description ? `Currently live: ${content.description}` : 'Summarise the page and invite the click…'}
                  />
                  <Bar value={dw} max={DESC_MAX_PX} status={descStatus} />
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{effDesc.length} characters (aim for 120–155){!seo.description.trim() && effDesc ? ' · using the live description' : ''}</span>
                    {content?.description && seo.description !== content.description && (
                      <button className="text-violet-600 font-semibold hover:underline cursor-pointer" onClick={() => update('description', content.description)}>
                        Start from live description
                      </button>
                    )}
                  </div>
                </Field>
              </Card>

              <Card className="p-6">
                <h2 className="font-semibold text-slate-900 mb-1">Currently live on the website</h2>
                <p className="text-xs text-slate-500 mb-4">What Google reads from this page right now.</p>
                {loadingContent && <Spinner text="Reading the live page…" />}
                {contentError && <p className="text-sm text-red-600">{contentError}</p>}
                {content && (
                  <dl className="grid grid-cols-[110px_1fr] gap-y-2 text-sm">
                    {[
                      ['Title', content.title || '—'],
                      ['Description', content.description || '— none —'],
                      ['Canonical', content.canonical || '— none —'],
                      ['Robots', content.robots || 'default (index, follow)'],
                      ['Social image', content.ogImage || '— none —'],
                      ['H1 headings', String(content.h1s.length)],
                      ['Word count', String(content.wordCount)],
                    ].map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="text-slate-500">{k}</dt>
                        <dd className="text-slate-900 break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </Card>
            </>
          )}

          {tab === 'social' && (
            <Card className="p-6 space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Controls how this page looks when shared on Facebook, LinkedIn, WhatsApp and X. Leave blank to reuse the SEO title and description.
              </p>
              <div className="rounded-xl border border-slate-200 overflow-hidden max-w-[500px]">
                <div className="aspect-[1.91/1] bg-slate-100 flex items-center justify-center text-xs text-slate-400 overflow-hidden">
                  {(seo.og.image || data.settings.defaultOgImage) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={seo.og.image || data.settings.defaultOgImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    'No social image set (recommended: 1200 × 630)'
                  )}
                </div>
                <div className="p-3 bg-slate-50">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">{displayDomain}</div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-2">{seo.og.title || effTitle || '(title)'}</div>
                  <div className="text-xs text-slate-500 line-clamp-2">{seo.og.description || effDesc}</div>
                </div>
              </div>
              <Field label="Social title (Open Graph)">
                <input className={inputCls} value={seo.og.title} onChange={(e) => update('og', { ...seo.og, title: e.target.value })} placeholder={effTitle} />
              </Field>
              <Field label="Social description">
                <textarea rows={3} className={inputCls} value={seo.og.description} onChange={(e) => update('og', { ...seo.og, description: e.target.value })} placeholder={effDesc} />
              </Field>
              <Field label="Social image URL" hint="Full URL or a path starting with /, e.g. /assets/cta-studio.jpg. Best size 1200 × 630. Image upload arrives in a later stage.">
                <input className={inputCls} value={seo.og.image} onChange={(e) => update('og', { ...seo.og, image: e.target.value })} placeholder="/assets/…" />
              </Field>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="font-semibold text-slate-900">X (Twitter) card</h3>
                <Field label="Card type">
                  <select className={inputCls} value={seo.twitter.card} onChange={(e) => update('twitter', { ...seo.twitter, card: e.target.value as 'summary' | 'summary_large_image' })}>
                    <option value="summary_large_image">Large image (recommended)</option>
                    <option value="summary">Small summary</option>
                  </select>
                </Field>
                <Field label="Title (optional)" hint="Blank = same as the social title.">
                  <input className={inputCls} value={seo.twitter.title} onChange={(e) => update('twitter', { ...seo.twitter, title: e.target.value })} />
                </Field>
                <Field label="Description (optional)">
                  <textarea rows={2} className={inputCls} value={seo.twitter.description} onChange={(e) => update('twitter', { ...seo.twitter, description: e.target.value })} />
                </Field>
                <Field label="Image URL (optional)">
                  <input className={inputCls} value={seo.twitter.image} onChange={(e) => update('twitter', { ...seo.twitter, image: e.target.value })} />
                </Field>
              </div>
            </Card>
          )}

          {tab === 'schema' && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold text-slate-900 text-base">Schema.org Structured Data (JSON-LD)</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Structured data helps search engines understand the exact type of content on this page to trigger rich snippets (star ratings, FAQ accordions, business knowledge panels, breadcrumbs).
                </p>
              </div>

              <Field label="Schema Type" tip="Select the primary schema type for this page.">
                <select
                  className={inputCls}
                  value={seo.schema?.type || 'WebPage'}
                  onChange={(e) =>
                    update('schema', {
                      ...(seo.schema || { type: 'WebPage' }),
                      type: e.target.value as SchemaType,
                    })
                  }
                >
                  <option value="WebPage">WebPage (General page markup)</option>
                  <option value="Organization">Organization (Brand overview)</option>
                  <option value="LocalBusiness">LocalBusiness (Pune HQ & studio NAP)</option>
                  <option value="Service">Service (Design, Branding, Marketing)</option>
                  <option value="FAQPage">FAQPage (FAQ accordion rich snippet)</option>
                  <option value="BreadcrumbList">BreadcrumbList (Site hierarchy navigation)</option>
                  <option value="Article">Article / Case Study (Editorial content)</option>
                  <option value="Custom">Custom JSON-LD (Raw code)</option>
                </select>
              </Field>

              {/* Service Fields */}
              {seo.schema?.type === 'Service' && (
                <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Service Details</h3>
                  <Field label="Service Name" hint="Blank = page title">
                    <input
                      className={inputCls}
                      value={seo.schema.name || ''}
                      onChange={(e) => update('schema', { ...seo.schema!, name: e.target.value })}
                      placeholder={effTitle}
                    />
                  </Field>
                  <Field label="Service Type / Category">
                    <input
                      className={inputCls}
                      value={seo.schema.serviceType || ''}
                      onChange={(e) => update('schema', { ...seo.schema!, serviceType: e.target.value })}
                      placeholder="e.g. Brand Identity, UI/UX Design, Performance Marketing"
                    />
                  </Field>
                  <Field label="Service Description">
                    <textarea
                      rows={2}
                      className={inputCls}
                      value={seo.schema.description || ''}
                      onChange={(e) => update('schema', { ...seo.schema!, description: e.target.value })}
                      placeholder={effDesc}
                    />
                  </Field>
                </div>
              )}

              {/* LocalBusiness Fields */}
              {seo.schema?.type === 'LocalBusiness' && (
                <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Local Business Settings</h3>
                  <p className="text-xs text-slate-600">
                    Uses the verified Pune HQ NAP address and coordinates defined in Technical SEO settings.
                  </p>
                  <Field label="Business Name Override" hint="Leave blank to use site name">
                    <input
                      className={inputCls}
                      value={seo.schema.name || ''}
                      onChange={(e) => update('schema', { ...seo.schema!, name: e.target.value })}
                      placeholder={data.settings.siteName}
                    />
                  </Field>
                  <Field label="Price Range">
                    <input
                      className={inputCls}
                      value={seo.schema.priceRange || '$$$$'}
                      onChange={(e) => update('schema', { ...seo.schema!, priceRange: e.target.value })}
                      placeholder="$$$$"
                    />
                  </Field>
                </div>
              )}

              {/* FAQPage Fields */}
              {seo.schema?.type === 'FAQPage' && (
                <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">FAQ Accordion Items</h3>
                    <Btn
                      variant="soft"
                      className="text-xs py-1.5 px-3"
                      onClick={() => {
                        const current = seo.schema?.faqs || [];
                        update('schema', {
                          ...(seo.schema || { type: 'FAQPage' }),
                          type: 'FAQPage',
                          faqs: [...current, { question: '', answer: '' }],
                        });
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Question
                    </Btn>
                  </div>

                  {(!seo.schema.faqs || seo.schema.faqs.length === 0) && (
                    <p className="text-xs text-slate-500 py-3 text-center border border-dashed border-slate-300 rounded-lg">
                      No FAQs added yet. Click &quot;Add Question&quot; to build FAQ schema.
                    </p>
                  )}

                  {(seo.schema.faqs || []).map((faq, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">Q#{idx + 1}</span>
                        <button
                          onClick={() => {
                            const next = (seo.schema?.faqs || []).filter((_, i) => i !== idx);
                            update('schema', { ...seo.schema!, faqs: next });
                          }}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                      <input
                        className={inputCls}
                        placeholder="Question (e.g. How long does a branding project take?)"
                        value={faq.question}
                        onChange={(e) => {
                          const next = [...(seo.schema?.faqs || [])];
                          next[idx] = { ...next[idx], question: e.target.value };
                          update('schema', { ...seo.schema!, faqs: next });
                        }}
                      />
                      <textarea
                        rows={2}
                        className={inputCls}
                        placeholder="Answer text..."
                        value={faq.answer}
                        onChange={(e) => {
                          const next = [...(seo.schema?.faqs || [])];
                          next[idx] = { ...next[idx], answer: e.target.value };
                          update('schema', { ...seo.schema!, faqs: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* BreadcrumbList Fields */}
              {seo.schema?.type === 'BreadcrumbList' && (
                <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Breadcrumb Trail</h3>
                    <Btn
                      variant="soft"
                      className="text-xs py-1.5 px-3"
                      onClick={() => {
                        const current = seo.schema?.breadcrumbs || [];
                        update('schema', {
                          ...(seo.schema || { type: 'BreadcrumbList' }),
                          type: 'BreadcrumbList',
                          breadcrumbs: [...current, { name: '', url: '' }],
                        });
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Step
                    </Btn>
                  </div>

                  {(!seo.schema.breadcrumbs || seo.schema.breadcrumbs.length === 0) && (
                    <p className="text-xs text-slate-500 py-3 text-center border border-dashed border-slate-300 rounded-lg">
                      No breadcrumbs defined. Click &quot;Add Step&quot; to configure custom trail.
                    </p>
                  )}

                  {(seo.schema.breadcrumbs || []).map((bc, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <input
                        className={inputCls}
                        placeholder="Label (e.g. Services)"
                        value={bc.name}
                        onChange={(e) => {
                          const next = [...(seo.schema?.breadcrumbs || [])];
                          next[idx] = { ...next[idx], name: e.target.value };
                          update('schema', { ...seo.schema!, breadcrumbs: next });
                        }}
                      />
                      <input
                        className={inputCls}
                        placeholder="URL (e.g. /services)"
                        value={bc.url}
                        onChange={(e) => {
                          const next = [...(seo.schema?.breadcrumbs || [])];
                          next[idx] = { ...next[idx], url: e.target.value };
                          update('schema', { ...seo.schema!, breadcrumbs: next });
                        }}
                      />
                      <button
                        onClick={() => {
                          const next = (seo.schema?.breadcrumbs || []).filter((_, i) => i !== idx);
                          update('schema', { ...seo.schema!, breadcrumbs: next });
                        }}
                        className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom JSON-LD */}
              {seo.schema?.type === 'Custom' && (
                <div className="space-y-3">
                  <Field label="Custom JSON-LD Code" hint="Paste valid Schema.org JSON object directly.">
                    <textarea
                      rows={8}
                      className={`${inputCls} font-mono text-xs`}
                      value={seo.schema.customJsonLd || ''}
                      onChange={(e) => update('schema', { ...(seo.schema || { type: 'Custom' }), type: 'Custom', customJsonLd: e.target.value })}
                      placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Custom Title"\n}`}
                    />
                  </Field>
                </div>
              )}

              {/* Live JSON-LD Output Box */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-violet-600" />
                    <span className="text-xs font-bold text-slate-800">Generated JSON-LD Output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const json = buildPageSchemaJson(seo.schema || { type: 'WebPage' }, data.settings, data.entry.path, effTitle, effDesc);
                        if (json) {
                          navigator.clipboard.writeText(json);
                          setCopiedSchema(true);
                          setTimeout(() => setCopiedSchema(false), 2000);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 cursor-pointer"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSchema ? 'Copied!' : 'Copy Code'}
                    </button>
                    <a
                      href="https://validator.schema.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 ml-2"
                    >
                      <ExternalLink className="w-3 h-3" /> Test on Schema.org
                    </a>
                  </div>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
                  {buildPageSchemaJson(seo.schema || { type: 'WebPage' }, data.settings, data.entry.path, effTitle, effDesc) || '// No schema generated'}
                </pre>
              </div>
            </Card>
          )}

          {tab === 'advanced' && (
            <Card className="p-6 space-y-5">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 leading-relaxed">
                <strong>Be careful here.</strong> Turning off “Allow Google to show this page” removes it from search results.
              </div>
              <div className="divide-y divide-slate-100">
                <Toggle checked={seo.robots.index} onChange={(v) => update('robots', { ...seo.robots, index: v })} label="Allow Google to show this page in search results" hint="Keep ON for every page you want to rank. Turn OFF only for thank-you pages, drafts or private pages." />
                <Toggle checked={seo.robots.follow} onChange={(v) => update('robots', { ...seo.robots, follow: v })} label="Allow Google to follow links on this page" hint="Keep ON so ranking power flows to your other pages." />
                <Toggle checked={!seo.robots.noarchive} onChange={(v) => update('robots', { ...seo.robots, noarchive: !v })} label="Allow cached copy in Google" hint="Almost always ON." />
                <Toggle checked={!seo.robots.nosnippet} onChange={(v) => update('robots', { ...seo.robots, nosnippet: !v })} label="Allow text snippets in results" hint="Turning this OFF hides your description in Google and usually lowers clicks." />
                <Toggle checked={seo.cornerstone} onChange={(v) => update('cornerstone', v)} label="Cornerstone content" hint="Mark your most important pages. They get extra internal links and should be the best content on the site." />
              </div>
              <Field label="Canonical URL" tip="Tells Google which URL is the ‘main’ version when similar pages exist. Leave blank for the page’s own URL, which is right 99% of the time." hint="Blank = this page’s own URL (recommended).">
                <input className={inputCls} value={seo.canonical} onChange={(e) => update('canonical', e.target.value)} placeholder="https://… (usually leave empty)" />
              </Field>
              <Field label="Breadcrumb title" hint="Name shown in breadcrumbs in Google. Blank = page name.">
                <input className={inputCls} value={seo.breadcrumbTitle} onChange={(e) => update('breadcrumbTitle', e.target.value)} placeholder={data.entry.label} />
              </Field>
            </Card>
          )}

          {tab === 'notes' && (
            <Card className="p-6">
              <Field label="Internal notes" hint="Only visible here in the admin panel. Use for to-dos, keyword research, competitor notes.">
                <textarea rows={10} className={inputCls} value={seo.notes} onChange={(e) => update('notes', e.target.value)} />
              </Field>
            </Card>
          )}
        </div>

        {/* RIGHT: analysis */}
        <div className="xl:sticky xl:top-6 space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Analysis</h2>
              <button onClick={loadContent} disabled={loadingContent} className="text-xs font-semibold text-violet-600 hover:text-violet-800 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
                {loadingContent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} Re-read page
              </button>
            </div>
            {result ? (
              <AnalysisPanel seo={result.seo} readability={result.readability} seoScore={result.seoScore} readabilityScore={result.readabilityScore} />
            ) : loadingContent ? (
              <Spinner text="Reading the live page…" />
            ) : (
              <p className="text-sm text-red-600">{contentError || 'No analysis available yet.'}</p>
            )}
          </Card>
          <p className="text-xs text-slate-500 leading-relaxed px-1">
            Title, description and keyphrase checks update as you type. Content checks (headings, text, images, links) read the live page. After changing the page itself, click “Re-read page”.
          </p>
        </div>
      </div>
    </div>
  );
}
