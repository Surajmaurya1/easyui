// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "sidebar",
  "name": "Sidebar",
  "tagline": "Cursor-following hover pill & gliding active indicator",
  "description": "A collapsible application sidebar with a hover pill that follows the cursor and a shared-layout active pill that glides between items. Includes nested sections, icon-only mode with tooltips, ⌘B toggle, and a draggable mobile drawer.",
  "category": "Navigation",
  "badges": [
    "Layout Springs",
    "Keyboard Friendly",
    "Light & Dark",
    "Mobile Drawer"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sidebar",
  "installPromptHash": "c56f1c838e1ba3c9ad3c3b680f40566c05e5c208167bf9cb562c4bea9645ac79",
  "features": [
    "Hover pill tracks the cursor; active pill glides between items with a shared layout spring",
    "Nested items with animated expand/collapse and active dot indicator",
    "Icon-only collapse mode with floating tooltips, toggled via ⌘B / Ctrl+B",
    "Mobile drawer under md with drag-to-dismiss and backdrop blur",
    "Header and footer slots adapt to the collapsed state via useSidebar()"
  ],
  "props": [
    {
      "name": "sections",
      "type": "SidebarSection[]",
      "default": "undefined",
      "description": "Navigation sections with items, optional titles, badges, and nested children"
    },
    {
      "name": "activeId",
      "type": "string",
      "default": "undefined",
      "description": "ID of the active item"
    },
    {
      "name": "onActiveChange",
      "type": "(id: string) => void",
      "default": "undefined",
      "description": "Called when an item or child is selected"
    },
    {
      "name": "header",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Brand/header slot (use useSidebar() to adapt when collapsed)"
    },
    {
      "name": "footer",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Footer slot above the collapse toggle"
    },
    {
      "name": "collapsed",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled collapsed (icon-only) state"
    },
    {
      "name": "defaultCollapsed",
      "type": "boolean",
      "default": "false",
      "description": "Initial collapsed state (uncontrolled)"
    },
    {
      "name": "onCollapsedChange",
      "type": "(collapsed: boolean) => void",
      "default": "undefined",
      "description": "Collapse state change callback"
    },
    {
      "name": "mobileOpen",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled mobile drawer open state"
    },
    {
      "name": "onMobileOpenChange",
      "type": "(open: boolean) => void",
      "default": "undefined",
      "description": "Mobile drawer open state callback"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional class for the aside"
    }
  ],
  "accessibility": [
    "aria-current=\"page\" on active items, aria-expanded on parents, aria-label in icon-only mode",
    "Full keyboard support: Tab focusable items, ⌘B / Ctrl+B toggle, Esc closes the mobile drawer",
    "Mobile drawer uses role=\"dialog\" with aria-modal and backdrop click to close"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import * as React from \"react\";\nimport { Bell, Folder, Home, Inbox, Settings, Users } from \"lucide-react\";\nimport { Sidebar, SidebarTrigger, useSidebar, type SidebarSection } from \"@/components/ui/sidebar\";\n\nconst sections: SidebarSection[] = [\n  {\n    items: [\n      { id: \"home\", label: \"Home\", icon: <Home /> },\n      { id: \"inbox\", label: \"Inbox\", icon: <Inbox />, badge: 4 },\n    ],\n  },\n  {\n    title: \"Workspace\",\n    items: [\n      {\n        id: \"projects\",\n        label: \"Projects\",\n        icon: <Folder />,\n        children: [\n          { id: \"active\", label: \"Active\", badge: 12 },\n          { id: \"archived\", label: \"Archived\" },\n        ],\n      },\n      { id: \"team\", label: \"Team\", icon: <Users /> },\n      { id: \"alerts\", label: \"Alerts\", icon: <Bell /> },\n      { id: \"settings\", label: \"Settings\", icon: <Settings /> },\n    ],\n  },\n];\n\nexport default function Page() {\n  const [active, setActive] = React.useState(\"home\");\n\n  return (\n    <div className=\"flex h-screen\">\n      <Sidebar sections={sections} activeId={active} onActiveChange={setActive} />\n      <main className=\"flex-1 p-4\">\n        <SidebarTrigger />\n      </main>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/sidebar.tsx",
      "type": "registry:ui",
      "target": "components/ui/sidebar.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
