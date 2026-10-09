// Shared types for the SEO admin panel. Safe to import from client and server code.

export type Status = 'good' | 'ok' | 'bad' | 'info';

export interface Robots {
  index: boolean;
  follow: boolean;
  noarchive: boolean;
  nosnippet: boolean;
}

export interface SocialMeta {
  title: string;
  description: string;
  image: string;
}

export interface CheckSummary {
  id: string;
  title: string;
  status: Status;
}

export interface LiveMeta {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  h1Count: number;
}

export interface AnalysisSummary {
  at: string;
  seoScore: number;
  readabilityScore: number;
  wordCount: number;
  seo: { good: number; ok: number; bad: number };
  readability: { good: number; ok: number; bad: number };
  issues: CheckSummary[];
  live: LiveMeta;
}

export type SchemaType = 'WebPage' | 'LocalBusiness' | 'Organization' | 'Service' | 'FAQPage' | 'BreadcrumbList' | 'Article' | 'Custom';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PageSchema {
  type: SchemaType;
  name?: string;
  description?: string;
  serviceType?: string;
  priceRange?: string;
  faqs?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
  customJsonLd?: string;
}

export interface PageSeo {
  focusKeyphrase: string;
  relatedKeyphrases: string[];
  /** May contain variables: %%page%% %%sitename%% %%sep%% %%tagline%% */
  title: string;
  /** May contain variables: %%page%% %%sitename%% %%sep%% %%tagline%% */
  description: string;
  /** '' = self-referencing canonical */
  canonical: string;
  robots: Robots;
  breadcrumbTitle: string;
  cornerstone: boolean;
  og: SocialMeta;
  twitter: SocialMeta & { card: 'summary' | 'summary_large_image' };
  schema?: PageSchema;
  notes: string;
  updatedAt: string | null;
  analysis?: AnalysisSummary;
}

export interface OfficeNap {
  city: string;
  name: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
  telephone: string;
  email: string;
  latitude?: number;
  longitude?: number;
}

export interface VerificationTokens {
  googleSiteVerification: string;
  bingValidate: string;
  pinterestVerification: string;
}

export interface TrackingScripts {
  ga4MeasurementId: string;
  gtmContainerId: string;
  metaPixelId: string;
}

export interface TechnicalConfig {
  verification: VerificationTokens;
  tracking: TrackingScripts;
  customRobotsTxt: string;
  customLlmsTxt: string;
  sitemapExcludedKeys: string[];
  napList: OfficeNap[];
}

export interface SeoSettings {
  siteName: string;
  separator: string;
  tagline: string;
  /** Production domain, e.g. https://example.com (no trailing slash). Empty until provided. */
  domain: string;
  defaultOgImage: string;
  twitterHandle: string;
  technical: TechnicalConfig;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  permanent: boolean; // true = 301, false = 302
  enabled: boolean;
  hits: number;
  createdAt: string;
}

export interface NotFoundLog {
  id: string;
  path: string;
  hits: number;
  lastSeen: string;
  referer: string;
}

export interface ImageAltRecord {
  src: string;
  alt: string;
  title: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  featuredImage: string;
  published: boolean;
  publishedAt: string;
  seo: PageSeo;
}

export interface SeoDb {
  version: 1;
  settings: SeoSettings;
  pages: Record<string, PageSeo>;
  redirects: RedirectRule[];
  notFoundLogs: NotFoundLog[];
  imageAlts: Record<string, ImageAltRecord>;
  blogs: BlogPost[];
  updatedAt: string | null;
}

export interface VersionMeta {
  id: string;
  at: string;
  reason: string;
}

export interface PageRegistryEntry {
  key: string;
  label: string;
  path: string;
  group: 'Main' | 'Services' | 'Case Studies';
}

export interface PageRow extends PageRegistryEntry {
  seo: PageSeo;
}

export interface ContentBlock {
  type: 'heading' | 'text';
  level?: number;
  text: string;
}

export interface PageContent {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  blocks: ContentBlock[];
  /** All visible text inside <main> (used for word count and keyphrase density) */
  text: string;
  h1s: string[];
  wordCount: number;
  images: { src: string; alt: string | null }[];
  links: { href: string; text: string; internal: boolean }[];
}

export const VARIABLE_HELP = [
  { v: '%%page%%', d: 'Name of this page' },
  { v: '%%sitename%%', d: 'Your site name' },
  { v: '%%sep%%', d: 'Title separator' },
  { v: '%%tagline%%', d: 'Your site tagline' },
];

export function defaultTechnicalConfig(): TechnicalConfig {
  return {
    verification: {
      googleSiteVerification: '',
      bingValidate: '',
      pinterestVerification: '',
    },
    tracking: {
      ga4MeasurementId: '',
      gtmContainerId: '',
      metaPixelId: '',
    },
    customRobotsTxt: '',
    customLlmsTxt: `# The Design Narrative (TDN) - LLM Overview
# Pune & Jaipur Creative Agency

Site: https://the-design-narrative.vercel.app
Description: The Design Narrative (TDN) is an elite branding, UI/UX design, and digital growth agency headquartered in Pune with a creative lab in Jaipur.
Specializations: Brand Identity, Luxury Packaging, Frictionless UI/UX, Social Media Marketing, Performance Ads, Technical SEO.
Offices:
- Pune HQ: CTS 927, Office No.302, Sanas Memories, F.C. Road, Pune - 411005 (Phone: +91 9850 417 266)
- Jaipur Studio: 8 Khaliya house, Raj Bhawan Road, Gayatri Nagar, Sodala, Jaipur - 302015 (Phone: +91 7387 234 785)
`,
    sitemapExcludedKeys: [],
    napList: [
      {
        city: 'Pune',
        name: 'The Design Narrative - Pune HQ',
        streetAddress: 'CTS 927, Office No.302, Sanas Memories, F.C. Road',
        addressLocality: 'Pune',
        postalCode: '411005',
        addressCountry: 'IN',
        telephone: '+91 9850 417 266',
        email: 'ceo@thedesignnarrative.in',
        latitude: 18.5204,
        longitude: 73.8567,
      },
      {
        city: 'Jaipur',
        name: 'The Design Narrative - Jaipur Creative Lab',
        streetAddress: '8 Khaliya house, Raj Bhawan Road, Gayatri Nagar, Sodala',
        addressLocality: 'Jaipur',
        postalCode: '302015',
        addressCountry: 'IN',
        telephone: '+91 7387 234 785',
        email: 'digital@thedesignnarrative.in',
        latitude: 26.9124,
        longitude: 75.7873,
      },
    ],
  };
}

export function defaultSettings(): SeoSettings {
  return {
    siteName: 'The Design Narrative',
    separator: '|',
    tagline: 'Digital Marketing & Branding Agency Pune',
    domain: '',
    defaultOgImage: '',
    twitterHandle: '',
    technical: defaultTechnicalConfig(),
  };
}

export function defaultPageSeo(): PageSeo {
  return {
    focusKeyphrase: '',
    relatedKeyphrases: [],
    title: '',
    description: '',
    canonical: '',
    robots: { index: true, follow: true, noarchive: false, nosnippet: false },
    breadcrumbTitle: '',
    cornerstone: false,
    og: { title: '', description: '', image: '' },
    twitter: { title: '', description: '', image: '', card: 'summary_large_image' },
    schema: { type: 'WebPage' },
    notes: '',
    updatedAt: null,
  };
}
