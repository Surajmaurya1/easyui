import { useEffect } from 'react';
import { SEO_CONFIG } from './config';
import {
  getCanonicalUrl,
  getComponentSEO,
  getDocTopicSEO,
  getSkillPageSEO,
  getSponsorSuccessSEO,
  getSponsorsPageSEO,
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
import type { ComponentCatalogIndex } from '../../types/component';
import { CATALOG_INDEX } from '../../components/registry/catalog-index';

interface UseSEOProps {
  activeView:
    | 'showcase'
    | 'components'
    | 'docs'
    | 'component-detail'
    | 'component-not-found'
    | 'route-not-found'
    | 'sponsors'
    | 'sponsor-success'
    | 'skill';
  componentPage?: number;
  activeDocTopic?: string;
  selectedModalComponent?: ComponentCatalogIndex | null;
  selectedComponent?: ComponentCatalogIndex | null;
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

    if (activeView === 'component-not-found' || activeView === 'route-not-found') {
      updatePageMetadata({
        title: 'Page Not Found — EasyUI',
        description: 'The requested EasyUI page could not be found.',
        canonical: getCanonicalUrl('/'),
        ogTitle: 'Page Not Found — EasyUI',
        ogDescription: 'The requested EasyUI page could not be found.',
        ogType: 'website',
        noindex: true,
      });
      return;
    }

    // 1. Sponsorship pages
    if (activeView === 'sponsors') {
      updatePageMetadata(getSponsorsPageSEO());
      return;
    }

    if (activeView === 'sponsor-success') {
      updatePageMetadata(getSponsorSuccessSEO());
      return;
    }

    if (activeView === 'skill') {
      updatePageMetadata(getSkillPageSEO());
      return;
    }

    // 2. If viewing dedicated component page or component detail, apply component-specific SEO
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
          ? `React UI Components (Page ${componentPage}) — EasyUI Component Library`
          : SEO_CONFIG.componentsTitle;
      // Query-driven catalog views are filtered/paginated variants of the
      // directory, so keep them out of the canonical URL space. Clean
      // /components/page/:n routes remain independently canonical.
      const hasQueryString = typeof window !== 'undefined' && Boolean(window.location.search);
      const canonical = hasQueryString
        ? getCanonicalUrl('components')
        : getCanonicalUrl(componentPage > 1 ? `components/page/${componentPage}` : 'components');
      const description = SEO_CONFIG.componentsDescription;

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
        structuredData: generateComponentCatalogSchema(CATALOG_INDEX, componentPage),
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
