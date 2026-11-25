// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "split-button",
  "name": "Split Button",
  "tagline": "A primary action with a chevron trigger for related actions.",
  "description": "A primary action fused with a chevron trigger that reveals related actions in a spring-timed dropdown, sharing a single pill silhouette.",
  "category": "Buttons",
  "badges": [
    "Framer Motion",
    "Floating UI"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/split-button",
  "installPromptHash": "04eaf7c654f61dd6c6cd799ec5c4b190708fba5d58158d0a30393472b8ce31be",
  "features": [
    "Primary action and chevron trigger share a single rounded pill silhouette",
    "Chevron rotates with a snappy spring on open/close",
    "Menu flips above the trigger when there is not enough room below",
    "Supports primary and secondary visual variants",
    "Closes on outside click and on Escape"
  ],
  "props": [
    {
      "name": "label",
      "type": "string",
      "description": "Label for the primary (left) action"
    },
    {
      "name": "onClick",
      "type": "() => void",
      "description": "Called when the primary action is pressed"
    },
    {
      "name": "options",
      "type": "SplitButtonOption[]",
      "description": "Dropdown options revealed by the chevron trigger"
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg'",
      "default": "'md'",
      "description": "Padding and text size"
    },
    {
      "name": "variant",
      "type": "'primary' | 'secondary'",
      "default": "'primary'",
      "description": "Visual style of both halves of the control"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables the entire control"
    }
  ],
  "accessibility": [
    "Chevron trigger uses aria-haspopup=\"menu\" and aria-expanded to announce state",
    "Dropdown uses role=\"menu\" with role=\"menuitem\" items",
    "Arrow Up/Down, Home, and End move roving focus between enabled items",
    "Enter/Space selects the active item, Escape closes and returns focus to the trigger",
    "Tab closes the menu without trapping focus",
    "Respects prefers-reduced-motion by collapsing spring transitions to instant"
  ],
  "createdAt": "2026-09-16",
  "usageCode": "<SplitButton\n  label=\"Deploy\"\n  onClick={handleDeploy}\n  options={[\n    { value: 'preview', label: 'Deploy preview', onSelect: handlePreview },\n    { value: 'rollback', label: 'Rollback', onSelect: handleRollback },\n  ]}\n/>",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SplitButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/split-button.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
