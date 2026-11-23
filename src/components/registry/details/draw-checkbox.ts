// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "draw-checkbox",
  "name": "DrawCheckbox",
  "tagline": "Checkmark draws itself, then settles",
  "description": "A checkbox whose checkmark draws itself (path length animation) and settles with a tiny overshoot. The box scales from 0.9 -> 1.04 -> 1.0 for a tactile snap feel.",
  "category": "Forms",
  "badges": [
    "Path Draw",
    "Overshoot",
    "Indeterminate",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/draw-checkbox",
  "installPromptHash": "310fdb9f26b4b0be3d1cf56141ea548e1c23f50b93942d8f633ebeaf68b860e8",
  "features": [
    "Checkmark animates via stroke-dashoffset (path length 0 -> 1) with a snappy draw curve",
    "Box scales 0.9 -> 1.04 -> 1.0 for a tiny physical overshoot, then settles",
    "Indeterminate state draws a bar from left to right via scaleX origin",
    "Accent background swaps to var(--accent) when checked — theme aware",
    "Full controlled / uncontrolled state support, plus ref forwarding"
  ],
  "props": [
    {
      "name": "label",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Label text displayed next to the box"
    },
    {
      "name": "description",
      "type": "string",
      "default": "undefined",
      "description": "Helper text below the label"
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "default": "false",
      "description": "When true, renders a horizontal bar instead of a checkmark"
    },
    {
      "name": "checked",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled checked state"
    },
    {
      "name": "defaultChecked",
      "type": "boolean",
      "default": "false",
      "description": "Initial checked state (uncontrolled)"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Prevents interaction"
    }
  ],
  "accessibility": [
    "Hidden native <input type=\"checkbox\"> preserves semantics and screen-reader support",
    "Visible box is a label proxy — clicking it forwards to the native input",
    "Disabled state communicated both visually and via aria-disabled"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { DrawCheckbox } from \"@/components/ui/draw-checkbox\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3\">\n      <DrawCheckbox label=\"Email me product updates\" description=\"We send about one email per month.\" defaultChecked />\n      <DrawCheckbox label=\"Indeterminate option\" indeterminate />\n      <DrawCheckbox label=\"Accept terms\" />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/DrawCheckbox.tsx",
      "type": "registry:ui",
      "target": "components/ui/draw-checkbox.tsx"
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
