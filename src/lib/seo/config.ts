/**
 * EasyUI — Global SEO Configuration
 * Central single source of truth for site metadata, Open Graph, Twitter/X, and indexing policies.
 */

export const SEO_CONFIG = {
  siteName: 'EasyUI',
  titleTemplate: '%s — EasyUI',
  defaultTitle: 'EasyUI — Beautiful UI. Made easy.',
  defaultDescription:
    'Production-ready, beautifully crafted animated UI components built with React, Tailwind CSS, and Framer Motion for modern web applications.',
  siteUrl: 'https://easyui.site',
  ogImage: 'https://easyui.site/og-image.webp',
  ogImageType: 'image/webp',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'EasyUI — Beautiful UI. Made easy.',
  twitterCard: 'summary_large_image',
  twitterHandle: '@easyui',
  author: 'Suraj Maurya',
  repository: 'https://github.com/Surajmaurya1/easyui',
  locale: 'en_US',
  themeColor: '#050505',
  keywords: [
    'React components',
    'UI library',
    'Framer Motion',
    'Tailwind CSS',
    'Accessible UI',
    'Design System',
    'Animation components',
    'shadcn/ui compatible',
    'Modern React UI',
    'Interactive components',
    'EasyUI'
  ],
  robots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
  routes: {
    home: '/',
    components: '/components',
    docs: '/docs',
    docsIntro: '/docs/introduction',
    docsQuickStart: '/docs/quick-start',
    docsArchitecture: '/docs/architecture',
    docsMotion: '/docs/motion-system',
    docsCollaboration: '/docs/collaboration',
    docsSEO: '/docs/seo',
  }
} as const;

export type SEOConfig = typeof SEO_CONFIG;
