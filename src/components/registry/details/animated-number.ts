// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "animated-number",
  "name": "Animated Number Morph",
  "tagline": "Independent column digit rolling physics for metrics and financial dashboards",
  "description": "An Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.",
  "category": "Motion",
  "badges": [
    "Metrics",
    "Motion Physics",
    "Typography"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-number",
  "installPromptHash": "43375a8f5d17797ae07c35f9cd22cc03f565c35b713aecfe51e0cfaf87703368",
  "features": [
    "Independent digit column spring animation preventing layout jitter",
    "Automatic thousand grouping (e.g. 12,450) and fixed decimal formatting",
    "Compact notation support for large values (1.2M, 45K)",
    "Configurable prefixes, suffixes, and spring stiffness parameters",
    "Full accessibility with aria-label text narration"
  ],
  "props": [
    {
      "name": "value",
      "type": "number",
      "default": "0",
      "description": "The numeric target value to morph towards"
    },
    {
      "name": "decimals",
      "type": "number",
      "default": "0",
      "description": "Number of decimal places to preserve"
    },
    {
      "name": "prefix",
      "type": "string",
      "default": "''",
      "description": "Text or currency prepended to number (e.g. \"$\")"
    },
    {
      "name": "suffix",
      "type": "string",
      "default": "''",
      "description": "Text or unit appended to number (e.g. \"%\", \"ms\")"
    },
    {
      "name": "useGrouping",
      "type": "boolean",
      "default": "true",
      "description": "Formats with comma separators"
    },
    {
      "name": "compact",
      "type": "boolean",
      "default": "false",
      "description": "Formats using compact abbreviations (K, M, B)"
    },
    {
      "name": "stiffness",
      "type": "number",
      "default": "170",
      "description": "Spring transition stiffness"
    },
    {
      "name": "damping",
      "type": "number",
      "default": "22",
      "description": "Spring transition damping"
    }
  ],
  "accessibility": [
    "Screen readers read the complete rendered string via aria-label attribute",
    "Bypasses motion if user has reduced-motion preference enabled"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { AnimatedNumber } from \"@/components/ui/animated-number\";\n\nexport function Demo() {\n  const [revenue, setRevenue] = useState(12450);\n\n  return (\n    <div className=\"text-3xl font-bold\">\n      <AnimatedNumber value={revenue} prefix=\"$\" useGrouping />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/AnimatedNumber.tsx",
      "type": "registry:ui",
      "target": "components/ui/animated-number.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
