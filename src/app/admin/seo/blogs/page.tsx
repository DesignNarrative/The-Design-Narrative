'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, BookOpen, Trash2, Edit3, Globe, EyeOff, Search } from 'lucide-react';
import type { BlogPost } from '@/lib/seo/types';
import { api, Btn, Card, inputCls, Spinner, useToast } from '@/components/admin-seo/ui';

export default function BlogsListPage() {
  const toast = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await api<{ blogs: BlogPost[] }>('/api/seo/blogs');
      setBlogs(res.blogs || []);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load blogs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNew = async () => {
    setCreating(true);
    try {
      const res = await api<{ blog: BlogPost }>('/api/seo/blogs', {
        method: 'POST',
        body: JSON.stringify({
          blog: {
            title: 'New Article Draft',
            category: 'Branding & Design',
            content: 'Write your insightful article here...',
            author: 'TDN Strategy Team',
            readTime: '4 min read',
            published: false,
          },
        }),
      });
      toast('Draft created.');
      window.location.href = `/admin/seo/blogs/${res.blog.id}`;
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to create article.', 'error');
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete blog post "${title}"?`)) return;
    try {
      const res = await api<{ blogs: BlogPost[] }>(`/api/seo/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs(res.blogs || []);
      toast('Post deleted.');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Delete failed.', 'error');
    }
  };

  const filtered = blogs.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q);
  });

  if (loading) return <Spinner text="Loading blog articles..." />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog &amp; Content CMS</h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish thought-leadership articles, case analysis, and rank for long-tail search intent.
          </p>
        </div>

        <Btn onClick={handleCreateNew} loading={creating}>
          <Plus className="w-4 h-4" /> Create New Article
        </Btn>
      </div>

      {/* Search Bar */}
      <Card className="p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
          placeholder="Search articles by title, category, or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Blogs Table */}
      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-slate-600 font-medium">No blog articles found.</div>
            <p className="text-xs text-slate-400">Click &quot;Create New Article&quot; to begin drafting your first post.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Article Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/seo/blogs/${b.id}`}
                        className="font-bold text-slate-900 hover:text-violet-700 block"
                      >
                        {b.title}
                      </Link>
                      <span className="text-xs font-mono text-slate-400">/blogs/{b.slug}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                        {b.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600 font-medium">{b.author}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        b.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.published ? <Globe className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {b.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/seo/blogs/${b.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 p-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(b.id, b.title)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer align-middle"
                        title="Delete article"
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
