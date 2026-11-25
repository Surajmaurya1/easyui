// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "peek-card",
  "name": "Peek Card",
  "tagline": "Origin-anchored contextual preview card with edge-aware collision detection",
  "description": "An origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.",
  "category": "Overlays",
  "badges": [
    "Popovers",
    "Overlays",
    "Context Preview"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/peek-card",
  "installPromptHash": "154288dbab9236518634136d4d3f4e5a9f63fb83b9ab38210b565e138e1c4369",
  "features": [
    "Origin-anchored emergence animation feeling connected to source elements",
    "Automatic edge collision detection preventing viewport bounding overflow",
    "Rich preset layout for transactions, user profiles, invoices, and metrics",
    "Mobile tap toggle and desktop hover/focus dual interaction model",
    "Integrated copy actions and status indicators with reduced-motion support"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "default": "undefined",
      "description": "Trigger target element wrapped by peek card"
    },
    {
      "name": "data",
      "type": "PeekCardData",
      "default": "[...]",
      "description": "Structured preview dataset"
    },
    {
      "name": "delay",
      "type": "number",
      "default": "200",
      "description": "Hover activation delay in milliseconds"
    },
    {
      "name": "placement",
      "type": "'top' | 'bottom' | 'auto'",
      "default": "'auto'",
      "description": "Preferred emergence direction"
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "default": "false",
      "description": "Renders skeleton placeholder during async lookup"
    }
  ],
  "accessibility": [
    "Keyboard accessible through native onFocus and onBlur handlers",
    "Closes automatically on Escape key press or outside click"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { PeekCard } from \"@/components/ui/peek-card\";\n\nexport function Demo() {\n  return (\n    <PeekCard\n      data={{\n        title: \"Payment #3948\",\n        amount: \"$249.00\",\n        customer: { name: \"Alexander Wright\", email: \"alex@acme.com\" },\n        status: \"Succeeded\",\n      }}\n    >\n      <span className=\"underline decoration-dotted cursor-pointer\">\n        Payment #3948\n      </span>\n    </PeekCard>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/PeekCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/peek-card.tsx"
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
