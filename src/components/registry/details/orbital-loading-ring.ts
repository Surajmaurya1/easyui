// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "orbital-loading-ring",
  "name": "Orbital Loading Ring",
  "tagline": "Layered orbital processing indicator",
  "description": "A lightweight loading indicator with layered rings and orbiting particles that communicate active processing.",
  "category": "Feedback",
  "badges": [
    "CSS Motion",
    "Accessible",
    "Lightweight"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/orbital-loading-ring",
  "installPromptHash": "21cf834b1229289fb57f0fbc493e47cfbe666395b924c92c423d7fc42304123b",
  "features": [
    "Two coordinated orbital rhythms with a subtle center pulse",
    "Size, speed, and density variants",
    "No external runtime beyond React"
  ],
  "props": [
    {
      "name": "size",
      "type": "number",
      "default": "72",
      "description": "Rendered width and height in pixels"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Multiplier for orbital animation speed"
    },
    {
      "name": "variant",
      "type": "'default' | 'dense' | 'minimal'",
      "default": "'default'",
      "description": "Particle density around the secondary orbit"
    },
    {
      "name": "label",
      "type": "string",
      "default": "'Loading'",
      "description": "Accessible status label"
    }
  ],
  "accessibility": [
    "Uses role=\"status\" with a screen-reader label",
    "Reduced motion freezes the orbital movement while preserving the loading affordance"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { OrbitalLoadingRing } from \"@/components/ui/orbital-loading-ring\";\n\nexport function Demo() {\n  return <OrbitalLoadingRing size={84} variant=\"dense\" label=\"Syncing registry\" />;\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/OrbitalLoadingRing.tsx",
      "type": "registry:ui",
      "target": "components/ui/orbital-loading-ring.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
