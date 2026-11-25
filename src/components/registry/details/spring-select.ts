// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "spring-select",
  "name": "SpringSelect",
  "tagline": "Menu follows the trigger with a tiny spring",
  "description": "A select dropdown whose menu follows the trigger with a tiny spring. The chevron rotates a hair past 180° before settling, and the panel slides down with a subtle overshoot.",
  "category": "Forms",
  "badges": [
    "Origin Spring",
    "Keyboard",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spring-select",
  "installPromptHash": "f34dbae3da12248dd54cf00d705d9226ccef950fd80b1c8f0ad6d83d84669b4d",
  "features": [
    "Dropdown panel springs from the trigger with a subtle scale: 0.98 -> 1 overshoot",
    "Chevron rotates to 192° (slightly past 180°) and settles back via snappy spring",
    "Keyboard navigation: ArrowUp/Down to move, Enter to select, Escape to close",
    "Hover and active item highlight via tracked activeIndex state",
    "Selected item checkmark that follows selection through the spring motion",
    "Light/dark theme aware via CSS variables — works in both palettes"
  ],
  "props": [
    {
      "name": "options",
      "type": "SpringSelectOption[]",
      "default": "[]",
      "description": "Array of options with value, label, optional description, and disabled"
    },
    {
      "name": "value",
      "type": "string",
      "default": "undefined",
      "description": "Controlled value"
    },
    {
      "name": "defaultValue",
      "type": "string",
      "default": "undefined",
      "description": "Initial value (uncontrolled)"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Select…'",
      "description": "Placeholder text when no value is selected"
    },
    {
      "name": "onChange",
      "type": "(value: string) => void",
      "default": "undefined",
      "description": "Called when a new value is selected"
    },
    {
      "name": "label",
      "type": "string",
      "default": "undefined",
      "description": "Visible label rendered above the trigger"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Prevents interaction"
    },
    {
      "name": "error",
      "type": "string",
      "default": "undefined",
      "description": "Error message; presence triggers danger styling"
    }
  ],
  "accessibility": [
    "aria-haspopup / aria-expanded / aria-selected / aria-disabled on appropriate elements",
    "Full keyboard navigation with proper focus restoration to trigger on close",
    "Escape key dismisses the panel without changing the value",
    "Disabled state is conveyed to assistive tech"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { SpringSelect } from \"@/components/ui/spring-select\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-sm\">\n      <SpringSelect\n        label=\"Workspace\"\n        placeholder=\"Choose a workspace\"\n        defaultValue=\"design\"\n        options={[\n          { value: \"design\", label: \"Design Team\", description: \"12 members\" },\n          { value: \"eng\", label: \"Engineering\", description: \"34 members\" },\n          { value: \"ops\", label: \"Operations\", description: \"8 members\" },\n          { value: \"labs\", label: \"R&D Labs\", description: \"5 members\", disabled: true },\n        ]}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SpringSelect.tsx",
      "type": "registry:ui",
      "target": "components/ui/spring-select.tsx"
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
