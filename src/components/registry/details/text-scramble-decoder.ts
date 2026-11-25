// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "text-scramble-decoder",
  "name": "Text Scramble Decoder",
  "tagline": "Controlled technical typography reveal",
  "description": "A controlled text reveal that resolves scrambled glyphs into readable copy without changing the text semantics.",
  "category": "Motion",
  "badges": [
    "Typography",
    "Reduced Motion",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/text-scramble-decoder",
  "installPromptHash": "b87ce704b6e444b29f97e52718b34aa812e21783b247743594e2a2ca487064f4",
  "features": [
    "Position-staged character resolution with a stable final state",
    "Mount, hover, and manual replay trigger modes",
    "Configurable glyph set and duration"
  ],
  "props": [
    {
      "name": "text",
      "type": "string",
      "description": "Final readable text announced to assistive technology"
    },
    {
      "name": "characters",
      "type": "string",
      "default": "A-Z, 0-9, symbols",
      "description": "Characters used during the temporary scramble phase"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "900",
      "description": "Decode duration in milliseconds"
    },
    {
      "name": "trigger",
      "type": "'mount' | 'hover' | 'manual'",
      "default": "'mount'",
      "description": "When the decode sequence should run"
    }
  ],
  "accessibility": [
    "The readable text is exposed through aria-label while animated glyphs are hidden from assistive technology",
    "Reduced motion renders the final text immediately"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { TextScrambleDecoder } from \"@/components/ui/text-scramble-decoder\";\n\nexport function Demo() {\n  return (\n    <TextScrambleDecoder\n      text=\"EASYUI.REGISTRY.SYNCED\"\n      trigger=\"manual\"\n      duration={1000}\n    />\n  );\n}",
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/TextScrambleDecoder.tsx",
      "type": "registry:ui",
      "target": "components/ui/text-scramble-decoder.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
