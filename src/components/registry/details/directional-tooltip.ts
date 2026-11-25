// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "directional-tooltip",
  "name": "DirectionalTooltip",
  "tagline": "Appears from its origin direction",
  "description": "A tooltip that appears from the direction it originates — it starts a small distance outside the trigger in its preferred direction and springs inward, so it feels like it materializes from the trigger.",
  "category": "Overlays",
  "badges": [
    "Directional",
    "Spring In",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/directional-tooltip",
  "installPromptHash": "c767defd2db15fdae427ef5e2a6101e4750a49038f65a78835e132a9df98aff1",
  "features": [
    "Entry motion originates from the chosen side (top/right/bottom/left)",
    "Snappy spring (springSnappy) settles the tooltip into place",
    "Alignment per side: start / center / end",
    "Configurable delay, offset, and optional arrow indicator",
    "Light/dark theme aware via CSS variables"
  ],
  "props": [
    {
      "name": "content",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Tooltip body content"
    },
    {
      "name": "side",
      "type": "'top' | 'right' | 'bottom' | 'left'",
      "default": "'top'",
      "description": "Preferred side for the tooltip"
    },
    {
      "name": "align",
      "type": "'start' | 'center' | 'end'",
      "default": "'center'",
      "description": "Alignment along the chosen side"
    },
    {
      "name": "delayDuration",
      "type": "number",
      "default": "150",
      "description": "Delay before showing, in ms"
    },
    {
      "name": "showArrow",
      "type": "boolean",
      "default": "true",
      "description": "Show the arrow indicator"
    },
    {
      "name": "offset",
      "type": "number",
      "default": "8",
      "description": "Spacing from the trigger in px"
    },
    {
      "name": "forceOpen",
      "type": "boolean",
      "default": "false",
      "description": "Force the tooltip open (for previews)"
    }
  ],
  "accessibility": [
    "role=\"tooltip\" with aria-describedby on the trigger when open",
    "Hover and focus both show the tooltip; blur / mouseleave hide it",
    "Configurable delay so accidental hovers do not flood the UI"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { DirectionalTooltip } from \"@/components/ui/directional-tooltip\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-4\">\n      <DirectionalTooltip content=\"Save your changes\" side=\"top\">\n        <PressButton>Save</PressButton>\n      </DirectionalTooltip>\n      <DirectionalTooltip content=\"Open command palette ⌘K\" side=\"bottom\" align=\"end\">\n        <PressButton variant=\"secondary\">Search</PressButton>\n      </DirectionalTooltip>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/DirectionalTooltip.tsx",
      "type": "registry:ui",
      "target": "components/ui/directional-tooltip.tsx"
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
