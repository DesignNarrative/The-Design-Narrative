import { resolveTemplate, type OtherPage } from './analysis';
import { getPageRegistry } from './pages';
import type { PageSeo, SeoDb, SeoSettings } from './types';

export function templateVars(settings: SeoSettings, pageLabel: string) {
  return { page: pageLabel, sitename: settings.siteName, sep: settings.separator, tagline: settings.tagline };
}

/** What Google would show for this page: the custom value if set, otherwise whatever the site serves today. */
export function effectiveSnippet(
  seo: PageSeo,
  settings: SeoSettings,
  pageLabel: string,
  live: { title: string; description: string }
) {
  const vars = templateVars(settings, pageLabel);
  const title = seo.title.trim() ? resolveTemplate(seo.title, vars) : live.title;
  const description = seo.description.trim() ? resolveTemplate(seo.description, vars) : live.description;
  return { title, description };
}

/** Other pages' titles/descriptions/keyphrases, for duplicate + cannibalisation checks. */
export function buildOthers(db: SeoDb, excludeKey: string): OtherPage[] {
  return getPageRegistry()
    .filter((p) => p.key !== excludeKey)
    .map((p) => {
      const seo = db.pages[p.key];
      const live = seo?.analysis?.live ?? { title: '', description: '' };
      const snip = effectiveSnippet(
        seo ?? ({ title: '', description: '' } as PageSeo),
        db.settings,
        p.label,
        live
      );
      return {
        key: p.key,
        label: p.label,
        title: snip.title,
        description: snip.description,
        keyphrase: seo?.focusKeyphrase ?? '',
      };
    });
}
