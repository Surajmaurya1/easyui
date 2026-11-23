// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "expandable-search",
  "name": "Expandable Search",
  "tagline": "Compact spring width morphing search input",
  "description": "A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.",
  "category": "Navigation",
  "badges": [
    "Spring Expansion",
    "Shortcuts",
    "Compact"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-search",
  "installPromptHash": "23f6bf95180308d81d92ea95dc6cf1190aba2597e39cb22621f1f42224ab7737",
  "features": [
    "Spring physics width expansion",
    "Shortcut badge hint",
    "Instant clear button on input"
  ],
  "props": [
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Search...'",
      "description": "Input placeholder text"
    },
    {
      "name": "onSearch",
      "type": "(query: string) => void",
      "default": "undefined",
      "description": "Search query callback"
    }
  ],
  "accessibility": [
    "Accessible search input role",
    "Clear button accessible label"
  ],
  "createdAt": "2026-08-02",
  "usageCode": "import { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/ExpandableSearch.tsx",
      "type": "registry:ui",
      "target": "components/ui/expandable-search.tsx"
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
