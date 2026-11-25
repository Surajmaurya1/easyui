// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "evil-eye",
  "name": "Evil Eye",
  "tagline": "Pointer-driven hanging amulet with layered spring physics",
  "description": "A hanging navy amulet disc with concentric sky-blue and white rings that swings with realistic inertia in response to the pointer, painted as a layered SVG and driven by a single spring pipeline.",
  "category": "Motion",
  "badges": [
    "Spring Physics",
    "Pointer Tracking",
    "Layered Motion",
    "Painted SVG"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/evil-eye",
  "installPromptHash": "ebedcff1363334c3781e1030159c49621ad4aaa5ace97843b3f2fb9ac57e0b82",
  "features": [
    "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
    "Layered secondary motion — braided cord, metallic cap, and amulet disc each swing independently",
    "Painted SVG with radial gradients for the navy disc, sky-blue ring, and the signature pupil glint",
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
      "description": "Optional screen-reader caption for the amulet"
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
    "Complete prefers-reduced-motion fallback: pointer listeners are never wired, amulet rests in place",
    "Decorative SVG marked aria-hidden"
  ],
  "createdAt": "2026-08-31",
  "usageCode": "import { EvilEye } from \"@/components/ui/evil-eye\";\n\nexport function Demo() {\n  return (\n    <EvilEye\n      maxRotation={13}\n      stiffnessX={55}\n      stiffnessY={45}\n      damping={9}\n      caption=\"Hanging evil eye amulet\"\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/EvilEye.tsx",
      "type": "registry:ui",
      "target": "components/ui/evil-eye.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
