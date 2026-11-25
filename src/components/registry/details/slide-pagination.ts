// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "slide-pagination",
  "name": "SlidePagination",
  "tagline": "Active indicator slides between pages",
  "description": "A pagination control where the active indicator slides between pages rather than instantly switching. The active background uses shared layoutId so the indicator visibly travels from one item to the next.",
  "category": "Navigation",
  "badges": [
    "Shared Layout",
    "Indicator Travel",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/slide-pagination",
  "installPromptHash": "0540b8be80494016686c2d13b5e693a3aacb7e94449950debd7c72ab09a9e512",
  "features": [
    "Active background uses framer-motion shared layoutId for visible travel between pages",
    "Snappy spring (springSnappy) drives the indicator for a precise, physical feel",
    "Configurable siblingCount for windowed page ranges with ellipsis",
    "Optional previous / next controls; disabled at boundaries",
    "Light/dark theme aware — works in both palettes"
  ],
  "props": [
    {
      "name": "pageCount",
      "type": "number",
      "default": "undefined",
      "description": "Total number of pages"
    },
    {
      "name": "page",
      "type": "number",
      "default": "undefined",
      "description": "Controlled current page"
    },
    {
      "name": "defaultPage",
      "type": "number",
      "default": "1",
      "description": "Initial current page (uncontrolled)"
    },
    {
      "name": "siblingCount",
      "type": "number",
      "default": "1",
      "description": "Visible pages around the current one"
    },
    {
      "name": "onChange",
      "type": "(page: number) => void",
      "default": "undefined",
      "description": "Page change callback"
    },
    {
      "name": "showControls",
      "type": "boolean",
      "default": "true",
      "description": "Show previous / next buttons"
    }
  ],
  "accessibility": [
    "aria-current=\"page\" on the active item; aria-label per page button",
    "Disabled state on prev/next at boundaries",
    "Focus-ring visible on keyboard navigation"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { SlidePagination } from \"@/components/ui/slide-pagination\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center\">\n      <SlidePagination pageCount={12} defaultPage={5} siblingCount={1} />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SlidePagination.tsx",
      "type": "registry:ui",
      "target": "components/ui/slide-pagination.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ],
  "featured": true
};

export default component;
