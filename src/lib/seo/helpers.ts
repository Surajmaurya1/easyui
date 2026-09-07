import { SEO_CONFIG } from './config';
import type { EasyComponentMeta } from '../../types/component';

export interface PageSEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; item: string }>;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Normalizes a URL path or hash route to a fully qualified, clean canonical URL.
 * Strips duplicate slashes, cleans search query variations, and respects site baseUrl.
 */
export function getCanonicalUrl(pathOrHash = ''): string {
  const base = SEO_CONFIG.siteUrl.replace(/\/+$/, '');
  
  if (!pathOrHash || pathOrHash === '/' || pathOrHash === '#') {
    return `${base}/`;
  }

  // Remove leading '#' or '/'
  let clean = pathOrHash.replace(/^[#/]+/, '');

  // If it has query parameters that are pagination only (e.g. components?page=2), normalize
  if (clean.includes('?')) {
    const [route, search] = clean.split('?');
    const params = new URLSearchParams(search);
    const page = params.get('page');
    if (page && page !== '1') {
      clean = `${route}?page=${page}`;
    } else {
      clean = route;
    }
  }

  // Return clean canonical URL without hash
  return `${base}/${clean}`;
}

/**
 * Formats a page title with the standardized EasyUI suffix.
 */
export function formatPageTitle(pageTitle?: string): string {
  if (!pageTitle || pageTitle === SEO_CONFIG.siteName) {
    return SEO_CONFIG.defaultTitle;
  }
  return SEO_CONFIG.titleTemplate.replace('%s', pageTitle);
}

/**
 * Documentation topic definitions and their specific SEO metadata.
 */
export const DOC_TOPICS_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  introduction: {
    title: 'Introduction to EasyUI — Architecture & Philosophy',
    description: 'Discover EasyUI: a modern React component library crafted with Tailwind CSS, Framer Motion, and shadcn/ui principles for fluid, high-performance UI.',
    keywords: ['EasyUI introduction', 'React UI library', 'Framer Motion components', 'Tailwind CSS system', 'Modern web components'],
  },
  'quick-start': {
    title: 'Quick Start Guide — EasyUI',
    description: 'Get started with EasyUI in minutes. Learn how to install dependencies, copy components via CLI or registry, and integrate motion tokens into your project.',
    keywords: ['EasyUI installation', 'Quick start', 'CLI setup', 'React setup', 'Tailwind CSS config'],
  },
  architecture: {
    title: 'Architecture & Design Tokens — EasyUI',
    description: 'Deep dive into EasyUI design system architecture, monochrome color tokens, typography scales, elevation surfaces, and spring physics tokens.',
    keywords: ['Design tokens', 'EasyUI architecture', 'Spring physics', 'Monochrome design system', 'UI token specification'],
  },
  'motion-system': {
    title: 'Motion System & Animation Tokens — EasyUI',
    description: 'Master EasyUI spring physics, hardware acceleration, layout animations, and accessible prefers-reduced-motion patterns.',
    keywords: ['Motion tokens', 'Framer Motion', 'Spring animation', 'Reduced motion', 'Micro-interactions'],
  },
  collaboration: {
    title: 'Collaboration & Contribution Guide — EasyUI',
    description: 'Learn how to build, test, document, and contribute new components to EasyUI using automated registry generation and design tokens.',
    keywords: ['Contribute to EasyUI', 'Component creation', 'Registry generator', 'UI development workflow'],
  },
  seo: {
    title: 'Automated SEO & Audit System — EasyUI',
    description: 'Explore EasyUI automated SEO engine: single source of truth metadata, dynamic sitemaps, canonicals, schema.org JSON-LD, and 44-point CLI health audit.',
    keywords: ['EasyUI SEO', 'Automated SEO', 'Schema.org JSON-LD', 'Dynamic Sitemap', 'SEO health audit', 'React SEO'],
  },
};

/**
 * Generates SEO metadata for any documentation topic.
 */
export function getDocTopicSEO(topicId = 'introduction'): PageSEOMeta {
  const topic = DOC_TOPICS_SEO[topicId] || DOC_TOPICS_SEO.introduction;
  const canonical = getCanonicalUrl(`docs/${topicId}`);

  return {
    title: topic.title,
    description: topic.description,
    canonical,
    ogTitle: topic.title,
    ogDescription: topic.description,
    ogType: 'article',
    keywords: [...topic.keywords, ...SEO_CONFIG.keywords],
    breadcrumbs: [
      { name: 'EasyUI', item: SEO_CONFIG.siteUrl },
      { name: 'Documentation', item: getCanonicalUrl('docs') },
      { name: topic.title.split('—')[0].trim(), item: canonical },
    ],
  };
}

/**
 * Generates SEO metadata for any EasyUI component.
 */
export function getComponentSEO(component: EasyComponentMeta): PageSEOMeta {
  const compTitle = `${component.name} Component for React — EasyUI`;
  const canonical = getCanonicalUrl(`components/${component.id}`);
  const description =
    component.description ||
    `A responsive, accessible React ${component.name.toLowerCase()} component from EasyUI with customizable styles, states, and spring physics animations.`;

  const keywords = Array.from(
    new Set([
      `${component.name} component`,
      `React ${component.name.toLowerCase()}`,
      `${component.category} component`,
      ...component.badges,
      ...(component.features || []),
      'Framer Motion',
      'Tailwind CSS',
      'EasyUI',
    ])
  );

  return {
    title: compTitle,
    description,
    canonical,
    ogTitle: compTitle,
    ogDescription: description,
    ogType: 'website',
    keywords,
    breadcrumbs: [
      { name: 'EasyUI', item: SEO_CONFIG.siteUrl },
      { name: 'Components', item: getCanonicalUrl('components') },
      { name: component.name, item: canonical },
    ],
  };
}

/**
 * Resolves contextually relevant related components for any component.
 * Uses category matching, complementary interaction pairs, and catalog proximity.
 */
export function getRelatedComponents(
  currentComponent: EasyComponentMeta,
  allComponents: EasyComponentMeta[],
  limit = 4
): EasyComponentMeta[] {
  if (!currentComponent || !allComponents || allComponents.length === 0) return [];

  // Complementary pairings map for rich contextual suggestions
  const complementaryCategories: Record<string, string[]> = {
    Buttons: ['Forms', 'Overlays', 'Navigation'],
    Forms: ['Buttons', 'Feedback', 'Overlays', 'Auth'],
    Auth: ['Forms', 'Buttons', 'Feedback'],
    Overlays: ['Buttons', 'Forms', 'Feedback'],
    Navigation: ['Buttons', 'Overlays', 'Motion'],
    Feedback: ['Overlays', 'Forms', 'Motion'],
    Motion: ['Buttons', 'Navigation', 'Feedback'],
  };

  const currentCategory = currentComponent.category;
  const preferredCategories = complementaryCategories[currentCategory] || [];

  // Filter out the current component
  const pool = allComponents.filter((c) => c.id !== currentComponent.id);

  // Score candidate components
  const scored = pool.map((item) => {
    let score = 0;

    // Same category gets strong bonus
    if (item.category === currentCategory) {
      score += 10;
    } else if (preferredCategories.includes(item.category)) {
      score += 5;
    }

    // Common badges / feature tags
    const commonBadges = item.badges.filter((b) => currentComponent.badges.includes(b));
    score += commonBadges.length * 2;

    return { item, score };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.item);
}
