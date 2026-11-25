// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "torque-dial",
  "name": "Torque Dial",
  "tagline": "Rotational control knob with physical spin momentum",
  "description": "A rotational control dial with realistic physical angular momentum, velocity tracking, and exponential friction deceleration.",
  "category": "Motion",
  "badges": [
    "Framer Motion",
    "Physics Simulation",
    "Precision Control",
    "Forms"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/torque-dial",
  "installPromptHash": "ac2325f98b6e1debe63c32533aaea97f0762696e62b1e12f5e7097382fea704d",
  "features": [
    "Natural angular momentum release with exponential friction deceleration decay",
    "Supports drag rotation, mouse wheel fine-tuning, keyboard arrow adjustments, and double-click centering",
    "Dynamic SVG radial progress ring with continuous value telemetry",
    "Full accessibility with role=\"slider\", aria-valuenow, and keyboard stepping"
  ],
  "props": [
    {
      "name": "value",
      "type": "number",
      "description": "Current numeric value"
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "description": "Minimum dial threshold"
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "description": "Maximum dial threshold"
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "description": "Step resolution increment"
    },
    {
      "name": "onChange",
      "type": "(val: number) => void",
      "description": "Callback fired on rotation value updates"
    },
    {
      "name": "momentum",
      "type": "boolean",
      "default": "true",
      "description": "Enables velocity-based inertial spin after drag release"
    },
    {
      "name": "size",
      "type": "number",
      "default": "120",
      "description": "Diameter in pixels"
    },
    {
      "name": "unit",
      "type": "string",
      "default": "''",
      "description": "Optional unit suffix (e.g. \"%\", \"dB\", \"°\")"
    }
  ],
  "accessibility": [
    "Semantic role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow",
    "Arrow keys, Home, and End support for fine keyboard tuning",
    "Visible focus outline around knob bounding perimeter"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { useState } from \"react\";\nimport { TorqueDial } from \"@/components/ui/torque-dial\";\n\nexport function Demo() {\n  const [gain, setGain] = useState(48);\n\n  return (\n    <div className=\"p-8 flex items-center justify-center bg-[#090909] rounded-2xl border border-[#1F1F1F]\">\n      <TorqueDial\n        value={gain}\n        onChange={setGain}\n        min={0}\n        max={100}\n        unit=\"%\"\n        label=\"Gain Level\"\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/TorqueDial.tsx",
      "type": "registry:ui",
      "target": "components/ui/torque-dial.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
