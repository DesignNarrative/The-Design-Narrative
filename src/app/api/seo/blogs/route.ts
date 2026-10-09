import { mutateDb, readDb, sanitizeBlogPost } from '@/lib/seo/store';
import { fail, guard, json, readBody } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const db = await readDb();
  return json({ blogs: db.blogs || [] });
}

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const body = await readBody<{ blog?: unknown }>(req);
  if (!body || typeof body.blog !== 'object') return fail('Invalid data.');

  const post = sanitizeBlogPost(body.blog);
  const db = await mutateDb(`Created blog post: "${post.title}"`, (d) => {
    // Unique slug check
    let uniqueSlug = post.slug;
    let counter = 1;
    while (d.blogs.some((b) => b.slug === uniqueSlug && b.id !== post.id)) {
      uniqueSlug = `${post.slug}-${counter}`;
      counter++;
    }
    post.slug = uniqueSlug;
    d.blogs.unshift(post);
  });

  return json({ ok: true, blog: post, blogs: db.blogs });
}
