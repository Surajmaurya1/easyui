// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "wave-transition",
  "name": "Wave Transition",
  "tagline": "Carry the interface forward on a smooth wave of color",
  "description": "A source-aware view transition with a soft rainbow light wave, refracted color, and theme-friendly edge glow.",
  "category": "Motion",
  "badges": [
    "View Transition",
    "Motion",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/wave-transition",
  "installPromptHash": "c6d9c89192010d12166e1d09da1cfa3028c10276c374e2c6174ac3f48c874d68",
  "features": [
    "Vertical, horizontal, and center-origin wave geometry",
    "Optional source element anchors the reveal to its measured center",
    "Organic rainbow light wash and six configurable color palettes",
    "Color and edge glow remain visible on light and dark surfaces",
    "Controlled revealed state with completion callback",
    "Reduced-motion mode replaces the expanding clip with a simple fade"
  ],
  "props": [
    {
      "name": "revealed",
      "type": "boolean",
      "default": "required",
      "description": "Controls which view is shown and the wave direction"
    },
    {
      "name": "revealedContent",
      "type": "React.ReactNode",
      "default": "required",
      "description": "The view revealed by the wave"
    },
    {
      "name": "children",
      "type": "React.ReactNode",
      "default": "required",
      "description": "The starting view"
    },
    {
      "name": "type",
      "type": "\"vertical\" | \"horizontal\" | \"center\"",
      "default": "\"vertical\"",
      "description": "Wave shape and default origin"
    },
    {
      "name": "source",
      "type": "React.RefObject<HTMLElement | null>",
      "default": "undefined",
      "description": "Optional element whose center anchors the wave"
    },
    {
      "name": "palette",
      "type": "WavePalette",
      "default": "\"colorful\"",
      "description": "Colorful, rainbow, ocean, sunset, green, mono, or three custom colors"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "1.1",
      "description": "Outgoing wave duration in seconds; return is 25% faster"
    },
    {
      "name": "overlay",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Persistent content layered above both views"
    },
    {
      "name": "onFinish",
      "type": "(revealed: boolean) => void",
      "default": "undefined",
      "description": "Called when the wave finishes"
    }
  ],
  "accessibility": [
    "The inactive view is hidden from assistive technology and made inert",
    "Respects prefers-reduced-motion by skipping the clip-path expansion",
    "Overlay controls remain interactive above the transitioning views"
  ],
  "createdAt": "2026-11-18",
  "usageCode": "import { useRef, useState } from \"react\";\nimport { WaveTransition } from \"@/components/ui/WaveTransition\";\n\nexport function Demo() {\n  const [revealed, setRevealed] = useState(false);\n  const triggerRef = useRef<HTMLButtonElement>(null);\n\n  return (\n    <WaveTransition\n      revealed={revealed}\n      revealedContent={<div className=\"grid h-64 place-items-center\">New view</div>}\n      source={triggerRef}\n      palette=\"rainbow\"\n      overlay={(\n        <button ref={triggerRef} onClick={() => setRevealed((value) => !value)}>\n          Toggle view\n        </button>\n      )}\n    >\n      <div className=\"grid h-64 place-items-center\">Current view</div>\n    </WaveTransition>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/WaveTransition.tsx",
      "type": "registry:ui",
      "target": "components/ui/wave-transition.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
