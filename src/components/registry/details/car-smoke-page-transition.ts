// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "car-smoke-page-transition",
  "name": "Car Smoke Page Transition",
  "tagline": "Cinematic automotive page transition",
  "description": "A cinematic page transition where a speeding car crosses the screen, leaving a smoke trail before transitioning to the next page.",
  "category": "Motion",
  "badges": [
    "Cinematic",
    "Motion Physics",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/car-smoke-page-transition",
  "installPromptHash": "f606b02fda46f842e67c9e86ade91d4922349af1780e30348240ebbddaa21c8d",
  "features": [
    "Hardware-accelerated Canvas particle drift smoke physics and realistic skid marks",
    "Choreographed multi-axis Ferrari drift movement, wheel spin, and speed lines",
    "Customizable travel direction (left-to-right or right-to-left), density, and scale",
    "Automatic theme awareness (light and dark mode overlay shading)",
    "Full accessibility support with automatic prefers-reduced-motion fallback"
  ],
  "props": [
    {
      "name": "direction",
      "type": "'left-to-right' | 'right-to-left'",
      "default": "'left-to-right'",
      "description": "Direction of car travel"
    },
    {
      "name": "carDuration",
      "type": "number",
      "default": "700",
      "description": "Duration of car crossing animation in milliseconds"
    },
    {
      "name": "carDelay",
      "type": "number",
      "default": "0",
      "description": "Delay before car starts moving in milliseconds"
    },
    {
      "name": "carSize",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Size of the car (affects scale)"
    },
    {
      "name": "smokeDensity",
      "type": "'off' | 'low' | 'medium' | 'high'",
      "default": "'medium'",
      "description": "Density of smoke particles emitted"
    },
    {
      "name": "smokeLifetime",
      "type": "number",
      "default": "1200",
      "description": "Lifetime of smoke particles in milliseconds"
    },
    {
      "name": "showSpeedLines",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show speed lines effect behind the car"
    },
    {
      "name": "pageTransitionDelay",
      "type": "number",
      "default": "550",
      "description": "Delay before page transition overlay starts in milliseconds"
    },
    {
      "name": "pageTransitionDuration",
      "type": "number",
      "default": "350",
      "description": "Duration of page transition overlay fade in milliseconds"
    },
    {
      "name": "resetDelay",
      "type": "number",
      "default": "300",
      "description": "Delay before resetting to idle after transition completes in milliseconds"
    },
    {
      "name": "onTransitionComplete",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when transition completes (call navigate() here)"
    },
    {
      "name": "children",
      "type": "ReactNode",
      "default": "undefined",
      "description": "The trigger element (typically a Button)"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional Tailwind classes merged into the root"
    }
  ],
  "accessibility": [
    "The trigger is keyboard accessible via Enter and Space keys",
    "Reduced motion preference automatically disables the fast car animation and smoke effects",
    "The overlay background respects the current EasyUI theme (light/dark)"
  ],
  "createdAt": "2026-09-08",
  "usageCode": "import { CarSmokePageTransition } from \"@/components/ui/car-smoke-page-transition\";\n\nexport function Demo() {\n  return (\n    <CarSmokePageTransition\n      onTransitionComplete={() => {\n        // Navigate to new page after animation completes\n        window.location.href = \"/about\";\n      }}\n    >\n      <button className=\"bg-[#FAFAFA] text-[#050505] hover:bg-white px-4 py-2 rounded-md font-medium transition-colors\">\n        Start Journey\n      </button>\n    </CarSmokePageTransition>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/CarSmokePageTransition.tsx",
      "type": "registry:ui",
      "target": "components/ui/car-smoke-page-transition.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/theme/useTheme.tsx",
      "type": "registry:lib",
      "target": "lib/theme/useTheme.tsx"
    }
  ]
};

export default component;
