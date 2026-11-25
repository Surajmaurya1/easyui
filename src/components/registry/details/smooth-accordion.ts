// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "smooth-accordion",
  "name": "Smooth Accordion",
  "tagline": "Zero-jank spring collapsible content panels",
  "description": "An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.",
  "category": "Feedback",
  "badges": [
    "Spring Height",
    "Zero Layout Shift",
    "Multi or Single"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smooth-accordion",
  "installPromptHash": "2b30af8eb8ec7a5a92ce17c055e2ea3bb6f85c622100e181852006bdf8710d56",
  "features": [
    "Spring physics height interpolation",
    "Zero content clipping or layout jumps",
    "Single or multi-panel open mode"
  ],
  "props": [
    {
      "name": "items",
      "type": "AccordionItem[]",
      "default": "[]",
      "description": "Accordion items"
    },
    {
      "name": "allowMultiple",
      "type": "boolean",
      "default": "false",
      "description": "Allow multiple open panels"
    },
    {
      "name": "defaultOpen",
      "type": "string[]",
      "default": "[]",
      "description": "Default open item ids"
    }
  ],
  "accessibility": [
    "WAI-ARIA accordion pattern",
    "aria-expanded and aria-controls attributes"
  ],
  "createdAt": "2026-08-05",
  "usageCode": "import { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SmoothAccordion.tsx",
      "type": "registry:ui",
      "target": "components/ui/smooth-accordion.tsx"
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
