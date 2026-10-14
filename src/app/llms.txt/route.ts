import { readDb } from '@/lib/seo/store';

export async function GET() {
  const db = await readDb();
  const domain = (db.settings.domain || process.env.NEXT_PUBLIC_SITE_URL || 'https://thedesignnarrative.in').replace(/\/+$/, '');
  const content = db.settings.technical.customLlmsTxt || `# The Design Narrative (TDN) - LLMs.txt
Site: ${domain}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
