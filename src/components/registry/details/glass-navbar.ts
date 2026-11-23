// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "glass-navbar",
  "name": "Glass Navbar",
  "tagline": "Refined glass navigation with spring physics",
  "description": "A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.",
  "category": "Navigation",
  "badges": [
    "Glassmorphism",
    "Responsive",
    "Spring Physics",
    "Tailwind"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glass-navbar",
  "installPromptHash": "f3346225ad43a81685785afc22b84c5343a10674f8b7130420792627264bc0a2",
  "features": [
    "Subtle glassmorphic blur backdrop (bg-[#050505]/85 backdrop-blur-md)",
    "Dual layout modes: Floating pill or full-width sticky bar",
    "Shared layout spring animations for hover spotlight & active indicators",
    "Responsive mobile menu drawer with smooth Framer Motion spring transition",
    "Customizable brand logo, navigation items, badges, and CTA action slot",
    "Full keyboard navigation, Escape key dismiss, and aria-expanded accessibility"
  ],
  "props": [
    {
      "name": "brand",
      "type": "React.ReactNode",
      "default": "<EasyUILogo />",
      "description": "Brand / Logo element or text component"
    },
    {
      "name": "brandHref",
      "type": "string",
      "default": "'/'",
      "description": "Root link destination for the brand logo"
    },
    {
      "name": "items",
      "type": "NavItem[]",
      "default": "Default items array",
      "description": "Array of navigation links with label, href, badge, icon"
    },
    {
      "name": "cta",
      "type": "React.ReactNode",
      "default": "<GetStartedButton />",
      "description": "Right-hand side action slot / CTA button"
    },
    {
      "name": "activeId",
      "type": "string",
      "default": "undefined",
      "description": "Explicit active item identifier or label"
    },
    {
      "name": "variant",
      "type": "'floating' | 'full-width'",
      "default": "'floating'",
      "description": "Visual style layout structure"
    },
    {
      "name": "sticky",
      "type": "boolean",
      "default": "true",
      "description": "Pins the navigation bar to the top of the viewport"
    },
    {
      "name": "glass",
      "type": "boolean",
      "default": "true",
      "description": "Enables backdrop-blur glassmorphism background"
    },
    {
      "name": "onItemSelect",
      "type": "(item: NavItem) => void",
      "default": "undefined",
      "description": "Callback fired when any nav item is selected"
    }
  ],
  "accessibility": [
    "Semantic <header> and <nav> elements with aria-label=\"Main Navigation\"",
    "Keyboard focusable with restrained cyan focus-ring on :focus-visible",
    "Escape key dismisses the mobile navigation drawer",
    "aria-expanded and aria-current attributes on interactive items"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { GlassNavbar } from \"@/components/ui/glass-navbar\";\nimport { Sparkles } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <GlassNavbar\n      items={[\n        { label: \"Overview\", href: \"#overview\" },\n        { label: \"Components\", href: \"#components\", badge: \"20+\" },\n        { label: \"Pricing\", href: \"#pricing\" },\n      ]}\n      cta={\n        <button className=\"px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors\">\n          Get Started\n        </button>\n      }\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/GlassNavbar.tsx",
      "type": "registry:ui",
      "target": "components/ui/glass-navbar.tsx"
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
