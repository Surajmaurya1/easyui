// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "activity-feed",
  "name": "Activity Feed",
  "tagline": "Real-time telemetry event stream with expandable audit payloads",
  "description": "A developer telemetry and audit log stream featuring category filtering, live real-time event simulation with Framer Motion slide insertions, and expandable JSON payloads.",
  "category": "Feedback",
  "badges": [
    "Audit Logs",
    "Live Stream",
    "JSON Inspector"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/activity-feed",
  "installPromptHash": "51d3e4aa5816556306e13c95b3bf1acfba53a8c32254220a2d0e4fbcbaa54b42",
  "features": [
    "Real-time simulation toggle streaming live webhook/deploy events",
    "Framer Motion layout and AnimatePresence entry transitions",
    "Category filtering (Deploy, Security, API, System) with live count tags",
    "Integrated JSON payload inspector with syntax highlighting and copy",
    "One-click trace ID copying with animated validation feedback"
  ],
  "props": [
    {
      "name": "events",
      "type": "ActivityEvent[]",
      "default": "[]",
      "description": "Array of audit or telemetry activity events"
    },
    {
      "name": "enableLiveSimulation",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the interactive simulated live stream toggle"
    },
    {
      "name": "enableFilters",
      "type": "boolean",
      "default": "true",
      "description": "Whether to display category filter pill buttons"
    },
    {
      "name": "enableSearch",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the trace search input"
    },
    {
      "name": "maxEntries",
      "type": "number",
      "default": "20",
      "description": "Maximum items retained in stream before pruning"
    },
    {
      "name": "onEventReplay",
      "type": "(event: ActivityEvent) => void",
      "default": "undefined",
      "description": "Optional callback to replay a logged event"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional custom CSS class"
    }
  ],
  "accessibility": [
    "Semantic region container with ARIA feed and log roles",
    "Accessible button controls for payload expansion and trace copy",
    "Screen reader compliant status indicators"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { ActivityFeed } from \"@/components/ui/activity-feed\";\n\nconst events = [\n  {\n    id: \"evt-1\",\n    type: \"deploy\" as const,\n    status: \"success\" as const,\n    title: \"Edge Lambda function deployed\",\n    timestamp: \"2 mins ago\",\n    description: \"Release v2.4.0 deployed to us-east-1 and eu-central-1.\",\n    duration: \"240ms\",\n    traceId: \"trc_98fa2\",\n    actor: { name: \"DeployBot\" },\n    payload: { version: \"2.4.0\", sha: \"8f3b2a\" },\n  },\n  {\n    id: \"evt-2\",\n    type: \"security\" as const,\n    status: \"warning\" as const,\n    title: \"MFA challenge requested\",\n    timestamp: \"12 mins ago\",\n    actor: { name: \"alex@company.com\" },\n  },\n];\n\nexport function Demo() {\n  return <ActivityFeed events={events} enableLiveSimulation={true} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/ActivityFeed.tsx",
      "type": "registry:ui",
      "target": "components/ui/activity-feed.tsx"
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
