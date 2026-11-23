// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "reveal-card",
  "name": "Reveal Card",
  "tagline": "3D cursor physics tilt with interactive glare reveal",
  "description": "A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.",
  "category": "Motion",
  "badges": [
    "3D Tilt",
    "Dynamic Glare",
    "Micro-interaction"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/reveal-card",
  "installPromptHash": "6ca45bc27b7ac5be18eb1c47d1f59d53b4c74a85556cd483ddfaf0f201f7ce60",
  "features": [
    "Cursor-aware 3D perspective rotation springs",
    "Dynamic radial glare reflection overlay",
    "Hidden metadata section revealed on hover"
  ],
  "props": [
    {
      "name": "maxTilt",
      "type": "number",
      "default": "12",
      "description": "Max tilt angle in degrees"
    },
    {
      "name": "revealContent",
      "type": "ReactNode",
      "default": "undefined",
      "description": "Content shown on hover"
    }
  ],
  "accessibility": [
    "Subtle tilt respects reduced-motion settings",
    "All content accessible via DOM"
  ],
  "createdAt": "2026-08-06",
  "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/RevealCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/reveal-card.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
