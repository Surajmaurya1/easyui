// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "traffic-card",
  "name": "Traffic Card",
  "tagline": "Traffic total with a Day / Week switcher and stacked capsule columns",
  "description": "A compact traffic block with a count-up visit total, a Day / Week switcher, and a stacked column chart where every channel is its own rounded capsule. Built with hand-written SVG, light and dark themes, and full keyboard support.",
  "category": "Feedback",
  "badges": [
    "KPI",
    "Stacked Chart",
    "Data Visualization",
    "Interactive",
    "SVG"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/traffic-card",
  "installPromptHash": "f73374465e3c8c7fc0c290f186ccad1465619d2f5f5eaafa648a6b47e7b52942",
  "features": [
    "Big visit count that counts up on mount and on every range change",
    "Day / Week segmented control with a spring-sliding active indicator",
    "Stacked columns render each channel as an independent rounded capsule",
    "Columns scale to the tallest interval and keep a minimum width on narrow cards",
    "Pointer and touch scrubbing with a spring-tracked tooltip that glides beside the column",
    "A ring wraps the whole hovered stack while the other columns recede toward the card colour",
    "Keyboard support with ArrowLeft, ArrowRight, Home, End, and Escape",
    "Hand-written SVG with a hidden data table for assistive technology",
    "Light and dark themes plus prefers-reduced-motion support"
  ],
  "props": [
    {
      "name": "ranges",
      "type": "TrafficRange[]",
      "description": "Switchable ranges, each with its own points, caption, and optional total"
    },
    {
      "name": "channels",
      "type": "TrafficChannel[]",
      "description": "Channel definitions rendered bottom-to-top in every stacked column"
    },
    {
      "name": "defaultRange",
      "type": "string",
      "default": "first range",
      "description": "Range id selected on first render"
    },
    {
      "name": "onRangeChange",
      "type": "(id: string) => void",
      "description": "Called when the visitor switches the Day / Week control"
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"Traffic\"",
      "description": "Heading shown at the top of the card"
    },
    {
      "name": "unit",
      "type": "string",
      "default": "\"visits\"",
      "description": "Noun displayed beside the headline number"
    },
    {
      "name": "format",
      "type": "(n: number) => string",
      "default": "rounded Intl.NumberFormat",
      "description": "Formats the headline, tooltip values, and screen-reader table"
    },
    {
      "name": "height",
      "type": "number",
      "default": "132",
      "description": "Chart height in pixels"
    },
    {
      "name": "animated",
      "type": "boolean",
      "default": "true",
      "description": "Count-up and column entrance animations (disabled for reduced motion)"
    },
    {
      "name": "className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS classes for the card"
    },
    {
      "name": "TrafficRange.points",
      "type": "TrafficPoint[]",
      "description": "One column per entry, ordered oldest to newest"
    },
    {
      "name": "TrafficPoint.values",
      "type": "Record<string, number>",
      "description": "Channel id → visits for that interval"
    },
    {
      "name": "TrafficChannel.color",
      "type": "string",
      "description": "Optional CSS color; defaults to the built-in traffic palette"
    }
  ],
  "accessibility": [
    "The chart is a focusable image with an aria-label describing the channels and visible interval",
    "ArrowLeft, ArrowRight, Home, and End move between intervals, and Escape dismisses the tooltip",
    "The active interval and its total are mirrored in a polite live region",
    "A visually hidden data table exposes every channel value per interval",
    "The Day / Week control is a labelled radiogroup with aria-checked state",
    "prefers-reduced-motion removes the count-up, column, and indicator animations"
  ],
  "createdAt": "2026-11-17",
  "usageCode": "import { TrafficCard } from \"@/components/ui/traffic-card\";\n\nconst channels = [\n  { id: \"direct\", label: \"Direct\" },\n  { id: \"referral\", label: \"Referral\" },\n  { id: \"social\", label: \"Social\" },\n  { id: \"search\", label: \"Search\" },\n  { id: \"paid\", label: \"Paid\" },\n];\n\nconst ranges = [\n  {\n    id: \"day\",\n    label: \"Day\",\n    caption: \"Last 22 days\",\n    points: [\n      { label: \"Oct 27\", values: { direct: 210, referral: 340, social: 402, search: 268, paid: 246 } },\n      { label: \"Oct 28\", values: { direct: 246, referral: 372, social: 438, search: 301, paid: 289 } },\n      // …one point per column\n    ],\n  },\n  {\n    id: \"week\",\n    label: \"Week\",\n    caption: \"Last 22 weeks\",\n    points: [\n      { label: \"Jun 22\", values: { direct: 812, referral: 1290, social: 1520, search: 1040, paid: 960 } },\n      // …one point per column\n    ],\n  },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-[380px]\">\n      <TrafficCard channels={channels} ranges={ranges} />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/TrafficCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/traffic-card.tsx"
    },
    {
      "path": "src/lib/chart-primitives.tsx",
      "type": "registry:lib",
      "target": "lib/chart-primitives.tsx"
    }
  ]
};

export default component;
