// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "ai-agent-activity",
  "name": "AI Agent Activity",
  "tagline": "Real-time AI agent tool call execution trace and reasoning timeline",
  "description": "A timeline component for tracking AI agent reasoning, tool calls, API queries, database fetches, and execution states with inspectable parameters and results.",
  "category": "Feedback",
  "badges": [
    "AI",
    "Agent",
    "Timeline",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ai-agent-activity",
  "installPromptHash": "3ac17924046cb5c3dd71216b9484c475b96ced7288a18154f09e4949eef21499",
  "features": [
    "Real-time execution timeline supporting thinking, searching, reading, tool execution, API calls, and code running",
    "Interactive status indicators for pending, running (with active spinner), completed, error, and cancelled states",
    "Expandable inspector drawer displaying structured inputs, outputs, JSON payloads, and executed code snippets",
    "Step duration tracking and metadata telemetry badges for deep performance inspection",
    "One-click global Expand All and Collapse All control buttons in the header",
    "Smooth Framer Motion layout transitions tuned to physical spring tokens"
  ],
  "props": [
    {
      "name": "activities",
      "type": "AgentActivityItemData[]",
      "default": "[]",
      "description": "Array of activity steps representing the agent execution plan and execution trace"
    },
    {
      "name": "isRunning",
      "type": "boolean",
      "default": "false",
      "description": "Indicates whether the agent is currently executing steps in the background"
    },
    {
      "name": "title",
      "type": "string",
      "default": "'Activity'",
      "description": "Title displayed in the activity header"
    },
    {
      "name": "agentName",
      "type": "string",
      "default": "undefined",
      "description": "Optional agent or pipeline name displayed beside the title"
    },
    {
      "name": "defaultExpandedIds",
      "type": "string[]",
      "default": "[]",
      "description": "IDs of activity items that should start in an expanded state"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Custom Tailwind class names for styling overrides"
    }
  ],
  "accessibility": [
    "Accessible timeline semantics with ARIA expanded states on expandable detail panels",
    "Active running steps indicate animated progress with affirmative textual status badges for screen readers",
    "Full keyboard navigation allowing users to tab through steps and expand/collapse details using Enter or Spacebar"
  ],
  "createdAt": "2026-09-21",
  "usageCode": "import { AIAgentActivity, type AgentActivityItemData } from \"@/components/ui/ai-agent-activity\";\n\nexport function Demo() {\n  const activities: AgentActivityItemData[] = [\n    { id: '1', type: 'thinking', title: 'Analyze request', status: 'success', duration: '42ms' },\n    { id: '2', type: 'searching', title: 'Search tokens', status: 'success', duration: '94ms' },\n    { id: '3', type: 'code_execution', title: 'Generate scaffold', status: 'running' },\n  ];\n\n  return (\n    <AIAgentActivity\n      activities={activities}\n      isRunning={true}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/AIAgentActivity.tsx",
      "type": "registry:ui",
      "target": "components/ui/ai-agent-activity.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
