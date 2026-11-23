// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "hamburger-menu",
  "name": "Hamburger Menu",
  "tagline": "Architectural line morphing & symmetrical spring motion",
  "description": "An iconic three-line menu toggle that transforms smoothly into a symmetrical close symbol.",
  "category": "Navigation",
  "badges": [
    "Framer Motion",
    "Spring Physics",
    "Micro-interaction",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/hamburger-menu",
  "installPromptHash": "c5f2ac0d385cae89ffa8376d129f2d17b56cdc63e791d4869110becb1144f567",
  "features": [
    "Symmetric line rotation and middle line dissolution with zero layout shift",
    "Customizable size, stroke thickness, and color tokens",
    "Keyboard accessible with Space and Enter triggers and Escape close support",
    "Integrated aria-expanded and dynamic aria-label status updates"
  ],
  "props": [
    {
      "name": "isOpen",
      "type": "boolean",
      "description": "Active open/closed toggle state"
    },
    {
      "name": "onChange",
      "type": "(isOpen: boolean) => void",
      "description": "Callback fired on user interaction"
    },
    {
      "name": "size",
      "type": "number",
      "default": "24",
      "description": "Width and height of the icon bounding box in pixels"
    },
    {
      "name": "color",
      "type": "string",
      "default": "'currentColor'",
      "description": "Color of the SVG/CSS line strokes"
    },
    {
      "name": "label",
      "type": "string",
      "default": "'Menu'",
      "description": "Accessible name announced to assistive tech"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables button interactions"
    }
  ],
  "accessibility": [
    "Proper <button> element with type=\"button\"",
    "Dynamic aria-expanded=\"true|false\" and aria-label updates",
    "Visible focus-visible ring for full keyboard accessibility"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { useState } from \"react\";\nimport { HamburgerMenu } from \"@/components/ui/hamburger-menu\";\n\nexport function Demo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <HamburgerMenu\n      isOpen={isOpen}\n      onChange={setIsOpen}\n      size={24}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/HamburgerMenu.tsx",
      "type": "registry:ui",
      "target": "components/ui/hamburger-menu.tsx"
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
