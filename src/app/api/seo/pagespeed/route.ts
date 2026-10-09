import { readDb } from '@/lib/seo/store';
import { fail, guard, json } from '@/lib/seo/api';

export async function GET(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') || '/';
  const strategy = searchParams.get('strategy') === 'desktop' ? 'desktop' : 'mobile';

  const db = await readDb();
  const domain = (db.settings.domain || 'https://the-design-narrative.vercel.app').replace(/\/+$/, '');
  const targetUrl = `${domain}${path.startsWith('/') ? '' : '/'}${path}`;

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      targetUrl
    )}&strategy=${strategy}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;

    const res = await fetch(apiUrl, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(45000),
    });

    if (!res.ok) {
      return fail(`Google PageSpeed API returned HTTP ${res.status}. Note: requires live accessible domain.`);
    }

    const data = await res.json();
    const lighthouse = data.lighthouseResult;

    const scores = {
      performance: Math.round((lighthouse?.categories?.performance?.score ?? 0) * 100),
      seo: Math.round((lighthouse?.categories?.seo?.score ?? 0) * 100),
      accessibility: Math.round((lighthouse?.categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((lighthouse?.categories?.['best-practices']?.score ?? 0) * 100),
    };

    const metrics = {
      lcp: lighthouse?.audits?.['largest-contentful-paint']?.displayValue ?? 'N/A',
      cls: lighthouse?.audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A',
      fcp: lighthouse?.audits?.['first-contentful-paint']?.displayValue ?? 'N/A',
      tbt: lighthouse?.audits?.['total-blocking-time']?.displayValue ?? 'N/A',
      speedIndex: lighthouse?.audits?.['speed-index']?.displayValue ?? 'N/A',
    };

    return json({ ok: true, targetUrl, strategy, scores, metrics });
  } catch (e) {
    return fail(`PageSpeed audit failed: ${e instanceof Error ? e.message : 'network timeout'}`);
  }
}
