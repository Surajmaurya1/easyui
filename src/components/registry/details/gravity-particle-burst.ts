// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "gravity-particle-burst",
  "name": "Gravity Particle Burst",
  "tagline": "Pointer-driven gravity particle feedback",
  "description": "A pointer-triggered canvas particle burst with velocity, gravity, friction, and short-lived physical follow-through.",
  "category": "Motion",
  "badges": [
    "Canvas",
    "Pointer Physics",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/gravity-particle-burst",
  "installPromptHash": "ab9fba76ba0c7e236c3d3504342830ff906956f0336a70fe56c857c8985015a6",
  "features": [
    "Particles inherit a shared origin from the pointer location",
    "Canvas rendering keeps the effect performant without many DOM nodes",
    "Gravity and friction make particles arc and settle naturally"
  ],
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "'Create particle burst'",
      "description": "Default button label and accessible text"
    },
    {
      "name": "particleCount",
      "type": "number",
      "default": "34",
      "description": "Number of canvas particles emitted per burst"
    },
    {
      "name": "children",
      "type": "ReactNode",
      "default": "undefined",
      "description": "Custom button content"
    }
  ],
  "accessibility": [
    "The canvas overlay is aria-hidden and does not intercept pointer input",
    "Reduced motion disables the particle burst while keeping the button usable"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { GravityParticleBurst } from \"@/components/ui/gravity-particle-burst\";\n\nexport function Demo() {\n  return <GravityParticleBurst>Commit release</GravityParticleBurst>;\n}",
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/GravityParticleBurst.tsx",
      "type": "registry:ui",
      "target": "components/ui/gravity-particle-burst.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
