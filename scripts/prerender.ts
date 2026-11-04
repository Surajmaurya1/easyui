import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
(globalThis as any).React = React;
import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '../src/lib/theme/useTheme';
import {
  App,
  type AppProps,
  HeroSection,
  SpotlightSearch,
  AllComponentsPage,
  DocsPage,
  ComponentDetailPage,
  SponsorsPage,
  SponsorSuccessPage,
} from '../src/App';
import { preloadComponentDemo } from '../src/components/docs/ComponentDetailPage';
import { EASY_COMPONENTS } from '../src/components/registry/components-data';
import { ITEMS_PER_PAGE } from '../src/lib/components';
import { SEO_CONFIG } from '../src/lib/seo/config';
import {
  getCanonicalUrl,
  getComponentSEO,
  getDocTopicSEO,
  getSponsorSuccessSEO,
  getSponsorsPageSEO,
} from '../src/lib/seo/helpers';
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateComponentSchema,
  generateDocArticleSchema,
  generateComponentCatalogSchema,
} from '../src/lib/seo/structured-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

interface RouteToPrerender {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  keywords?: string[];
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  element: React.ReactElement;
}

function renderRouteElement(element: React.ReactElement): string {
  return renderToString(element);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(
  template: string,
  route: RouteToPrerender,
  renderedContent: string
): string {
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // Replace or inject meta name="title"
  if (html.includes('name="title"')) {
    html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${escapeHtml(route.title)}" />`);
  }

  // Replace or inject meta name="description"
  if (html.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  }

  // Replace or inject canonical link
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  }

  // Replace robots for pages that must stay out of search results.
  if (route.noindex) {
    const robotsTag = '<meta name="robots" content="noindex, nofollow" />';
    if (html.includes('name="robots"')) {
      html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, robotsTag);
    } else {
      html = html.replace('</head>', `    ${robotsTag}\n  </head>`);
    }
  }

  // Replace or inject og:title
  if (html.includes('property="og:title"')) {
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  }

  // Replace or inject og:description
  if (html.includes('property="og:description"')) {
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  }

  // Replace or inject og:url
  if (html.includes('property="og:url"')) {
    html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${route.canonical}" />`);
  }

  // Replace or inject twitter:title
  if (html.includes('name="twitter:title"')) {
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  }

  // Replace or inject twitter:description
  if (html.includes('name="twitter:description"')) {
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
  }

  // Replace or inject twitter:url
  if (html.includes('name="twitter:url"')) {
    html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${route.canonical}" />`);
  }

  // Replace JSON-LD script tag
  if (route.structuredData) {
    const jsonLdString = JSON.stringify(route.structuredData, null, 2);
    const jsonLdTag = `<script id="easyui-seo-jsonld" type="application/ld+json">\n${jsonLdString}\n    </script>`;
    if (html.includes('id="easyui-seo-jsonld"')) {
      html = html.replace(/<script\s+id="easyui-seo-jsonld"[^>]*>[\s\S]*?<\/script>/i, jsonLdTag);
    } else {
      html = html.replace('</head>', `    ${jsonLdTag}\n  </head>`);
    }
  }

  // React 19 hoists <link rel="preload"> resources to the start of renderToString.
  // Move hoisted resource links into <head>, keeping only the component DOM tree inside #root.
  let cleanRootContent = renderedContent;
  const hoistedLinks: string[] = [];
  cleanRootContent = cleanRootContent.replace(/<link\s+rel="preload"[^>]*\/?>/g, (m) => {
    hoistedLinks.push(m);
    return '';
  });

  if (hoistedLinks.length > 0) {
    const injectedLinks = hoistedLinks.join('\n    ');
    html = html.replace('</head>', `    ${injectedLinks}\n  </head>`);
  }

  // Inject pre-rendered React markup into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${cleanRootContent}</div>`);

  return html;
}

export async function prerenderAllRoutes(): Promise<void> {
  console.log('\n========================================================');
  console.log('       EASYUI HYDRATION-SAFE STATIC PRE-RENDERER       ');
  console.log('========================================================\n');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`dist/index.html not found at ${TEMPLATE_PATH}. Run "vite build" first.`);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes: RouteToPrerender[] = [];

  console.log('Preloading route components and component demos for static HTML prerender...');
  await Promise.all([
    HeroSection.preload(),
    SpotlightSearch.preload(),
    AllComponentsPage.preload(),
    DocsPage.preload(),
    ComponentDetailPage.preload(),
    SponsorsPage.preload(),
    SponsorSuccessPage.preload(),
    ...EASY_COMPONENTS.map((comp) => preloadComponentDemo(comp.id)),
  ]);

  const makePrerenderElement = (routePath: string) =>
    React.createElement(
      MotionConfig,
      { reducedMotion: 'user' },
      React.createElement(
        ThemeProvider,
        { initialTheme: 'dark' },
        React.createElement<AppProps>(App as React.ComponentType<AppProps>, { initialPath: routePath })
      )
    );

  // 1. Homepage (/)
  const homeCanonical = getCanonicalUrl('/');
  const websiteSchema = generateWebSiteSchema();
  const orgSchema = generateOrganizationSchema();
  routes.push({
    path: '/',
    outputPath: path.join(DIST_DIR, 'index.html'),
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    canonical: homeCanonical,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [websiteSchema, orgSchema],
    },
    element: makePrerenderElement('/'),
  });

  // 2. All Components Directory (/components)
  const componentsCanonical = getCanonicalUrl('components');
  const catalogSchema = generateComponentCatalogSchema(EASY_COMPONENTS, 1);
  const catalogElement = makePrerenderElement('/components');

  routes.push({
    path: '/components',
    outputPath: path.join(DIST_DIR, 'components', 'index.html'),
    title: SEO_CONFIG.componentsTitle,
    description: SEO_CONFIG.componentsDescription,
    canonical: componentsCanonical,
    structuredData: catalogSchema,
    element: catalogElement,
  });


    // 3. Documentation Topics
    const docTopicIds = ['introduction', 'quick-start', 'architecture', 'collaboration', 'seo'];
    const docsCanonical = getCanonicalUrl('docs');
    const docsElement = makePrerenderElement('/docs/introduction');
    routes.push({
      path: '/docs',
      outputPath: path.join(DIST_DIR, 'docs', 'index.html'),
      title: 'Documentation — EasyUI',
      description: 'Comprehensive documentation and guides for EasyUI components, architecture, and SEO.',
      canonical: docsCanonical,
      structuredData: generateDocArticleSchema({ id: 'introduction', title: 'Documentation — EasyUI', description: 'Comprehensive documentation and guides for EasyUI.' }),
      element: docsElement,
    });
    // Legacy documentation aliases are redirected in public/_redirects. Only
    // write the canonical /docs/:topic pages so duplicate HTML is never emitted.
    const docPaths = docTopicIds.map((topicId) => ({
      path: `/docs/${topicId}`,
      topicId,
    }));
    for (const { path: routePath, topicId } of docPaths) {
      const docSEO = getDocTopicSEO(topicId);
      routes.push({
        path: routePath,
        outputPath: path.join(DIST_DIR, ...routePath.split('/').filter(Boolean), 'index.html'),
        title: docSEO.title,
        description: docSEO.description,
        canonical: docSEO.canonical,
        structuredData: generateDocArticleSchema({
          id: topicId,
          title: docSEO.title,
          description: docSEO.description,
        }),
        element: makePrerenderElement(routePath),
      });
    }

    // 4. Sponsorship pages
    const sponsorsSEO = getSponsorsPageSEO();
    routes.push({
      path: '/sponsors',
      outputPath: path.join(DIST_DIR, 'sponsors', 'index.html'),
      title: sponsorsSEO.title,
      description: sponsorsSEO.description,
      canonical: sponsorsSEO.canonical,
      keywords: sponsorsSEO.keywords,
      element: makePrerenderElement('/sponsors'),
    });

    const sponsorSuccessSEO = getSponsorSuccessSEO();
    routes.push({
      path: '/sponsor/success',
      outputPath: path.join(DIST_DIR, 'sponsor', 'success', 'index.html'),
      title: sponsorSuccessSEO.title,
      description: sponsorSuccessSEO.description,
      canonical: sponsorSuccessSEO.canonical,
      noindex: true,
      element: makePrerenderElement('/sponsor/success'),
    });

    // Each catalog page gets one canonical directory output. Keeping the
    // pagination routes explicit prevents the server from serving page 1's
    // HTML for every page number.
    const totalComponentPages = Math.ceil(EASY_COMPONENTS.length / ITEMS_PER_PAGE);
    for (let page = 2; page <= totalComponentPages; page++) {
      const routePath = `/components/page/${page}`;
      routes.push({
        path: routePath,
        outputPath: path.join(DIST_DIR, 'components', 'page', String(page), 'index.html'),
        title: `React UI Components (Page ${page}) — EasyUI Component Library`,
        description: SEO_CONFIG.componentsDescription,
        canonical: getCanonicalUrl(`components/page/${page}`),
        structuredData: generateComponentCatalogSchema(EASY_COMPONENTS, page),
        element: makePrerenderElement(routePath),
      });
    }

    // 4. All Individual Components (dynamically discovered from EASY_COMPONENTS)
    console.log(`Discovered ${EASY_COMPONENTS.length} components for static pre-rendering:`);
    for (const comp of EASY_COMPONENTS) {
      const compSEO = getComponentSEO(comp);
      const compSchema = generateComponentSchema(comp);
      const compElement = makePrerenderElement(`/components/${comp.id}`);

      // Directory format: /components/:id/index.html
      routes.push({
        path: `/components/${comp.id}`,
        outputPath: path.join(DIST_DIR, 'components', comp.id, 'index.html'),
        title: compSEO.title,
        description: compSEO.description,
        canonical: compSEO.canonical,
        structuredData: compSchema,
        element: compElement,
      });

    }

  // Resolve lazy previews and write canonical outputs concurrently. This avoids
  // serially repeating the same render work while preserving complete SSR HTML.
  await Promise.all(routes.map(async (r) => {
    const renderedHtml = await renderRouteElement(r.element);
    const finalHtml = buildHtml(template, r, renderedHtml);
    const dir = path.dirname(r.outputPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(r.outputPath, finalHtml, 'utf-8');
  }));

  // Fail the build instead of publishing broken demos or local source paths.
  const componentRoutes = routes.filter(
    ({ path: routePath }) => routePath.startsWith('/components/') && !routePath.startsWith('/components/page/')
  );
  const loadingPreviewPattern = /Loading preview(?:…|\.\.\.)?/i;
  const localPathPattern = /(?:\b[A-Za-z]:[\\/]|\/(?:Users|home|workspace|tmp)\/[^\s"'<>]+)/;
  const invalidComponentPages: string[] = [];
  for (const route of componentRoutes) {
    const html = fs.readFileSync(route.outputPath, 'utf-8');
    if (loadingPreviewPattern.test(html) || localPathPattern.test(html) || html.includes('data-cstck=')) {
      invalidComponentPages.push(route.path);
    }
  }
  if (invalidComponentPages.length > 0) {
    throw new Error(
      `Component prerender validation failed for ${invalidComponentPages.length} page(s): ${invalidComponentPages.slice(0, 10).join(', ')}`
    );
  }
  const successCount = routes.length;

  console.log(`\n Successfully pre-rendered ${successCount} routes with complete static HTML:`);
  console.log(`  - 1 Homepage (/)`);
  console.log(`  - ${totalComponentPages} Components catalog pages (/components[/page/*])`);
  console.log(`  - ${docTopicIds.length} Documentation topics (/docs/*)`);
  console.log(`  - 1 Sponsors page (/sponsors)`);
  console.log(`  - 1 Sponsor success page (/sponsor/success, noindex)`);
  console.log(`  - ${EASY_COMPONENTS.length} Component detail pages (/components/*)`);
  console.log('========================================================\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  prerenderAllRoutes().catch((err) => {
    console.error(`\n Pre-rendering failed:\n${err.message || err}`);
    process.exit(1);
  });
}
