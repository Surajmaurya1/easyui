// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "sparkles-core",
  "name": "Sparkles Core",
  "tagline": "Zero-dependency GPU canvas particle sparkles with celestial stars, organic twinkle, and cursor reactions",
  "description": "A high-performance, zero-dependency particle sparkle canvas with multi-shape geometry (circles, radiant diamond stars, cross starlets), organic twinkling, interactive cursor repulsion/attraction, click particle bursts, and fluid SSR safety.",
  "category": "Motion",
  "badges": [
    "Canvas",
    "Particles",
    "Interactive",
    "Background"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sparkles-core",
  "installPromptHash": "0aba539f4cc45c2d33591f213837ecfcb60b3954613f737a1deb636e487c38dc",
  "features": [
    "Zero external particle dependencies: 100% native HTML5 Canvas 2D with sub-pixel DPR scaling",
    "Full backward compatibility with Aceternity SparklesCore props signature",
    "Multiple particle shapes: circle, 4-pointed diamond star, celestial cross starlet, or mixed",
    "Multi-color palette distribution supporting chromatic nebulae and gradient sparkle fields",
    "Organic twinkle brightness pulsation with phase modulation and customizable twinkle speeds",
    "Directional drift flows: float organically in all directions, or drift top, bottom, left, or right",
    "Interactive cursor modes: repulsion, attraction, or proximity radiant enlargement",
    "Click & tap particle burst generation spawning dynamic kinetic firework sparks",
    "Wraps arbitrary children effortlessly with pointer event pass-through and depth stratification",
    "Full accessibility: aria-hidden canvas and prefers-reduced-motion compliance"
  ],
  "props": [
    {
      "name": "id",
      "type": "string",
      "description": "Optional unique HTML id attribute for the canvas element"
    },
    {
      "name": "background",
      "type": "string",
      "default": "'transparent'",
      "description": "Background color of the sparkle container (CSS color, hex, rgba, or gradient)"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS utility classes applied to the root container"
    },
    {
      "name": "particleColor",
      "type": "string",
      "default": "'#FFFFFF'",
      "description": "Primary color for single-tint particle sparkle fields"
    },
    {
      "name": "particleColors",
      "type": "string[]",
      "description": "Array of colors distributed across sparkles for chromatic or starry night effects"
    },
    {
      "name": "minSize",
      "type": "number",
      "default": "0.6",
      "description": "Minimum radius/size in pixels for spawned sparkles"
    },
    {
      "name": "maxSize",
      "type": "number",
      "default": "2.4",
      "description": "Maximum radius/size in pixels for spawned sparkles"
    },
    {
      "name": "particleSize",
      "type": "number",
      "description": "Uniform particle size override (locks both minSize and maxSize)"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Particle movement velocity multiplier"
    },
    {
      "name": "particleDensity",
      "type": "number",
      "default": "120",
      "description": "Particle density factor calculated relative to a 400x400 area"
    },
    {
      "name": "particleCount",
      "type": "number",
      "description": "Exact particle count override ignoring density calculations"
    },
    {
      "name": "particleShape",
      "type": "'circle' | 'star' | 'cross' | 'mixed'",
      "default": "'circle'",
      "description": "Geometry shape of particles: circle, 4-point radiant star, cross starlet, or mixed"
    },
    {
      "name": "direction",
      "type": "'none' | 'top' | 'bottom' | 'left' | 'right'",
      "default": "'none'",
      "description": "Directional flow drift; none provides organic cosmic floating"
    },
    {
      "name": "twinkle",
      "type": "boolean",
      "default": "true",
      "description": "Enables dynamic sinusoidal twinkle opacity pulsation"
    },
    {
      "name": "twinkleSpeed",
      "type": "number",
      "default": "1",
      "description": "Frequency speed multiplier for twinkle pulsation"
    },
    {
      "name": "interactive",
      "type": "boolean",
      "default": "true",
      "description": "Enables mouse pointer tracking and interaction reactions"
    },
    {
      "name": "cursorMode",
      "type": "'repulse' | 'attract' | 'sparkle' | 'none'",
      "default": "'repulse'",
      "description": "Cursor reaction: repulse away, attract toward cursor, or sparkle illuminate"
    },
    {
      "name": "cursorRadius",
      "type": "number",
      "default": "140",
      "description": "Influence radius in pixels around the pointer"
    },
    {
      "name": "clickPush",
      "type": "number",
      "default": "6",
      "description": "Number of spark particles burst on click/tap"
    },
    {
      "name": "opacity",
      "type": "number",
      "default": "1",
      "description": "Global master opacity scalar for the sparkle canvas"
    },
    {
      "name": "blur",
      "type": "number",
      "default": "0",
      "description": "CSS blur filter radius in pixels for soft glowing bloom"
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Optional content rendered above the sparkles with full clickability and isolation"
    }
  ],
  "accessibility": [
    "Canvas layer is isolated with aria-hidden=\"true\" and pointer-events-none",
    "Respects prefers-reduced-motion media query: freezes particle drift and twinkle when requested",
    "Children render in a stratified foreground container with native keyboard and focus semantics intact"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { SparklesCore } from \"@/components/ui/sparkles-core\";\n\nexport function SparklesDemo() {\n  return (\n    <div className=\"relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center\">\n      <SparklesCore\n        id=\"tsparticlesfullpage\"\n        background=\"transparent\"\n        minSize={0.6}\n        maxSize={2}\n        particleDensity={100}\n        className=\"w-full h-full\"\n        particleColor=\"#FFFFFF\"\n        particleShape=\"mixed\"\n        particleColors={[\"#60A5FA\", \"#C084FC\", \"#F472B6\", \"#FFFFFF\"]}\n        cursorMode=\"repulse\"\n        clickPush={10}\n      >\n        <div className=\"flex flex-col items-center justify-center h-full px-4 text-center\">\n          <h1 className=\"text-3xl md:text-5xl font-bold text-white tracking-tight\">\n            Build Stunning Interfaces\n          </h1>\n          <p className=\"mt-3 text-sm text-slate-400 max-w-sm\">\n            Zero-dependency canvas particle sparkle system with celestial stars and cursor dynamics.\n          </p>\n        </div>\n      </SparklesCore>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/SparklesCore.tsx",
      "type": "registry:ui",
      "target": "components/ui/sparkles-core.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
