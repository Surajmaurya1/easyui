// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "origin-dropdown",
  "name": "OriginDropdown",
  "tagline": "Origin-aware expansion",
  "description": "A dropdown with origin-aware expansion — the menu materializes from the chosen side with a slight scale and an inward translation, so its perceived origin is the trigger edge closest to the menu.",
  "category": "Overlays",
  "badges": [
    "Origin-Aware",
    "Spring In",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/origin-dropdown",
  "installPromptHash": "838e3ddfa803e46ecf80c5cd4d800987b9a9d4d3e159c1fb3b9e77fb9cc51e71",
  "features": [
    "Menu expansion originates from one of four sides (top/right/bottom/left)",
    "Snappy spring (springSnappy) with origin-based transform-origin per side",
    "Optional items array with icon, description, and destructive variants",
    "Chevron rotates 180° on open; Escape and outside-click close",
    "Light/dark theme aware via CSS variables"
  ],
  "props": [
    {
      "name": "trigger",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Custom trigger content"
    },
    {
      "name": "items",
      "type": "OriginDropdownItem[]",
      "default": "undefined",
      "description": "Menu items (alternative to children)"
    },
    {
      "name": "children",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Custom menu content"
    },
    {
      "name": "side",
      "type": "'top' | 'right' | 'bottom' | 'left'",
      "default": "'bottom'",
      "description": "Side the menu opens from"
    },
    {
      "name": "open",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled open state"
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "default": "false",
      "description": "Initial open state"
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "default": "undefined",
      "description": "Open state change callback"
    }
  ],
  "accessibility": [
    "aria-haspopup / aria-expanded / role=\"menu\" / role=\"menuitem\" wired correctly",
    "Escape and outside-click dismiss the menu",
    "Disabled items skip the onSelect handler and have proper ARIA"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { OriginDropdown } from \"@/components/ui/origin-dropdown\";\nimport { Settings, LogOut, User } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-3\">\n      <OriginDropdown\n        trigger=\"Account\"\n        side=\"bottom\"\n        items={[\n          { id: \"profile\", label: \"Profile\", description: \"Account settings\", icon: <User className=\"w-3.5 h-3.5\" /> },\n          { id: \"settings\", label: \"Preferences\", description: \"Theme, motion, layout\", icon: <Settings className=\"w-3.5 h-3.5\" /> },\n          { id: \"signout\", label: \"Sign out\", destructive: true, icon: <LogOut className=\"w-3.5 h-3.5\" /> },\n        ]}\n      />\n      <OriginDropdown\n        trigger=\"Origin top\"\n        side=\"top\"\n        items={[\n          { id: \"a\", label: \"Option A\" },\n          { id: \"b\", label: \"Option B\" },\n        ]}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/OriginDropdown.tsx",
      "type": "registry:ui",
      "target": "components/ui/origin-dropdown.tsx"
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
