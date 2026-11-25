// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "donut-chart",
  "name": "Donut Chart",
  "tagline": "Animated SVG donut and gauge chart with a live center value",
  "description": "A hand-written SVG donut and half-ring gauge with animated arcs, a live center readout, hover highlighting, and a legend that filters slices without collapsing the ring.",
  "category": "Feedback",
  "badges": [
    "SVG",
    "Donut Chart",
    "Gauge",
    "Data Visualization",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/donut-chart",
  "installPromptHash": "149dff8db2a75f3272ac141231923adc6434d5c9f8cb5dd3765eb43200c7a693",
  "features": [
    "Full donut and semi-circle gauge variants from the same component",
    "Spring-animated arcs that grow in on mount and stretch on hover or focus",
    "Animated center number that counts up to the total and switches to the hovered slice",
    "Interactive legend toggles slices while keeping at least one visible",
    "Automatically holds the legend beside the ring on wide containers and below it on mobile",
    "Zero charting library dependencies with a fully responsive SVG",
    "Honors prefers-reduced-motion for arcs, center number, and readout transitions"
  ],
  "props": [
    {
      "name": "data",
      "type": "DonutDatum[]",
      "description": "Slices with a label, numeric value, and optional color"
    },
    {
      "name": "variant",
      "type": "\"donut\" | \"semi\"",
      "default": "\"donut\"",
      "description": "Renders a full ring or a half-ring gauge"
    },
    {
      "name": "size",
      "type": "number",
      "default": "240",
      "description": "Largest diameter in pixels; the chart shrinks to fit narrow containers"
    },
    {
      "name": "thickness",
      "type": "number",
      "default": "16",
      "description": "Stroke width of the ring in pixels"
    },
    {
      "name": "centerLabel",
      "type": "string",
      "default": "\"Total\"",
      "description": "Caption shown above the total in the center"
    },
    {
      "name": "formatValue",
      "type": "(n: number) => string",
      "default": "Intl.NumberFormat",
      "description": "Formats center values, slice values, and tooltips"
    },
    {
      "name": "showLegend",
      "type": "boolean",
      "default": "true",
      "description": "Shows the interactive slice legend"
    },
    {
      "name": "animated",
      "type": "boolean",
      "default": "true",
      "description": "Enables intro and value animations (disabled for reduced motion)"
    },
    {
      "name": "ariaLabel",
      "type": "string",
      "default": "auto-generated",
      "description": "Accessible description for the chart image role"
    },
    {
      "name": "className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS classes for the chart wrapper"
    }
  ],
  "accessibility": [
    "The SVG exposes role=\"img\" with a descriptive aria-label that includes the chart type and total",
    "Legend buttons use aria-pressed to communicate whether a slice is visible",
    "Slices respond to pointer hover and keyboard focus on their legend rows",
    "The center readout announces the active slice label, value, and percentage visually",
    "prefers-reduced-motion disables arc growth, number counting, and readout transitions"
  ],
  "createdAt": "2026-10-23",
  "usageCode": "import { DonutChart } from \"@/components/ui/donut-chart\";\n\nconst data = [\n  { label: \"Compute\", value: 5240 },\n  { label: \"Storage\", value: 3180 },\n  { label: \"Bandwidth\", value: 2260 },\n  { label: \"Databases\", value: 1610 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <DonutChart\n        data={data}\n        centerLabel=\"Total spend\"\n        formatValue={(value) => `$${value.toLocaleString()}`}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/DonutChart.tsx",
      "type": "registry:ui",
      "target": "components/ui/donut-chart.tsx"
    },
    {
      "path": "src/lib/chart-primitives.tsx",
      "type": "registry:lib",
      "target": "lib/chart-primitives.tsx"
    }
  ]
};

export default component;
