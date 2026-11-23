// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "liquid-ripple-button",
  "name": "Liquid Ripple Button",
  "tagline": "Pointer-origin liquid press feedback",
  "description": "A tactile button whose pointer-origin ripple and subtle wave layer make press feedback feel fluid.",
  "category": "Buttons",
  "badges": [
    "Button",
    "Pointer Feedback",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-ripple-button",
  "installPromptHash": "c108dfcc3bec3932b2ff184d9e9d8354bab9b6c975009c36e8a259e514639c83",
  "features": [
    "Ripple originates from the actual press point",
    "Slow secondary wave remains below the label and icon",
    "Primary and secondary variants match EasyUI button surfaces"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "default": "'Run interaction'",
      "description": "Button content"
    },
    {
      "name": "variant",
      "type": "'primary' | 'secondary'",
      "default": "'primary'",
      "description": "Visual style variant"
    }
  ],
  "accessibility": [
    "Uses a semantic button and preserves native keyboard activation",
    "Reduced motion removes ripple and wave animation while retaining press state"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { LiquidRippleButton } from \"@/components/ui/liquid-ripple-button\";\n\nexport function Demo() {\n  return <LiquidRippleButton variant=\"secondary\">Generate preview</LiquidRippleButton>;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/LiquidRippleButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/liquid-ripple-button.tsx"
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
