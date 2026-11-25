# EasyUI — Production SEO & SEO Audit Documentation

This document describes the SEO architecture, dynamic metadata pipeline, structured data (JSON-LD) generation, sitemap automation, and CLI audit tooling for EasyUI.

---

## 1. Architecture Overview

EasyUI utilizes a centralized, modular SEO system located at `src/lib/seo/`:

```text
src/lib/seo/
├── config.ts            # Production domain, Open Graph, Twitter/X, robot defaults
├── helpers.ts           # Canonical resolution, component/doc SEO mappers, related components
├── structured-data.ts   # Schema.org JSON-LD generators (WebSite, Organization, SoftwareApplication, TechArticle, BreadcrumbList, ItemList)
├── metadata.ts          # Client-side head metadata manager (<title>, <meta>, <link rel="canonical">, ld+json)
├── useSEO.ts            # Reactive React hook synchronizing route & modal states with DOM head
└── index.ts             # Barrel export
```

### Core Principles
1. **Single Source of Truth**: Component metadata lives in `*.meta.ts` and flows automatically to catalog, registry, sitemap, Open Graph, and JSON-LD.
2. **Apple-Grade Performance**: No layout shifts, zero heavy runtime overhead, and 100% compliance with existing dark monochrome design tokens.
3. **Automated Scalability**: Adding a new component automatically provisions full SEO across all surfaces without manual file-by-file updates.

---

## 2. Dynamic Component SEO Pipeline

When a developer scaffolds a new component via `npm run component:new <ComponentName>`, a paired `<ComponentName>.meta.ts` file is generated:

```ts
import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Aurora Card',
  description: 'A responsive, animated card component with glowing auroral gradients and spring physics.',
  category: 'Motion',
  tagline: 'Spring physics interaction',
  badges: ['Spring Physics', 'Tailwind', 'Interactive'],
  createdAt: '2026-08-19',
  features: [
    'Hardware accelerated layout animations',
    'Responsive and mobile friendly',
    'Customizable appearance and tokens',
  ],
  props: [
    { name: 'children', type: 'ReactNode', description: 'Content rendered inside the card' },
    { name: 'className', type: 'string', description: 'Optional custom Tailwind styling' },
  ],
  accessibility: [
    'Respects prefers-reduced-motion media query',
    'Accessible semantic structure',
  ],
  usageCode: `...`,
};

export default meta;
```

Running `npm run component:sync` performs:
1. Discovery of all component metadata.
2. Generation of `registry.json` (shadcn-compatible).
3. Generation of the lightweight catalog index and per-component metadata modules.
4. Automated generation and synchronization of `public/sitemap.xml`.

---

## 3. Global HTML & Crawlable Assets

| File | Purpose |
|------|---------|
| `index.html` | Base `<title>`, meta description, canonical link, Open Graph, Twitter cards, and fallback WebSite/Organization JSON-LD. |
| `public/robots.txt` | Allows indexation of all public routes while protecting internal/admin paths. References production sitemap. |
| `public/sitemap.xml` | Dynamically generated XML sitemap indexing the homepage, component catalog, all individual component deep links, and documentation topics. |
| `public/site.webmanifest` | PWA and web application manifest with brand colors and icons. |

---

## 4. Structured Data (JSON-LD) Implementation

EasyUI embeds valid JSON-LD schemas compliant with Google Search recommendations:

### A. WebSite & Organization
- Embedded on the homepage and root `index.html`.
- Includes `SearchAction` for instant component query matching in search engines.

### B. SoftwareApplication & ItemPage
- Generated dynamically per component (`getComponentSEO` & `generateComponentSchema`).
- Informs search engines of category (`DeveloperApplication`), requirements (React, Tailwind CSS, Framer Motion), license, and open-source pricing.

### C. BreadcrumbList
- Generated for every component and documentation topic:
  ```text
  EasyUI → Components → Magnetic Button
  EasyUI → Documentation → Motion System & Animation Tokens
  ```

### D. TechArticle
- Generated for all documentation guides (`/docs/introduction`, `/docs/quick-start`, `/docs/architecture`, `/docs/motion-system`, `/docs/collaboration`).

---

## 5. Internal Linking & Related Components

EasyUI features an automated contextual component recommender (`getRelatedComponents`):
- Pairs complementary categories (e.g. Buttons with Forms & Overlays; Navigation with Tabs & Docks).
- Embedded within the Component Detail Modal to maximize organic crawl depth and internal link equity without altering existing page layout.

---

## 6. Running the SEO Audit

To verify technical SEO, metadata validity, content thickness, sitemap parity, and structured data integrity, run:

```bash
npm run seo:audit
```

### Example Audit Output:

```text
========================================================
            EASYUI AUTOMATED SEO AUDIT REPORT           
========================================================

Overall SEO Score: 100/100

Category Breakdown:
--------------------------------------------------------
  Technical SEO          [████████████████████] 100% (8/8 checks)
  Metadata               [████████████████████] 100% (13/13 checks)
  Content                [████████████████████] 100% (2/2 checks)
  Links                  [████████████████████] 100% (2/2 checks)
  Images                 [████████████████████] 100% (4/4 checks)
  Structured Data        [████████████████████] 100% (7/7 checks)
  Performance & A11y     [████████████████████] 100% (2/2 checks)
--------------------------------------------------------

✓ Passed Checks: 38
========================================================
EasyUI passed all essential SEO audit criteria successfully!
```

---

## 7. Developer Workflow: Adding a New Component

The developer workflow is completely streamlined and automated:

1. **Scaffold Component**:
   ```bash
   npm run component:new MyComponent
   ```
2. **Implement Component**:
   Edit `src/components/ui/MyComponent.tsx` and provide accurate properties in `src/components/ui/MyComponent.meta.ts`.
3. **Build Application**:
   ```bash
   npm run build
   ```

The build command automatically executes the full chain:
```text
component discovery ➔ metadata validation ➔ registry generation ➔ sitemap synchronization ➔ SEO audit guard ➔ TypeScript compilation ➔ Vite bundle
```

A developer never needs to manually edit `sitemap.xml`, `registry.json`, generated catalog/detail data, canonical URLs, JSON-LD schemas, or SEO audit scripts.
