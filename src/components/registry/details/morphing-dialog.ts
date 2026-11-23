// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "morphing-dialog",
  "name": "Morphing Dialog",
  "tagline": "Seamless shared layoutId card to modal transition",
  "description": "An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.",
  "category": "Overlays",
  "badges": [
    "Shared Layout",
    "Spring Physics",
    "Zero Layout Shift"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog",
  "installPromptHash": "17095419d04d6b5dcaa5e5d6538bfd69f3a4677c92ed01f4a4f777859d1b06dd",
  "features": [
    "Framer Motion layoutId continuous surface expansion",
    "Esc key dismissal and backdrop click support",
    "Body scroll lock handling during active state"
  ],
  "props": [
    {
      "name": "title",
      "type": "string",
      "default": "Required",
      "description": "Dialog header title"
    },
    {
      "name": "subtitle",
      "type": "string",
      "default": "undefined",
      "description": "Secondary header description"
    },
    {
      "name": "trigger",
      "type": "(open: () => void) => ReactNode",
      "default": "Required",
      "description": "Render trigger button or card"
    }
  ],
  "accessibility": [
    "Traps focus and sets aria-modal=\"true\"",
    "Closes on Escape key press with focus restoration"
  ],
  "createdAt": "2026-08-14",
  "usageCode": "import { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/MorphingDialog.tsx",
      "type": "registry:ui",
      "target": "components/ui/morphing-dialog.tsx"
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
