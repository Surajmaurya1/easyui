// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "expandable-data-row",
  "name": "Expandable Data Row",
  "tagline": "Smooth unfolding table row with deep metadata and responsive mobile conversion",
  "description": "A polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.",
  "category": "Motion",
  "badges": [
    "Tables",
    "Accordion Motion",
    "Responsive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-data-row",
  "installPromptHash": "96faa77870b8719d1d6563523e47e532862cfc7d03a3f06ad63f21805e8c220e",
  "features": [
    "Soft accordion expansion unfolding details directly beneath rows without modals",
    "Single or multi-row simultaneous expansion modes",
    "Full metadata breakdown with account metrics and historical activity timeline",
    "Adaptive layout engine transforming desktop table into touch cards on mobile devices",
    "Integrated quick actions with one-click email copying and callback hooks"
  ],
  "props": [
    {
      "name": "items",
      "type": "DataRowItem[]",
      "default": "[...]",
      "description": "Data records with user, status, revenue, and metadata"
    },
    {
      "name": "allowMultiple",
      "type": "boolean",
      "default": "false",
      "description": "Permit multiple expanded rows concurrently"
    },
    {
      "name": "defaultExpandedIds",
      "type": "string[]",
      "default": "['usr_01']",
      "description": "Initially expanded row identifiers"
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "default": "false",
      "description": "Displays pulse skeleton loaders during data fetch"
    },
    {
      "name": "onRowAction",
      "type": "(action: string, row: DataRowItem) => void",
      "default": "undefined",
      "description": "Callback fired on row action buttons"
    }
  ],
  "accessibility": [
    "Aria-expanded attributes and keyboard navigation (Enter, Space, Tab)",
    "Semantic table row and button hierarchy compliant with WCAG 2.1 AA",
    "Reduced motion support with instant height visibility toggle"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { ExpandableDataRow } from \"@/components/ui/expandable-data-row\";\n\nexport function Demo() {\n  return (\n    <ExpandableDataRow\n      items={[\n        {\n          id: \"usr_01\",\n          user: { name: \"Sarah Connor\", email: \"sarah@cyberdyne.io\" },\n          status: \"active\",\n          revenue: \"$4,280\",\n          date: \"Oct 24, 2026\",\n          metadata: { plan: \"Enterprise Plus\", sessions: 482 },\n        }\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/ExpandableDataRow.tsx",
      "type": "registry:ui",
      "target": "components/ui/expandable-data-row.tsx"
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
  ]
};

export default component;
