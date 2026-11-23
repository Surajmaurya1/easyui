// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "typewriter-button",
  "name": "Typewriter Button",
  "tagline": "Character-by-character reveal with mechanical sound feedback",
  "description": "An interactive button that reveals its label character-by-character with optional synthesized mechanical audio feedback.",
  "category": "Buttons",
  "badges": [
    "Web Audio API",
    "Framer Motion",
    "Tactile Audio",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/typewriter-button",
  "installPromptHash": "8bdfd2b9eec9ed3c2607c8f5c60c19cda327100285af2d91d1cf92a3704e2c4a",
  "features": [
    "Progressive character-by-character typewriter reveal with blinking cursor",
    "Synthesized mechanical click sound generated dynamically via Web Audio API (zero audio file assets)",
    "Configurable typing speed, sound volume, variants, and auto-start mode",
    "Full accessibility with complete aria-label announcement and keyboard triggers"
  ],
  "props": [
    {
      "name": "children",
      "type": "string",
      "description": "Label text to type out"
    },
    {
      "name": "charDuration",
      "type": "number",
      "default": "75",
      "description": "Milliseconds per character reveal"
    },
    {
      "name": "soundEnabled",
      "type": "boolean",
      "default": "false",
      "description": "Enables mechanical keystroke sound cues"
    },
    {
      "name": "soundVolume",
      "type": "number",
      "default": "0.25",
      "description": "Web Audio synthesizer output volume (0 to 1)"
    },
    {
      "name": "variant",
      "type": "'primary' | 'secondary' | 'outline'",
      "default": "'primary'",
      "description": "Styling appearance"
    },
    {
      "name": "autoStart",
      "type": "boolean",
      "default": "false",
      "description": "Begins typing immediately upon mounting"
    },
    {
      "name": "onComplete",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback on typing completion"
    }
  ],
  "accessibility": [
    "Always contains full text in aria-label to prevent truncated screen reader speech",
    "Respects reduced motion by immediately rendering full text if desired",
    "Interactive <button> element with standard keyboard activation"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { TypewriterButton } from \"@/components/ui/typewriter-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <TypewriterButton soundEnabled variant=\"primary\">\n        npm install @easyui/react\n      </TypewriterButton>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/TypewriterButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/typewriter-button.tsx"
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
