// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "butterfly",
  "name": "Butterfly",
  "tagline": "Half line-art, half live ASCII butterfly with natural wing physics",
  "description": "A split-medium butterfly with fine SVG line-art wings on one side and live frame-rasterized ASCII character wings on the other, driven by a natural flap, glide, and perch flight cycle.",
  "category": "Motion",
  "badges": [
    "SVG",
    "ASCII",
    "Reduced Motion",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/butterfly",
  "installPromptHash": "4c93178d012690bd6bf9cdaa4eb3612ed7e0812f5f972346bf998f87885f4a63",
  "features": [
    "Vector line-art and live-rasterized ASCII wings computed from the same Catmull-Rom wing geometry",
    "Natural flight state machine alternating between flapping bursts, open glides, and slow perches",
    "Asymmetric wing-beat waveform with trailing hindwings, body bob, drift, and swaying antennae",
    "Interactive hover or tap startle response that triggers an excited flutter",
    "Supports split, all-lines, and all-ASCII variants with light and dark gradient defaults",
    "Automatically pauses off-screen and in background tabs, and honors prefers-reduced-motion"
  ],
  "props": [
    {
      "name": "variant",
      "type": "\"split\" | \"lines\" | \"ascii\"",
      "default": "\"split\"",
      "description": "Render mode combining line-art and ASCII, all vector lines, or all ASCII text"
    },
    {
      "name": "asciiSide",
      "type": "\"right\" | \"left\"",
      "default": "\"right\"",
      "description": "Which side renders as ASCII characters when variant is \"split\""
    },
    {
      "name": "behavior",
      "type": "\"natural\" | \"flap\" | \"glide\" | \"perch\"",
      "default": "\"natural\"",
      "description": "Flight mode: cycles naturally or locks to flap, glide, or perch"
    },
    {
      "name": "size",
      "type": "number",
      "default": "380",
      "description": "Maximum width in pixels; shrinks smoothly to fit its container"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Wing-beat and flight speed multiplier"
    },
    {
      "name": "float",
      "type": "boolean",
      "default": "true",
      "description": "Enables gentle ambient drift and tilt motion"
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Pauses the animation loop while keeping the current frame"
    },
    {
      "name": "colors",
      "type": "[string, string, string?]",
      "default": "undefined",
      "description": "Up to three CSS colors for the line and text gradient"
    },
    {
      "name": "interactive",
      "type": "boolean",
      "default": "true",
      "description": "Hovering or tapping startles the butterfly into a brief flutter"
    },
    {
      "name": "ariaLabel",
      "type": "string",
      "default": "\"A butterfly slowly beating its wings\"",
      "description": "Accessible label for the butterfly visual"
    },
    {
      "name": "className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS classes merged into the outer container"
    }
  ],
  "accessibility": [
    "Container exposes role=\"img\" with a customizable ariaLabel",
    "Decorative SVG and ASCII <pre> layers are marked aria-hidden",
    "Honors prefers-reduced-motion by rendering a calm static resting pose",
    "Uses IntersectionObserver and visibilitychange to pause rendering off-screen or in hidden tabs"
  ],
  "createdAt": "2026-11-26",
  "usageCode": "import { Butterfly } from \"@/components/ui/Butterfly\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-col items-center gap-4\">\n      <Butterfly variant=\"split\" behavior=\"natural\" size={380} />\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/Butterfly.tsx",
      "type": "registry:ui",
      "target": "components/ui/butterfly.tsx"
    }
  ]
};

export default component;
