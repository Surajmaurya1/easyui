// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "scroll-progress-nav",
  "name": "Scroll Progress Navigation",
  "tagline": "Floating progress navigation pill tracking scroll depth and active document headings",
  "description": "A floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.",
  "category": "Navigation",
  "badges": [
    "Navigation",
    "Scroll Physics",
    "Floating"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scroll-progress-nav",
  "installPromptHash": "a7183630c897aa953c44810070b3751fe08f058eb2f3a45fd26250fbe5a8b55c",
  "features": [
    "Real-time document scroll progress bar integrated along the pill boundary",
    "Shared layout pill indicator smoothly moving between active headings",
    "Seamless transition from static page banner to compact floating island",
    "Smooth scroll anchoring with customizable offset threshold",
    "Mobile-optimized responsive compact menu preventing content obstruction"
  ],
  "props": [
    {
      "name": "sections",
      "type": "NavSectionItem[]",
      "default": "[...]",
      "description": "Navigation links with IDs, index numbers, and labels"
    },
    {
      "name": "scrollThreshold",
      "type": "number",
      "default": "150",
      "description": "Scroll distance in px before morphing into floating pill"
    },
    {
      "name": "activeId",
      "type": "string",
      "default": "undefined",
      "description": "Controlled active section ID override"
    },
    {
      "name": "onSectionClick",
      "type": "(id: string) => void",
      "default": "undefined",
      "description": "Callback fired when user selects a section"
    },
    {
      "name": "position",
      "type": "'top-center' | 'bottom-center' | 'top-right'",
      "default": "'top-center'",
      "description": "Screen anchor position"
    }
  ],
  "accessibility": [
    "Semantic nav element with aria-label=\"Table of contents\"",
    "Keyboard navigable tab order and focus-visible outlines",
    "Smooth scroll honors prefers-reduced-motion settings"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { ScrollProgressNav } from \"@/components/ui/scroll-progress-nav\";\n\nexport function Demo() {\n  return (\n    <ScrollProgressNav\n      sections={[\n        { id: \"overview\", index: \"01\", label: \"Overview\" },\n        { id: \"features\", index: \"02\", label: \"Features\" },\n        { id: \"components\", index: \"03\", label: \"Components\" },\n        { id: \"docs\", index: \"04\", label: \"Documentation\" }\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/ScrollProgressNav.tsx",
      "type": "registry:ui",
      "target": "components/ui/scroll-progress-nav.tsx"
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
