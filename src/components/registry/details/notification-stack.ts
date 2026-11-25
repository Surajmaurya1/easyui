// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "notification-stack",
  "name": "Notification Stack",
  "tagline": "Physics swipe-to-dismiss toast stack",
  "description": "A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.",
  "category": "Feedback",
  "badges": [
    "Drag Physics",
    "Elevation Stacking",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-stack",
  "installPromptHash": "e9b89810f78c02025080b0e8debc1bce7c96e287aa7794847bbb1f7b505f1323",
  "features": [
    "Interactive drag-to-dismiss with spring rebound",
    "Dynamic stacking elevation offset and scale",
    "Expandable history view"
  ],
  "props": [
    {
      "name": "initialNotifications",
      "type": "NotificationItem[]",
      "default": "[]",
      "description": "Initial items"
    },
    {
      "name": "maxVisible",
      "type": "number",
      "default": "3",
      "description": "Max stacked cards in compact view"
    }
  ],
  "accessibility": [
    "Polite aria-live region announcements",
    "Dismiss button with accessible label"
  ],
  "createdAt": "2026-08-04",
  "usageCode": "import { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/NotificationStack.tsx",
      "type": "registry:ui",
      "target": "components/ui/notification-stack.tsx"
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
