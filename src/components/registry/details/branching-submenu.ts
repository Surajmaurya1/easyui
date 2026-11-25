// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "branching-submenu",
  "name": "Branching Submenu",
  "tagline": "Animated tree navigation with keyboard support",
  "description": "A spatial submenu that connects parent options to child actions with staged branch motion.",
  "category": "Navigation",
  "badges": [
    "Navigation",
    "Keyboard Friendly",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/branching-submenu",
  "installPromptHash": "fec160dbb52a445b2be0a8c18cdd3fb42fa0a9cf0fb1e4a10262055b0b5c48ab",
  "features": [
    "Parent and child panels communicate hierarchy through position and stagger",
    "Arrow keys, Enter, and Escape support menu exploration",
    "Responsive layout stacks cleanly on narrow screens"
  ],
  "props": [
    {
      "name": "items",
      "type": "BranchingSubmenuItem[]",
      "default": "demo items",
      "description": "Parent items and optional child branches"
    },
    {
      "name": "label",
      "type": "string",
      "default": "'Branching navigation'",
      "description": "Accessible navigation label"
    }
  ],
  "accessibility": [
    "Uses a labeled navigation region and focus-visible rings",
    "Supports Escape to close the branch panel and arrow-key parent navigation",
    "Reduced motion replaces branch movement with a simple fade"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { BranchingSubmenu } from \"@/components/ui/branching-submenu\";\n\nexport function Demo() {\n  return <BranchingSubmenu />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/BranchingSubmenu.tsx",
      "type": "registry:ui",
      "target": "components/ui/branching-submenu.tsx"
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
