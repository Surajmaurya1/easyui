// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "loader",
  "name": "Loader",
  "tagline": "Calm, continuous feedback states with zero visual stress",
  "description": "A minimal, purpose-driven loading indicator with 4 calm, non-anxious motion variants.",
  "category": "Feedback",
  "badges": [
    "CSS & SVG",
    "Calm Motion",
    "Zero Deps",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/loader",
  "installPromptHash": "c582c2da9a3ed2812622db642aa183f288e886f36637f9c2b8195879c5cb3177",
  "features": [
    "4 refined motion variants: rotating arc, breathing dots, sliding line, and expanding concentric rings",
    "Configurable dimensions and stroke colors with seamless dark mode support",
    "Accessible role=\"status\" and aria-busy telemetry without screen reader interruption",
    "Automatic reduced-motion adaptation for sensitive viewers"
  ],
  "props": [
    {
      "name": "size",
      "type": "number",
      "default": "32",
      "description": "Diameter or width scale in pixels"
    },
    {
      "name": "variant",
      "type": "'arc' | 'dots' | 'line' | 'rings'",
      "default": "'arc'",
      "description": "Visual animation mode"
    },
    {
      "name": "label",
      "type": "string",
      "default": "'Loading...'",
      "description": "Accessible screen reader text label"
    },
    {
      "name": "reduceMotion",
      "type": "boolean",
      "default": "false",
      "description": "Disables high-velocity continuous spins"
    },
    {
      "name": "color",
      "type": "string",
      "default": "'currentColor'",
      "description": "CSS color string for indicator strokes"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional CSS class names"
    }
  ],
  "accessibility": [
    "Includes role=\"status\" and aria-busy=\"true\" on container",
    "Screen reader-only label announcement prevents repetitive speech spam",
    "Full prefers-reduced-motion compatibility with gentle opacity pulsing"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { Loader } from \"@/components/ui/loader\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-6 p-8 bg-[#0A0A0A] rounded-2xl border border-[#222222]\">\n      <Loader variant=\"arc\" size={32} />\n      <Loader variant=\"dots\" size={28} />\n      <Loader variant=\"line\" size={36} />\n      <Loader variant=\"rings\" size={32} />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/Loader.tsx",
      "type": "registry:ui",
      "target": "components/ui/loader.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
