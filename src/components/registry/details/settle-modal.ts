// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "settle-modal",
  "name": "SettleModal",
  "tagline": "Content scales and settles, never fades",
  "description": "A modal whose content has a tiny scale/settle instead of a generic fade. The panel scales 0.94 -> 1.02 -> 1.0 with a small y travel, then the inner content layers its own gentle settle on top.",
  "category": "Overlays",
  "badges": [
    "Scale Settle",
    "Layered Motion",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/settle-modal",
  "installPromptHash": "09402b4ce8095167f90061f1d67bbccb2354b25b169b6fc357d7a15bbed3be2b",
  "features": [
    "Panel animates scale 0.94 -> 1.02 -> 1.0 with ease-soft curve for a tactile \"settle\"",
    "Inner content has its own layered scale-up (0.98 -> 1.0) for a nested feel",
    "Escape key dismisses; backdrop click closes by default (toggle via closeOnBackdrop)",
    "Scroll lock while open; restores previous overflow on close",
    "Three size presets (sm / md / lg) with optional title, description, and footer slots"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "undefined",
      "description": "Whether the modal is open"
    },
    {
      "name": "onClose",
      "type": "() => void",
      "default": "undefined",
      "description": "Called when the modal should close"
    },
    {
      "name": "title",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Optional title rendered at the top"
    },
    {
      "name": "description",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Optional secondary description below the title"
    },
    {
      "name": "children",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Main content area"
    },
    {
      "name": "footer",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Footer area, typically action buttons"
    },
    {
      "name": "hideCloseButton",
      "type": "boolean",
      "default": "false",
      "description": "Hide the close (X) button"
    },
    {
      "name": "closeOnBackdrop",
      "type": "boolean",
      "default": "true",
      "description": "Click on backdrop closes the modal"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Maximum width preset"
    }
  ],
  "accessibility": [
    "role=\"dialog\" with aria-modal=\"true\" and aria-labelledby wired to the title",
    "Body scroll lock while open; restored on close",
    "Escape key dismisses; focus-ring on the close button",
    "Reduced-motion users get the same content but the entry curve is shorter"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { useState } from \"react\";\nimport { SettleModal } from \"@/components/ui/settle-modal\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Open modal</PressButton>\n      <SettleModal\n        open={open}\n        onClose={() => setOpen(false)}\n        title=\"Confirm archive\"\n        description=\"Archived projects can be restored within 30 days.\"\n        footer={\n          <>\n            <PressButton variant=\"ghost\" onClick={() => setOpen(false)}>Cancel</PressButton>\n            <PressButton variant=\"primary\" onClick={() => setOpen(false)}>Archive</PressButton>\n          </>\n        }\n      >\n        <p className=\"text-sm text-[#A1A1A1] leading-relaxed\">\n          This project and its 14 components will be moved to the archive.\n        </p>\n      </SettleModal>\n    </>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SettleModal.tsx",
      "type": "registry:ui",
      "target": "components/ui/settle-modal.tsx"
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
