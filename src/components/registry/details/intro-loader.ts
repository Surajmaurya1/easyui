// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "intro-loader",
  "name": "Intro Loader",
  "tagline": "Apple-style multilingual greeting welcome splash",
  "description": "An Apple-inspired multilingual welcome splash and intro loader that rapidly cycles localized greetings with fluid blur transitions, progress tracking, and accessible skip controls.",
  "category": "Overlays",
  "badges": [
    "Apple Welcome",
    "Multilingual",
    "Splash Screen",
    "Fluid Blur",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/intro-loader",
  "installPromptHash": "a329adc1b7bdc25aafe4fb320de1355e6dc7f69af124712b27c4c6938e50b21b",
  "features": [
    "Rapid multilingual greeting cycling inspired by Apple OS welcome splash",
    "Fluid blur, scale, and opacity entry transitions calibrated with cubic-bezier curves",
    "Apple-style hairline progress indicator tracking sequence completion",
    "Keyboard and tactile skip mechanism (ESC key or dedicated discrete button)",
    "Full accessibility support with aria-live announcements and reduced-motion fallbacks",
    "Supports both full-screen initial overlay and inline documentation preview modes"
  ],
  "props": [
    {
      "name": "greetings",
      "type": "(string | GreetingItem)[]",
      "default": "['Hello', 'Hola', 'Bonjour', ...]",
      "description": "Array of localized greeting strings or objects with text and lang to cycle through"
    },
    {
      "name": "fullScreen",
      "type": "boolean",
      "default": "true",
      "description": "Whether to render as a fixed full-screen overlay or inline container"
    },
    {
      "name": "intervalMs",
      "type": "number",
      "default": "240",
      "description": "Milliseconds per greeting cycle"
    },
    {
      "name": "showProgress",
      "type": "boolean",
      "default": "true",
      "description": "Whether to display the Apple-style hairline progress bar"
    },
    {
      "name": "showLangBadge",
      "type": "boolean",
      "default": "true",
      "description": "Whether to display country language badges"
    },
    {
      "name": "allowSkip",
      "type": "boolean",
      "default": "true",
      "description": "Whether to enable ESC key and Skip button dismissals"
    },
    {
      "name": "speedMultiplier",
      "type": "number",
      "default": "1",
      "description": "Speed multiplier for the animation sequence"
    },
    {
      "name": "onComplete",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when welcome sequence completes"
    }
  ],
  "accessibility": [
    "Screen reader live region (aria-live=\"polite\" and aria-atomic=\"true\") for real-time announcements",
    "Full keyboard dismissibility with Escape key listener",
    "Complete prefers-reduced-motion fallback jumping directly to finish",
    "Dialog role with aria-label=\"Welcome intro screen\" and clean tree unmounting upon finish"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { IntroLoader } from \"@/components/ui/intro-loader\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [loading, setLoading] = useState(true);\n\n  if (loading) {\n    return (\n      <IntroLoader\n        allowSkip={true}\n        showProgress={true}\n        onComplete={() => setLoading(false)}\n      />\n    );\n  }\n\n  return (\n    <main className=\"min-h-screen bg-[#050505] text-[#FAFAFA] p-8\">\n      <h1>Welcome to the Application</h1>\n    </main>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/IntroLoader.tsx",
      "type": "registry:ui",
      "target": "components/ui/intro-loader.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
