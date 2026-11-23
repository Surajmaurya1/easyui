// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "magnetic-button",
  "name": "Magnetic Button",
  "tagline": "Cursor-aware spring translation physics",
  "description": "A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.",
  "category": "Buttons",
  "badges": [
    "Spring Physics",
    "Micro-interaction",
    "Tailwind"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/magnetic-button",
  "installPromptHash": "ec8edfc336c5efb2802d65a24d6d3b5d490062d7adf6008d12a1d7bf0ce8804a",
  "features": [
    "Spring physics coordinate tracking via Framer Motion",
    "Configurable pull strength and threshold",
    "Subtle ambient glow gradient reflection",
    "Four restrained surface styles: Primary, Secondary, Outline, Ghost"
  ],
  "props": [
    {
      "name": "strength",
      "type": "number",
      "default": "0.35",
      "description": "Cursor pull distance multiplier"
    },
    {
      "name": "variant",
      "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
      "default": "'primary'",
      "description": "Visual surface presentation"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Button dimensions and typography"
    },
    {
      "name": "glow",
      "type": "boolean",
      "default": "true",
      "description": "Enable subtle background glow on hover"
    }
  ],
  "accessibility": [
    "Focus visible ring with restrained cyan accent",
    "Standard native button semantics & keyboard Enter/Space activation",
    "Respects prefers-reduced-motion media query"
  ],
  "createdAt": "2026-08-18",
  "usageCode": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/MagneticButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/magnetic-button.tsx"
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
