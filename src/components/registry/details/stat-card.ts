// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "stat-card",
  "name": "Stat Card",
  "tagline": "KPI tile with count-up, delta pill, and scrubable sparkline",
  "description": "A KPI tile with a count-up headline number, a direction-aware delta pill, and a scrubable sparkline. Pair several with StatGrid for a responsive metrics row that works from phones to wide dashboards.",
  "category": "Feedback",
  "badges": [
    "KPI",
    "Sparkline",
    "Data Visualization",
    "Interactive",
    "SVG"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stat-card",
  "installPromptHash": "e3a2d5c340ecd3e13877715a43102d59f62e4635cafe25721d9e254dffa90cbc",
  "features": [
    "Count-up headline number on mount that follows the sparkline while scrubbing",
    "Delta pill computes change from a previous value or accepts an explicit percentage",
    "Direction-aware coloring with goodWhen=\"down\" for churn, latency, and costs",
    "Hand-written SVG sparkline with a smooth monotone curve and gradient fill",
    "Pointer and touch scrubbing with a spring cursor and per-point labels",
    "Keyboard support with ArrowLeft, ArrowRight, and Escape",
    "StatGrid auto-fits tiles from a single mobile column to full-width rows",
    "Light and dark themes plus prefers-reduced-motion support"
  ],
  "props": [
    {
      "name": "label",
      "type": "string",
      "description": "Metric name shown above the headline number"
    },
    {
      "name": "value",
      "type": "number",
      "description": "Headline number; usually the latest point of trend"
    },
    {
      "name": "trend",
      "type": "number[]",
      "description": "Sparkline points ordered oldest to newest"
    },
    {
      "name": "trendLabels",
      "type": "string[]",
      "description": "Names for each trend point, shown while scrubbing"
    },
    {
      "name": "previous",
      "type": "number",
      "description": "Previous-period value used to compute the delta pill"
    },
    {
      "name": "delta",
      "type": "number",
      "description": "Explicit delta percentage, overriding the computed value"
    },
    {
      "name": "goodWhen",
      "type": "\"up\" | \"down\"",
      "default": "\"up\"",
      "description": "Which direction counts as positive news"
    },
    {
      "name": "period",
      "type": "string",
      "default": "\"vs previous period\"",
      "description": "Caption under the number when not scrubbing"
    },
    {
      "name": "format",
      "type": "(n: number) => string",
      "default": "Intl.NumberFormat",
      "description": "Formats the headline, labels, and aria text"
    },
    {
      "name": "color",
      "type": "string",
      "default": "CHART_COLORS[0]",
      "description": "Sparkline stroke and gradient color"
    },
    {
      "name": "animated",
      "type": "boolean",
      "default": "true",
      "description": "Counts up on mount and animates the line (disabled for reduced motion)"
    },
    {
      "name": "className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS classes for the card"
    },
    {
      "name": "StatGrid.children",
      "type": "ReactNode",
      "description": "StatCard tiles to arrange responsively"
    },
    {
      "name": "StatGrid.className",
      "type": "string",
      "default": "\"\"",
      "description": "Additional CSS classes for the grid"
    }
  ],
  "accessibility": [
    "The card is a focusable group with an aria-label announcing the value and delta direction",
    "ArrowLeft and ArrowRight scrub the sparkline and Escape clears the active point",
    "The active point is mirrored in an aria-live status region",
    "Decorative SVG pieces are aria-hidden while the sparkline exposes a trend description",
    "prefers-reduced-motion disables the count-up, line draw, and pulse animations"
  ],
  "createdAt": "2026-10-23",
  "usageCode": "import { StatCard, StatGrid } from \"@/components/ui/stat-card\";\n\nconst revenue = [41200, 42100, 41800, 43600, 44200, 45800, 47100];\n\nexport function Demo() {\n  return (\n    <StatGrid>\n      <StatCard\n        label=\"Revenue\"\n        value={revenue[revenue.length - 1]}\n        previous={revenue[0]}\n        trend={revenue}\n        period=\"Last 7 days\"\n      />\n      <StatCard\n        label=\"Churn\"\n        value={2.4}\n        previous={2.9}\n        trend={[2.9, 2.8, 2.7, 2.6, 2.5, 2.4]}\n        goodWhen=\"down\"\n        format={(n) => `${n.toFixed(1)}%`}\n        period=\"Last 6 weeks\"\n        color=\"#ff6b8b\"\n      />\n    </StatGrid>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/StatCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/stat-card.tsx"
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
