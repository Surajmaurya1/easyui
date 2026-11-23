// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "interactive-area-chart",
  "name": "Interactive Area Chart",
  "tagline": "Zero-dependency interactive SVG area chart with range morphing and scrubbing",
  "description": "A hand-written, dependency-free interactive SVG area chart with interruptible dataset morphing, Catmull-Rom spline resampling, scrubbing tooltip, and keyboard accessibility.",
  "category": "Feedback",
  "badges": [
    "SVG",
    "Area Chart",
    "Data Visualization",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/interactive-area-chart",
  "installPromptHash": "edda1a6535e69dcd224da361a18b1f2cc29d5c307eb0d078aef35eed5473a890",
  "features": [
    "Hand-crafted SVG path generation with zero charting library dependencies",
    "Interruptible dataset morphing transition between date ranges (7D, 30D, 1Y)",
    "Catmull-Rom spline interpolation for smooth curve rendering",
    "Fluid scrubbing with spring-tracked crosshair, dot, and floating tooltip",
    "Full keyboard scrubbing support using Left and Right arrow keys"
  ],
  "props": [
    {
      "name": "data",
      "type": "AreaChartData",
      "default": "DEFAULT_AREA_CHART_DATA",
      "description": "Dictionary of time-series datasets keyed by range labels (e.g. 7D, 30D, 1Y)"
    },
    {
      "name": "defaultRange",
      "type": "string",
      "default": "\"30D\"",
      "description": "Initial active range key"
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"Revenue\"",
      "description": "Chart title displayed in header"
    },
    {
      "name": "height",
      "type": "number",
      "default": "280",
      "description": "Fixed pixel height of the chart SVG area"
    },
    {
      "name": "className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS class names"
    }
  ],
  "accessibility": [
    "Accessible role=\"img\" with descriptive dynamic aria-label summarizing range and values",
    "Keyboard navigatable with ArrowLeft and ArrowRight to scrub through data points",
    "Escape key dismisses active hover tooltip and scrubber",
    "ARIA role=\"tablist\" and role=\"tab\" with aria-selected for range selection buttons",
    "Honors prefers-reduced-motion by bypassing initial line draw animation and spring delays"
  ],
  "createdAt": "2026-10-13",
  "usageCode": "import { InteractiveAreaChart } from \"@/components/ui/interactive-area-chart\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800\">\n      <InteractiveAreaChart title=\"Monthly Recurring Revenue\" />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/InteractiveAreaChart.tsx",
      "type": "registry:ui",
      "target": "components/ui/interactive-area-chart.tsx"
    }
  ],
  "featured": true
};

export default component;
