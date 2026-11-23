// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "button",
  "name": "Button",
  "tagline": "Multi-variant button system with tactile physics",
  "description": "A versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.",
  "category": "Buttons",
  "badges": [
    "Multi-variant",
    "Spring Tap",
    "Micro-interactions",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/button",
  "installPromptHash": "4a7def903cd3c9c20f9ee9831e5a7f52268e8d3f88ef6410dae250e855e985e4",
  "features": [
    "8 visual variants: Primary, Secondary, Outline, Ghost, Destructive, Success, Link, Gradient",
    "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
    "Spring tap micro-interaction (whileTap 0.97) via Framer Motion",
    "Accessible loading state with integrated monochrome spinner & aria-busy",
    "Left and right icon slots with automatic sizing and gap alignment",
    "Full width layout support (fullWidth)",
    "Strictly adheres to EasyUI monochrome dark palette and sky focus ring"
  ],
  "props": [
    {
      "name": "variant",
      "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'",
      "default": "'primary'",
      "description": "Visual presentation style"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg' | 'icon'",
      "default": "'md'",
      "description": "Dimensions and typography scale"
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "default": "false",
      "description": "Displays an animated spinner and disables user interaction"
    },
    {
      "name": "loadingText",
      "type": "string",
      "default": "undefined",
      "description": "Optional text displayed alongside the loading spinner"
    },
    {
      "name": "leftIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Icon element placed before children"
    },
    {
      "name": "rightIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Icon element placed after children"
    },
    {
      "name": "fullWidth",
      "type": "boolean",
      "default": "false",
      "description": "Stretches button to 100% width of parent container"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Prevents interaction and applies 30% disabled opacity"
    }
  ],
  "accessibility": [
    "Native <button> semantics with explicit type=\"button\" default",
    "Standard focus-ring outline with Sky-400 accent on keyboard :focus-visible",
    "Proper aria-busy and disabled accessibility states",
    "Respects prefers-reduced-motion media query"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { Button } from \"@/components/ui/button\";\nimport { Sparkles, ArrowRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\" leftIcon={<Sparkles className=\"w-4 h-4\" />}>\n        Get Started\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/Button.tsx",
      "type": "registry:ui",
      "target": "components/ui/button.tsx"
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
