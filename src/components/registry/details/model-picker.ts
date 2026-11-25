// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "model-picker",
  "name": "Model Picker",
  "tagline": "A responsive, keyboard-friendly AI model selector",
  "description": "A searchable AI model selector that adapts from a desktop popover to a mobile bottom sheet.",
  "category": "Forms",
  "badges": [
    "Accessible",
    "Responsive",
    "Framer Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/model-picker",
  "installPromptHash": "ba016a0a87b4354f7232c36724eeac5abd2dac2e3d9f6e8a7102dc6e7e0b1883",
  "features": [
    "Desktop popover and mobile bottom sheet layouts",
    "Provider grouping, model search, tags, and capability indicators",
    "Keyboard navigation, focus management, and screen-reader announcements",
    "Controlled and uncontrolled selection modes",
    "Honors reduced-motion preferences"
  ],
  "props": [
    {
      "name": "models",
      "type": "AIModel[]",
      "description": "Models to display, optionally grouped by provider."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Selected model ID for controlled usage."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "description": "Initial model ID for uncontrolled usage."
    },
    {
      "name": "onChange",
      "type": "(id: string, model: AIModel) => void",
      "description": "Called when a model is selected."
    },
    {
      "name": "variant",
      "type": "\"pill\" | \"field\"",
      "default": "\"pill\"",
      "description": "Compact composer chip or full-width labeled field."
    },
    {
      "name": "searchable",
      "type": "boolean | \"auto\"",
      "default": "\"auto\"",
      "description": "Whether to show search; auto enables it for more than six models."
    },
    {
      "name": "footer",
      "type": "ReactNode",
      "description": "Optional content displayed beneath the model list."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables opening the picker."
    }
  ],
  "accessibility": [
    "Supports arrow keys, Home, End, Enter, Escape, and type-to-select.",
    "Returns focus to the trigger after closing and keeps keyboard focus inside the open dialog.",
    "Exposes listbox, option, dialog, and live status semantics.",
    "Honors reduced-motion preferences."
  ],
  "createdAt": "2026-11-23",
  "usageCode": "import { ModelPicker, type AIModel } from \"@/components/ui/ModelPicker\";\n\nconst models: AIModel[] = [\n  { id: \"claude\", name: \"Claude\", speed: 3, intelligence: 5 },\n  { id: \"claude-haiku\", name: \"Claude Haiku\", speed: 5, intelligence: 2 },\n  { id: \"gemini-pro\", name: \"Gemini Pro\", speed: 4, intelligence: 5 },\n  { id: \"gemini-flash\", name: \"Gemini Flash\", speed: 5, intelligence: 3 },\n  { id: \"gpt\", name: \"GPT\", speed: 3, intelligence: 5 },\n  { id: \"gpt-mini\", name: \"GPT Mini\", speed: 5, intelligence: 2 },\n];\n\nexport function Demo() {\n  return <ModelPicker models={models} defaultValue=\"gpt\" />;\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/ModelPicker.tsx",
      "type": "registry:ui",
      "target": "components/ui/model-picker.tsx"
    }
  ]
};

export default component;
