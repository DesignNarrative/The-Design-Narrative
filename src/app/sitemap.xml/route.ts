import { getPageRegistry } from '@/lib/seo/pages';
import { readDb } from '@/lib/seo/store';

export async function GET() {
  const db = await readDb();
  const domain = (db.settings.domain || 'https://the-design-narrative.vercel.app').replace(/\/+$/, '');
  const excluded = new Set(db.settings.technical.sitemapExcludedKeys || []);
  const registry = getPageRegistry();

  const pages = registry
    .filter((p) => !excluded.has(p.key))
    .filter((p) => {
      const seo = db.pages[p.key];
      return seo ? seo.robots.index : true;
    })
    .map((p) => {
      const seo = db.pages[p.key];
      const priority = p.path === '/' ? '1.0' : p.group === 'Services' ? '0.9' : p.group === 'Main' ? '0.8' : '0.7';
      const changefreq = p.path === '/' ? 'daily' : p.group === 'Services' ? 'weekly' : 'monthly';
      const lastmod = seo?.updatedAt ? new Date(seo.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      return `  <url>
    <loc>${domain}${p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

  // Include published blog posts
  const blogs = (db.blogs || [])
    .filter((b) => b.published)
    .map((b) => {
      const lastmod = b.publishedAt ? new Date(b.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      return `  <url>
    <loc>${domain}/blogs/${b.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...blogs].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
