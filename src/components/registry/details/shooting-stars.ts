// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "shooting-stars",
  "name": "Shooting Stars",
  "tagline": "Deep space canvas cosmos with glowing shooting stars, radiant twinkling starfield, and interactive stardust",
  "description": "A high-performance deep-space cosmos background featuring multi-depth twinkling celestial stars, glowing atmospheric nebula clouds, and cinematic shooting stars with luminous head flares, tapered fading trails, ember stardust, and click-to-summon interactivity.",
  "category": "Motion",
  "badges": [
    "Canvas",
    "Space",
    "Stars",
    "Interactive",
    "Background"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/shooting-stars",
  "installPromptHash": "2e11602da90b2afda439271f3d1f69288da9a21595f1233ca77dfc4623c290a6",
  "features": [
    "Zero external runtime dependencies: 100% native HTML5 Canvas 2D with sub-pixel DPR scaling",
    "Multi-depth twinkling starfield with radiant 4-point celestial cross-sparkles and soft halo blooms",
    "Cinematic meteors with radiant head bursts, tapered linear-gradient fading trails, and custom trajectory angles",
    "Stardust ember particles dynamically shed from traveling meteor tails for realistic atmospheric burns",
    "Subtle ambient cosmic nebula haze clouds rendering layered indigo, violet, and cyan deep-space depth",
    "Interactive mouse parallax tilt creating multi-plane 3D astronomical perspective",
    "Interactive click & tap summons custom meteors sweeping directly across the interaction point",
    "Full prefers-reduced-motion compliance freezing meteors and twinkle to a serene static night sky",
    "Stratified children wrapper supporting titles, hero copy, and buttons with intact pointer events"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Optional content rendered above the starry sky with full interactivity and clickability"
    },
    {
      "name": "background",
      "type": "string",
      "default": "'#020617'",
      "description": "Deep space background color (CSS color, hex, rgba, or gradient)"
    },
    {
      "name": "starCount",
      "type": "number",
      "default": "120",
      "description": "Total number of ambient background stars distributed across the sky"
    },
    {
      "name": "starColors",
      "type": "string[]",
      "default": "['#FFFFFF', '#E0F2FE', '#C7D2FE', '#FEF08A']",
      "description": "Palette of celestial tints applied to ambient background stars"
    },
    {
      "name": "minStarSize",
      "type": "number",
      "default": "0.6",
      "description": "Minimum radius in pixels of ambient stars"
    },
    {
      "name": "maxStarSize",
      "type": "number",
      "default": "2.2",
      "description": "Maximum radius in pixels of ambient stars"
    },
    {
      "name": "twinkleSpeed",
      "type": "number",
      "default": "1",
      "description": "Frequency speed multiplier for ambient star twinkle pulsation"
    },
    {
      "name": "trailColor",
      "type": "string",
      "default": "'#38BDF8'",
      "description": "Primary neon/atmospheric color of the shooting star trail"
    },
    {
      "name": "headColor",
      "type": "string",
      "default": "'#FFFFFF'",
      "description": "Luminous core burst color of the shooting star meteor head"
    },
    {
      "name": "interval",
      "type": "number",
      "default": "2200",
      "description": "Average delay in milliseconds between automatic shooting star spawns"
    },
    {
      "name": "speed",
      "type": "[number, number] | number",
      "default": "[12, 22]",
      "description": "Speed range [min, max] or uniform velocity in pixels per frame"
    },
    {
      "name": "trailLength",
      "type": "[number, number] | number",
      "default": "[90, 180]",
      "description": "Trail length range [min, max] or uniform length in pixels"
    },
    {
      "name": "angle",
      "type": "number",
      "default": "42",
      "description": "Trajectory flight angle in degrees clockwise from horizontal (45° is down-right)"
    },
    {
      "name": "maxActiveShootingStars",
      "type": "number",
      "default": "2",
      "description": "Maximum concurrent active meteors streaking across the sky at once"
    },
    {
      "name": "showEmbers",
      "type": "boolean",
      "default": "true",
      "description": "Whether shooting stars shed glowing stardust ember particles in their wake"
    },
    {
      "name": "nebula",
      "type": "boolean",
      "default": "true",
      "description": "Enables layered atmospheric cosmic nebula clouds in the deep background"
    },
    {
      "name": "clickToSpawn",
      "type": "boolean",
      "default": "true",
      "description": "Enables clicking or tapping to summon a shooting star sweeping past the cursor"
    },
    {
      "name": "parallax",
      "type": "boolean",
      "default": "true",
      "description": "Enables subtle mouse parallax perspective shifting background stars by depth"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS classes for container sizing, layout, and styling"
    }
  ],
  "accessibility": [
    "Cosmic canvas is marked with aria-hidden=\"true\" and pointer-events-none",
    "Child elements retain standard focus order, screen reader accessibility, and pointer handling",
    "Supports prefers-reduced-motion media query: disables meteor spawning, particle embers, and twinkle oscillations"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { ShootingStars } from \"@/components/ui/shooting-stars\";\n\nexport function SpaceHeroDemo() {\n  return (\n    <div className=\"relative w-full h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center\">\n      <ShootingStars\n        starCount={140}\n        interval={1800}\n        trailColor=\"#38BDF8\"\n        headColor=\"#FFFFFF\"\n        angle={45}\n        nebula={true}\n        parallax={true}\n        clickToSpawn={true}\n        className=\"w-full h-full\"\n      >\n        <div className=\"flex flex-col items-center justify-center h-full text-center px-6\">\n          <span className=\"inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-full mb-4\">\n            ✦ Celestial Cosmos\n          </span>\n          <h1 className=\"text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight\">\n            Journey Into The Stars\n          </h1>\n          <p className=\"mt-4 text-sm sm:text-base text-slate-400 max-w-lg\">\n            High-performance cosmic background with realistic meteors, radiant starfields, and atmospheric nebula glow.\n          </p>\n        </div>\n      </ShootingStars>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/ShootingStars.tsx",
      "type": "registry:ui",
      "target": "components/ui/shooting-stars.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
