// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "small-floating-dock",
  "name": "Small Floating Dock",
  "tagline": "Hover proximity scale & tactile action pills",
  "description": "A minimal, gesture-responsive floating dock for quick access to 3-5 primary actions.",
  "category": "Navigation",
  "badges": [
    "Framer Motion",
    "Spring Physics",
    "Navigation",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/small-floating-dock",
  "installPromptHash": "e33c29fbbbee786a8bbf58851aa646e9425a7c0dc3229a49e2858ccedd95c508",
  "features": [
    "Proximity-aware hover scale with elastic spring snap-back physics",
    "Supports 3 to 5 actions with numeric unread badges and contextual tooltips",
    "Configurable screen positioning (bottom-right, bottom-center, bottom-left)",
    "Optional hide-on-scroll behavior with smooth viewport transitions",
    "Full keyboard tab navigation and WCAG AA focus rings"
  ],
  "props": [
    {
      "name": "items",
      "type": "DockItem[]",
      "default": "[]",
      "description": "Array of 3 to 5 action items with icon, label, action, and badge"
    },
    {
      "name": "position",
      "type": "'bottom-right' | 'bottom-center' | 'bottom-left'",
      "default": "'bottom-right'",
      "description": "Screen placement"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Button sizing scale"
    },
    {
      "name": "hideOnScroll",
      "type": "boolean",
      "default": "false",
      "description": "Auto-hides dock during downward scroll"
    },
    {
      "name": "variant",
      "type": "'icon-only' | 'icon-label'",
      "default": "'icon-only'",
      "description": "Icon only with tooltips or labeled buttons"
    },
    {
      "name": "activeId",
      "type": "string",
      "default": "undefined",
      "description": "Selected active item ID"
    }
  ],
  "accessibility": [
    "Semantic <nav> landmark with role=\"navigation\"",
    "aria-label on all action buttons and aria-current=\"page\" on active item",
    "Keyboard focus and tooltip synchronization on Tab / Escape"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { SmallFloatingDock } from \"@/components/ui/small-floating-dock\";\nimport { Sparkles, Terminal, Code2, Bell } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <SmallFloatingDock\n      position=\"bottom-right\"\n      items={[\n        { id: '1', label: 'AI Assistant', icon: <Sparkles className=\"w-4 h-4\" />, action: () => {} },\n        { id: '2', label: 'Terminal', icon: <Terminal className=\"w-4 h-4\" />, action: () => {} },\n        { id: '3', label: 'Editor', icon: <Code2 className=\"w-4 h-4\" />, action: () => {} },\n        { id: '4', label: 'Notifications', icon: <Bell className=\"w-4 h-4\" />, action: () => {}, badge: 3 },\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/SmallFloatingDock.tsx",
      "type": "registry:ui",
      "target": "components/ui/small-floating-dock.tsx"
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
