import type { OfficeNap, PageSchema, SeoSettings } from './types';

export function buildPageSchemaJson(
  schema: PageSchema | undefined,
  settings: SeoSettings,
  pageUrl: string,
  pageTitle: string,
  pageDescription: string
): string | null {
  if (!schema) return null;
  const domain = settings.domain.replace(/\/+$/, '') || 'https://the-design-narrative.vercel.app';
  const fullUrl = pageUrl.startsWith('http') ? pageUrl : `${domain}${pageUrl.startsWith('/') ? '' : '/'}${pageUrl}`;

  if (schema.type === 'Custom') {
    return schema.customJsonLd?.trim() || null;
  }

  if (schema.type === 'Organization') {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: schema.name || settings.siteName,
      url: domain,
      logo: settings.defaultOgImage ? (settings.defaultOgImage.startsWith('http') ? settings.defaultOgImage : `${domain}${settings.defaultOgImage}`) : undefined,
      description: schema.description || settings.tagline,
      sameAs: [
        'https://instagram.com/thedesignnarrative',
        'https://linkedin.com/company/thedesignnarrative',
      ],
    };
    return JSON.stringify(org, null, 2);
  }

  if (schema.type === 'LocalBusiness') {
    const naps = settings.technical.napList || [];
    const puneNap = naps.find((n) => n.city.toLowerCase() === 'pune') || naps[0];
    const loc = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: schema.name || puneNap?.name || settings.siteName,
      image: settings.defaultOgImage ? `${domain}${settings.defaultOgImage}` : undefined,
      url: domain,
      telephone: puneNap?.telephone || '+91 9850 417 266',
      priceRange: schema.priceRange || '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: puneNap?.streetAddress || 'CTS 927, Office No.302, Sanas Memories, F.C. Road',
        addressLocality: puneNap?.addressLocality || 'Pune',
        postalCode: puneNap?.postalCode || '411005',
        addressCountry: puneNap?.addressCountry || 'IN',
      },
      geo: puneNap?.latitude && puneNap?.longitude ? {
        '@type': 'GeoCoordinates',
        latitude: puneNap.latitude,
        longitude: puneNap.longitude,
      } : undefined,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:30',
        },
      ],
    };
    return JSON.stringify(loc, null, 2);
  }

  if (schema.type === 'Service') {
    const srv = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: schema.name || pageTitle,
      serviceType: schema.serviceType || 'Digital Marketing & Branding Services',
      description: schema.description || pageDescription,
      provider: {
        '@type': 'ProfessionalService',
        name: settings.siteName,
        url: domain,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design & Marketing Deliverables',
      },
    };
    return JSON.stringify(srv, null, 2);
  }

  if (schema.type === 'FAQPage' && schema.faqs && schema.faqs.length > 0) {
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: schema.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
    return JSON.stringify(faq, null, 2);
  }

  if (schema.type === 'BreadcrumbList' && schema.breadcrumbs && schema.breadcrumbs.length > 0) {
    const bc = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: schema.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: b.url.startsWith('http') ? b.url : `${domain}${b.url.startsWith('/') ? '' : '/'}${b.url}`,
      })),
    };
    return JSON.stringify(bc, null, 2);
  }

  if (schema.type === 'Article') {
    const art = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: schema.name || pageTitle,
      description: schema.description || pageDescription,
      image: settings.defaultOgImage ? `${domain}${settings.defaultOgImage}` : undefined,
      author: {
        '@type': 'Organization',
        name: settings.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: settings.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${domain}/assets/logos/TDN logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
    };
    return JSON.stringify(art, null, 2);
  }

  // Default: WebPage
  const wp = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: schema.name || pageTitle,
    description: schema.description || pageDescription,
    url: fullUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: settings.siteName,
      url: domain,
    },
  };
  return JSON.stringify(wp, null, 2);
}
