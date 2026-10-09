import { readDb } from '@/lib/seo/store';

export async function GET() {
  const db = await readDb();
  const domain = (db.settings.domain || 'https://the-design-narrative.vercel.app').replace(/\/+$/, '');

  if (db.settings.technical.customRobotsTxt?.trim()) {
    return new Response(db.settings.technical.customRobotsTxt.trim(), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const content = `# Robots.txt for ${db.settings.siteName}
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/seo

# Sitemaps
Sitemap: ${domain}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
