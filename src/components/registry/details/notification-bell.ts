// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "notification-bell",
  "name": "Notification Bell",
  "tagline": "Adaptive notification badge & animated alert drawer",
  "description": "An interactive notification trigger with animated badge counter, arrival shake feedback, and dropdown panel.",
  "category": "Feedback",
  "badges": [
    "Framer Motion",
    "Spring Physics",
    "Feedback",
    "Overlays"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-bell",
  "installPromptHash": "64ef049681d729837a1f8011eeefb9a7d7f29e75b754db80f4bd4ba6a4c09436",
  "features": [
    "Subtle rotational bell shake when new unread notifications arrive",
    "Spring-animated counter badge with overflow truncation (99+)",
    "Floating backdrop-blur panel with individual mark-as-read and mark-all-read controls",
    "Click-outside dismissal and accessible keyboard escape handling"
  ],
  "props": [
    {
      "name": "notifications",
      "type": "Notification[]",
      "description": "Array of notification objects (id, message, timestamp, read)"
    },
    {
      "name": "onMarkAsRead",
      "type": "(id: string) => void",
      "description": "Handler fired when an individual notification is marked read"
    },
    {
      "name": "onMarkAllAsRead",
      "type": "() => void",
      "default": "undefined",
      "description": "Handler to clear all active badges"
    },
    {
      "name": "isOpen",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled open state of notification drawer"
    },
    {
      "name": "onOpenChange",
      "type": "(isOpen: boolean) => void",
      "default": "undefined",
      "description": "Callback on panel open/close"
    },
    {
      "name": "showCount",
      "type": "boolean",
      "default": "true",
      "description": "Displays numeric badge instead of minimal red dot"
    }
  ],
  "accessibility": [
    "Dynamic aria-expanded and descriptive aria-label with unread count",
    "Full keyboard navigation with Tab, Enter, and Escape shortcuts",
    "Contrast compliant with WCAG AA standards"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { useState } from \"react\";\nimport { NotificationBell } from \"@/components/ui/notification-bell\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', message: 'Edge build deployment finished in 38s.', timestamp: 'Just now', read: false },\n    { id: '2', message: 'New API token generated for production.', timestamp: '12m ago', read: false },\n  ]);\n\n  const handleMarkRead = (id: string) => {\n    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));\n  };\n\n  return (\n    <NotificationBell\n      notifications={items}\n      onMarkAsRead={handleMarkRead}\n      onMarkAllAsRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/NotificationBell.tsx",
      "type": "registry:ui",
      "target": "components/ui/notification-bell.tsx"
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
