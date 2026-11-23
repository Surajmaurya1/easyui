// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "morphing-blob",
  "name": "Morphing Blob",
  "tagline": "Fluid spring-physics blob with cursor interaction",
  "description": "An ambient, accessible SVG blob background that continuously morphs with spring physics and subtly follows the cursor for a fluid, interactive visual effect.",
  "category": "Motion",
  "badges": [
    "Motion",
    "SVG",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-blob",
  "installPromptHash": "b1076b7d5aee123e6a36db8a9377b3f63d0ca32f9ae5490bf70f96357758b90b",
  "features": [
    "Spring-physics anchor points with Catmull-Rom smoothing for a fluid, organic shape",
    "Smooth cursor-follow interaction with configurable strength and responsiveness",
    "Imperative per-frame path updates for smooth animation without unnecessary React re-renders",
    "Independently configurable SVG width and height",
    "Customizable point count, radius, variance, speed, stiffness, and damping",
    "Configurable gradient start and end colors",
    "Automatically respects the prefers-reduced-motion accessibility preference",
    "Pointer-events disabled by default so the decorative blob never blocks foreground interactions"
  ],
  "props": [
    {
      "name": "width",
      "type": "number",
      "default": "400",
      "description": "Width of the SVG viewport in pixels"
    },
    {
      "name": "height",
      "type": "number",
      "default": "400",
      "description": "Height of the SVG viewport in pixels"
    },
    {
      "name": "points",
      "type": "number",
      "default": "8",
      "description": "Number of anchor points used to construct the blob shape"
    },
    {
      "name": "baseRadius",
      "type": "number",
      "default": "120",
      "description": "Resting radius of the blob in pixels"
    },
    {
      "name": "variance",
      "type": "number",
      "default": "28",
      "description": "Maximum radius variation applied to each anchor point during morphing"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "0.7",
      "description": "Controls how frequently new random morph targets are generated"
    },
    {
      "name": "stiffness",
      "type": "number",
      "default": "45",
      "description": "Spring stiffness controlling how strongly anchor points move toward their targets"
    },
    {
      "name": "damping",
      "type": "number",
      "default": "9",
      "description": "Spring damping controlling the resistance and smoothness of the blob motion"
    },
    {
      "name": "cursorFollow",
      "type": "boolean",
      "default": "true",
      "description": "Enables or disables cursor-follow interaction"
    },
    {
      "name": "cursorStrength",
      "type": "number",
      "default": "0.35",
      "description": "Controls how strongly the blob moves toward the cursor position"
    },
    {
      "name": "cursorSmoothness",
      "type": "number",
      "default": "0.08",
      "description": "Controls how smoothly the blob catches up to the cursor; lower values create more fluid trailing motion"
    },
    {
      "name": "colors",
      "type": "[string, string]",
      "default": "['#7C3AED', '#06B6D4']",
      "description": "Two colors used for the blob gradient, from start to end"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional CSS classes for positioning, sizing, opacity, layering, and other styling"
    }
  ],
  "accessibility": [
    "Respects the prefers-reduced-motion media query by freezing the blob in its static resting shape",
    "Uses aria-hidden=\"true\" because the blob is purely decorative",
    "Uses role=\"presentation\" to communicate that the SVG has no meaningful semantic content",
    "Uses pointer-events-none so the decorative element never intercepts clicks, hover, or other pointer interactions"
  ],
  "createdAt": "2026-09-09T12:15:29.957Z",
  "usageCode": "import { MorphingBlob } from \"@/components/ui/morphing-blob\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative h-96 w-full overflow-hidden rounded-2xl bg-[#0E0E0E]\">\n      <MorphingBlob\n        width={600}\n        height={400}\n        cursorFollow\n        cursorStrength={0.35}\n        cursorSmoothness={0.08}\n        colors={['#7C3AED', '#06B6D4']}\n        className=\"absolute -top-20 -left-20 opacity-70\"\n      />\n\n      <div className=\"relative z-10 p-8 text-white\">\n        Content sits above the blob.\n      </div>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/MorphingBlob.tsx",
      "type": "registry:ui",
      "target": "components/ui/morphing-blob.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
