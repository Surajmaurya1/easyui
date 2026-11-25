// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "spotlight-search",
  "name": "Spotlight Search",
  "tagline": "Global ⌘K search overlay with moving highlight spring physics",
  "description": "A global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.",
  "category": "Overlays",
  "badges": [
    "Command Palette",
    "Search",
    "Overlays"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-search",
  "installPromptHash": "2cb9567146bfe184911170c8eb2059f1f694c54bb1cf7458890fb489ca99767b",
  "features": [
    "Global keyboard listener for ⌘K / Ctrl+K and Escape dismissal",
    "Animated active highlight tracking item selection with layoutId spring physics",
    "Categorized search results with contextual icons and technical kbd badges",
    "Dimmed backdrop with subtle blur preserving focus on command box",
    "Full arrow key navigation and Enter selection execution"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "false",
      "description": "Controlled visibility state"
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "default": "undefined",
      "description": "Callback fired when modal visibility toggles"
    },
    {
      "name": "items",
      "type": "SpotlightSearchItem[]",
      "default": "[...]",
      "description": "List of searchable actions and components"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Search components, actions...'",
      "description": "Input placeholder text"
    },
    {
      "name": "onSelect",
      "type": "(item: SpotlightSearchItem) => void",
      "default": "undefined",
      "description": "Callback fired when item is chosen"
    }
  ],
  "accessibility": [
    "Aria-expanded and aria-autocomplete attributes on input",
    "Complete keyboard control (Up/Down arrows, Enter, Escape)",
    "Traps focus within dialog while active and restores focus on close"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { SpotlightSearch } from \"@/components/ui/spotlight-search\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>\n      <SpotlightSearch open={open} onOpenChange={setOpen} />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SpotlightSearch.tsx",
      "type": "registry:ui",
      "target": "components/ui/spotlight-search.tsx"
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
