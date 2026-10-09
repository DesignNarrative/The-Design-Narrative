import { mutateDb, readDb, sanitizeBlogPost } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const { id } = await params;
  const db = await readDb();
  const blog = db.blogs.find((b) => b.id === id);
  if (!blog) return fail('Post not found.', 404);

  return json({ blog });
}

export async function PUT(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const { id } = await params;
  const body = await readBody<{ blog?: unknown }>(req);
  if (!body || typeof body.blog !== 'object') return fail('Invalid data.');

  const updated = sanitizeBlogPost(body.blog);
  const db = await mutateDb(`Updated blog post: "${updated.title}"`, (d) => {
    const idx = d.blogs.findIndex((b) => b.id === id);
    if (idx >= 0) {
      d.blogs[idx] = { ...updated, id };
    }
  });

  const saved = db.blogs.find((b) => b.id === id);
  return json({ ok: true, blog: saved });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const { id } = await params;
  const db = await mutateDb(`Deleted blog post ${id}`, (d) => {
    d.blogs = d.blogs.filter((b) => b.id !== id);
  });

  return json({ ok: true, blogs: db.blogs });
}
