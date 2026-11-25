// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "focus-mode",
  "name": "Focus Mode",
  "tagline": "Atmospheric UI isolation dimming background distractions without layout shifts",
  "description": "An atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.",
  "category": "Motion",
  "badges": [
    "Focus Mode",
    "Motion Physics",
    "Overlays"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/focus-mode",
  "installPromptHash": "089480f265da316e7818cadee50e9e8ff17a9efde1c2436f11a609d3fc640974",
  "features": [
    "Subtle background opacity dampening bringing selected components into focus",
    "Zero layout shift architecture keeping existing dashboard grid geometry intact",
    "Tactile spring scaling and border elevation on active focused target",
    "Keyboard Escape key listener and explicit exit controls",
    "Reduced motion support with instant opacity transitions"
  ],
  "props": [
    {
      "name": "items",
      "type": "FocusModeItem[]",
      "default": "[...]",
      "description": "List of dashboard cards or sections"
    },
    {
      "name": "focusedId",
      "type": "string | null",
      "default": "null",
      "description": "Controlled focused card ID"
    },
    {
      "name": "onFocusChange",
      "type": "(id: string | null) => void",
      "default": "undefined",
      "description": "Callback fired when focused element changes"
    },
    {
      "name": "dimOpacity",
      "type": "number",
      "default": "0.2",
      "description": "Opacity applied to unfocused background cards"
    }
  ],
  "accessibility": [
    "Escape key listener automatically dismisses focus mode and restores full viewport opacity",
    "Focus rings remain strictly compliant with EasyUI sky-400 tokens"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { FocusMode } from \"@/components/ui/focus-mode\";\n\nexport function Demo() {\n  return (\n    <FocusMode\n      items={[\n        {\n          id: \"mrr\",\n          title: \"Monthly Recurring Revenue\",\n          metric: \"$148,290\",\n          delta: \"+18.4%\",\n          content: <p>Enterprise plan renewals</p>\n        }\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/FocusMode.tsx",
      "type": "registry:ui",
      "target": "components/ui/focus-mode.tsx"
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
