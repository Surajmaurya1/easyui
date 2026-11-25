// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "glyph-matrix",
  "name": "Glyph Matrix",
  "tagline": "Canvas-driven Matrix digital rain background with glowing phosphor trails.",
  "description": "A high-performance, canvas-driven Matrix digital rain background effect featuring streaming Katakana and numeric glyphs, glowing head highlights, decaying phosphor trails, and interactive cursor disturbances.",
  "category": "Motion",
  "badges": [
    "Canvas",
    "Background Effect",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glyph-matrix",
  "installPromptHash": "828fa228f2f5b6a8461b78cb5c108cca0fbfda093b14ed4003af060c43471016",
  "features": [
    "GPU-friendly HTML5 Canvas implementation running at silky 60fps",
    "Phosphor decay trails rendered via progressive alpha blending",
    "Authentic Katakana, matrix operators, and hexadecimal character set",
    "Interactive pointer disturbance causing streams near the cursor to flare and accelerate",
    "Supports both bounded containers and full-page fixed background backdrops"
  ],
  "props": [
    {
      "name": "fontSize",
      "type": "number",
      "default": "16",
      "description": "Font size in pixels for the glyph grid"
    },
    {
      "name": "color",
      "type": "string",
      "default": "'#00FF66'",
      "description": "Primary rain stream color"
    },
    {
      "name": "headColor",
      "type": "string",
      "default": "'#FFFFFF'",
      "description": "Color of the leading head glyph in each column"
    },
    {
      "name": "backgroundColor",
      "type": "string",
      "default": "'#050505'",
      "description": "Background color used for trail fading"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Fall speed multiplier"
    },
    {
      "name": "fadeRate",
      "type": "number",
      "default": "0.06",
      "description": "Decay rate per frame for phosphor trails"
    },
    {
      "name": "interactive",
      "type": "boolean",
      "default": "true",
      "description": "Whether mouse proximity disturbs and accelerates glyph streams"
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Pauses stream animation"
    },
    {
      "name": "fullPage",
      "type": "boolean",
      "default": "false",
      "description": "Fixes canvas to fill the entire viewport as a full-page background"
    },
    {
      "name": "opacity",
      "type": "number",
      "default": "1",
      "description": "Overall opacity of the matrix backdrop"
    },
    {
      "name": "children",
      "type": "React.ReactNode",
      "description": "Optional content layered over the matrix background"
    }
  ],
  "accessibility": [
    "Canvas is marked aria-hidden=\"true\" to keep screen readers focused on content",
    "Falls back to a static ambient glyph array under prefers-reduced-motion",
    "Pauses rendering automatically when scrolled out of viewport via IntersectionObserver",
    "Children layered on top retain full keyboard access and standard browser focus"
  ],
  "createdAt": "2026-09-16",
  "usageCode": "<GlyphMatrix\n  className=\"h-[500px] w-full rounded-2xl\"\n  color=\"#00FF66\"\n  headColor=\"#FFFFFF\"\n  speed={1.2}\n  interactive\n>\n  <div className=\"text-center\">\n    <h2 className=\"text-3xl font-bold text-white tracking-tight\">Wake up, Neo...</h2>\n    <p className=\"text-emerald-400/80 text-sm mt-2 font-mono\">The Matrix has you.</p>\n  </div>\n</GlyphMatrix>",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/GlyphMatrix.tsx",
      "type": "registry:ui",
      "target": "components/ui/glyph-matrix.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
