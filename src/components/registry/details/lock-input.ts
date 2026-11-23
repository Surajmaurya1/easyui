// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "lock-input",
  "name": "LockInput",
  "tagline": "Focus state that \"locks\" into place",
  "description": "A text input whose focus state subtly \"locks\" into place — a focus ring scales in from the center and the border tweens to active, giving the impression that the input snaps closed on itself.",
  "category": "Forms",
  "badges": [
    "Focus Lock",
    "Spring Ring",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/lock-input",
  "installPromptHash": "ffef272ddc3eca31cb151034b734dfffb4e4e2108cc5046a9897ce9d9b52d120",
  "features": [
    "Focus ring scales in from 0.94 to 1.0 with a snappy spring, producing a physical \"lock\" feel",
    "Inset border ring fades in alongside the outer focus halo for a layered lock effect",
    "Icon and label slots adjust contrast on focus to draw the eye inward",
    "Error state replaces accent with restrained rose and animates message in",
    "Light/dark theme aware via CSS variables — same code, both themes"
  ],
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "undefined",
      "description": "Visible label rendered above the input"
    },
    {
      "name": "description",
      "type": "string",
      "default": "undefined",
      "description": "Helper text below the input"
    },
    {
      "name": "error",
      "type": "string",
      "default": "undefined",
      "description": "Error message; presence triggers danger styling"
    },
    {
      "name": "leftIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Icon element placed before the input value"
    },
    {
      "name": "rightIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Icon element placed after the input value"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Prevents interaction and applies 30% disabled opacity"
    }
  ],
  "accessibility": [
    "Proper <label htmlFor> association for assistive technology",
    "aria-invalid toggles on error; aria-describedby links helper text",
    "Restrained focus ring is keyboard-only via :focus-visible-friendly overlay",
    "Disabled state communicated both visually and via pointer-events"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { LockInput } from \"@/components/ui/lock-input\";\nimport { Mail } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-4 max-w-sm\">\n      <LockInput\n        label=\"Email\"\n        type=\"email\"\n        placeholder=\"you@studio.dev\"\n        leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n        description=\"We'll send a confirmation link here.\"\n      />\n      <LockInput\n        label=\"Workspace\"\n        placeholder=\"acme\"\n        error=\"That workspace is already taken.\"\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/LockInput.tsx",
      "type": "registry:ui",
      "target": "components/ui/lock-input.tsx"
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
  ],
  "featured": true
};

export default component;
