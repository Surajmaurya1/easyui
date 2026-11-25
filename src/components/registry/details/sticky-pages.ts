// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "sticky-pages",
  "name": "Sticky Pages",
  "tagline": "Static sticky full-page stacking scroll sections with clean physical shadows and natural release",
  "description": "A pure static full-page sticky stacking scroll component where pages slide up and stack cleanly one over another without any tilting or distortion, before releasing smoothly into natural page scrolling.",
  "category": "Motion",
  "badges": [
    "CSS Sticky",
    "Stacking",
    "Scroll",
    "New"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sticky-pages",
  "installPromptHash": "d85f2201d9a1c1524c8672dddb06fe010eb434a404f9091df078a3dc2b7aab3e",
  "features": [
    "Pure static stacking: zero tilting, zero rotation, zero transform distortion",
    "Native browser scrolling: zero scroll hijacking or wheel locking, built on native CSS position: sticky",
    "Stacking depth: each page slides up directly over the previous one with elevated top shadows and rounded borders",
    "Natural release: once the final page finishes stacking, the container seamlessly transitions back into normal document flow",
    "Dual composition support: pass a structured pages data array or arbitrary <StickyPage> child components",
    "Configurable top offset, stack offset, page height, rounded corners, and drop shadows",
    "Full prefers-reduced-motion compliance maintaining standard clean sticky reading"
  ],
  "props": [
    {
      "name": "pages",
      "type": "StickyPageItem[]",
      "description": "Array of page data objects (title, subtitle, description, badge, content, bg)"
    },
    {
      "name": "pageHeight",
      "type": "string",
      "default": "'100vh'",
      "description": "CSS height of each sticky page (e.g. 100vh, 85vh, 600px)"
    },
    {
      "name": "topOffset",
      "type": "number",
      "default": "0",
      "description": "Distance from top of viewport in pixels when a page locks into sticky position"
    },
    {
      "name": "stackOffset",
      "type": "number",
      "default": "0",
      "description": "Progressive pixel offset between stacked cards (0 for clean cover, 24 for visible deck header tabs)"
    },
    {
      "name": "rounded",
      "type": "boolean",
      "default": "true",
      "description": "Whether pages have rounded top corners (rounded-t-3xl) as they stack over one another"
    },
    {
      "name": "shadow",
      "type": "boolean",
      "default": "true",
      "description": "Whether pages cast an elevated top drop shadow over the preceding page"
    },
    {
      "name": "border",
      "type": "boolean",
      "default": "true",
      "description": "Whether pages have a subtle top highlight border"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS classes for outer container"
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Optional <StickyPage> elements for JSX composition mode"
    }
  ],
  "accessibility": [
    "Maintains standard keyboard Tab order and native browser scroll behavior without wheel trapping",
    "Accessible for screen readers with semantic document structure"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { StickyPages, StickyPage } from \"@/components/ui/sticky-pages\";\n\nexport function StickyPagesDemo() {\n  return (\n    <div className=\"w-full bg-slate-950\">\n      {/* Intro content */}\n      <div className=\"h-96 flex items-center justify-center\">\n        <p className=\"text-slate-400\">Scroll down to see the sticky pages stack</p>\n      </div>\n\n      {/* Sticky Stacking Pages */}\n      <StickyPages>\n        <StickyPage className=\"bg-slate-900 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">01. Architected for Speed</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-indigo-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">02. Modern Aesthetic System</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-sky-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">03. Production Grade Components</h2>\n        </StickyPage>\n      </StickyPages>\n\n      {/* Subsequent normal page content */}\n      <div className=\"h-96 flex items-center justify-center bg-black\">\n        <p className=\"text-slate-400\">Normal scroll resumes seamlessly here.</p>\n      </div>\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/StickyPages.tsx",
      "type": "registry:ui",
      "target": "components/ui/sticky-pages.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
