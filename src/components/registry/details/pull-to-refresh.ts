// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "pull-to-refresh",
  "name": "Pull to Refresh",
  "tagline": "Elastic pull gesture with smooth interactive line charts and async lifecycle feedback",
  "description": "A physical pull-to-refresh component and container featuring realistic elastic resistance curves, smooth cubic bezier line chart visualization with interactive point scrubbing, high/low metrics, and seamless light & dark mode compatibility.",
  "category": "Feedback",
  "badges": [
    "Gesture Physics",
    "Interactive Chart",
    "Light & Dark",
    "Touch & Pointer"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pull-to-refresh",
  "installPromptHash": "13c405fa514f5dd3e662fcaa9cd97ff28319b0dd0b1a73da6d766d02974fadb9",
  "features": [
    "Seamless Light and Dark mode theming with tuned contrast and crisp aesthetics",
    "Physical logarithmic spring resistance matching iOS and native touch physics",
    "Interactive pointer and touch chart scrubbing with realtime price and timestamp tracking",
    "Integrated financial statistics card with smooth bezier curve line chart, area fill, and endpoint glow",
    "Minimal key metrics summary row (24h High, 24h Low, Volume)",
    "Reactive time range switching (1H, 4H, 1D) with spring morph pill indicators",
    "Full async lifecycle support (idle, pulling, ready, refreshing, complete)",
    "Keyboard accessible refresh triggers (Press R or Enter) and screen reader support"
  ],
  "props": [
    {
      "name": "onRefresh",
      "type": "() => Promise<void> | void",
      "default": "undefined",
      "description": "Async or sync callback executed when released beyond threshold"
    },
    {
      "name": "threshold",
      "type": "number",
      "default": "68",
      "description": "Downward travel distance in pixels required to trigger refresh"
    },
    {
      "name": "maxPull",
      "type": "number",
      "default": "110",
      "description": "Maximum drag distance limit"
    },
    {
      "name": "resistance",
      "type": "number",
      "default": "0.45",
      "description": "Elastic resistance multiplier"
    },
    {
      "name": "refreshingHoldOffset",
      "type": "number",
      "default": "48",
      "description": "Vertical offset to hold content at while refresh resolves"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables gesture interaction"
    },
    {
      "name": "showDefaultIndicator",
      "type": "boolean",
      "default": "true",
      "description": "Show the built-in minimal circular progress indicator"
    },
    {
      "name": "children",
      "type": "React.ReactNode",
      "default": "<FinancialStatsCard />",
      "description": "Custom child content to be pulled"
    }
  ],
  "accessibility": [
    "Accessible role=\"region\" with aria-busy and aria-label attributes",
    "Full keyboard support with R key shortcut when focused",
    "Screen reader accessible hidden refresh button fallback",
    "Honors prefers-reduced-motion media query"
  ],
  "createdAt": "2026-09-24",
  "usageCode": "import { PullToRefresh, FinancialStatsCard } from \"@/components/ui/pull-to-refresh\";\n\nexport function Demo() {\n  return (\n    <PullToRefresh\n      onRefresh={async () => {\n        await new Promise((res) => setTimeout(res, 1200));\n      }}\n    >\n      <FinancialStatsCard showMetrics showActions />\n    </PullToRefresh>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/PullToRefresh.tsx",
      "type": "registry:ui",
      "target": "components/ui/pull-to-refresh.tsx"
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
