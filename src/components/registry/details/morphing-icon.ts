// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "morphing-icon",
  "name": "Morphing Icon",
  "tagline": "Smooth cross-fade rotation morphing between two icons or states.",
  "description": "An animated micro-interaction wrapper that smoothly morphs between two icon states with coordinated rotation, scale, and cross-fade transitions.",
  "category": "Motion",
  "badges": [
    "Framer Motion",
    "Micro-interactions",
    "Icon Transition"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-icon",
  "installPromptHash": "4d17b113733257f09bbfb321ac0feb793839accb3e2502d02b2a0b6e1ebaca88",
  "features": [
    "Coordinated rotation, scaling, and opacity cross-fade for fluid icon transformations",
    "Supports any icon component (Lucide, Radix, custom SVGs)",
    "Zero layout shift with absolute positioning within a fixed-size container",
    "Configurable duration and cubic-bezier easing curve"
  ],
  "props": [
    {
      "name": "from",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Default icon element shown when inactive"
    },
    {
      "name": "to",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Target icon element shown when active"
    },
    {
      "name": "active",
      "type": "boolean",
      "default": "false",
      "description": "Whether the target icon state is currently active"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "0.3",
      "description": "Duration of the morph transition in seconds"
    },
    {
      "name": "size",
      "type": "number",
      "default": "20",
      "description": "Width and height of the icon container in pixels"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional CSS class for styling the container"
    }
  ],
  "accessibility": [
    "Toggles aria-hidden on inactive states to prevent duplicate announcement by screen readers",
    "Preserves static container dimensions during rotation to prevent surrounding layout shifts"
  ],
  "createdAt": "2026-09-16",
  "usageCode": "<button\n  onClick={() => setIsBookmarked((prev) => !prev)}\n  className=\"p-2 rounded-xl bg-surface-raised border border-border hover:bg-surface-hover transition-colors\"\n  aria-label={isBookmarked ? \"Remove bookmark\" : \"Save bookmark\"}\n>\n  <MorphingIcon\n    active={isBookmarked}\n    from={<Bookmark className=\"w-5 h-5 text-text-secondary\" />}\n    to={<BookmarkCheck className=\"w-5 h-5 text-emerald-400\" />}\n    size={20}\n  />\n</button>",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/MorphingIcon.tsx",
      "type": "registry:ui",
      "target": "components/ui/morphing-icon.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
