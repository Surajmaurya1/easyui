// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "thinking-orb",
  "name": "Thinking Orb",
  "tagline": "Minimalist monochrome particle vortex for AI interfaces",
  "description": "Minimalist monochrome spherical particle vortex with orbital physics, pure black-and-white luminous styling, and 9 cognitive state deformations.",
  "category": "Motion",
  "badges": [
    "HTML5 Canvas",
    "Monochrome",
    "Orbital Physics",
    "Reduced Motion",
    "AI Indicator"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/thinking-orb",
  "installPromptHash": "6ede33854d86587030725824f2a7803768de39b3396e93d2dcc4631b63ac1e88",
  "features": [
    "Pure monochrome aesthetic (clean white/silver on dark, deep obsidian on light) with zero colors",
    "9 unique cognitive states: working, searching, solving, listening, connecting, weaving, composing, breathing, and shaping",
    "GPU-accelerated Canvas rendering with 3D spherical trigonometry and perspective projection",
    "Adaptive particle density scaling automatically calibrated to size",
    "Full accessibility support with automatic prefers-reduced-motion fallback",
    "Minimalist optical core with subtle particle motion trailing and star sparkles"
  ],
  "props": [
    {
      "name": "state",
      "type": "'working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'",
      "default": "'working'",
      "description": "Cognitive animation behavior preset and mathematical deformation pattern"
    },
    {
      "name": "size",
      "type": "number",
      "default": "64",
      "description": "Diameter of the canvas orb in pixels (e.g. 64 for avatar/assistant, 20 for inline text)"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Animation playback speed multiplier (1 = standard, 2 = 2x faster, 0.5 = slow)"
    },
    {
      "name": "dark",
      "type": "boolean",
      "default": "true",
      "description": "Dark mode tuning: true renders luminous white particles, false renders crisp dark graphite particles"
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Freezes animation frame progression while preserving current particle positions"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional CSS class string applied to the outer container"
    },
    {
      "name": "style",
      "type": "CSSProperties",
      "default": "undefined",
      "description": "Inline styles passed directly to the container span"
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "'${state} orb'",
      "description": "Accessible label for screen readers announcing the orb state"
    }
  ],
  "accessibility": [
    "Canvas is marked with aria-hidden=\"true\" while wrapper span maintains descriptive ARIA role and label",
    "Automatically honors prefers-reduced-motion by freezing time-based coordinate progression",
    "Zero layout shift using explicit inline-flex dimensions and flex-shrink protection"
  ],
  "createdAt": "2026-09-11",
  "usageCode": "import { ThinkingOrb } from \"@/components/ui/thinking-orb\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [state, setState] = useState<\n    \"working\" | \"searching\" | \"solving\" | \"listening\" | \"connecting\" | \"weaving\" | \"composing\" | \"breathing\" | \"shaping\"\n  >(\"working\");\n\n  return (\n    <div className=\"flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#09090b] border border-[#27272a]\">\n      <ThinkingOrb state={state} size={72} speed={1} dark={true} />\n      <div className=\"flex flex-wrap justify-center gap-1.5\">\n        {([\"working\", \"searching\", \"solving\", \"listening\", \"connecting\", \"weaving\", \"composing\", \"breathing\", \"shaping\"] as const).map((s) => (\n          <button\n            key={s}\n            onClick={() => setState(s)}\n            className={`px-3 py-1 text-xs rounded-lg transition-colors ${\n              state === s\n                ? \"bg-white text-black font-semibold\"\n                : \"bg-[#18181b] text-neutral-400 hover:text-white\"\n            }`}\n          >\n            {s}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/ThinkingOrb.tsx",
      "type": "registry:ui",
      "target": "components/ui/thinking-orb.tsx"
    }
  ]
};

export default component;
