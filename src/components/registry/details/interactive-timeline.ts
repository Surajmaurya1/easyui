// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "interactive-timeline",
  "name": "Interactive Timeline",
  "tagline": "Milestone & pipeline tracker with spring progress physics",
  "description": "A developer-focused milestone and deployment timeline featuring dynamic progress lines, pulsating status nodes, expandable telemetry cards, and commit hash copy.",
  "category": "Motion",
  "badges": [
    "Milestones",
    "Deployment Track",
    "Spring Physics"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/interactive-timeline",
  "installPromptHash": "db9cd482cfc42c8b245a284d4e920163893cba5e2696edc81e451c57f07bf520",
  "features": [
    "Animated continuous progress line with spring physics",
    "Interactive status nodes (completed, in-progress, pending, failed) with breathing aura",
    "Collapsible details with metrics grid and commit metadata",
    "One-click commit hash copying with feedback state",
    "Accessible semantic list and keyboard navigation structure"
  ],
  "props": [
    {
      "name": "items",
      "type": "TimelineItem[]",
      "default": "[]",
      "description": "Array of timeline step items"
    },
    {
      "name": "defaultSelectedId",
      "type": "string",
      "default": "items[0]?.id",
      "description": "ID of the item initially expanded"
    },
    {
      "name": "collapsible",
      "type": "boolean",
      "default": "true",
      "description": "Whether cards can be expanded/collapsed on click"
    },
    {
      "name": "onItemSelect",
      "type": "(item: TimelineItem) => void",
      "default": "undefined",
      "description": "Callback invoked when a timeline node or card is selected"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional CSS classes for outer container"
    }
  ],
  "accessibility": [
    "Semantic role=\"region\" and role=\"list\" with listitem hierarchy",
    "Aria-expanded and aria-controls binding on interactive items",
    "Respects prefers-reduced-motion for smooth height and line transitions",
    "Visible focus rings for keyboard navigation"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { InteractiveTimeline } from \"@/components/ui/interactive-timeline\";\n\nconst deploymentSteps = [\n  {\n    id: \"step-1\",\n    title: \"Build & Artifact Verification\",\n    timestamp: \"10:42 AM · 48s\",\n    status: \"completed\" as const,\n    tag: \"CI/CD\",\n    commitHash: \"9f8a12bc\",\n    metrics: [{ label: \"Bundle Size\", value: \"142 KB\" }, { label: \"Tree Shake\", value: \"99.4%\" }],\n  },\n  {\n    id: \"step-2\",\n    title: \"Global Edge Replication\",\n    timestamp: \"10:43 AM · Active\",\n    status: \"in-progress\" as const,\n    tag: \"Infra\",\n    description: \"Replicating immutable build layers across 32 regional edge locations.\",\n  },\n  {\n    id: \"step-3\",\n    title: \"Traffic Cutover & Smoke Test\",\n    timestamp: \"Pending\",\n    status: \"pending\" as const,\n    tag: \"DNS\",\n  },\n];\n\nexport function Demo() {\n  return <InteractiveTimeline items={deploymentSteps} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/InteractiveTimeline.tsx",
      "type": "registry:ui",
      "target": "components/ui/interactive-timeline.tsx"
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
