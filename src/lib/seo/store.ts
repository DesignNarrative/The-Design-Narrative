import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import {
  defaultPageSeo,
  defaultSettings,
  defaultTechnicalConfig,
  type BlogPost,
  type ImageAltRecord,
  type NotFoundLog,
  type PageSchema,
  type PageSeo,
  type RedirectRule,
  type SeoDb,
  type SeoSettings,
  type TechnicalConfig,
  type VersionMeta,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'seo-db.json');
const VERSIONS_FILE = path.join(DATA_DIR, 'seo-versions.json');
const MAX_VERSIONS = 40;

interface VersionRecord extends VersionMeta {
  snapshot: SeoDb;
}

// Serialise all writes so concurrent saves can never corrupt the file.
let writeChain: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.catch(() => undefined);
  return run;
}

async function atomicWrite(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, file);
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

function emptyDb(): SeoDb {
  return {
    version: 1,
    settings: defaultSettings(),
    pages: {},
    redirects: [],
    notFoundLogs: [],
    imageAlts: {},
    blogs: [],
    updatedAt: null,
  };
}

/* ---------- Sanitising (never trust client input) ---------- */

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\u0000/g, '').slice(0, max) : '';
const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback);

function cleanUrl(v: unknown, max = 500): string {
  const s = str(v, max).trim();
  if (!s) return '';
  if (s.startsWith('/') && !s.startsWith('//')) return s;
  if (/^https?:\/\//i.test(s)) return s;
  return '';
}

export function sanitizeSchema(input: unknown): PageSchema {
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const rawType = str(i.type, 40) || 'WebPage';
  const type = ['WebPage', 'LocalBusiness', 'Organization', 'Service', 'FAQPage', 'BreadcrumbList', 'Article', 'Custom'].includes(rawType)
    ? (rawType as PageSchema['type'])
    : 'WebPage';

  const faqs = Array.isArray(i.faqs)
    ? i.faqs
        .map((f: unknown) => {
          const item = (f && typeof f === 'object' ? f : {}) as Record<string, unknown>;
          return { question: str(item.question, 200).trim(), answer: str(item.answer, 2000).trim() };
        })
        .filter((f) => f.question && f.answer)
    : [];

  const breadcrumbs = Array.isArray(i.breadcrumbs)
    ? i.breadcrumbs
        .map((b: unknown) => {
          const item = (b && typeof b === 'object' ? b : {}) as Record<string, unknown>;
          return { name: str(item.name, 100).trim(), url: cleanUrl(item.url) };
        })
        .filter((b) => b.name && b.url)
    : [];

  return {
    type,
    name: str(i.name, 200),
    description: str(i.description, 1000),
    serviceType: str(i.serviceType, 120),
    priceRange: str(i.priceRange, 50),
    faqs: faqs.length ? faqs : undefined,
    breadcrumbs: breadcrumbs.length ? breadcrumbs : undefined,
    customJsonLd: str(i.customJsonLd, 10000),
  };
}

export function sanitizePage(input: unknown, existing?: PageSeo): PageSeo {
  const base = existing ?? defaultPageSeo();
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const robots = (i.robots && typeof i.robots === 'object' ? i.robots : {}) as Record<string, unknown>;
  const og = (i.og && typeof i.og === 'object' ? i.og : {}) as Record<string, unknown>;
  const tw = (i.twitter && typeof i.twitter === 'object' ? i.twitter : {}) as Record<string, unknown>;
  const related = Array.isArray(i.relatedKeyphrases)
    ? i.relatedKeyphrases.map((k) => str(k, 80).trim()).filter(Boolean).slice(0, 5)
    : [];

  return {
    focusKeyphrase: str(i.focusKeyphrase, 120).trim(),
    relatedKeyphrases: related,
    title: str(i.title, 300),
    description: str(i.description, 600),
    canonical: cleanUrl(i.canonical),
    robots: {
      index: bool(robots.index, true),
      follow: bool(robots.follow, true),
      noarchive: bool(robots.noarchive, false),
      nosnippet: bool(robots.nosnippet, false),
    },
    breadcrumbTitle: str(i.breadcrumbTitle, 120),
    cornerstone: bool(i.cornerstone, false),
    og: { title: str(og.title, 300), description: str(og.description, 600), image: cleanUrl(og.image) },
    twitter: {
      title: str(tw.title, 300),
      description: str(tw.description, 600),
      image: cleanUrl(tw.image),
      card: tw.card === 'summary' ? 'summary' : 'summary_large_image',
    },
    schema: i.schema ? sanitizeSchema(i.schema) : base.schema,
    notes: str(i.notes, 2000),
    updatedAt: new Date().toISOString(),
    // Keep the last analysis; it is only ever replaced by the analyzer.
    analysis: base.analysis,
  };
}

export function sanitizeTechnical(input: unknown): TechnicalConfig {
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const d = defaultTechnicalConfig();
  const v = (i.verification && typeof i.verification === 'object' ? i.verification : {}) as Record<string, unknown>;
  const t = (i.tracking && typeof i.tracking === 'object' ? i.tracking : {}) as Record<string, unknown>;

  const napList = Array.isArray(i.napList)
    ? i.napList.map((n: unknown) => {
        const item = (n && typeof n === 'object' ? n : {}) as Record<string, unknown>;
        return {
          city: str(item.city, 60) || 'Pune',
          name: str(item.name, 120) || 'The Design Narrative',
          streetAddress: str(item.streetAddress, 200),
          addressLocality: str(item.addressLocality, 100),
          postalCode: str(item.postalCode, 30),
          addressCountry: str(item.addressCountry, 10) || 'IN',
          telephone: str(item.telephone, 40),
          email: str(item.email, 100),
          latitude: typeof item.latitude === 'number' ? item.latitude : undefined,
          longitude: typeof item.longitude === 'number' ? item.longitude : undefined,
        };
      })
    : d.napList;

  const sitemapExcludedKeys = Array.isArray(i.sitemapExcludedKeys)
    ? i.sitemapExcludedKeys.map((k) => str(k, 100)).filter(Boolean)
    : [];

  return {
    verification: {
      googleSiteVerification: str(v.googleSiteVerification, 150).trim(),
      bingValidate: str(v.bingValidate, 150).trim(),
      pinterestVerification: str(v.pinterestVerification, 150).trim(),
    },
    tracking: {
      ga4MeasurementId: str(t.ga4MeasurementId, 50).trim(),
      gtmContainerId: str(t.gtmContainerId, 50).trim(),
      metaPixelId: str(t.metaPixelId, 50).trim(),
    },
    customRobotsTxt: str(i.customRobotsTxt, 10000),
    customLlmsTxt: str(i.customLlmsTxt, 20000) || d.customLlmsTxt,
    sitemapExcludedKeys,
    napList,
  };
}

export function sanitizeSettings(input: unknown): SeoSettings {
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const d = defaultSettings();
  let domain = str(i.domain, 200).trim().replace(/\/+$/, '');
  if (domain && !/^https?:\/\/[^\s/]+\.[^\s/]+$/i.test(domain)) domain = '';
  return {
    siteName: str(i.siteName, 100).trim() || d.siteName,
    separator: str(i.separator, 5).trim() || d.separator,
    tagline: str(i.tagline, 200).trim(),
    domain,
    defaultOgImage: cleanUrl(i.defaultOgImage),
    twitterHandle: str(i.twitterHandle, 40).trim().replace(/^@?/, '@').replace(/^@$/, ''),
    technical: sanitizeTechnical(i.technical),
  };
}

export function sanitizeRedirect(input: unknown): RedirectRule {
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  let source = str(i.source, 500).trim();
  if (!source.startsWith('/')) source = `/${source}`;
  let destination = str(i.destination, 500).trim();
  if (!destination.startsWith('/') && !/^https?:\/\//i.test(destination)) destination = `/${destination}`;
  return {
    id: str(i.id, 64) || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    source,
    destination,
    permanent: bool(i.permanent, true),
    enabled: bool(i.enabled, true),
    hits: typeof i.hits === 'number' ? Math.max(0, i.hits) : 0,
    createdAt: str(i.createdAt, 50) || new Date().toISOString(),
  };
}

export function sanitizeBlogPost(input: unknown): BlogPost {
  const i = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const title = str(i.title, 200).trim() || 'Untitled Post';
  let slug = str(i.slug, 200).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!slug) slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `post-${Date.now()}`;

  const tags = Array.isArray(i.tags)
    ? i.tags.map((t) => str(t, 50).trim()).filter(Boolean)
    : [];

  return {
    id: str(i.id, 64) || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slug,
    title,
    excerpt: str(i.excerpt, 500).trim(),
    content: str(i.content, 100000),
    category: str(i.category, 60).trim() || 'Design & Strategy',
    tags,
    author: str(i.author, 80).trim() || 'TDN Creative Team',
    readTime: str(i.readTime, 30).trim() || '4 min read',
    featuredImage: cleanUrl(i.featuredImage),
    published: bool(i.published, false),
    publishedAt: str(i.publishedAt, 50) || new Date().toISOString(),
    seo: sanitizePage(i.seo),
  };
}

/* ---------- Public API ---------- */

export async function readDb(): Promise<SeoDb> {
  const db = await readJson<SeoDb>(DB_FILE);
  if (!db || db.version !== 1) return emptyDb();
  return {
    ...emptyDb(),
    ...db,
    settings: sanitizeSettings(db.settings),
    redirects: Array.isArray(db.redirects) ? db.redirects.map(sanitizeRedirect) : [],
    notFoundLogs: Array.isArray(db.notFoundLogs) ? db.notFoundLogs : [],
    imageAlts: typeof db.imageAlts === 'object' && db.imageAlts ? db.imageAlts : {},
    blogs: Array.isArray(db.blogs) ? db.blogs.map(sanitizeBlogPost) : [],
  };
}

async function snapshot(reason: string, db: SeoDb) {
  const versions = (await readJson<VersionRecord[]>(VERSIONS_FILE)) ?? [];
  versions.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    reason,
    snapshot: db,
  });
  await atomicWrite(VERSIONS_FILE, versions.slice(0, MAX_VERSIONS));
}

/** Apply a change atomically; records the previous state as a restorable version. */
export function mutateDb(reason: string, fn: (db: SeoDb) => SeoDb | void): Promise<SeoDb> {
  return serial(async () => {
    const current = await readDb();
    await snapshot(reason, current);
    const next = fn(structuredClone(current)) ?? current;
    next.updatedAt = new Date().toISOString();
    await atomicWrite(DB_FILE, next);
    return next;
  });
}

/** Save analysis results without creating a version (they are derived data). */
export function saveAnalysis(key: string, analysis: PageSeo['analysis']): Promise<void> {
  return serial(async () => {
    const db = await readDb();
    db.pages[key] = { ...(db.pages[key] ?? defaultPageSeo()), analysis };
    await atomicWrite(DB_FILE, db);
  });
}

/** Record a 404 hit or update hit counter */
export function logNotFound(hitPath: string, referer = ''): Promise<void> {
  return serial(async () => {
    const db = await readDb();
    const clean = str(hitPath, 300).trim();
    if (!clean || clean.startsWith('/_next') || clean.startsWith('/api') || clean.includes('.')) return;
    const existing = db.notFoundLogs.find((l) => l.path === clean);
    if (existing) {
      existing.hits += 1;
      existing.lastSeen = new Date().toISOString();
      if (referer) existing.referer = str(referer, 300);
    } else {
      db.notFoundLogs.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        path: clean,
        hits: 1,
        lastSeen: new Date().toISOString(),
        referer: str(referer, 300),
      });
      if (db.notFoundLogs.length > 200) db.notFoundLogs = db.notFoundLogs.slice(0, 200);
    }
    await atomicWrite(DB_FILE, db);
  });
}

/** Record redirect hits */
export function trackRedirectHit(ruleId: string): Promise<void> {
  return serial(async () => {
    const db = await readDb();
    const rule = db.redirects.find((r) => r.id === ruleId);
    if (rule) {
      rule.hits += 1;
      await atomicWrite(DB_FILE, db);
    }
  });
}

export async function listVersions(): Promise<VersionMeta[]> {
  const versions = (await readJson<VersionRecord[]>(VERSIONS_FILE)) ?? [];
  return versions.map(({ id, at, reason }) => ({ id, at, reason }));
}

export async function restoreVersion(id: string): Promise<SeoDb | null> {
  const versions = (await readJson<VersionRecord[]>(VERSIONS_FILE)) ?? [];
  const target = versions.find((v) => v.id === id);
  if (!target) return null;
  return mutateDb(`Restored version from ${target.at}`, () => target.snapshot);
}

/** Validate and import a full exported database. */
export function importDb(raw: unknown): Promise<SeoDb> {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  if (r.version !== 1 || typeof r.pages !== 'object' || r.pages === null) {
    throw new Error('Not a valid SEO database export.');
  }
  const pages: Record<string, PageSeo> = {};
  for (const [key, val] of Object.entries(r.pages as Record<string, unknown>).slice(0, 500)) {
    if (/^[a-z0-9-]{1,120}$/.test(key)) pages[key] = sanitizePage(val);
  }
  const settings = sanitizeSettings(r.settings);
  const redirects = Array.isArray(r.redirects) ? r.redirects.map(sanitizeRedirect) : [];
  const imageAlts = typeof r.imageAlts === 'object' && r.imageAlts ? (r.imageAlts as Record<string, ImageAltRecord>) : {};
  const blogs = Array.isArray(r.blogs) ? r.blogs.map(sanitizeBlogPost) : [];
  return mutateDb('Imported database', (db) => ({
    ...db,
    pages,
    settings,
    redirects,
    imageAlts,
    blogs,
  }));
}
