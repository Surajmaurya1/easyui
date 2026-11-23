// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "velocity-toast",
  "name": "VelocityToast",
  "tagline": "Enters with velocity, settles naturally",
  "description": "A toast that enters with velocity and settles, with a progress indicator that responds naturally — pauses on hover, resumes with no jump, and eases slightly in the final 10% so dismissal feels intentional.",
  "category": "Feedback",
  "badges": [
    "Velocity Entry",
    "Natural Progress",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/velocity-toast",
  "installPromptHash": "6338ea46d7f4c06dafa2e28e5e77819be4d8571e9d426971de6f1840bb44f9ce",
  "features": [
    "Entry animation starts further out (y: 22px) for higher perceived velocity, then springs to rest",
    "Progress indicator uses a slight ease-in (pow 1.05) so the final 10% feels decisive",
    "Hover pauses progress without visual jump; resume picks up from the remaining time",
    "6 position presets, 5 variant tones, optional custom icon",
    "Light/dark theme aware — works in both palettes"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "undefined",
      "description": "Whether the toast is visible"
    },
    {
      "name": "onDismiss",
      "type": "() => void",
      "default": "undefined",
      "description": "Called when toast is dismissed (auto or manual)"
    },
    {
      "name": "title",
      "type": "string",
      "default": "undefined",
      "description": "Toast title"
    },
    {
      "name": "description",
      "type": "string",
      "default": "undefined",
      "description": "Secondary description"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "4000",
      "description": "Auto-dismiss duration in ms"
    },
    {
      "name": "variant",
      "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
      "default": "'default'",
      "description": "Visual tone"
    },
    {
      "name": "position",
      "type": "VelocityToastPosition",
      "default": "'bottom-center'",
      "description": "Screen placement"
    },
    {
      "name": "showProgress",
      "type": "boolean",
      "default": "true",
      "description": "Show countdown progress bar"
    }
  ],
  "accessibility": [
    "role=\"status\" with aria-live=\"polite\" for screen readers",
    "Hover pause is non-disruptive — no focus traps or input blocking",
    "Visual close button is keyboard-reachable with focus-ring"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { useState } from \"react\";\nimport { VelocityToast } from \"@/components/ui/velocity-toast\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Show toast</PressButton>\n      <VelocityToast\n        open={open}\n        onDismiss={() => setOpen(false)}\n        title=\"File uploaded\"\n        description=\"easyui-2026-09.zip is ready.\"\n        variant=\"success\"\n        position=\"bottom-right\"\n      />\n    </>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/VelocityToast.tsx",
      "type": "registry:ui",
      "target": "components/ui/velocity-toast.tsx"
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
