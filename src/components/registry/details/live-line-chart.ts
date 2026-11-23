// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "live-line-chart",
  "name": "Live Line Chart",
  "tagline": "Scrolling real-time line chart with pause, scrub, and live readout",
  "description": "A real-time line chart that scrolls right-to-left, with a large current-value readout, a live delta, and a pause control. Hover or touch the chart to freeze the stream and scrub it with a crosshair tooltip.",
  "category": "Feedback",
  "badges": [
    "SVG",
    "Live Data",
    "Line Chart",
    "Data Visualization",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/live-line-chart",
  "installPromptHash": "73a63b172a97fe98b8720577089903c4e28a727cd1302e1806598950afcfc797",
  "features": [
    "Subscribes to any push-based source such as a WebSocket, SSE stream, or interval",
    "Draws directly into the DOM at 60fps without React re-renders on every frame",
    "Auto-scaling y-range that eases smoothly as the visible window changes",
    "Hovering or touching pauses the stream and freezes the frame for inspection",
    "Crosshair tooltip shows the sampled value and how many seconds ago it arrived",
    "Large readout with a live delta and a pause/resume button",
    "Optional fixed y-domain, custom units, formatters, and colors",
    "Pauses rendering when off-screen or when the tab is hidden",
    "Container-aware sizing and prefers-reduced-motion support"
  ],
  "props": [
    {
      "name": "source",
      "type": "(push) => void | (() => void)",
      "description": "Data feed subscription; call push(value) for each new reading and return a cleanup"
    },
    {
      "name": "initial",
      "type": "number[]",
      "description": "Known values, oldest to newest, spaced intervalMs apart and ending now"
    },
    {
      "name": "intervalMs",
      "type": "number",
      "default": "1000",
      "description": "Approximate arrival interval and the smoothing delay"
    },
    {
      "name": "windowSeconds",
      "type": "number",
      "default": "60",
      "description": "Seconds visible in the scrolling window"
    },
    {
      "name": "height",
      "type": "number",
      "default": "220",
      "description": "Chart height in pixels"
    },
    {
      "name": "color",
      "type": "string",
      "default": "CHART_COLORS[0]",
      "description": "Line stroke and area gradient color"
    },
    {
      "name": "unit",
      "type": "string",
      "default": "\"\"",
      "description": "Unit shown beside the readout and tooltip values"
    },
    {
      "name": "formatValue",
      "type": "(n: number) => string",
      "default": "Intl.NumberFormat",
      "description": "Formats the current value, tooltip, and aria text"
    },
    {
      "name": "domain",
      "type": "[number, number]",
      "description": "Fixed y-range instead of auto-scaling to the visible window"
    },
    {
      "name": "showReadout",
      "type": "boolean",
      "default": "true",
      "description": "Shows the large current value, delta, and pause button"
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
    "The SVG exposes role=\"img\" with an aria-label that includes the window and current value",
    "The pause button uses aria-pressed and a descriptive resume or pause label",
    "Live updates pause on hover, touch, or pointer dismissal so touch users can inspect the frame",
    "Paused state is announced through an aria-live status region",
    "prefers-reduced-motion disables the head pulse and easing motion"
  ],
  "createdAt": "2026-10-23",
  "usageCode": "import { LiveLineChart } from \"@/components/ui/live-line-chart\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <LiveLineChart\n        initial={[1240, 1280, 1235, 1310, 1290]}\n        unit=\"req/s\"\n        height={220}\n        source={(push) => {\n          const id = setInterval(() => push(1200 + Math.random() * 300), 1000);\n          return () => clearInterval(id);\n        }}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/LiveLineChart.tsx",
      "type": "registry:ui",
      "target": "components/ui/live-line-chart.tsx"
    },
    {
      "path": "src/lib/chart-primitives.tsx",
      "type": "registry:lib",
      "target": "lib/chart-primitives.tsx"
    },
    {
      "path": "src/lib/dashboard-chart-utils.ts",
      "type": "registry:lib",
      "target": "lib/dashboard-chart-utils.ts"
    }
  ]
};

export default component;
