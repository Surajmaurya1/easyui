// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "rainbow-button",
  "name": "Rainbow Button",
  "tagline": "Vibrant chromatic rainbow border button with animated glowing under-reflection",
  "description": "A vibrant button featuring an animated chromatic rainbow gradient border, dynamic 3D surface reflections, and an ambient blurred rainbow underglow.",
  "category": "Motion",
  "badges": [
    "Button",
    "Gradient",
    "Interactive",
    "New"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/rainbow-button",
  "installPromptHash": "fb4be4d343532addaa5feb5124ef58cbcb8ea499ab9f13c3f6b35d7f67e72fa9",
  "features": [
    "Continuous seamless multi-stop chromatic rainbow border animation",
    "Ambient blurred rainbow underglow shadow reflecting beneath the button surface",
    "Customizable chromatic color variables (color1 through color5) with vivid defaults",
    "Zero external library requirements: native CSS animation and self-contained Slot component for asChild support",
    "Variants: default and outline, with sizes: default, sm, lg, and icon",
    "Fully accessible: keyboard focus ring, aria attributes pass-through, and prefers-reduced-motion support"
  ],
  "props": [
    {
      "name": "variant",
      "type": "'default' | 'outline'",
      "default": "'default'",
      "description": "Visual presentation style of the button surface"
    },
    {
      "name": "size",
      "type": "'default' | 'sm' | 'lg' | 'icon'",
      "default": "'default'",
      "description": "Button dimension scale and padding"
    },
    {
      "name": "asChild",
      "type": "boolean",
      "default": "false",
      "description": "Render as child component (e.g. Next.js Link or a tag) passing through props and styles"
    },
    {
      "name": "glow",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the ambient blurred rainbow glow drop-shadow beneath the button"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "3",
      "description": "Rainbow animation cycle duration in seconds"
    },
    {
      "name": "color1",
      "type": "string",
      "default": "'hsl(0 100% 63%)'",
      "description": "First chromatic gradient stop (red/pink)"
    },
    {
      "name": "color2",
      "type": "string",
      "default": "'hsl(270 100% 63%)'",
      "description": "Second chromatic gradient stop (purple)"
    },
    {
      "name": "color3",
      "type": "string",
      "default": "'hsl(210 100% 63%)'",
      "description": "Third chromatic gradient stop (blue)"
    },
    {
      "name": "color4",
      "type": "string",
      "default": "'hsl(195 100% 63%)'",
      "description": "Fourth chromatic gradient stop (cyan)"
    },
    {
      "name": "color5",
      "type": "string",
      "default": "'hsl(90 100% 63%)'",
      "description": "Fifth chromatic gradient stop (green)"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS classes"
    }
  ],
  "accessibility": [
    "Full keyboard focus state with visible focus-visible ring",
    "Supports standard button and anchor keyboard activation (Enter / Space)",
    "prefers-reduced-motion halts the infinite background animation automatically"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { RainbowButton } from \"@/components/ui/rainbow-button\";\n\nexport function RainbowButtonDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-4 p-8\">\n      <RainbowButton>\n        Get Unlimited Access\n      </RainbowButton>\n\n      <RainbowButton variant=\"outline\" size=\"sm\">\n        Explore Features\n      </RainbowButton>\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/RainbowButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/rainbow-button.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
