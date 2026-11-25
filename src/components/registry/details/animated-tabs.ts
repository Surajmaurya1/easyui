// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "animated-tabs",
  "name": "Animated Tabs",
  "tagline": "Layout-spring sliding active pill indicator",
  "description": "A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.",
  "category": "Navigation",
  "badges": [
    "Layout Springs",
    "Accessible",
    "Keyboard Friendly"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-tabs",
  "installPromptHash": "a035ee2f1dd84bb07292ddb800df729dedbedff42225cf11f6fa1e653c3fc010",
  "features": [
    "Shared layout active pill with spring easing",
    "Independent content animation cross-fade",
    "Badge count support for notifications"
  ],
  "props": [
    {
      "name": "tabs",
      "type": "TabItem[]",
      "default": "[]",
      "description": "Array of tabs with id, label, icon, content"
    },
    {
      "name": "defaultTab",
      "type": "string",
      "default": "tabs[0].id",
      "description": "Initial active tab ID"
    },
    {
      "name": "onChange",
      "type": "(id: string) => void",
      "default": "undefined",
      "description": "Tab change callback"
    }
  ],
  "accessibility": [
    "ARIA tablist, tab, and tabpanel roles",
    "Keyboard arrow navigation"
  ],
  "createdAt": "2026-08-10",
  "usageCode": "import { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/AnimatedTabs.tsx",
      "type": "registry:ui",
      "target": "components/ui/animated-tabs.tsx"
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
