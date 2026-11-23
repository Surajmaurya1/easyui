// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "dot-shader",
  "name": "Dot Shader",
  "tagline": "Interactive GPU dot matrix background with cursor proximity shader dynamics",
  "description": "A GPU-accelerated interactive dot matrix background shader with magnetic cursor repulsion, proximity illumination glow, dynamic lens scaling, and ambient wave motion.",
  "category": "Motion",
  "badges": [
    "WebGL",
    "GLSL Shader",
    "Interactive",
    "Background"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-shader",
  "installPromptHash": "48d363ae447ebfc179ec199cd4c0c9af1ca9645ad721d241f5924f4e94414bbb",
  "features": [
    "Hardware-accelerated WebGL point primitive vertex & fragment shader with Canvas 2D fallback",
    "Interactive cursor proximity illumination transitioning smoothly to accent color",
    "Magnetic/gravitational radial repulsion with smooth exponential damping",
    "Dynamic scale expansion creating a 3D lens bulge around the cursor",
    "Ambient wave undulation breathing subtle life into the background when idle",
    "Zero CPU overhead during rendering via GPU vertex shader positioning",
    "Supports wrapping arbitrary children without interfering with pointer interactions",
    "Full prefers-reduced-motion compliance freezing displacement and waves"
  ],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Optional content rendered above the interactive dot shader canvas with full clickability"
    },
    {
      "name": "dotColor",
      "type": "string",
      "default": "'rgba(255, 255, 255, 0.15)'",
      "description": "Idle color of the background matrix dots (hex, rgb, or rgba)"
    },
    {
      "name": "accentColor",
      "type": "string",
      "default": "'#00F0FF'",
      "description": "Luminous highlight color of dots illuminated by cursor proximity"
    },
    {
      "name": "dotSize",
      "type": "number",
      "default": "1.5",
      "description": "Base radius in pixels of each individual dot"
    },
    {
      "name": "spacing",
      "type": "number",
      "default": "22",
      "description": "Distance in pixels between adjacent dots in the grid"
    },
    {
      "name": "cursorRadius",
      "type": "number",
      "default": "180",
      "description": "Radius in pixels of cursor influence and repulsion"
    },
    {
      "name": "distortionStrength",
      "type": "number",
      "default": "0.35",
      "description": "Force multiplier of magnetic repulsion away from the cursor (0 to 1)"
    },
    {
      "name": "maxScale",
      "type": "number",
      "default": "2.2",
      "description": "Maximum scale multiplier of dots at peak cursor proximity"
    },
    {
      "name": "waveIntensity",
      "type": "number",
      "default": "0.25",
      "description": "Amplitude of ambient idle sinusoidal wave motion"
    },
    {
      "name": "speed",
      "type": "number",
      "default": "1",
      "description": "Speed multiplier for the ambient background waves"
    },
    {
      "name": "interactive",
      "type": "boolean",
      "default": "true",
      "description": "Whether dots react to cursor movements with repulsion and illumination"
    },
    {
      "name": "overlay",
      "type": "boolean",
      "default": "true",
      "description": "Enables a soft radial vignette gradient to seamlessly blend container edges"
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional CSS classes for container sizing and layout"
    }
  ],
  "accessibility": [
    "Shader canvas is marked with aria-hidden=\"true\" and pointer-events-none",
    "Child content remains fully accessible with standard keyboard, focus, and pointer events",
    "prefers-reduced-motion automatically disables wave animations and repulsion displacement, preserving calm static dots"
  ],
  "createdAt": "2026-09-20",
  "usageCode": "import { DotShader } from \"@/components/ui/dot-shader\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full min-h-[500px] rounded-2xl overflow-hidden bg-background border border-border\">\n      <DotShader\n        dotColor=\"rgba(255, 255, 255, 0.15)\"\n        accentColor=\"#00F0FF\"\n        spacing={24}\n        dotSize={1.5}\n        cursorRadius={200}\n        distortionStrength={0.4}\n        maxScale={2.5}\n      >\n        <div className=\"min-h-[500px] flex flex-col items-center justify-center text-center p-8\">\n          <span className=\"text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2\">\n            GPU WebGL Shader\n          </span>\n          <h2 className=\"text-3xl sm:text-5xl font-bold tracking-tight text-text-primary\">\n            Interactive Dot Matrix\n          </h2>\n          <p className=\"mt-3 text-xs sm:text-sm text-text-secondary max-w-md\">\n            Move your cursor across the canvas to experience magnetic repulsion and proximity illumination.\n          </p>\n        </div>\n      </DotShader>\n    </div>\n  );\n}",
  "dependencies": [],
  "files": [
    {
      "path": "src/components/ui/DotShader.tsx",
      "type": "registry:ui",
      "target": "components/ui/dot-shader.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
