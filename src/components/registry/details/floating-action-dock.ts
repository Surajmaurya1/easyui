// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "floating-action-dock",
  "name": "Floating Action Dock",
  "tagline": "Magnification curve with physical spring feedback",
  "description": "A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.",
  "category": "Navigation",
  "badges": [
    "Pointer Physics",
    "Magnification Curve",
    "Tooltips"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/floating-action-dock",
  "installPromptHash": "75070e00908f47f776c53d704e3a25a74101e4ebfe9c9417299358d45da810e4",
  "features": [
    "Continuous distance interpolation curve",
    "Tooltips with instant spring opacity",
    "Active status indicator dot"
  ],
  "props": [
    {
      "name": "items",
      "type": "DockItem[]",
      "default": "[]",
      "description": "Dock icons with labels, actions, and icons"
    },
    {
      "name": "activeId",
      "type": "string",
      "default": "undefined",
      "description": "Current active item identifier"
    }
  ],
  "accessibility": [
    "Standard aria-labels for every button item",
    "Accessible keyboard focus"
  ],
  "createdAt": "2026-08-12",
  "usageCode": "import { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/FloatingActionDock.tsx",
      "type": "registry:ui",
      "target": "components/ui/floating-action-dock.tsx"
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
