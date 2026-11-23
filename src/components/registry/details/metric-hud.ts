// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "metric-hud",
  "name": "Metric HUD",
  "tagline": "Interactive telemetry & sparkline HUD with live scrubbing",
  "description": "An interactive developer telemetry card featuring hardware-accelerated SVG sparklines, pointer-scrubbing point inspection, spring-animated time range morphing, and delta indicators.",
  "category": "Motion",
  "badges": [
    "SVG Sparklines",
    "Telemetry HUD",
    "Pointer Scrubbing"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/metric-hud",
  "installPromptHash": "c40376d2e90e08352aa1be3ef6daf014f99329f21f159c7b1918f9c416c5ab07",
  "features": [
    "Zero-dependency hardware-accelerated SVG sparkline rendering",
    "Interactive pointer crosshair scrubbing with dynamic coordinate inspection",
    "Spring-animated time-range switching (1h, 24h, 7d, 30d)",
    "Real-time delta trend badges (up / down / neutral) with status aura",
    "One-click metric value copying with validation feedback"
  ],
  "props": [
    {
      "name": "metrics",
      "type": "MetricItem[]",
      "default": "[]",
      "description": "Array of telemetry metric definitions with time-series data"
    },
    {
      "name": "timeRanges",
      "type": "string[]",
      "default": "['1h', '24h', '7d', '30d']",
      "description": "Available time window filters"
    },
    {
      "name": "defaultTimeRange",
      "type": "string",
      "default": "'24h'",
      "description": "Initial active time range"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Custom CSS container styling"
    }
  ],
  "accessibility": [
    "Semantic region container with ARIA telemetry roles",
    "Min and max values clearly labeled for assistive technologies",
    "Keyboard accessible time range selection controls"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { MetricHUD } from \"@/components/ui/metric-hud\";\n\nconst metrics = [\n  {\n    id: \"latency\",\n    label: \"p99 Latency\",\n    value: \"14.2\",\n    unit: \"ms\",\n    delta: { value: \"-18.4%\", trend: \"down\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [18, 17, 16, 15, 14, 14.2],\n      \"24h\": [24, 21, 19, 18, 16, 14.2],\n      \"7d\": [32, 28, 22, 19, 15, 14.2],\n    },\n  },\n  {\n    id: \"throughput\",\n    label: \"API Throughput\",\n    value: \"84.5k\",\n    unit: \"req/s\",\n    delta: { value: \"+12.1%\", trend: \"up\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [60, 65, 72, 78, 81, 84.5],\n      \"24h\": [40, 52, 68, 74, 80, 84.5],\n      \"7d\": [30, 45, 60, 70, 80, 84.5],\n    },\n  },\n];\n\nexport function Demo() {\n  return <MetricHUD metrics={metrics} defaultTimeRange=\"24h\" />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/MetricHUD.tsx",
      "type": "registry:ui",
      "target": "components/ui/metric-hud.tsx"
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
