// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "combobox",
  "name": "Combobox",
  "tagline": "Gliding highlight & type-to-match underline",
  "description": "A searchable select where one highlight glides between options as you move (keyboard or mouse), the match underlines as you type, and the check pops in on selection.",
  "category": "Forms",
  "badges": [
    "Layout Springs",
    "Keyboard Friendly",
    "Searchable",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/combobox",
  "installPromptHash": "e2b2ae183b2f6060b164b86dfd89899792fc11519a1f76cf23d4698d8f01c4f1",
  "features": [
    "Single measured highlight glides to the active row and survives scrolling",
    "Fuzzy-free substring search across labels, descriptions, and keywords with match underline",
    "Descriptions, icons, and disabled options supported",
    "Arrow/Home/End/Enter/Esc keys wired; opens upward when there is no room below",
    "ARIA combobox/listbox with aria-activedescendant wired end to end"
  ],
  "props": [
    {
      "name": "options",
      "type": "ComboboxOption[]",
      "default": "undefined",
      "description": "Options with value, label, description, icon, keywords, disabled"
    },
    {
      "name": "value",
      "type": "string | null",
      "default": "undefined",
      "description": "Controlled selected value"
    },
    {
      "name": "defaultValue",
      "type": "string | null",
      "default": "null",
      "description": "Initial value (uncontrolled)"
    },
    {
      "name": "onValueChange",
      "type": "(value: string | null) => void",
      "default": "undefined",
      "description": "Selection change callback"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Select…'",
      "description": "Trigger placeholder"
    },
    {
      "name": "searchPlaceholder",
      "type": "string",
      "default": "'Search…'",
      "description": "Search input placeholder"
    },
    {
      "name": "emptyText",
      "type": "string",
      "default": "'No results.'",
      "description": "Empty state message"
    },
    {
      "name": "align",
      "type": "'start' | 'end'",
      "default": "'start'",
      "description": "Popover alignment"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables the trigger"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional class for the wrapper (set width, e.g. w-72)"
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "placeholder",
      "description": "Accessible name for the combobox"
    }
  ],
  "accessibility": [
    "role=\"combobox\" trigger + role=\"listbox\" with role=\"option\" children",
    "aria-activedescendant tracks the highlighted option; aria-disabled on disabled options",
    "Full keyboard support: ArrowDown/Up, Home/End, Enter selects, Escape closes and restores focus"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { Combobox, type ComboboxOption } from \"@/components/ui/combobox\";\n\nconst frameworks: ComboboxOption[] = [\n  { value: \"next\", label: \"Next.js\", description: \"React framework\" },\n  { value: \"remix\", label: \"Remix\", description: \"Web standards\" },\n  { value: \"astro\", label: \"Astro\", description: \"Content sites\", keywords: [\"islands\"] },\n  { value: \"vite\", label: \"Vite\", disabled: true },\n];\n\nconst [fw, setFw] = React.useState<string | null>(\"next\");\n\n<Combobox options={frameworks} value={fw} onValueChange={setFw} placeholder=\"Framework\" />",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/combobox.tsx",
      "type": "registry:ui",
      "target": "components/ui/combobox.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
