// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "liquid-toggle",
  "name": "Liquid Toggle",
  "tagline": "Morphing liquid blob toggle",
  "description": "A toggle with a liquid/blob-like transition. The internal shape deforms organically as it travels from off to on — stretching along the travel axis and settling into a natural blob shape rather than simply translating.",
  "category": "Buttons",
  "badges": [
    "SVG Morph",
    "Spring",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-toggle",
  "installPromptHash": "beb1e8eb089131b050a809d78764dc42fe41c1dd5a03a3b91c2ef4588652beab",
  "features": [
    "Internal blob shape continuously morphs between states",
    "Transient stretch pulse along the travel axis when toggling",
    "Spring-smoothed progress with mass/damping tuning",
    "Controlled and uncontrolled usage via value/defaultValue/onChange",
    "Respects prefers-reduced-motion (uses static state fallback)"
  ],
  "props": [
    {
      "name": "value",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled value"
    },
    {
      "name": "defaultValue",
      "type": "boolean",
      "default": "false",
      "description": "Initial value for uncontrolled mode"
    },
    {
      "name": "onChange",
      "type": "(value: boolean) => void",
      "default": "undefined",
      "description": "Toggle change callback"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disabled state"
    },
    {
      "name": "offLabel",
      "type": "string",
      "default": "'Off'",
      "description": "Screen reader label when off"
    },
    {
      "name": "onLabel",
      "type": "string",
      "default": "'On'",
      "description": "Screen reader label when on"
    },
    {
      "name": "accentColor",
      "type": "string",
      "default": "'#FAFAFA'",
      "description": "Blob color when on"
    },
    {
      "name": "showLabels",
      "type": "boolean",
      "default": "true",
      "description": "Show OFF/ON text inside the track"
    },
    {
      "name": "width",
      "type": "number",
      "default": "56",
      "description": "Track width in px"
    },
    {
      "name": "height",
      "type": "number",
      "default": "32",
      "description": "Track height in px"
    }
  ],
  "accessibility": [
    "role=\"switch\" with aria-checked",
    "Visually hidden label reflects current state",
    "Keyboard interaction: Space/Enter toggles; Arrow keys set state",
    "Respects prefers-reduced-motion media query"
  ],
  "createdAt": "2026-09-02",
  "usageCode": "import { LiquidToggle } from \"@/components/ui/liquid-toggle\";\n\nexport function Demo() {\n  const [on, setOn] = React.useState(false);\n  return (\n    <div className=\"flex items-center gap-2\">\n      <LiquidToggle value={on} onChange={setOn} />\n      <span className=\"text-sm\">{on ? 'Enabled' : 'Disabled'}</span>\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/LiquidToggle.tsx",
      "type": "registry:ui",
      "target": "components/ui/liquid-toggle.tsx"
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
  ],
  "featured": true
};

export default component;
