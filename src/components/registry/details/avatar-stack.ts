// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "avatar-stack",
  "name": "Avatar Stack",
  "tagline": "Overlapping avatar pile with spring-animated hover elevation and tooltips.",
  "description": "An interactive, stacked facepile of overlapping avatars that smoothly elevates and scales the hovered avatar to the front with spring physics, revealing the full image and name tooltip.",
  "category": "Overlays",
  "badges": [
    "Framer Motion",
    "Interactive",
    "Micro-interactions"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/avatar-stack",
  "installPromptHash": "66a0237b27cc9889f49919a66a85d53325aaf810afeff094591861e332dd3ca4",
  "features": [
    "Dynamic z-index elevation on hover so the hovered avatar is 100% visible and unclipped",
    "Spring-animated scale and lift transition powered by Framer Motion",
    "Floating name tooltip with spring entrance and exit",
    "Automatic initial extraction when images are unavailable or fail to load",
    "Truncation badge (+N) with customizable maximum visible avatars"
  ],
  "props": [
    {
      "name": "avatars",
      "type": "AvatarStackItem[]",
      "default": "[]",
      "description": "Array of avatar objects with id, src, alt, and fallback"
    },
    {
      "name": "max",
      "type": "number",
      "default": "5",
      "description": "Maximum visible avatars before showing the +N counter"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg' | 'xl'",
      "default": "'lg'",
      "description": "Dimension variant for each avatar circle"
    },
    {
      "name": "overlap",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Negative margin overlap amount between adjacent avatars"
    },
    {
      "name": "showCount",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the +N counter badge for overflow items"
    },
    {
      "name": "showTooltip",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show a floating tooltip label on hover"
    }
  ],
  "accessibility": [
    "Uses semantic role=\"group\" container with accessible aria labels for remaining count",
    "Preserves image alt text and falls back to generated initials for screen readers",
    "Hover tooltip uses pointer-events-none to prevent interfering with clicks"
  ],
  "createdAt": "2026-09-16",
  "usageCode": "<AvatarStack\n  size=\"lg\"\n  overlap=\"lg\"\n  avatars={[\n    { id: 1, src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },\n    { id: 2, src: 'https://i.pravatar.cc/150?img=2', alt: 'Sarah Smith' },\n    { id: 3, src: 'https://i.pravatar.cc/150?img=3', alt: 'Mike Johnson' },\n    { id: 4, src: 'https://i.pravatar.cc/150?img=4', alt: 'Emily Davis' },\n    { id: 5, src: 'https://i.pravatar.cc/150?img=5', alt: 'Alex Wilson' },\n    { id: 6, src: 'https://i.pravatar.cc/150?img=6', alt: 'Chris Brown' },\n  ]}\n/>",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/AvatarStack.tsx",
      "type": "registry:ui",
      "target": "components/ui/avatar-stack.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
