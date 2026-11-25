// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "date-picker",
  "name": "Date Picker",
  "tagline": "Origin-aware popover with a spring landing",
  "description": "A date picker (and date range picker) whose popover pops from the trigger edge with a spring, flips above when there is no room below, lands the selection pill, then closes and hands focus back to the trigger.",
  "category": "Forms",
  "badges": [
    "Spring In",
    "Flip Up",
    "Keyboard Friendly",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/date-picker",
  "installPromptHash": "f70230f2e5e0b8c4d5098eeb67622a6f35760fbe99b758c2510492caa98a1d8c",
  "features": [
    "Popover scales from the trigger edge with a spring and flips above when space is tight",
    "Single date + date range pickers share the same Calendar underneath",
    "Selection pill lands before the popover closes, then focus returns to the trigger",
    "Esc and outside-click close; controlled or uncontrolled value",
    "Supports all Calendar options: minDate, maxDate, isDateDisabled, weekStartsOn, locale"
  ],
  "props": [
    {
      "name": "value",
      "type": "Date | null | DateRange",
      "default": "undefined",
      "description": "Controlled selected value"
    },
    {
      "name": "defaultValue",
      "type": "Date | null | DateRange",
      "default": "null",
      "description": "Initial value (uncontrolled)"
    },
    {
      "name": "onChange",
      "type": "(date: Date | null) => void | (range: DateRange) => void",
      "default": "undefined",
      "description": "Selection change callback"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Pick a date' / 'Pick a range'",
      "description": "Trigger placeholder text"
    },
    {
      "name": "align",
      "type": "'start' | 'end'",
      "default": "'start'",
      "description": "Popover alignment relative to the trigger"
    },
    {
      "name": "side",
      "type": "'bottom' | 'top' | 'auto'",
      "default": "'auto'",
      "description": "Popover placement; 'auto' opens downward on mobile and flips on desktop when tight"
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
      "description": "Additional class for the wrapper (set width, e.g. w-80)"
    }
  ],
  "accessibility": [
    "Trigger has aria-haspopup=\"dialog\" and aria-expanded",
    "Popover closes on Escape and returns focus to the trigger",
    "Calendar inside is fully keyboard navigable"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { DatePicker, DateRangePicker } from \"@/components/ui/date-picker\";\n\n<DatePicker value={date} onChange={setDate} placeholder=\"Due date\" minDate={new Date()} />\n\n<DateRangePicker value={range} onChange={setRange} />",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/date-picker.tsx",
      "type": "registry:ui",
      "target": "components/ui/date-picker.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/components/ui/calendar.tsx",
      "type": "registry:ui",
      "target": "components/ui/calendar.tsx"
    }
  ]
};

export default component;
