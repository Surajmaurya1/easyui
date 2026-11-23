// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "skeleton",
  "name": "Skeleton",
  "tagline": "Subtle shimmer sweep and smooth content reveal",
  "description": "Placeholder blocks with a subtle light sweep, text/avatar presets, and a SkeletonReveal container that eases real content in with a gentle rise and un-blur.",
  "category": "Feedback",
  "badges": [
    "Light Sweep",
    "Content Reveal",
    "Avatar & Text",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/skeleton",
  "installPromptHash": "b1b633a6402bd1d54f8bf9a0a6b71a4022059294e732987822968ef3d3e35d9f",
  "features": [
    "Quiet shimmer blocks with smooth gradient light sweep animation",
    "SkeletonReveal transitions seamlessly to live content using fade, subtle rise, and un-blur",
    "Convenient SkeletonText preset with natural staggered line length distribution",
    "SkeletonAvatar preset for profile pictures and user thumbnails",
    "Clean reduced-motion fallback that disables continuous sweeping"
  ],
  "props": [
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "CSS classes to size and position the skeleton block"
    },
    {
      "name": "lines",
      "type": "number",
      "default": "3",
      "description": "Number of lines for the SkeletonText component"
    },
    {
      "name": "size",
      "type": "number",
      "default": "40",
      "description": "Pixel size for the circular SkeletonAvatar component"
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "undefined",
      "description": "Active loading state for the SkeletonReveal wrapper"
    },
    {
      "name": "skeleton",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Placeholder element rendered while loading is true"
    }
  ],
  "accessibility": [
    "Applies aria-hidden to placeholder skeletons to avoid cluttering screen readers",
    "SkeletonReveal uses role=\"status\" and aria-busy=\"true\" during loading",
    "Respects prefers-reduced-motion without disorienting fast flashing"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonReveal } from \"@/components/ui/skeleton\";\n\n<SkeletonReveal\n  loading={isLoading}\n  skeleton={\n    <div className=\"flex gap-3\">\n      <SkeletonAvatar size={40} />\n      <div className=\"flex-1 space-y-2\">\n        <Skeleton className=\"h-4 w-1/3\" />\n        <SkeletonText lines={2} />\n      </div>\n    </div>\n  }\n>\n  <UserCard user={user} />\n</SkeletonReveal>",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/skeleton.tsx",
      "type": "registry:ui",
      "target": "components/ui/skeleton.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
