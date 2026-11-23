// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "calendar",
  "name": "Calendar",
  "tagline": "Gliding selection pill & directional month slides",
  "description": "A dependency-free calendar with a selected-day pill that glides from date to date, range support with a live hover preview band, and months that slide in the direction you navigate.",
  "category": "Forms",
  "badges": [
    "Layout Springs",
    "Keyboard Friendly",
    "Light & Dark",
    "Zero Dependencies"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/calendar",
  "installPromptHash": "59acf19ae78790943585ad3e6c221f7437dc218cd746c0afa69f176c32b2f702",
  "features": [
    "Selected day is one pill that springs between dates; range mode glides start and end pills separately",
    "Live hover preview band while picking a range",
    "Months slide in the navigation direction; fixed height so nothing jumps between months",
    "Single + range modes, min/max dates, and custom isDateDisabled",
    "Full keyboard navigation: arrows, Home/End, PageUp/PageDown (Shift = year)",
    "No date library — pure Intl + Date helpers"
  ],
  "props": [
    {
      "name": "mode",
      "type": "'single' | 'range'",
      "default": "'single'",
      "description": "Selection mode"
    },
    {
      "name": "value",
      "type": "Date | null | DateRange",
      "default": "undefined",
      "description": "Controlled selected date or range"
    },
    {
      "name": "defaultValue",
      "type": "Date | null | DateRange",
      "default": "null",
      "description": "Initial selection (uncontrolled)"
    },
    {
      "name": "onChange",
      "type": "(date: Date | null) => void | (range: DateRange) => void",
      "default": "undefined",
      "description": "Selection change callback"
    },
    {
      "name": "defaultMonth",
      "type": "Date",
      "default": "undefined",
      "description": "Month shown initially"
    },
    {
      "name": "minDate",
      "type": "Date",
      "default": "undefined",
      "description": "Earliest selectable date"
    },
    {
      "name": "maxDate",
      "type": "Date",
      "default": "undefined",
      "description": "Latest selectable date"
    },
    {
      "name": "isDateDisabled",
      "type": "(date: Date) => boolean",
      "default": "undefined",
      "description": "Predicate to disable specific dates"
    },
    {
      "name": "weekStartsOn",
      "type": "0 | 1",
      "default": "0",
      "description": "First day of the week (0 = Sunday, 1 = Monday)"
    },
    {
      "name": "locale",
      "type": "string",
      "default": "undefined",
      "description": "BCP 47 locale for formatting"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional class for the root"
    }
  ],
  "accessibility": [
    "role=\"grid\" with labeled rows and cells; aria-selected on picked days",
    "Full keyboard navigation with roving tabIndex and aria-live month announcements",
    "Disabled dates expose aria-disabled and skip selection"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { Calendar, type DateRange } from \"@/components/ui/calendar\";\n\n// single\nconst [date, setDate] = React.useState<Date | null>(null);\n<Calendar value={date} onChange={setDate} />\n\n// range\nconst [range, setRange] = React.useState<DateRange>({ from: null, to: null });\n<Calendar mode=\"range\" value={range} onChange={setRange} />\n\n// limits\n<Calendar minDate={new Date()} isDateDisabled={(d) => d.getDay() === 0} weekStartsOn={1} />",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/calendar.tsx",
      "type": "registry:ui",
      "target": "components/ui/calendar.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
