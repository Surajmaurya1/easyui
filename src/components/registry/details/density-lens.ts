// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "density-lens",
  "name": "Density Lens",
  "tagline": "Cursor-tracking magnification & detail inspection lens",
  "description": "An interactive floating lens that tracks pointer movement to reveal high-density data, magnified details, or alternative views.",
  "category": "Motion",
  "badges": [
    "Framer Motion",
    "Spring Physics",
    "Inspection",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/density-lens",
  "installPromptHash": "37bb3034d59a4d3b21023d9464a981b3d8c337a74793ba72d8ba0a2c37a6b601",
  "features": [
    "Subtle spring lag cursor tracking for realistic tactile lens momentum",
    "Automatic coordinate interpolation with 2x magnification or custom overlay renderers",
    "Configurable lens geometry (circle, oval, rounded square), border glow, and zoom scale",
    "Zero layout shifts and smooth GPU-accelerated backdrop blur"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Underlying background content being inspected"
    },
    {
      "name": "renderLensContent",
      "type": "(pos: { x: number, y: number, scale: number }) => ReactNode",
      "default": "undefined",
      "description": "Custom overlay rendered inside lens"
    },
    {
      "name": "lensSize",
      "type": "number",
      "default": "150",
      "description": "Diameter/width of lens in pixels"
    },
    {
      "name": "lensShape",
      "type": "'circle' | 'oval' | 'square'",
      "default": "'circle'",
      "description": "Geometric shape of lens"
    },
    {
      "name": "zoomScale",
      "type": "number",
      "default": "2",
      "description": "Magnification factor"
    },
    {
      "name": "showBorder",
      "type": "boolean",
      "default": "true",
      "description": "Renders border and glass glow around perimeter"
    }
  ],
  "accessibility": [
    "Non-destructive hover lens overlay preserves underlying semantic document tree",
    "Includes crosshair pointer hints and smooth fade transitions",
    "Touch fallbacks support direct inspection"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { DensityLens } from \"@/components/ui/density-lens\";\n\nexport function Demo() {\n  return (\n    <DensityLens lensSize={160} zoomScale={2}>\n      <div className=\"p-8 bg-[#0C0C0C] rounded-2xl border border-[#222222]\">\n        <h3 className=\"text-sm font-semibold text-white\">System Architecture</h3>\n        <p className=\"text-xs text-[#808080] mt-2\">\n          Hover pointer across surface to inspect high-resolution telemetry nodes.\n        </p>\n      </div>\n    </DensityLens>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/DensityLens.tsx",
      "type": "registry:ui",
      "target": "components/ui/density-lens.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
