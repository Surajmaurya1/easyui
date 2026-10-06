import { SEO_CONFIG } from './config';
import type { ComponentCatalogIndex } from '../../types/component';
import type { EasyComponentMeta } from '../../types/component';
import { getCanonicalUrl } from './helpers';

/**
 * WebSite schema with SearchAction for site-wide Command palette / component discovery.
 */
export function generateWebSiteSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.author,
      url: SEO_CONFIG.repository,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/components?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization schema for EasyUI.
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    sameAs: [SEO_CONFIG.repository, 'https://twitter.com/easyui'],
    founder: {
      '@type': 'Person',
      name: SEO_CONFIG.author,
    },
  };
}

/**
 * BreadcrumbList schema for structured navigation hierarchy.
 */
export function generateBreadcrumbSchema(
  crumbs: Array<{ name: string; item: string }>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

/**
 * SoftwareApplication & ItemPage schema for individual EasyUI components.
 * Accepts the lightweight ComponentCatalogIndex type so that schema can be
 * generated without loading the full component catalog into the initial bundle.
 */
export function generateComponentSchema(component: ComponentCatalogIndex): Record<string, any> {
  const canonical = getCanonicalUrl(`components/${component.id}`);
  const breadcrumbList = generateBreadcrumbSchema([
    { name: 'EasyUI', item: SEO_CONFIG.siteUrl },
    { name: 'Components', item: getCanonicalUrl('components') },
    { name: component.name, item: canonical },
  ]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList,
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonical}#software`,
        name: `${component.name} Component`,
        operatingSystem: 'All',
        applicationCategory: 'DeveloperApplication',
        description: component.description,
        url: canonical,
        codeRepository: SEO_CONFIG.repository,
        programmingLanguage: 'TypeScript',
        softwareRequirements: 'React >= 18, Tailwind CSS, Framer Motion',
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.author,
          url: SEO_CONFIG.repository,
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'TechArticle',
        '@id': `${canonical}#article`,
        headline: `${component.name} Component for React — EasyUI`,
        description: component.description,
        url: canonical,
        datePublished: component.createdAt
          ? component.createdAt.includes('T')
            ? component.createdAt
            : `${component.createdAt}T00:00:00Z`
          : '2026-08-01T00:00:00Z',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.author,
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${SEO_CONFIG.siteUrl}/logo.png`,
          },
        },
        articleSection: component.category,
        keywords: [component.name, component.category, ...component.badges].join(', '),
      },
    ],
  };
}

/**
 * TechArticle schema for Documentation topics.
 */
export function generateDocArticleSchema(topic: {
  id: string;
  title: string;
  description: string;
}): Record<string, any> {
  const canonical = getCanonicalUrl(`docs/${topic.id}`);
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'EasyUI', item: SEO_CONFIG.siteUrl },
    { name: 'Documentation', item: getCanonicalUrl('docs') },
    { name: topic.title.split('—')[0].trim(), item: canonical },
  ]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbs,
      {
        '@type': 'TechArticle',
        '@id': `${canonical}#article`,
        headline: topic.title,
        description: topic.description,
        url: canonical,
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: SEO_CONFIG.author,
          url: SEO_CONFIG.repository,
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${SEO_CONFIG.siteUrl}/logo.png`,
          },
        },
      },
    ],
  };
}

/**
 * ItemList schema for the All Components directory.
 */
export function generateComponentCatalogSchema(
  components: EasyComponentMeta[],
  currentPage = 1
): Record<string, any> {
  const canonical = getCanonicalUrl(currentPage > 1 ? `components/page/${currentPage}` : 'components');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EasyUI Component Library',
    description: 'A curated collection of animated, accessible React components built with Tailwind CSS and Framer Motion.',
    url: canonical,
    numberOfItems: components.length,
    itemListElement: components.map((comp, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: getCanonicalUrl(`components/${comp.id}`),
      name: comp.name,
      description: comp.description,
    })),
  };
}
