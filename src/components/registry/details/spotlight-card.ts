// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "spotlight-card",
  "name": "Spotlight Card",
  "tagline": "Radial pointer tracking over dark layered surface",
  "description": "A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.",
  "category": "Motion",
  "badges": [
    "Shader Feel",
    "Pointer Physics",
    "Dark Elevation"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-card",
  "installPromptHash": "fd49767d280c915ad55406b6aba373336e876d4585ae7d71831efeee30314a3c",
  "features": [
    "Hardware-accelerated dynamic radial mask",
    "Dual illumination (border beam + ambient inner glow)",
    "Near-black layered background preservation"
  ],
  "props": [
    {
      "name": "spotlightColor",
      "type": "string",
      "default": "'rgba(56, 189, 248, 0.08)'",
      "description": "Inner ambient radial color"
    },
    {
      "name": "spotlightSize",
      "type": "number",
      "default": "350",
      "description": "Radius of spotlight effect in pixels"
    }
  ],
  "accessibility": [
    "Accessible contrast ratio for all nested text and actions",
    "No reliance on animation for critical content reading"
  ],
  "createdAt": "2026-08-15",
  "usageCode": "import { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/SpotlightCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/spotlight-card.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
