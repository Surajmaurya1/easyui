// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "stretch-switch",
  "name": "StretchSwitch",
  "tagline": "Thumb stretches on press, then snaps",
  "description": "A toggle switch whose thumb stretches slightly while dragging or pressing, then snaps naturally to its destination via a snappy spring.",
  "category": "Forms",
  "badges": [
    "Stretch Physics",
    "Spring Snap",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stretch-switch",
  "installPromptHash": "95db5792767ff316bf2e6a55ceabe6d3ae35341f4d8c815c0f94ad76f0e57c70",
  "features": [
    "Thumb scaleX -> 1.18 / scaleY -> 0.86 while pointer is held for a tactile stretch",
    "Snappy spring (springSnappy) drives the snap to the new x position on release",
    "Press state is captured via pointerdown / pointerup, so it works for keyboard activations too",
    "Controlled / uncontrolled state, with onChange callback",
    "Light/dark theme aware via CSS variables — works in both palettes"
  ],
  "props": [
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
    },
    {
      "name": "onChange",
      "type": "(checked: boolean) => void",
      "default": "undefined",
      "description": "Called when the switch toggles"
    },
    {
      "name": "label",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Label text on the left"
    },
    {
      "name": "description",
      "type": "string",
      "default": "undefined",
      "description": "Helper text below the label"
    }
  ],
  "accessibility": [
    "role=\"switch\" with aria-checked for assistive technology",
    "Pointer-based stretch effect does not interfere with keyboard activation",
    "Disabled state communicated both visually and to AT"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { StretchSwitch } from \"@/components/ui/stretch-switch\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3 max-w-sm\">\n      <StretchSwitch\n        label=\"Reduce motion\"\n        description=\"Disables parallax and large translations across the app.\"\n        defaultChecked\n      />\n      <StretchSwitch\n        label=\"Show pre-release features\"\n        description=\"Toggle to preview experiments in the dashboard.\"\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/StretchSwitch.tsx",
      "type": "registry:ui",
      "target": "components/ui/stretch-switch.tsx"
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
