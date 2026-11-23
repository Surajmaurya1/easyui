// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "scrollvelocitytext",
  "name": "Scroll Velocity Text",
  "tagline": "Direction-aware kinetic text that expands and contracts with scroll",
  "description": "A direction-aware kinetic typography component that smoothly expands letter-spacing and scale on downward scroll, and winds back on upward scroll, with zero per-frame React re-renders.",
  "category": "Motion",
  "badges": [
    "Kinetic Typography",
    "Scroll Driven",
    "Accessibility",
    "Zero Overhead"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scrollvelocitytext",
  "installPromptHash": "8868c2fec0aeae6bca1796702ebb1cc2e0514c7f16162704a6538b9ee6b1f18e",
  "features": [
    "Direction-aware scroll physics: expands on downward scroll, winds back on upward scroll, and holds position on idle",
    "Zero per-frame React re-renders: progress is written directly to the DOM via requestAnimationFrame batching",
    "GPU-accelerated CSS transitions with cubic-bezier easing for buttery smooth kinetic tracking",
    "Screen-reader safe: rendered as an unbroken native text node rather than fragmented per-letter DOM spans",
    "Customizable expansion range, letter spacing bounds (em), scale multiplier, and fade threshold",
    "Flexible polymorphic tag rendering via the \"as\" prop (h1, h2, span, p, etc.) with custom transform-origin",
    "Supports both global window scroll and scoped scrollable container refs",
    "Built-in prefers-reduced-motion detection automatically locks text to resting state"
  ],
  "props": [
    {
      "name": "text",
      "type": "string",
      "description": "The text string to render as a single accessible text node"
    },
    {
      "name": "as",
      "type": "keyof JSX.IntrinsicElements",
      "default": "'span'",
      "description": "HTML tag to render as (e.g. \"h1\", \"h2\", \"span\", \"p\", \"div\")"
    },
    {
      "name": "expandDistance",
      "type": "number",
      "default": "500",
      "description": "Net scroll distance in pixels needed to progress from resting size to fully expanded and faded out"
    },
    {
      "name": "intensity",
      "type": "number",
      "default": "1",
      "description": "Multiplier on how much each scrolled pixel contributes to expansion progress"
    },
    {
      "name": "minLetterSpacing",
      "type": "number",
      "default": "0",
      "description": "Letter-spacing in em units at rest (zero scroll progress)"
    },
    {
      "name": "maxLetterSpacing",
      "type": "number",
      "default": "1",
      "description": "Letter-spacing in em units at full scroll expansion"
    },
    {
      "name": "maxScale",
      "type": "number",
      "default": "1.6",
      "description": "Scale multiplier at full scroll expansion (1 = no scale change)"
    },
    {
      "name": "fadeStart",
      "type": "number",
      "default": "0.4",
      "description": "Progress fraction (0–1) at which the text begins fading out (>= 1 disables fading)"
    },
    {
      "name": "smoothingMs",
      "type": "number",
      "default": "400",
      "description": "Duration in milliseconds of the CSS easing transition between scroll updates"
    },
    {
      "name": "transformOrigin",
      "type": "string",
      "default": "'center center'",
      "description": "CSS transform origin for expansion and scaling (e.g. \"left center\" for left-aligned headlines)"
    },
    {
      "name": "scrollContainerRef",
      "type": "RefObject<HTMLElement | null>",
      "description": "Optional ref to a custom scrollable container instead of the window viewport"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS classes for font size, weight, color, and positioning"
    }
  ],
  "accessibility": [
    "Renders a single continuous text node rather than splitting words into individual <span> letters, ensuring screen readers announce the text smoothly and search engines index it properly",
    "Under prefers-reduced-motion: reduce, scroll tracking is disabled, letter-spacing and scale are pinned to resting state, and CSS transitions are neutralized"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { ScrollVelocityText } from \"@/components/ui/scrollvelocitytext\";\n\nexport function Demo() {\n  return (\n    <div className=\"min-h-[140vh] flex flex-col items-center justify-center p-8\">\n      <p className=\"text-xs font-mono uppercase tracking-widest text-text-muted mb-4\">\n        Scroll down to expand · Scroll up to wind back\n      </p>\n      <ScrollVelocityText\n        as=\"h1\"\n        text=\"BUILD SOMETHING GREAT\"\n        intensity={1.2}\n        expandDistance={450}\n        minLetterSpacing={0.05}\n        maxLetterSpacing={0.8}\n        maxScale={1.5}\n        className=\"text-4xl sm:text-6xl font-black tracking-tight text-text-primary uppercase select-none text-center\"\n      />\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/Scrollvelocitytext.tsx",
      "type": "registry:ui",
      "target": "components/ui/scrollvelocitytext.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
