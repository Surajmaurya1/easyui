// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "breadcrumb",
  "name": "Breadcrumb",
  "tagline": "Gliding hover pill with animated trail expansion",
  "description": "A navigation trail with a gliding hover pill, smooth expansion for collapsed trails with automatic focus transfer, and light/dark theme adaptation.",
  "category": "Navigation",
  "badges": [
    "Spring Hover",
    "Smart Collapse",
    "Focus Transfer",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/breadcrumb",
  "installPromptHash": "c9e8735564defe440a3e71ae4bc9033f1783249f769cea5ceda417462fcbc6d8",
  "features": [
    "Hover pill smoothly glides between links using Framer Motion layoutId",
    "Long trails collapse the middle items into an ellipsis trigger button",
    "Clicking ellipsis animates hidden crumbs in while focus transfers to the first revealed crumb",
    "Supports chevron or slash separator styles and custom router link components (Next.js Link or <a>)",
    "Full accessibility with aria-label=\"Breadcrumb\", aria-current=\"page\", and keyboard navigation"
  ],
  "props": [
    {
      "name": "items",
      "type": "BreadcrumbItem[]",
      "default": "undefined",
      "description": "Array of breadcrumb items with label, href, and optional icon"
    },
    {
      "name": "separator",
      "type": "'chevron' | 'slash'",
      "default": "'chevron'",
      "description": "Separator style between breadcrumb items"
    },
    {
      "name": "maxItems",
      "type": "number",
      "default": "4",
      "description": "Collapse the middle items when length exceeds this number"
    },
    {
      "name": "as",
      "type": "React.ElementType",
      "default": "'a'",
      "description": "Custom link component (e.g. Next.js Link)"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional CSS classes for the nav container"
    }
  ],
  "accessibility": [
    "Uses semantic <nav aria-label=\"Breadcrumb\"> and <ol> list structure",
    "Marks the current terminal page with aria-current=\"page\"",
    "Focus automatically transfers to the first newly revealed item upon expanding",
    "Full keyboard focus indicators and focus rings for accessibility"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import Link from \"next/link\";\nimport { Home } from \"lucide-react\";\nimport { Breadcrumb } from \"@/components/ui/breadcrumb\";\n\n<Breadcrumb\n  as={Link}\n  items={[\n    { label: \"Home\", href: \"/\", icon: <Home className=\"size-4\" /> },\n    { label: \"Projects\", href: \"/projects\" },\n    { label: \"EasyUI\", href: \"/projects/easyui\" },\n    { label: \"Components\", href: \"/projects/easyui/components\" },\n    { label: \"Breadcrumb\" }, // Current page (no href needed)\n  ]}\n/>",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/breadcrumb.tsx",
      "type": "registry:ui",
      "target": "components/ui/breadcrumb.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
