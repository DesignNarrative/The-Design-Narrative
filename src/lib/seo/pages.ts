import { PROJECTS } from '@/data/projects';
import type { PageRegistryEntry } from './types';

const STATIC_PAGES: PageRegistryEntry[] = [
  { key: 'home', label: 'Home', path: '/', group: 'Main' },
  { key: 'about', label: 'About Us', path: '/about', group: 'Main' },
  { key: 'services', label: 'Services', path: '/services', group: 'Main' },
  { key: 'work', label: 'Our Work', path: '/work', group: 'Main' },
  { key: 'blogs', label: 'Blogs', path: '/blogs', group: 'Main' },
  { key: 'resources', label: 'Resources', path: '/resources', group: 'Main' },
  { key: 'careers', label: 'Careers', path: '/careers', group: 'Main' },
  { key: 'contact', label: 'Say Hello (Contact)', path: '/contact', group: 'Main' },
  { key: 'service-brand-design', label: 'Brand Design', path: '/services/brand-design', group: 'Services' },
  { key: 'service-ui-ux', label: 'UI/UX Design', path: '/services/ui-ux', group: 'Services' },
  { key: 'service-social-media', label: 'Social Media Marketing', path: '/services/social-media', group: 'Services' },
  { key: 'service-seo', label: 'SEO & Growth', path: '/services/seo', group: 'Services' },
];

/** Every page that can be managed. Case studies come from the existing projects data (read-only). */
export function getPageRegistry(): PageRegistryEntry[] {
  const caseStudies: PageRegistryEntry[] = PROJECTS.map((p) => ({
    key: `work-${p.id}`,
    label: `Case Study: ${p.title}`,
    path: `/work/${p.id}`,
    group: 'Case Studies' as const,
  }));
  return [...STATIC_PAGES, ...caseStudies];
}

export function findPage(key: string): PageRegistryEntry | undefined {
  return getPageRegistry().find((p) => p.key === key);
}
