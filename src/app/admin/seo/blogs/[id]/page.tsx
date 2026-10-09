'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save, Globe, EyeOff, Upload, Sparkles } from 'lucide-react';
import type { BlogPost, PageContent, PageSeo } from '@/lib/seo/types';
import { analyze } from '@/lib/seo/analysis';
import { AnalysisPanel } from '@/components/admin-seo/SeoWidgets';
import { api, Btn, Card, Field, inputCls, Spinner, Toggle, useToast } from '@/components/admin-seo/ui';

export default function BlogEditorPage() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBlog = async () => {
    setLoading(true);
    try {
      const res = await api<{ blog: BlogPost }>(`/api/seo/blogs/${id}`);
      setBlog(res.blog);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load article.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateBlog = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) => {
    setBlog((prev) => (prev ? { ...prev, [k]: v } : prev));
  };

  const updateSeo = <K extends keyof PageSeo>(k: K, v: PageSeo[K]) => {
    setBlog((prev) => (prev ? { ...prev, seo: { ...prev.seo, [k]: v } } : prev));
  };

  const handleSave = async () => {
    if (!blog) return;
    setSaving(true);
    try {
      const res = await api<{ blog: BlogPost }>(`/api/seo/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ blog }),
      });
      setBlog(res.blog);
      toast('Article and SEO settings saved successfully.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadFeatured = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/seo/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      updateBlog('featuredImage', data.url);
      toast('Featured image uploaded.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Upload failed.', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Convert blog text to pseudo PageContent for real-time Yoast analysis
  const pseudoContent: PageContent = useMemo(() => {
    if (!blog) {
      return {
        title: '',
        description: '',
        canonical: '',
        robots: '',
        ogImage: '',
        blocks: [],
        text: '',
        h1s: [],
        wordCount: 0,
        images: [],
        links: [],
      };
    }

    const paragraphs = blog.content.split('\n\n').filter(Boolean);
    const blocks = [
      { type: 'heading' as const, level: 1, text: blog.title },
      ...paragraphs.map((p) => ({ type: 'text' as const, text: p.trim() })),
    ];
    const text = `${blog.title} ${blog.content}`;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    return {
      title: blog.seo.title || blog.title,
      description: blog.seo.description || blog.excerpt,
      canonical: '',
      robots: 'index, follow',
      ogImage: blog.featuredImage,
      blocks,
      text,
      h1s: [blog.title],
      wordCount,
      images: blog.featuredImage ? [{ src: blog.featuredImage, alt: blog.title }] : [],
      links: [],
    };
  }, [blog]);

  const analysis = useMemo(() => {
    if (!blog) return null;
    return analyze({
      selfKey: blog.id,
      path: `/blogs/${blog.slug}`,
      keyphrase: blog.seo.focusKeyphrase,
      title: blog.seo.title || blog.title,
      description: blog.seo.description || blog.excerpt,
      content: pseudoContent,
      others: [],
    });
  }, [blog, pseudoContent]);

  if (loading) return <Spinner text="Loading article editor..." />;
  if (!blog) return <p className="text-red-600">Post not found.</p>;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/seo/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-violet-700 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 truncate max-w-xl">
            {blog.title || 'Untitled Article'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Btn onClick={handleSave} loading={saving}>
            <Save className="w-4 h-4" /> Save Article
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] gap-6 items-start">
        {/* LEFT: Content & SEO Details */}
        <div className="space-y-6 min-w-0">
          {/* Article Info */}
          <Card className="p-6 space-y-5">
            <Field label="Article Title (H1)">
              <input
                className={`${inputCls} font-bold text-base`}
                value={blog.title}
                onChange={(e) => updateBlog('title', e.target.value)}
                placeholder="Enter compelling article headline..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="URL Slug (/blogs/...)">
                <input
                  className={`${inputCls} font-mono text-xs`}
                  value={blog.slug}
                  onChange={(e) => updateBlog('slug', e.target.value)}
                />
              </Field>
              <Field label="Category">
                <input
                  className={inputCls}
                  value={blog.category}
                  onChange={(e) => updateBlog('category', e.target.value)}
                  placeholder="e.g. Brand Strategy"
                />
              </Field>
              <Field label="Author">
                <input
                  className={inputCls}
                  value={blog.author}
                  onChange={(e) => updateBlog('author', e.target.value)}
                />
              </Field>
            </div>

            <Field label="Excerpt / Short Summary">
              <textarea
                rows={2}
                className={inputCls}
                value={blog.excerpt}
                onChange={(e) => updateBlog('excerpt', e.target.value)}
                placeholder="Brief summary that appears on blog cards and search snippets..."
              />
            </Field>

            {/* Featured Image */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800 block">Featured Image</label>
              <div className="flex items-center gap-4">
                <input
                  className={`${inputCls} flex-1`}
                  placeholder="/assets/... or image URL"
                  value={blog.featuredImage}
                  onChange={(e) => updateBlog('featuredImage', e.target.value)}
                />
                <Btn
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  loading={uploading}
                >
                  <Upload className="w-4 h-4" /> Upload
                </Btn>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadFeatured}
                />
              </div>
            </div>

            <Field label="Article Body (Markdown / Text)">
              <textarea
                rows={16}
                className={`${inputCls} font-mono text-xs leading-relaxed`}
                value={blog.content}
                onChange={(e) => updateBlog('content', e.target.value)}
                placeholder="Write your article paragraphs here. Use blank lines between paragraphs..."
              />
            </Field>
          </Card>

          {/* Dedicated Blog SEO Meta */}
          <Card className="p-6 space-y-5">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" /> Article SEO Optimization
            </h2>

            <Field label="Focus Keyphrase" hint="Target search query for this blog post">
              <input
                className={inputCls}
                value={blog.seo.focusKeyphrase}
                onChange={(e) => updateSeo('focusKeyphrase', e.target.value)}
                placeholder="e.g. rebranding checklist 2026"
              />
            </Field>

            <Field label="Custom SEO Title" hint="Leave blank to use the article title automatically">
              <input
                className={inputCls}
                value={blog.seo.title}
                onChange={(e) => updateSeo('title', e.target.value)}
                placeholder={blog.title}
              />
            </Field>

            <Field label="Meta Description" hint="Leave blank to use the excerpt automatically">
              <textarea
                rows={3}
                className={inputCls}
                value={blog.seo.description}
                onChange={(e) => updateSeo('description', e.target.value)}
                placeholder={blog.excerpt}
              />
            </Field>
          </Card>
        </div>

        {/* RIGHT: Yoast-style Live Scoring Sidebar & Publishing State */}
        <div className="xl:sticky xl:top-6 space-y-6">
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold text-slate-900">Publishing Status</h2>
            <div className="divide-y divide-slate-100">
              <Toggle
                checked={blog.published}
                onChange={(v) => updateBlog('published', v)}
                label={blog.published ? 'Live & Indexed' : 'Draft Mode'}
                hint={blog.published ? 'Article is live and included in sitemap.xml' : 'Article is hidden from public view'}
              />
            </div>
            <Btn onClick={handleSave} loading={saving} className="w-full">
              {blog.published ? 'Update Live Article' : 'Save Draft'}
            </Btn>
          </Card>

          <Card className="p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Real-Time SEO Analysis</h2>
            {analysis ? (
              <AnalysisPanel
                seo={analysis.seo}
                readability={analysis.readability}
                seoScore={analysis.seoScore}
                readabilityScore={analysis.readabilityScore}
              />
            ) : (
              <Spinner />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
