// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "pill-navigation",
  "name": "Pill Navigation",
  "tagline": "Minimal shared-pill navigation continuity with fluid submenus",
  "description": "A restrained segmented navigation control with shared pill layout morphing and nested submenu dropdown support.",
  "category": "Navigation",
  "badges": [
    "Layout Springs",
    "Submenu Dropdown",
    "Accessible",
    "Minimal"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pill-navigation",
  "installPromptHash": "31ee7245b275b9daf2c85593456a11196929088121e3d5e2e5ad2b81303a385a",
  "features": [
    "Single shared indicator preserves spatial continuity",
    "Interactive nested submenu with fluid spring entrance and layout morphing",
    "Dual-tier keyboard navigation for parent tabs and sub-items"
  ],
  "props": [
    {
      "name": "items",
      "type": "PillNavigationItem[]",
      "default": "demo items",
      "description": "Navigation items with optional submenu children"
    },
    {
      "name": "defaultValue",
      "type": "string",
      "default": "first item id",
      "description": "Initial selected item id"
    },
    {
      "name": "defaultSubValue",
      "type": "string",
      "default": "undefined",
      "description": "Initial selected submenu item id"
    },
    {
      "name": "onChange",
      "type": "(id: string, subId?: string) => void",
      "default": "undefined",
      "description": "Selection callback"
    }
  ],
  "accessibility": [
    "Uses tablist and tab roles with aria-selected and aria-expanded state",
    "Supports ArrowLeft/ArrowRight for main tabs and ArrowUp/ArrowDown for sub-items",
    "Reduced motion swaps the moving shared pill for an immediate selected background"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { PillNavigation } from \"@/components/ui/pill-navigation\";\n\nexport function Demo() {\n  return (\n    <PillNavigation\n      items={[\n        { id: 'overview', label: 'Overview' },\n        {\n          id: 'motion',\n          label: 'Motion',\n          children: [\n            { id: 'springs', label: 'Spring Physics' },\n            { id: 'caustics', label: 'Liquid Caustics' },\n          ],\n        },\n        { id: 'code', label: 'Code' },\n      ]}\n      onChange={(mainId, subId) => console.log(mainId, subId)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/PillNavigation.tsx",
      "type": "registry:ui",
      "target": "components/ui/pill-navigation.tsx"
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
