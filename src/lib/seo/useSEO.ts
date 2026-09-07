import { useEffect } from 'react';
import { SEO_CONFIG } from './config';
import {
  getCanonicalUrl,
  getComponentSEO,
  getDocTopicSEO,
  type PageSEOMeta,
} from './helpers';
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateComponentSchema,
  generateDocArticleSchema,
  generateComponentCatalogSchema,
} from './structured-data';
import { updatePageMetadata } from './metadata';
import type { EasyComponentMeta } from '../../types/component';
import { EASY_COMPONENTS } from '../../components/registry/components-data';

interface UseSEOProps {
  activeView: 'showcase' | 'components' | 'docs' | 'component-detail';
  componentPage?: number;
  activeDocTopic?: string;
  selectedModalComponent?: EasyComponentMeta | null;
  selectedComponent?: EasyComponentMeta | null;
}

/**
 * Custom React hook that automatically synchronizes page title, description,
 * canonical links, social tags, and JSON-LD structured data with current route state.
 */
export function useSEO({
  activeView,
  componentPage = 1,
  activeDocTopic = 'introduction',
  selectedModalComponent,
  selectedComponent,
}: UseSEOProps): void {
  useEffect(() => {
    const activeComponent = selectedComponent || selectedModalComponent;
    // 1. If viewing dedicated component page or component detail, apply component-specific SEO
    if (activeComponent) {
      const compSEO = getComponentSEO(activeComponent);
      const structuredData = generateComponentSchema(activeComponent);

      updatePageMetadata({
        ...compSEO,
        structuredData,
      });
      return;
    }

    // 2. Docs View
    if (activeView === 'docs') {
      const docSEO = getDocTopicSEO(activeDocTopic);
      const structuredData = generateDocArticleSchema({
        id: activeDocTopic,
        title: docSEO.title,
        description: docSEO.description,
      });

      updatePageMetadata({
        ...docSEO,
        structuredData,
      });
      return;
    }

    // 3. Components Directory View
    if (activeView === 'components') {
      const pageTitle =
        componentPage > 1
          ? `All React Components (Page ${componentPage}) — EasyUI`
          : 'All React Components — EasyUI';
      const canonical = getCanonicalUrl(
        componentPage > 1 ? `components?page=${componentPage}` : 'components'
      );
      const description =
        'Explore EasyUI complete collection of production-ready, beautifully animated React components built with Tailwind CSS and Framer Motion.';

      const structuredData = generateComponentCatalogSchema(EASY_COMPONENTS, componentPage);

      updatePageMetadata({
        title: pageTitle,
        description,
        canonical,
        ogTitle: pageTitle,
        ogDescription: description,
        ogType: 'website',
        keywords: [
          'React components list',
          'Tailwind UI components',
          'Framer motion buttons cards modals',
          'UI library catalog',
          ...SEO_CONFIG.keywords,
        ],
        breadcrumbs: [
          { name: 'EasyUI', item: SEO_CONFIG.siteUrl },
          { name: 'Components', item: canonical },
        ],
        structuredData,
      });
      return;
    }

    // 4. Showcase / Homepage
    const homeCanonical = getCanonicalUrl('/');
    const websiteSchema = generateWebSiteSchema();
    const orgSchema = generateOrganizationSchema();

    const homeMeta: PageSEOMeta = {
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
      canonical: homeCanonical,
      ogTitle: SEO_CONFIG.defaultTitle,
      ogDescription: SEO_CONFIG.defaultDescription,
      ogType: 'website',
      keywords: [...SEO_CONFIG.keywords],
      breadcrumbs: [{ name: 'EasyUI', item: homeCanonical }],
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [websiteSchema, orgSchema],
      },
    };

    updatePageMetadata(homeMeta);
  }, [activeView, componentPage, activeDocTopic, selectedModalComponent, selectedComponent]);
}
