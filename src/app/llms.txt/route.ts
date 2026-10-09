import { readDb } from '@/lib/seo/store';

export async function GET() {
  const db = await readDb();
  const content = db.settings.technical.customLlmsTxt || `# The Design Narrative (TDN) - LLMs.txt
Site: https://the-design-narrative.vercel.app
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
