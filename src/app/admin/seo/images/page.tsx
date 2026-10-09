'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Search, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { api, Btn, Card, Field, inputCls, Spinner, useToast } from '@/components/admin-seo/ui';

interface ImageItem {
  src: string;
  pages: string[];
  alt: string;
  title: string;
  isCustom: boolean;
  updatedAt: string | null;
}

export default function ImageSeoPage() {
  const toast = useToast();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMissing, setFilterMissing] = useState(false);
  const [search, setSearch] = useState('');
  const [savingSrc, setSavingSrc] = useState<string | null>(null);

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await api<{ images: ImageItem[] }>('/api/seo/images');
      setImages(res.images || []);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to scan images.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (src: string, field: 'alt' | 'title', value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.src === src ? { ...img, [field]: value, isCustom: true } : img))
    );
  };

  const handleSave = async (item: ImageItem) => {
    setSavingSrc(item.src);
    try {
      await api('/api/seo/images', {
        method: 'POST',
        body: JSON.stringify({
          src: item.src,
          alt: item.alt,
          title: item.title,
        }),
      });
      toast(`Alt text saved for ${item.src.split('/').pop()}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Save failed.', 'error');
    } finally {
      setSavingSrc(null);
    }
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      toast(`Uploaded image to ${data.url}`);
      loadImages();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Upload failed.', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const filtered = images.filter((img) => {
    if (filterMissing && img.alt.trim()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return img.src.toLowerCase().includes(q) || img.alt.toLowerCase().includes(q) || img.pages.some((p) => p.toLowerCase().includes(q));
    }
    return true;
  });

  const missingCount = images.filter((i) => !i.alt.trim()).length;

  if (loading) return <Spinner text="Scanning images across website..." />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Image SEO &amp; Media Alt-Text Hub</h1>
          <p className="text-sm text-slate-500 mt-1">
            Centrally manage image Alt descriptions, titles, and media assets to rank on Google Images.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Btn variant="ghost" onClick={() => uploadInputRef.current?.click()} loading={uploading}>
            <Upload className="w-4 h-4" /> Upload New Asset
          </Btn>
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadFile}
          />
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{images.length}</div>
            <div className="text-xs text-slate-500">Total Scanned Images</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{images.length - missingCount}</div>
            <div className="text-xs text-slate-500">Optimized Images</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${missingCount > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">{missingCount}</div>
            <div className="text-xs text-slate-500">Missing Alt Text</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Search by image filename or page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMissing(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              !filterMissing ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Images ({images.length})
          </button>
          <button
            onClick={() => setFilterMissing(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filterMissing ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            Missing Alt ({missingCount})
          </button>
        </div>
      </Card>

      {/* Images List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="p-8 text-center text-slate-500 text-sm">
            No images match your search criteria.
          </Card>
        ) : (
          filtered.map((item) => {
            const fileName = item.src.split('/').pop() || item.src;
            return (
              <Card key={item.src} className="p-5 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Thumbnail Preview */}
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  {item.src.startsWith('http') || item.src.startsWith('/') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.alt || ''}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                </div>

                {/* Details and Inputs */}
                <div className="flex-1 min-w-0 space-y-3 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-900 truncate max-w-md">
                        {fileName}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-lg">
                        Path: {item.src}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.pages.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-600">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Alt Text (Required for SEO)">
                      <input
                        className={inputCls}
                        placeholder="Describe what is in this image for Google & screen readers..."
                        value={item.alt}
                        onChange={(e) => handleUpdate(item.src, 'alt', e.target.value)}
                      />
                    </Field>
                    <Field label="Image Title / Tooltip (Optional)">
                      <input
                        className={inputCls}
                        placeholder="Optional hover title..."
                        value={item.title}
                        onChange={(e) => handleUpdate(item.src, 'title', e.target.value)}
                      />
                    </Field>
                  </div>
                </div>

                {/* Save Button */}
                <div className="shrink-0 self-end md:self-center">
                  <Btn
                    variant="soft"
                    onClick={() => handleSave(item)}
                    loading={savingSrc === item.src}
                  >
                    <Save className="w-4 h-4" /> Save
                  </Btn>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
