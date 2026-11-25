// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "nimbu-mirchi",
  "name": "Nimbu Mirchi",
  "tagline": "Pointer-driven hanging charm with layered spring physics",
  "description": "A hanging lemon-and-green-chilli charm that swings with realistic inertia in response to the pointer, built from layered physical springs rather than a single rigid illustration.",
  "category": "Motion",
  "badges": [
    "Spring Physics",
    "Pointer Tracking",
    "Layered Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/nimbu-mirchi",
  "installPromptHash": "f5d4092d90bf1cf67d91fe7d876410eadeb92b94b27f27dd3159f85dc9bbeba3",
  "features": [
    "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
    "Layered secondary motion — chillies, lemon, and trailing strings each swing independently",
    "Configurable spring stiffness, damping, and max rotation for tuning the physical feel",
    "Geometry-aware normalization that adapts to the actual container size",
    "Respects prefers-reduced-motion with a clean static rest pose",
    "Graceful degradation when pointer events are unavailable"
  ],
  "props": [
    {
      "name": "maxRotation",
      "type": "number",
      "default": "13",
      "description": "Maximum rotation in degrees at full pointer offset"
    },
    {
      "name": "stiffnessX",
      "type": "number",
      "default": "55",
      "description": "Pointer X spring stiffness (higher = snappier follow)"
    },
    {
      "name": "stiffnessY",
      "type": "number",
      "default": "45",
      "description": "Pointer Y spring stiffness"
    },
    {
      "name": "damping",
      "type": "number",
      "default": "9",
      "description": "Spring damping (higher = less swing overshoot)"
    },
    {
      "name": "caption",
      "type": "string",
      "default": "undefined",
      "description": "Optional screen-reader caption for the charm"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional Tailwind classes merged into the container"
    }
  ],
  "accessibility": [
    "role=\"img\" with descriptive aria-label for screen readers",
    "Touch-none and select-none to avoid stray text selection while interacting",
    "Complete prefers-reduced-motion fallback: pointer listeners are never wired, charm rests in place",
    "Decorative SVG and dot textures marked aria-hidden"
  ],
  "createdAt": "2026-08-31",
  "usageCode": "import { NimbuMirchi } from \"@/components/ui/nimbu-mirchi\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <NimbuMirchi\n        maxRotation={13}\n        stiffnessX={55}\n        stiffnessY={45}\n        damping={9}\n        caption=\"Hanging nimbu-mirchi charm\"\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/NimbuMirchi.tsx",
      "type": "registry:ui",
      "target": "components/ui/nimbu-mirchi.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
