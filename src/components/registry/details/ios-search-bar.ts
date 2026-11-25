// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "ios-search-bar",
  "name": "iOS-style Search Bar",
  "tagline": "Spring expanding search pill & tactile clear button",
  "description": "A minimalist search pill that smoothly expands on focus and reveals quick-clear controls with spring animation.",
  "category": "Navigation",
  "badges": [
    "Framer Motion",
    "Spring Physics",
    "Search",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ios-search-bar",
  "installPromptHash": "9cbd421e63988be2fb832afa4272527cdd62763396dfe40b79bc858239ab5a22",
  "features": [
    "Smooth spring width expansion on input focus and auto-collapse on blur",
    "Conditional quick-clear button with spring scale entrance and exit",
    "Built-in keyboard hotkey indicator (⌘K) and Escape key blur support",
    "Semantic search input type with full WCAG AA accessibility"
  ],
  "props": [
    {
      "name": "value",
      "type": "string",
      "description": "Current search query string"
    },
    {
      "name": "onChange",
      "type": "(value: string) => void",
      "description": "Input change handler"
    },
    {
      "name": "onSubmit",
      "type": "(value: string) => void",
      "default": "undefined",
      "description": "Fired when Enter is pressed"
    },
    {
      "name": "onClear",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback when clear button is clicked"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Search...'",
      "description": "Placeholder label"
    },
    {
      "name": "collapsedWidth",
      "type": "number | string",
      "default": "'220px'",
      "description": "Width before focus"
    },
    {
      "name": "expandedWidth",
      "type": "number | string",
      "default": "'340px'",
      "description": "Width after focus"
    }
  ],
  "accessibility": [
    "Standard <input type=\"search\"> with clear descriptive aria-label",
    "Interactive clear button with accessible aria-label=\"Clear search\"",
    "Supports Escape key to blur and Enter key to submit"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { useState } from \"react\";\nimport { IOSSearchBar } from \"@/components/ui/ios-search-bar\";\n\nexport function Demo() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <IOSSearchBar\n      value={query}\n      onChange={setQuery}\n      placeholder=\"Search documentation...\"\n      onSubmit={(q) => console.log(\"Searching:\", q)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/IOSSearchBar.tsx",
      "type": "registry:ui",
      "target": "components/ui/ios-search-bar.tsx"
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
