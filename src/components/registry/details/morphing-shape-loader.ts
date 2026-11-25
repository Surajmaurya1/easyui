// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "morphing-shape-loader",
  "name": "Morphing Shape Loader",
  "tagline": "Continuously morphing SVG shape loader",
  "description": "A loading indicator that continuously morphs between configurable SVG shapes via real path interpolation. The transition is a genuine geometric morph — never a fade out / in.",
  "category": "Feedback",
  "badges": [
    "SVG Morph",
    "Configurable",
    "Loop"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-shape-loader",
  "installPromptHash": "d6851cdfc8592e19307a7911111a9747c34a83f8e21bbc805d6f5fc9207e2e3d",
  "features": [
    "Continuous morph between matched-control-point shapes",
    "Configurable shape list, duration, hold time, and loop behavior",
    "Stroke and filled variants with optional gradient",
    "Subtle dashed backdrop ring for visual context",
    "Respects prefers-reduced-motion (renders a single static shape)"
  ],
  "props": [
    {
      "name": "shapes",
      "type": "ShapeKind[]",
      "default": "['circle','square','triangle','circle']",
      "description": "Ordered list of shapes to cycle through"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1.6",
      "description": "Morph duration per shape change in seconds"
    },
    {
      "name": "holdDuration",
      "type": "number",
      "default": "0.4",
      "description": "Hold duration at each shape in seconds"
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "true",
      "description": "Loop the shape sequence"
    },
    {
      "name": "size",
      "type": "number",
      "default": "96",
      "description": "Loader size in pixels (square)"
    },
    {
      "name": "color",
      "type": "string",
      "default": "'#FAFAFA'",
      "description": "Stroke or fill color"
    },
    {
      "name": "filled",
      "type": "boolean",
      "default": "false",
      "description": "Filled variant instead of stroke"
    }
  ],
  "accessibility": [
    "role=\"status\" with aria-busy on the loader",
    "Visually hidden text label for screen readers",
    "Respects prefers-reduced-motion media query"
  ],
  "createdAt": "2026-09-02",
  "usageCode": "import { MorphingShapeLoader } from \"@/components/ui/morphing-shape-loader\";\n\nexport function Demo() {\n  return (\n    <MorphingShapeLoader\n      shapes={['circle', 'square', 'triangle', 'hexagon', 'star']}\n      duration={1.4}\n      holdDuration={0.3}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/MorphingShapeLoader.tsx",
      "type": "registry:ui",
      "target": "components/ui/morphing-shape-loader.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/theme/useTheme.tsx",
      "type": "registry:lib",
      "target": "lib/theme/useTheme.tsx"
    }
  ]
};

export default component;
