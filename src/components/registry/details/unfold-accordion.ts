// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "unfold-accordion",
  "name": "UnfoldAccordion",
  "tagline": "Content unfolds with chevron and spacing",
  "description": "An accordion whose content unfolds with the chevron and spacing moving together. The chevron rotates 180° while the content height expands and the inner content slides up to close the gap, producing a single, fluid motion.",
  "category": "Feedback",
  "badges": [
    "Coordinated Motion",
    "Spring Height",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/unfold-accordion",
  "installPromptHash": "db1b5f9b0ea6d4cab1c9fef3e7871d8064ba5b0fa9b2196c11ccf2b7c59fe9fa",
  "features": [
    "Chevron rotation, content height, and inner content slide are tuned to overlap",
    "Inner content uses a slightly faster ease so it \"leads\" the chevron by a hair",
    "Spring-based height expansion (springGentle) for a calm, continuous feel",
    "Single-open by default; allowMultiple for multi-open mode",
    "Light/dark theme aware — works in both palettes"
  ],
  "props": [
    {
      "name": "items",
      "type": "UnfoldAccordionItem[]",
      "default": "[]",
      "description": "Array of accordion items"
    },
    {
      "name": "allowMultiple",
      "type": "boolean",
      "default": "false",
      "description": "Allow multiple items open at once"
    },
    {
      "name": "defaultOpen",
      "type": "string[]",
      "default": "[]",
      "description": "Ids of items open by default"
    }
  ],
  "accessibility": [
    "aria-expanded reflects open state on the trigger button",
    "Native <button> semantics for keyboard activation",
    "Focus-ring visible on keyboard navigation"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { UnfoldAccordion } from \"@/components/ui/unfold-accordion\";\n\nexport function Demo() {\n  return (\n    <UnfoldAccordion\n      defaultOpen={[\"design\"]}\n      items={[\n        {\n          id: \"design\",\n          title: \"Design tokens\",\n          subtitle: \"Foundations\",\n          content: \"A small set of variables for color, type, and spacing. Each token is named for its role, not its value, so themes can be swapped without rewriting components.\",\n        },\n        {\n          id: \"motion\",\n          title: \"Motion language\",\n          subtitle: \"Spring physics\",\n          content: \"Every transition is a spring with explicit mass, stiffness, and damping. Linear easing is reserved for color and opacity only.\",\n        },\n        {\n          id: \"shipping\",\n          title: \"Shipping workflow\",\n          subtitle: \"From sync to deploy\",\n          content: \"Run component:sync to regenerate the registry, then push. The CI workflow re-validates and re-syncs on every PR.\",\n        },\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/UnfoldAccordion.tsx",
      "type": "registry:ui",
      "target": "components/ui/unfold-accordion.tsx"
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
