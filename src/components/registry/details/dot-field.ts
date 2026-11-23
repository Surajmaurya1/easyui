// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "dot-field",
  "name": "Dot Field",
  "tagline": "Lightweight static Canvas particle matrix background",
  "description": "High-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.",
  "category": "Motion",
  "badges": [
    "HTML5 Canvas",
    "Static Visual",
    "Zero Overhead"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-field",
  "installPromptHash": "315365acb1ebe797fc6b233b22fcde1de252eba83845541d409f97fefac849f5",
  "features": [
    "Hardware-accelerated HTML5 Canvas rendering",
    "Zero CPU overhead — renders once and updates only on resize",
    "Clean linear gradient coloring with custom stops",
    "Responsive ResizeObserver layout support"
  ],
  "props": [
    {
      "name": "dotRadius",
      "type": "number",
      "default": "1.5",
      "description": "Radius of each individual dot (px)"
    },
    {
      "name": "dotSpacing",
      "type": "number",
      "default": "14",
      "description": "Spacing between adjacent dots in the grid (px)"
    },
    {
      "name": "gradientFrom",
      "type": "string",
      "default": "'rgba(56, 189, 248, 0.35)'",
      "description": "Start gradient color"
    },
    {
      "name": "gradientTo",
      "type": "string",
      "default": "'rgba(168, 85, 247, 0.25)'",
      "description": "End gradient color"
    },
    {
      "name": "className",
      "type": "string",
      "default": "''",
      "description": "Optional container CSS class"
    }
  ],
  "accessibility": [
    "Canvas decorative element",
    "Aria-hidden/pointer-events safe layer"
  ],
  "createdAt": "2026-08-08",
  "usageCode": "import { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/DotField.tsx",
      "type": "registry:ui",
      "target": "components/ui/dot-field.tsx"
    },
    {
      "path": "src/components/ui/DotField.css",
      "type": "registry:ui",
      "target": "components/ui/dot-field.css"
    }
  ]
};

export default component;
