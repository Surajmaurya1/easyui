// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "drag-to-confirm",
  "name": "Drag to Confirm",
  "tagline": "Spring-resistant slider for confirming destructive or critical operations",
  "description": "A minimalist physical drag-to-confirm slider for high-stakes and destructive actions, equipped with progressive track fill physics, spring snapback resistance, full light/dark theme adaptation, and accessible keyboard controls.",
  "category": "Buttons",
  "badges": [
    "Confirmation",
    "Gesture Physics",
    "Safety Controls",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/drag-to-confirm",
  "installPromptHash": "ce36c3c5375781fb129c23e206f09dbe47aa8124e2888dd79bb20bea8bc7c647",
  "features": [
    "Clean minimalist pill geometry with seamless light and dark mode theme compatibility",
    "Dynamic progressive track fill that physically tracks the handle as you drag",
    "Physical gesture drag handle with calibrated spring snapback upon incomplete drags",
    "Supports Delete, Archive, Confirm, Submit, and Unlock action profiles with custom sizes (sm, md, lg)",
    "Automatic post-confirmation reset timer with customizable delay or controlled state support",
    "Full keyboard accessibility (Space, Enter, ArrowRight to trigger) and mobile haptic vibration feedback"
  ],
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "'Slide to confirm'",
      "description": "Action instruction text rendered along track"
    },
    {
      "name": "confirmedLabel",
      "type": "string",
      "default": "'Confirmed ✓'",
      "description": "Text shown when slider locks into completion"
    },
    {
      "name": "actionType",
      "type": "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'",
      "default": "'confirm'",
      "description": "Action preset style and icon archetype"
    },
    {
      "name": "variant",
      "type": "'default' | 'danger' | 'warning' | 'info' | 'success'",
      "default": "undefined",
      "description": "Visual tone variant override"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Slider dimension profile (sm: 40px, md: 48px, lg: 54px)"
    },
    {
      "name": "icon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Custom idle state icon rendered inside thumb"
    },
    {
      "name": "confirmedIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Custom confirmed state icon rendered inside thumb"
    },
    {
      "name": "isConfirmed",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled confirmation state"
    },
    {
      "name": "onConfirm",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback triggered upon successful confirmation completion"
    },
    {
      "name": "onReset",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback triggered upon slider reset"
    },
    {
      "name": "autoResetDelay",
      "type": "number",
      "default": "2500",
      "description": "Milliseconds before resetting back to start (0 to disable)"
    },
    {
      "name": "haptic",
      "type": "boolean",
      "default": "true",
      "description": "Triggers subtle vibration feedback upon confirmation"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables slider gesture and interaction"
    }
  ],
  "accessibility": [
    "Accessible role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow attributes",
    "Focus-visible ring around draggable handle for keyboard navigators",
    "Space, Enter, and ArrowRight keys trigger animated confirmation sequence",
    "Screen reader fallback action button for assistive tech users",
    "Respects prefers-reduced-motion system preference"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { DragToConfirm } from \"@/components/ui/drag-to-confirm\";\n\nexport function Demo() {\n  return (\n    <DragToConfirm\n      actionType=\"delete\"\n      size=\"md\"\n      label=\"Slide to delete database →\"\n      confirmedLabel=\"Database Deleted ✓\"\n      onConfirm={() => console.log('Destroy action confirmed')}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/DragToConfirm.tsx",
      "type": "registry:ui",
      "target": "components/ui/drag-to-confirm.tsx"
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
