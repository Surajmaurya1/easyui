// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "faq",
  "name": "FAQ",
  "tagline": "Expandable spring-physics accordion with search & category filtering",
  "description": "An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.",
  "category": "Feedback",
  "badges": [
    "FAQ",
    "Accordion",
    "Spring Physics",
    "Searchable",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/faq",
  "installPromptHash": "ec4838e99f36ec3ac45ac8e59cb8b556b414896f30422ea8957a3de4e4ef2ee9",
  "features": [
    "Smooth height calculation and rotation via Framer Motion springGentle",
    "Single-open accordion or multi-open simultaneous expansion modes",
    "Controlled and uncontrolled state management (openIds / defaultOpen)",
    "Integrated search filter bar and optional category filter pills",
    "Two layout modes: Unified grouped card or separated individual cards",
    "Full keyboard accessibility (Space, Enter, Tab) and ARIA attributes"
  ],
  "props": [
    {
      "name": "items",
      "type": "FAQItem[]",
      "default": "[]",
      "description": "Array of FAQ items with id, question, answer, category, badge, icon"
    },
    {
      "name": "allowMultiple",
      "type": "boolean",
      "default": "false",
      "description": "Allows multiple accordion items to remain open simultaneously"
    },
    {
      "name": "defaultOpen",
      "type": "string[] | string",
      "default": "undefined",
      "description": "Default expanded item ID(s) on initial mount"
    },
    {
      "name": "openIds",
      "type": "string[]",
      "default": "undefined",
      "description": "Controlled list of currently expanded item IDs"
    },
    {
      "name": "onOpenChange",
      "type": "(ids: string[]) => void",
      "default": "undefined",
      "description": "Callback fired when open item selection changes"
    },
    {
      "name": "iconStyle",
      "type": "'chevron' | 'plus-minus' | 'custom'",
      "default": "'chevron'",
      "description": "Indicator icon style"
    },
    {
      "name": "searchable",
      "type": "boolean",
      "default": "false",
      "description": "Displays search filter bar above FAQ items"
    },
    {
      "name": "showCategories",
      "type": "boolean",
      "default": "false",
      "description": "Displays category filter pills above items"
    },
    {
      "name": "variant",
      "type": "'unified' | 'separated'",
      "default": "'unified'",
      "description": "Visual presentation layout"
    }
  ],
  "accessibility": [
    "aria-expanded state and aria-controls linking button headers to content regions",
    "Semantic role=\"region\" and aria-labelledby on accordion content panels",
    "Keyboard activation via Space and Enter with sky focus ring",
    "Respects prefers-reduced-motion media query"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { FAQ } from \"@/components/ui/faq\";\n\nexport function Demo() {\n  return (\n    <FAQ\n      allowMultiple\n      searchable\n      items={[\n        {\n          id: \"1\",\n          question: \"What makes EasyUI different?\",\n          answer: \"EasyUI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions.\"\n        },\n        {\n          id: \"2\",\n          question: \"Can I customize the styling?\",\n          answer: \"Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers.\"\n        }\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/FAQ.tsx",
      "type": "registry:ui",
      "target": "components/ui/faq.tsx"
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
