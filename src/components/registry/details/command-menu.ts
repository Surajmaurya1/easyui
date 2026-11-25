// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "command-menu",
  "name": "Command Menu",
  "tagline": "Global ⌘K fuzzy palette with category grouping",
  "description": "A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.",
  "category": "Overlays",
  "badges": [
    "Keyboard First",
    "⌘K / Ctrl+K",
    "Fuzzy Filtering"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/command-menu",
  "installPromptHash": "83c58203a98849c14a572808ed513f83d4075a6b50bf766b0d6975d574a16a84",
  "features": [
    "Global hotkey listener (⌘K / Ctrl+K)",
    "Arrow key navigation with wrapping",
    "Category badges and action shortcuts"
  ],
  "props": [
    {
      "name": "isOpen",
      "type": "boolean",
      "default": "false",
      "description": "Control visibility"
    },
    {
      "name": "onClose",
      "type": "() => void",
      "default": "Required",
      "description": "Close handler callback"
    }
  ],
  "accessibility": [
    "ARIA combobox pattern",
    "Keyboard-only navigation"
  ],
  "createdAt": "2026-08-01",
  "usageCode": "import { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/CommandMenu.tsx",
      "type": "registry:ui",
      "target": "components/ui/command-menu.tsx"
    },
    {
      "path": "src/components/icons/GithubIcon.tsx",
      "type": "registry:ui",
      "target": "components/icons/github-icon.tsx"
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
    },
    {
      "path": "src/lib/constants.ts",
      "type": "registry:lib",
      "target": "lib/constants.ts"
    }
  ]
};

export default component;
