// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "neon-edge-button",
  "name": "Neon Edge Button",
  "tagline": "Precise travelling edge light button",
  "description": "A button with a restrained light source travelling around the border while the label remains primary.",
  "category": "Buttons",
  "badges": [
    "Button",
    "CSS Motion",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/neon-edge-button",
  "installPromptHash": "30011e00b57284c17e86147a74ff5e3746d8ab579ea4412521e7d8e1cccbe58c",
  "features": [
    "Travelling light follows the button perimeter instead of animating border color",
    "Neutral glow keeps the effect aligned with EasyUI surfaces",
    "Still reads as a polished button when motion is disabled"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "default": "'Deploy preview'",
      "description": "Button content"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Multiplier for the edge-light travel speed"
    },
    {
      "name": "glow",
      "type": "boolean",
      "default": "true",
      "description": "Enables the subtle static button glow"
    }
  ],
  "accessibility": [
    "Uses a semantic button and focus-visible ring",
    "Reduced motion stops the travelling light and keeps a static edge highlight"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { NeonEdgeButton } from \"@/components/ui/neon-edge-button\";\n\nexport function Demo() {\n  return <NeonEdgeButton>Deploy preview</NeonEdgeButton>;\n}",
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/NeonEdgeButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/neon-edge-button.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ],
  "featured": true
};

export default component;
