// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = [
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Activity Feed component into my project.\n\nA developer telemetry and audit log stream featuring category filtering, live real-time event simulation with Framer Motion slide insertions, and expandable JSON payloads.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/activity-feed\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ActivityFeed } from \"@/components/ui/activity-feed\";\n\nconst events = [\n  {\n    id: \"evt-1\",\n    type: \"deploy\" as const,\n    status: \"success\" as const,\n    title: \"Edge Lambda function deployed\",\n    timestamp: \"2 mins ago\",\n    description: \"Release v2.4.0 deployed to us-east-1 and eu-central-1.\",\n    duration: \"240ms\",\n    traceId: \"trc_98fa2\",\n    actor: { name: \"DeployBot\" },\n    payload: { version: \"2.4.0\", sha: \"8f3b2a\" },\n  },\n  {\n    id: \"evt-2\",\n    type: \"security\" as const,\n    status: \"warning\" as const,\n    title: \"MFA challenge requested\",\n    timestamp: \"12 mins ago\",\n    actor: { name: \"alex@company.com\" },\n  },\n];\n\nexport function Demo() {\n  return <ActivityFeed events={events} enableLiveSimulation={true} />;\n}\n```\n\nDeclared props:\n- `events` (ActivityEvent[]); default: [] — Array of audit or telemetry activity events\n- `enableLiveSimulation` (boolean); default: true — Whether to show the interactive simulated live stream toggle\n- `enableFilters` (boolean); default: true — Whether to display category filter pill buttons\n- `enableSearch` (boolean); default: true — Whether to show the trace search input\n- `maxEntries` (number); default: 20 — Maximum items retained in stream before pruning\n- `onEventReplay` ((event: ActivityEvent) => void); default: undefined — Optional callback to replay a logged event\n- `className` (string); default: undefined — Optional custom CSS class\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/activity-feed.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "activity-heatmap",
    "name": "Activity Heatmap",
    "tagline": "Responsive contribution calendar and weekday-by-hour activity grid",
    "description": "A GitHub-style contribution calendar and weekday-by-hour activity grid with automatic column fitting, quarterly color levels, hover tooltips, and keyboard navigation.",
    "category": "Feedback",
    "badges": [
      "SVG",
      "Heatmap",
      "Data Visualization",
      "Calendar",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/activity-heatmap",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Activity Heatmap component into my project.\n\nA GitHub-style contribution calendar and weekday-by-hour activity grid with automatic column fitting, quarterly color levels, hover tooltips, and keyboard navigation.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/activity-heatmap\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ActivityHeatmap } from \"@/components/ui/activity-heatmap\";\n\nconst data = [\n  { date: \"2026-10-18\", value: 3 },\n  { date: \"2026-10-19\", value: 9 },\n  { date: \"2026-10-20\", value: 5 },\n  { date: \"2026-10-21\", value: 12 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-3xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <ActivityHeatmap data={data} weekStart={1} unit=\"contributions\" />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `mode` (\"calendar\" | \"hours\"); default: \"calendar\" — One cell per day or a weekday-by-hour grid\n- `data` (HeatDay[]) — Calendar data as { date: \"YYYY-MM-DD\" | Date, value: number } entries\n- `matrix` (number[][]) — Hours-mode matrix with 7 rows (weekdays) and 24 columns (hours)\n- `rowLabels` (string[]); default: [\"Mon\", … , \"Sun\"] — Row names used in hours mode\n- `weeks` (number); default: 53 — Maximum number of weeks to show in calendar mode\n- `endDate` (string | Date) — Last day displayed; defaults to the latest date in the data\n- `weekStart` (0 | 1); default: 0 — First day of the week: 0 for Sunday, 1 for Monday\n- `color` (string); default: \"#34d399\" — Base color mixed into the activity levels\n- `unit` (string); default: \"contributions\" — Plural noun used in the summary and tooltip\n- `minCell` (number); default: 11 — Smallest cell size before calendar columns are dropped\n- `animated` (boolean); default: true — Enables the staggered cell entrance animation\n- `ariaLabel` (string); default: auto-generated — Accessible description for the heatmap image role\n- `className` (string); default: \"\" — Additional CSS classes for the heatmap wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/activity-heatmap.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "9989a2ccab5e5f617782a2271c559d3e54721ef1f15fbde12da39166ef63ff58",
    "features": [
      "Calendar mode renders one cell per day in a GitHub-style contribution grid",
      "Hours mode renders a 7 × 24 weekday-by-hour matrix with crosshair bands",
      "Automatically drops columns on narrow screens so cells never fall below the minimum size",
      "Quartile-based color levels adapt to the actual data distribution",
      "Month and weekday labels collapse intelligently as the container narrows",
      "Summary line reports total activity and the peak day or cell",
      "Tooltip follows the active cell with a spring-tracked position and live region updates",
      "Honors prefers-reduced-motion by removing the staggered cell entrance animation"
    ],
    "props": [
      {
        "name": "mode",
        "type": "\"calendar\" | \"hours\"",
        "default": "\"calendar\"",
        "description": "One cell per day or a weekday-by-hour grid"
      },
      {
        "name": "data",
        "type": "HeatDay[]",
        "description": "Calendar data as { date: \"YYYY-MM-DD\" | Date, value: number } entries"
      },
      {
        "name": "matrix",
        "type": "number[][]",
        "description": "Hours-mode matrix with 7 rows (weekdays) and 24 columns (hours)"
      },
      {
        "name": "rowLabels",
        "type": "string[]",
        "default": "[\"Mon\", … , \"Sun\"]",
        "description": "Row names used in hours mode"
      },
      {
        "name": "weeks",
        "type": "number",
        "default": "53",
        "description": "Maximum number of weeks to show in calendar mode"
      },
      {
        "name": "endDate",
        "type": "string | Date",
        "description": "Last day displayed; defaults to the latest date in the data"
      },
      {
        "name": "weekStart",
        "type": "0 | 1",
        "default": "0",
        "description": "First day of the week: 0 for Sunday, 1 for Monday"
      },
      {
        "name": "color",
        "type": "string",
        "default": "\"#34d399\"",
        "description": "Base color mixed into the activity levels"
      },
      {
        "name": "unit",
        "type": "string",
        "default": "\"contributions\"",
        "description": "Plural noun used in the summary and tooltip"
      },
      {
        "name": "minCell",
        "type": "number",
        "default": "11",
        "description": "Smallest cell size before calendar columns are dropped"
      },
      {
        "name": "animated",
        "type": "boolean",
        "default": "true",
        "description": "Enables the staggered cell entrance animation"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "auto-generated",
        "description": "Accessible description for the heatmap image role"
      },
      {
        "name": "className",
        "type": "string",
        "default": "\"\"",
        "description": "Additional CSS classes for the heatmap wrapper"
      }
    ],
    "accessibility": [
      "The SVG exposes role=\"img\" with an aria-label that includes the total activity summary",
      "Arrow keys move the active cell, and Escape dismisses the tooltip",
      "A polite live region announces the active cell date and value for screen readers",
      "Every cell carries a descriptive date title used by the floating tooltip",
      "Reduced-motion users skip the staggered cell entrance animation"
    ],
    "createdAt": "2026-10-23",
    "usageCode": "import { ActivityHeatmap } from \"@/components/ui/activity-heatmap\";\n\nconst data = [\n  { date: \"2026-10-18\", value: 3 },\n  { date: \"2026-10-19\", value: 9 },\n  { date: \"2026-10-20\", value: 5 },\n  { date: \"2026-10-21\", value: 12 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-3xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <ActivityHeatmap data={data} weekStart={1} unit=\"contributions\" />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/ActivityHeatmap.tsx",
        "type": "registry:ui",
        "target": "components/ui/activity-heatmap.tsx"
      },
      {
        "path": "src/lib/chart-primitives.tsx",
        "type": "registry:lib",
        "target": "lib/chart-primitives.tsx"
      }
    ]
  },
  {
    "id": "advanced-data-table",
    "name": "Advanced Data Table",
    "tagline": "Enterprise-grade data table with sorting, filtering, selection, and expandable rows",
    "description": "A powerful, accessible data table component with multi-column sorting, faceted filters, global search, row selection, bulk actions, expandable sub-rows, and pagination.",
    "category": "Forms",
    "badges": [
      "Table",
      "Interactive",
      "Enterprise",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/advanced-data-table",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Advanced Data Table component into my project.\n\nA powerful, accessible data table component with multi-column sorting, faceted filters, global search, row selection, bulk actions, expandable sub-rows, and pagination.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/advanced-data-table\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AdvancedDataTable, type ColumnDef } from \"@/components/ui/advanced-data-table\";\n\ninterface UserRecord {\n  id: string;\n  name: string;\n  role: string;\n  status: 'active' | 'pending';\n}\n\nconst columns: ColumnDef<UserRecord>[] = [\n  { id: 'name', header: 'User', accessorKey: 'name', sortable: true },\n  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },\n  { id: 'status', header: 'Status', accessorKey: 'status', filterable: true },\n];\n\nexport function Demo() {\n  const data: UserRecord[] = [\n    { id: '1', name: 'Alex Chen', role: 'Engineer', status: 'active' },\n    { id: '2', name: 'Elena Rostova', role: 'Designer', status: 'pending' },\n  ];\n\n  return (\n    <AdvancedDataTable\n      title=\"Team Members\"\n      data={data}\n      columns={columns}\n      onBulkDelete={(ids) => console.log('Delete:', ids)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `data` (T[]); default: [] — Array of data records to render in the table\n- `columns` (ColumnDef<T>[]); default: [] — Column configuration defining headers, accessors, sorting, filtering, and custom cell renderers\n- `title` (string); default: undefined — Optional table title displayed in the toolbar\n- `searchPlaceholder` (string); default: 'Search records...' — Placeholder text for the global search input\n- `defaultPageSize` (number); default: 10 — Initial number of records to show per page\n- `renderSubComponent` ((row: T) => ReactNode); default: undefined — Render prop function for expandable row sub-details\n- `onBulkDelete` ((selectedIds: string[]) => void); default: undefined — Callback fired when user executes bulk deletion\n- `onBulkExport` ((selectedIds: string[]) => void); default: undefined — Callback fired when user clicks bulk export\n- `isLoading` (boolean); default: false — Renders animated skeleton placeholders when true\n- `error` (string | null); default: null — Renders an error state banner when present\n- `className` (string); default: undefined — Custom Tailwind class names for styling overrides\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/advanced-data-table.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8aa73349cf60af6e4c7b9376d241314d1a479689d3b8229ab43543da115ff4cc",
    "features": [
      "Multi-state column sorting with clean directional indicator icons",
      "Global live search with instant filtering across all data fields",
      "Faceted filter chips with multi-selection and reset counters",
      "Indeterminate select-all checkbox, row selection, and animated bulk actions drawer",
      "Smooth Framer Motion expandable rows for nested data and telemetry inspection",
      "Configurable pagination with page size dropdown and first/last page jump buttons",
      "Dynamic column visibility toggle menu to hide or show columns on demand",
      "Polished skeleton loading and informative empty state with clear filters trigger"
    ],
    "props": [
      {
        "name": "data",
        "type": "T[]",
        "default": "[]",
        "description": "Array of data records to render in the table"
      },
      {
        "name": "columns",
        "type": "ColumnDef<T>[]",
        "default": "[]",
        "description": "Column configuration defining headers, accessors, sorting, filtering, and custom cell renderers"
      },
      {
        "name": "title",
        "type": "string",
        "default": "undefined",
        "description": "Optional table title displayed in the toolbar"
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "'Search records...'",
        "description": "Placeholder text for the global search input"
      },
      {
        "name": "defaultPageSize",
        "type": "number",
        "default": "10",
        "description": "Initial number of records to show per page"
      },
      {
        "name": "renderSubComponent",
        "type": "(row: T) => ReactNode",
        "default": "undefined",
        "description": "Render prop function for expandable row sub-details"
      },
      {
        "name": "onBulkDelete",
        "type": "(selectedIds: string[]) => void",
        "default": "undefined",
        "description": "Callback fired when user executes bulk deletion"
      },
      {
        "name": "onBulkExport",
        "type": "(selectedIds: string[]) => void",
        "default": "undefined",
        "description": "Callback fired when user clicks bulk export"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Renders animated skeleton placeholders when true"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Renders an error state banner when present"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom Tailwind class names for styling overrides"
      }
    ],
    "accessibility": [
      "Uses semantic HTML <table>, <thead>, <tbody>, <th>, <tr>, <td> elements with appropriate ARIA attributes",
      "Select-all checkbox supports aria-label and programmatic HTML indeterminate state",
      "Expandable row triggers declare aria-expanded and descriptive screen-reader labels",
      "Sortable header buttons announce current sort direction via text and icons",
      "Full keyboard navigation support with visible focus rings on all interactive elements"
    ],
    "createdAt": "2026-09-21",
    "usageCode": "import { AdvancedDataTable, type ColumnDef } from \"@/components/ui/advanced-data-table\";\n\ninterface UserRecord {\n  id: string;\n  name: string;\n  role: string;\n  status: 'active' | 'pending';\n}\n\nconst columns: ColumnDef<UserRecord>[] = [\n  { id: 'name', header: 'User', accessorKey: 'name', sortable: true },\n  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },\n  { id: 'status', header: 'Status', accessorKey: 'status', filterable: true },\n];\n\nexport function Demo() {\n  const data: UserRecord[] = [\n    { id: '1', name: 'Alex Chen', role: 'Engineer', status: 'active' },\n    { id: '2', name: 'Elena Rostova', role: 'Designer', status: 'pending' },\n  ];\n\n  return (\n    <AdvancedDataTable\n      title=\"Team Members\"\n      data={data}\n      columns={columns}\n      onBulkDelete={(ids) => console.log('Delete:', ids)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/AdvancedDataTable.tsx",
        "type": "registry:ui",
        "target": "components/ui/advanced-data-table.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI AI Agent Activity component into my project.\n\nA timeline component for tracking AI agent reasoning, tool calls, API queries, database fetches, and execution states with inspectable parameters and results.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/ai-agent-activity\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AIAgentActivity, type AgentActivityItemData } from \"@/components/ui/ai-agent-activity\";\n\nexport function Demo() {\n  const activities: AgentActivityItemData[] = [\n    { id: '1', type: 'thinking', title: 'Analyze request', status: 'success', duration: '42ms' },\n    { id: '2', type: 'searching', title: 'Search tokens', status: 'success', duration: '94ms' },\n    { id: '3', type: 'code_execution', title: 'Generate scaffold', status: 'running' },\n  ];\n\n  return (\n    <AIAgentActivity\n      activities={activities}\n      isRunning={true}\n    />\n  );\n}\n```\n\nDeclared props:\n- `activities` (AgentActivityItemData[]); default: [] — Array of activity steps representing the agent execution plan and execution trace\n- `isRunning` (boolean); default: false — Indicates whether the agent is currently executing steps in the background\n- `title` (string); default: 'Activity' — Title displayed in the activity header\n- `agentName` (string); default: undefined — Optional agent or pipeline name displayed beside the title\n- `defaultExpandedIds` (string[]); default: [] — IDs of activity items that should start in an expanded state\n- `className` (string); default: undefined — Custom Tailwind class names for styling overrides\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/ai-agent-activity.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "ai-image-reveal",
    "name": "AI Image Reveal",
    "tagline": "Reveal generated images through a particle mosaic",
    "description": "A particle cloud gathers into a finished image, then resolves from a noisy mosaic into a sharp result.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Framer Motion",
      "Reduced Motion",
      "AI UI"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ai-image-reveal",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI AI Image Reveal component into my project.\n\nA particle cloud gathers into a finished image, then resolves from a noisy mosaic into a sharp result.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/ai-image-reveal\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AIImageReveal } from \"@/components/ui/AIImageReveal\";\n\nconst imageUrl = \"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85\";\n\nexport function Demo() {\n  return (\n    <AIImageReveal\n      src={imageUrl}\n      alt=\"Mountain lake at sunset\"\n      prompt=\"A quiet lake beneath the mountains\"\n      aspectRatio={4 / 3}\n    />\n  );\n}\n```\n\nDeclared props:\n- `src` (string | null); default: undefined — Public image URL to reveal; omit while generating.\n- `alt` (string) — Alternative text for the finished image.\n- `generating` (boolean); default: derived from src — Force the generating state while an image URL is present.\n- `aspectRatio` (number); default: 1 — Width divided by height of the image frame.\n- `prompt` (string) — Optional caption displayed below the image.\n- `generatingLabel` (string); default: Generating… — Status pill label while waiting or gathering.\n- `colors` (string[]) — Optional particle palette as hex colors.\n- `density` (number); default: 1 — Particle density multiplier from 0.4 to 2.\n- `duration` (number); default: 3.2 — Reveal duration in seconds.\n- `crossOrigin` (\"anonymous\" | \"use-credentials\" | \"\"); default: \"anonymous\" — Cross-origin mode used when loading the image.\n- `onReveal` (() => void) — Called after the image reveal completes.\n- `onImageError` (() => void) — Called if the image URL cannot be loaded.\n- `ref` (AIImageRevealHandle) — Exposes replay() to play the reveal again.\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/ai-image-reveal.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "78c0fede832a4e68d19b760f4d2c9c04a49d093a51831f71e6eb051f08f23b27",
    "features": [
      "Animated idle particles while an image is generating",
      "Particles gather into image colors before the image resolves",
      "Handles cross-origin images with a graceful generic color fallback",
      "Honors reduced-motion preferences and pauses offscreen rendering",
      "Includes replay controls and accessible loading status"
    ],
    "props": [
      {
        "name": "src",
        "type": "string | null",
        "default": "undefined",
        "description": "Public image URL to reveal; omit while generating."
      },
      {
        "name": "alt",
        "type": "string",
        "description": "Alternative text for the finished image."
      },
      {
        "name": "generating",
        "type": "boolean",
        "default": "derived from src",
        "description": "Force the generating state while an image URL is present."
      },
      {
        "name": "aspectRatio",
        "type": "number",
        "default": "1",
        "description": "Width divided by height of the image frame."
      },
      {
        "name": "prompt",
        "type": "string",
        "description": "Optional caption displayed below the image."
      },
      {
        "name": "generatingLabel",
        "type": "string",
        "default": "Generating…",
        "description": "Status pill label while waiting or gathering."
      },
      {
        "name": "colors",
        "type": "string[]",
        "description": "Optional particle palette as hex colors."
      },
      {
        "name": "density",
        "type": "number",
        "default": "1",
        "description": "Particle density multiplier from 0.4 to 2."
      },
      {
        "name": "duration",
        "type": "number",
        "default": "3.2",
        "description": "Reveal duration in seconds."
      },
      {
        "name": "crossOrigin",
        "type": "\"anonymous\" | \"use-credentials\" | \"\"",
        "default": "\"anonymous\"",
        "description": "Cross-origin mode used when loading the image."
      },
      {
        "name": "onReveal",
        "type": "() => void",
        "description": "Called after the image reveal completes."
      },
      {
        "name": "onImageError",
        "type": "() => void",
        "description": "Called if the image URL cannot be loaded."
      },
      {
        "name": "ref",
        "type": "AIImageRevealHandle",
        "description": "Exposes replay() to play the reveal again."
      }
    ],
    "accessibility": [
      "The finished image receives the supplied alt text.",
      "A live status announces image generation and completion.",
      "Canvas decoration is hidden from assistive technology.",
      "Reduced-motion preferences replace particle animation with a calm fallback."
    ],
    "createdAt": "2026-11-20",
    "usageCode": "import { AIImageReveal } from \"@/components/ui/AIImageReveal\";\n\nconst imageUrl = \"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85\";\n\nexport function Demo() {\n  return (\n    <AIImageReveal\n      src={imageUrl}\n      alt=\"Mountain lake at sunset\"\n      prompt=\"A quiet lake beneath the mountains\"\n      aspectRatio={4 / 3}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/AIImageReveal.tsx",
        "type": "registry:ui",
        "target": "components/ui/ai-image-reveal.tsx"
      }
    ]
  },
  {
    "id": "ai-response",
    "name": "AI Response",
    "tagline": "Production-ready streaming AI response with sources and actions",
    "description": "A production-ready, accessible AI response component supporting streaming markdown, syntax-styled code blocks, citations, feedback actions, and tool execution status.",
    "category": "Feedback",
    "badges": [
      "AI",
      "Streaming",
      "Markdown",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ai-response",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI AI Response component into my project.\n\nA production-ready, accessible AI response component supporting streaming markdown, syntax-styled code blocks, citations, feedback actions, and tool execution status.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/ai-response\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AIResponse, AIResponseHeader, AIResponseContent, AIResponseSources, AIResponseActions } from \"@/components/ui/ai-response\";\n\nexport function Demo() {\n  return (\n    <AIResponse\n      status=\"complete\"\n      modelName=\"Claude 3.7 Sonnet\"\n      content=\"Here is a verified solution using **EasyUI** motion tokens:\\n\\n```typescript\\nimport { motionTransitions } from '@/lib/motion-tokens';\\n\\nexport const config = motionTransitions.springSnappy;\\n```\"\n      sources={[\n        { id: 1, title: \"EasyUI Motion Tokens\", url: \"https://easyui.pro/docs\" },\n        { id: 2, title: \"Framer Motion Spring Spec\", url: \"https://www.framer.com/motion/\" }\n      ]}\n      onRegenerate={() => console.log('Regenerating...')}\n    />\n  );\n}\n```\n\nDeclared props:\n- `content` (string); default: '' — Markdown or plain text response generated by the AI model\n- `status` ('idle' | 'generating' | 'streaming' | 'complete' | 'error' | 'cancelled'); default: 'complete' — Current generation lifecycle state\n- `modelName` (string); default: 'EasyAI 2.0' — Model identifier badge displayed in header\n- `sources` (AIResponseSource[]); default: [] — Array of citations or references referenced in the answer\n- `onRegenerate` (() => void); default: undefined — Optional callback fired when the user clicks the regenerate button\n- `onFeedback` ((type: 'like' | 'dislike') => void); default: undefined — Optional callback fired when the user provides quality feedback\n- `children` (ReactNode); default: undefined — Optional custom composition using AIResponse compound subcomponents\n- `className` (string); default: undefined — Custom Tailwind class names for styling overrides\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/ai-response.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "37f0ee49a1111a1b62ed1b889145c8a3868e788124d8d2ee1bb6f8861ca60c08",
    "features": [
      "Progressive streaming state with typing indicator and loading skeleton",
      "Rich Markdown rendering with headings, lists, blockquotes, and tables",
      "Syntax-highlighted code blocks with dedicated one-click copy buttons",
      "Composable cited sources list with expandable link pills and previews",
      "Built-in user feedback actions (Copy, Regenerate, Like, Dislike)",
      "Seamless integration with Agent Activity and tool execution traces",
      "Fully accessible keyboard navigation and ARIA live regions for streaming updates"
    ],
    "props": [
      {
        "name": "content",
        "type": "string",
        "default": "''",
        "description": "Markdown or plain text response generated by the AI model"
      },
      {
        "name": "status",
        "type": "'idle' | 'generating' | 'streaming' | 'complete' | 'error' | 'cancelled'",
        "default": "'complete'",
        "description": "Current generation lifecycle state"
      },
      {
        "name": "modelName",
        "type": "string",
        "default": "'EasyAI 2.0'",
        "description": "Model identifier badge displayed in header"
      },
      {
        "name": "sources",
        "type": "AIResponseSource[]",
        "default": "[]",
        "description": "Array of citations or references referenced in the answer"
      },
      {
        "name": "onRegenerate",
        "type": "() => void",
        "default": "undefined",
        "description": "Optional callback fired when the user clicks the regenerate button"
      },
      {
        "name": "onFeedback",
        "type": "(type: 'like' | 'dislike') => void",
        "default": "undefined",
        "description": "Optional callback fired when the user provides quality feedback"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Optional custom composition using AIResponse compound subcomponents"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom Tailwind class names for styling overrides"
      }
    ],
    "accessibility": [
      "Uses semantic role=\"region\" with aria-live=\"polite\" for screen-reader streaming announcements",
      "All interactive controls (Copy, Like, Dislike, Links) feature explicit focus-visible rings and ARIA labels",
      "Code blocks feature keyboard-accessible copy triggers with affirmative screen-reader labels",
      "Respects reduced motion preferences through soft, non-intrusive physics springs"
    ],
    "createdAt": "2026-09-21",
    "usageCode": "import { AIResponse, AIResponseHeader, AIResponseContent, AIResponseSources, AIResponseActions } from \"@/components/ui/ai-response\";\n\nexport function Demo() {\n  return (\n    <AIResponse\n      status=\"complete\"\n      modelName=\"Claude 3.7 Sonnet\"\n      content=\"Here is a verified solution using **EasyUI** motion tokens:\\n\\n```typescript\\nimport { motionTransitions } from '@/lib/motion-tokens';\\n\\nexport const config = motionTransitions.springSnappy;\\n```\"\n      sources={[\n        { id: 1, title: \"EasyUI Motion Tokens\", url: \"https://easyui.pro/docs\" },\n        { id: 2, title: \"Framer Motion Spring Spec\", url: \"https://www.framer.com/motion/\" }\n      ]}\n      onRegenerate={() => console.log('Regenerating...')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AIResponse.tsx",
        "type": "registry:ui",
        "target": "components/ui/ai-response.tsx"
      }
    ]
  },
  {
    "id": "airport-matrix-clock",
    "name": "Airport Matrix Clock",
    "tagline": "World time, one rolling matrix character at a time",
    "description": "A live world clock that renders local times and city names as crisp dot-matrix characters with restrained, character-level rolling transitions.",
    "category": "Motion",
    "badges": [
      "Live Time",
      "Dot Matrix",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/airport-matrix-clock",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Airport Matrix Clock component into my project.\n\nA live world clock that renders local times and city names as crisp dot-matrix characters with restrained, character-level rolling transitions.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/airport-matrix-clock\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AirportMatrixClock } from \"@/components/ui/airport-matrix-clock\";\n\nexport function WorldClocks() {\n  return (\n    <AirportMatrixClock\n      cities={[\"los-angeles\", \"london\", \"tokyo\"]}\n      format=\"24h\"\n    />\n  );\n}\n\n// India: new-delhi, mumbai, bengaluru, hyderabad, chennai, kolkata, lucknow,\n// ahmedabad, pune, jaipur, varanasi. United States: new-york, los-angeles,\n// san-francisco, chicago, houston, miami, seattle, boston. United Kingdom:\n// london, manchester, birmingham, edinburgh, glasgow. UAE: dubai, abu-dhabi,\n// sharjah. Japan: tokyo, osaka, kyoto, nagoya, yokohama.\n<AirportMatrixClock cities={[\"new-delhi\", \"mumbai\", \"tokyo\"]} format=\"12h\" showSeconds showCountry showControls />\n```\n\nDeclared props:\n- `cities` (AirportMatrixCityId[]); default: ['los-angeles', 'london', 'tokyo'] — Initial or controlled city IDs; supports one to five cities.\n- `format` ('12h' | '24h'); default: '24h' — Local time display format.\n- `showSeconds` (boolean); default: false — Include seconds in each displayed time.\n- `updateInterval` (number); default: 1000 — Shared clock refresh interval in milliseconds.\n- `showCountry` (boolean); default: false — Show the country name under each city.\n- `showControls` (boolean); default: true when cities is omitted — Show country and city selectors plus add and remove controls.\n- `onCitiesChange` ((cities: AirportMatrixCityId[]) => void); default: undefined — Receive city selection changes when using a controlled cities prop.\n- `className` (string); default: '' — Additional classes for the board container.\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/airport-matrix-clock.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "3359299f767dff76f154a8aa7fe801ce68c77193fd4350e475e86326df0951ba",
    "features": [
      "IANA timezone formatting handles local time and daylight-saving changes without a time service",
      "Three-city default with a five-city maximum, duplicate removal, and safe fallback for invalid input",
      "Built-in country and city selectors let viewers add or remove cities from the supported set",
      "Compact bitmap glyphs for city names and 12-hour or 24-hour time",
      "Only changed character cells roll; unchanged cells retain their rendered state",
      "Hovering a city or time rolls its characters through a brief staggered rebuild",
      "Dedicated dark matrix board surface with authentic high-contrast dot matrix typography"
    ],
    "props": [
      {
        "name": "cities",
        "type": "AirportMatrixCityId[]",
        "default": "['los-angeles', 'london', 'tokyo']",
        "description": "Initial or controlled city IDs; supports one to five cities."
      },
      {
        "name": "format",
        "type": "'12h' | '24h'",
        "default": "'24h'",
        "description": "Local time display format."
      },
      {
        "name": "showSeconds",
        "type": "boolean",
        "default": "false",
        "description": "Include seconds in each displayed time."
      },
      {
        "name": "updateInterval",
        "type": "number",
        "default": "1000",
        "description": "Shared clock refresh interval in milliseconds."
      },
      {
        "name": "showCountry",
        "type": "boolean",
        "default": "false",
        "description": "Show the country name under each city."
      },
      {
        "name": "showControls",
        "type": "boolean",
        "default": "true when cities is omitted",
        "description": "Show country and city selectors plus add and remove controls."
      },
      {
        "name": "onCitiesChange",
        "type": "(cities: AirportMatrixCityId[]) => void",
        "default": "undefined",
        "description": "Receive city selection changes when using a controlled cities prop."
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Additional classes for the board container."
      }
    ],
    "accessibility": [
      "The board exposes a concise accessible name with the current times and city names; decorative dot SVGs are hidden from assistive technology.",
      "Framer Motion reduced-motion preference removes character travel while retaining current values and live updates.",
      "Semantic section and list markup provides a clear reading order.",
      "Native country and city selects and labeled remove buttons support keyboard use."
    ],
    "createdAt": "2026-10-05",
    "usageCode": "import { AirportMatrixClock } from \"@/components/ui/airport-matrix-clock\";\n\nexport function WorldClocks() {\n  return (\n    <AirportMatrixClock\n      cities={[\"los-angeles\", \"london\", \"tokyo\"]}\n      format=\"24h\"\n    />\n  );\n}\n\n// India: new-delhi, mumbai, bengaluru, hyderabad, chennai, kolkata, lucknow,\n// ahmedabad, pune, jaipur, varanasi. United States: new-york, los-angeles,\n// san-francisco, chicago, houston, miami, seattle, boston. United Kingdom:\n// london, manchester, birmingham, edinburgh, glasgow. UAE: dubai, abu-dhabi,\n// sharjah. Japan: tokyo, osaka, kyoto, nagoya, yokohama.\n<AirportMatrixClock cities={[\"new-delhi\", \"mumbai\", \"tokyo\"]} format=\"12h\" showSeconds showCountry showControls />",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AirportMatrixClock.tsx",
        "type": "registry:ui",
        "target": "components/ui/airport-matrix-clock.tsx"
      },
      {
        "path": "src/lib/motion-tokens.ts",
        "type": "registry:lib",
        "target": "lib/motion-tokens.ts"
      }
    ]
  },
  {
    "id": "alert",
    "name": "Alert",
    "tagline": "Smooth height collapse on dismissal with tone styling",
    "description": "An alert component that collapses smoothly in height and opacity on dismissal, with tone-aware icons, action slot, and accessibility roles.",
    "category": "Feedback",
    "badges": [
      "Height Collapse",
      "Dismissible",
      "Accessible Roles",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/alert",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Alert component into my project.\n\nAn alert component that collapses smoothly in height and opacity on dismissal, with tone-aware icons, action slot, and accessibility roles.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/alert\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Alert, AlertTitle, AlertDescription } from \"@/components/ui/alert\";\n\n<Alert tone=\"danger\" dismissible onDismiss={() => handleDismiss()}>\n  <AlertTitle>Payment failed</AlertTitle>\n  <AlertDescription>Your card was declined. Please try another card.</AlertDescription>\n</Alert>\n\n<Alert tone=\"success\">\n  <AlertTitle>Changes saved successfully</AlertTitle>\n</Alert>\n```\n\nDeclared props:\n- `tone` ('neutral' | 'info' | 'success' | 'warning' | 'danger'); default: 'neutral' — Color tone and severity semantic level\n- `icon` (React.ReactNode | false); default: undefined — Custom icon element, or false to suppress icon\n- `dismissible` (boolean); default: false — Renders an interactive close button\n- `onDismiss` (() => void); default: undefined — Callback invoked after the exit collapse animation completes\n- `action` (React.ReactNode); default: undefined — Optional right-hand action element (e.g. action button)\n- `className` (string); default: undefined — Additional CSS classes for the alert container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/alert.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "296968ef4274bf05705461f95631770c4c3d31770d5b78a85d2ac66b7941f9d2",
    "features": [
      "Dismissing collapses height and fades out smoothly without sudden content jumps",
      "Supports 5 semantic tones: neutral, info, success, warning, and danger",
      "Automatic matching Lucide icons with custom icon or icon={false} override",
      "Action slot on the right for buttons, retry triggers, or secondary actions",
      "Proper accessibility: role=\"alert\" for danger/warning and role=\"status\" for neutral/info/success"
    ],
    "props": [
      {
        "name": "tone",
        "type": "'neutral' | 'info' | 'success' | 'warning' | 'danger'",
        "default": "'neutral'",
        "description": "Color tone and severity semantic level"
      },
      {
        "name": "icon",
        "type": "React.ReactNode | false",
        "default": "undefined",
        "description": "Custom icon element, or false to suppress icon"
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "default": "false",
        "description": "Renders an interactive close button"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback invoked after the exit collapse animation completes"
      },
      {
        "name": "action",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Optional right-hand action element (e.g. action button)"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS classes for the alert container"
      }
    ],
    "accessibility": [
      "Applies role=\"alert\" for high-priority warning/danger tones and role=\"status\" for informative tones",
      "Dismiss button includes aria-label=\"Dismiss\" and clear focus-visible rings",
      "High contrast color ratios in both light and dark themes"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Alert, AlertTitle, AlertDescription } from \"@/components/ui/alert\";\n\n<Alert tone=\"danger\" dismissible onDismiss={() => handleDismiss()}>\n  <AlertTitle>Payment failed</AlertTitle>\n  <AlertDescription>Your card was declined. Please try another card.</AlertDescription>\n</Alert>\n\n<Alert tone=\"success\">\n  <AlertTitle>Changes saved successfully</AlertTitle>\n</Alert>",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/alert.tsx",
        "type": "registry:ui",
        "target": "components/ui/alert.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "animated-file-upload",
    "name": "Animated File Upload",
    "tagline": "Physical drag-and-drop file uploader with per-file progress morphing",
    "description": "A minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.",
    "category": "Forms",
    "badges": [
      "Drag & Drop",
      "Forms",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-file-upload",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Animated File Upload component into my project.\n\nA minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/animated-file-upload\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AnimatedFileUpload } from \"@/components/ui/animated-file-upload\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-md mx-auto p-4\">\n      <AnimatedFileUpload\n        multiple\n        maxSize={10 * 1024 * 1024}\n        accept=\"image/*,application/pdf\"\n        onFilesSelected={(files) => console.log('Selected:', files)}\n        onUploadComplete={(file) => console.log('Uploaded:', file.name)}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `multiple` (boolean); default: true — Allow multiple files selection and upload\n- `accept` (string | string[]); default: undefined — Accepted MIME types or file extensions (e.g. image/*, .pdf)\n- `maxSize` (number); default: 26214400 (25MB) — Maximum file size in bytes\n- `maxFiles` (number); default: 10 — Maximum number of concurrent files in list\n- `dropTitle` (string); default: 'Drop files here' — Primary drop target heading\n- `dropSubtitle` (string); default: 'or browse from your device' — Secondary call-to-action text\n- `variant` ('standard' | 'compact'); default: 'standard' — Display density mode\n- `disabled` (boolean); default: false — Disables all interactions and file picking\n- `onFilesSelected` ((files: File[]) => void); default: undefined — Callback triggered when files are chosen\n- `onUploadComplete` ((file: UploadFileItem) => void); default: undefined — Callback fired on successful upload completion\n- `uploadHandler` ((file, onProgress) => Promise<void>); default: undefined — Custom async upload handler returning a promise\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/animated-file-upload.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "72dac80c7563e6553e6392895d604656b728bcff9f99c22832958b5d38bb6258",
    "features": [
      "Subtle physical dropzone scaling and border reaction without exaggerated AI glow",
      "Automatic mime-type detection and contextual file icon attribution",
      "Multi-file queue management with independent Uploading → Processing → Complete stages",
      "Self-morphing progress bar into checkmark state with non-aggressive error recovery",
      "Customizable file constraints (maxSize, maxFiles, accept) with accessible screen reader labels"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "boolean",
        "default": "true",
        "description": "Allow multiple files selection and upload"
      },
      {
        "name": "accept",
        "type": "string | string[]",
        "default": "undefined",
        "description": "Accepted MIME types or file extensions (e.g. image/*, .pdf)"
      },
      {
        "name": "maxSize",
        "type": "number",
        "default": "26214400 (25MB)",
        "description": "Maximum file size in bytes"
      },
      {
        "name": "maxFiles",
        "type": "number",
        "default": "10",
        "description": "Maximum number of concurrent files in list"
      },
      {
        "name": "dropTitle",
        "type": "string",
        "default": "'Drop files here'",
        "description": "Primary drop target heading"
      },
      {
        "name": "dropSubtitle",
        "type": "string",
        "default": "'or browse from your device'",
        "description": "Secondary call-to-action text"
      },
      {
        "name": "variant",
        "type": "'standard' | 'compact'",
        "default": "'standard'",
        "description": "Display density mode"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables all interactions and file picking"
      },
      {
        "name": "onFilesSelected",
        "type": "(files: File[]) => void",
        "default": "undefined",
        "description": "Callback triggered when files are chosen"
      },
      {
        "name": "onUploadComplete",
        "type": "(file: UploadFileItem) => void",
        "default": "undefined",
        "description": "Callback fired on successful upload completion"
      },
      {
        "name": "uploadHandler",
        "type": "(file, onProgress) => Promise<void>",
        "default": "undefined",
        "description": "Custom async upload handler returning a promise"
      }
    ],
    "accessibility": [
      "Keyboard accessible dropzone triggerable via Enter or Space key",
      "Hidden semantic file input accessible to assistive technologies",
      "Aria-live announcements for file upload progression, completion, and error states",
      "Respects prefers-reduced-motion with instant state changes"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedFileUpload } from \"@/components/ui/animated-file-upload\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-md mx-auto p-4\">\n      <AnimatedFileUpload\n        multiple\n        maxSize={10 * 1024 * 1024}\n        accept=\"image/*,application/pdf\"\n        onFilesSelected={(files) => console.log('Selected:', files)}\n        onUploadComplete={(file) => console.log('Uploaded:', file.name)}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedFileUpload.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-file-upload.tsx"
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
  },
  {
    "id": "animated-number",
    "name": "Animated Number Morph",
    "tagline": "Independent column digit rolling physics for metrics and financial dashboards",
    "description": "An Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.",
    "category": "Motion",
    "badges": [
      "Metrics",
      "Motion Physics",
      "Typography"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-number",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Animated Number Morph component into my project.\n\nAn Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/animated-number\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AnimatedNumber } from \"@/components/ui/animated-number\";\n\nexport function Demo() {\n  const [revenue, setRevenue] = useState(12450);\n\n  return (\n    <div className=\"text-3xl font-bold\">\n      <AnimatedNumber value={revenue} prefix=\"$\" useGrouping />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `value` (number); default: 0 — The numeric target value to morph towards\n- `decimals` (number); default: 0 — Number of decimal places to preserve\n- `prefix` (string); default: '' — Text or currency prepended to number (e.g. \"$\")\n- `suffix` (string); default: '' — Text or unit appended to number (e.g. \"%\", \"ms\")\n- `useGrouping` (boolean); default: true — Formats with comma separators\n- `compact` (boolean); default: false — Formats using compact abbreviations (K, M, B)\n- `stiffness` (number); default: 170 — Spring transition stiffness\n- `damping` (number); default: 22 — Spring transition damping\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/animated-number.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "43375a8f5d17797ae07c35f9cd22cc03f565c35b713aecfe51e0cfaf87703368",
    "features": [
      "Independent digit column spring animation preventing layout jitter",
      "Automatic thousand grouping (e.g. 12,450) and fixed decimal formatting",
      "Compact notation support for large values (1.2M, 45K)",
      "Configurable prefixes, suffixes, and spring stiffness parameters",
      "Full accessibility with aria-label text narration"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "The numeric target value to morph towards"
      },
      {
        "name": "decimals",
        "type": "number",
        "default": "0",
        "description": "Number of decimal places to preserve"
      },
      {
        "name": "prefix",
        "type": "string",
        "default": "''",
        "description": "Text or currency prepended to number (e.g. \"$\")"
      },
      {
        "name": "suffix",
        "type": "string",
        "default": "''",
        "description": "Text or unit appended to number (e.g. \"%\", \"ms\")"
      },
      {
        "name": "useGrouping",
        "type": "boolean",
        "default": "true",
        "description": "Formats with comma separators"
      },
      {
        "name": "compact",
        "type": "boolean",
        "default": "false",
        "description": "Formats using compact abbreviations (K, M, B)"
      },
      {
        "name": "stiffness",
        "type": "number",
        "default": "170",
        "description": "Spring transition stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "22",
        "description": "Spring transition damping"
      }
    ],
    "accessibility": [
      "Screen readers read the complete rendered string via aria-label attribute",
      "Bypasses motion if user has reduced-motion preference enabled"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedNumber } from \"@/components/ui/animated-number\";\n\nexport function Demo() {\n  const [revenue, setRevenue] = useState(12450);\n\n  return (\n    <div className=\"text-3xl font-bold\">\n      <AnimatedNumber value={revenue} prefix=\"$\" useGrouping />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedNumber.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-number.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "animated-tabs",
    "name": "Animated Tabs",
    "tagline": "Layout-spring sliding active pill indicator",
    "description": "A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Accessible",
      "Keyboard Friendly"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-tabs",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Animated Tabs component into my project.\n\nA tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/animated-tabs\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}\n```\n\nDeclared props:\n- `tabs` (TabItem[]); default: [] — Array of tabs with id, label, icon, content\n- `defaultTab` (string); default: tabs[0].id — Initial active tab ID\n- `onChange` ((id: string) => void); default: undefined — Tab change callback\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/animated-tabs.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "a035ee2f1dd84bb07292ddb800df729dedbedff42225cf11f6fa1e653c3fc010",
    "features": [
      "Shared layout active pill with spring easing",
      "Independent content animation cross-fade",
      "Badge count support for notifications"
    ],
    "props": [
      {
        "name": "tabs",
        "type": "TabItem[]",
        "default": "[]",
        "description": "Array of tabs with id, label, icon, content"
      },
      {
        "name": "defaultTab",
        "type": "string",
        "default": "tabs[0].id",
        "description": "Initial active tab ID"
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Tab change callback"
      }
    ],
    "accessibility": [
      "ARIA tablist, tab, and tabpanel roles",
      "Keyboard arrow navigation"
    ],
    "createdAt": "2026-08-10",
    "usageCode": "import { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedTabs.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-tabs.tsx"
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
  },
  {
    "id": "avatar-stack",
    "name": "Avatar Stack",
    "tagline": "Overlapping avatar pile with spring-animated hover elevation and tooltips.",
    "description": "An interactive, stacked facepile of overlapping avatars that smoothly elevates and scales the hovered avatar to the front with spring physics, revealing the full image and name tooltip.",
    "category": "Overlays",
    "badges": [
      "Framer Motion",
      "Interactive",
      "Micro-interactions"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/avatar-stack",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Avatar Stack component into my project.\n\nAn interactive, stacked facepile of overlapping avatars that smoothly elevates and scales the hovered avatar to the front with spring physics, revealing the full image and name tooltip.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/avatar-stack\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\n<AvatarStack\n  size=\"lg\"\n  overlap=\"lg\"\n  avatars={[\n    { id: 1, src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },\n    { id: 2, src: 'https://i.pravatar.cc/150?img=2', alt: 'Sarah Smith' },\n    { id: 3, src: 'https://i.pravatar.cc/150?img=3', alt: 'Mike Johnson' },\n    { id: 4, src: 'https://i.pravatar.cc/150?img=4', alt: 'Emily Davis' },\n    { id: 5, src: 'https://i.pravatar.cc/150?img=5', alt: 'Alex Wilson' },\n    { id: 6, src: 'https://i.pravatar.cc/150?img=6', alt: 'Chris Brown' },\n  ]}\n/>\n```\n\nDeclared props:\n- `avatars` (AvatarStackItem[]); default: [] — Array of avatar objects with id, src, alt, and fallback\n- `max` (number); default: 5 — Maximum visible avatars before showing the +N counter\n- `size` ('sm' | 'md' | 'lg' | 'xl'); default: 'lg' — Dimension variant for each avatar circle\n- `overlap` ('sm' | 'md' | 'lg'); default: 'md' — Negative margin overlap amount between adjacent avatars\n- `showCount` (boolean); default: true — Whether to show the +N counter badge for overflow items\n- `showTooltip` (boolean); default: true — Whether to show a floating tooltip label on hover\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/avatar-stack.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "66a0237b27cc9889f49919a66a85d53325aaf810afeff094591861e332dd3ca4",
    "features": [
      "Dynamic z-index elevation on hover so the hovered avatar is 100% visible and unclipped",
      "Spring-animated scale and lift transition powered by Framer Motion",
      "Floating name tooltip with spring entrance and exit",
      "Automatic initial extraction when images are unavailable or fail to load",
      "Truncation badge (+N) with customizable maximum visible avatars"
    ],
    "props": [
      {
        "name": "avatars",
        "type": "AvatarStackItem[]",
        "default": "[]",
        "description": "Array of avatar objects with id, src, alt, and fallback"
      },
      {
        "name": "max",
        "type": "number",
        "default": "5",
        "description": "Maximum visible avatars before showing the +N counter"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'xl'",
        "default": "'lg'",
        "description": "Dimension variant for each avatar circle"
      },
      {
        "name": "overlap",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Negative margin overlap amount between adjacent avatars"
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the +N counter badge for overflow items"
      },
      {
        "name": "showTooltip",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show a floating tooltip label on hover"
      }
    ],
    "accessibility": [
      "Uses semantic role=\"group\" container with accessible aria labels for remaining count",
      "Preserves image alt text and falls back to generated initials for screen readers",
      "Hover tooltip uses pointer-events-none to prevent interfering with clicks"
    ],
    "createdAt": "2026-09-16",
    "usageCode": "<AvatarStack\n  size=\"lg\"\n  overlap=\"lg\"\n  avatars={[\n    { id: 1, src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },\n    { id: 2, src: 'https://i.pravatar.cc/150?img=2', alt: 'Sarah Smith' },\n    { id: 3, src: 'https://i.pravatar.cc/150?img=3', alt: 'Mike Johnson' },\n    { id: 4, src: 'https://i.pravatar.cc/150?img=4', alt: 'Emily Davis' },\n    { id: 5, src: 'https://i.pravatar.cc/150?img=5', alt: 'Alex Wilson' },\n    { id: 6, src: 'https://i.pravatar.cc/150?img=6', alt: 'Chris Brown' },\n  ]}\n/>",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AvatarStack.tsx",
        "type": "registry:ui",
        "target": "components/ui/avatar-stack.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "badge",
    "name": "Badge",
    "tagline": "Rolling number animation & live status pulse",
    "description": "An animated status badge where numbers and strings roll on value change, with live status pulse dot, removable chip actions, and rich tone variants.",
    "category": "Feedback",
    "badges": [
      "Roll Animation",
      "Status Dot",
      "Removable Chip",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/badge",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Badge component into my project.\n\nAn animated status badge where numbers and strings roll on value change, with live status pulse dot, removable chip actions, and rich tone variants.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/badge\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Badge } from \"@/components/ui/badge\";\n\n<Badge>Draft</Badge>\n<Badge tone=\"success\" dot pulse>Live</Badge>\n<Badge variant=\"solid\" tone=\"danger\">{unreadCount}</Badge>\n<Badge variant=\"outline\" tone=\"warning\" onRemove={() => removeTag()}>Tag</Badge>\n```\n\nDeclared props:\n- `variant` ('soft' | 'solid' | 'outline'); default: 'soft' — Visual style of the badge\n- `tone` ('neutral' | 'success' | 'warning' | 'danger'); default: 'neutral' — Color tone of the badge\n- `dot` (boolean); default: false — Displays a leading status indicator dot\n- `pulse` (boolean); default: false — Adds a soft animated pulse ring to the status dot\n- `onRemove` (() => void); default: undefined — Callback enabling dismissible chip mode with an × icon\n- `children` (React.ReactNode); default: undefined — Badge contents (strings & numbers auto-roll on change)\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/badge.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c816d3ebf9bc5e260fea11d15ca195cd65089dee2604f6f505a0896d20bea154",
    "features": [
      "Numbers and text roll up with spring physics when updated",
      "Optional live status dot with pulsing radar ping effect",
      "Interactive removable chip support with animated onRemove trigger",
      "3 styles (soft, solid, outline) × 4 tones (neutral, success, warning, danger)",
      "Motion-ready component accepting initial, animate, and layout animations directly"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'soft' | 'solid' | 'outline'",
        "default": "'soft'",
        "description": "Visual style of the badge"
      },
      {
        "name": "tone",
        "type": "'neutral' | 'success' | 'warning' | 'danger'",
        "default": "'neutral'",
        "description": "Color tone of the badge"
      },
      {
        "name": "dot",
        "type": "boolean",
        "default": "false",
        "description": "Displays a leading status indicator dot"
      },
      {
        "name": "pulse",
        "type": "boolean",
        "default": "false",
        "description": "Adds a soft animated pulse ring to the status dot"
      },
      {
        "name": "onRemove",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback enabling dismissible chip mode with an × icon"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Badge contents (strings & numbers auto-roll on change)"
      }
    ],
    "accessibility": [
      "Removable chips provide aria-label=\"Remove\" and focus visible rings",
      "Pulse animations respect motion-reduce preferences",
      "High-contrast tone combinations tested in both light and dark modes"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Badge } from \"@/components/ui/badge\";\n\n<Badge>Draft</Badge>\n<Badge tone=\"success\" dot pulse>Live</Badge>\n<Badge variant=\"solid\" tone=\"danger\">{unreadCount}</Badge>\n<Badge variant=\"outline\" tone=\"warning\" onRemove={() => removeTag()}>Tag</Badge>",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/badge.tsx",
        "type": "registry:ui",
        "target": "components/ui/badge.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "bar-chart",
    "name": "Bar Chart",
    "tagline": "Animated grouped and stacked SVG bar chart with legend filtering",
    "description": "A hand-written, dependency-free SVG bar chart with grouped and stacked layouts, morphing bar transitions, interactive legend toggles, and accessible hover and keyboard tooltips.",
    "category": "Feedback",
    "badges": [
      "SVG",
      "Bar Chart",
      "Data Visualization",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/bar-chart",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Bar Chart component into my project.\n\nA hand-written, dependency-free SVG bar chart with grouped and stacked layouts, morphing bar transitions, interactive legend toggles, and accessible hover and keyboard tooltips.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/bar-chart\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { BarChart } from \"@/components/ui/bar-chart\";\n\nconst data = [\n  { label: \"Jan\", web: 2400, mobile: 1700 },\n  { label: \"Feb\", web: 2800, mobile: 1950 },\n  { label: \"Mar\", web: 3150, mobile: 2120 },\n];\n\nconst series = [\n  { key: \"web\", label: \"Web\" },\n  { key: \"mobile\", label: \"Mobile\" },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <BarChart data={data} series={series} variant=\"grouped\" height={260} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `data` (BarDatum[]) — Categories to render; each row needs a label plus one numeric key per series\n- `series` (BarSeries[]) — Series definitions with a data key, display label, and optional color\n- `variant` (\"grouped\" | \"stacked\"); default: \"grouped\" — Places bars side by side or stacks them on top of each other\n- `height` (number); default: 260 — Height of the chart area in pixels\n- `formatValue` ((n: number) => string); default: Intl.NumberFormat — Formats values shown in tooltips and the accessible data table\n- `formatTick` ((n: number) => string); default: compact Intl.NumberFormat — Formats the y-axis tick labels\n- `showLegend` (boolean); default: true — Shows the interactive series legend when more than one series exists\n- `animated` (boolean); default: true — Enables entrance and bar morph animations (disabled for reduced motion)\n- `ariaLabel` (string); default: auto-generated — Accessible description for the chart image role\n- `className` (string); default: \"\" — Additional CSS classes for the chart wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/bar-chart.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "5dcc531e9c796e35c711d16bc470a2e737174b92bdc2c477fd89f8328500d846",
    "features": [
      "Grouped and stacked layouts with interruptible, morphing bar transitions",
      "Zero charting library dependencies — every bar is generated with hand-written SVG paths",
      "Interactive legend that toggles series on and off while keeping at least one visible",
      "Floating tooltip tracks the hovered category and shows per-series values and totals",
      "Container-aware sizing with a ResizeObserver so the chart fits cards on mobile",
      "Screen-reader table and keyboard navigation with arrow keys, Home, End, and Escape",
      "Honors prefers-reduced-motion by disabling entrance and layout animations"
    ],
    "props": [
      {
        "name": "data",
        "type": "BarDatum[]",
        "description": "Categories to render; each row needs a label plus one numeric key per series"
      },
      {
        "name": "series",
        "type": "BarSeries[]",
        "description": "Series definitions with a data key, display label, and optional color"
      },
      {
        "name": "variant",
        "type": "\"grouped\" | \"stacked\"",
        "default": "\"grouped\"",
        "description": "Places bars side by side or stacks them on top of each other"
      },
      {
        "name": "height",
        "type": "number",
        "default": "260",
        "description": "Height of the chart area in pixels"
      },
      {
        "name": "formatValue",
        "type": "(n: number) => string",
        "default": "Intl.NumberFormat",
        "description": "Formats values shown in tooltips and the accessible data table"
      },
      {
        "name": "formatTick",
        "type": "(n: number) => string",
        "default": "compact Intl.NumberFormat",
        "description": "Formats the y-axis tick labels"
      },
      {
        "name": "showLegend",
        "type": "boolean",
        "default": "true",
        "description": "Shows the interactive series legend when more than one series exists"
      },
      {
        "name": "animated",
        "type": "boolean",
        "default": "true",
        "description": "Enables entrance and bar morph animations (disabled for reduced motion)"
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
      "The SVG exposes role=\"img\" with a descriptive aria-label derived from the series and category count",
      "ArrowLeft and ArrowRight move the active category, Home and End jump to the first or last, and Escape dismisses the tooltip",
      "A visually hidden data table mirrors every category and series value for screen readers",
      "Legend buttons use aria-pressed to communicate the visible state of each series",
      "Tooltips are aria-hidden because the same information is available through the data table and focus interactions",
      "prefers-reduced-motion disables entrance, morph, and hover-band transitions"
    ],
    "createdAt": "2026-10-23",
    "usageCode": "import { BarChart } from \"@/components/ui/bar-chart\";\n\nconst data = [\n  { label: \"Jan\", web: 2400, mobile: 1700 },\n  { label: \"Feb\", web: 2800, mobile: 1950 },\n  { label: \"Mar\", web: 3150, mobile: 2120 },\n];\n\nconst series = [\n  { key: \"web\", label: \"Web\" },\n  { key: \"mobile\", label: \"Mobile\" },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <BarChart data={data} series={series} variant=\"grouped\" height={260} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/BarChart.tsx",
        "type": "registry:ui",
        "target": "components/ui/bar-chart.tsx"
      },
      {
        "path": "src/lib/chart-primitives.tsx",
        "type": "registry:lib",
        "target": "lib/chart-primitives.tsx"
      }
    ]
  },
  {
    "id": "batch-gesture-tray",
    "name": "Batch Gesture Tray",
    "tagline": "Spring floating tray with multi-select batch actions",
    "description": "A touch-ready contextual tray that slides into view upon item selection, presenting bulk actions and real-time count telemetry.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Batch Actions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/batch-gesture-tray",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Batch Gesture Tray component into my project.\n\nA touch-ready contextual tray that slides into view upon item selection, presenting bulk actions and real-time count telemetry.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/batch-gesture-tray\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { BatchGestureTray } from \"@/components/ui/batch-gesture-tray\";\nimport { Trash2, Archive, Download } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'serverless-edge-fn.ts', subtitle: 'Modified 4m ago' },\n    { id: '2', title: 'redis-cache-layer.ts', subtitle: 'Modified 1h ago' },\n    { id: '3', title: 'schema-validation.ts', subtitle: 'Modified 3h ago' },\n  ];\n\n  const actions = [\n    { id: 'download', label: 'Export', icon: <Download className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'archive', label: 'Archive', icon: <Archive className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'delete', label: 'Delete', color: 'danger' as const, icon: <Trash2 className=\"w-3.5 h-3.5\" />, action: async () => {} },\n  ];\n\n  return <BatchGestureTray items={items} actions={actions} />;\n}\n```\n\nDeclared props:\n- `items` (BatchItem[]) — Array of selectable list items (id, title, subtitle)\n- `actions` (BatchAction[]) — Array of batch action buttons (id, label, icon, action, color)\n- `selectedIds` (string[]); default: undefined — Controlled array of selected item IDs\n- `onSelectionChange` ((ids: string[]) => void); default: undefined — Selection state callback\n- `onActionComplete` ((actionId: string) => void); default: undefined — Callback fired on action finish\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/batch-gesture-tray.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "d1377c75bb45c2c1c436561d3677ce9565185ef543e286919aca71c3028896a2",
    "features": [
      "Spring slide-up bottom tray appearing automatically when 1 or more items are selected",
      "Integrated selection counter badge with Select-All / Deselect-All triggers",
      "Async action loading indicators preventing double-submission",
      "Dismissal via close button, escape key, or outside tap"
    ],
    "props": [
      {
        "name": "items",
        "type": "BatchItem[]",
        "description": "Array of selectable list items (id, title, subtitle)"
      },
      {
        "name": "actions",
        "type": "BatchAction[]",
        "description": "Array of batch action buttons (id, label, icon, action, color)"
      },
      {
        "name": "selectedIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled array of selected item IDs"
      },
      {
        "name": "onSelectionChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Selection state callback"
      },
      {
        "name": "onActionComplete",
        "type": "(actionId: string) => void",
        "default": "undefined",
        "description": "Callback fired on action finish"
      }
    ],
    "accessibility": [
      "Accessible checkbox toggle state and keyboard selection",
      "aria-live announcements when item selection counter changes",
      "Full keyboard tab access through tray action buttons"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { BatchGestureTray } from \"@/components/ui/batch-gesture-tray\";\nimport { Trash2, Archive, Download } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'serverless-edge-fn.ts', subtitle: 'Modified 4m ago' },\n    { id: '2', title: 'redis-cache-layer.ts', subtitle: 'Modified 1h ago' },\n    { id: '3', title: 'schema-validation.ts', subtitle: 'Modified 3h ago' },\n  ];\n\n  const actions = [\n    { id: 'download', label: 'Export', icon: <Download className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'archive', label: 'Archive', icon: <Archive className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'delete', label: 'Delete', color: 'danger' as const, icon: <Trash2 className=\"w-3.5 h-3.5\" />, action: async () => {} },\n  ];\n\n  return <BatchGestureTray items={items} actions={actions} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/BatchGestureTray.tsx",
        "type": "registry:ui",
        "target": "components/ui/batch-gesture-tray.tsx"
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
  },
  {
    "id": "book-call-button",
    "name": "Book Call Button",
    "tagline": "Expanding accent pill with phone hover state",
    "description": "A premium \"Book a call\" pill with a green expanding capsule. At rest, a 36% accent capsule holds a dotted arrow + label; on hover, the capsule fills the pill, the label slides out, and a phone icon with ringing lines fades in centered.",
    "category": "Buttons",
    "badges": [
      "Spring",
      "State Choreography",
      "Reduced Motion",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/book-call-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Book Call Button component into my project.\n\nA premium \"Book a call\" pill with a green expanding capsule. At rest, a 36% accent capsule holds a dotted arrow + label; on hover, the capsule fills the pill, the label slides out, and a phone icon with ringing lines fades in centered.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/book-call-button\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { BookCallButton } from \"@/components/ui/book-call-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center py-12\">\n      <BookCallButton onClick={() => console.log('Book a call clicked')} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `children` (string); default: 'Book a call' — Label rendered to the right of the dotted arrow at rest\n- `onClick` (() => void); default: undefined — Click handler — ignored when href is also provided\n- `href` (string); default: undefined — When provided, the pill renders as an <a> with this href instead of a <button>\n- `className` (string); default: undefined — Additional Tailwind classes merged into the pill root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/book-call-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8cabce1778752704caa3eb53c3b5d49be06701d18df35f75499d63b0754282e4",
    "features": [
      "Three independently-timed motion layers: expanding capsule, label/arrow, and phone icon",
      "Capsule grows from \"left center\" so the expansion feels directional, not scale-from-middle",
      "Hover lift (1.01) and tap compression (0.975) on the pill itself, independent of the inner choreography",
      "Renders as <a> when href is provided so the same component works on a marketing page or a form action",
      "prefers-reduced-motion collapses every spring to an instant state change — no travel, no entrance",
      "Decorative SVGs are aria-hidden; the label is conveyed by aria-label on the interactive root",
      "Native <button> / <a> elements with focus-visible ring tied to the accent color"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "default": "'Book a call'",
        "description": "Label rendered to the right of the dotted arrow at rest"
      },
      {
        "name": "onClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Click handler — ignored when href is also provided"
      },
      {
        "name": "href",
        "type": "string",
        "default": "undefined",
        "description": "When provided, the pill renders as an <a> with this href instead of a <button>"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the pill root"
      }
    ],
    "accessibility": [
      "Semantic <button> by default; <a> when href is provided — no <div onClick>",
      "aria-label is set from the visible children so screen readers announce the action",
      "Decorative SVGs (dotted arrow, phone) are aria-hidden",
      "Visible focus-visible ring tied to the accent (#82ff22) for keyboard navigation",
      "prefers-reduced-motion fallback: all three motion layers resolve instantly to the final state",
      "pointer-events-none on the phone overlay ensures clicks always reach the underlying interactive element"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { BookCallButton } from \"@/components/ui/book-call-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center py-12\">\n      <BookCallButton onClick={() => console.log('Book a call clicked')} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/BookCallButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/book-call-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "branching-submenu",
    "name": "Branching Submenu",
    "tagline": "Animated tree navigation with keyboard support",
    "description": "A spatial submenu that connects parent options to child actions with staged branch motion.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Keyboard Friendly",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/branching-submenu",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Branching Submenu component into my project.\n\nA spatial submenu that connects parent options to child actions with staged branch motion.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/branching-submenu\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { BranchingSubmenu } from \"@/components/ui/branching-submenu\";\n\nexport function Demo() {\n  return <BranchingSubmenu />;\n}\n```\n\nDeclared props:\n- `items` (BranchingSubmenuItem[]); default: demo items — Parent items and optional child branches\n- `label` (string); default: 'Branching navigation' — Accessible navigation label\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/branching-submenu.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "fec160dbb52a445b2be0a8c18cdd3fb42fa0a9cf0fb1e4a10262055b0b5c48ab",
    "features": [
      "Parent and child panels communicate hierarchy through position and stagger",
      "Arrow keys, Enter, and Escape support menu exploration",
      "Responsive layout stacks cleanly on narrow screens"
    ],
    "props": [
      {
        "name": "items",
        "type": "BranchingSubmenuItem[]",
        "default": "demo items",
        "description": "Parent items and optional child branches"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Branching navigation'",
        "description": "Accessible navigation label"
      }
    ],
    "accessibility": [
      "Uses a labeled navigation region and focus-visible rings",
      "Supports Escape to close the branch panel and arrow-key parent navigation",
      "Reduced motion replaces branch movement with a simple fade"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { BranchingSubmenu } from \"@/components/ui/branching-submenu\";\n\nexport function Demo() {\n  return <BranchingSubmenu />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/BranchingSubmenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/branching-submenu.tsx"
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
  },
  {
    "id": "breadcrumb",
    "name": "Breadcrumb",
    "tagline": "Gliding hover pill with animated trail expansion",
    "description": "A navigation trail with a gliding hover pill, smooth expansion for collapsed trails with automatic focus transfer, and light/dark theme adaptation.",
    "category": "Navigation",
    "badges": [
      "Spring Hover",
      "Smart Collapse",
      "Focus Transfer",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/breadcrumb",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Breadcrumb component into my project.\n\nA navigation trail with a gliding hover pill, smooth expansion for collapsed trails with automatic focus transfer, and light/dark theme adaptation.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/breadcrumb\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport Link from \"next/link\";\nimport { Home } from \"lucide-react\";\nimport { Breadcrumb } from \"@/components/ui/breadcrumb\";\n\n<Breadcrumb\n  as={Link}\n  items={[\n    { label: \"Home\", href: \"/\", icon: <Home className=\"size-4\" /> },\n    { label: \"Projects\", href: \"/projects\" },\n    { label: \"EasyUI\", href: \"/projects/easyui\" },\n    { label: \"Components\", href: \"/projects/easyui/components\" },\n    { label: \"Breadcrumb\" }, // Current page (no href needed)\n  ]}\n/>\n```\n\nDeclared props:\n- `items` (BreadcrumbItem[]); default: undefined — Array of breadcrumb items with label, href, and optional icon\n- `separator` ('chevron' | 'slash'); default: 'chevron' — Separator style between breadcrumb items\n- `maxItems` (number); default: 4 — Collapse the middle items when length exceeds this number\n- `as` (React.ElementType); default: 'a' — Custom link component (e.g. Next.js Link)\n- `className` (string); default: undefined — Additional CSS classes for the nav container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/breadcrumb.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c9e8735564defe440a3e71ae4bc9033f1783249f769cea5ceda417462fcbc6d8",
    "features": [
      "Hover pill smoothly glides between links using Framer Motion layoutId",
      "Long trails collapse the middle items into an ellipsis trigger button",
      "Clicking ellipsis animates hidden crumbs in while focus transfers to the first revealed crumb",
      "Supports chevron or slash separator styles and custom router link components (Next.js Link or <a>)",
      "Full accessibility with aria-label=\"Breadcrumb\", aria-current=\"page\", and keyboard navigation"
    ],
    "props": [
      {
        "name": "items",
        "type": "BreadcrumbItem[]",
        "default": "undefined",
        "description": "Array of breadcrumb items with label, href, and optional icon"
      },
      {
        "name": "separator",
        "type": "'chevron' | 'slash'",
        "default": "'chevron'",
        "description": "Separator style between breadcrumb items"
      },
      {
        "name": "maxItems",
        "type": "number",
        "default": "4",
        "description": "Collapse the middle items when length exceeds this number"
      },
      {
        "name": "as",
        "type": "React.ElementType",
        "default": "'a'",
        "description": "Custom link component (e.g. Next.js Link)"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS classes for the nav container"
      }
    ],
    "accessibility": [
      "Uses semantic <nav aria-label=\"Breadcrumb\"> and <ol> list structure",
      "Marks the current terminal page with aria-current=\"page\"",
      "Focus automatically transfers to the first newly revealed item upon expanding",
      "Full keyboard focus indicators and focus rings for accessibility"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import Link from \"next/link\";\nimport { Home } from \"lucide-react\";\nimport { Breadcrumb } from \"@/components/ui/breadcrumb\";\n\n<Breadcrumb\n  as={Link}\n  items={[\n    { label: \"Home\", href: \"/\", icon: <Home className=\"size-4\" /> },\n    { label: \"Projects\", href: \"/projects\" },\n    { label: \"EasyUI\", href: \"/projects/easyui\" },\n    { label: \"Components\", href: \"/projects/easyui/components\" },\n    { label: \"Breadcrumb\" }, // Current page (no href needed)\n  ]}\n/>",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/breadcrumb.tsx",
        "type": "registry:ui",
        "target": "components/ui/breadcrumb.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "button",
    "name": "Button",
    "tagline": "Multi-variant button system with tactile physics",
    "description": "A versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.",
    "category": "Buttons",
    "badges": [
      "Multi-variant",
      "Spring Tap",
      "Micro-interactions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Button component into my project.\n\nA versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/button\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Button } from \"@/components/ui/button\";\nimport { Sparkles, ArrowRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\" leftIcon={<Sparkles className=\"w-4 h-4\" />}>\n        Get Started\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `variant` ('primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'); default: 'primary' — Visual presentation style\n- `size` ('sm' | 'md' | 'lg' | 'icon'); default: 'md' — Dimensions and typography scale\n- `isLoading` (boolean); default: false — Displays an animated spinner and disables user interaction\n- `loadingText` (string); default: undefined — Optional text displayed alongside the loading spinner\n- `leftIcon` (React.ReactNode); default: undefined — Icon element placed before children\n- `rightIcon` (React.ReactNode); default: undefined — Icon element placed after children\n- `fullWidth` (boolean); default: false — Stretches button to 100% width of parent container\n- `disabled` (boolean); default: false — Prevents interaction and applies 30% disabled opacity\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "4a7def903cd3c9c20f9ee9831e5a7f52268e8d3f88ef6410dae250e855e985e4",
    "features": [
      "8 visual variants: Primary, Secondary, Outline, Ghost, Destructive, Success, Link, Gradient",
      "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
      "Spring tap micro-interaction (whileTap 0.97) via Framer Motion",
      "Accessible loading state with integrated monochrome spinner & aria-busy",
      "Left and right icon slots with automatic sizing and gap alignment",
      "Full width layout support (fullWidth)",
      "Strictly adheres to EasyUI monochrome dark palette and sky focus ring"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'",
        "default": "'primary'",
        "description": "Visual presentation style"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'icon'",
        "default": "'md'",
        "description": "Dimensions and typography scale"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays an animated spinner and disables user interaction"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "undefined",
        "description": "Optional text displayed alongside the loading spinner"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed before children"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed after children"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches button to 100% width of parent container"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Native <button> semantics with explicit type=\"button\" default",
      "Standard focus-ring outline with Sky-400 accent on keyboard :focus-visible",
      "Proper aria-busy and disabled accessibility states",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Button } from \"@/components/ui/button\";\nimport { Sparkles, ArrowRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\" leftIcon={<Sparkles className=\"w-4 h-4\" />}>\n        Get Started\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Button.tsx",
        "type": "registry:ui",
        "target": "components/ui/button.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "calendar",
    "name": "Calendar",
    "tagline": "Gliding selection pill & directional month slides",
    "description": "A dependency-free calendar with a selected-day pill that glides from date to date, range support with a live hover preview band, and months that slide in the direction you navigate.",
    "category": "Forms",
    "badges": [
      "Layout Springs",
      "Keyboard Friendly",
      "Light & Dark",
      "Zero Dependencies"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/calendar",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Calendar component into my project.\n\nA dependency-free calendar with a selected-day pill that glides from date to date, range support with a live hover preview band, and months that slide in the direction you navigate.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/calendar\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Calendar, type DateRange } from \"@/components/ui/calendar\";\n\n// single\nconst [date, setDate] = React.useState<Date | null>(null);\n<Calendar value={date} onChange={setDate} />\n\n// range\nconst [range, setRange] = React.useState<DateRange>({ from: null, to: null });\n<Calendar mode=\"range\" value={range} onChange={setRange} />\n\n// limits\n<Calendar minDate={new Date()} isDateDisabled={(d) => d.getDay() === 0} weekStartsOn={1} />\n```\n\nDeclared props:\n- `mode` ('single' | 'range'); default: 'single' — Selection mode\n- `value` (Date | null | DateRange); default: undefined — Controlled selected date or range\n- `defaultValue` (Date | null | DateRange); default: null — Initial selection (uncontrolled)\n- `onChange` ((date: Date | null) => void | (range: DateRange) => void); default: undefined — Selection change callback\n- `defaultMonth` (Date); default: undefined — Month shown initially\n- `minDate` (Date); default: undefined — Earliest selectable date\n- `maxDate` (Date); default: undefined — Latest selectable date\n- `isDateDisabled` ((date: Date) => boolean); default: undefined — Predicate to disable specific dates\n- `weekStartsOn` (0 | 1); default: 0 — First day of the week (0 = Sunday, 1 = Monday)\n- `locale` (string); default: undefined — BCP 47 locale for formatting\n- `className` (string); default: undefined — Additional class for the root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/calendar.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "59acf19ae78790943585ad3e6c221f7437dc218cd746c0afa69f176c32b2f702",
    "features": [
      "Selected day is one pill that springs between dates; range mode glides start and end pills separately",
      "Live hover preview band while picking a range",
      "Months slide in the navigation direction; fixed height so nothing jumps between months",
      "Single + range modes, min/max dates, and custom isDateDisabled",
      "Full keyboard navigation: arrows, Home/End, PageUp/PageDown (Shift = year)",
      "No date library — pure Intl + Date helpers"
    ],
    "props": [
      {
        "name": "mode",
        "type": "'single' | 'range'",
        "default": "'single'",
        "description": "Selection mode"
      },
      {
        "name": "value",
        "type": "Date | null | DateRange",
        "default": "undefined",
        "description": "Controlled selected date or range"
      },
      {
        "name": "defaultValue",
        "type": "Date | null | DateRange",
        "default": "null",
        "description": "Initial selection (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(date: Date | null) => void | (range: DateRange) => void",
        "default": "undefined",
        "description": "Selection change callback"
      },
      {
        "name": "defaultMonth",
        "type": "Date",
        "default": "undefined",
        "description": "Month shown initially"
      },
      {
        "name": "minDate",
        "type": "Date",
        "default": "undefined",
        "description": "Earliest selectable date"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "default": "undefined",
        "description": "Latest selectable date"
      },
      {
        "name": "isDateDisabled",
        "type": "(date: Date) => boolean",
        "default": "undefined",
        "description": "Predicate to disable specific dates"
      },
      {
        "name": "weekStartsOn",
        "type": "0 | 1",
        "default": "0",
        "description": "First day of the week (0 = Sunday, 1 = Monday)"
      },
      {
        "name": "locale",
        "type": "string",
        "default": "undefined",
        "description": "BCP 47 locale for formatting"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional class for the root"
      }
    ],
    "accessibility": [
      "role=\"grid\" with labeled rows and cells; aria-selected on picked days",
      "Full keyboard navigation with roving tabIndex and aria-live month announcements",
      "Disabled dates expose aria-disabled and skip selection"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Calendar, type DateRange } from \"@/components/ui/calendar\";\n\n// single\nconst [date, setDate] = React.useState<Date | null>(null);\n<Calendar value={date} onChange={setDate} />\n\n// range\nconst [range, setRange] = React.useState<DateRange>({ from: null, to: null });\n<Calendar mode=\"range\" value={range} onChange={setRange} />\n\n// limits\n<Calendar minDate={new Date()} isDateDisabled={(d) => d.getDay() === 0} weekStartsOn={1} />",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/calendar.tsx",
        "type": "registry:ui",
        "target": "components/ui/calendar.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "car-smoke-page-transition",
    "name": "Car Smoke Page Transition",
    "tagline": "Cinematic automotive page transition",
    "description": "A cinematic page transition where a speeding car crosses the screen, leaving a smoke trail before transitioning to the next page.",
    "category": "Motion",
    "badges": [
      "Cinematic",
      "Motion Physics",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/car-smoke-page-transition",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Car Smoke Page Transition component into my project.\n\nA cinematic page transition where a speeding car crosses the screen, leaving a smoke trail before transitioning to the next page.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/car-smoke-page-transition\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { CarSmokePageTransition } from \"@/components/ui/car-smoke-page-transition\";\n\nexport function Demo() {\n  return (\n    <CarSmokePageTransition\n      onTransitionComplete={() => {\n        // Navigate to new page after animation completes\n        window.location.href = \"/about\";\n      }}\n    >\n      <button className=\"bg-[#FAFAFA] text-[#050505] hover:bg-white px-4 py-2 rounded-md font-medium transition-colors\">\n        Start Journey\n      </button>\n    </CarSmokePageTransition>\n  );\n}\n```\n\nDeclared props:\n- `direction` ('left-to-right' | 'right-to-left'); default: 'left-to-right' — Direction of car travel\n- `carDuration` (number); default: 700 — Duration of car crossing animation in milliseconds\n- `carDelay` (number); default: 0 — Delay before car starts moving in milliseconds\n- `carSize` ('sm' | 'md' | 'lg'); default: 'md' — Size of the car (affects scale)\n- `smokeDensity` ('off' | 'low' | 'medium' | 'high'); default: 'medium' — Density of smoke particles emitted\n- `smokeLifetime` (number); default: 1200 — Lifetime of smoke particles in milliseconds\n- `showSpeedLines` (boolean); default: true — Whether to show speed lines effect behind the car\n- `pageTransitionDelay` (number); default: 550 — Delay before page transition overlay starts in milliseconds\n- `pageTransitionDuration` (number); default: 350 — Duration of page transition overlay fade in milliseconds\n- `resetDelay` (number); default: 300 — Delay before resetting to idle after transition completes in milliseconds\n- `onTransitionComplete` (() => void); default: undefined — Callback fired when transition completes (call navigate() here)\n- `children` (ReactNode); default: undefined — The trigger element (typically a Button)\n- `className` (string); default: undefined — Additional Tailwind classes merged into the root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/car-smoke-page-transition.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "f606b02fda46f842e67c9e86ade91d4922349af1780e30348240ebbddaa21c8d",
    "features": [
      "Hardware-accelerated Canvas particle drift smoke physics and realistic skid marks",
      "Choreographed multi-axis Ferrari drift movement, wheel spin, and speed lines",
      "Customizable travel direction (left-to-right or right-to-left), density, and scale",
      "Automatic theme awareness (light and dark mode overlay shading)",
      "Full accessibility support with automatic prefers-reduced-motion fallback"
    ],
    "props": [
      {
        "name": "direction",
        "type": "'left-to-right' | 'right-to-left'",
        "default": "'left-to-right'",
        "description": "Direction of car travel"
      },
      {
        "name": "carDuration",
        "type": "number",
        "default": "700",
        "description": "Duration of car crossing animation in milliseconds"
      },
      {
        "name": "carDelay",
        "type": "number",
        "default": "0",
        "description": "Delay before car starts moving in milliseconds"
      },
      {
        "name": "carSize",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Size of the car (affects scale)"
      },
      {
        "name": "smokeDensity",
        "type": "'off' | 'low' | 'medium' | 'high'",
        "default": "'medium'",
        "description": "Density of smoke particles emitted"
      },
      {
        "name": "smokeLifetime",
        "type": "number",
        "default": "1200",
        "description": "Lifetime of smoke particles in milliseconds"
      },
      {
        "name": "showSpeedLines",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show speed lines effect behind the car"
      },
      {
        "name": "pageTransitionDelay",
        "type": "number",
        "default": "550",
        "description": "Delay before page transition overlay starts in milliseconds"
      },
      {
        "name": "pageTransitionDuration",
        "type": "number",
        "default": "350",
        "description": "Duration of page transition overlay fade in milliseconds"
      },
      {
        "name": "resetDelay",
        "type": "number",
        "default": "300",
        "description": "Delay before resetting to idle after transition completes in milliseconds"
      },
      {
        "name": "onTransitionComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when transition completes (call navigate() here)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "The trigger element (typically a Button)"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the root"
      }
    ],
    "accessibility": [
      "The trigger is keyboard accessible via Enter and Space keys",
      "Reduced motion preference automatically disables the fast car animation and smoke effects",
      "The overlay background respects the current EasyUI theme (light/dark)"
    ],
    "createdAt": "2026-09-08",
    "usageCode": "import { CarSmokePageTransition } from \"@/components/ui/car-smoke-page-transition\";\n\nexport function Demo() {\n  return (\n    <CarSmokePageTransition\n      onTransitionComplete={() => {\n        // Navigate to new page after animation completes\n        window.location.href = \"/about\";\n      }}\n    >\n      <button className=\"bg-[#FAFAFA] text-[#050505] hover:bg-white px-4 py-2 rounded-md font-medium transition-colors\">\n        Start Journey\n      </button>\n    </CarSmokePageTransition>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/CarSmokePageTransition.tsx",
        "type": "registry:ui",
        "target": "components/ui/car-smoke-page-transition.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/theme/useTheme.tsx",
        "type": "registry:lib",
        "target": "lib/theme/useTheme.tsx"
      }
    ]
  },
  {
    "id": "chat",
    "name": "Chat",
    "tagline": "Production-ready conversation interface with history sidebar and composer",
    "description": "A production-grade conversational chat component with thread history sidebar, rich message rendering, status indicators, file attachments, and auto-expanding composer.",
    "category": "Feedback",
    "badges": [
      "Chat",
      "AI",
      "Messaging",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/chat",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Chat component into my project.\n\nA production-grade conversational chat component with thread history sidebar, rich message rendering, status indicators, file attachments, and auto-expanding composer.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/chat\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Chat, type ChatMessageItem } from \"@/components/ui/chat\";\n\nexport function Demo() {\n  const messages: ChatMessageItem[] = [\n    { id: '1', role: 'user', content: 'Can you show me how to style EasyUI tables?', timestamp: '10:40 AM' },\n    { id: '2', role: 'assistant', content: 'Certainly! EasyUI tables use the semantic --border and --surface tokens.', timestamp: '10:41 AM' },\n  ];\n\n  return (\n    <Chat\n      messages={messages}\n      onSendMessage={(text) => console.log('Send:', text)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `messages` (ChatMessageItem[]); default: [] — Array of chat message records including role, content, author, and attachments\n- `onSendMessage` ((content: string, attachments?: ChatAttachment[]) => void); default: undefined — Callback fired when the user submits a message via composer\n- `isGenerating` (boolean); default: false — Disables composer and shows loading status while the assistant is synthesizing an answer\n- `threads` (ChatConversationThread[]); default: undefined — Optional list of historical conversations displayed in the sidebar\n- `activeThreadId` (string); default: undefined — ID of the currently selected conversation thread\n- `onSelectThread` ((threadId: string) => void); default: undefined — Callback fired when a user selects a thread from the history sidebar\n- `onNewChat` (() => void); default: undefined — Callback fired when the user clicks the New Conversation button\n- `onClearChat` (() => void); default: undefined — Callback fired when the user clicks the clear chat history button\n- `className` (string); default: undefined — Custom Tailwind class names for styling overrides\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/chat.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "0c430d2c535e9c6a9ac34deefce2dc14a40626f918dbd1b79433557935ae38e6",
    "features": [
      "Complete conversational layout with optional historical threads sidebar and responsive mobile drawer",
      "Rich message components supporting user, assistant, and system roles with timestamps and avatars",
      "Built-in file and image attachment upload system with chips, sizes, and removal actions",
      "Auto-expanding multiline composer with Enter-to-send and Shift+Enter for newline shortcuts",
      "Message delivery states: sending, sent, delivered, failed (with retry), and streaming",
      "Accessible action triggers for copying message content and managing conversation state"
    ],
    "props": [
      {
        "name": "messages",
        "type": "ChatMessageItem[]",
        "default": "[]",
        "description": "Array of chat message records including role, content, author, and attachments"
      },
      {
        "name": "onSendMessage",
        "type": "(content: string, attachments?: ChatAttachment[]) => void",
        "default": "undefined",
        "description": "Callback fired when the user submits a message via composer"
      },
      {
        "name": "isGenerating",
        "type": "boolean",
        "default": "false",
        "description": "Disables composer and shows loading status while the assistant is synthesizing an answer"
      },
      {
        "name": "threads",
        "type": "ChatConversationThread[]",
        "default": "undefined",
        "description": "Optional list of historical conversations displayed in the sidebar"
      },
      {
        "name": "activeThreadId",
        "type": "string",
        "default": "undefined",
        "description": "ID of the currently selected conversation thread"
      },
      {
        "name": "onSelectThread",
        "type": "(threadId: string) => void",
        "default": "undefined",
        "description": "Callback fired when a user selects a thread from the history sidebar"
      },
      {
        "name": "onNewChat",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when the user clicks the New Conversation button"
      },
      {
        "name": "onClearChat",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when the user clicks the clear chat history button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom Tailwind class names for styling overrides"
      }
    ],
    "accessibility": [
      "Keyboard navigable message history and composer with standard Enter and Shift+Enter keybindings",
      "Composer textarea provides clear accessible placeholders, labels, and aria-describedby hints",
      "Mobile sidebar features focus isolation, escape key dismissal, and backdrop overlay click handlers",
      "Action buttons include aria-label descriptors for screen reader compatibility"
    ],
    "createdAt": "2026-09-21",
    "usageCode": "import { Chat, type ChatMessageItem } from \"@/components/ui/chat\";\n\nexport function Demo() {\n  const messages: ChatMessageItem[] = [\n    { id: '1', role: 'user', content: 'Can you show me how to style EasyUI tables?', timestamp: '10:40 AM' },\n    { id: '2', role: 'assistant', content: 'Certainly! EasyUI tables use the semantic --border and --surface tokens.', timestamp: '10:41 AM' },\n  ];\n\n  return (\n    <Chat\n      messages={messages}\n      onSendMessage={(text) => console.log('Send:', text)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Chat.tsx",
        "type": "registry:ui",
        "target": "components/ui/chat.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "circular-orbit",
    "name": "Circular Orbit",
    "tagline": "Continuous circular orbit gallery with depth-aware tiles",
    "description": "A circular gallery of image tiles orbiting around a centered title. All motion runs on a single MotionValue driven by useAnimationFrame, so no React renders per frame.",
    "category": "Motion",
    "badges": [
      "MotionValue",
      "Spatial Animation",
      "Depth Field",
      "Gallery"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/circular-orbit",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Circular Orbit component into my project.\n\nA circular gallery of image tiles orbiting around a centered title. All motion runs on a single MotionValue driven by useAnimationFrame, so no React renders per frame.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/circular-orbit\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { CircularOrbit } from \"@/components/ui/circular-orbit\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-3xl mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <CircularOrbit\n        title=\"Push\"\n        speed={0.00022}\n        radius={240}\n        pauseOnHover\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `items` (OrbitItem[]); default: 14 Unsplash tiles — Tiles to place around the orbit\n- `title` (string); default: 'Push' — Centered headline rendered above the orbit\n- `speed` (number); default: 0.00022 — Radians per millisecond. Smaller = slower\n- `radius` (number); default: 270 — Pixel radius of the orbit on the desktop layout\n- `pauseOnHover` (boolean); default: true — Smoothly stop the orbit when the pointer enters the gallery\n- `className` (string); default: undefined — Additional Tailwind classes merged into the section root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/circular-orbit.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "11a571f0fc1071c72d4acc0086cc8993299d6995a7c6846613040fae9ef90e08",
    "features": [
      "Single shared rotation MotionValue drives every tile — no React state per frame",
      "True circular orbit: x and y use the same radius so tiles trace a perfect circle",
      "Depth field derived from cos(angle): scale, opacity, blur, and z-index stay internally consistent",
      "Smooth ease-in / ease-out on hover-pause instead of a hard stop",
      "Configurable speed, radius, items, and pause-on-hover behaviour",
      "Respects prefers-reduced-motion: animation loop short-circuits to a static rest pose",
      "Light and dark surface variants"
    ],
    "props": [
      {
        "name": "items",
        "type": "OrbitItem[]",
        "default": "14 Unsplash tiles",
        "description": "Tiles to place around the orbit"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Push'",
        "description": "Centered headline rendered above the orbit"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "0.00022",
        "description": "Radians per millisecond. Smaller = slower"
      },
      {
        "name": "radius",
        "type": "number",
        "default": "270",
        "description": "Pixel radius of the orbit on the desktop layout"
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "default": "true",
        "description": "Smoothly stop the orbit when the pointer enters the gallery"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the section root"
      }
    ],
    "accessibility": [
      "role=\"region\" with aria-label so the gallery is announced as a single landmark",
      "Decorative tiles and the centered headline are aria-hidden — content is conveyed by the label",
      "Images use loading=\"lazy\" and decoding=\"async\" and a neutral alt for screen readers",
      "prefers-reduced-motion short-circuits the animation loop — the gallery rests in place"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { CircularOrbit } from \"@/components/ui/circular-orbit\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-3xl mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <CircularOrbit\n        title=\"Push\"\n        speed={0.00022}\n        radius={240}\n        pauseOnHover\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/CircularOrbit.tsx",
        "type": "registry:ui",
        "target": "components/ui/circular-orbit.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "code-snippet-deck",
    "name": "Code Snippet Deck",
    "tagline": "Multi-language code runner snippet deck with live variable tuning",
    "description": "An interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.",
    "category": "Buttons",
    "badges": [
      "Code Runner",
      "Multi-Runtime",
      "Live Customizer"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/code-snippet-deck",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Code Snippet Deck component into my project.\n\nAn interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/code-snippet-deck\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { CodeSnippetDeck } from \"@/components/ui/code-snippet-deck\";\n\nconst snippets = [\n  {\n    language: \"typescript\",\n    label: \"TypeScript\",\n    filename: \"client.ts\",\n    highlightLines: [4, 5],\n    code: (p: any) => `import { EasyClient } from \"@easyui/sdk\";\n\nconst client = new EasyClient({\n  apiKey: \"${p.apiKey || \"sk_live_9981\"}\",\n  streaming: ${p.stream ? \"true\" : \"false\"},\n});\n\nconst response = await client.completions.create({\n  model: \"easy-4o\",\n  prompt: \"Generate modern dark UI\",\n});`,\n  },\n  {\n    language: \"curl\",\n    label: \"cURL\",\n    filename: \"request.sh\",\n    code: (p: any) => `curl https://api.easyui.dev/v1/completions \\\n  -H \"Authorization: Bearer ${p.apiKey || \"sk_live_9981\"}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"easy-4o\", \"stream\": ${p.stream ? \"true\" : \"false\"}}'`,\n  },\n];\n\nconst parameters = [\n  { id: \"stream\", label: \"Stream response\", type: \"boolean\" as const, defaultValue: true },\n  { id: \"apiKey\", label: \"API Key\", type: \"text\" as const, defaultValue: \"sk_live_demo\" },\n];\n\nexport function Demo() {\n  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;\n}\n```\n\nDeclared props:\n- `snippets` (SnippetItem[]); default: [] — Collection of language snippets and generator functions\n- `parameters` (SnippetParameter[]); default: [] — Configurable runtime variables (checkboxes, dropdowns, inputs)\n- `defaultLanguage` (string); default: snippets[0]?.language — Initially selected language key\n- `showLineNumbers` (boolean); default: true — Whether to display code line numbering\n- `showWindowBar` (boolean); default: true — Whether to render macOS window bar header\n- `className` (string); default: undefined — Custom CSS container classes\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/code-snippet-deck.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "48b26d4f1deba8e975009cdc3bcb3a05216fb6ce2ca677ca7bb9f96e120e8632",
    "features": [
      "Seamless multi-runtime tab switching (cURL, TypeScript, Python, Go, Rust)",
      "Dynamic parameter tuning drawer that updates generated code in real time",
      "Configurable line numbers and selective line highlighting",
      "macOS terminal-inspired window header with traffic dots and copy system",
      "Zero layout shift spring transition on tab changes"
    ],
    "props": [
      {
        "name": "snippets",
        "type": "SnippetItem[]",
        "default": "[]",
        "description": "Collection of language snippets and generator functions"
      },
      {
        "name": "parameters",
        "type": "SnippetParameter[]",
        "default": "[]",
        "description": "Configurable runtime variables (checkboxes, dropdowns, inputs)"
      },
      {
        "name": "defaultLanguage",
        "type": "string",
        "default": "snippets[0]?.language",
        "description": "Initially selected language key"
      },
      {
        "name": "showLineNumbers",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display code line numbering"
      },
      {
        "name": "showWindowBar",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render macOS window bar header"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS container classes"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA code viewer roles",
      "Accessible tablist and tab roles with keyboard navigation",
      "High contrast accessible code text styling"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { CodeSnippetDeck } from \"@/components/ui/code-snippet-deck\";\n\nconst snippets = [\n  {\n    language: \"typescript\",\n    label: \"TypeScript\",\n    filename: \"client.ts\",\n    highlightLines: [4, 5],\n    code: (p: any) => `import { EasyClient } from \"@easyui/sdk\";\n\nconst client = new EasyClient({\n  apiKey: \"${p.apiKey || \"sk_live_9981\"}\",\n  streaming: ${p.stream ? \"true\" : \"false\"},\n});\n\nconst response = await client.completions.create({\n  model: \"easy-4o\",\n  prompt: \"Generate modern dark UI\",\n});`,\n  },\n  {\n    language: \"curl\",\n    label: \"cURL\",\n    filename: \"request.sh\",\n    code: (p: any) => `curl https://api.easyui.dev/v1/completions \\\n  -H \"Authorization: Bearer ${p.apiKey || \"sk_live_9981\"}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"easy-4o\", \"stream\": ${p.stream ? \"true\" : \"false\"}}'`,\n  },\n];\n\nconst parameters = [\n  { id: \"stream\", label: \"Stream response\", type: \"boolean\" as const, defaultValue: true },\n  { id: \"apiKey\", label: \"API Key\", type: \"text\" as const, defaultValue: \"sk_live_demo\" },\n];\n\nexport function Demo() {\n  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CodeSnippetDeck.tsx",
        "type": "registry:ui",
        "target": "components/ui/code-snippet-deck.tsx"
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
  },
  {
    "id": "combobox",
    "name": "Combobox",
    "tagline": "Gliding highlight & type-to-match underline",
    "description": "A searchable select where one highlight glides between options as you move (keyboard or mouse), the match underlines as you type, and the check pops in on selection.",
    "category": "Forms",
    "badges": [
      "Layout Springs",
      "Keyboard Friendly",
      "Searchable",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/combobox",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Combobox component into my project.\n\nA searchable select where one highlight glides between options as you move (keyboard or mouse), the match underlines as you type, and the check pops in on selection.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/combobox\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Combobox, type ComboboxOption } from \"@/components/ui/combobox\";\n\nconst frameworks: ComboboxOption[] = [\n  { value: \"next\", label: \"Next.js\", description: \"React framework\" },\n  { value: \"remix\", label: \"Remix\", description: \"Web standards\" },\n  { value: \"astro\", label: \"Astro\", description: \"Content sites\", keywords: [\"islands\"] },\n  { value: \"vite\", label: \"Vite\", disabled: true },\n];\n\nconst [fw, setFw] = React.useState<string | null>(\"next\");\n\n<Combobox options={frameworks} value={fw} onValueChange={setFw} placeholder=\"Framework\" />\n```\n\nDeclared props:\n- `options` (ComboboxOption[]); default: undefined — Options with value, label, description, icon, keywords, disabled\n- `value` (string | null); default: undefined — Controlled selected value\n- `defaultValue` (string | null); default: null — Initial value (uncontrolled)\n- `onValueChange` ((value: string | null) => void); default: undefined — Selection change callback\n- `placeholder` (string); default: 'Select…' — Trigger placeholder\n- `searchPlaceholder` (string); default: 'Search…' — Search input placeholder\n- `emptyText` (string); default: 'No results.' — Empty state message\n- `align` ('start' | 'end'); default: 'start' — Popover alignment\n- `disabled` (boolean); default: false — Disables the trigger\n- `className` (string); default: undefined — Additional class for the wrapper (set width, e.g. w-72)\n- `aria-label` (string); default: placeholder — Accessible name for the combobox\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/combobox.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "e2b2ae183b2f6060b164b86dfd89899792fc11519a1f76cf23d4698d8f01c4f1",
    "features": [
      "Single measured highlight glides to the active row and survives scrolling",
      "Fuzzy-free substring search across labels, descriptions, and keywords with match underline",
      "Descriptions, icons, and disabled options supported",
      "Arrow/Home/End/Enter/Esc keys wired; opens upward when there is no room below",
      "ARIA combobox/listbox with aria-activedescendant wired end to end"
    ],
    "props": [
      {
        "name": "options",
        "type": "ComboboxOption[]",
        "default": "undefined",
        "description": "Options with value, label, description, icon, keywords, disabled"
      },
      {
        "name": "value",
        "type": "string | null",
        "default": "undefined",
        "description": "Controlled selected value"
      },
      {
        "name": "defaultValue",
        "type": "string | null",
        "default": "null",
        "description": "Initial value (uncontrolled)"
      },
      {
        "name": "onValueChange",
        "type": "(value: string | null) => void",
        "default": "undefined",
        "description": "Selection change callback"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Select…'",
        "description": "Trigger placeholder"
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "'Search…'",
        "description": "Search input placeholder"
      },
      {
        "name": "emptyText",
        "type": "string",
        "default": "'No results.'",
        "description": "Empty state message"
      },
      {
        "name": "align",
        "type": "'start' | 'end'",
        "default": "'start'",
        "description": "Popover alignment"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the trigger"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional class for the wrapper (set width, e.g. w-72)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "default": "placeholder",
        "description": "Accessible name for the combobox"
      }
    ],
    "accessibility": [
      "role=\"combobox\" trigger + role=\"listbox\" with role=\"option\" children",
      "aria-activedescendant tracks the highlighted option; aria-disabled on disabled options",
      "Full keyboard support: ArrowDown/Up, Home/End, Enter selects, Escape closes and restores focus"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Combobox, type ComboboxOption } from \"@/components/ui/combobox\";\n\nconst frameworks: ComboboxOption[] = [\n  { value: \"next\", label: \"Next.js\", description: \"React framework\" },\n  { value: \"remix\", label: \"Remix\", description: \"Web standards\" },\n  { value: \"astro\", label: \"Astro\", description: \"Content sites\", keywords: [\"islands\"] },\n  { value: \"vite\", label: \"Vite\", disabled: true },\n];\n\nconst [fw, setFw] = React.useState<string | null>(\"next\");\n\n<Combobox options={frameworks} value={fw} onValueChange={setFw} placeholder=\"Framework\" />",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/combobox.tsx",
        "type": "registry:ui",
        "target": "components/ui/combobox.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "command-menu",
    "name": "Command Menu",
    "tagline": "Global ⌘K fuzzy palette with category grouping",
    "description": "A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.",
    "category": "Overlays",
    "badges": [
      "Keyboard First",
      "⌘K / Ctrl+K",
      "Fuzzy Filtering"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/command-menu",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Command Menu component into my project.\n\nA global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/command-menu\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}\n```\n\nDeclared props:\n- `isOpen` (boolean); default: false — Control visibility\n- `onClose` (() => void); default: Required — Close handler callback\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/command-menu.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "83c58203a98849c14a572808ed513f83d4075a6b50bf766b0d6975d574a16a84",
    "features": [
      "Global hotkey listener (⌘K / Ctrl+K)",
      "Arrow key navigation with wrapping",
      "Category badges and action shortcuts"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "default": "false",
        "description": "Control visibility"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "Required",
        "description": "Close handler callback"
      }
    ],
    "accessibility": [
      "ARIA combobox pattern",
      "Keyboard-only navigation"
    ],
    "createdAt": "2026-08-01",
    "usageCode": "import { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CommandMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/command-menu.tsx"
      },
      {
        "path": "src/components/icons/GithubIcon.tsx",
        "type": "registry:ui",
        "target": "components/icons/github-icon.tsx"
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
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "cursor-follower",
    "name": "Cursor Follower",
    "tagline": "Spring-damped pointer follower with custom icon content",
    "description": "A smooth spring-based cursor follower with customizable physics, velocity scaling, and custom child icons or badges.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Interactive",
      "Micro-Animation"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/cursor-follower",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Cursor Follower component into my project.\n\nA smooth spring-based cursor follower with customizable physics, velocity scaling, and custom child icons or badges.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/cursor-follower\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { CursorFollower } from \"@/components/ui/cursor-follower\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <CursorFollower size={44}>\n      <div className=\"flex h-full w-full items-center justify-center rounded-full bg-white text-black shadow-lg\">\n        <ArrowUpRight className=\"h-4 w-4\" />\n      </div>\n    </CursorFollower>\n  );\n}\n```\n\nDeclared props:\n- `children` (React.ReactNode); default: undefined — Custom icon, text badge, or React element displayed inside the cursor follower.\n- `size` (number); default: 40 — Width and height of the cursor follower in pixels.\n- `offsetX` (number); default: 0 — Horizontal offset from the cursor coordinates.\n- `offsetY` (number); default: 0 — Vertical offset from the cursor coordinates.\n- `stiffness` (number); default: 450 — Spring stiffness controlling how rapidly the follower catches up to the cursor.\n- `damping` (number); default: 32 — Spring damping controlling the smoothness and friction of deceleration.\n- `mass` (number); default: 0.5 — Spring mass controlling inertia and physical weight.\n- `scaleOnMove` (boolean); default: true — Scales the cursor follower slightly while the pointer is in active motion.\n- `hideOnLeave` (boolean); default: true — Hides the cursor follower when the pointer leaves the browser window or viewport.\n- `className` (string); default: undefined — Optional custom Tailwind CSS utility classes.\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/cursor-follower.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "06a23bdab5cab1b4d0dfa7313c3ba2ec2b6bb974c8ba3039a46924b71c8a6d6c",
    "features": [
      "Configurable spring dynamics (stiffness, damping, and mass)",
      "Dynamic velocity scaling when pointer is in motion",
      "Automatic viewport departure detection and graceful exit",
      "Reduced motion support with instant 1:1 hardware coordinate mapping",
      "Supports any custom React icon, text pill, or visual indicator"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom icon, text badge, or React element displayed inside the cursor follower."
      },
      {
        "name": "size",
        "type": "number",
        "default": "40",
        "description": "Width and height of the cursor follower in pixels."
      },
      {
        "name": "offsetX",
        "type": "number",
        "default": "0",
        "description": "Horizontal offset from the cursor coordinates."
      },
      {
        "name": "offsetY",
        "type": "number",
        "default": "0",
        "description": "Vertical offset from the cursor coordinates."
      },
      {
        "name": "stiffness",
        "type": "number",
        "default": "450",
        "description": "Spring stiffness controlling how rapidly the follower catches up to the cursor."
      },
      {
        "name": "damping",
        "type": "number",
        "default": "32",
        "description": "Spring damping controlling the smoothness and friction of deceleration."
      },
      {
        "name": "mass",
        "type": "number",
        "default": "0.5",
        "description": "Spring mass controlling inertia and physical weight."
      },
      {
        "name": "scaleOnMove",
        "type": "boolean",
        "default": "true",
        "description": "Scales the cursor follower slightly while the pointer is in active motion."
      },
      {
        "name": "hideOnLeave",
        "type": "boolean",
        "default": "true",
        "description": "Hides the cursor follower when the pointer leaves the browser window or viewport."
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom Tailwind CSS utility classes."
      }
    ],
    "accessibility": [
      "Includes aria-hidden=\"true\" and pointer-events-none so it never intercepts underlying click or keyboard interactions",
      "Bypasses spring oscillation under prefers-reduced-motion for zero visual vestibular strain"
    ],
    "createdAt": "2026-09-09",
    "usageCode": "import { CursorFollower } from \"@/components/ui/cursor-follower\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <CursorFollower size={44}>\n      <div className=\"flex h-full w-full items-center justify-center rounded-full bg-white text-black shadow-lg\">\n        <ArrowUpRight className=\"h-4 w-4\" />\n      </div>\n    </CursorFollower>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/CursorFollower.tsx",
        "type": "registry:ui",
        "target": "components/ui/cursor-follower.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "data-table",
    "name": "Data Table",
    "tagline": "Sortable, searchable table that becomes stacked cards on mobile",
    "description": "A sortable, searchable data table with sticky headers, row selection and range selection, animated bulk actions, paging, responsive stacked cards, and ready-made sparkline and delta cells.",
    "category": "Forms",
    "badges": [
      "Table",
      "Data",
      "Responsive",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/data-table",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Data Table component into my project.\n\nA sortable, searchable data table with sticky headers, row selection and range selection, animated bulk actions, paging, responsive stacked cards, and ready-made sparkline and delta cells.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/data-table\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DataTable, Sparkline, DeltaPill, type DataTableColumn } from \"@/components/ui/data-table\";\n\ninterface Product {\n  id: number;\n  name: string;\n  revenue: number;\n  trend: number[];\n  change: number;\n}\n\nconst columns: DataTableColumn<Product>[] = [\n  { key: \"name\", header: \"Product\", primary: true },\n  {\n    key: \"revenue\",\n    header: \"Revenue\",\n    align: \"right\",\n    cell: (row) => <span className=\"tabular-nums\">${row.revenue.toLocaleString()}</span>,\n  },\n  { key: \"trend\", header: \"Trend\", sortable: false, cell: (row) => <Sparkline data={row.trend} /> },\n  { key: \"change\", header: \"Change\", align: \"right\", cell: (row) => <DeltaPill value={row.change} /> },\n];\n\nexport function Demo() {\n  return (\n    <DataTable\n      rows={rows}\n      columns={columns}\n      getRowLabel={(row) => row.name}\n      defaultSort={{ key: \"revenue\", dir: \"desc\" }}\n      bulkActions={(ids) => <button type=\"button\">Export {ids.length}</button>}\n    />\n  );\n}\n```\n\nDeclared props:\n- `rows` (T[]); default: required — Rows to render. Each row must include a stable id\n- `columns` (DataTableColumn<T>[]); default: required — Column definitions with headers, accessors, custom cells, alignment, widths, and mobile behavior\n- `getRowLabel` ((row: T) => string); default: String(row.id) — Readable row name used by checkbox labels and screen readers\n- `selectable` (boolean); default: true — Enables row selection, select-all, and the bulk-action bar\n- `searchable` (boolean); default: true — Shows the search field that filters rows\n- `searchPlaceholder` (string); default: 'Search…' — Placeholder text for the search field\n- `searchText` ((row: T) => string); default: undefined — Extra text to match when searching beyond the column accessors\n- `defaultSort` (SortState); default: null — Initial sort used when the sort prop is not controlled\n- `sort` (SortState); default: undefined — Controlled sort state\n- `onSortChange` ((sort: SortState) => void); default: undefined — Callback fired whenever the sort changes\n- `selected` (Id[]); default: undefined — Controlled selection state\n- `onSelectionChange` ((ids: Id[]) => void); default: undefined — Callback fired whenever the selection changes\n- `bulkActions` ((selectedIds: Id[]) => ReactNode); default: undefined — Buttons rendered in the bar while rows are selected\n- `toolbar` (ReactNode); default: undefined — Extra controls rendered on the right side of the toolbar\n- `pageSize` (number); default: 20 — Rows shown initially and revealed per \"Show more\" click. Infinity shows all rows\n- `maxHeight` (number); default: 520 — Table scroll height in pixels before the header sticks\n- `density` ('comfortable' | 'compact'); default: 'comfortable' — Row padding and minimum height\n- `cardBreakpoint` (number); default: 640 — Width below which rows render as stacked cards\n- `onRowClick` ((row: T) => void); default: undefined — Makes rows interactive and keyboard-activatable\n- `emptyState` (ReactNode); default: undefined — Custom content shown when no rows match\n- `ariaLabel` (string); default: 'Data table' — Accessible name for the table region\n- `className` (string); default: undefined — Custom Tailwind class names for the outer wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/data-table.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "893616de6deb2875282bd16c96b42ae50b05b171151df92f5873df244baf0d95",
    "features": [
      "Three-state column sorting (ascending, descending, off) with natural string comparison and nulls last",
      "Sticky header with a subtle elevation shadow once the table is scrolled",
      "Row selection with select-all, indeterminate state, shift-click ranges, and an animated bulk-action bar",
      "Animated row reordering on sort using Framer Motion layout transitions",
      "Search across every column accessor, or supply extra searchable text per row",
      "Show-more paging, an informative empty state, and a clear-search action",
      "Responsive layout: below the card breakpoint rows become stacked cards with a dedicated sort menu",
      "Sparkline and DeltaPill cell helpers for trend and percentage-change columns"
    ],
    "props": [
      {
        "name": "rows",
        "type": "T[]",
        "default": "required",
        "description": "Rows to render. Each row must include a stable id"
      },
      {
        "name": "columns",
        "type": "DataTableColumn<T>[]",
        "default": "required",
        "description": "Column definitions with headers, accessors, custom cells, alignment, widths, and mobile behavior"
      },
      {
        "name": "getRowLabel",
        "type": "(row: T) => string",
        "default": "String(row.id)",
        "description": "Readable row name used by checkbox labels and screen readers"
      },
      {
        "name": "selectable",
        "type": "boolean",
        "default": "true",
        "description": "Enables row selection, select-all, and the bulk-action bar"
      },
      {
        "name": "searchable",
        "type": "boolean",
        "default": "true",
        "description": "Shows the search field that filters rows"
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "'Search…'",
        "description": "Placeholder text for the search field"
      },
      {
        "name": "searchText",
        "type": "(row: T) => string",
        "default": "undefined",
        "description": "Extra text to match when searching beyond the column accessors"
      },
      {
        "name": "defaultSort",
        "type": "SortState",
        "default": "null",
        "description": "Initial sort used when the sort prop is not controlled"
      },
      {
        "name": "sort",
        "type": "SortState",
        "default": "undefined",
        "description": "Controlled sort state"
      },
      {
        "name": "onSortChange",
        "type": "(sort: SortState) => void",
        "default": "undefined",
        "description": "Callback fired whenever the sort changes"
      },
      {
        "name": "selected",
        "type": "Id[]",
        "default": "undefined",
        "description": "Controlled selection state"
      },
      {
        "name": "onSelectionChange",
        "type": "(ids: Id[]) => void",
        "default": "undefined",
        "description": "Callback fired whenever the selection changes"
      },
      {
        "name": "bulkActions",
        "type": "(selectedIds: Id[]) => ReactNode",
        "default": "undefined",
        "description": "Buttons rendered in the bar while rows are selected"
      },
      {
        "name": "toolbar",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Extra controls rendered on the right side of the toolbar"
      },
      {
        "name": "pageSize",
        "type": "number",
        "default": "20",
        "description": "Rows shown initially and revealed per \"Show more\" click. Infinity shows all rows"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "default": "520",
        "description": "Table scroll height in pixels before the header sticks"
      },
      {
        "name": "density",
        "type": "'comfortable' | 'compact'",
        "default": "'comfortable'",
        "description": "Row padding and minimum height"
      },
      {
        "name": "cardBreakpoint",
        "type": "number",
        "default": "640",
        "description": "Width below which rows render as stacked cards"
      },
      {
        "name": "onRowClick",
        "type": "(row: T) => void",
        "default": "undefined",
        "description": "Makes rows interactive and keyboard-activatable"
      },
      {
        "name": "emptyState",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom content shown when no rows match"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "'Data table'",
        "description": "Accessible name for the table region"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom Tailwind class names for the outer wrapper"
      }
    ],
    "accessibility": [
      "Uses table, row, columnheader, and cell roles with aria-rowcount, aria-colcount, aria-rowindex, and aria-sort",
      "Select-all checkbox exposes a mixed aria-checked state and every row checkbox names its row",
      "Sortable headers are real buttons with visible focus rings and announced sort direction through a live status region",
      "On mobile the sort control is a labelled native select that keeps keyboard and screen-reader support",
      "Reduced motion disables row layout animation while preserving all functionality"
    ],
    "createdAt": "2026-11-11",
    "usageCode": "import { DataTable, Sparkline, DeltaPill, type DataTableColumn } from \"@/components/ui/data-table\";\n\ninterface Product {\n  id: number;\n  name: string;\n  revenue: number;\n  trend: number[];\n  change: number;\n}\n\nconst columns: DataTableColumn<Product>[] = [\n  { key: \"name\", header: \"Product\", primary: true },\n  {\n    key: \"revenue\",\n    header: \"Revenue\",\n    align: \"right\",\n    cell: (row) => <span className=\"tabular-nums\">${row.revenue.toLocaleString()}</span>,\n  },\n  { key: \"trend\", header: \"Trend\", sortable: false, cell: (row) => <Sparkline data={row.trend} /> },\n  { key: \"change\", header: \"Change\", align: \"right\", cell: (row) => <DeltaPill value={row.change} /> },\n];\n\nexport function Demo() {\n  return (\n    <DataTable\n      rows={rows}\n      columns={columns}\n      getRowLabel={(row) => row.name}\n      defaultSort={{ key: \"revenue\", dir: \"desc\" }}\n      bulkActions={(ids) => <button type=\"button\">Export {ids.length}</button>}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DataTable.tsx",
        "type": "registry:ui",
        "target": "components/ui/data-table.tsx"
      }
    ]
  },
  {
    "id": "date-picker",
    "name": "Date Picker",
    "tagline": "Origin-aware popover with a spring landing",
    "description": "A date picker (and date range picker) whose popover pops from the trigger edge with a spring, flips above when there is no room below, lands the selection pill, then closes and hands focus back to the trigger.",
    "category": "Forms",
    "badges": [
      "Spring In",
      "Flip Up",
      "Keyboard Friendly",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/date-picker",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Date Picker component into my project.\n\nA date picker (and date range picker) whose popover pops from the trigger edge with a spring, flips above when there is no room below, lands the selection pill, then closes and hands focus back to the trigger.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/date-picker\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DatePicker, DateRangePicker } from \"@/components/ui/date-picker\";\n\n<DatePicker value={date} onChange={setDate} placeholder=\"Due date\" minDate={new Date()} />\n\n<DateRangePicker value={range} onChange={setRange} />\n```\n\nDeclared props:\n- `value` (Date | null | DateRange); default: undefined — Controlled selected value\n- `defaultValue` (Date | null | DateRange); default: null — Initial value (uncontrolled)\n- `onChange` ((date: Date | null) => void | (range: DateRange) => void); default: undefined — Selection change callback\n- `placeholder` (string); default: 'Pick a date' / 'Pick a range' — Trigger placeholder text\n- `align` ('start' | 'end'); default: 'start' — Popover alignment relative to the trigger\n- `side` ('bottom' | 'top' | 'auto'); default: 'auto' — Popover placement; 'auto' opens downward on mobile and flips on desktop when tight\n- `disabled` (boolean); default: false — Disables the trigger\n- `className` (string); default: undefined — Additional class for the wrapper (set width, e.g. w-80)\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/date-picker.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "f70230f2e5e0b8c4d5098eeb67622a6f35760fbe99b758c2510492caa98a1d8c",
    "features": [
      "Popover scales from the trigger edge with a spring and flips above when space is tight",
      "Single date + date range pickers share the same Calendar underneath",
      "Selection pill lands before the popover closes, then focus returns to the trigger",
      "Esc and outside-click close; controlled or uncontrolled value",
      "Supports all Calendar options: minDate, maxDate, isDateDisabled, weekStartsOn, locale"
    ],
    "props": [
      {
        "name": "value",
        "type": "Date | null | DateRange",
        "default": "undefined",
        "description": "Controlled selected value"
      },
      {
        "name": "defaultValue",
        "type": "Date | null | DateRange",
        "default": "null",
        "description": "Initial value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(date: Date | null) => void | (range: DateRange) => void",
        "default": "undefined",
        "description": "Selection change callback"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Pick a date' / 'Pick a range'",
        "description": "Trigger placeholder text"
      },
      {
        "name": "align",
        "type": "'start' | 'end'",
        "default": "'start'",
        "description": "Popover alignment relative to the trigger"
      },
      {
        "name": "side",
        "type": "'bottom' | 'top' | 'auto'",
        "default": "'auto'",
        "description": "Popover placement; 'auto' opens downward on mobile and flips on desktop when tight"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the trigger"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional class for the wrapper (set width, e.g. w-80)"
      }
    ],
    "accessibility": [
      "Trigger has aria-haspopup=\"dialog\" and aria-expanded",
      "Popover closes on Escape and returns focus to the trigger",
      "Calendar inside is fully keyboard navigable"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { DatePicker, DateRangePicker } from \"@/components/ui/date-picker\";\n\n<DatePicker value={date} onChange={setDate} placeholder=\"Due date\" minDate={new Date()} />\n\n<DateRangePicker value={range} onChange={setRange} />",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/date-picker.tsx",
        "type": "registry:ui",
        "target": "components/ui/date-picker.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/components/ui/calendar.tsx",
        "type": "registry:ui",
        "target": "components/ui/calendar.tsx"
      }
    ]
  },
  {
    "id": "density-lens",
    "name": "Density Lens",
    "tagline": "Cursor-tracking magnification & detail inspection lens",
    "description": "An interactive floating lens that tracks pointer movement to reveal high-density data, magnified details, or alternative views.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Inspection",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/density-lens",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Density Lens component into my project.\n\nAn interactive floating lens that tracks pointer movement to reveal high-density data, magnified details, or alternative views.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/density-lens\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DensityLens } from \"@/components/ui/density-lens\";\n\nexport function Demo() {\n  return (\n    <DensityLens lensSize={160} zoomScale={2}>\n      <div className=\"p-8 bg-[#0C0C0C] rounded-2xl border border-[#222222]\">\n        <h3 className=\"text-sm font-semibold text-white\">System Architecture</h3>\n        <p className=\"text-xs text-[#808080] mt-2\">\n          Hover pointer across surface to inspect high-resolution telemetry nodes.\n        </p>\n      </div>\n    </DensityLens>\n  );\n}\n```\n\nDeclared props:\n- `children` (ReactNode) — Underlying background content being inspected\n- `renderLensContent` ((pos: { x: number, y: number, scale: number }) => ReactNode); default: undefined — Custom overlay rendered inside lens\n- `lensSize` (number); default: 150 — Diameter/width of lens in pixels\n- `lensShape` ('circle' | 'oval' | 'square'); default: 'circle' — Geometric shape of lens\n- `zoomScale` (number); default: 2 — Magnification factor\n- `showBorder` (boolean); default: true — Renders border and glass glow around perimeter\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/density-lens.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "37bb3034d59a4d3b21023d9464a981b3d8c337a74793ba72d8ba0a2c37a6b601",
    "features": [
      "Subtle spring lag cursor tracking for realistic tactile lens momentum",
      "Automatic coordinate interpolation with 2x magnification or custom overlay renderers",
      "Configurable lens geometry (circle, oval, rounded square), border glow, and zoom scale",
      "Zero layout shifts and smooth GPU-accelerated backdrop blur"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Underlying background content being inspected"
      },
      {
        "name": "renderLensContent",
        "type": "(pos: { x: number, y: number, scale: number }) => ReactNode",
        "default": "undefined",
        "description": "Custom overlay rendered inside lens"
      },
      {
        "name": "lensSize",
        "type": "number",
        "default": "150",
        "description": "Diameter/width of lens in pixels"
      },
      {
        "name": "lensShape",
        "type": "'circle' | 'oval' | 'square'",
        "default": "'circle'",
        "description": "Geometric shape of lens"
      },
      {
        "name": "zoomScale",
        "type": "number",
        "default": "2",
        "description": "Magnification factor"
      },
      {
        "name": "showBorder",
        "type": "boolean",
        "default": "true",
        "description": "Renders border and glass glow around perimeter"
      }
    ],
    "accessibility": [
      "Non-destructive hover lens overlay preserves underlying semantic document tree",
      "Includes crosshair pointer hints and smooth fade transitions",
      "Touch fallbacks support direct inspection"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DensityLens } from \"@/components/ui/density-lens\";\n\nexport function Demo() {\n  return (\n    <DensityLens lensSize={160} zoomScale={2}>\n      <div className=\"p-8 bg-[#0C0C0C] rounded-2xl border border-[#222222]\">\n        <h3 className=\"text-sm font-semibold text-white\">System Architecture</h3>\n        <p className=\"text-xs text-[#808080] mt-2\">\n          Hover pointer across surface to inspect high-resolution telemetry nodes.\n        </p>\n      </div>\n    </DensityLens>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DensityLens.tsx",
        "type": "registry:ui",
        "target": "components/ui/density-lens.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "dependency-trace",
    "name": "Dependency Trace",
    "tagline": "Interactive SVG node relationship & dependency tracer",
    "description": "An interactive SVG node graph that maps and dynamically traces relationship connections with directional bezier curves.",
    "category": "Motion",
    "badges": [
      "SVG",
      "Framer Motion",
      "Graph Visualization",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dependency-trace",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Dependency Trace component into my project.\n\nAn interactive SVG node graph that maps and dynamically traces relationship connections with directional bezier curves.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/dependency-trace\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DependencyTrace } from \"@/components/ui/dependency-trace\";\n\nexport function Demo() {\n  return (\n    <DependencyTrace\n      nodes={[\n        { id: 'gateway', label: 'Gateway' },\n        { id: 'auth', label: 'Auth Svc' },\n        { id: 'database', label: 'Postgres' },\n        { id: 'cache', label: 'Redis' },\n        { id: 'queue', label: 'Kafka' },\n      ]}\n      connections={[\n        { from: 'gateway', to: 'auth' },\n        { from: 'auth', to: 'database' },\n        { from: 'auth', to: 'cache' },\n        { from: 'gateway', to: 'queue' },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `nodes` (TraceNode[]) — Array of graph nodes (id, label, type, x, y)\n- `connections` (TraceConnection[]) — Array of directional or undirected link connections (from, to, label)\n- `onNodeSelect` ((id: string) => void); default: undefined — Node click event callback\n- `onNodeHover` ((id: string | null) => void); default: undefined — Hover event callback\n- `nodeSize` (number); default: 36 — Node diameter in pixels\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/dependency-trace.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "69adf8129e10ed9959b8c9c8fc4bca1505c66c2f4bc2207db064be9381438a2b",
    "features": [
      "Interactive bezier curve paths with animated glow pulses on hover",
      "Automatic dimming of unrelated network branches and nodes",
      "Configurable node placement or radial auto-layout geometry",
      "Accessible region landmark with hover & click selection telemetry"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "TraceNode[]",
        "description": "Array of graph nodes (id, label, type, x, y)"
      },
      {
        "name": "connections",
        "type": "TraceConnection[]",
        "description": "Array of directional or undirected link connections (from, to, label)"
      },
      {
        "name": "onNodeSelect",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Node click event callback"
      },
      {
        "name": "onNodeHover",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Hover event callback"
      },
      {
        "name": "nodeSize",
        "type": "number",
        "default": "36",
        "description": "Node diameter in pixels"
      }
    ],
    "accessibility": [
      "Semantic role=\"region\" and descriptive aria-label",
      "Full contrast ratio compliance across connected and dimmed states",
      "Keyboard and touch-friendly target radius"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DependencyTrace } from \"@/components/ui/dependency-trace\";\n\nexport function Demo() {\n  return (\n    <DependencyTrace\n      nodes={[\n        { id: 'gateway', label: 'Gateway' },\n        { id: 'auth', label: 'Auth Svc' },\n        { id: 'database', label: 'Postgres' },\n        { id: 'cache', label: 'Redis' },\n        { id: 'queue', label: 'Kafka' },\n      ]}\n      connections={[\n        { from: 'gateway', to: 'auth' },\n        { from: 'auth', to: 'database' },\n        { from: 'auth', to: 'cache' },\n        { from: 'gateway', to: 'queue' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DependencyTrace.tsx",
        "type": "registry:ui",
        "target": "components/ui/dependency-trace.tsx"
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
  },
  {
    "id": "depth-corridor",
    "name": "Depth Corridor",
    "tagline": "CSS 3D perspective tunnel with progressive depth blur",
    "description": "A 3D spatial layer stack with receding perspective depth, progressive focal blurs, and pointer parallax motion.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "3D Perspective",
      "Parallax",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/depth-corridor",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Depth Corridor component into my project.\n\nA 3D spatial layer stack with receding perspective depth, progressive focal blurs, and pointer parallax motion.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/depth-corridor\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DepthCorridor } from \"@/components/ui/depth-corridor\";\n\nexport function Demo() {\n  return (\n    <DepthCorridor\n      layers={[\n        { id: '1', title: 'Edge Telemetry', subtitle: 'Real-time p99 latency', content: <div>12.4ms global response</div> },\n        { id: '2', title: 'Cluster Workers', subtitle: 'Serverless nodes', content: <div>64 active workers</div> },\n        { id: '3', title: 'Cache Invalidation', subtitle: 'Instant purge API', content: <div>0.4s TTL sync</div> },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `layers` (DepthLayer[]) — Array of layer objects (id, title, subtitle, content, blurAmount)\n- `activeLayerIndex` (number); default: 0 — Controlled active foreground layer index\n- `onLayerChange` ((index: number) => void); default: undefined — Layer change event callback\n- `perspectiveDepth` (number); default: 1000 — CSS 3D perspective container depth in pixels\n- `enableParallax` (boolean); default: true — Enables mouse coordinate responsive 3D tilt\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/depth-corridor.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "fc4c0c32d19a27d3fa3d24ee754cd1eff0521bb3e108334e9e8fe01467c36382",
    "features": [
      "True 3D perspective translation (translateZ) and multi-layered receding depth geometry",
      "Progressive depth-of-field focal blurring and subtle mouse tracking parallax",
      "Keyboard arrow navigation (Left/Right/Up/Down) with smooth spring transitions",
      "Tactile indicator pills and interactive layer selection"
    ],
    "props": [
      {
        "name": "layers",
        "type": "DepthLayer[]",
        "description": "Array of layer objects (id, title, subtitle, content, blurAmount)"
      },
      {
        "name": "activeLayerIndex",
        "type": "number",
        "default": "0",
        "description": "Controlled active foreground layer index"
      },
      {
        "name": "onLayerChange",
        "type": "(index: number) => void",
        "default": "undefined",
        "description": "Layer change event callback"
      },
      {
        "name": "perspectiveDepth",
        "type": "number",
        "default": "1000",
        "description": "CSS 3D perspective container depth in pixels"
      },
      {
        "name": "enableParallax",
        "type": "boolean",
        "default": "true",
        "description": "Enables mouse coordinate responsive 3D tilt"
      }
    ],
    "accessibility": [
      "Focusable region with role=\"region\" and aria-label",
      "Arrow key support for rapid layer switching",
      "Respects reduced motion by calming perspective tilt and blur values"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DepthCorridor } from \"@/components/ui/depth-corridor\";\n\nexport function Demo() {\n  return (\n    <DepthCorridor\n      layers={[\n        { id: '1', title: 'Edge Telemetry', subtitle: 'Real-time p99 latency', content: <div>12.4ms global response</div> },\n        { id: '2', title: 'Cluster Workers', subtitle: 'Serverless nodes', content: <div>64 active workers</div> },\n        { id: '3', title: 'Cache Invalidation', subtitle: 'Instant purge API', content: <div>0.4s TTL sync</div> },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DepthCorridor.tsx",
        "type": "registry:ui",
        "target": "components/ui/depth-corridor.tsx"
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
  },
  {
    "id": "directional-tooltip",
    "name": "DirectionalTooltip",
    "tagline": "Appears from its origin direction",
    "description": "A tooltip that appears from the direction it originates — it starts a small distance outside the trigger in its preferred direction and springs inward, so it feels like it materializes from the trigger.",
    "category": "Overlays",
    "badges": [
      "Directional",
      "Spring In",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/directional-tooltip",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI DirectionalTooltip component into my project.\n\nA tooltip that appears from the direction it originates — it starts a small distance outside the trigger in its preferred direction and springs inward, so it feels like it materializes from the trigger.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/directional-tooltip\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DirectionalTooltip } from \"@/components/ui/directional-tooltip\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-4\">\n      <DirectionalTooltip content=\"Save your changes\" side=\"top\">\n        <PressButton>Save</PressButton>\n      </DirectionalTooltip>\n      <DirectionalTooltip content=\"Open command palette ⌘K\" side=\"bottom\" align=\"end\">\n        <PressButton variant=\"secondary\">Search</PressButton>\n      </DirectionalTooltip>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `content` (React.ReactNode); default: undefined — Tooltip body content\n- `side` ('top' | 'right' | 'bottom' | 'left'); default: 'top' — Preferred side for the tooltip\n- `align` ('start' | 'center' | 'end'); default: 'center' — Alignment along the chosen side\n- `delayDuration` (number); default: 150 — Delay before showing, in ms\n- `showArrow` (boolean); default: true — Show the arrow indicator\n- `offset` (number); default: 8 — Spacing from the trigger in px\n- `forceOpen` (boolean); default: false — Force the tooltip open (for previews)\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/directional-tooltip.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c767defd2db15fdae427ef5e2a6101e4750a49038f65a78835e132a9df98aff1",
    "features": [
      "Entry motion originates from the chosen side (top/right/bottom/left)",
      "Snappy spring (springSnappy) settles the tooltip into place",
      "Alignment per side: start / center / end",
      "Configurable delay, offset, and optional arrow indicator",
      "Light/dark theme aware via CSS variables"
    ],
    "props": [
      {
        "name": "content",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Tooltip body content"
      },
      {
        "name": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "default": "'top'",
        "description": "Preferred side for the tooltip"
      },
      {
        "name": "align",
        "type": "'start' | 'center' | 'end'",
        "default": "'center'",
        "description": "Alignment along the chosen side"
      },
      {
        "name": "delayDuration",
        "type": "number",
        "default": "150",
        "description": "Delay before showing, in ms"
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "default": "true",
        "description": "Show the arrow indicator"
      },
      {
        "name": "offset",
        "type": "number",
        "default": "8",
        "description": "Spacing from the trigger in px"
      },
      {
        "name": "forceOpen",
        "type": "boolean",
        "default": "false",
        "description": "Force the tooltip open (for previews)"
      }
    ],
    "accessibility": [
      "role=\"tooltip\" with aria-describedby on the trigger when open",
      "Hover and focus both show the tooltip; blur / mouseleave hide it",
      "Configurable delay so accidental hovers do not flood the UI"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { DirectionalTooltip } from \"@/components/ui/directional-tooltip\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-4\">\n      <DirectionalTooltip content=\"Save your changes\" side=\"top\">\n        <PressButton>Save</PressButton>\n      </DirectionalTooltip>\n      <DirectionalTooltip content=\"Open command palette ⌘K\" side=\"bottom\" align=\"end\">\n        <PressButton variant=\"secondary\">Search</PressButton>\n      </DirectionalTooltip>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DirectionalTooltip.tsx",
        "type": "registry:ui",
        "target": "components/ui/directional-tooltip.tsx"
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
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Donut Chart component into my project.\n\nA hand-written SVG donut and half-ring gauge with animated arcs, a live center readout, hover highlighting, and a legend that filters slices without collapsing the ring.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/donut-chart\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DonutChart } from \"@/components/ui/donut-chart\";\n\nconst data = [\n  { label: \"Compute\", value: 5240 },\n  { label: \"Storage\", value: 3180 },\n  { label: \"Bandwidth\", value: 2260 },\n  { label: \"Databases\", value: 1610 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <DonutChart\n        data={data}\n        centerLabel=\"Total spend\"\n        formatValue={(value) => `$${value.toLocaleString()}`}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `data` (DonutDatum[]) — Slices with a label, numeric value, and optional color\n- `variant` (\"donut\" | \"semi\"); default: \"donut\" — Renders a full ring or a half-ring gauge\n- `size` (number); default: 240 — Largest diameter in pixels; the chart shrinks to fit narrow containers\n- `thickness` (number); default: 16 — Stroke width of the ring in pixels\n- `centerLabel` (string); default: \"Total\" — Caption shown above the total in the center\n- `formatValue` ((n: number) => string); default: Intl.NumberFormat — Formats center values, slice values, and tooltips\n- `showLegend` (boolean); default: true — Shows the interactive slice legend\n- `animated` (boolean); default: true — Enables intro and value animations (disabled for reduced motion)\n- `ariaLabel` (string); default: auto-generated — Accessible description for the chart image role\n- `className` (string); default: \"\" — Additional CSS classes for the chart wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/donut-chart.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "dot-field",
    "name": "Dot Field",
    "tagline": "Lightweight static Canvas particle matrix background",
    "description": "High-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Static Visual",
      "Zero Overhead"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-field",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Dot Field component into my project.\n\nHigh-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/dot-field\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `dotRadius` (number); default: 1.5 — Radius of each individual dot (px)\n- `dotSpacing` (number); default: 14 — Spacing between adjacent dots in the grid (px)\n- `gradientFrom` (string); default: 'rgba(56, 189, 248, 0.35)' — Start gradient color\n- `gradientTo` (string); default: 'rgba(168, 85, 247, 0.25)' — End gradient color\n- `className` (string); default: '' — Optional container CSS class\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/dot-field.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "315365acb1ebe797fc6b233b22fcde1de252eba83845541d409f97fefac849f5",
    "features": [
      "Hardware-accelerated HTML5 Canvas rendering",
      "Zero CPU overhead — renders once and updates only on resize",
      "Clean linear gradient coloring with custom stops",
      "Responsive ResizeObserver layout support"
    ],
    "props": [
      {
        "name": "dotRadius",
        "type": "number",
        "default": "1.5",
        "description": "Radius of each individual dot (px)"
      },
      {
        "name": "dotSpacing",
        "type": "number",
        "default": "14",
        "description": "Spacing between adjacent dots in the grid (px)"
      },
      {
        "name": "gradientFrom",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.35)'",
        "description": "Start gradient color"
      },
      {
        "name": "gradientTo",
        "type": "string",
        "default": "'rgba(168, 85, 247, 0.25)'",
        "description": "End gradient color"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional container CSS class"
      }
    ],
    "accessibility": [
      "Canvas decorative element",
      "Aria-hidden/pointer-events safe layer"
    ],
    "createdAt": "2026-08-08",
    "usageCode": "import { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/DotField.tsx",
        "type": "registry:ui",
        "target": "components/ui/dot-field.tsx"
      },
      {
        "path": "src/components/ui/DotField.css",
        "type": "registry:ui",
        "target": "components/ui/dot-field.css"
      }
    ]
  },
  {
    "id": "dot-shader",
    "name": "Dot Shader",
    "tagline": "Interactive GPU dot matrix background with cursor proximity shader dynamics",
    "description": "A GPU-accelerated interactive dot matrix background shader with magnetic cursor repulsion, proximity illumination glow, dynamic lens scaling, and ambient wave motion.",
    "category": "Motion",
    "badges": [
      "WebGL",
      "GLSL Shader",
      "Interactive",
      "Background"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-shader",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Dot Shader component into my project.\n\nA GPU-accelerated interactive dot matrix background shader with magnetic cursor repulsion, proximity illumination glow, dynamic lens scaling, and ambient wave motion.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/dot-shader\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DotShader } from \"@/components/ui/dot-shader\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full min-h-[500px] rounded-2xl overflow-hidden bg-background border border-border\">\n      <DotShader\n        dotColor=\"rgba(255, 255, 255, 0.15)\"\n        accentColor=\"#00F0FF\"\n        spacing={24}\n        dotSize={1.5}\n        cursorRadius={200}\n        distortionStrength={0.4}\n        maxScale={2.5}\n      >\n        <div className=\"min-h-[500px] flex flex-col items-center justify-center text-center p-8\">\n          <span className=\"text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2\">\n            GPU WebGL Shader\n          </span>\n          <h2 className=\"text-3xl sm:text-5xl font-bold tracking-tight text-text-primary\">\n            Interactive Dot Matrix\n          </h2>\n          <p className=\"mt-3 text-xs sm:text-sm text-text-secondary max-w-md\">\n            Move your cursor across the canvas to experience magnetic repulsion and proximity illumination.\n          </p>\n        </div>\n      </DotShader>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `children` (ReactNode) — Optional content rendered above the interactive dot shader canvas with full clickability\n- `dotColor` (string); default: 'rgba(255, 255, 255, 0.15)' — Idle color of the background matrix dots (hex, rgb, or rgba)\n- `accentColor` (string); default: '#00F0FF' — Luminous highlight color of dots illuminated by cursor proximity\n- `dotSize` (number); default: 1.5 — Base radius in pixels of each individual dot\n- `spacing` (number); default: 22 — Distance in pixels between adjacent dots in the grid\n- `cursorRadius` (number); default: 180 — Radius in pixels of cursor influence and repulsion\n- `distortionStrength` (number); default: 0.35 — Force multiplier of magnetic repulsion away from the cursor (0 to 1)\n- `maxScale` (number); default: 2.2 — Maximum scale multiplier of dots at peak cursor proximity\n- `waveIntensity` (number); default: 0.25 — Amplitude of ambient idle sinusoidal wave motion\n- `speed` (number); default: 1 — Speed multiplier for the ambient background waves\n- `interactive` (boolean); default: true — Whether dots react to cursor movements with repulsion and illumination\n- `overlay` (boolean); default: true — Enables a soft radial vignette gradient to seamlessly blend container edges\n- `className` (string) — Additional CSS classes for container sizing and layout\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/dot-shader.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "48d363ae447ebfc179ec199cd4c0c9af1ca9645ad721d241f5924f4e94414bbb",
    "features": [
      "Hardware-accelerated WebGL point primitive vertex & fragment shader with Canvas 2D fallback",
      "Interactive cursor proximity illumination transitioning smoothly to accent color",
      "Magnetic/gravitational radial repulsion with smooth exponential damping",
      "Dynamic scale expansion creating a 3D lens bulge around the cursor",
      "Ambient wave undulation breathing subtle life into the background when idle",
      "Zero CPU overhead during rendering via GPU vertex shader positioning",
      "Supports wrapping arbitrary children without interfering with pointer interactions",
      "Full prefers-reduced-motion compliance freezing displacement and waves"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Optional content rendered above the interactive dot shader canvas with full clickability"
      },
      {
        "name": "dotColor",
        "type": "string",
        "default": "'rgba(255, 255, 255, 0.15)'",
        "description": "Idle color of the background matrix dots (hex, rgb, or rgba)"
      },
      {
        "name": "accentColor",
        "type": "string",
        "default": "'#00F0FF'",
        "description": "Luminous highlight color of dots illuminated by cursor proximity"
      },
      {
        "name": "dotSize",
        "type": "number",
        "default": "1.5",
        "description": "Base radius in pixels of each individual dot"
      },
      {
        "name": "spacing",
        "type": "number",
        "default": "22",
        "description": "Distance in pixels between adjacent dots in the grid"
      },
      {
        "name": "cursorRadius",
        "type": "number",
        "default": "180",
        "description": "Radius in pixels of cursor influence and repulsion"
      },
      {
        "name": "distortionStrength",
        "type": "number",
        "default": "0.35",
        "description": "Force multiplier of magnetic repulsion away from the cursor (0 to 1)"
      },
      {
        "name": "maxScale",
        "type": "number",
        "default": "2.2",
        "description": "Maximum scale multiplier of dots at peak cursor proximity"
      },
      {
        "name": "waveIntensity",
        "type": "number",
        "default": "0.25",
        "description": "Amplitude of ambient idle sinusoidal wave motion"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Speed multiplier for the ambient background waves"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "default": "true",
        "description": "Whether dots react to cursor movements with repulsion and illumination"
      },
      {
        "name": "overlay",
        "type": "boolean",
        "default": "true",
        "description": "Enables a soft radial vignette gradient to seamlessly blend container edges"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for container sizing and layout"
      }
    ],
    "accessibility": [
      "Shader canvas is marked with aria-hidden=\"true\" and pointer-events-none",
      "Child content remains fully accessible with standard keyboard, focus, and pointer events",
      "prefers-reduced-motion automatically disables wave animations and repulsion displacement, preserving calm static dots"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { DotShader } from \"@/components/ui/dot-shader\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full min-h-[500px] rounded-2xl overflow-hidden bg-background border border-border\">\n      <DotShader\n        dotColor=\"rgba(255, 255, 255, 0.15)\"\n        accentColor=\"#00F0FF\"\n        spacing={24}\n        dotSize={1.5}\n        cursorRadius={200}\n        distortionStrength={0.4}\n        maxScale={2.5}\n      >\n        <div className=\"min-h-[500px] flex flex-col items-center justify-center text-center p-8\">\n          <span className=\"text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2\">\n            GPU WebGL Shader\n          </span>\n          <h2 className=\"text-3xl sm:text-5xl font-bold tracking-tight text-text-primary\">\n            Interactive Dot Matrix\n          </h2>\n          <p className=\"mt-3 text-xs sm:text-sm text-text-secondary max-w-md\">\n            Move your cursor across the canvas to experience magnetic repulsion and proximity illumination.\n          </p>\n        </div>\n      </DotShader>\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/DotShader.tsx",
        "type": "registry:ui",
        "target": "components/ui/dot-shader.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "drag-to-confirm",
    "name": "Drag to Confirm",
    "tagline": "Spring-resistant slider for confirming destructive or critical operations",
    "description": "A minimalist physical drag-to-confirm slider for high-stakes and destructive actions, equipped with progressive track fill physics, spring snapback resistance, full light/dark theme adaptation, and accessible keyboard controls.",
    "category": "Buttons",
    "badges": [
      "Confirmation",
      "Gesture Physics",
      "Safety Controls",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/drag-to-confirm",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Drag to Confirm component into my project.\n\nA minimalist physical drag-to-confirm slider for high-stakes and destructive actions, equipped with progressive track fill physics, spring snapback resistance, full light/dark theme adaptation, and accessible keyboard controls.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/drag-to-confirm\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DragToConfirm } from \"@/components/ui/drag-to-confirm\";\n\nexport function Demo() {\n  return (\n    <DragToConfirm\n      actionType=\"delete\"\n      size=\"md\"\n      label=\"Slide to delete database →\"\n      confirmedLabel=\"Database Deleted ✓\"\n      onConfirm={() => console.log('Destroy action confirmed')}\n    />\n  );\n}\n```\n\nDeclared props:\n- `label` (string); default: 'Slide to confirm' — Action instruction text rendered along track\n- `confirmedLabel` (string); default: 'Confirmed ✓' — Text shown when slider locks into completion\n- `actionType` ('delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'); default: 'confirm' — Action preset style and icon archetype\n- `variant` ('default' | 'danger' | 'warning' | 'info' | 'success'); default: undefined — Visual tone variant override\n- `size` ('sm' | 'md' | 'lg'); default: 'md' — Slider dimension profile (sm: 40px, md: 48px, lg: 54px)\n- `icon` (React.ReactNode); default: undefined — Custom idle state icon rendered inside thumb\n- `confirmedIcon` (React.ReactNode); default: undefined — Custom confirmed state icon rendered inside thumb\n- `isConfirmed` (boolean); default: undefined — Controlled confirmation state\n- `onConfirm` (() => void); default: undefined — Callback triggered upon successful confirmation completion\n- `onReset` (() => void); default: undefined — Callback triggered upon slider reset\n- `autoResetDelay` (number); default: 2500 — Milliseconds before resetting back to start (0 to disable)\n- `haptic` (boolean); default: true — Triggers subtle vibration feedback upon confirmation\n- `disabled` (boolean); default: false — Disables slider gesture and interaction\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/drag-to-confirm.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ce36c3c5375781fb129c23e206f09dbe47aa8124e2888dd79bb20bea8bc7c647",
    "features": [
      "Clean minimalist pill geometry with seamless light and dark mode theme compatibility",
      "Dynamic progressive track fill that physically tracks the handle as you drag",
      "Physical gesture drag handle with calibrated spring snapback upon incomplete drags",
      "Supports Delete, Archive, Confirm, Submit, and Unlock action profiles with custom sizes (sm, md, lg)",
      "Automatic post-confirmation reset timer with customizable delay or controlled state support",
      "Full keyboard accessibility (Space, Enter, ArrowRight to trigger) and mobile haptic vibration feedback"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "'Slide to confirm'",
        "description": "Action instruction text rendered along track"
      },
      {
        "name": "confirmedLabel",
        "type": "string",
        "default": "'Confirmed ✓'",
        "description": "Text shown when slider locks into completion"
      },
      {
        "name": "actionType",
        "type": "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'",
        "default": "'confirm'",
        "description": "Action preset style and icon archetype"
      },
      {
        "name": "variant",
        "type": "'default' | 'danger' | 'warning' | 'info' | 'success'",
        "default": "undefined",
        "description": "Visual tone variant override"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Slider dimension profile (sm: 40px, md: 48px, lg: 54px)"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom idle state icon rendered inside thumb"
      },
      {
        "name": "confirmedIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom confirmed state icon rendered inside thumb"
      },
      {
        "name": "isConfirmed",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled confirmation state"
      },
      {
        "name": "onConfirm",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback triggered upon successful confirmation completion"
      },
      {
        "name": "onReset",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback triggered upon slider reset"
      },
      {
        "name": "autoResetDelay",
        "type": "number",
        "default": "2500",
        "description": "Milliseconds before resetting back to start (0 to disable)"
      },
      {
        "name": "haptic",
        "type": "boolean",
        "default": "true",
        "description": "Triggers subtle vibration feedback upon confirmation"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables slider gesture and interaction"
      }
    ],
    "accessibility": [
      "Accessible role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow attributes",
      "Focus-visible ring around draggable handle for keyboard navigators",
      "Space, Enter, and ArrowRight keys trigger animated confirmation sequence",
      "Screen reader fallback action button for assistive tech users",
      "Respects prefers-reduced-motion system preference"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { DragToConfirm } from \"@/components/ui/drag-to-confirm\";\n\nexport function Demo() {\n  return (\n    <DragToConfirm\n      actionType=\"delete\"\n      size=\"md\"\n      label=\"Slide to delete database →\"\n      confirmedLabel=\"Database Deleted ✓\"\n      onConfirm={() => console.log('Destroy action confirmed')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DragToConfirm.tsx",
        "type": "registry:ui",
        "target": "components/ui/drag-to-confirm.tsx"
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
  },
  {
    "id": "draw-checkbox",
    "name": "DrawCheckbox",
    "tagline": "Checkmark draws itself, then settles",
    "description": "A checkbox whose checkmark draws itself (path length animation) and settles with a tiny overshoot. The box scales from 0.9 -> 1.04 -> 1.0 for a tactile snap feel.",
    "category": "Forms",
    "badges": [
      "Path Draw",
      "Overshoot",
      "Indeterminate",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/draw-checkbox",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI DrawCheckbox component into my project.\n\nA checkbox whose checkmark draws itself (path length animation) and settles with a tiny overshoot. The box scales from 0.9 -> 1.04 -> 1.0 for a tactile snap feel.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/draw-checkbox\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DrawCheckbox } from \"@/components/ui/draw-checkbox\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3\">\n      <DrawCheckbox label=\"Email me product updates\" description=\"We send about one email per month.\" defaultChecked />\n      <DrawCheckbox label=\"Indeterminate option\" indeterminate />\n      <DrawCheckbox label=\"Accept terms\" />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `label` (React.ReactNode); default: undefined — Label text displayed next to the box\n- `description` (string); default: undefined — Helper text below the label\n- `indeterminate` (boolean); default: false — When true, renders a horizontal bar instead of a checkmark\n- `checked` (boolean); default: undefined — Controlled checked state\n- `defaultChecked` (boolean); default: false — Initial checked state (uncontrolled)\n- `disabled` (boolean); default: false — Prevents interaction\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/draw-checkbox.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "310fdb9f26b4b0be3d1cf56141ea548e1c23f50b93942d8f633ebeaf68b860e8",
    "features": [
      "Checkmark animates via stroke-dashoffset (path length 0 -> 1) with a snappy draw curve",
      "Box scales 0.9 -> 1.04 -> 1.0 for a tiny physical overshoot, then settles",
      "Indeterminate state draws a bar from left to right via scaleX origin",
      "Accent background swaps to var(--accent) when checked — theme aware",
      "Full controlled / uncontrolled state support, plus ref forwarding"
    ],
    "props": [
      {
        "name": "label",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Label text displayed next to the box"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the label"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "When true, renders a horizontal bar instead of a checkmark"
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled checked state"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      }
    ],
    "accessibility": [
      "Hidden native <input type=\"checkbox\"> preserves semantics and screen-reader support",
      "Visible box is a label proxy — clicking it forwards to the native input",
      "Disabled state communicated both visually and via aria-disabled"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { DrawCheckbox } from \"@/components/ui/draw-checkbox\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3\">\n      <DrawCheckbox label=\"Email me product updates\" description=\"We send about one email per month.\" defaultChecked />\n      <DrawCheckbox label=\"Indeterminate option\" indeterminate />\n      <DrawCheckbox label=\"Accept terms\" />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DrawCheckbox.tsx",
        "type": "registry:ui",
        "target": "components/ui/draw-checkbox.tsx"
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
  },
  {
    "id": "dynamic-island",
    "name": "Dynamic Island",
    "tagline": "Continuous physical morphing island with spring layout physics",
    "description": "A physical morphing island component that smoothly transitions between a compact indicator, interactive summary, profile card, and social dock with spring physics.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Layout Morphing",
      "Spring Physics",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dynamic-island",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Dynamic Island component into my project.\n\nA physical morphing island component that smoothly transitions between a compact indicator, interactive summary, profile card, and social dock with spring physics.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/dynamic-island\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { DynamicIsland } from \"@/components/ui/dynamic-island\";\n\nexport function Demo() {\n  return (\n    <DynamicIsland\n      name=\"Suraj Maurya\"\n      role=\"Frontend Developer\"\n      description=\"Building thoughtful interfaces with React and Next.js.\"\n      statusText=\"Available for hire\"\n      socials={{\n        github: \"https://github.com/Surajmaurya1\",\n        x: \"https://x.com\",\n        linkedin: \"https://linkedin.com\",\n        instagram: \"https://instagram.com\",\n        email: \"mailto:suraj@example.com\",\n      }}\n    />\n  );\n}\n```\n\nDeclared props:\n- `avatar` (string); default: undefined — URL of user avatar image\n- `avatarAlt` (string); default: undefined — Alt text for the avatar image\n- `name` (string); default: 'Suraj Maurya' — Display name in expanded and profile views\n- `role` (string); default: 'Frontend Developer' — Subtitle or profession title\n- `description` (string); default: 'Building thoughtful interfaces...' — Bio or description text rendered in profile view\n- `greeting` (string); default: 'Hello, I am [name]' — Custom message displayed in expanded state\n- `statusText` (string); default: 'Available for work' — Optional availability chip displayed beside name\n- `metadata` (DynamicIslandMetadataItem[]); default: undefined — Key-value badges rendered in profile card\n- `socials` (DynamicIslandSocials); default: 5 default links — Social links as an array of items or platform key-value object\n- `state` ('collapsed' | 'expanded' | 'profile' | 'share'); default: undefined — Controlled state value\n- `defaultState` ('collapsed' | 'expanded' | 'profile' | 'share'); default: 'collapsed' — Initial uncontrolled state\n- `onStateChange` ((state: DynamicIslandState) => void); default: undefined — Callback invoked whenever state changes\n- `profileContent` (ReactNode); default: undefined — Custom ReactNode replacing default profile body\n- `shareContent` (ReactNode); default: undefined — Custom ReactNode replacing default share dock\n- `className` (string); default: undefined — Optional additional styling applied to the island container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/dynamic-island.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "9f8655fc1ce14886378d295f1e6fabfc95357637208d560bd71f7347846ccda8",
    "features": [
      "Continuous physical morphing between collapsed, expanded, profile, and share states",
      "Spring-based layout-aware geometry and radius interpolation with no abrupt snapping",
      "Persistent spatial continuity for the avatar across collapsed and profile states",
      "Fully accessible keyboard navigation with Escape key dismissal and click-outside collapse",
      "Configurable social dock supporting predefined platform detection and custom links",
      "Light and dark mode compatibility adhering strictly to the EasyUI design token system",
      "Respects prefers-reduced-motion media query with instant fallback states"
    ],
    "props": [
      {
        "name": "avatar",
        "type": "string",
        "default": "undefined",
        "description": "URL of user avatar image"
      },
      {
        "name": "avatarAlt",
        "type": "string",
        "default": "undefined",
        "description": "Alt text for the avatar image"
      },
      {
        "name": "name",
        "type": "string",
        "default": "'Suraj Maurya'",
        "description": "Display name in expanded and profile views"
      },
      {
        "name": "role",
        "type": "string",
        "default": "'Frontend Developer'",
        "description": "Subtitle or profession title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Building thoughtful interfaces...'",
        "description": "Bio or description text rendered in profile view"
      },
      {
        "name": "greeting",
        "type": "string",
        "default": "'Hello, I am [name]'",
        "description": "Custom message displayed in expanded state"
      },
      {
        "name": "statusText",
        "type": "string",
        "default": "'Available for work'",
        "description": "Optional availability chip displayed beside name"
      },
      {
        "name": "metadata",
        "type": "DynamicIslandMetadataItem[]",
        "default": "undefined",
        "description": "Key-value badges rendered in profile card"
      },
      {
        "name": "socials",
        "type": "DynamicIslandSocials",
        "default": "5 default links",
        "description": "Social links as an array of items or platform key-value object"
      },
      {
        "name": "state",
        "type": "'collapsed' | 'expanded' | 'profile' | 'share'",
        "default": "undefined",
        "description": "Controlled state value"
      },
      {
        "name": "defaultState",
        "type": "'collapsed' | 'expanded' | 'profile' | 'share'",
        "default": "'collapsed'",
        "description": "Initial uncontrolled state"
      },
      {
        "name": "onStateChange",
        "type": "(state: DynamicIslandState) => void",
        "default": "undefined",
        "description": "Callback invoked whenever state changes"
      },
      {
        "name": "profileContent",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom ReactNode replacing default profile body"
      },
      {
        "name": "shareContent",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom ReactNode replacing default share dock"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional additional styling applied to the island container"
      }
    ],
    "accessibility": [
      "Semantic native button and anchor elements with descriptive aria-labels",
      "Escape key dismisses island back to collapsed state",
      "Clicking outside the island boundary automatically collapses it",
      "Full keyboard tabbing order across controls and social anchors with focus-ring outlines",
      "Respects prefers-reduced-motion query by eliminating spring animations"
    ],
    "createdAt": "2026-10-05",
    "usageCode": "import { DynamicIsland } from \"@/components/ui/dynamic-island\";\n\nexport function Demo() {\n  return (\n    <DynamicIsland\n      name=\"Suraj Maurya\"\n      role=\"Frontend Developer\"\n      description=\"Building thoughtful interfaces with React and Next.js.\"\n      statusText=\"Available for hire\"\n      socials={{\n        github: \"https://github.com/Surajmaurya1\",\n        x: \"https://x.com\",\n        linkedin: \"https://linkedin.com\",\n        instagram: \"https://instagram.com\",\n        email: \"mailto:suraj@example.com\",\n      }}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DynamicIsland.tsx",
        "type": "registry:ui",
        "target": "components/ui/dynamic-island.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "earnings",
    "name": "Earnings",
    "tagline": "Earnings summary card with count-up total, scrubable trend, and source breakdown",
    "description": "An earnings summary card that counts up the total, plots a scrubable trend line, and breaks income down by source with a hoverable split bar and a 7D / 30D / 12M period switcher. Light and dark themes, fully responsive.",
    "category": "Feedback",
    "badges": [
      "Data Visualization",
      "Earnings",
      "SVG",
      "Split Bar",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/earnings",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Earnings component into my project.\n\nAn earnings summary card that counts up the total, plots a scrubable trend line, and breaks income down by source with a hoverable split bar and a 7D / 30D / 12M period switcher. Light and dark themes, fully responsive.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/earnings\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Earnings, type EarningsPeriod } from \"@/components/ui/earnings\";\n\nconst periods: EarningsPeriod[] = [\n  {\n    id: \"30d\",\n    label: \"30D\",\n    comparison: \"vs previous 30 days\",\n    previous: 9800,\n    trend: [240, 310, 280, 390, 420, 380, 510],\n    trendLabels: [\"Oct 1\", \"Oct 6\", \"Oct 11\", \"Oct 16\", \"Oct 21\", \"Oct 26\", \"Oct 31\"],\n    sources: [\n      { id: \"sponsors\", label: \"Sponsors\", amount: 4200, change: 8.2 },\n      { id: \"pro\", label: \"Pro licenses\", amount: 3100, change: 14.6 },\n      { id: \"affiliate\", label: \"Affiliate\", amount: 1250, change: -3.1 },\n    ],\n  },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-[520px]\">\n      <Earnings\n        periods={periods}\n        payout={{ date: \"Nov 5\", amount: 1240 }}\n        onPeriodChange={(id) => console.log(id)}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `periods` (EarningsPeriod[]) — Period datasets, each with its trend, optional previous total, and income sources\n- `defaultPeriod` (string); default: second period when 3+ exist — ID of the period shown first\n- `onPeriodChange` ((id: string) => void); default: undefined — Called when the active period changes\n- `title` (string); default: 'Earnings' — Card heading and default readout label\n- `currency` (string); default: 'USD' — ISO currency code passed to Intl.NumberFormat\n- `locale` (string); default: 'en-US' — Locale used for currency formatting\n- `payout` ({ label?: string; date: string; amount?: number }); default: undefined — Optional footer line for the next payout\n- `animated` (boolean); default: true — Counts numbers up and animates the chart on mount; reduced motion always wins\n- `className` (string); default: '' — Additional CSS classes for the card root\n- `EarningsPeriod.id` (string) — Unique period identifier used by the switcher\n- `EarningsPeriod.label` (string) — Segmented-control label such as \"30D\"\n- `EarningsPeriod.comparison` (string) — Caption under the delta, e.g. \"vs previous 30 days\"\n- `EarningsPeriod.total` (number) — Headline total; defaults to the sum of the sources\n- `EarningsPeriod.previous` (number) — Previous-period total used to compute the delta\n- `EarningsPeriod.trend` (number[]) — Earnings per point, ordered oldest to newest\n- `EarningsPeriod.trendLabels` (string[]) — Names for each trend point, shown while scrubbing\n- `EarningsPeriod.sources` (EarningsSource[]) — Income sources with amount, optional change, color, and icon\n- `EarningsSource.id` (string) — Unique source identifier\n- `EarningsSource.label` (string) — Source name used in the list and readout\n- `EarningsSource.amount` (number) — Amount earned from this source in the period\n- `EarningsSource.change` (number) — Percent change versus the previous period\n- `EarningsSource.color` (string) — Any CSS color; defaults to a palette entry\n- `EarningsSource.icon` (ReactNode) — Optional icon; defaults to a colored initial\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/earnings.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "77336dc85d26668692b75aec3e627a51c6d0059bb31d5fb26d02e2e38f248c1e",
    "features": [
      "Count-up headline total with a direction-aware delta pill against the previous period",
      "Hand-drawn monotone cubic trend line that resamples and morphs smoothly between periods",
      "Pointer, touch, and keyboard scrubbing with a spring-tracked crosshair and per-point labels",
      "Single split bar plus a row per income source, each with a share bar and optional change badge",
      "Hover, tap, or focus a source to promote it to the headline readout and dim the rest",
      "Segmented 7D / 30D / 12M switcher with layout-animated selection and an onPeriodChange callback",
      "Optional next-payout footer with a formatted amount",
      "Intl currency and locale formatting, light and dark themes, and prefers-reduced-motion support"
    ],
    "props": [
      {
        "name": "periods",
        "type": "EarningsPeriod[]",
        "description": "Period datasets, each with its trend, optional previous total, and income sources"
      },
      {
        "name": "defaultPeriod",
        "type": "string",
        "default": "second period when 3+ exist",
        "description": "ID of the period shown first"
      },
      {
        "name": "onPeriodChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Called when the active period changes"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Earnings'",
        "description": "Card heading and default readout label"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'USD'",
        "description": "ISO currency code passed to Intl.NumberFormat"
      },
      {
        "name": "locale",
        "type": "string",
        "default": "'en-US'",
        "description": "Locale used for currency formatting"
      },
      {
        "name": "payout",
        "type": "{ label?: string; date: string; amount?: number }",
        "default": "undefined",
        "description": "Optional footer line for the next payout"
      },
      {
        "name": "animated",
        "type": "boolean",
        "default": "true",
        "description": "Counts numbers up and animates the chart on mount; reduced motion always wins"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Additional CSS classes for the card root"
      },
      {
        "name": "EarningsPeriod.id",
        "type": "string",
        "description": "Unique period identifier used by the switcher"
      },
      {
        "name": "EarningsPeriod.label",
        "type": "string",
        "description": "Segmented-control label such as \"30D\""
      },
      {
        "name": "EarningsPeriod.comparison",
        "type": "string",
        "description": "Caption under the delta, e.g. \"vs previous 30 days\""
      },
      {
        "name": "EarningsPeriod.total",
        "type": "number",
        "description": "Headline total; defaults to the sum of the sources"
      },
      {
        "name": "EarningsPeriod.previous",
        "type": "number",
        "description": "Previous-period total used to compute the delta"
      },
      {
        "name": "EarningsPeriod.trend",
        "type": "number[]",
        "description": "Earnings per point, ordered oldest to newest"
      },
      {
        "name": "EarningsPeriod.trendLabels",
        "type": "string[]",
        "description": "Names for each trend point, shown while scrubbing"
      },
      {
        "name": "EarningsPeriod.sources",
        "type": "EarningsSource[]",
        "description": "Income sources with amount, optional change, color, and icon"
      },
      {
        "name": "EarningsSource.id",
        "type": "string",
        "description": "Unique source identifier"
      },
      {
        "name": "EarningsSource.label",
        "type": "string",
        "description": "Source name used in the list and readout"
      },
      {
        "name": "EarningsSource.amount",
        "type": "number",
        "description": "Amount earned from this source in the period"
      },
      {
        "name": "EarningsSource.change",
        "type": "number",
        "description": "Percent change versus the previous period"
      },
      {
        "name": "EarningsSource.color",
        "type": "string",
        "description": "Any CSS color; defaults to a palette entry"
      },
      {
        "name": "EarningsSource.icon",
        "type": "ReactNode",
        "description": "Optional icon; defaults to a colored initial"
      }
    ],
    "accessibility": [
      "The card is a labelled section with an aria-live readout for totals, sources, and scrubbed points",
      "The trend SVG is focusable and supports ArrowLeft, ArrowRight, and Escape for keyboard scrubbing",
      "Source rows are native buttons with aria-pressed and visible focus rings",
      "A visually hidden table mirrors every source amount and share for screen readers",
      "prefers-reduced-motion disables count-ups, line draw, and spring transitions"
    ],
    "createdAt": "2026-11-02",
    "usageCode": "import { Earnings, type EarningsPeriod } from \"@/components/ui/earnings\";\n\nconst periods: EarningsPeriod[] = [\n  {\n    id: \"30d\",\n    label: \"30D\",\n    comparison: \"vs previous 30 days\",\n    previous: 9800,\n    trend: [240, 310, 280, 390, 420, 380, 510],\n    trendLabels: [\"Oct 1\", \"Oct 6\", \"Oct 11\", \"Oct 16\", \"Oct 21\", \"Oct 26\", \"Oct 31\"],\n    sources: [\n      { id: \"sponsors\", label: \"Sponsors\", amount: 4200, change: 8.2 },\n      { id: \"pro\", label: \"Pro licenses\", amount: 3100, change: 14.6 },\n      { id: \"affiliate\", label: \"Affiliate\", amount: 1250, change: -3.1 },\n    ],\n  },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-[520px]\">\n      <Earnings\n        periods={periods}\n        payout={{ date: \"Nov 5\", amount: 1240 }}\n        onPeriodChange={(id) => console.log(id)}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/Earnings.tsx",
        "type": "registry:ui",
        "target": "components/ui/earnings.tsx"
      }
    ]
  },
  {
    "id": "evil-eye",
    "name": "Evil Eye",
    "tagline": "Pointer-driven hanging amulet with layered spring physics",
    "description": "A hanging navy amulet disc with concentric sky-blue and white rings that swings with realistic inertia in response to the pointer, painted as a layered SVG and driven by a single spring pipeline.",
    "category": "Motion",
    "badges": [
      "Spring Physics",
      "Pointer Tracking",
      "Layered Motion",
      "Painted SVG"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/evil-eye",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Evil Eye component into my project.\n\nA hanging navy amulet disc with concentric sky-blue and white rings that swings with realistic inertia in response to the pointer, painted as a layered SVG and driven by a single spring pipeline.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/evil-eye\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { EvilEye } from \"@/components/ui/evil-eye\";\n\nexport function Demo() {\n  return (\n    <EvilEye\n      maxRotation={13}\n      stiffnessX={55}\n      stiffnessY={45}\n      damping={9}\n      caption=\"Hanging evil eye amulet\"\n    />\n  );\n}\n```\n\nDeclared props:\n- `maxRotation` (number); default: 13 — Maximum rotation in degrees at full pointer offset\n- `stiffnessX` (number); default: 55 — Pointer X spring stiffness (higher = snappier follow)\n- `stiffnessY` (number); default: 45 — Pointer Y spring stiffness\n- `damping` (number); default: 9 — Spring damping (higher = less swing overshoot)\n- `caption` (string); default: undefined — Optional screen-reader caption for the amulet\n- `className` (string); default: undefined — Additional Tailwind classes merged into the container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/evil-eye.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ebedcff1363334c3781e1030159c49621ad4aaa5ace97843b3f2fb9ac57e0b82",
    "features": [
      "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
      "Layered secondary motion — braided cord, metallic cap, and amulet disc each swing independently",
      "Painted SVG with radial gradients for the navy disc, sky-blue ring, and the signature pupil glint",
      "Configurable spring stiffness, damping, and max rotation for tuning the physical feel",
      "Geometry-aware normalization that adapts to the actual container size",
      "Respects prefers-reduced-motion with a clean static rest pose",
      "Graceful degradation when pointer events are unavailable"
    ],
    "props": [
      {
        "name": "maxRotation",
        "type": "number",
        "default": "13",
        "description": "Maximum rotation in degrees at full pointer offset"
      },
      {
        "name": "stiffnessX",
        "type": "number",
        "default": "55",
        "description": "Pointer X spring stiffness (higher = snappier follow)"
      },
      {
        "name": "stiffnessY",
        "type": "number",
        "default": "45",
        "description": "Pointer Y spring stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "9",
        "description": "Spring damping (higher = less swing overshoot)"
      },
      {
        "name": "caption",
        "type": "string",
        "default": "undefined",
        "description": "Optional screen-reader caption for the amulet"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the container"
      }
    ],
    "accessibility": [
      "role=\"img\" with descriptive aria-label for screen readers",
      "Touch-none and select-none to avoid stray text selection while interacting",
      "Complete prefers-reduced-motion fallback: pointer listeners are never wired, amulet rests in place",
      "Decorative SVG marked aria-hidden"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { EvilEye } from \"@/components/ui/evil-eye\";\n\nexport function Demo() {\n  return (\n    <EvilEye\n      maxRotation={13}\n      stiffnessX={55}\n      stiffnessY={45}\n      damping={9}\n      caption=\"Hanging evil eye amulet\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/EvilEye.tsx",
        "type": "registry:ui",
        "target": "components/ui/evil-eye.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "expandable-data-row",
    "name": "Expandable Data Row",
    "tagline": "Smooth unfolding table row with deep metadata and responsive mobile conversion",
    "description": "A polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.",
    "category": "Motion",
    "badges": [
      "Tables",
      "Accordion Motion",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-data-row",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Expandable Data Row component into my project.\n\nA polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/expandable-data-row\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ExpandableDataRow } from \"@/components/ui/expandable-data-row\";\n\nexport function Demo() {\n  return (\n    <ExpandableDataRow\n      items={[\n        {\n          id: \"usr_01\",\n          user: { name: \"Sarah Connor\", email: \"sarah@cyberdyne.io\" },\n          status: \"active\",\n          revenue: \"$4,280\",\n          date: \"Oct 24, 2026\",\n          metadata: { plan: \"Enterprise Plus\", sessions: 482 },\n        }\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (DataRowItem[]); default: [...] — Data records with user, status, revenue, and metadata\n- `allowMultiple` (boolean); default: false — Permit multiple expanded rows concurrently\n- `defaultExpandedIds` (string[]); default: ['usr_01'] — Initially expanded row identifiers\n- `isLoading` (boolean); default: false — Displays pulse skeleton loaders during data fetch\n- `onRowAction` ((action: string, row: DataRowItem) => void); default: undefined — Callback fired on row action buttons\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/expandable-data-row.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "96faa77870b8719d1d6563523e47e532862cfc7d03a3f06ad63f21805e8c220e",
    "features": [
      "Soft accordion expansion unfolding details directly beneath rows without modals",
      "Single or multi-row simultaneous expansion modes",
      "Full metadata breakdown with account metrics and historical activity timeline",
      "Adaptive layout engine transforming desktop table into touch cards on mobile devices",
      "Integrated quick actions with one-click email copying and callback hooks"
    ],
    "props": [
      {
        "name": "items",
        "type": "DataRowItem[]",
        "default": "[...]",
        "description": "Data records with user, status, revenue, and metadata"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Permit multiple expanded rows concurrently"
      },
      {
        "name": "defaultExpandedIds",
        "type": "string[]",
        "default": "['usr_01']",
        "description": "Initially expanded row identifiers"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays pulse skeleton loaders during data fetch"
      },
      {
        "name": "onRowAction",
        "type": "(action: string, row: DataRowItem) => void",
        "default": "undefined",
        "description": "Callback fired on row action buttons"
      }
    ],
    "accessibility": [
      "Aria-expanded attributes and keyboard navigation (Enter, Space, Tab)",
      "Semantic table row and button hierarchy compliant with WCAG 2.1 AA",
      "Reduced motion support with instant height visibility toggle"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ExpandableDataRow } from \"@/components/ui/expandable-data-row\";\n\nexport function Demo() {\n  return (\n    <ExpandableDataRow\n      items={[\n        {\n          id: \"usr_01\",\n          user: { name: \"Sarah Connor\", email: \"sarah@cyberdyne.io\" },\n          status: \"active\",\n          revenue: \"$4,280\",\n          date: \"Oct 24, 2026\",\n          metadata: { plan: \"Enterprise Plus\", sessions: 482 },\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableDataRow.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-data-row.tsx"
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
  },
  {
    "id": "expandable-search",
    "name": "Expandable Search",
    "tagline": "Compact spring width morphing search input",
    "description": "A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.",
    "category": "Navigation",
    "badges": [
      "Spring Expansion",
      "Shortcuts",
      "Compact"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-search",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Expandable Search component into my project.\n\nA compact search pill that smoothly widens on focus with shortcut hint pills and clear button.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/expandable-search\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}\n```\n\nDeclared props:\n- `placeholder` (string); default: 'Search...' — Input placeholder text\n- `onSearch` ((query: string) => void); default: undefined — Search query callback\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/expandable-search.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "23f6bf95180308d81d92ea95dc6cf1190aba2597e39cb22621f1f42224ab7737",
    "features": [
      "Spring physics width expansion",
      "Shortcut badge hint",
      "Instant clear button on input"
    ],
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSearch",
        "type": "(query: string) => void",
        "default": "undefined",
        "description": "Search query callback"
      }
    ],
    "accessibility": [
      "Accessible search input role",
      "Clear button accessible label"
    ],
    "createdAt": "2026-08-02",
    "usageCode": "import { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-search.tsx"
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
  },
  {
    "id": "faq",
    "name": "FAQ",
    "tagline": "Expandable spring-physics accordion with search & category filtering",
    "description": "An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.",
    "category": "Feedback",
    "badges": [
      "FAQ",
      "Accordion",
      "Spring Physics",
      "Searchable",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/faq",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI FAQ component into my project.\n\nAn expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/faq\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { FAQ } from \"@/components/ui/faq\";\n\nexport function Demo() {\n  return (\n    <FAQ\n      allowMultiple\n      searchable\n      items={[\n        {\n          id: \"1\",\n          question: \"What makes EasyUI different?\",\n          answer: \"EasyUI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions.\"\n        },\n        {\n          id: \"2\",\n          question: \"Can I customize the styling?\",\n          answer: \"Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers.\"\n        }\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (FAQItem[]); default: [] — Array of FAQ items with id, question, answer, category, badge, icon\n- `allowMultiple` (boolean); default: false — Allows multiple accordion items to remain open simultaneously\n- `defaultOpen` (string[] | string); default: undefined — Default expanded item ID(s) on initial mount\n- `openIds` (string[]); default: undefined — Controlled list of currently expanded item IDs\n- `onOpenChange` ((ids: string[]) => void); default: undefined — Callback fired when open item selection changes\n- `iconStyle` ('chevron' | 'plus-minus' | 'custom'); default: 'chevron' — Indicator icon style\n- `searchable` (boolean); default: false — Displays search filter bar above FAQ items\n- `showCategories` (boolean); default: false — Displays category filter pills above items\n- `variant` ('unified' | 'separated'); default: 'unified' — Visual presentation layout\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/faq.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ec4838e99f36ec3ac45ac8e59cb8b556b414896f30422ea8957a3de4e4ef2ee9",
    "features": [
      "Smooth height calculation and rotation via Framer Motion springGentle",
      "Single-open accordion or multi-open simultaneous expansion modes",
      "Controlled and uncontrolled state management (openIds / defaultOpen)",
      "Integrated search filter bar and optional category filter pills",
      "Two layout modes: Unified grouped card or separated individual cards",
      "Full keyboard accessibility (Space, Enter, Tab) and ARIA attributes"
    ],
    "props": [
      {
        "name": "items",
        "type": "FAQItem[]",
        "default": "[]",
        "description": "Array of FAQ items with id, question, answer, category, badge, icon"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows multiple accordion items to remain open simultaneously"
      },
      {
        "name": "defaultOpen",
        "type": "string[] | string",
        "default": "undefined",
        "description": "Default expanded item ID(s) on initial mount"
      },
      {
        "name": "openIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled list of currently expanded item IDs"
      },
      {
        "name": "onOpenChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Callback fired when open item selection changes"
      },
      {
        "name": "iconStyle",
        "type": "'chevron' | 'plus-minus' | 'custom'",
        "default": "'chevron'",
        "description": "Indicator icon style"
      },
      {
        "name": "searchable",
        "type": "boolean",
        "default": "false",
        "description": "Displays search filter bar above FAQ items"
      },
      {
        "name": "showCategories",
        "type": "boolean",
        "default": "false",
        "description": "Displays category filter pills above items"
      },
      {
        "name": "variant",
        "type": "'unified' | 'separated'",
        "default": "'unified'",
        "description": "Visual presentation layout"
      }
    ],
    "accessibility": [
      "aria-expanded state and aria-controls linking button headers to content regions",
      "Semantic role=\"region\" and aria-labelledby on accordion content panels",
      "Keyboard activation via Space and Enter with sky focus ring",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { FAQ } from \"@/components/ui/faq\";\n\nexport function Demo() {\n  return (\n    <FAQ\n      allowMultiple\n      searchable\n      items={[\n        {\n          id: \"1\",\n          question: \"What makes EasyUI different?\",\n          answer: \"EasyUI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions.\"\n        },\n        {\n          id: \"2\",\n          question: \"Can I customize the styling?\",\n          answer: \"Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers.\"\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FAQ.tsx",
        "type": "registry:ui",
        "target": "components/ui/faq.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "floating-action-dock",
    "name": "Floating Action Dock",
    "tagline": "Magnification curve with physical spring feedback",
    "description": "A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.",
    "category": "Navigation",
    "badges": [
      "Pointer Physics",
      "Magnification Curve",
      "Tooltips"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/floating-action-dock",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Floating Action Dock component into my project.\n\nA floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/floating-action-dock\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}\n```\n\nDeclared props:\n- `items` (DockItem[]); default: [] — Dock icons with labels, actions, and icons\n- `activeId` (string); default: undefined — Current active item identifier\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/floating-action-dock.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "75070e00908f47f776c53d704e3a25a74101e4ebfe9c9417299358d45da810e4",
    "features": [
      "Continuous distance interpolation curve",
      "Tooltips with instant spring opacity",
      "Active status indicator dot"
    ],
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "default": "[]",
        "description": "Dock icons with labels, actions, and icons"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Current active item identifier"
      }
    ],
    "accessibility": [
      "Standard aria-labels for every button item",
      "Accessible keyboard focus"
    ],
    "createdAt": "2026-08-12",
    "usageCode": "import { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/FloatingActionDock.tsx",
        "type": "registry:ui",
        "target": "components/ui/floating-action-dock.tsx"
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
  },
  {
    "id": "focus-mode",
    "name": "Focus Mode",
    "tagline": "Atmospheric UI isolation dimming background distractions without layout shifts",
    "description": "An atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.",
    "category": "Motion",
    "badges": [
      "Focus Mode",
      "Motion Physics",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/focus-mode",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Focus Mode component into my project.\n\nAn atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/focus-mode\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { FocusMode } from \"@/components/ui/focus-mode\";\n\nexport function Demo() {\n  return (\n    <FocusMode\n      items={[\n        {\n          id: \"mrr\",\n          title: \"Monthly Recurring Revenue\",\n          metric: \"$148,290\",\n          delta: \"+18.4%\",\n          content: <p>Enterprise plan renewals</p>\n        }\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (FocusModeItem[]); default: [...] — List of dashboard cards or sections\n- `focusedId` (string | null); default: null — Controlled focused card ID\n- `onFocusChange` ((id: string | null) => void); default: undefined — Callback fired when focused element changes\n- `dimOpacity` (number); default: 0.2 — Opacity applied to unfocused background cards\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/focus-mode.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "089480f265da316e7818cadee50e9e8ff17a9efde1c2436f11a609d3fc640974",
    "features": [
      "Subtle background opacity dampening bringing selected components into focus",
      "Zero layout shift architecture keeping existing dashboard grid geometry intact",
      "Tactile spring scaling and border elevation on active focused target",
      "Keyboard Escape key listener and explicit exit controls",
      "Reduced motion support with instant opacity transitions"
    ],
    "props": [
      {
        "name": "items",
        "type": "FocusModeItem[]",
        "default": "[...]",
        "description": "List of dashboard cards or sections"
      },
      {
        "name": "focusedId",
        "type": "string | null",
        "default": "null",
        "description": "Controlled focused card ID"
      },
      {
        "name": "onFocusChange",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Callback fired when focused element changes"
      },
      {
        "name": "dimOpacity",
        "type": "number",
        "default": "0.2",
        "description": "Opacity applied to unfocused background cards"
      }
    ],
    "accessibility": [
      "Escape key listener automatically dismisses focus mode and restores full viewport opacity",
      "Focus rings remain strictly compliant with EasyUI sky-400 tokens"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { FocusMode } from \"@/components/ui/focus-mode\";\n\nexport function Demo() {\n  return (\n    <FocusMode\n      items={[\n        {\n          id: \"mrr\",\n          title: \"Monthly Recurring Revenue\",\n          metric: \"$148,290\",\n          delta: \"+18.4%\",\n          content: <p>Enterprise plan renewals</p>\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FocusMode.tsx",
        "type": "registry:ui",
        "target": "components/ui/focus-mode.tsx"
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
  },
  {
    "id": "form",
    "name": "Form",
    "tagline": "Composable, accessible form primitives and controls",
    "description": "A modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.",
    "category": "Forms",
    "badges": [
      "Forms",
      "Accessible",
      "Spring Motion",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/form",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Form component into my project.\n\nA modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/form\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from \"@/components/ui/form\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [email, setEmail] = useState(\"\");\n  const [error, setError] = useState(\"\");\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!email.includes(\"@\")) {\n      setError(\"Please enter a valid email address.\");\n    } else {\n      setError(\"\");\n    }\n  };\n\n  return (\n    <Form onSubmit={handleSubmit} className=\"max-w-sm\">\n      <FormItem>\n        <FormLabel required>Email Address</FormLabel>\n        <FormControl>\n          <Input\n            type=\"email\"\n            placeholder=\"you@company.com\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            error={!!error}\n          />\n        </FormControl>\n        <FormDescription>We will never share your email.</FormDescription>\n        <FormMessage error={error} />\n      </FormItem>\n      <Button type=\"submit\" variant=\"primary\" fullWidth>\n        Submit\n      </Button>\n    </Form>\n  );\n}\n```\n\nDeclared props:\n- `onSubmit` ((e: FormEvent) => void); default: undefined — Form submission handler\n- `error` (string | boolean); default: undefined — Validation error text or boolean trigger\n- `showPasswordToggle` (boolean); default: false — Enables eye icon toggle for password inputs\n- `required` (boolean); default: false — Displays red asterisk and enforces requirement\n- `leftIcon` (React.ReactNode); default: undefined — Leading icon inside input fields\n- `rightIcon` (React.ReactNode); default: undefined — Trailing icon inside input fields\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/form.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "d474a9554051e7b16a222d3c0b1d53946dc531c4221a644ecd9d03c4da0226f6",
    "features": [
      "Modular layout primitives: Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage",
      "Comprehensive controls: Input, Textarea, Select, Checkbox, RadioGroup, Switch",
      "Spring-animated validation errors and password visibility toggle",
      "Tactile check, radio dot, and toggle switch spring physics",
      "Accessible ARIA semantics, required asterisks, and keyboard navigation",
      "Strict monochrome dark styling matching EasyUI surface elevation tokens"
    ],
    "props": [
      {
        "name": "onSubmit",
        "type": "(e: FormEvent) => void",
        "default": "undefined",
        "description": "Form submission handler"
      },
      {
        "name": "error",
        "type": "string | boolean",
        "default": "undefined",
        "description": "Validation error text or boolean trigger"
      },
      {
        "name": "showPasswordToggle",
        "type": "boolean",
        "default": "false",
        "description": "Enables eye icon toggle for password inputs"
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Displays red asterisk and enforces requirement"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Leading icon inside input fields"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Trailing icon inside input fields"
      }
    ],
    "accessibility": [
      "Semantic label-input association with generated IDs",
      "ARIA role=\"alert\" on animated validation messages",
      "role=\"switch\" and role=\"radiogroup\" with proper aria-checked attributes",
      "Sky-400 focus ring on all interactive focusable elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from \"@/components/ui/form\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [email, setEmail] = useState(\"\");\n  const [error, setError] = useState(\"\");\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!email.includes(\"@\")) {\n      setError(\"Please enter a valid email address.\");\n    } else {\n      setError(\"\");\n    }\n  };\n\n  return (\n    <Form onSubmit={handleSubmit} className=\"max-w-sm\">\n      <FormItem>\n        <FormLabel required>Email Address</FormLabel>\n        <FormControl>\n          <Input\n            type=\"email\"\n            placeholder=\"you@company.com\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            error={!!error}\n          />\n        </FormControl>\n        <FormDescription>We will never share your email.</FormDescription>\n        <FormMessage error={error} />\n      </FormItem>\n      <Button type=\"submit\" variant=\"primary\" fullWidth>\n        Submit\n      </Button>\n    </Form>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Form.tsx",
        "type": "registry:ui",
        "target": "components/ui/form.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "funnel-chart",
    "name": "Funnel Chart",
    "tagline": "Conversion funnel with per-stage drop-off and a loss summary",
    "description": "A conversion funnel with per-stage widths, curved drop-off bridges, and a loss chip between every stage. An optional summary line reports overall conversion and the single biggest drop-off, all in hand-written SVG.",
    "category": "Feedback",
    "badges": [
      "SVG",
      "Funnel Chart",
      "Data Visualization",
      "Conversion",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/funnel-chart",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Funnel Chart component into my project.\n\nA conversion funnel with per-stage widths, curved drop-off bridges, and a loss chip between every stage. An optional summary line reports overall conversion and the single biggest drop-off, all in hand-written SVG.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/funnel-chart\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { FunnelChart } from \"@/components/ui/funnel-chart\";\n\nconst stages = [\n  { label: \"Visited site\", value: 48200 },\n  { label: \"Signed up\", value: 15840 },\n  { label: \"Created project\", value: 9120 },\n  { label: \"Started paid plan\", value: 1380 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-lg rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <FunnelChart stages={stages} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `stages` (FunnelStage[]) — Ordered stages with a label, value, and optional color\n- `formatValue` ((n: number) => string); default: Intl.NumberFormat — Formats stage values in the chart, tooltip, and data table\n- `showSummary` (boolean); default: true — Shows overall conversion and the biggest drop-off above the funnel\n- `animated` (boolean); default: true — Enables bridge, bar, and chip entrance animations\n- `ariaLabel` (string); default: auto-generated — Accessible chart description and data table caption\n- `className` (string); default: \"\" — Additional CSS classes for the funnel wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/funnel-chart.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "19c2a271eb8feb65618cde9cc7043c285212bb84282e3047766c5ec13a973354",
    "features": [
      "Proportional stage bars with rounded ends and a color ramp from first to last stage",
      "Curved bridges show the users lost between each pair of stages",
      "Drop-off chips sit between stages and highlight the hovered step",
      "Summary line reports overall conversion and the biggest single drop-off",
      "Floating tooltip shows users, percentage of the top stage, and the next loss",
      "Container-aware sizing keeps labels and values readable on mobile",
      "Keyboard navigation with ArrowUp, ArrowDown, and Escape",
      "Screen-reader table mirrors every stage value and percentage",
      "prefers-reduced-motion disables bridge and bar entrance animations"
    ],
    "props": [
      {
        "name": "stages",
        "type": "FunnelStage[]",
        "description": "Ordered stages with a label, value, and optional color"
      },
      {
        "name": "formatValue",
        "type": "(n: number) => string",
        "default": "Intl.NumberFormat",
        "description": "Formats stage values in the chart, tooltip, and data table"
      },
      {
        "name": "showSummary",
        "type": "boolean",
        "default": "true",
        "description": "Shows overall conversion and the biggest drop-off above the funnel"
      },
      {
        "name": "animated",
        "type": "boolean",
        "default": "true",
        "description": "Enables bridge, bar, and chip entrance animations"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "auto-generated",
        "description": "Accessible chart description and data table caption"
      },
      {
        "name": "className",
        "type": "string",
        "default": "\"\"",
        "description": "Additional CSS classes for the funnel wrapper"
      }
    ],
    "accessibility": [
      "The SVG exposes role=\"img\" with a descriptive aria-label listing the first and last stages",
      "ArrowUp and ArrowDown move between stages and Escape dismisses the tooltip",
      "A visually hidden data table mirrors every stage, value, and percentage of the top stage",
      "Drop-off chips combine the percentage with the stage labels they sit between",
      "prefers-reduced-motion disables the bridge, bar, and chip entrance animations"
    ],
    "createdAt": "2026-10-23",
    "usageCode": "import { FunnelChart } from \"@/components/ui/funnel-chart\";\n\nconst stages = [\n  { label: \"Visited site\", value: 48200 },\n  { label: \"Signed up\", value: 15840 },\n  { label: \"Created project\", value: 9120 },\n  { label: \"Started paid plan\", value: 1380 },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-lg rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <FunnelChart stages={stages} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/FunnelChart.tsx",
        "type": "registry:ui",
        "target": "components/ui/funnel-chart.tsx"
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
  },
  {
    "id": "glass-navbar",
    "name": "Glass Navbar",
    "tagline": "Refined glass navigation with spring physics",
    "description": "A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.",
    "category": "Navigation",
    "badges": [
      "Glassmorphism",
      "Responsive",
      "Spring Physics",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glass-navbar",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Glass Navbar component into my project.\n\nA modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/glass-navbar\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { GlassNavbar } from \"@/components/ui/glass-navbar\";\nimport { Sparkles } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <GlassNavbar\n      items={[\n        { label: \"Overview\", href: \"#overview\" },\n        { label: \"Components\", href: \"#components\", badge: \"20+\" },\n        { label: \"Pricing\", href: \"#pricing\" },\n      ]}\n      cta={\n        <button className=\"px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors\">\n          Get Started\n        </button>\n      }\n    />\n  );\n}\n```\n\nDeclared props:\n- `brand` (React.ReactNode); default: <EasyUILogo /> — Brand / Logo element or text component\n- `brandHref` (string); default: '/' — Root link destination for the brand logo\n- `items` (NavItem[]); default: Default items array — Array of navigation links with label, href, badge, icon\n- `cta` (React.ReactNode); default: <GetStartedButton /> — Right-hand side action slot / CTA button\n- `activeId` (string); default: undefined — Explicit active item identifier or label\n- `variant` ('floating' | 'full-width'); default: 'floating' — Visual style layout structure\n- `sticky` (boolean); default: true — Pins the navigation bar to the top of the viewport\n- `glass` (boolean); default: true — Enables backdrop-blur glassmorphism background\n- `onItemSelect` ((item: NavItem) => void); default: undefined — Callback fired when any nav item is selected\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/glass-navbar.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "f3346225ad43a81685785afc22b84c5343a10674f8b7130420792627264bc0a2",
    "features": [
      "Subtle glassmorphic blur backdrop (bg-[#050505]/85 backdrop-blur-md)",
      "Dual layout modes: Floating pill or full-width sticky bar",
      "Shared layout spring animations for hover spotlight & active indicators",
      "Responsive mobile menu drawer with smooth Framer Motion spring transition",
      "Customizable brand logo, navigation items, badges, and CTA action slot",
      "Full keyboard navigation, Escape key dismiss, and aria-expanded accessibility"
    ],
    "props": [
      {
        "name": "brand",
        "type": "React.ReactNode",
        "default": "<EasyUILogo />",
        "description": "Brand / Logo element or text component"
      },
      {
        "name": "brandHref",
        "type": "string",
        "default": "'/'",
        "description": "Root link destination for the brand logo"
      },
      {
        "name": "items",
        "type": "NavItem[]",
        "default": "Default items array",
        "description": "Array of navigation links with label, href, badge, icon"
      },
      {
        "name": "cta",
        "type": "React.ReactNode",
        "default": "<GetStartedButton />",
        "description": "Right-hand side action slot / CTA button"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Explicit active item identifier or label"
      },
      {
        "name": "variant",
        "type": "'floating' | 'full-width'",
        "default": "'floating'",
        "description": "Visual style layout structure"
      },
      {
        "name": "sticky",
        "type": "boolean",
        "default": "true",
        "description": "Pins the navigation bar to the top of the viewport"
      },
      {
        "name": "glass",
        "type": "boolean",
        "default": "true",
        "description": "Enables backdrop-blur glassmorphism background"
      },
      {
        "name": "onItemSelect",
        "type": "(item: NavItem) => void",
        "default": "undefined",
        "description": "Callback fired when any nav item is selected"
      }
    ],
    "accessibility": [
      "Semantic <header> and <nav> elements with aria-label=\"Main Navigation\"",
      "Keyboard focusable with restrained cyan focus-ring on :focus-visible",
      "Escape key dismisses the mobile navigation drawer",
      "aria-expanded and aria-current attributes on interactive items"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { GlassNavbar } from \"@/components/ui/glass-navbar\";\nimport { Sparkles } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <GlassNavbar\n      items={[\n        { label: \"Overview\", href: \"#overview\" },\n        { label: \"Components\", href: \"#components\", badge: \"20+\" },\n        { label: \"Pricing\", href: \"#pricing\" },\n      ]}\n      cta={\n        <button className=\"px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors\">\n          Get Started\n        </button>\n      }\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/GlassNavbar.tsx",
        "type": "registry:ui",
        "target": "components/ui/glass-navbar.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "glitch-text",
    "name": "Glitch Text",
    "tagline": "Cybernetic glitch typography with 5 distinct kinetic animation modes",
    "description": "A multi-modal cybernetic glitch typography component featuring 5 distinct animation variants (RGB split chromatic aberration, cyberpunk clip-slicing, analog VHS tracking loss, matrix rune scramble decode, and electrical voltage surge).",
    "category": "Motion",
    "badges": [
      "Glitch",
      "Cyberpunk",
      "Kinetic Typography",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glitch-text",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Glitch Text component into my project.\n\nA multi-modal cybernetic glitch typography component featuring 5 distinct animation variants (RGB split chromatic aberration, cyberpunk clip-slicing, analog VHS tracking loss, matrix rune scramble decode, and electrical voltage surge).\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/glitch-text\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { GlitchText } from \"@/components/ui/glitch-text\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-col items-center gap-6 p-8\">\n      {/* 1. RGB Split (Chromatic Aberration) */}\n      <GlitchText\n        as=\"h2\"\n        text=\"CHROMATIC SPLIT\"\n        variant=\"rgb-split\"\n        color1=\"#00f0ff\"\n        color2=\"#ff0055\"\n        className=\"text-4xl font-black tracking-tight\"\n      />\n\n      {/* 2. Cyberpunk Slicing */}\n      <GlitchText\n        as=\"h2\"\n        text=\"CYBERPUNK SLICE\"\n        variant=\"slice\"\n        color1=\"#22c55e\"\n        color2=\"#a855f7\"\n        className=\"text-4xl font-black tracking-tight\"\n      />\n\n      {/* 3. Matrix Scramble Decode on Hover */}\n      <GlitchText\n        as=\"span\"\n        text=\"SYSTEM BREACH DETECTED\"\n        variant=\"scramble\"\n        trigger=\"hover\"\n        color1=\"#10b981\"\n        className=\"text-lg font-mono text-emerald-400 cursor-pointer\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `text` (string) — The text string to animate with the cybernetic glitch effects\n- `variant` ('rgb-split' | 'slice' | 'vhs' | 'scramble' | 'pulse'); default: 'rgb-split' — Visual animation mode: chromatic aberration, horizontal slicing, VHS jitter, matrix decode, or voltage pulse\n- `trigger` ('continuous' | 'hover' | 'click'); default: 'continuous' — Interaction trigger mode governing when the glitch animation activates\n- `color1` (string); default: '#00e571' — Primary chromatic aberration color (alias: greenColor)\n- `color2` (string); default: '#8b00ff' — Secondary chromatic aberration color (alias: purpleColor)\n- `intensity` ('low' | 'medium' | 'high'); default: 'medium' — Glitch magnitude scaling multiplier for displacement, skew, and jitter\n- `duration` (number); default: 0.5 — Duration in seconds of an active glitch burst cycle\n- `repeatDelay` (number); default: 2.5 — Rest interval in seconds between continuous glitch bursts\n- `as` (keyof JSX.IntrinsicElements); default: 'span' — HTML tag to render as (e.g. 'h1', 'h2', 'span', 'p', 'div')\n- `className` (string) — Additional CSS classes for font size, weight, color, and positioning\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/glitch-text.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "bd6ee50941f7895118a75b36012d5888d594adc3f9c8b3eab2d9f8d4bd586ed5",
    "features": [
      "5 distinct visual glitch modes: 'rgb-split', 'slice', 'vhs', 'scramble', and 'pulse'",
      "Interactive trigger options: 'continuous' periodic looping, on 'hover', or interactive 'click' burst",
      "Dual chromatic color customization (color1/color2, with backward-compatible greenColor/purpleColor)",
      "Calibrated multi-tiered intensity scaling: 'low', 'medium', and 'high'",
      "Screen-reader safe: rendered as unbroken native text with aria-hidden on decorative duplicate slices",
      "Full prefers-reduced-motion compliance freezing all displacements into clean resting text",
      "Polymorphic rendering via the 'as' prop ('span', 'h1', 'h2', 'p', etc.) with full ref forwarding"
    ],
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "The text string to animate with the cybernetic glitch effects"
      },
      {
        "name": "variant",
        "type": "'rgb-split' | 'slice' | 'vhs' | 'scramble' | 'pulse'",
        "default": "'rgb-split'",
        "description": "Visual animation mode: chromatic aberration, horizontal slicing, VHS jitter, matrix decode, or voltage pulse"
      },
      {
        "name": "trigger",
        "type": "'continuous' | 'hover' | 'click'",
        "default": "'continuous'",
        "description": "Interaction trigger mode governing when the glitch animation activates"
      },
      {
        "name": "color1",
        "type": "string",
        "default": "'#00e571'",
        "description": "Primary chromatic aberration color (alias: greenColor)"
      },
      {
        "name": "color2",
        "type": "string",
        "default": "'#8b00ff'",
        "description": "Secondary chromatic aberration color (alias: purpleColor)"
      },
      {
        "name": "intensity",
        "type": "'low' | 'medium' | 'high'",
        "default": "'medium'",
        "description": "Glitch magnitude scaling multiplier for displacement, skew, and jitter"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "0.5",
        "description": "Duration in seconds of an active glitch burst cycle"
      },
      {
        "name": "repeatDelay",
        "type": "number",
        "default": "2.5",
        "description": "Rest interval in seconds between continuous glitch bursts"
      },
      {
        "name": "as",
        "type": "keyof JSX.IntrinsicElements",
        "default": "'span'",
        "description": "HTML tag to render as (e.g. 'h1', 'h2', 'span', 'p', 'div')"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for font size, weight, color, and positioning"
      }
    ],
    "accessibility": [
      "Decorative split layers and slice artifacts are marked with aria-hidden='true' so screen readers read the text clearly once",
      "Under prefers-reduced-motion: reduce, all jitter, slice displacement, and color oscillations are neutralized"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { GlitchText } from \"@/components/ui/glitch-text\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-col items-center gap-6 p-8\">\n      {/* 1. RGB Split (Chromatic Aberration) */}\n      <GlitchText\n        as=\"h2\"\n        text=\"CHROMATIC SPLIT\"\n        variant=\"rgb-split\"\n        color1=\"#00f0ff\"\n        color2=\"#ff0055\"\n        className=\"text-4xl font-black tracking-tight\"\n      />\n\n      {/* 2. Cyberpunk Slicing */}\n      <GlitchText\n        as=\"h2\"\n        text=\"CYBERPUNK SLICE\"\n        variant=\"slice\"\n        color1=\"#22c55e\"\n        color2=\"#a855f7\"\n        className=\"text-4xl font-black tracking-tight\"\n      />\n\n      {/* 3. Matrix Scramble Decode on Hover */}\n      <GlitchText\n        as=\"span\"\n        text=\"SYSTEM BREACH DETECTED\"\n        variant=\"scramble\"\n        trigger=\"hover\"\n        color1=\"#10b981\"\n        className=\"text-lg font-mono text-emerald-400 cursor-pointer\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/GlitchText.tsx",
        "type": "registry:ui",
        "target": "components/ui/glitch-text.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "glyph-matrix",
    "name": "Glyph Matrix",
    "tagline": "Canvas-driven Matrix digital rain background with glowing phosphor trails.",
    "description": "A high-performance, canvas-driven Matrix digital rain background effect featuring streaming Katakana and numeric glyphs, glowing head highlights, decaying phosphor trails, and interactive cursor disturbances.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Background Effect",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glyph-matrix",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Glyph Matrix component into my project.\n\nA high-performance, canvas-driven Matrix digital rain background effect featuring streaming Katakana and numeric glyphs, glowing head highlights, decaying phosphor trails, and interactive cursor disturbances.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/glyph-matrix\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\n<GlyphMatrix\n  className=\"h-[500px] w-full rounded-2xl\"\n  color=\"#00FF66\"\n  headColor=\"#FFFFFF\"\n  speed={1.2}\n  interactive\n>\n  <div className=\"text-center\">\n    <h2 className=\"text-3xl font-bold text-white tracking-tight\">Wake up, Neo...</h2>\n    <p className=\"text-emerald-400/80 text-sm mt-2 font-mono\">The Matrix has you.</p>\n  </div>\n</GlyphMatrix>\n```\n\nDeclared props:\n- `fontSize` (number); default: 16 — Font size in pixels for the glyph grid\n- `color` (string); default: '#00FF66' — Primary rain stream color\n- `headColor` (string); default: '#FFFFFF' — Color of the leading head glyph in each column\n- `backgroundColor` (string); default: '#050505' — Background color used for trail fading\n- `speed` (number); default: 1 — Fall speed multiplier\n- `fadeRate` (number); default: 0.06 — Decay rate per frame for phosphor trails\n- `interactive` (boolean); default: true — Whether mouse proximity disturbs and accelerates glyph streams\n- `paused` (boolean); default: false — Pauses stream animation\n- `fullPage` (boolean); default: false — Fixes canvas to fill the entire viewport as a full-page background\n- `opacity` (number); default: 1 — Overall opacity of the matrix backdrop\n- `children` (React.ReactNode) — Optional content layered over the matrix background\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/glyph-matrix.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "828fa228f2f5b6a8461b78cb5c108cca0fbfda093b14ed4003af060c43471016",
    "features": [
      "GPU-friendly HTML5 Canvas implementation running at silky 60fps",
      "Phosphor decay trails rendered via progressive alpha blending",
      "Authentic Katakana, matrix operators, and hexadecimal character set",
      "Interactive pointer disturbance causing streams near the cursor to flare and accelerate",
      "Supports both bounded containers and full-page fixed background backdrops"
    ],
    "props": [
      {
        "name": "fontSize",
        "type": "number",
        "default": "16",
        "description": "Font size in pixels for the glyph grid"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'#00FF66'",
        "description": "Primary rain stream color"
      },
      {
        "name": "headColor",
        "type": "string",
        "default": "'#FFFFFF'",
        "description": "Color of the leading head glyph in each column"
      },
      {
        "name": "backgroundColor",
        "type": "string",
        "default": "'#050505'",
        "description": "Background color used for trail fading"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Fall speed multiplier"
      },
      {
        "name": "fadeRate",
        "type": "number",
        "default": "0.06",
        "description": "Decay rate per frame for phosphor trails"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "default": "true",
        "description": "Whether mouse proximity disturbs and accelerates glyph streams"
      },
      {
        "name": "paused",
        "type": "boolean",
        "default": "false",
        "description": "Pauses stream animation"
      },
      {
        "name": "fullPage",
        "type": "boolean",
        "default": "false",
        "description": "Fixes canvas to fill the entire viewport as a full-page background"
      },
      {
        "name": "opacity",
        "type": "number",
        "default": "1",
        "description": "Overall opacity of the matrix backdrop"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "Optional content layered over the matrix background"
      }
    ],
    "accessibility": [
      "Canvas is marked aria-hidden=\"true\" to keep screen readers focused on content",
      "Falls back to a static ambient glyph array under prefers-reduced-motion",
      "Pauses rendering automatically when scrolled out of viewport via IntersectionObserver",
      "Children layered on top retain full keyboard access and standard browser focus"
    ],
    "createdAt": "2026-09-16",
    "usageCode": "<GlyphMatrix\n  className=\"h-[500px] w-full rounded-2xl\"\n  color=\"#00FF66\"\n  headColor=\"#FFFFFF\"\n  speed={1.2}\n  interactive\n>\n  <div className=\"text-center\">\n    <h2 className=\"text-3xl font-bold text-white tracking-tight\">Wake up, Neo...</h2>\n    <p className=\"text-emerald-400/80 text-sm mt-2 font-mono\">The Matrix has you.</p>\n  </div>\n</GlyphMatrix>",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/GlyphMatrix.tsx",
        "type": "registry:ui",
        "target": "components/ui/glyph-matrix.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "gooey-menu",
    "name": "Gooey Menu",
    "tagline": "Liquid gooey spring dropdown menu with SVG filter physics",
    "description": "A tactile liquid dropdown menu with organic SVG metaball fusion filter and spring-driven extrusion animation.",
    "category": "Navigation",
    "badges": [
      "SVG Filter",
      "Framer Motion",
      "Metaball",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/gooey-menu",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Gooey Menu component into my project.\n\nA tactile liquid dropdown menu with organic SVG metaball fusion filter and spring-driven extrusion animation.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/gooey-menu\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { GooeyMenu } from \"@/components/ui/gooey-menu\";\n\nexport function Demo() {\n  return (\n    <GooeyMenu\n      options={[\"Dashboard\", \"Analytics\", \"Settings\", \"Billing\", \"Logout\"]}\n      onSelect={(opt) => console.log(\"Selected:\", opt)}\n    />\n  );\n}\n\nexport function ProfileMenu() {\n  return (\n    <GooeyMenu\n      width={232}\n      options={[\"Profile\", \"Settings\", \"Privacy and Security\", \"Notifications\", \"Log out\"]}\n      optionClassName={(option) => option === \"Log out\" ? \"text-red-400 hover:text-red-300\" : undefined}\n      triggerLabel=\"Open profile menu\"\n      triggerStyle={{ width: 44, height: 44, borderRadius: \"50%\", padding: 0 }}\n      trigger={\n        <span aria-hidden=\"true\" className=\"flex h-full w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white\">\n          SM\n        </span>\n      }\n      onSelect={(option) => console.log(\"Profile action:\", option)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `options` (string[]); default: ['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us'] — Array of option labels\n- `value` (string); default: undefined — Controlled active selected option\n- `defaultValue` (string); default: options[0] — Default selected option if uncontrolled\n- `open` (boolean); default: undefined — Controlled open dropdown state\n- `defaultOpen` (boolean); default: false — Initial open dropdown state if uncontrolled\n- `onOpenChange` ((open: boolean) => void); default: undefined — Callback fired when open state changes\n- `onSelect` ((option: string, index: number) => void); default: undefined — Callback fired on option selection\n- `width` (number); default: 306 — Pixel width of the dropdown panel and default pill; custom triggers keep their own size\n- `trigger` (ReactNode); default: undefined — Optional non-interactive content inside the trigger button, such as an avatar. Do not pass a nested button or link.\n- `triggerLabel` (string); default: \"Toggle menu\" for custom triggers — Accessible name for the trigger and its options\n- `triggerClassName` (string); default: undefined — Classes for the trigger button, including dimensions and border radius\n- `triggerStyle` (CSSProperties); default: undefined — Inline trigger styles; size and corner radii are measured automatically\n- `align` (\"start\" | \"center\" | \"end\"); default: \"start\" — Logical alignment of the panel relative to the trigger. Start and end follow the inherited text direction.\n- `optionClassName` (string | ((option: string, index: number) => string | undefined)); default: undefined — Additional classes for all options or individual actions, such as a red logout option\n- `className` (string); default: undefined — Custom CSS class overrides\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/gooey-menu.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "062b7e73aa8d58824020d22512834b058cf1f8a033a4533de7fcdb97bde8e1a3",
    "features": [
      "Real-time SVG color-matrix metaball fusion filter creates organic liquid stretch and tear dynamics",
      "Choreographed staggered dropdown items with fast exit transitions",
      "Complete keyboard accessibility (Arrow keys, Enter, Space, Escape) and ARIA listbox semantics",
      "Click-outside listener and controlled/uncontrolled state support",
      "Optional custom triggers: the panel animates from the measured button dimensions and corner shape without resizing the button",
      "Start, center, and end panel alignment with RTL support and independent IDs for multiple instances",
      "Respects prefers-reduced-motion: disables spring movement, stagger, and the blur filter"
    ],
    "props": [
      {
        "name": "options",
        "type": "string[]",
        "default": "['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us']",
        "description": "Array of option labels"
      },
      {
        "name": "value",
        "type": "string",
        "default": "undefined",
        "description": "Controlled active selected option"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "options[0]",
        "description": "Default selected option if uncontrolled"
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open dropdown state"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open dropdown state if uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when open state changes"
      },
      {
        "name": "onSelect",
        "type": "(option: string, index: number) => void",
        "default": "undefined",
        "description": "Callback fired on option selection"
      },
      {
        "name": "width",
        "type": "number",
        "default": "306",
        "description": "Pixel width of the dropdown panel and default pill; custom triggers keep their own size"
      },
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Optional non-interactive content inside the trigger button, such as an avatar. Do not pass a nested button or link."
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "default": "\"Toggle menu\" for custom triggers",
        "description": "Accessible name for the trigger and its options"
      },
      {
        "name": "triggerClassName",
        "type": "string",
        "default": "undefined",
        "description": "Classes for the trigger button, including dimensions and border radius"
      },
      {
        "name": "triggerStyle",
        "type": "CSSProperties",
        "default": "undefined",
        "description": "Inline trigger styles; size and corner radii are measured automatically"
      },
      {
        "name": "align",
        "type": "\"start\" | \"center\" | \"end\"",
        "default": "\"start\"",
        "description": "Logical alignment of the panel relative to the trigger. Start and end follow the inherited text direction."
      },
      {
        "name": "optionClassName",
        "type": "string | ((option: string, index: number) => string | undefined)",
        "default": "undefined",
        "description": "Additional classes for all options or individual actions, such as a red logout option"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS class overrides"
      }
    ],
    "accessibility": [
      "role=\"listbox\" with role=\"option\" and aria-selected for assistive technologies",
      "Full keyboard navigation: ArrowUp, ArrowDown, Enter, Space, and Escape",
      "Keyboard opening focuses the listbox; Escape and selection return focus to the trigger",
      "Closed options are inert and hidden from assistive technology while the exit animation finishes",
      "Give avatar or icon triggers an accessible name with triggerLabel",
      "prefers-reduced-motion disables the goo filter, springs, and item stagger"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { GooeyMenu } from \"@/components/ui/gooey-menu\";\n\nexport function Demo() {\n  return (\n    <GooeyMenu\n      options={[\"Dashboard\", \"Analytics\", \"Settings\", \"Billing\", \"Logout\"]}\n      onSelect={(opt) => console.log(\"Selected:\", opt)}\n    />\n  );\n}\n\nexport function ProfileMenu() {\n  return (\n    <GooeyMenu\n      width={232}\n      options={[\"Profile\", \"Settings\", \"Privacy and Security\", \"Notifications\", \"Log out\"]}\n      optionClassName={(option) => option === \"Log out\" ? \"text-red-400 hover:text-red-300\" : undefined}\n      triggerLabel=\"Open profile menu\"\n      triggerStyle={{ width: 44, height: 44, borderRadius: \"50%\", padding: 0 }}\n      trigger={\n        <span aria-hidden=\"true\" className=\"flex h-full w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white\">\n          SM\n        </span>\n      }\n      onSelect={(option) => console.log(\"Profile action:\", option)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/GooeyMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/gooey-menu.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ],
    "featured": true
  },
  {
    "id": "gravity-particle-burst",
    "name": "Gravity Particle Burst",
    "tagline": "Pointer-driven gravity particle feedback",
    "description": "A pointer-triggered canvas particle burst with velocity, gravity, friction, and short-lived physical follow-through.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Pointer Physics",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/gravity-particle-burst",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Gravity Particle Burst component into my project.\n\nA pointer-triggered canvas particle burst with velocity, gravity, friction, and short-lived physical follow-through.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/gravity-particle-burst\n\nDependencies (install only those missing): lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { GravityParticleBurst } from \"@/components/ui/gravity-particle-burst\";\n\nexport function Demo() {\n  return <GravityParticleBurst>Commit release</GravityParticleBurst>;\n}\n```\n\nDeclared props:\n- `label` (string); default: 'Create particle burst' — Default button label and accessible text\n- `particleCount` (number); default: 34 — Number of canvas particles emitted per burst\n- `children` (ReactNode); default: undefined — Custom button content\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/gravity-particle-burst.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ab9fba76ba0c7e236c3d3504342830ff906956f0336a70fe56c857c8985015a6",
    "features": [
      "Particles inherit a shared origin from the pointer location",
      "Canvas rendering keeps the effect performant without many DOM nodes",
      "Gravity and friction make particles arc and settle naturally"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "'Create particle burst'",
        "description": "Default button label and accessible text"
      },
      {
        "name": "particleCount",
        "type": "number",
        "default": "34",
        "description": "Number of canvas particles emitted per burst"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom button content"
      }
    ],
    "accessibility": [
      "The canvas overlay is aria-hidden and does not intercept pointer input",
      "Reduced motion disables the particle burst while keeping the button usable"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { GravityParticleBurst } from \"@/components/ui/gravity-particle-burst\";\n\nexport function Demo() {\n  return <GravityParticleBurst>Commit release</GravityParticleBurst>;\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/GravityParticleBurst.tsx",
        "type": "registry:ui",
        "target": "components/ui/gravity-particle-burst.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "hamburger-menu",
    "name": "Hamburger Menu",
    "tagline": "Architectural line morphing & symmetrical spring motion",
    "description": "An iconic three-line menu toggle that transforms smoothly into a symmetrical close symbol.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Micro-interaction",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/hamburger-menu",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Hamburger Menu component into my project.\n\nAn iconic three-line menu toggle that transforms smoothly into a symmetrical close symbol.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/hamburger-menu\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { HamburgerMenu } from \"@/components/ui/hamburger-menu\";\n\nexport function Demo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <HamburgerMenu\n      isOpen={isOpen}\n      onChange={setIsOpen}\n      size={24}\n    />\n  );\n}\n```\n\nDeclared props:\n- `isOpen` (boolean) — Active open/closed toggle state\n- `onChange` ((isOpen: boolean) => void) — Callback fired on user interaction\n- `size` (number); default: 24 — Width and height of the icon bounding box in pixels\n- `color` (string); default: 'currentColor' — Color of the SVG/CSS line strokes\n- `label` (string); default: 'Menu' — Accessible name announced to assistive tech\n- `disabled` (boolean); default: false — Disables button interactions\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/hamburger-menu.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c5f2ac0d385cae89ffa8376d129f2d17b56cdc63e791d4869110becb1144f567",
    "features": [
      "Symmetric line rotation and middle line dissolution with zero layout shift",
      "Customizable size, stroke thickness, and color tokens",
      "Keyboard accessible with Space and Enter triggers and Escape close support",
      "Integrated aria-expanded and dynamic aria-label status updates"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "Active open/closed toggle state"
      },
      {
        "name": "onChange",
        "type": "(isOpen: boolean) => void",
        "description": "Callback fired on user interaction"
      },
      {
        "name": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height of the icon bounding box in pixels"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'currentColor'",
        "description": "Color of the SVG/CSS line strokes"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Menu'",
        "description": "Accessible name announced to assistive tech"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables button interactions"
      }
    ],
    "accessibility": [
      "Proper <button> element with type=\"button\"",
      "Dynamic aria-expanded=\"true|false\" and aria-label updates",
      "Visible focus-visible ring for full keyboard accessibility"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { HamburgerMenu } from \"@/components/ui/hamburger-menu\";\n\nexport function Demo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <HamburgerMenu\n      isOpen={isOpen}\n      onChange={setIsOpen}\n      size={24}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/HamburgerMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/hamburger-menu.tsx"
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
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Interactive Area Chart component into my project.\n\nA hand-written, dependency-free interactive SVG area chart with interruptible dataset morphing, Catmull-Rom spline resampling, scrubbing tooltip, and keyboard accessibility.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/interactive-area-chart\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { InteractiveAreaChart } from \"@/components/ui/interactive-area-chart\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800\">\n      <InteractiveAreaChart title=\"Monthly Recurring Revenue\" />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `data` (AreaChartData); default: DEFAULT_AREA_CHART_DATA — Dictionary of time-series datasets keyed by range labels (e.g. 7D, 30D, 1Y)\n- `defaultRange` (string); default: \"30D\" — Initial active range key\n- `title` (string); default: \"Revenue\" — Chart title displayed in header\n- `height` (number); default: 280 — Fixed pixel height of the chart SVG area\n- `className` (string); default: \"\" — Additional CSS class names\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/interactive-area-chart.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Interactive Timeline component into my project.\n\nA developer-focused milestone and deployment timeline featuring dynamic progress lines, pulsating status nodes, expandable telemetry cards, and commit hash copy.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/interactive-timeline\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { InteractiveTimeline } from \"@/components/ui/interactive-timeline\";\n\nconst deploymentSteps = [\n  {\n    id: \"step-1\",\n    title: \"Build & Artifact Verification\",\n    timestamp: \"10:42 AM · 48s\",\n    status: \"completed\" as const,\n    tag: \"CI/CD\",\n    commitHash: \"9f8a12bc\",\n    metrics: [{ label: \"Bundle Size\", value: \"142 KB\" }, { label: \"Tree Shake\", value: \"99.4%\" }],\n  },\n  {\n    id: \"step-2\",\n    title: \"Global Edge Replication\",\n    timestamp: \"10:43 AM · Active\",\n    status: \"in-progress\" as const,\n    tag: \"Infra\",\n    description: \"Replicating immutable build layers across 32 regional edge locations.\",\n  },\n  {\n    id: \"step-3\",\n    title: \"Traffic Cutover & Smoke Test\",\n    timestamp: \"Pending\",\n    status: \"pending\" as const,\n    tag: \"DNS\",\n  },\n];\n\nexport function Demo() {\n  return <InteractiveTimeline items={deploymentSteps} />;\n}\n```\n\nDeclared props:\n- `items` (TimelineItem[]); default: [] — Array of timeline step items\n- `defaultSelectedId` (string); default: items[0]?.id — ID of the item initially expanded\n- `collapsible` (boolean); default: true — Whether cards can be expanded/collapsed on click\n- `onItemSelect` ((item: TimelineItem) => void); default: undefined — Callback invoked when a timeline node or card is selected\n- `className` (string); default: undefined — Optional CSS classes for outer container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/interactive-timeline.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "intro-loader",
    "name": "Intro Loader",
    "tagline": "Apple-style multilingual greeting welcome splash",
    "description": "An Apple-inspired multilingual welcome splash and intro loader that rapidly cycles localized greetings with fluid blur transitions, progress tracking, and accessible skip controls.",
    "category": "Overlays",
    "badges": [
      "Apple Welcome",
      "Multilingual",
      "Splash Screen",
      "Fluid Blur",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/intro-loader",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Intro Loader component into my project.\n\nAn Apple-inspired multilingual welcome splash and intro loader that rapidly cycles localized greetings with fluid blur transitions, progress tracking, and accessible skip controls.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/intro-loader\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { IntroLoader } from \"@/components/ui/intro-loader\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [loading, setLoading] = useState(true);\n\n  if (loading) {\n    return (\n      <IntroLoader\n        allowSkip={true}\n        showProgress={true}\n        onComplete={() => setLoading(false)}\n      />\n    );\n  }\n\n  return (\n    <main className=\"min-h-screen bg-[#050505] text-[#FAFAFA] p-8\">\n      <h1>Welcome to the Application</h1>\n    </main>\n  );\n}\n```\n\nDeclared props:\n- `greetings` ((string | GreetingItem)[]); default: ['Hello', 'Hola', 'Bonjour', ...] — Array of localized greeting strings or objects with text and lang to cycle through\n- `fullScreen` (boolean); default: true — Whether to render as a fixed full-screen overlay or inline container\n- `intervalMs` (number); default: 240 — Milliseconds per greeting cycle\n- `showProgress` (boolean); default: true — Whether to display the Apple-style hairline progress bar\n- `showLangBadge` (boolean); default: true — Whether to display country language badges\n- `allowSkip` (boolean); default: true — Whether to enable ESC key and Skip button dismissals\n- `speedMultiplier` (number); default: 1 — Speed multiplier for the animation sequence\n- `onComplete` (() => void); default: undefined — Callback fired when welcome sequence completes\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/intro-loader.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "a329adc1b7bdc25aafe4fb320de1355e6dc7f69af124712b27c4c6938e50b21b",
    "features": [
      "Rapid multilingual greeting cycling inspired by Apple OS welcome splash",
      "Fluid blur, scale, and opacity entry transitions calibrated with cubic-bezier curves",
      "Apple-style hairline progress indicator tracking sequence completion",
      "Keyboard and tactile skip mechanism (ESC key or dedicated discrete button)",
      "Full accessibility support with aria-live announcements and reduced-motion fallbacks",
      "Supports both full-screen initial overlay and inline documentation preview modes"
    ],
    "props": [
      {
        "name": "greetings",
        "type": "(string | GreetingItem)[]",
        "default": "['Hello', 'Hola', 'Bonjour', ...]",
        "description": "Array of localized greeting strings or objects with text and lang to cycle through"
      },
      {
        "name": "fullScreen",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render as a fixed full-screen overlay or inline container"
      },
      {
        "name": "intervalMs",
        "type": "number",
        "default": "240",
        "description": "Milliseconds per greeting cycle"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display the Apple-style hairline progress bar"
      },
      {
        "name": "showLangBadge",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display country language badges"
      },
      {
        "name": "allowSkip",
        "type": "boolean",
        "default": "true",
        "description": "Whether to enable ESC key and Skip button dismissals"
      },
      {
        "name": "speedMultiplier",
        "type": "number",
        "default": "1",
        "description": "Speed multiplier for the animation sequence"
      },
      {
        "name": "onComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when welcome sequence completes"
      }
    ],
    "accessibility": [
      "Screen reader live region (aria-live=\"polite\" and aria-atomic=\"true\") for real-time announcements",
      "Full keyboard dismissibility with Escape key listener",
      "Complete prefers-reduced-motion fallback jumping directly to finish",
      "Dialog role with aria-label=\"Welcome intro screen\" and clean tree unmounting upon finish"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { IntroLoader } from \"@/components/ui/intro-loader\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [loading, setLoading] = useState(true);\n\n  if (loading) {\n    return (\n      <IntroLoader\n        allowSkip={true}\n        showProgress={true}\n        onComplete={() => setLoading(false)}\n      />\n    );\n  }\n\n  return (\n    <main className=\"min-h-screen bg-[#050505] text-[#FAFAFA] p-8\">\n      <h1>Welcome to the Application</h1>\n    </main>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/IntroLoader.tsx",
        "type": "registry:ui",
        "target": "components/ui/intro-loader.tsx"
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
  },
  {
    "id": "ios-search-bar",
    "name": "iOS-style Search Bar",
    "tagline": "Spring expanding search pill & tactile clear button",
    "description": "A minimalist search pill that smoothly expands on focus and reveals quick-clear controls with spring animation.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Search",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ios-search-bar",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI iOS-style Search Bar component into my project.\n\nA minimalist search pill that smoothly expands on focus and reveals quick-clear controls with spring animation.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/ios-search-bar\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { IOSSearchBar } from \"@/components/ui/ios-search-bar\";\n\nexport function Demo() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <IOSSearchBar\n      value={query}\n      onChange={setQuery}\n      placeholder=\"Search documentation...\"\n      onSubmit={(q) => console.log(\"Searching:\", q)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `value` (string) — Current search query string\n- `onChange` ((value: string) => void) — Input change handler\n- `onSubmit` ((value: string) => void); default: undefined — Fired when Enter is pressed\n- `onClear` (() => void); default: undefined — Callback when clear button is clicked\n- `placeholder` (string); default: 'Search...' — Placeholder label\n- `collapsedWidth` (number | string); default: '220px' — Width before focus\n- `expandedWidth` (number | string); default: '340px' — Width after focus\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/ios-search-bar.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "9cbd421e63988be2fb832afa4272527cdd62763396dfe40b79bc858239ab5a22",
    "features": [
      "Smooth spring width expansion on input focus and auto-collapse on blur",
      "Conditional quick-clear button with spring scale entrance and exit",
      "Built-in keyboard hotkey indicator (⌘K) and Escape key blur support",
      "Semantic search input type with full WCAG AA accessibility"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "description": "Current search query string"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "description": "Input change handler"
      },
      {
        "name": "onSubmit",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Fired when Enter is pressed"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when clear button is clicked"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search...'",
        "description": "Placeholder label"
      },
      {
        "name": "collapsedWidth",
        "type": "number | string",
        "default": "'220px'",
        "description": "Width before focus"
      },
      {
        "name": "expandedWidth",
        "type": "number | string",
        "default": "'340px'",
        "description": "Width after focus"
      }
    ],
    "accessibility": [
      "Standard <input type=\"search\"> with clear descriptive aria-label",
      "Interactive clear button with accessible aria-label=\"Clear search\"",
      "Supports Escape key to blur and Enter key to submit"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { IOSSearchBar } from \"@/components/ui/ios-search-bar\";\n\nexport function Demo() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <IOSSearchBar\n      value={query}\n      onChange={setQuery}\n      placeholder=\"Search documentation...\"\n      onSubmit={(q) => console.log(\"Searching:\", q)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/IOSSearchBar.tsx",
        "type": "registry:ui",
        "target": "components/ui/ios-search-bar.tsx"
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
  },
  {
    "id": "liquid-ripple-button",
    "name": "Liquid Ripple Button",
    "tagline": "Pointer-origin liquid press feedback",
    "description": "A tactile button whose pointer-origin ripple and subtle wave layer make press feedback feel fluid.",
    "category": "Buttons",
    "badges": [
      "Button",
      "Pointer Feedback",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-ripple-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Liquid Ripple Button component into my project.\n\nA tactile button whose pointer-origin ripple and subtle wave layer make press feedback feel fluid.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/liquid-ripple-button\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { LiquidRippleButton } from \"@/components/ui/liquid-ripple-button\";\n\nexport function Demo() {\n  return <LiquidRippleButton variant=\"secondary\">Generate preview</LiquidRippleButton>;\n}\n```\n\nDeclared props:\n- `children` (ReactNode); default: 'Run interaction' — Button content\n- `variant` ('primary' | 'secondary'); default: 'primary' — Visual style variant\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/liquid-ripple-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c108dfcc3bec3932b2ff184d9e9d8354bab9b6c975009c36e8a259e514639c83",
    "features": [
      "Ripple originates from the actual press point",
      "Slow secondary wave remains below the label and icon",
      "Primary and secondary variants match EasyUI button surfaces"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "'Run interaction'",
        "description": "Button content"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary'",
        "default": "'primary'",
        "description": "Visual style variant"
      }
    ],
    "accessibility": [
      "Uses a semantic button and preserves native keyboard activation",
      "Reduced motion removes ripple and wave animation while retaining press state"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { LiquidRippleButton } from \"@/components/ui/liquid-ripple-button\";\n\nexport function Demo() {\n  return <LiquidRippleButton variant=\"secondary\">Generate preview</LiquidRippleButton>;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/LiquidRippleButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/liquid-ripple-button.tsx"
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
  },
  {
    "id": "liquid-toggle",
    "name": "Liquid Toggle",
    "tagline": "Morphing liquid blob toggle",
    "description": "A toggle with a liquid/blob-like transition. The internal shape deforms organically as it travels from off to on — stretching along the travel axis and settling into a natural blob shape rather than simply translating.",
    "category": "Buttons",
    "badges": [
      "SVG Morph",
      "Spring",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-toggle",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Liquid Toggle component into my project.\n\nA toggle with a liquid/blob-like transition. The internal shape deforms organically as it travels from off to on — stretching along the travel axis and settling into a natural blob shape rather than simply translating.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/liquid-toggle\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { LiquidToggle } from \"@/components/ui/liquid-toggle\";\n\nexport function Demo() {\n  const [on, setOn] = React.useState(false);\n  return (\n    <div className=\"flex items-center gap-2\">\n      <LiquidToggle value={on} onChange={setOn} />\n      <span className=\"text-sm\">{on ? 'Enabled' : 'Disabled'}</span>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `value` (boolean); default: undefined — Controlled value\n- `defaultValue` (boolean); default: false — Initial value for uncontrolled mode\n- `onChange` ((value: boolean) => void); default: undefined — Toggle change callback\n- `disabled` (boolean); default: false — Disabled state\n- `offLabel` (string); default: 'Off' — Screen reader label when off\n- `onLabel` (string); default: 'On' — Screen reader label when on\n- `accentColor` (string); default: '#FAFAFA' — Blob color when on\n- `showLabels` (boolean); default: true — Show OFF/ON text inside the track\n- `width` (number); default: 56 — Track width in px\n- `height` (number); default: 32 — Track height in px\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/liquid-toggle.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "beb1e8eb089131b050a809d78764dc42fe41c1dd5a03a3b91c2ef4588652beab",
    "features": [
      "Internal blob shape continuously morphs between states",
      "Transient stretch pulse along the travel axis when toggling",
      "Spring-smoothed progress with mass/damping tuning",
      "Controlled and uncontrolled usage via value/defaultValue/onChange",
      "Respects prefers-reduced-motion (uses static state fallback)"
    ],
    "props": [
      {
        "name": "value",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled value"
      },
      {
        "name": "defaultValue",
        "type": "boolean",
        "default": "false",
        "description": "Initial value for uncontrolled mode"
      },
      {
        "name": "onChange",
        "type": "(value: boolean) => void",
        "default": "undefined",
        "description": "Toggle change callback"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disabled state"
      },
      {
        "name": "offLabel",
        "type": "string",
        "default": "'Off'",
        "description": "Screen reader label when off"
      },
      {
        "name": "onLabel",
        "type": "string",
        "default": "'On'",
        "description": "Screen reader label when on"
      },
      {
        "name": "accentColor",
        "type": "string",
        "default": "'#FAFAFA'",
        "description": "Blob color when on"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "default": "true",
        "description": "Show OFF/ON text inside the track"
      },
      {
        "name": "width",
        "type": "number",
        "default": "56",
        "description": "Track width in px"
      },
      {
        "name": "height",
        "type": "number",
        "default": "32",
        "description": "Track height in px"
      }
    ],
    "accessibility": [
      "role=\"switch\" with aria-checked",
      "Visually hidden label reflects current state",
      "Keyboard interaction: Space/Enter toggles; Arrow keys set state",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-09-02",
    "usageCode": "import { LiquidToggle } from \"@/components/ui/liquid-toggle\";\n\nexport function Demo() {\n  const [on, setOn] = React.useState(false);\n  return (\n    <div className=\"flex items-center gap-2\">\n      <LiquidToggle value={on} onChange={setOn} />\n      <span className=\"text-sm\">{on ? 'Enabled' : 'Disabled'}</span>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/LiquidToggle.tsx",
        "type": "registry:ui",
        "target": "components/ui/liquid-toggle.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/theme/useTheme.tsx",
        "type": "registry:lib",
        "target": "lib/theme/useTheme.tsx"
      }
    ],
    "featured": true
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Live Line Chart component into my project.\n\nA real-time line chart that scrolls right-to-left, with a large current-value readout, a live delta, and a pause control. Hover or touch the chart to freeze the stream and scrub it with a crosshair tooltip.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/live-line-chart\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { LiveLineChart } from \"@/components/ui/live-line-chart\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-2xl rounded-2xl bg-white p-5 dark:bg-neutral-950\">\n      <LiveLineChart\n        initial={[1240, 1280, 1235, 1310, 1290]}\n        unit=\"req/s\"\n        height={220}\n        source={(push) => {\n          const id = setInterval(() => push(1200 + Math.random() * 300), 1000);\n          return () => clearInterval(id);\n        }}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `source` ((push) => void | (() => void)) — Data feed subscription; call push(value) for each new reading and return a cleanup\n- `initial` (number[]) — Known values, oldest to newest, spaced intervalMs apart and ending now\n- `intervalMs` (number); default: 1000 — Approximate arrival interval and the smoothing delay\n- `windowSeconds` (number); default: 60 — Seconds visible in the scrolling window\n- `height` (number); default: 220 — Chart height in pixels\n- `color` (string); default: CHART_COLORS[0] — Line stroke and area gradient color\n- `unit` (string); default: \"\" — Unit shown beside the readout and tooltip values\n- `formatValue` ((n: number) => string); default: Intl.NumberFormat — Formats the current value, tooltip, and aria text\n- `domain` ([number, number]) — Fixed y-range instead of auto-scaling to the visible window\n- `showReadout` (boolean); default: true — Shows the large current value, delta, and pause button\n- `ariaLabel` (string); default: auto-generated — Accessible description for the chart image role\n- `className` (string); default: \"\" — Additional CSS classes for the chart wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/live-line-chart.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "loader",
    "name": "Loader",
    "tagline": "Calm, continuous feedback states with zero visual stress",
    "description": "A minimal, purpose-driven loading indicator with 4 calm, non-anxious motion variants.",
    "category": "Feedback",
    "badges": [
      "CSS & SVG",
      "Calm Motion",
      "Zero Deps",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/loader",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Loader component into my project.\n\nA minimal, purpose-driven loading indicator with 4 calm, non-anxious motion variants.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/loader\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Loader } from \"@/components/ui/loader\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-6 p-8 bg-[#0A0A0A] rounded-2xl border border-[#222222]\">\n      <Loader variant=\"arc\" size={32} />\n      <Loader variant=\"dots\" size={28} />\n      <Loader variant=\"line\" size={36} />\n      <Loader variant=\"rings\" size={32} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `size` (number); default: 32 — Diameter or width scale in pixels\n- `variant` ('arc' | 'dots' | 'line' | 'rings'); default: 'arc' — Visual animation mode\n- `label` (string); default: 'Loading...' — Accessible screen reader text label\n- `reduceMotion` (boolean); default: false — Disables high-velocity continuous spins\n- `color` (string); default: 'currentColor' — CSS color string for indicator strokes\n- `className` (string); default: undefined — Additional CSS class names\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/loader.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c582c2da9a3ed2812622db642aa183f288e886f36637f9c2b8195879c5cb3177",
    "features": [
      "4 refined motion variants: rotating arc, breathing dots, sliding line, and expanding concentric rings",
      "Configurable dimensions and stroke colors with seamless dark mode support",
      "Accessible role=\"status\" and aria-busy telemetry without screen reader interruption",
      "Automatic reduced-motion adaptation for sensitive viewers"
    ],
    "props": [
      {
        "name": "size",
        "type": "number",
        "default": "32",
        "description": "Diameter or width scale in pixels"
      },
      {
        "name": "variant",
        "type": "'arc' | 'dots' | 'line' | 'rings'",
        "default": "'arc'",
        "description": "Visual animation mode"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Loading...'",
        "description": "Accessible screen reader text label"
      },
      {
        "name": "reduceMotion",
        "type": "boolean",
        "default": "false",
        "description": "Disables high-velocity continuous spins"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'currentColor'",
        "description": "CSS color string for indicator strokes"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS class names"
      }
    ],
    "accessibility": [
      "Includes role=\"status\" and aria-busy=\"true\" on container",
      "Screen reader-only label announcement prevents repetitive speech spam",
      "Full prefers-reduced-motion compatibility with gentle opacity pulsing"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { Loader } from \"@/components/ui/loader\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-6 p-8 bg-[#0A0A0A] rounded-2xl border border-[#222222]\">\n      <Loader variant=\"arc\" size={32} />\n      <Loader variant=\"dots\" size={28} />\n      <Loader variant=\"line\" size={36} />\n      <Loader variant=\"rings\" size={32} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/Loader.tsx",
        "type": "registry:ui",
        "target": "components/ui/loader.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "lock-input",
    "name": "LockInput",
    "tagline": "Focus state that \"locks\" into place",
    "description": "A text input whose focus state subtly \"locks\" into place — a focus ring scales in from the center and the border tweens to active, giving the impression that the input snaps closed on itself.",
    "category": "Forms",
    "badges": [
      "Focus Lock",
      "Spring Ring",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/lock-input",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI LockInput component into my project.\n\nA text input whose focus state subtly \"locks\" into place — a focus ring scales in from the center and the border tweens to active, giving the impression that the input snaps closed on itself.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/lock-input\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { LockInput } from \"@/components/ui/lock-input\";\nimport { Mail } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-4 max-w-sm\">\n      <LockInput\n        label=\"Email\"\n        type=\"email\"\n        placeholder=\"you@studio.dev\"\n        leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n        description=\"We'll send a confirmation link here.\"\n      />\n      <LockInput\n        label=\"Workspace\"\n        placeholder=\"acme\"\n        error=\"That workspace is already taken.\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `label` (string); default: undefined — Visible label rendered above the input\n- `description` (string); default: undefined — Helper text below the input\n- `error` (string); default: undefined — Error message; presence triggers danger styling\n- `leftIcon` (React.ReactNode); default: undefined — Icon element placed before the input value\n- `rightIcon` (React.ReactNode); default: undefined — Icon element placed after the input value\n- `disabled` (boolean); default: false — Prevents interaction and applies 30% disabled opacity\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/lock-input.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ffef272ddc3eca31cb151034b734dfffb4e4e2108cc5046a9897ce9d9b52d120",
    "features": [
      "Focus ring scales in from 0.94 to 1.0 with a snappy spring, producing a physical \"lock\" feel",
      "Inset border ring fades in alongside the outer focus halo for a layered lock effect",
      "Icon and label slots adjust contrast on focus to draw the eye inward",
      "Error state replaces accent with restrained rose and animates message in",
      "Light/dark theme aware via CSS variables — same code, both themes"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "undefined",
        "description": "Visible label rendered above the input"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the input"
      },
      {
        "name": "error",
        "type": "string",
        "default": "undefined",
        "description": "Error message; presence triggers danger styling"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed before the input value"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed after the input value"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Proper <label htmlFor> association for assistive technology",
      "aria-invalid toggles on error; aria-describedby links helper text",
      "Restrained focus ring is keyboard-only via :focus-visible-friendly overlay",
      "Disabled state communicated both visually and via pointer-events"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { LockInput } from \"@/components/ui/lock-input\";\nimport { Mail } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-4 max-w-sm\">\n      <LockInput\n        label=\"Email\"\n        type=\"email\"\n        placeholder=\"you@studio.dev\"\n        leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n        description=\"We'll send a confirmation link here.\"\n      />\n      <LockInput\n        label=\"Workspace\"\n        placeholder=\"acme\"\n        error=\"That workspace is already taken.\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/LockInput.tsx",
        "type": "registry:ui",
        "target": "components/ui/lock-input.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "login",
    "name": "Login",
    "tagline": "Refined authentication card with validation & social SSO",
    "description": "A production-ready authentication card built with the EasyUI form system, featuring password show/hide, remember me, validation states, and social logins.",
    "category": "Auth",
    "badges": [
      "Authentication",
      "Forms",
      "Responsive",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/login",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Login component into my project.\n\nA production-ready authentication card built with the EasyUI form system, featuring password show/hide, remember me, validation states, and social logins.\n\nCategory: Auth.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/login\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Login } from \"@/components/ui/login\";\n\nexport function Demo() {\n  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {\n    console.log(\"Authenticating:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <Login\n        onSubmit={handleLogin}\n        onForgotPassword={() => alert(\"Redirect to forgot password\")}\n        onSignUpClick={() => alert(\"Redirect to sign up\")}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `title` (string); default: 'Welcome back' — Primary card title text\n- `description` (string); default: 'Sign in to access your EasyUI workspace' — Subtitle description below the title\n- `logo` (React.ReactNode); default: <SparklesIcon /> — Brand badge or logo displayed at the top\n- `error` (string | null); default: null — Server-side or authentication error banner message\n- `isLoading` (boolean); default: false — Submitting state displaying loader on submit button\n- `onSubmit` ((data: LoginFormData) => void); default: undefined — Form submission callback with email, password, rememberMe\n- `onForgotPassword` (() => void); default: undefined — Callback when forgot password link is clicked\n- `onSignUpClick` (() => void); default: undefined — Callback for secondary sign up switch action\n- `showSocialLogins` (boolean); default: true — Toggles GitHub and Google SSO buttons\n- `onSocialLogin` ((provider: 'github' | 'google' | 'apple') => void); default: undefined — Callback when social login button is pressed\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/login.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b3aa0b36366e3ccc081c4078d14361e3b6896aed263418db802b5dc9092a3a30",
    "features": [
      "Built with EasyUI Form & Button architecture",
      "Interactive password visibility toggle with Lucide icons",
      "Form validation for required fields & email regex format",
      "Spring-animated error banners and inline field alerts",
      "Configurable social SSO buttons (GitHub & Google)",
      "Remember me checkbox and \"Forgot password?\" callback hooks",
      "Responsive mobile/desktop dimensions with atmospheric glow header"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Welcome back'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Sign in to access your EasyUI workspace'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side or authentication error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: LoginFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with email, password, rememberMe"
      },
      {
        "name": "onForgotPassword",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when forgot password link is clicked"
      },
      {
        "name": "onSignUpClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for secondary sign up switch action"
      },
      {
        "name": "showSocialLogins",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "onSocialLogin",
        "type": "(provider: 'github' | 'google' | 'apple') => void",
        "default": "undefined",
        "description": "Callback when social login button is pressed"
      }
    ],
    "accessibility": [
      "Accessible input labels and autocomplete attributes (email, current-password)",
      "ARIA alert role on dynamic validation and server error banners",
      "Proper form submission handling with Enter key activation",
      "Sky-400 focus ring on all interactive elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Login } from \"@/components/ui/login\";\n\nexport function Demo() {\n  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {\n    console.log(\"Authenticating:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <Login\n        onSubmit={handleLogin}\n        onForgotPassword={() => alert(\"Redirect to forgot password\")}\n        onSignUpClick={() => alert(\"Redirect to sign up\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Login.tsx",
        "type": "registry:ui",
        "target": "components/ui/login.tsx"
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
      },
      {
        "path": "src/components/ui/Button.tsx",
        "type": "registry:ui",
        "target": "components/ui/button.tsx"
      },
      {
        "path": "src/components/ui/Form.tsx",
        "type": "registry:ui",
        "target": "components/ui/form.tsx"
      }
    ],
    "featured": true
  },
  {
    "id": "mac-os-folder-cards",
    "name": "macOS Folder Cards",
    "tagline": "macOS folder icon with fluid spring card reveal",
    "description": "An authentic porcelain-white macOS Finder folder icon that unrolls interactive cards with fluid Apple spring physics.",
    "category": "Motion",
    "badges": [
      "macOS Folder",
      "Spring Morphing",
      "Expandable",
      "Minimal"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/mac-os-folder-cards",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI macOS Folder Cards component into my project.\n\nAn authentic porcelain-white macOS Finder folder icon that unrolls interactive cards with fluid Apple spring physics.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/mac-os-folder-cards\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MacOSFolderCards } from \"@/components/ui/macos-folder-cards\";\n\nexport function Demo() {\n  return (\n    <MacOSFolderCards\n      folderTitle=\"Components\"\n      folderCategory=\"Pipeline\"\n      items={[\n        { id: '1', title: 'Registry Sync', description: 'Catalog reacts to source changes.', meta: '01' },\n        { id: '2', title: 'SEO Audit', description: 'Metadata verified before release.', meta: '02' },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `folderTitle` (string); default: 'Components' — Title label of the folder icon\n- `folderCategory` (string); default: 'Pipeline' — Category breadcrumb for expanded header\n- `items` (MacOSFolderCardItem[]); default: demo items — Cards rendered in the expanded grid\n- `defaultOpen` (boolean); default: false — Initial open/expanded state\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/mac-os-folder-cards.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "4f05afc7790716e37d6c2d0fa47f0dc20d713ebdee9f1d11684278c32498ad61",
    "features": [
      "Porcelain-white macOS folder silhouette with 3D flap hinge and cards peeking from pocket",
      "Interactive hover parallax lifts cards and tilts folder flap in 3D perspective",
      "Opens into a minimal, seamless card grid with Apple fluid spring easing",
      "Crisp pure white icons and EasyUI dark surface harmony"
    ],
    "props": [
      {
        "name": "folderTitle",
        "type": "string",
        "default": "'Components'",
        "description": "Title label of the folder icon"
      },
      {
        "name": "folderCategory",
        "type": "string",
        "default": "'Pipeline'",
        "description": "Category breadcrumb for expanded header"
      },
      {
        "name": "items",
        "type": "MacOSFolderCardItem[]",
        "default": "demo items",
        "description": "Cards rendered in the expanded grid"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open/expanded state"
      }
    ],
    "accessibility": [
      "Uses aria-expanded state and keyboard activation (Enter/Space/Escape)",
      "Reduced motion replaces 3D transforms with clean opacity transitions"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { MacOSFolderCards } from \"@/components/ui/macos-folder-cards\";\n\nexport function Demo() {\n  return (\n    <MacOSFolderCards\n      folderTitle=\"Components\"\n      folderCategory=\"Pipeline\"\n      items={[\n        { id: '1', title: 'Registry Sync', description: 'Catalog reacts to source changes.', meta: '01' },\n        { id: '2', title: 'SEO Audit', description: 'Metadata verified before release.', meta: '02' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MacOSFolderCards.tsx",
        "type": "registry:ui",
        "target": "components/ui/mac-os-folder-cards.tsx"
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
  },
  {
    "id": "magnetic-button",
    "name": "Magnetic Button",
    "tagline": "Cursor-aware spring translation physics",
    "description": "A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.",
    "category": "Buttons",
    "badges": [
      "Spring Physics",
      "Micro-interaction",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/magnetic-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Magnetic Button component into my project.\n\nA responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/magnetic-button\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}\n```\n\nDeclared props:\n- `strength` (number); default: 0.35 — Cursor pull distance multiplier\n- `variant` ('primary' | 'secondary' | 'outline' | 'ghost'); default: 'primary' — Visual surface presentation\n- `size` ('sm' | 'md' | 'lg'); default: 'md' — Button dimensions and typography\n- `glow` (boolean); default: true — Enable subtle background glow on hover\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/magnetic-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ec8edfc336c5efb2802d65a24d6d3b5d490062d7adf6008d12a1d7bf0ce8804a",
    "features": [
      "Spring physics coordinate tracking via Framer Motion",
      "Configurable pull strength and threshold",
      "Subtle ambient glow gradient reflection",
      "Four restrained surface styles: Primary, Secondary, Outline, Ghost"
    ],
    "props": [
      {
        "name": "strength",
        "type": "number",
        "default": "0.35",
        "description": "Cursor pull distance multiplier"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface presentation"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Button dimensions and typography"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Enable subtle background glow on hover"
      }
    ],
    "accessibility": [
      "Focus visible ring with restrained cyan accent",
      "Standard native button semantics & keyboard Enter/Space activation",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-18",
    "usageCode": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MagneticButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/magnetic-button.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "meteors",
    "name": "Meteors",
    "tagline": "Luminous diagonal meteor trails streaming across cards and hero containers",
    "description": "A lightweight, highly aesthetic animated meteor shower effect that streams diagonal glowing celestial light beams across cards, badges, hero containers, and call-to-action sections.",
    "category": "Motion",
    "badges": [
      "CSS Animation",
      "Meteors",
      "Card Effect",
      "New"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/meteors",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Meteors component into my project.\n\nA lightweight, highly aesthetic animated meteor shower effect that streams diagonal glowing celestial light beams across cards, badges, hero containers, and call-to-action sections.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/meteors\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Meteors } from \"@/components/ui/meteors\";\n\nexport function MeteorCardDemo() {\n  return (\n    <div className=\"relative w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-8 shadow-2xl\">\n      <Meteors number={25} color=\"#38BDF8\" trailColor=\"#0284C7\" />\n      <div className=\"relative z-10\">\n        <span className=\"text-xs font-mono uppercase text-sky-400\">Card Meteors</span>\n        <h3 className=\"text-xl font-bold text-white mt-2\">Space Exploration</h3>\n        <p className=\"text-sm text-slate-400 mt-2\">\n          Streams of glowing meteors darting across dark surfaces with gradient tails.\n        </p>\n      </div>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `number` (number); default: 20 — Total number of animated meteor streaks to generate\n- `color` (string); default: '#94A3B8' — Luminous head color and halo glow tint\n- `trailColor` (string); default: '#64748B' — Base color of the gradient fading tail\n- `tailLength` (number); default: 60 — Length in pixels of each meteor streak tail\n- `angle` (number); default: 215 — Flight trajectory angle in degrees (215° is down-left)\n- `minDelay` (number); default: 0.2 — Minimum animation delay in seconds\n- `maxDelay` (number); default: 1.2 — Maximum animation delay in seconds\n- `minDuration` (number); default: 2 — Minimum animation duration in seconds\n- `maxDuration` (number); default: 8 — Maximum animation duration in seconds\n- `className` (string) — Additional CSS classes for container positioning\n- `children` (ReactNode) — Optional content rendered above or inside the meteor container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/meteors.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "9d6fa3aecc161665cdbfd614ae71407ce55ab912412305de5c2354d31f821691",
    "features": [
      "Super lightweight pure CSS keyframe hardware-accelerated animations",
      "Configurable trajectory angle (default 215° diagonal down-left)",
      "Customizable head color, tail gradient, tail length, and speed",
      "Randomized distribution and staggered delays preventing rhythmic clustering",
      "Drop-in compatible with cards, hero banners, and button containers",
      "Full prefers-reduced-motion support disabling animations automatically"
    ],
    "props": [
      {
        "name": "number",
        "type": "number",
        "default": "20",
        "description": "Total number of animated meteor streaks to generate"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'#94A3B8'",
        "description": "Luminous head color and halo glow tint"
      },
      {
        "name": "trailColor",
        "type": "string",
        "default": "'#64748B'",
        "description": "Base color of the gradient fading tail"
      },
      {
        "name": "tailLength",
        "type": "number",
        "default": "60",
        "description": "Length in pixels of each meteor streak tail"
      },
      {
        "name": "angle",
        "type": "number",
        "default": "215",
        "description": "Flight trajectory angle in degrees (215° is down-left)"
      },
      {
        "name": "minDelay",
        "type": "number",
        "default": "0.2",
        "description": "Minimum animation delay in seconds"
      },
      {
        "name": "maxDelay",
        "type": "number",
        "default": "1.2",
        "description": "Maximum animation delay in seconds"
      },
      {
        "name": "minDuration",
        "type": "number",
        "default": "2",
        "description": "Minimum animation duration in seconds"
      },
      {
        "name": "maxDuration",
        "type": "number",
        "default": "8",
        "description": "Maximum animation duration in seconds"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for container positioning"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Optional content rendered above or inside the meteor container"
      }
    ],
    "accessibility": [
      "Meteor container is marked with aria-hidden=\"true\" and pointer-events-none",
      "prefers-reduced-motion automatically hides and freezes meteor animations"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { Meteors } from \"@/components/ui/meteors\";\n\nexport function MeteorCardDemo() {\n  return (\n    <div className=\"relative w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-8 shadow-2xl\">\n      <Meteors number={25} color=\"#38BDF8\" trailColor=\"#0284C7\" />\n      <div className=\"relative z-10\">\n        <span className=\"text-xs font-mono uppercase text-sky-400\">Card Meteors</span>\n        <h3 className=\"text-xl font-bold text-white mt-2\">Space Exploration</h3>\n        <p className=\"text-sm text-slate-400 mt-2\">\n          Streams of glowing meteors darting across dark surfaces with gradient tails.\n        </p>\n      </div>\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/Meteors.tsx",
        "type": "registry:ui",
        "target": "components/ui/meteors.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Metric HUD component into my project.\n\nAn interactive developer telemetry card featuring hardware-accelerated SVG sparklines, pointer-scrubbing point inspection, spring-animated time range morphing, and delta indicators.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/metric-hud\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MetricHUD } from \"@/components/ui/metric-hud\";\n\nconst metrics = [\n  {\n    id: \"latency\",\n    label: \"p99 Latency\",\n    value: \"14.2\",\n    unit: \"ms\",\n    delta: { value: \"-18.4%\", trend: \"down\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [18, 17, 16, 15, 14, 14.2],\n      \"24h\": [24, 21, 19, 18, 16, 14.2],\n      \"7d\": [32, 28, 22, 19, 15, 14.2],\n    },\n  },\n  {\n    id: \"throughput\",\n    label: \"API Throughput\",\n    value: \"84.5k\",\n    unit: \"req/s\",\n    delta: { value: \"+12.1%\", trend: \"up\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [60, 65, 72, 78, 81, 84.5],\n      \"24h\": [40, 52, 68, 74, 80, 84.5],\n      \"7d\": [30, 45, 60, 70, 80, 84.5],\n    },\n  },\n];\n\nexport function Demo() {\n  return <MetricHUD metrics={metrics} defaultTimeRange=\"24h\" />;\n}\n```\n\nDeclared props:\n- `metrics` (MetricItem[]); default: [] — Array of telemetry metric definitions with time-series data\n- `timeRanges` (string[]); default: ['1h', '24h', '7d', '30d'] — Available time window filters\n- `defaultTimeRange` (string); default: '24h' — Initial active time range\n- `className` (string); default: undefined — Custom CSS container styling\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/metric-hud.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "money-card",
    "name": "Money Card",
    "tagline": "Interactive financial wallet card with quick-send contacts and animated transfer sheets",
    "description": "An interactive financial wallet card featuring animated live balance updates, quick-send contact shortcuts, recent transaction history, and responsive modal sheets for sending, receiving, and viewing activity.",
    "category": "Motion",
    "badges": [
      "Financial Card",
      "Quick Send",
      "Interactive Sheet",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/money-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Money Card component into my project.\n\nAn interactive financial wallet card featuring animated live balance updates, quick-send contact shortcuts, recent transaction history, and responsive modal sheets for sending, receiving, and viewing activity.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/money-card\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MoneyCard } from \"@/components/ui/money-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <MoneyCard\n        balance={52002.5}\n        onSend={async ({ contact, amount }) => {\n          console.log(`Sent ${amount} to ${contact.name}`);\n        }}\n        onRequest={async ({ contact, amount }) => {\n          console.log(`Requested ${amount} from ${contact.name}`);\n        }}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `user` ({ name: string; avatar: string }); default: DEFAULT_USER — User profile with display name and avatar icon\n- `balance` (number); default: 52002.5 — Headline account balance in major currency units\n- `contacts` (Contact[]); default: DEFAULT_CONTACTS — List of quick-send contacts with avatars and tints\n- `transactions` (Transaction[]); default: DEFAULT_TRANSACTIONS — List of recent transactions sorted newest first\n- `onSend` ((req: TransferRequest) => Promise<void>); default: undefined — Async handler called upon submitting a send transfer\n- `onRequest` ((req: TransferRequest) => Promise<void>); default: undefined — Async handler called upon submitting a request transfer\n- `onViewAll` (() => void); default: undefined — Optional callback overriding default activity list opening\n- `currency` (string); default: 'USD' — ISO currency symbol used for formatted monetary values\n- `locale` (string); default: 'en-US' — Locale string for number and date formatting\n- `paymentLink` (string); default: 'pay.example/ana' — Personal payment link displayed on receive and settings sheets\n- `className` (string); default: '' — Optional CSS class overrides for the outer container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/money-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "6cde791e7c1b20e3db3a24eb4b3aa387932abd8d0189f1fa91d47d5f1ceefac4",
    "features": [
      "Animated balance counter utilizing MotionValue and custom formatters for fluid number interpolation",
      "Interactive send and receive sheets with built-in keypad, contact selector, note input, and error handling",
      "Quick-send contact avatars straddling the card boundary with spring-press tactile response",
      "Animated transaction feed displaying directional amount badges and expandable activity list",
      "Settings drawer with toggleable balance masking and copyable personal payment link",
      "Container query architecture ensuring flawless responsiveness across all screen sizes"
    ],
    "props": [
      {
        "name": "user",
        "type": "{ name: string; avatar: string }",
        "default": "DEFAULT_USER",
        "description": "User profile with display name and avatar icon"
      },
      {
        "name": "balance",
        "type": "number",
        "default": "52002.5",
        "description": "Headline account balance in major currency units"
      },
      {
        "name": "contacts",
        "type": "Contact[]",
        "default": "DEFAULT_CONTACTS",
        "description": "List of quick-send contacts with avatars and tints"
      },
      {
        "name": "transactions",
        "type": "Transaction[]",
        "default": "DEFAULT_TRANSACTIONS",
        "description": "List of recent transactions sorted newest first"
      },
      {
        "name": "onSend",
        "type": "(req: TransferRequest) => Promise<void>",
        "default": "undefined",
        "description": "Async handler called upon submitting a send transfer"
      },
      {
        "name": "onRequest",
        "type": "(req: TransferRequest) => Promise<void>",
        "default": "undefined",
        "description": "Async handler called upon submitting a request transfer"
      },
      {
        "name": "onViewAll",
        "type": "() => void",
        "default": "undefined",
        "description": "Optional callback overriding default activity list opening"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'USD'",
        "description": "ISO currency symbol used for formatted monetary values"
      },
      {
        "name": "locale",
        "type": "string",
        "default": "'en-US'",
        "description": "Locale string for number and date formatting"
      },
      {
        "name": "paymentLink",
        "type": "string",
        "default": "'pay.example/ana'",
        "description": "Personal payment link displayed on receive and settings sheets"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional CSS class overrides for the outer container"
      }
    ],
    "accessibility": [
      "Accessible dialog sheets with focus traps, Escape key dismissal, and backdrop click handlers",
      "Polite aria-live region announcing balance changes and masked privacy states",
      "Touch-friendly drag dismiss handles on mobile bottom sheets with reduced motion alternatives",
      "Semantic role=\"switch\" for privacy balance toggle with visible keyboard focus rings"
    ],
    "createdAt": "2026-10-14",
    "usageCode": "import { MoneyCard } from \"@/components/ui/money-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <MoneyCard\n        balance={52002.5}\n        onSend={async ({ contact, amount }) => {\n          console.log(`Sent ${amount} to ${contact.name}`);\n        }}\n        onRequest={async ({ contact, amount }) => {\n          console.log(`Requested ${amount} from ${contact.name}`);\n        }}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MoneyCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/money-card.tsx"
      }
    ]
  },
  {
    "id": "morphing-blob",
    "name": "Morphing Blob",
    "tagline": "Fluid spring-physics blob with cursor interaction",
    "description": "An ambient, accessible SVG blob background that continuously morphs with spring physics and subtly follows the cursor for a fluid, interactive visual effect.",
    "category": "Motion",
    "badges": [
      "Motion",
      "SVG",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-blob",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Blob component into my project.\n\nAn ambient, accessible SVG blob background that continuously morphs with spring physics and subtly follows the cursor for a fluid, interactive visual effect.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-blob\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MorphingBlob } from \"@/components/ui/morphing-blob\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative h-96 w-full overflow-hidden rounded-2xl bg-[#0E0E0E]\">\n      <MorphingBlob\n        width={600}\n        height={400}\n        cursorFollow\n        cursorStrength={0.35}\n        cursorSmoothness={0.08}\n        colors={['#7C3AED', '#06B6D4']}\n        className=\"absolute -top-20 -left-20 opacity-70\"\n      />\n\n      <div className=\"relative z-10 p-8 text-white\">\n        Content sits above the blob.\n      </div>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `width` (number); default: 400 — Width of the SVG viewport in pixels\n- `height` (number); default: 400 — Height of the SVG viewport in pixels\n- `points` (number); default: 8 — Number of anchor points used to construct the blob shape\n- `baseRadius` (number); default: 120 — Resting radius of the blob in pixels\n- `variance` (number); default: 28 — Maximum radius variation applied to each anchor point during morphing\n- `speed` (number); default: 0.7 — Controls how frequently new random morph targets are generated\n- `stiffness` (number); default: 45 — Spring stiffness controlling how strongly anchor points move toward their targets\n- `damping` (number); default: 9 — Spring damping controlling the resistance and smoothness of the blob motion\n- `cursorFollow` (boolean); default: true — Enables or disables cursor-follow interaction\n- `cursorStrength` (number); default: 0.35 — Controls how strongly the blob moves toward the cursor position\n- `cursorSmoothness` (number); default: 0.08 — Controls how smoothly the blob catches up to the cursor; lower values create more fluid trailing motion\n- `colors` ([string, string]); default: ['#7C3AED', '#06B6D4'] — Two colors used for the blob gradient, from start to end\n- `className` (string); default: undefined — Additional CSS classes for positioning, sizing, opacity, layering, and other styling\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-blob.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b1076b7d5aee123e6a36db8a9377b3f63d0ca32f9ae5490bf70f96357758b90b",
    "features": [
      "Spring-physics anchor points with Catmull-Rom smoothing for a fluid, organic shape",
      "Smooth cursor-follow interaction with configurable strength and responsiveness",
      "Imperative per-frame path updates for smooth animation without unnecessary React re-renders",
      "Independently configurable SVG width and height",
      "Customizable point count, radius, variance, speed, stiffness, and damping",
      "Configurable gradient start and end colors",
      "Automatically respects the prefers-reduced-motion accessibility preference",
      "Pointer-events disabled by default so the decorative blob never blocks foreground interactions"
    ],
    "props": [
      {
        "name": "width",
        "type": "number",
        "default": "400",
        "description": "Width of the SVG viewport in pixels"
      },
      {
        "name": "height",
        "type": "number",
        "default": "400",
        "description": "Height of the SVG viewport in pixels"
      },
      {
        "name": "points",
        "type": "number",
        "default": "8",
        "description": "Number of anchor points used to construct the blob shape"
      },
      {
        "name": "baseRadius",
        "type": "number",
        "default": "120",
        "description": "Resting radius of the blob in pixels"
      },
      {
        "name": "variance",
        "type": "number",
        "default": "28",
        "description": "Maximum radius variation applied to each anchor point during morphing"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "0.7",
        "description": "Controls how frequently new random morph targets are generated"
      },
      {
        "name": "stiffness",
        "type": "number",
        "default": "45",
        "description": "Spring stiffness controlling how strongly anchor points move toward their targets"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "9",
        "description": "Spring damping controlling the resistance and smoothness of the blob motion"
      },
      {
        "name": "cursorFollow",
        "type": "boolean",
        "default": "true",
        "description": "Enables or disables cursor-follow interaction"
      },
      {
        "name": "cursorStrength",
        "type": "number",
        "default": "0.35",
        "description": "Controls how strongly the blob moves toward the cursor position"
      },
      {
        "name": "cursorSmoothness",
        "type": "number",
        "default": "0.08",
        "description": "Controls how smoothly the blob catches up to the cursor; lower values create more fluid trailing motion"
      },
      {
        "name": "colors",
        "type": "[string, string]",
        "default": "['#7C3AED', '#06B6D4']",
        "description": "Two colors used for the blob gradient, from start to end"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS classes for positioning, sizing, opacity, layering, and other styling"
      }
    ],
    "accessibility": [
      "Respects the prefers-reduced-motion media query by freezing the blob in its static resting shape",
      "Uses aria-hidden=\"true\" because the blob is purely decorative",
      "Uses role=\"presentation\" to communicate that the SVG has no meaningful semantic content",
      "Uses pointer-events-none so the decorative element never intercepts clicks, hover, or other pointer interactions"
    ],
    "createdAt": "2026-09-09T12:15:29.957Z",
    "usageCode": "import { MorphingBlob } from \"@/components/ui/morphing-blob\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative h-96 w-full overflow-hidden rounded-2xl bg-[#0E0E0E]\">\n      <MorphingBlob\n        width={600}\n        height={400}\n        cursorFollow\n        cursorStrength={0.35}\n        cursorSmoothness={0.08}\n        colors={['#7C3AED', '#06B6D4']}\n        className=\"absolute -top-20 -left-20 opacity-70\"\n      />\n\n      <div className=\"relative z-10 p-8 text-white\">\n        Content sits above the blob.\n      </div>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingBlob.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-blob.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "morphing-button",
    "name": "Morphing Button",
    "tagline": "Dimension-preserving state morphing button with fluid icon transitions",
    "description": "A layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.",
    "category": "Buttons",
    "badges": [
      "Buttons",
      "Micro-interactions",
      "State Morphing"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Button component into my project.\n\nA layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-button\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MorphingButton } from \"@/components/ui/morphing-button\";\n\nexport function Demo() {\n  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');\n\n  const handleClick = () => {\n    setStatus('loading');\n    setTimeout(() => {\n      setStatus('success');\n      setTimeout(() => setStatus('idle'), 2000);\n    }, 1500);\n  };\n\n  return (\n    <MorphingButton\n      status={status}\n      idleText=\"Deploy Project\"\n      loadingText=\"Building Edge...\"\n      successText=\"Deployed ✓\"\n      onClick={handleClick}\n    />\n  );\n}\n```\n\nDeclared props:\n- `status` ('idle' | 'loading' | 'success' | 'error'); default: 'idle' — Current button lifecycle state\n- `idleText` (string); default: 'Save Changes' — Label shown in default resting state\n- `loadingText` (string); default: 'Saving...' — Label shown when operation is pending\n- `successText` (string); default: 'Saved' — Label shown upon successful completion\n- `errorText` (string); default: 'Failed' — Label shown when operation fails\n- `variant` ('primary' | 'secondary' | 'danger' | 'ghost'); default: 'primary' — Visual surface styling preset\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "be3eefc4de0cd819b5153cf495421d7ae063b48adc476692ae347e822da65256",
    "features": [
      "Zero layout shift architecture preserving natural bounding dimensions across states",
      "Icon morphing with spring-based scale and translation transitions",
      "Multiple design presets (Primary, Secondary, Danger, and Ghost)",
      "Interactive spring tap physics (whileTap scale 0.97)",
      "Complete disabled and busy ARIA state compatibility"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'loading' | 'success' | 'error'",
        "default": "'idle'",
        "description": "Current button lifecycle state"
      },
      {
        "name": "idleText",
        "type": "string",
        "default": "'Save Changes'",
        "description": "Label shown in default resting state"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "'Saving...'",
        "description": "Label shown when operation is pending"
      },
      {
        "name": "successText",
        "type": "string",
        "default": "'Saved'",
        "description": "Label shown upon successful completion"
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "'Failed'",
        "description": "Label shown when operation fails"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'danger' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface styling preset"
      }
    ],
    "accessibility": [
      "ARIA live role=\"button\" with dynamic aria-busy during loading",
      "Focus-visible ring conforming to EasyUI accessibility tokens",
      "Screen readers announce state changes without losing focus target"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { MorphingButton } from \"@/components/ui/morphing-button\";\n\nexport function Demo() {\n  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');\n\n  const handleClick = () => {\n    setStatus('loading');\n    setTimeout(() => {\n      setStatus('success');\n      setTimeout(() => setStatus('idle'), 2000);\n    }, 1500);\n  };\n\n  return (\n    <MorphingButton\n      status={status}\n      idleText=\"Deploy Project\"\n      loadingText=\"Building Edge...\"\n      successText=\"Deployed ✓\"\n      onClick={handleClick}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-button.tsx"
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
  },
  {
    "id": "morphing-dialog",
    "name": "Morphing Dialog",
    "tagline": "Seamless shared layoutId card to modal transition",
    "description": "An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.",
    "category": "Overlays",
    "badges": [
      "Shared Layout",
      "Spring Physics",
      "Zero Layout Shift"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Dialog component into my project.\n\nAn expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-dialog\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}\n```\n\nDeclared props:\n- `title` (string); default: Required — Dialog header title\n- `subtitle` (string); default: undefined — Secondary header description\n- `trigger` ((open: () => void) => ReactNode); default: Required — Render trigger button or card\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-dialog.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "17095419d04d6b5dcaa5e5d6538bfd69f3a4677c92ed01f4a4f777859d1b06dd",
    "features": [
      "Framer Motion layoutId continuous surface expansion",
      "Esc key dismissal and backdrop click support",
      "Body scroll lock handling during active state"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "Required",
        "description": "Dialog header title"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "undefined",
        "description": "Secondary header description"
      },
      {
        "name": "trigger",
        "type": "(open: () => void) => ReactNode",
        "default": "Required",
        "description": "Render trigger button or card"
      }
    ],
    "accessibility": [
      "Traps focus and sets aria-modal=\"true\"",
      "Closes on Escape key press with focus restoration"
    ],
    "createdAt": "2026-08-14",
    "usageCode": "import { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingDialog.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-dialog.tsx"
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
  },
  {
    "id": "morphing-icon",
    "name": "Morphing Icon",
    "tagline": "Smooth cross-fade rotation morphing between two icons or states.",
    "description": "An animated micro-interaction wrapper that smoothly morphs between two icon states with coordinated rotation, scale, and cross-fade transitions.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Micro-interactions",
      "Icon Transition"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-icon",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Icon component into my project.\n\nAn animated micro-interaction wrapper that smoothly morphs between two icon states with coordinated rotation, scale, and cross-fade transitions.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-icon\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\n<button\n  onClick={() => setIsBookmarked((prev) => !prev)}\n  className=\"p-2 rounded-xl bg-surface-raised border border-border hover:bg-surface-hover transition-colors\"\n  aria-label={isBookmarked ? \"Remove bookmark\" : \"Save bookmark\"}\n>\n  <MorphingIcon\n    active={isBookmarked}\n    from={<Bookmark className=\"w-5 h-5 text-text-secondary\" />}\n    to={<BookmarkCheck className=\"w-5 h-5 text-emerald-400\" />}\n    size={20}\n  />\n</button>\n```\n\nDeclared props:\n- `from` (React.ReactNode); default: undefined — Default icon element shown when inactive\n- `to` (React.ReactNode); default: undefined — Target icon element shown when active\n- `active` (boolean); default: false — Whether the target icon state is currently active\n- `duration` (number); default: 0.3 — Duration of the morph transition in seconds\n- `size` (number); default: 20 — Width and height of the icon container in pixels\n- `className` (string); default: undefined — Optional CSS class for styling the container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-icon.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "4d17b113733257f09bbfb321ac0feb793839accb3e2502d02b2a0b6e1ebaca88",
    "features": [
      "Coordinated rotation, scaling, and opacity cross-fade for fluid icon transformations",
      "Supports any icon component (Lucide, Radix, custom SVGs)",
      "Zero layout shift with absolute positioning within a fixed-size container",
      "Configurable duration and cubic-bezier easing curve"
    ],
    "props": [
      {
        "name": "from",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Default icon element shown when inactive"
      },
      {
        "name": "to",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Target icon element shown when active"
      },
      {
        "name": "active",
        "type": "boolean",
        "default": "false",
        "description": "Whether the target icon state is currently active"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "0.3",
        "description": "Duration of the morph transition in seconds"
      },
      {
        "name": "size",
        "type": "number",
        "default": "20",
        "description": "Width and height of the icon container in pixels"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS class for styling the container"
      }
    ],
    "accessibility": [
      "Toggles aria-hidden on inactive states to prevent duplicate announcement by screen readers",
      "Preserves static container dimensions during rotation to prevent surrounding layout shifts"
    ],
    "createdAt": "2026-09-16",
    "usageCode": "<button\n  onClick={() => setIsBookmarked((prev) => !prev)}\n  className=\"p-2 rounded-xl bg-surface-raised border border-border hover:bg-surface-hover transition-colors\"\n  aria-label={isBookmarked ? \"Remove bookmark\" : \"Save bookmark\"}\n>\n  <MorphingIcon\n    active={isBookmarked}\n    from={<Bookmark className=\"w-5 h-5 text-text-secondary\" />}\n    to={<BookmarkCheck className=\"w-5 h-5 text-emerald-400\" />}\n    size={20}\n  />\n</button>",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingIcon.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-icon.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "morphing-mega-menu",
    "name": "Morphing Mega Menu",
    "tagline": "Stripe-style morphing navigation panel with spring physics and cursor tracking",
    "description": "A Stripe-inspired mega menu with a single continuous morphing panel that smoothly adapts its size, position, and arrow to any trigger.",
    "category": "Navigation",
    "badges": [
      "Mega Menu",
      "Morphing Panel",
      "Spring Physics",
      "Keyboard Nav"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-mega-menu",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Mega Menu component into my project.\n\nA Stripe-inspired mega menu with a single continuous morphing panel that smoothly adapts its size, position, and arrow to any trigger.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-mega-menu\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MorphingMegaMenu } from \"@/components/ui/morphing-mega-menu\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <MorphingMegaMenu />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `items` (MegaMenuItem[]); default: DEFAULT_MEGA_MENU_ITEMS — Array of menu items with optional custom content panels\n- `className` (string); default: \"\" — Optional CSS class overrides for root wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-mega-menu.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "37a029b72245d79354a7aaa514d52bdec69d69cf633244aeee788f74587a480e",
    "features": [
      "Single morphing surface that smoothly animates width, height, and x-position",
      "Spring-tracked arrow indicator following pointer movement along the navigation triggers",
      "ResizeObserver-driven dimension calculation for arbitrary nested menus",
      "Full keyboard accessibility including ArrowDown direct content traversal and Esc dismissal",
      "Graceful touch outside-press dismissal and reduced motion awareness"
    ],
    "props": [
      {
        "name": "items",
        "type": "MegaMenuItem[]",
        "default": "DEFAULT_MEGA_MENU_ITEMS",
        "description": "Array of menu items with optional custom content panels"
      },
      {
        "name": "className",
        "type": "string",
        "default": "\"\"",
        "description": "Optional CSS class overrides for root wrapper"
      }
    ],
    "accessibility": [
      "Uses semantic nav and button elements with aria-expanded and aria-controls attributes",
      "ArrowDown shortcut moves focus directly into panel action links",
      "Escape key closes the active panel and restores focus to the active trigger",
      "Inert attribute ensures inactive panels cannot receive focus or pointer events",
      "Respects prefers-reduced-motion with instant position updates"
    ],
    "createdAt": "2026-10-13",
    "usageCode": "import { MorphingMegaMenu } from \"@/components/ui/morphing-mega-menu\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <MorphingMegaMenu />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingMegaMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-mega-menu.tsx"
      }
    ]
  },
  {
    "id": "morphing-shape-loader",
    "name": "Morphing Shape Loader",
    "tagline": "Continuously morphing SVG shape loader",
    "description": "A loading indicator that continuously morphs between configurable SVG shapes via real path interpolation. The transition is a genuine geometric morph — never a fade out / in.",
    "category": "Feedback",
    "badges": [
      "SVG Morph",
      "Configurable",
      "Loop"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-shape-loader",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Morphing Shape Loader component into my project.\n\nA loading indicator that continuously morphs between configurable SVG shapes via real path interpolation. The transition is a genuine geometric morph — never a fade out / in.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/morphing-shape-loader\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { MorphingShapeLoader } from \"@/components/ui/morphing-shape-loader\";\n\nexport function Demo() {\n  return (\n    <MorphingShapeLoader\n      shapes={['circle', 'square', 'triangle', 'hexagon', 'star']}\n      duration={1.4}\n      holdDuration={0.3}\n    />\n  );\n}\n```\n\nDeclared props:\n- `shapes` (ShapeKind[]); default: ['circle','square','triangle','circle'] — Ordered list of shapes to cycle through\n- `duration` (number); default: 1.6 — Morph duration per shape change in seconds\n- `holdDuration` (number); default: 0.4 — Hold duration at each shape in seconds\n- `loop` (boolean); default: true — Loop the shape sequence\n- `size` (number); default: 96 — Loader size in pixels (square)\n- `color` (string); default: '#FAFAFA' — Stroke or fill color\n- `filled` (boolean); default: false — Filled variant instead of stroke\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/morphing-shape-loader.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "d6851cdfc8592e19307a7911111a9747c34a83f8e21bbc805d6f5fc9207e2e3d",
    "features": [
      "Continuous morph between matched-control-point shapes",
      "Configurable shape list, duration, hold time, and loop behavior",
      "Stroke and filled variants with optional gradient",
      "Subtle dashed backdrop ring for visual context",
      "Respects prefers-reduced-motion (renders a single static shape)"
    ],
    "props": [
      {
        "name": "shapes",
        "type": "ShapeKind[]",
        "default": "['circle','square','triangle','circle']",
        "description": "Ordered list of shapes to cycle through"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "1.6",
        "description": "Morph duration per shape change in seconds"
      },
      {
        "name": "holdDuration",
        "type": "number",
        "default": "0.4",
        "description": "Hold duration at each shape in seconds"
      },
      {
        "name": "loop",
        "type": "boolean",
        "default": "true",
        "description": "Loop the shape sequence"
      },
      {
        "name": "size",
        "type": "number",
        "default": "96",
        "description": "Loader size in pixels (square)"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'#FAFAFA'",
        "description": "Stroke or fill color"
      },
      {
        "name": "filled",
        "type": "boolean",
        "default": "false",
        "description": "Filled variant instead of stroke"
      }
    ],
    "accessibility": [
      "role=\"status\" with aria-busy on the loader",
      "Visually hidden text label for screen readers",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-09-02",
    "usageCode": "import { MorphingShapeLoader } from \"@/components/ui/morphing-shape-loader\";\n\nexport function Demo() {\n  return (\n    <MorphingShapeLoader\n      shapes={['circle', 'square', 'triangle', 'hexagon', 'star']}\n      duration={1.4}\n      holdDuration={0.3}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingShapeLoader.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-shape-loader.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/theme/useTheme.tsx",
        "type": "registry:lib",
        "target": "lib/theme/useTheme.tsx"
      }
    ]
  },
  {
    "id": "neon-edge-button",
    "name": "Neon Edge Button",
    "tagline": "Precise travelling edge light button",
    "description": "A button with a restrained light source travelling around the border while the label remains primary.",
    "category": "Buttons",
    "badges": [
      "Button",
      "CSS Motion",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/neon-edge-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Neon Edge Button component into my project.\n\nA button with a restrained light source travelling around the border while the label remains primary.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/neon-edge-button\n\nDependencies (install only those missing): lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { NeonEdgeButton } from \"@/components/ui/neon-edge-button\";\n\nexport function Demo() {\n  return <NeonEdgeButton>Deploy preview</NeonEdgeButton>;\n}\n```\n\nDeclared props:\n- `children` (ReactNode); default: 'Deploy preview' — Button content\n- `speed` (number); default: 1 — Multiplier for the edge-light travel speed\n- `glow` (boolean); default: true — Enables the subtle static button glow\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/neon-edge-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "30011e00b57284c17e86147a74ff5e3746d8ab579ea4412521e7d8e1cccbe58c",
    "features": [
      "Travelling light follows the button perimeter instead of animating border color",
      "Neutral glow keeps the effect aligned with EasyUI surfaces",
      "Still reads as a polished button when motion is disabled"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "'Deploy preview'",
        "description": "Button content"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Multiplier for the edge-light travel speed"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Enables the subtle static button glow"
      }
    ],
    "accessibility": [
      "Uses a semantic button and focus-visible ring",
      "Reduced motion stops the travelling light and keeps a static edge highlight"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { NeonEdgeButton } from \"@/components/ui/neon-edge-button\";\n\nexport function Demo() {\n  return <NeonEdgeButton>Deploy preview</NeonEdgeButton>;\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NeonEdgeButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/neon-edge-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ],
    "featured": true
  },
  {
    "id": "nimbu-mirchi",
    "name": "Nimbu Mirchi",
    "tagline": "Pointer-driven hanging charm with layered spring physics",
    "description": "A hanging lemon-and-green-chilli charm that swings with realistic inertia in response to the pointer, built from layered physical springs rather than a single rigid illustration.",
    "category": "Motion",
    "badges": [
      "Spring Physics",
      "Pointer Tracking",
      "Layered Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/nimbu-mirchi",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Nimbu Mirchi component into my project.\n\nA hanging lemon-and-green-chilli charm that swings with realistic inertia in response to the pointer, built from layered physical springs rather than a single rigid illustration.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/nimbu-mirchi\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { NimbuMirchi } from \"@/components/ui/nimbu-mirchi\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <NimbuMirchi\n        maxRotation={13}\n        stiffnessX={55}\n        stiffnessY={45}\n        damping={9}\n        caption=\"Hanging nimbu-mirchi charm\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `maxRotation` (number); default: 13 — Maximum rotation in degrees at full pointer offset\n- `stiffnessX` (number); default: 55 — Pointer X spring stiffness (higher = snappier follow)\n- `stiffnessY` (number); default: 45 — Pointer Y spring stiffness\n- `damping` (number); default: 9 — Spring damping (higher = less swing overshoot)\n- `caption` (string); default: undefined — Optional screen-reader caption for the charm\n- `className` (string); default: undefined — Additional Tailwind classes merged into the container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/nimbu-mirchi.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "f5d4092d90bf1cf67d91fe7d876410eadeb92b94b27f27dd3159f85dc9bbeba3",
    "features": [
      "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
      "Layered secondary motion — chillies, lemon, and trailing strings each swing independently",
      "Configurable spring stiffness, damping, and max rotation for tuning the physical feel",
      "Geometry-aware normalization that adapts to the actual container size",
      "Respects prefers-reduced-motion with a clean static rest pose",
      "Graceful degradation when pointer events are unavailable"
    ],
    "props": [
      {
        "name": "maxRotation",
        "type": "number",
        "default": "13",
        "description": "Maximum rotation in degrees at full pointer offset"
      },
      {
        "name": "stiffnessX",
        "type": "number",
        "default": "55",
        "description": "Pointer X spring stiffness (higher = snappier follow)"
      },
      {
        "name": "stiffnessY",
        "type": "number",
        "default": "45",
        "description": "Pointer Y spring stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "9",
        "description": "Spring damping (higher = less swing overshoot)"
      },
      {
        "name": "caption",
        "type": "string",
        "default": "undefined",
        "description": "Optional screen-reader caption for the charm"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the container"
      }
    ],
    "accessibility": [
      "role=\"img\" with descriptive aria-label for screen readers",
      "Touch-none and select-none to avoid stray text selection while interacting",
      "Complete prefers-reduced-motion fallback: pointer listeners are never wired, charm rests in place",
      "Decorative SVG and dot textures marked aria-hidden"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { NimbuMirchi } from \"@/components/ui/nimbu-mirchi\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <NimbuMirchi\n        maxRotation={13}\n        stiffnessX={55}\n        stiffnessY={45}\n        damping={9}\n        caption=\"Hanging nimbu-mirchi charm\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/NimbuMirchi.tsx",
        "type": "registry:ui",
        "target": "components/ui/nimbu-mirchi.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "not-found",
    "name": "Not Found",
    "tagline": "Minimal spring-displaced 404 error experience with tactile proximity physics",
    "description": "A minimal, production-ready 404 / route error component featuring floating spring-physics proximity displacement on individual glyphs, clear typography hierarchy, and accessible recovery actions.",
    "category": "Feedback",
    "badges": [
      "404 Page",
      "Spring Physics",
      "Proximity Response",
      "Micro-interactions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/not-found",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Not Found component into my project.\n\nA minimal, production-ready 404 / route error component featuring floating spring-physics proximity displacement on individual glyphs, clear typography hierarchy, and accessible recovery actions.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/not-found\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { NotFound } from \"@/components/ui/not-found\";\n\nexport default function NotFoundPage() {\n  return (\n    <div className=\"min-h-screen flex items-center justify-center p-6 bg-[#111113]\">\n      <NotFound\n        title=\"This page took a wrong turn.\"\n        description=\"The requested page doesn't exist or may have moved.\"\n        actionLabel=\"Go back home\"\n        onAction={() => window.location.href = \"/\"}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `errorCode` (string); default: '404' — Main error code glyphs rendered as physical interactive objects\n- `badgeLabel` (string); default: undefined — Optional status tag displayed above the glyphs\n- `title` (string); default: 'This page took a wrong turn.' — Primary heading title\n- `description` (string); default: 'The requested page doesn\\'t exist or may have moved.' — Descriptive secondary body copy\n- `actionLabel` (string); default: 'Go back home' — Label for the primary recovery action button\n- `onAction` (() => void); default: undefined — Callback when primary action button is clicked\n- `secondaryActionLabel` (string); default: undefined — Optional label for the secondary action button\n- `onSecondaryAction` (() => void); default: undefined — Callback when secondary action button is clicked\n- `className` (string); default: undefined — Optional custom container CSS classes\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/not-found.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c6427dda3b35b3e2c18df4ca2c54c20d27543ee50f3c0085585bc2baf0c87e04",
    "features": [
      "Pure floating spring-physics entities for each character with custom mass and damping",
      "Continuous pointer proximity repulsion without React state re-renders (zero-jank 60fps)",
      "Mobile-first tactile tap impulse feedback for touch screens",
      "Strictly adheres to EasyUI dark neutral palette and Sky-400 focus ring",
      "Full accessibility support with screen reader announcements and semantic heading hierarchy",
      "Seamless prefers-reduced-motion fallback disabling continuous movement"
    ],
    "props": [
      {
        "name": "errorCode",
        "type": "string",
        "default": "'404'",
        "description": "Main error code glyphs rendered as physical interactive objects"
      },
      {
        "name": "badgeLabel",
        "type": "string",
        "default": "undefined",
        "description": "Optional status tag displayed above the glyphs"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'This page took a wrong turn.'",
        "description": "Primary heading title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'The requested page doesn\\'t exist or may have moved.'",
        "description": "Descriptive secondary body copy"
      },
      {
        "name": "actionLabel",
        "type": "string",
        "default": "'Go back home'",
        "description": "Label for the primary recovery action button"
      },
      {
        "name": "onAction",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when primary action button is clicked"
      },
      {
        "name": "secondaryActionLabel",
        "type": "string",
        "default": "undefined",
        "description": "Optional label for the secondary action button"
      },
      {
        "name": "onSecondaryAction",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when secondary action button is clicked"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom container CSS classes"
      }
    ],
    "accessibility": [
      "Semantic <section> container with aria-labelledby linked to primary heading",
      "Visually hidden screen reader status announcement with sr-only",
      "All interactive controls use native <button> elements with visible focus rings",
      "Graceful degradation when prefers-reduced-motion is active"
    ],
    "createdAt": "2026-09-23",
    "usageCode": "import { NotFound } from \"@/components/ui/not-found\";\n\nexport default function NotFoundPage() {\n  return (\n    <div className=\"min-h-screen flex items-center justify-center p-6 bg-[#111113]\">\n      <NotFound\n        title=\"This page took a wrong turn.\"\n        description=\"The requested page doesn't exist or may have moved.\"\n        actionLabel=\"Go back home\"\n        onAction={() => window.location.href = \"/\"}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/NotFound.tsx",
        "type": "registry:ui",
        "target": "components/ui/not-found.tsx"
      }
    ],
    "featured": true
  },
  {
    "id": "notification-bell",
    "name": "Notification Bell",
    "tagline": "Adaptive notification badge & animated alert drawer",
    "description": "An interactive notification trigger with animated badge counter, arrival shake feedback, and dropdown panel.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Feedback",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-bell",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Notification Bell component into my project.\n\nAn interactive notification trigger with animated badge counter, arrival shake feedback, and dropdown panel.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/notification-bell\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { NotificationBell } from \"@/components/ui/notification-bell\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', message: 'Edge build deployment finished in 38s.', timestamp: 'Just now', read: false },\n    { id: '2', message: 'New API token generated for production.', timestamp: '12m ago', read: false },\n  ]);\n\n  const handleMarkRead = (id: string) => {\n    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));\n  };\n\n  return (\n    <NotificationBell\n      notifications={items}\n      onMarkAsRead={handleMarkRead}\n      onMarkAllAsRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}\n    />\n  );\n}\n```\n\nDeclared props:\n- `notifications` (Notification[]) — Array of notification objects (id, message, timestamp, read)\n- `onMarkAsRead` ((id: string) => void) — Handler fired when an individual notification is marked read\n- `onMarkAllAsRead` (() => void); default: undefined — Handler to clear all active badges\n- `isOpen` (boolean); default: undefined — Controlled open state of notification drawer\n- `onOpenChange` ((isOpen: boolean) => void); default: undefined — Callback on panel open/close\n- `showCount` (boolean); default: true — Displays numeric badge instead of minimal red dot\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/notification-bell.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "64ef049681d729837a1f8011eeefb9a7d7f29e75b754db80f4bd4ba6a4c09436",
    "features": [
      "Subtle rotational bell shake when new unread notifications arrive",
      "Spring-animated counter badge with overflow truncation (99+)",
      "Floating backdrop-blur panel with individual mark-as-read and mark-all-read controls",
      "Click-outside dismissal and accessible keyboard escape handling"
    ],
    "props": [
      {
        "name": "notifications",
        "type": "Notification[]",
        "description": "Array of notification objects (id, message, timestamp, read)"
      },
      {
        "name": "onMarkAsRead",
        "type": "(id: string) => void",
        "description": "Handler fired when an individual notification is marked read"
      },
      {
        "name": "onMarkAllAsRead",
        "type": "() => void",
        "default": "undefined",
        "description": "Handler to clear all active badges"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state of notification drawer"
      },
      {
        "name": "onOpenChange",
        "type": "(isOpen: boolean) => void",
        "default": "undefined",
        "description": "Callback on panel open/close"
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "true",
        "description": "Displays numeric badge instead of minimal red dot"
      }
    ],
    "accessibility": [
      "Dynamic aria-expanded and descriptive aria-label with unread count",
      "Full keyboard navigation with Tab, Enter, and Escape shortcuts",
      "Contrast compliant with WCAG AA standards"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { NotificationBell } from \"@/components/ui/notification-bell\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', message: 'Edge build deployment finished in 38s.', timestamp: 'Just now', read: false },\n    { id: '2', message: 'New API token generated for production.', timestamp: '12m ago', read: false },\n  ]);\n\n  const handleMarkRead = (id: string) => {\n    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));\n  };\n\n  return (\n    <NotificationBell\n      notifications={items}\n      onMarkAsRead={handleMarkRead}\n      onMarkAllAsRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NotificationBell.tsx",
        "type": "registry:ui",
        "target": "components/ui/notification-bell.tsx"
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
  },
  {
    "id": "notification-stack",
    "name": "Notification Stack",
    "tagline": "Physics swipe-to-dismiss toast stack",
    "description": "A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.",
    "category": "Feedback",
    "badges": [
      "Drag Physics",
      "Elevation Stacking",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-stack",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Notification Stack component into my project.\n\nA stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/notification-stack\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}\n```\n\nDeclared props:\n- `initialNotifications` (NotificationItem[]); default: [] — Initial items\n- `maxVisible` (number); default: 3 — Max stacked cards in compact view\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/notification-stack.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "e9b89810f78c02025080b0e8debc1bce7c96e287aa7794847bbb1f7b505f1323",
    "features": [
      "Interactive drag-to-dismiss with spring rebound",
      "Dynamic stacking elevation offset and scale",
      "Expandable history view"
    ],
    "props": [
      {
        "name": "initialNotifications",
        "type": "NotificationItem[]",
        "default": "[]",
        "description": "Initial items"
      },
      {
        "name": "maxVisible",
        "type": "number",
        "default": "3",
        "description": "Max stacked cards in compact view"
      }
    ],
    "accessibility": [
      "Polite aria-live region announcements",
      "Dismiss button with accessible label"
    ],
    "createdAt": "2026-08-04",
    "usageCode": "import { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NotificationStack.tsx",
        "type": "registry:ui",
        "target": "components/ui/notification-stack.tsx"
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
  },
  {
    "id": "orbital-loading-ring",
    "name": "Orbital Loading Ring",
    "tagline": "Layered orbital processing indicator",
    "description": "A lightweight loading indicator with layered rings and orbiting particles that communicate active processing.",
    "category": "Feedback",
    "badges": [
      "CSS Motion",
      "Accessible",
      "Lightweight"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/orbital-loading-ring",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Orbital Loading Ring component into my project.\n\nA lightweight loading indicator with layered rings and orbiting particles that communicate active processing.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/orbital-loading-ring\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { OrbitalLoadingRing } from \"@/components/ui/orbital-loading-ring\";\n\nexport function Demo() {\n  return <OrbitalLoadingRing size={84} variant=\"dense\" label=\"Syncing registry\" />;\n}\n```\n\nDeclared props:\n- `size` (number); default: 72 — Rendered width and height in pixels\n- `speed` (number); default: 1 — Multiplier for orbital animation speed\n- `variant` ('default' | 'dense' | 'minimal'); default: 'default' — Particle density around the secondary orbit\n- `label` (string); default: 'Loading' — Accessible status label\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/orbital-loading-ring.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "21cf834b1229289fb57f0fbc493e47cfbe666395b924c92c423d7fc42304123b",
    "features": [
      "Two coordinated orbital rhythms with a subtle center pulse",
      "Size, speed, and density variants",
      "No external runtime beyond React"
    ],
    "props": [
      {
        "name": "size",
        "type": "number",
        "default": "72",
        "description": "Rendered width and height in pixels"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Multiplier for orbital animation speed"
      },
      {
        "name": "variant",
        "type": "'default' | 'dense' | 'minimal'",
        "default": "'default'",
        "description": "Particle density around the secondary orbit"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Loading'",
        "description": "Accessible status label"
      }
    ],
    "accessibility": [
      "Uses role=\"status\" with a screen-reader label",
      "Reduced motion freezes the orbital movement while preserving the loading affordance"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { OrbitalLoadingRing } from \"@/components/ui/orbital-loading-ring\";\n\nexport function Demo() {\n  return <OrbitalLoadingRing size={84} variant=\"dense\" label=\"Syncing registry\" />;\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/OrbitalLoadingRing.tsx",
        "type": "registry:ui",
        "target": "components/ui/orbital-loading-ring.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "origin-dropdown",
    "name": "OriginDropdown",
    "tagline": "Origin-aware expansion",
    "description": "A dropdown with origin-aware expansion — the menu materializes from the chosen side with a slight scale and an inward translation, so its perceived origin is the trigger edge closest to the menu.",
    "category": "Overlays",
    "badges": [
      "Origin-Aware",
      "Spring In",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/origin-dropdown",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI OriginDropdown component into my project.\n\nA dropdown with origin-aware expansion — the menu materializes from the chosen side with a slight scale and an inward translation, so its perceived origin is the trigger edge closest to the menu.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/origin-dropdown\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { OriginDropdown } from \"@/components/ui/origin-dropdown\";\nimport { Settings, LogOut, User } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-3\">\n      <OriginDropdown\n        trigger=\"Account\"\n        side=\"bottom\"\n        items={[\n          { id: \"profile\", label: \"Profile\", description: \"Account settings\", icon: <User className=\"w-3.5 h-3.5\" /> },\n          { id: \"settings\", label: \"Preferences\", description: \"Theme, motion, layout\", icon: <Settings className=\"w-3.5 h-3.5\" /> },\n          { id: \"signout\", label: \"Sign out\", destructive: true, icon: <LogOut className=\"w-3.5 h-3.5\" /> },\n        ]}\n      />\n      <OriginDropdown\n        trigger=\"Origin top\"\n        side=\"top\"\n        items={[\n          { id: \"a\", label: \"Option A\" },\n          { id: \"b\", label: \"Option B\" },\n        ]}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `trigger` (React.ReactNode); default: undefined — Custom trigger content\n- `items` (OriginDropdownItem[]); default: undefined — Menu items (alternative to children)\n- `children` (React.ReactNode); default: undefined — Custom menu content\n- `side` ('top' | 'right' | 'bottom' | 'left'); default: 'bottom' — Side the menu opens from\n- `open` (boolean); default: undefined — Controlled open state\n- `defaultOpen` (boolean); default: false — Initial open state\n- `onOpenChange` ((open: boolean) => void); default: undefined — Open state change callback\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/origin-dropdown.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "838e3ddfa803e46ecf80c5cd4d800987b9a9d4d3e159c1fb3b9e77fb9cc51e71",
    "features": [
      "Menu expansion originates from one of four sides (top/right/bottom/left)",
      "Snappy spring (springSnappy) with origin-based transform-origin per side",
      "Optional items array with icon, description, and destructive variants",
      "Chevron rotates 180° on open; Escape and outside-click close",
      "Light/dark theme aware via CSS variables"
    ],
    "props": [
      {
        "name": "trigger",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom trigger content"
      },
      {
        "name": "items",
        "type": "OriginDropdownItem[]",
        "default": "undefined",
        "description": "Menu items (alternative to children)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom menu content"
      },
      {
        "name": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "default": "'bottom'",
        "description": "Side the menu opens from"
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open state"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Open state change callback"
      }
    ],
    "accessibility": [
      "aria-haspopup / aria-expanded / role=\"menu\" / role=\"menuitem\" wired correctly",
      "Escape and outside-click dismiss the menu",
      "Disabled items skip the onSelect handler and have proper ARIA"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { OriginDropdown } from \"@/components/ui/origin-dropdown\";\nimport { Settings, LogOut, User } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-3\">\n      <OriginDropdown\n        trigger=\"Account\"\n        side=\"bottom\"\n        items={[\n          { id: \"profile\", label: \"Profile\", description: \"Account settings\", icon: <User className=\"w-3.5 h-3.5\" /> },\n          { id: \"settings\", label: \"Preferences\", description: \"Theme, motion, layout\", icon: <Settings className=\"w-3.5 h-3.5\" /> },\n          { id: \"signout\", label: \"Sign out\", destructive: true, icon: <LogOut className=\"w-3.5 h-3.5\" /> },\n        ]}\n      />\n      <OriginDropdown\n        trigger=\"Origin top\"\n        side=\"top\"\n        items={[\n          { id: \"a\", label: \"Option A\" },\n          { id: \"b\", label: \"Option B\" },\n        ]}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/OriginDropdown.tsx",
        "type": "registry:ui",
        "target": "components/ui/origin-dropdown.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "otp-input",
    "name": "OTP Input",
    "tagline": "Auto-advancing digit boxes with pop feedback",
    "description": "An accessible one-time-passcode input made of auto-advancing digit boxes, each with a spring-driven pop animation on entry, built with Framer Motion and Tailwind CSS.",
    "category": "Forms",
    "badges": [
      "Motion",
      "Tailwind",
      "Forms"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/otp-input",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI OTP Input component into my project.\n\nAn accessible one-time-passcode input made of auto-advancing digit boxes, each with a spring-driven pop animation on entry, built with Framer Motion and Tailwind CSS.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/otp-input\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { OTPInput } from \"@/components/ui/otp-input\";\n\nexport function Demo() {\n  return (\n    <OTPInput\n      length={6}\n      autoFocus\n      onComplete={(code) => console.log(\"Submitted code:\", code)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `length` (number); default: 6 — Number of digit boxes to render\n- `value` (string); default: undefined — Controlled value; omit to let the component manage its own state\n- `onChange` ((value: string) => void); default: undefined — Called with the joined code whenever any digit changes\n- `onComplete` ((value: string) => void); default: undefined — Called once with the full code when every box is filled\n- `autoFocus` (boolean); default: false — Focuses the first box on mount\n- `disabled` (boolean); default: false — Disables all digit boxes\n- `className` (string); default: undefined — Classes applied to the wrapping group element\n- `boxClassName` (string); default: undefined — Classes applied to each individual digit box\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/otp-input.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "27852211c492764e3519ff286cd188b5c9d2b622f2938a9def6fb4e92b405ddb",
    "features": [
      "Auto-advances focus to the next box as each digit is entered",
      "Backspace clears the current digit or steps back into the previous box",
      "Full-code paste support, distributing pasted digits across all boxes",
      "Per-digit spring pop animation on entry for tactile feedback",
      "Works as a controlled or uncontrolled component"
    ],
    "props": [
      {
        "name": "length",
        "type": "number",
        "default": "6",
        "description": "Number of digit boxes to render"
      },
      {
        "name": "value",
        "type": "string",
        "default": "undefined",
        "description": "Controlled value; omit to let the component manage its own state"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Called with the joined code whenever any digit changes"
      },
      {
        "name": "onComplete",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Called once with the full code when every box is filled"
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "default": "false",
        "description": "Focuses the first box on mount"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables all digit boxes"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Classes applied to the wrapping group element"
      },
      {
        "name": "boxClassName",
        "type": "string",
        "default": "undefined",
        "description": "Classes applied to each individual digit box"
      }
    ],
    "accessibility": [
      "Wrapping element uses role=\"group\" with an aria-label describing the field",
      "Each digit box has its own aria-label (e.g. \"Digit 3 of 6\") for screen readers",
      "Full keyboard support: typing advances focus, Backspace clears/steps back, Left/Right arrows move between boxes",
      "autoComplete=\"one-time-code\" on the first box enables SMS autofill on supporting platforms"
    ],
    "createdAt": "2026-09-09T12:15:29.957Z",
    "usageCode": "import { OTPInput } from \"@/components/ui/otp-input\";\n\nexport function Demo() {\n  return (\n    <OTPInput\n      length={6}\n      autoFocus\n      onComplete={(code) => console.log(\"Submitted code:\", code)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/OtpInput.tsx",
        "type": "registry:ui",
        "target": "components/ui/otp-input.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "package-box",
    "name": "Package Box",
    "tagline": "Interactive 3D package box with flap folding and rising document motion",
    "description": "A pure CSS 3D cardboard package box featuring interactive tape-splitting physics, flap-folding choreography, and an animated packing slip that rises out and turns to face the viewer.",
    "category": "Motion",
    "badges": [
      "3D Physics",
      "Motion",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/package-box",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Package Box component into my project.\n\nA pure CSS 3D cardboard package box featuring interactive tape-splitting physics, flap-folding choreography, and an animated packing slip that rises out and turns to face the viewer.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/package-box\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PackageBox } from \"@/components/ui/package-box\";\n\nexport function Demo() {\n  return (\n    <PackageBox\n      colors={{ box: \"#b07b4a\", tape: \"#d3c3aa\" }}\n      slip={{\n        title: \"Thank you, Ana.\",\n        subtitle: \"Your order is packed and on its way.\",\n        recipient: \"Ana Rivera\",\n        items: [\n          { name: \"Oak desk lamp\", qty: 1, price: \"$89.00\" },\n          { name: \"Linen pouch\", qty: 2, price: \"$36.00\" },\n        ],\n        total: \"$125.00\",\n        stamp: \"Packed\",\n      }}\n    />\n  );\n}\n```\n\nDeclared props:\n- `open` (boolean); default: undefined — Controlled open state of the package box\n- `defaultOpen` (boolean); default: false — Initial open state for uncontrolled usage\n- `onOpenChange` ((open: boolean) => void); default: undefined — Callback triggered when open state changes\n- `children` (ReactNode); default: undefined — Custom React elements to render inside the rising document paper\n- `slip` (PackageSlip); default: DEFAULT_SLIP — Structured metadata for the default shipping invoice / packing slip\n- `maxWidth` (number); default: 460 — Maximum width in px; the 3D scene scales down responsively\n- `colors` (PackageBoxColors); default: undefined — Color overrides for box cardboard, tape, paper, ink, and accent stamp\n- `label` (ReactNode | false); default: undefined — Custom shipping label or false to hide\n- `symbols` (ReactNode | false); default: undefined — Custom fragile/handling symbols or false to hide\n- `tape` (boolean); default: true — Whether packing tape across top and seam is rendered\n- `hint` (boolean); default: true — Whether to show the accessible toggle button below the box\n- `openLabel` (string); default: 'Click to open' — Accessible label when closed\n- `closeLabel` (string); default: 'Close' — Accessible label when open\n- `reserveSpace` (boolean); default: false — Whether to preserve full open height while closed to avoid layout shifts\n- `className` (string); default: '' — Optional CSS class names for outer wrapper\n- `paperClassName` (string); default: '' — Optional CSS class names for the document paper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/package-box.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b22a5dc6f2b12b4b0a4559ceba9c1ad397cc455fe7e269a09b95ccc245c27af8",
    "features": [
      "Pure CSS 3D cardboard box geometry with authentic grain texture and lighting gradients",
      "Choreographed master timeline: seam tape cut, sequential flap folding, and smooth paper rise",
      "Responsive stage scaling that fluidly adapts to any container width via ResizeObserver",
      "Customizable packing slip with itemization, totals, shipping info, and tactile rubber stamp",
      "Configurable color tokens for cardboard, tape, paper, typography, and stamp accent",
      "Full accessibility support with aria-controls, Esc dismiss, and prefers-reduced-motion adaptation"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state of the package box"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open state for uncontrolled usage"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback triggered when open state changes"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom React elements to render inside the rising document paper"
      },
      {
        "name": "slip",
        "type": "PackageSlip",
        "default": "DEFAULT_SLIP",
        "description": "Structured metadata for the default shipping invoice / packing slip"
      },
      {
        "name": "maxWidth",
        "type": "number",
        "default": "460",
        "description": "Maximum width in px; the 3D scene scales down responsively"
      },
      {
        "name": "colors",
        "type": "PackageBoxColors",
        "default": "undefined",
        "description": "Color overrides for box cardboard, tape, paper, ink, and accent stamp"
      },
      {
        "name": "label",
        "type": "ReactNode | false",
        "default": "undefined",
        "description": "Custom shipping label or false to hide"
      },
      {
        "name": "symbols",
        "type": "ReactNode | false",
        "default": "undefined",
        "description": "Custom fragile/handling symbols or false to hide"
      },
      {
        "name": "tape",
        "type": "boolean",
        "default": "true",
        "description": "Whether packing tape across top and seam is rendered"
      },
      {
        "name": "hint",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the accessible toggle button below the box"
      },
      {
        "name": "openLabel",
        "type": "string",
        "default": "'Click to open'",
        "description": "Accessible label when closed"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "default": "'Close'",
        "description": "Accessible label when open"
      },
      {
        "name": "reserveSpace",
        "type": "boolean",
        "default": "false",
        "description": "Whether to preserve full open height while closed to avoid layout shifts"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional CSS class names for outer wrapper"
      },
      {
        "name": "paperClassName",
        "type": "string",
        "default": "''",
        "description": "Optional CSS class names for the document paper"
      }
    ],
    "accessibility": [
      "Accessible button controller with aria-expanded and aria-controls bindings",
      "Document element labeled with role=\"document\" and inert attribute while sealed inside",
      "Keyboard support with Escape key listener to close active package",
      "Respects prefers-reduced-motion by skipping animation durations and instant state resolution"
    ],
    "createdAt": "2026-10-15",
    "usageCode": "import { PackageBox } from \"@/components/ui/package-box\";\n\nexport function Demo() {\n  return (\n    <PackageBox\n      colors={{ box: \"#b07b4a\", tape: \"#d3c3aa\" }}\n      slip={{\n        title: \"Thank you, Ana.\",\n        subtitle: \"Your order is packed and on its way.\",\n        recipient: \"Ana Rivera\",\n        items: [\n          { name: \"Oak desk lamp\", qty: 1, price: \"$89.00\" },\n          { name: \"Linen pouch\", qty: 2, price: \"$36.00\" },\n        ],\n        total: \"$125.00\",\n        stamp: \"Packed\",\n      }}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/PackageBox.tsx",
        "type": "registry:ui",
        "target": "components/ui/package-box.tsx"
      }
    ]
  },
  {
    "id": "particle-delete",
    "name": "Particle Delete",
    "tagline": "Physics-driven pixel particle dissolution delete animation",
    "description": "Premium physics-driven particle dissolution delete animation that rasterizes components into thousands of authentic tiny pixels and disperses them smoothly before state removal.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Spring Physics",
      "High-DPI",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/particle-delete",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Particle Delete component into my project.\n\nPremium physics-driven particle dissolution delete animation that rasterizes components into thousands of authentic tiny pixels and disperses them smoothly before state removal.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/particle-delete\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ParticleDeleteContainer, useParticleDelete, particleDelete } from \"@/components/ui/particle-delete\";\nimport { Trash2 } from \"lucide-react\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', name: 'Database Snapshot #409' },\n    { id: '2', name: 'Redis Cache Layer' }\n  ]);\n\n  const handleDelete = (id: string) => {\n    setItems((prev) => prev.filter((i) => i.id !== id));\n  };\n\n  return (\n    <div className=\"space-y-3\">\n      {items.map((item) => (\n        <ParticleDeleteContainer\n          key={item.id}\n          onDelete={() => handleDelete(item.id)}\n          className=\"p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center justify-between\"\n        >\n          {({ isDeleting, handleDelete: triggerDelete }) => (\n            <>\n              <span className=\"text-sm font-medium text-white\">{item.name}</span>\n              <button\n                type=\"button\"\n                onClick={triggerDelete}\n                disabled={isDeleting}\n                className=\"p-2 rounded-lg bg-[#141414] hover:bg-rose-950/40 text-[#888888] hover:text-rose-400 border border-[#262626] transition-colors\"\n              >\n                <Trash2 className=\"w-4 h-4\" />\n              </button>\n            </>\n          )}\n        </ParticleDeleteContainer>\n      ))}\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `onDelete` (() => void) — Callback invoked after the particle dissolution finishes to remove state\n- `options.duration` (number); default: 850 — Animation duration in milliseconds\n- `options.force` (number); default: 1.0 — Outward velocity multiplier for particle dispersion\n- `options.particleSize` (number); default: 1.5 — Visual diameter of individual particles in pixels\n- `options.dissolvePattern` ('center-first' | 'edges-first' | 'uniform' | 'random'); default: 'center-first' — Dissolution spread delay algorithm\n- `options.sampleStep` (number); default: 2 (desktop) / 3 (mobile) — Pixel sampling step interval\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/particle-delete.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "9fe3e5be7cfa75a0f3ed1d3cde834ab81724a2f24ed129356318b017fcf2af5d",
    "features": [
      "Authentic pixel capture inherits real component colors and typography",
      "Hardware-accelerated 60 FPS Canvas rendering with zero DOM overhead",
      "Configurable physics: duration, explosion force, drag, and dissolution spread",
      "Full accessibility support with automatic prefers-reduced-motion fallback",
      "Available as direct utility particleDelete(), hook useParticleDelete(), or <ParticleDeleteContainer /> wrapper"
    ],
    "props": [
      {
        "name": "onDelete",
        "type": "() => void",
        "description": "Callback invoked after the particle dissolution finishes to remove state"
      },
      {
        "name": "options.duration",
        "type": "number",
        "default": "850",
        "description": "Animation duration in milliseconds"
      },
      {
        "name": "options.force",
        "type": "number",
        "default": "1.0",
        "description": "Outward velocity multiplier for particle dispersion"
      },
      {
        "name": "options.particleSize",
        "type": "number",
        "default": "1.5",
        "description": "Visual diameter of individual particles in pixels"
      },
      {
        "name": "options.dissolvePattern",
        "type": "'center-first' | 'edges-first' | 'uniform' | 'random'",
        "default": "'center-first'",
        "description": "Dissolution spread delay algorithm"
      },
      {
        "name": "options.sampleStep",
        "type": "number",
        "default": "2 (desktop) / 3 (mobile)",
        "description": "Pixel sampling step interval"
      }
    ],
    "accessibility": [
      "Automatically honors prefers-reduced-motion: reduce with immediate subtle fade exit",
      "Delete trigger buttons maintain clear ARIA labels and keyboard focus ring states",
      "Canvas overlay is marked with aria-hidden=\"true\" and pointer-events: none"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ParticleDeleteContainer, useParticleDelete, particleDelete } from \"@/components/ui/particle-delete\";\nimport { Trash2 } from \"lucide-react\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', name: 'Database Snapshot #409' },\n    { id: '2', name: 'Redis Cache Layer' }\n  ]);\n\n  const handleDelete = (id: string) => {\n    setItems((prev) => prev.filter((i) => i.id !== id));\n  };\n\n  return (\n    <div className=\"space-y-3\">\n      {items.map((item) => (\n        <ParticleDeleteContainer\n          key={item.id}\n          onDelete={() => handleDelete(item.id)}\n          className=\"p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center justify-between\"\n        >\n          {({ isDeleting, handleDelete: triggerDelete }) => (\n            <>\n              <span className=\"text-sm font-medium text-white\">{item.name}</span>\n              <button\n                type=\"button\"\n                onClick={triggerDelete}\n                disabled={isDeleting}\n                className=\"p-2 rounded-lg bg-[#141414] hover:bg-rose-950/40 text-[#888888] hover:text-rose-400 border border-[#262626] transition-colors\"\n              >\n                <Trash2 className=\"w-4 h-4\" />\n              </button>\n            </>\n          )}\n        </ParticleDeleteContainer>\n      ))}\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/ParticleDelete.tsx",
        "type": "registry:ui",
        "target": "components/ui/particle-delete.tsx"
      }
    ]
  },
  {
    "id": "payment-receipt-printer",
    "name": "Payment Receipt Printer",
    "tagline": "Animated thermal receipt printer with smooth paper extrusion motion",
    "description": "An animated payment and order receipt printer component for React featuring realistic thermal paper extrusion, chassis micro-vibration, customizable receipt itemization, and replay controls.",
    "category": "Feedback",
    "badges": [
      "Spring Physics",
      "Feedback",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-receipt-printer",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Payment Receipt Printer component into my project.\n\nAn animated payment and order receipt printer component for React featuring realistic thermal paper extrusion, chassis micro-vibration, customizable receipt itemization, and replay controls.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/payment-receipt-printer\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PaymentReceiptPrinter } from \"@/components/ui/payment-receipt-printer\";\n\nexport function Demo() {\n  return (\n    <PaymentReceiptPrinter\n      merchant=\"EasyUI Store\"\n      orderNumber=\"#4821\"\n      items={[\n        { name: \"EasyUI Pro License\", price: \"$200.00\", quantity: 1 },\n        { name: \"Framer Motion Pack\", price: \"$20.00\", quantity: 1 },\n      ]}\n      subtotal=\"$220.00\"\n      total=\"$220.00\"\n      paymentMethod=\"Apple Pay •••• 4242\"\n      message=\"Thank you for your order!\"\n    />\n  );\n}\n```\n\nDeclared props:\n- `status` ('idle' | 'printing' | 'completed' | 'success'); default: 'idle' — Current lifecycle state of payment and printing\n- `merchant` (string); default: 'EasyUI Store' — Store or company name on receipt header\n- `merchantSubtext` (string); default: 'Official Component Registry' — Location or subtitle below merchant name\n- `merchantLogo` (ReactNode); default: undefined — Custom logo icon rendered in receipt header\n- `orderNumber` (string); default: '#4821' — Unique order or invoice tracking reference\n- `date` (string | Date); default: Current date — Transaction timestamp string or Date object\n- `items` (ReceiptItem[]); default: [] — List of purchased items with prices, quantities, and descriptions\n- `item` (ReceiptItem); default: undefined — Shorthand for single item receipt\n- `subtotal` (string | number); default: undefined — Subtotal price before tax and discounts\n- `tax` (string | number); default: undefined — Tax amount displayed on receipt\n- `discount` (string | number); default: undefined — Discount or coupon amount deducted\n- `total` (string | number); default: '$200.00' — Final total payment amount\n- `currency` (string); default: '$' — Currency symbol prepended to numeric prices\n- `paymentMethod` (string); default: 'Apple Pay •••• 4242' — Payment method or card description\n- `message` (string); default: 'Thank you for your order!' — Footer message printed at bottom of receipt\n- `autoPrint` (boolean); default: true — Whether to automatically begin printing extrusion on mount\n- `printDuration` (number); default: 2.4 — Extrusion animation duration in seconds\n- `showStatusCard` (boolean); default: true — Whether to display the top status card banner\n- `statusTitle` (string); default: 'Payment Complete' — Heading for the top status banner\n- `statusSubtitle` (string); default: 'Receipt has been issued' — Subtitle description for status banner\n- `showActions` (boolean); default: true — Whether to render Replay and Copy action buttons\n- `showBarcode` (boolean); default: true — Whether to render the thermal barcode block\n- `showCutEffect` (boolean); default: true — Whether to render jagged serrated paper edges\n- `paperTheme` ('light' | 'dark' | 'cream'); default: 'light' — Receipt paper visual theme styling\n- `onPrintStart` (() => void); default: undefined — Callback fired when paper printing begins\n- `onPrintComplete` (() => void); default: undefined — Callback fired when paper printing finishes\n- `onReplay` (() => void); default: undefined — Callback fired when animation replay is triggered\n- `className` (string); default: undefined — Custom CSS classes for outer container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/payment-receipt-printer.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "7c48ae19755d9ae1c371aa78b877c87f6fc695ffdd8f1ae9d5ff50153465a131",
    "features": [
      "Authentic thermal paper extrusion animation emerging downward from printer slot",
      "Subtle chassis vibration physics during active printing phase",
      "Multiple receipt items support with automatic dynamic height calculation",
      "Customizable merchant brand, order number, payment method, taxes, barcode, and message",
      "Interactive Replay, Copy Order Number, and Print action controls",
      "Light, dark, and cream paper themes with serrated paper perforation cuts",
      "Full accessibility support with aria-live status and prefers-reduced-motion detection"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'printing' | 'completed' | 'success'",
        "default": "'idle'",
        "description": "Current lifecycle state of payment and printing"
      },
      {
        "name": "merchant",
        "type": "string",
        "default": "'EasyUI Store'",
        "description": "Store or company name on receipt header"
      },
      {
        "name": "merchantSubtext",
        "type": "string",
        "default": "'Official Component Registry'",
        "description": "Location or subtitle below merchant name"
      },
      {
        "name": "merchantLogo",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom logo icon rendered in receipt header"
      },
      {
        "name": "orderNumber",
        "type": "string",
        "default": "'#4821'",
        "description": "Unique order or invoice tracking reference"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "Current date",
        "description": "Transaction timestamp string or Date object"
      },
      {
        "name": "items",
        "type": "ReceiptItem[]",
        "default": "[]",
        "description": "List of purchased items with prices, quantities, and descriptions"
      },
      {
        "name": "item",
        "type": "ReceiptItem",
        "default": "undefined",
        "description": "Shorthand for single item receipt"
      },
      {
        "name": "subtotal",
        "type": "string | number",
        "default": "undefined",
        "description": "Subtotal price before tax and discounts"
      },
      {
        "name": "tax",
        "type": "string | number",
        "default": "undefined",
        "description": "Tax amount displayed on receipt"
      },
      {
        "name": "discount",
        "type": "string | number",
        "default": "undefined",
        "description": "Discount or coupon amount deducted"
      },
      {
        "name": "total",
        "type": "string | number",
        "default": "'$200.00'",
        "description": "Final total payment amount"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to numeric prices"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay •••• 4242'",
        "description": "Payment method or card description"
      },
      {
        "name": "message",
        "type": "string",
        "default": "'Thank you for your order!'",
        "description": "Footer message printed at bottom of receipt"
      },
      {
        "name": "autoPrint",
        "type": "boolean",
        "default": "true",
        "description": "Whether to automatically begin printing extrusion on mount"
      },
      {
        "name": "printDuration",
        "type": "number",
        "default": "2.4",
        "description": "Extrusion animation duration in seconds"
      },
      {
        "name": "showStatusCard",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display the top status card banner"
      },
      {
        "name": "statusTitle",
        "type": "string",
        "default": "'Payment Complete'",
        "description": "Heading for the top status banner"
      },
      {
        "name": "statusSubtitle",
        "type": "string",
        "default": "'Receipt has been issued'",
        "description": "Subtitle description for status banner"
      },
      {
        "name": "showActions",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render Replay and Copy action buttons"
      },
      {
        "name": "showBarcode",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the thermal barcode block"
      },
      {
        "name": "showCutEffect",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render jagged serrated paper edges"
      },
      {
        "name": "paperTheme",
        "type": "'light' | 'dark' | 'cream'",
        "default": "'light'",
        "description": "Receipt paper visual theme styling"
      },
      {
        "name": "onPrintStart",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing begins"
      },
      {
        "name": "onPrintComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing finishes"
      },
      {
        "name": "onReplay",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when animation replay is triggered"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS classes for outer container"
      }
    ],
    "accessibility": [
      "ARIA live region for dynamic payment and printing status announcements",
      "Respects prefers-reduced-motion media query with instantaneous completion",
      "Keyboard accessible interactive replay and copy controls with focus-visible rings",
      "Semantic document structure with compliant contrast ratios"
    ],
    "createdAt": "2026-08-20",
    "usageCode": "import { PaymentReceiptPrinter } from \"@/components/ui/payment-receipt-printer\";\n\nexport function Demo() {\n  return (\n    <PaymentReceiptPrinter\n      merchant=\"EasyUI Store\"\n      orderNumber=\"#4821\"\n      items={[\n        { name: \"EasyUI Pro License\", price: \"$200.00\", quantity: 1 },\n        { name: \"Framer Motion Pack\", price: \"$20.00\", quantity: 1 },\n      ]}\n      subtotal=\"$220.00\"\n      total=\"$220.00\"\n      paymentMethod=\"Apple Pay •••• 4242\"\n      message=\"Thank you for your order!\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentReceiptPrinter.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-receipt-printer.tsx"
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
  },
  {
    "id": "payment-status",
    "name": "Payment Status",
    "tagline": "Refined transaction status card with self-drawing checkmark and receipt actions",
    "description": "A calm, Apple-grade payment confirmation card with animated SVG path checkmark drawing, staged verification lifecycle transitions, receipt inspection, and failure recovery.",
    "category": "Feedback",
    "badges": [
      "Payment",
      "Feedback",
      "SVG Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-status",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Payment Status component into my project.\n\nA calm, Apple-grade payment confirmation card with animated SVG path checkmark drawing, staged verification lifecycle transitions, receipt inspection, and failure recovery.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/payment-status\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PaymentStatus } from \"@/components/ui/payment-status\";\n\nexport function Demo() {\n  return (\n    <PaymentStatus\n      status=\"success\"\n      amount=\"$149.00\"\n      transactionId=\"tx_8830192a\"\n      paymentMethod=\"Apple Pay\"\n      last4=\"4242\"\n    />\n  );\n}\n```\n\nDeclared props:\n- `status` ('processing' | 'verifying' | 'success' | 'failed' | 'refunded'); default: 'processing' — Current lifecycle state of payment\n- `amount` (string | number); default: '$149.00' — Transaction total amount formatted or numeric\n- `currency` (string); default: '$' — Currency symbol prepended to amount\n- `transactionId` (string); default: 'tx_9842a8d11c7f' — Unique transaction identifier\n- `date` (string | Date); default: 'Today at 3:42 PM' — Date/time timestamp of payment\n- `paymentMethod` (string); default: 'Apple Pay' — Payment gateway or card provider\n- `last4` (string); default: '4242' — Last 4 digits of card or account\n- `items` (PaymentReceiptItem[]); default: [...] — Itemized purchase items for detailed receipt view\n- `merchantName` (string); default: 'EasyUI Cloud' — Merchant or brand organization name\n- `onRetry` (() => void); default: undefined — Callback fired when user clicks Try Again\n- `onChangePaymentMethod` (() => void); default: undefined — Callback fired when user changes card method\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/payment-status.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "a39133e8421839906636496fc012388dbdcb32e062c7a5780896ffee57f8b46d",
    "features": [
      "5 clear lifecycle states: Processing, Verifying, Success, Failed, and Refunded",
      "Self-drawing SVG stroke checkmark animation upon payment confirmation",
      "Staggered metadata reveal for amount, transaction hash, timestamp, and card info",
      "Unfolding itemized receipt accordion with instant text-file receipt download",
      "One-click transaction ID copying with instant checkmark feedback",
      "Non-aggressive error state with instant retry and payment method alternatives"
    ],
    "props": [
      {
        "name": "status",
        "type": "'processing' | 'verifying' | 'success' | 'failed' | 'refunded'",
        "default": "'processing'",
        "description": "Current lifecycle state of payment"
      },
      {
        "name": "amount",
        "type": "string | number",
        "default": "'$149.00'",
        "description": "Transaction total amount formatted or numeric"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to amount"
      },
      {
        "name": "transactionId",
        "type": "string",
        "default": "'tx_9842a8d11c7f'",
        "description": "Unique transaction identifier"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "'Today at 3:42 PM'",
        "description": "Date/time timestamp of payment"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay'",
        "description": "Payment gateway or card provider"
      },
      {
        "name": "last4",
        "type": "string",
        "default": "'4242'",
        "description": "Last 4 digits of card or account"
      },
      {
        "name": "items",
        "type": "PaymentReceiptItem[]",
        "default": "[...]",
        "description": "Itemized purchase items for detailed receipt view"
      },
      {
        "name": "merchantName",
        "type": "string",
        "default": "'EasyUI Cloud'",
        "description": "Merchant or brand organization name"
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Try Again"
      },
      {
        "name": "onChangePaymentMethod",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user changes card method"
      }
    ],
    "accessibility": [
      "Aria-live region alerts assistive technology on status transition updates",
      "Keyboard accessible receipt toggle and transaction ID copy buttons",
      "Compliant contrast ratio on dark monochrome surface",
      "Full reduced-motion compatibility with zero stroke animation lag"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PaymentStatus } from \"@/components/ui/payment-status\";\n\nexport function Demo() {\n  return (\n    <PaymentStatus\n      status=\"success\"\n      amount=\"$149.00\"\n      transactionId=\"tx_8830192a\"\n      paymentMethod=\"Apple Pay\"\n      last4=\"4242\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentStatus.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-status.tsx"
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
  },
  {
    "id": "peek-card",
    "name": "Peek Card",
    "tagline": "Origin-anchored contextual preview card with edge-aware collision detection",
    "description": "An origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.",
    "category": "Overlays",
    "badges": [
      "Popovers",
      "Overlays",
      "Context Preview"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/peek-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Peek Card component into my project.\n\nAn origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/peek-card\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PeekCard } from \"@/components/ui/peek-card\";\n\nexport function Demo() {\n  return (\n    <PeekCard\n      data={{\n        title: \"Payment #3948\",\n        amount: \"$249.00\",\n        customer: { name: \"Alexander Wright\", email: \"alex@acme.com\" },\n        status: \"Succeeded\",\n      }}\n    >\n      <span className=\"underline decoration-dotted cursor-pointer\">\n        Payment #3948\n      </span>\n    </PeekCard>\n  );\n}\n```\n\nDeclared props:\n- `children` (ReactNode); default: undefined — Trigger target element wrapped by peek card\n- `data` (PeekCardData); default: [...] — Structured preview dataset\n- `delay` (number); default: 200 — Hover activation delay in milliseconds\n- `placement` ('top' | 'bottom' | 'auto'); default: 'auto' — Preferred emergence direction\n- `isLoading` (boolean); default: false — Renders skeleton placeholder during async lookup\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/peek-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "154288dbab9236518634136d4d3f4e5a9f63fb83b9ab38210b565e138e1c4369",
    "features": [
      "Origin-anchored emergence animation feeling connected to source elements",
      "Automatic edge collision detection preventing viewport bounding overflow",
      "Rich preset layout for transactions, user profiles, invoices, and metrics",
      "Mobile tap toggle and desktop hover/focus dual interaction model",
      "Integrated copy actions and status indicators with reduced-motion support"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Trigger target element wrapped by peek card"
      },
      {
        "name": "data",
        "type": "PeekCardData",
        "default": "[...]",
        "description": "Structured preview dataset"
      },
      {
        "name": "delay",
        "type": "number",
        "default": "200",
        "description": "Hover activation delay in milliseconds"
      },
      {
        "name": "placement",
        "type": "'top' | 'bottom' | 'auto'",
        "default": "'auto'",
        "description": "Preferred emergence direction"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Renders skeleton placeholder during async lookup"
      }
    ],
    "accessibility": [
      "Keyboard accessible through native onFocus and onBlur handlers",
      "Closes automatically on Escape key press or outside click"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PeekCard } from \"@/components/ui/peek-card\";\n\nexport function Demo() {\n  return (\n    <PeekCard\n      data={{\n        title: \"Payment #3948\",\n        amount: \"$249.00\",\n        customer: { name: \"Alexander Wright\", email: \"alex@acme.com\" },\n        status: \"Succeeded\",\n      }}\n    >\n      <span className=\"underline decoration-dotted cursor-pointer\">\n        Payment #3948\n      </span>\n    </PeekCard>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PeekCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/peek-card.tsx"
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
  },
  {
    "id": "photo-box",
    "name": "Photo Box",
    "tagline": "Frosted paper box with fanning polaroids and tactile zoom inspection",
    "description": "Tactile Japanese stationery-inspired photo box featuring frosted glass translucency, sliding paper box mechanics, fanning polaroid prints, and full-bleed image zoom.",
    "category": "Motion",
    "badges": [
      "Polaroid",
      "Stationery",
      "Glassmorphism",
      "Motion",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/photo-box",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Photo Box component into my project.\n\nTactile Japanese stationery-inspired photo box featuring frosted glass translucency, sliding paper box mechanics, fanning polaroid prints, and full-bleed image zoom.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/photo-box\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PhotoBox } from \"@/components/ui/photo-box\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <PhotoBox />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `prints` (PhotoPrint[]); default: DEFAULT_PRINTS — Up to 3 photo prints to display inside the box slots (title, caption, src or art)\n- `title` (string); default: '写真箱' — Headline kanji or text displayed on the frosted cover\n- `subtitle` (string); default: 'Photo Box · 3 prints' — Subtext printed beneath the headline title\n- `open` (boolean); default: undefined — Optional controlled open state for external hover or trigger controls\n- `className` (string); default: '' — Optional CSS class overrides applied to the outer stage container\n- `onOpenChange` ((open: boolean) => void); default: undefined — Callback invoked whenever the box opens or closes\n- `onSelect` ((id: string | null) => void); default: undefined — Callback invoked when an individual polaroid print is inspected or closed\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/photo-box.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "06557bf1146c5c4254cc7f9a6cb69519076cd83be2aa5f9ba146def0dd0da993",
    "features": [
      "Translucent frosted glass cover with realistic backdrop-blur and warm gradient sheen",
      "Sliding paper box drawer physics with spring-tuned easing and offset lip reveal",
      "Tri-slot polaroid fanning layout that expands on hover, tap, or focus",
      "Click-to-zoom polaroid inspection view with high-res framing and title captions",
      "Accessible keyboard navigation (Tab through prints, Enter to expand, Esc to dismiss)",
      "Responsive auto-scaling stage with ResizeObserver keeping pixel-perfect geometry down to mobile screens"
    ],
    "props": [
      {
        "name": "prints",
        "type": "PhotoPrint[]",
        "default": "DEFAULT_PRINTS",
        "description": "Up to 3 photo prints to display inside the box slots (title, caption, src or art)"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'写真箱'",
        "description": "Headline kanji or text displayed on the frosted cover"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "'Photo Box · 3 prints'",
        "description": "Subtext printed beneath the headline title"
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Optional controlled open state for external hover or trigger controls"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional CSS class overrides applied to the outer stage container"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback invoked whenever the box opens or closes"
      },
      {
        "name": "onSelect",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Callback invoked when an individual polaroid print is inspected or closed"
      }
    ],
    "accessibility": [
      "Full keyboard navigation allowing Tab selection and Enter activation of unboxed polaroid prints",
      "Esc key listener to collapse enlarged polaroids and pinned touch drawers",
      "ARIA attributes including role=\"dialog\", aria-modal=\"true\", and aria-expanded",
      "Automatic prefers-reduced-motion detection with instantaneous transitions"
    ],
    "createdAt": "2026-10-14",
    "usageCode": "import { PhotoBox } from \"@/components/ui/photo-box\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <PhotoBox />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/PhotoBox.tsx",
        "type": "registry:ui",
        "target": "components/ui/photo-box.tsx"
      }
    ]
  },
  {
    "id": "pill-navigation",
    "name": "Pill Navigation",
    "tagline": "Minimal shared-pill navigation continuity with fluid submenus",
    "description": "A restrained segmented navigation control with shared pill layout morphing and nested submenu dropdown support.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Submenu Dropdown",
      "Accessible",
      "Minimal"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pill-navigation",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Pill Navigation component into my project.\n\nA restrained segmented navigation control with shared pill layout morphing and nested submenu dropdown support.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/pill-navigation\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PillNavigation } from \"@/components/ui/pill-navigation\";\n\nexport function Demo() {\n  return (\n    <PillNavigation\n      items={[\n        { id: 'overview', label: 'Overview' },\n        {\n          id: 'motion',\n          label: 'Motion',\n          children: [\n            { id: 'springs', label: 'Spring Physics' },\n            { id: 'caustics', label: 'Liquid Caustics' },\n          ],\n        },\n        { id: 'code', label: 'Code' },\n      ]}\n      onChange={(mainId, subId) => console.log(mainId, subId)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (PillNavigationItem[]); default: demo items — Navigation items with optional submenu children\n- `defaultValue` (string); default: first item id — Initial selected item id\n- `defaultSubValue` (string); default: undefined — Initial selected submenu item id\n- `onChange` ((id: string, subId?: string) => void); default: undefined — Selection callback\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/pill-navigation.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "31ee7245b275b9daf2c85593456a11196929088121e3d5e2e5ad2b81303a385a",
    "features": [
      "Single shared indicator preserves spatial continuity",
      "Interactive nested submenu with fluid spring entrance and layout morphing",
      "Dual-tier keyboard navigation for parent tabs and sub-items"
    ],
    "props": [
      {
        "name": "items",
        "type": "PillNavigationItem[]",
        "default": "demo items",
        "description": "Navigation items with optional submenu children"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "first item id",
        "description": "Initial selected item id"
      },
      {
        "name": "defaultSubValue",
        "type": "string",
        "default": "undefined",
        "description": "Initial selected submenu item id"
      },
      {
        "name": "onChange",
        "type": "(id: string, subId?: string) => void",
        "default": "undefined",
        "description": "Selection callback"
      }
    ],
    "accessibility": [
      "Uses tablist and tab roles with aria-selected and aria-expanded state",
      "Supports ArrowLeft/ArrowRight for main tabs and ArrowUp/ArrowDown for sub-items",
      "Reduced motion swaps the moving shared pill for an immediate selected background"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { PillNavigation } from \"@/components/ui/pill-navigation\";\n\nexport function Demo() {\n  return (\n    <PillNavigation\n      items={[\n        { id: 'overview', label: 'Overview' },\n        {\n          id: 'motion',\n          label: 'Motion',\n          children: [\n            { id: 'springs', label: 'Spring Physics' },\n            { id: 'caustics', label: 'Liquid Caustics' },\n          ],\n        },\n        { id: 'code', label: 'Code' },\n      ]}\n      onChange={(mainId, subId) => console.log(mainId, subId)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PillNavigation.tsx",
        "type": "registry:ui",
        "target": "components/ui/pill-navigation.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "press-button",
    "name": "PressButton",
    "tagline": "Compresses slightly on press, then settles",
    "description": "A button that compresses slightly on press and settles with a tiny natural overshoot for a tactile, physical feel.",
    "category": "Buttons",
    "badges": [
      "Spring Press",
      "Squash Physics",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/press-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI PressButton component into my project.\n\nA button that compresses slightly on press and settles with a tiny natural overshoot for a tactile, physical feel.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/press-button\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <PressButton variant=\"primary\">Save changes</PressButton>\n      <PressButton variant=\"secondary\" pressStrength={0.05}>Cancel</PressButton>\n      <PressButton variant=\"outline\">Learn more</PressButton>\n      <PressButton variant=\"ghost\">Skip</PressButton>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `variant` ('primary' | 'secondary' | 'outline' | 'ghost'); default: 'primary' — Visual presentation style\n- `size` ('sm' | 'md' | 'lg' | 'icon'); default: 'md' — Dimensions and typography scale\n- `pressStrength` (number); default: 0.04 — Compression amount on press (0-1, clamped 0.01-0.06)\n- `fullWidth` (boolean); default: false — Stretches button to 100% width of parent container\n- `disabled` (boolean); default: false — Prevents interaction and applies 30% disabled opacity\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/press-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b7a4b98f1dab168afd50fecc65a7412b72e41f491fe81ca1a88af01d1fc2be7d",
    "features": [
      "Layered scaleX + scaleY squash for an organic compression on press",
      "Tunable pressStrength (0-1) to control how much the button compresses",
      "Snappy spring with a tiny overshoot so the button \"settles\" instead of snapping",
      "4 visual variants: Primary, Secondary, Outline, Ghost — light/dark theme aware",
      "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
      "Full keyboard accessibility with focus-ring and disabled state"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
        "default": "'primary'",
        "description": "Visual presentation style"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'icon'",
        "default": "'md'",
        "description": "Dimensions and typography scale"
      },
      {
        "name": "pressStrength",
        "type": "number",
        "default": "0.04",
        "description": "Compression amount on press (0-1, clamped 0.01-0.06)"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches button to 100% width of parent container"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Native <button> semantics with explicit type=\"button\" default",
      "Standard focus-ring outline with restrained accent on keyboard :focus-visible",
      "Disabled state is communicated both visually and via pointer-events",
      "Respects prefers-reduced-motion via the system spring config"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <PressButton variant=\"primary\">Save changes</PressButton>\n      <PressButton variant=\"secondary\" pressStrength={0.05}>Cancel</PressButton>\n      <PressButton variant=\"outline\">Learn more</PressButton>\n      <PressButton variant=\"ghost\">Skip</PressButton>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/PressButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/press-button.tsx"
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
  },
  {
    "id": "pricing",
    "name": "Pricing",
    "tagline": "Minimal two-tier pricing that belongs in EasyUI",
    "description": "A minimal two-tier pricing component for EasyUI. Native to the existing design system, fully theme-aware, with a quiet Free tier and a slightly more attractive Pro tier — without resorting to SaaS marketing tropes.",
    "category": "Motion",
    "badges": [
      "Light + Dark",
      "Themed",
      "Responsive",
      "Accessible",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pricing",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Pricing component into my project.\n\nA minimal two-tier pricing component for EasyUI. Native to the existing design system, fully theme-aware, with a quiet Free tier and a slightly more attractive Pro tier — without resorting to SaaS marketing tropes.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/pricing\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Pricing } from \"@/components/ui/pricing\";\n\nexport function Demo() {\n  // Renders the EasyUI default Free + Pro pair out of the box.\n  return <Pricing />;\n}\n```\n\nDeclared props:\n- `freeTier` (PricingTier); default: EasyUI defaults — Configuration object for the Free tier — { name, tagline, price, cadence, features, ctaLabel, onCtaClick }. Optional: the component ships with sensible EasyUI defaults.\n- `proTier` (PricingTier); default: EasyUI defaults — Configuration object for the Pro tier — same shape as freeTier. Optional: defaults to the EasyUI Pro tier ($29, one-time payment).\n- `reverse` (boolean); default: false — Swaps the order so Pro is rendered on the left\n- `eyebrow` (string); default: undefined — Optional uppercase label rendered above the heading\n- `heading` (string); default: undefined — Optional headline rendered above the cards\n- `subheading` (string); default: undefined — Optional supporting copy rendered beneath the heading\n- `className` (string); default: undefined — Optional Tailwind classes appended to the outer section\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/pricing.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "2841dda783673134e99c7be07f89b938361df65beb329de7bbbe18cc6ba372ed",
    "features": [
      "Two side-by-side pricing cards (Free + Pro) that collapse to a single column on mobile",
      "Strictly uses EasyUI design tokens — no hardcoded theme colors, automatic light / dark adaptation",
      "Typography and hierarchy communicate the tier difference; no badges, countdowns, or \"best value\" stamps",
      "Pro card receives a subtle surface elevation in light mode and a brighter surface in dark mode",
      "Pro CTA uses an animated gradient base that drifts on hover (3.6s ease-in-out, background-position slide) plus a one-pass shimmer beam (1.6s) and a subtle scale lift (1.015) — same EasyUI gradient vocabulary as the existing Button.tsx \"gradient\" variant",
      "Free CTA mirrors the secondary/outline button tone for clear hierarchy",
      "Subtle border-color hover, spring enter animation, and focus-visible ring",
      "Respects prefers-reduced-motion by disabling non-essential motion"
    ],
    "props": [
      {
        "name": "freeTier",
        "type": "PricingTier",
        "default": "EasyUI defaults",
        "description": "Configuration object for the Free tier — { name, tagline, price, cadence, features, ctaLabel, onCtaClick }. Optional: the component ships with sensible EasyUI defaults."
      },
      {
        "name": "proTier",
        "type": "PricingTier",
        "default": "EasyUI defaults",
        "description": "Configuration object for the Pro tier — same shape as freeTier. Optional: defaults to the EasyUI Pro tier ($29, one-time payment)."
      },
      {
        "name": "reverse",
        "type": "boolean",
        "default": "false",
        "description": "Swaps the order so Pro is rendered on the left"
      },
      {
        "name": "eyebrow",
        "type": "string",
        "default": "undefined",
        "description": "Optional uppercase label rendered above the heading"
      },
      {
        "name": "heading",
        "type": "string",
        "default": "undefined",
        "description": "Optional headline rendered above the cards"
      },
      {
        "name": "subheading",
        "type": "string",
        "default": "undefined",
        "description": "Optional supporting copy rendered beneath the heading"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional Tailwind classes appended to the outer section"
      }
    ],
    "accessibility": [
      "Uses a semantic <section> with aria-label=\"Pricing\"",
      "Feature list rendered as a <ul> with native <li> items for screen readers",
      "Buttons are real <button> elements with type=\"button\" defaults and visible :focus-visible rings",
      "CTA color contrast meets WCAG AA in both light and dark themes",
      "prefers-reduced-motion disables enter, hover, and y-translation motion"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { Pricing } from \"@/components/ui/pricing\";\n\nexport function Demo() {\n  // Renders the EasyUI default Free + Pro pair out of the box.\n  return <Pricing />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Pricing.tsx",
        "type": "registry:ui",
        "target": "components/ui/pricing.tsx"
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
  },
  {
    "id": "product-tour",
    "name": "Product Tour",
    "tagline": "Interactive walkthrough with spring spotlight cutout and responsive docking",
    "description": "An interactive product walkthrough with spring-animated spotlight cutout, auto-scrolling targets, responsive bottom-sheet docking, and keyboard navigation.",
    "category": "Feedback",
    "badges": [
      "Walkthrough",
      "Spotlight",
      "Spring Physics",
      "Keyboard Nav",
      "Portal"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/product-tour",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Product Tour component into my project.\n\nAn interactive product walkthrough with spring-animated spotlight cutout, auto-scrolling targets, responsive bottom-sheet docking, and keyboard navigation.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/product-tour\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { ProductTour, type TourStep } from \"@/components/ui/product-tour\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  const steps: TourStep[] = [\n    { title: \"Welcome\", body: \"Let's take a quick tour around the interface.\" },\n    { target: \"#search-input\", title: \"Global Search\", body: \"Quickly locate projects and assets.\", placement: \"bottom\" },\n    { target: \"#actions-panel\", title: \"Actions\", body: \"Create or import documents here.\", placement: \"left\" },\n  ];\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Start Tour</button>\n      <ProductTour open={open} steps={steps} onClose={() => setOpen(false)} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `steps` (TourStep[]) — List of tour steps with target selector, title, body, and placement preference\n- `open` (boolean) — Controls whether the spotlight tour overlay is open\n- `onClose` ((reason: TourCloseReason) => void) — Callback triggered when tour completes, is skipped, or is dismissed\n- `onStepChange` ((index: number) => void); default: undefined — Optional callback invoked whenever the active step index changes\n- `startAt` (number); default: 0 — Zero-based initial step index when the tour opens\n- `closeOnOverlayClick` (boolean); default: false — Whether clicking the dim overlay dismisses the tour\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/product-tour.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ca6e95ee30334dfb01b9dc6aaf976b5e5c4d435757b5db9d515a7bc3d0f50e43",
    "features": [
      "Spring-animated SVG mask spotlight that smoothly transitions between target elements",
      "Automatic scroll-into-view with scroll settlement detection before positioning",
      "Responsive viewport placement: floating tooltip on desktop, docked bottom sheet on mobile",
      "Complete keyboard controls (Left/Right arrows to navigate, Escape to dismiss, Tab trapping)",
      "Dynamic height animation with ResizeObserver as step copy changes",
      "Reduced motion support and full dark and light mode styling"
    ],
    "props": [
      {
        "name": "steps",
        "type": "TourStep[]",
        "description": "List of tour steps with target selector, title, body, and placement preference"
      },
      {
        "name": "open",
        "type": "boolean",
        "description": "Controls whether the spotlight tour overlay is open"
      },
      {
        "name": "onClose",
        "type": "(reason: TourCloseReason) => void",
        "description": "Callback triggered when tour completes, is skipped, or is dismissed"
      },
      {
        "name": "onStepChange",
        "type": "(index: number) => void",
        "default": "undefined",
        "description": "Optional callback invoked whenever the active step index changes"
      },
      {
        "name": "startAt",
        "type": "number",
        "default": "0",
        "description": "Zero-based initial step index when the tour opens"
      },
      {
        "name": "closeOnOverlayClick",
        "type": "boolean",
        "default": "false",
        "description": "Whether clicking the dim overlay dismisses the tour"
      }
    ],
    "accessibility": [
      "Uses role=\"dialog\" with aria-modal=\"true\" and aria-live=\"polite\" for dynamic step announcements",
      "Captures focus on open and returns focus to the initiating element upon dismissal",
      "Traps Tab navigation strictly within the tour dialog buttons",
      "Full keyboard shortcuts: Left/Right arrows for steps, Escape to dismiss",
      "Respects prefers-reduced-motion by bypassing springs and scroll animations"
    ],
    "createdAt": "2026-10-13",
    "usageCode": "import { useState } from \"react\";\nimport { ProductTour, type TourStep } from \"@/components/ui/product-tour\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  const steps: TourStep[] = [\n    { title: \"Welcome\", body: \"Let's take a quick tour around the interface.\" },\n    { target: \"#search-input\", title: \"Global Search\", body: \"Quickly locate projects and assets.\", placement: \"bottom\" },\n    { target: \"#actions-panel\", title: \"Actions\", body: \"Create or import documents here.\", placement: \"left\" },\n  ];\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Start Tour</button>\n      <ProductTour open={open} steps={steps} onClose={() => setOpen(false)} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ProductTour.tsx",
        "type": "registry:ui",
        "target": "components/ui/product-tour.tsx"
      }
    ]
  },
  {
    "id": "profile-card",
    "name": "Profile Card",
    "tagline": "Dark social profile card with painted blue cover art",
    "description": "A premium dark social profile card with a painted blue cover-art panel, action row, and a detail panel with avatar, verified name, bio, follower stats, and outbound website link.",
    "category": "Motion",
    "badges": [
      "Spring Tap",
      "Tailwind",
      "Painted Artwork",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/profile-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Profile Card component into my project.\n\nA premium dark social profile card with a painted blue cover-art panel, action row, and a detail panel with avatar, verified name, bio, follower stats, and outbound website link.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/profile-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ProfileCard } from \"@/components/ui/profile-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <ProfileCard\n        name=\"Suraj\"\n        username=\"@surajmaurya_m\"\n        description=\"Building EasyUI. Engineer.\"\n        followers=\"200K\"\n        posts=\"72\"\n        website=\"easyui.site\"\n        onAction={() => console.log('Follow clicked')}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `name` (string); default: 'Suraj' — Display name shown in the detail panel header\n- `username` (string); default: '@surajmaurya_m' — Handle rendered as the small caption under the name\n- `description` (string); default: 'Building EasyUI. Engineer.' — Biographical text shown under the name\n- `followers` (string); default: '200K' — Pre-formatted follower count\n- `posts` (string); default: '72' — Pre-formatted post count\n- `website` (string); default: 'easyui.site' — Website domain — link href is auto-prefixed with https://\n- `actionLabel` (string); default: 'Follow' — Label for the primary action button\n- `onAction` (() => void); default: undefined — Click handler for the primary action button\n- `className` (string); default: undefined — Additional Tailwind classes merged into the card root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/profile-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "403567f3af486f4d6912f5b0057e8741478592de46484f00ac6072defb87c7e3",
    "features": [
      "Painted blue cover-art surface built from layered radial / linear gradients — no image assets required",
      "Spring-tap response on the primary action button (0.97 scale) via framer-motion",
      "Avatar and outbound link are keyboard-focusable with visible focus rings",
      "Outbound link uses rel=\"noreferrer noopener\" for safe new-tab behaviour",
      "Responsive: cover height, padding, avatar size, and type scale all collapse cleanly under 600px",
      "Decorative artwork and icons are aria-hidden; the section semantics are conveyed by the visible name and labels",
      "Respects prefers-reduced-motion: spring tap is skipped entirely on the action button"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "default": "'Suraj'",
        "description": "Display name shown in the detail panel header"
      },
      {
        "name": "username",
        "type": "string",
        "default": "'@surajmaurya_m'",
        "description": "Handle rendered as the small caption under the name"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Building EasyUI. Engineer.'",
        "description": "Biographical text shown under the name"
      },
      {
        "name": "followers",
        "type": "string",
        "default": "'200K'",
        "description": "Pre-formatted follower count"
      },
      {
        "name": "posts",
        "type": "string",
        "default": "'72'",
        "description": "Pre-formatted post count"
      },
      {
        "name": "website",
        "type": "string",
        "default": "'easyui.site'",
        "description": "Website domain — link href is auto-prefixed with https://"
      },
      {
        "name": "actionLabel",
        "type": "string",
        "default": "'Follow'",
        "description": "Label for the primary action button"
      },
      {
        "name": "onAction",
        "type": "() => void",
        "default": "undefined",
        "description": "Click handler for the primary action button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the card root"
      }
    ],
    "accessibility": [
      "Semantic <article> root with heading hierarchy (h2 for the name)",
      "Native <button> and <a> for the interactive controls — no <div onClick>",
      "All decorative artwork and icons are aria-hidden; the card content is conveyed by the visible labels",
      "Visible focus rings on the action button, secondary button, and outbound link (focus-visible)",
      "Outbound link announces \"(opens in a new tab)\" via aria-label",
      "prefers-reduced-motion fallback: spring tap on the action button is disabled"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { ProfileCard } from \"@/components/ui/profile-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <ProfileCard\n        name=\"Suraj\"\n        username=\"@surajmaurya_m\"\n        description=\"Building EasyUI. Engineer.\"\n        followers=\"200K\"\n        posts=\"72\"\n        website=\"easyui.site\"\n        onAction={() => console.log('Follow clicked')}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/ProfileCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/profile-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "prompt-input",
    "name": "Prompt Input",
    "tagline": "Chat composer with streaming stop, attachments, model picker, and prompt history",
    "description": "A production-ready AI chat composer with an auto-growing textarea, streaming stop control, attachment chips with drag-and-drop and paste, an accessible model picker, prompt history, and keyboard-first send behavior.",
    "category": "Forms",
    "badges": [
      "AI",
      "Composer",
      "Attachments",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/prompt-input",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Prompt Input component into my project.\n\nA production-ready AI chat composer with an auto-growing textarea, streaming stop control, attachment chips with drag-and-drop and paste, an accessible model picker, prompt history, and keyboard-first send behavior.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/prompt-input\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PromptInput, type PromptSubmit } from \"@/components/ui/prompt-input\";\n\nexport function Demo() {\n  const models = [\n    { id: \"fast\", name: \"Fast\", description: \"Quick answers\", badge: \"Fast\" },\n    { id: \"reasoning\", name: \"Reasoning\", description: \"Thinks longer\", badge: \"Deep\" },\n  ];\n\n  const handleSend = async ({ text, files, model }: PromptSubmit) => {\n    await fetch(\"/api/chat\", {\n      method: \"POST\",\n      body: JSON.stringify({ text, files: files.map((f) => f.name), model: model?.id }),\n    });\n  };\n\n  return (\n    <PromptInput\n      onSend={handleSend}\n      models={models}\n      streaming={false}\n      onStop={() => {}}\n      placeholder=\"Message the assistant…\"\n      safeArea\n    />\n  );\n}\n```\n\nDeclared props:\n- `onSend` ((payload: PromptSubmit) => void | Promise<void>); default: undefined — Called when the user sends. Throw or reject to put the message back in the box\n- `streaming` (boolean); default: false — While true the send button becomes a Stop button and Escape stops the reply\n- `onStop` (() => void); default: undefined — Callback fired when the user stops a streaming response\n- `models` (PromptModel[]); default: DEFAULT_MODELS — Models rendered in the accessible model picker listbox\n- `model` (string); default: undefined — Controlled model id\n- `defaultModel` (string); default: undefined — Initial model id when uncontrolled (defaults to the first model)\n- `onModelChange` ((id: string) => void); default: undefined — Callback fired when the selected model changes\n- `placeholder` (string); default: 'Message the assistant…' — Placeholder text for the textarea\n- `maxLength` (number); default: 8000 — Maximum character count before the message is flagged as over the limit\n- `maxHeight` (number); default: 224 — Tallest the textarea grows in pixels before it starts scrolling\n- `allowAttachments` (boolean); default: true — Enables the attach button, drag-and-drop, and paste file handling\n- `maxFiles` (number); default: 5 — Maximum number of attachments allowed at once\n- `maxFileSizeMB` (number); default: 10 — Maximum size per attachment in megabytes\n- `accept` (string); default: undefined — Accepted file types using the same format as an input accept attribute\n- `disabled` (boolean); default: false — Disables the composer and all of its controls\n- `autoFocus` (boolean); default: false — Focuses the textarea when the component mounts\n- `enterToSend` (boolean); default: desktop only — Enter sends and Shift+Enter adds a line. Defaults to true on fine pointers and false on touch devices. Cmd/Ctrl+Enter always sends\n- `actions` (ReactNode); default: undefined — Extra buttons rendered next to the model picker\n- `hint` (ReactNode | false); default: keyboard hint — Footer line under the box. Pass false to hide it\n- `safeArea` (boolean); default: false — Pads the bottom for the iPhone home indicator when pinned to the screen bottom\n- `className` (string); default: undefined — Custom Tailwind class names for the outer wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/prompt-input.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "10d98564e4378f4889915aef052c33d6f51afd745ea6ccd7b80f64aebcf5dc29",
    "features": [
      "Auto-growing textarea measured by a hidden mirror so it glides open and closed",
      "Send button morphs into a Stop button with an orbital progress ring while streaming",
      "Attachment button, drag-and-drop zone, and paste handling with chips, previews, and size/type limits",
      "Accessible model picker listbox with typeahead, keyboard navigation, and automatic drop-up/down placement",
      "Enter to send, Shift+Enter for a new line, Cmd/Ctrl+Enter always sends, and Escape stops a reply",
      "Arrow-up prompt history recall with draft restoration when moving back down",
      "IME-safe key handling, iOS zoom-safe 16px input text, safe-area padding, and light/dark styling",
      "Imperative handle for focus, clear, setValue, and attaching files from outside the composer"
    ],
    "props": [
      {
        "name": "onSend",
        "type": "(payload: PromptSubmit) => void | Promise<void>",
        "default": "undefined",
        "description": "Called when the user sends. Throw or reject to put the message back in the box"
      },
      {
        "name": "streaming",
        "type": "boolean",
        "default": "false",
        "description": "While true the send button becomes a Stop button and Escape stops the reply"
      },
      {
        "name": "onStop",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when the user stops a streaming response"
      },
      {
        "name": "models",
        "type": "PromptModel[]",
        "default": "DEFAULT_MODELS",
        "description": "Models rendered in the accessible model picker listbox"
      },
      {
        "name": "model",
        "type": "string",
        "default": "undefined",
        "description": "Controlled model id"
      },
      {
        "name": "defaultModel",
        "type": "string",
        "default": "undefined",
        "description": "Initial model id when uncontrolled (defaults to the first model)"
      },
      {
        "name": "onModelChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback fired when the selected model changes"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Message the assistant…'",
        "description": "Placeholder text for the textarea"
      },
      {
        "name": "maxLength",
        "type": "number",
        "default": "8000",
        "description": "Maximum character count before the message is flagged as over the limit"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "default": "224",
        "description": "Tallest the textarea grows in pixels before it starts scrolling"
      },
      {
        "name": "allowAttachments",
        "type": "boolean",
        "default": "true",
        "description": "Enables the attach button, drag-and-drop, and paste file handling"
      },
      {
        "name": "maxFiles",
        "type": "number",
        "default": "5",
        "description": "Maximum number of attachments allowed at once"
      },
      {
        "name": "maxFileSizeMB",
        "type": "number",
        "default": "10",
        "description": "Maximum size per attachment in megabytes"
      },
      {
        "name": "accept",
        "type": "string",
        "default": "undefined",
        "description": "Accepted file types using the same format as an input accept attribute"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the composer and all of its controls"
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "default": "false",
        "description": "Focuses the textarea when the component mounts"
      },
      {
        "name": "enterToSend",
        "type": "boolean",
        "default": "desktop only",
        "description": "Enter sends and Shift+Enter adds a line. Defaults to true on fine pointers and false on touch devices. Cmd/Ctrl+Enter always sends"
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Extra buttons rendered next to the model picker"
      },
      {
        "name": "hint",
        "type": "ReactNode | false",
        "default": "keyboard hint",
        "description": "Footer line under the box. Pass false to hide it"
      },
      {
        "name": "safeArea",
        "type": "boolean",
        "default": "false",
        "description": "Pads the bottom for the iPhone home indicator when pinned to the screen bottom"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom Tailwind class names for the outer wrapper"
      }
    ],
    "accessibility": [
      "The textarea exposes an aria-label plus an aria-describedby hint and reports errors through role=\"alert\" and aria-live",
      "The model picker is a focusable listbox with aria-activedescendant, Home/End, arrow, typeahead, and Escape handling",
      "Send and Stop share one labelled button and report the character count through aria-live near the limit",
      "Attachment removal buttons include the file name in their aria-label, and drag-and-drop has a visible drop overlay",
      "All motion respects prefers-reduced-motion, including the textarea growth, chips, and streaming glow"
    ],
    "createdAt": "2026-11-11",
    "usageCode": "import { PromptInput, type PromptSubmit } from \"@/components/ui/prompt-input\";\n\nexport function Demo() {\n  const models = [\n    { id: \"fast\", name: \"Fast\", description: \"Quick answers\", badge: \"Fast\" },\n    { id: \"reasoning\", name: \"Reasoning\", description: \"Thinks longer\", badge: \"Deep\" },\n  ];\n\n  const handleSend = async ({ text, files, model }: PromptSubmit) => {\n    await fetch(\"/api/chat\", {\n      method: \"POST\",\n      body: JSON.stringify({ text, files: files.map((f) => f.name), model: model?.id }),\n    });\n  };\n\n  return (\n    <PromptInput\n      onSend={handleSend}\n      models={models}\n      streaming={false}\n      onStop={() => {}}\n      placeholder=\"Message the assistant…\"\n      safeArea\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/PromptInput.tsx",
        "type": "registry:ui",
        "target": "components/ui/prompt-input.tsx"
      }
    ]
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Pull to Refresh component into my project.\n\nA physical pull-to-refresh component and container featuring realistic elastic resistance curves, smooth cubic bezier line chart visualization with interactive point scrubbing, high/low metrics, and seamless light & dark mode compatibility.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/pull-to-refresh\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { PullToRefresh, FinancialStatsCard } from \"@/components/ui/pull-to-refresh\";\n\nexport function Demo() {\n  return (\n    <PullToRefresh\n      onRefresh={async () => {\n        await new Promise((res) => setTimeout(res, 1200));\n      }}\n    >\n      <FinancialStatsCard showMetrics showActions />\n    </PullToRefresh>\n  );\n}\n```\n\nDeclared props:\n- `onRefresh` (() => Promise<void> | void); default: undefined — Async or sync callback executed when released beyond threshold\n- `threshold` (number); default: 68 — Downward travel distance in pixels required to trigger refresh\n- `maxPull` (number); default: 110 — Maximum drag distance limit\n- `resistance` (number); default: 0.45 — Elastic resistance multiplier\n- `refreshingHoldOffset` (number); default: 48 — Vertical offset to hold content at while refresh resolves\n- `disabled` (boolean); default: false — Disables gesture interaction\n- `showDefaultIndicator` (boolean); default: true — Show the built-in minimal circular progress indicator\n- `children` (React.ReactNode); default: <FinancialStatsCard /> — Custom child content to be pulled\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/pull-to-refresh.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "rainbow-button",
    "name": "Rainbow Button",
    "tagline": "Vibrant chromatic rainbow border button with animated glowing under-reflection",
    "description": "A vibrant button featuring an animated chromatic rainbow gradient border, dynamic 3D surface reflections, and an ambient blurred rainbow underglow.",
    "category": "Motion",
    "badges": [
      "Button",
      "Gradient",
      "Interactive",
      "New"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/rainbow-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Rainbow Button component into my project.\n\nA vibrant button featuring an animated chromatic rainbow gradient border, dynamic 3D surface reflections, and an ambient blurred rainbow underglow.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/rainbow-button\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { RainbowButton } from \"@/components/ui/rainbow-button\";\n\nexport function RainbowButtonDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-4 p-8\">\n      <RainbowButton>\n        Get Unlimited Access\n      </RainbowButton>\n\n      <RainbowButton variant=\"outline\" size=\"sm\">\n        Explore Features\n      </RainbowButton>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `variant` ('default' | 'outline'); default: 'default' — Visual presentation style of the button surface\n- `size` ('default' | 'sm' | 'lg' | 'icon'); default: 'default' — Button dimension scale and padding\n- `asChild` (boolean); default: false — Render as child component (e.g. Next.js Link or a tag) passing through props and styles\n- `glow` (boolean); default: true — Whether to show the ambient blurred rainbow glow drop-shadow beneath the button\n- `speed` (number); default: 3 — Rainbow animation cycle duration in seconds\n- `color1` (string); default: 'hsl(0 100% 63%)' — First chromatic gradient stop (red/pink)\n- `color2` (string); default: 'hsl(270 100% 63%)' — Second chromatic gradient stop (purple)\n- `color3` (string); default: 'hsl(210 100% 63%)' — Third chromatic gradient stop (blue)\n- `color4` (string); default: 'hsl(195 100% 63%)' — Fourth chromatic gradient stop (cyan)\n- `color5` (string); default: 'hsl(90 100% 63%)' — Fifth chromatic gradient stop (green)\n- `className` (string) — Additional CSS classes\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/rainbow-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "fb4be4d343532addaa5feb5124ef58cbcb8ea499ab9f13c3f6b35d7f67e72fa9",
    "features": [
      "Continuous seamless multi-stop chromatic rainbow border animation",
      "Ambient blurred rainbow underglow shadow reflecting beneath the button surface",
      "Customizable chromatic color variables (color1 through color5) with vivid defaults",
      "Zero external library requirements: native CSS animation and self-contained Slot component for asChild support",
      "Variants: default and outline, with sizes: default, sm, lg, and icon",
      "Fully accessible: keyboard focus ring, aria attributes pass-through, and prefers-reduced-motion support"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'outline'",
        "default": "'default'",
        "description": "Visual presentation style of the button surface"
      },
      {
        "name": "size",
        "type": "'default' | 'sm' | 'lg' | 'icon'",
        "default": "'default'",
        "description": "Button dimension scale and padding"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "default": "false",
        "description": "Render as child component (e.g. Next.js Link or a tag) passing through props and styles"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the ambient blurred rainbow glow drop-shadow beneath the button"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "3",
        "description": "Rainbow animation cycle duration in seconds"
      },
      {
        "name": "color1",
        "type": "string",
        "default": "'hsl(0 100% 63%)'",
        "description": "First chromatic gradient stop (red/pink)"
      },
      {
        "name": "color2",
        "type": "string",
        "default": "'hsl(270 100% 63%)'",
        "description": "Second chromatic gradient stop (purple)"
      },
      {
        "name": "color3",
        "type": "string",
        "default": "'hsl(210 100% 63%)'",
        "description": "Third chromatic gradient stop (blue)"
      },
      {
        "name": "color4",
        "type": "string",
        "default": "'hsl(195 100% 63%)'",
        "description": "Fourth chromatic gradient stop (cyan)"
      },
      {
        "name": "color5",
        "type": "string",
        "default": "'hsl(90 100% 63%)'",
        "description": "Fifth chromatic gradient stop (green)"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes"
      }
    ],
    "accessibility": [
      "Full keyboard focus state with visible focus-visible ring",
      "Supports standard button and anchor keyboard activation (Enter / Space)",
      "prefers-reduced-motion halts the infinite background animation automatically"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { RainbowButton } from \"@/components/ui/rainbow-button\";\n\nexport function RainbowButtonDemo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-4 p-8\">\n      <RainbowButton>\n        Get Unlimited Access\n      </RainbowButton>\n\n      <RainbowButton variant=\"outline\" size=\"sm\">\n        Explore Features\n      </RainbowButton>\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/RainbowButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/rainbow-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "recovery-ledger",
    "name": "Recovery Ledger",
    "tagline": "Version history timeline & state recovery ledger",
    "description": "An archival audit timeline and state recovery ledger with chronological snapshot markers, diff inspection, and one-click rollback triggers.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Timeline",
      "Audit Log",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/recovery-ledger",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Recovery Ledger component into my project.\n\nAn archival audit timeline and state recovery ledger with chronological snapshot markers, diff inspection, and one-click rollback triggers.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/recovery-ledger\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { RecoveryLedger } from \"@/components/ui/recovery-ledger\";\n\nexport function Demo() {\n  const [currentId, setCurrentId] = useState('v3');\n  const entries = [\n    { id: 'v3', timestamp: '2m ago', action: 'Schema Migration', description: 'Added tenant_id column to organization tables.', author: 'Alex W.', details: { diff: '+ ALTER TABLE org ADD COLUMN tenant_id UUID;' } },\n    { id: 'v2', timestamp: '1h ago', action: 'API Auth Refactor', description: 'Upgraded JWT verification to RS256 algorithm.', author: 'Sarah K.', details: { diff: '- alg: HS256\n+ alg: RS256' } },\n    { id: 'v1', timestamp: 'Yesterday', action: 'Initial Release', description: 'Base schema initialized in primary region.', author: 'Alex W.' },\n  ];\n\n  return (\n    <RecoveryLedger\n      entries={entries}\n      currentEntryId={currentId}\n      onRestore={async (id) => setCurrentId(id)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `entries` (LedgerEntry[]) — Array of version history records (id, timestamp, action, description, author, details, restorable)\n- `currentEntryId` (string); default: undefined — Active head snapshot identifier\n- `onRestore` ((id: string) => Promise<void> | void); default: undefined — Callback fired on version revert action\n- `onSelect` ((id: string) => void); default: undefined — Callback when an entry is clicked\n- `variant` ('timeline' | 'compact'); default: 'timeline' — Display format\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/recovery-ledger.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "af84e9bd3afd1f7a1515080aba77468a6a726ab1983fcd4a96773c95c5006f33",
    "features": [
      "Chronological version ledger with vertical timeline rail and active head marker",
      "One-click state rollback action with loading animation feedback",
      "Expandable code diff viewer and snapshot metadata inspection drawer",
      "Full keyboard tab access and screen reader timestamp announcements"
    ],
    "props": [
      {
        "name": "entries",
        "type": "LedgerEntry[]",
        "description": "Array of version history records (id, timestamp, action, description, author, details, restorable)"
      },
      {
        "name": "currentEntryId",
        "type": "string",
        "default": "undefined",
        "description": "Active head snapshot identifier"
      },
      {
        "name": "onRestore",
        "type": "(id: string) => Promise<void> | void",
        "default": "undefined",
        "description": "Callback fired on version revert action"
      },
      {
        "name": "onSelect",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback when an entry is clicked"
      },
      {
        "name": "variant",
        "type": "'timeline' | 'compact'",
        "default": "'timeline'",
        "description": "Display format"
      }
    ],
    "accessibility": [
      "Accessible timestamps formatted for clear assistive technology reading",
      "Proper <button> elements with clear action labels",
      "Contrast compliant with WCAG AA standards"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { RecoveryLedger } from \"@/components/ui/recovery-ledger\";\n\nexport function Demo() {\n  const [currentId, setCurrentId] = useState('v3');\n  const entries = [\n    { id: 'v3', timestamp: '2m ago', action: 'Schema Migration', description: 'Added tenant_id column to organization tables.', author: 'Alex W.', details: { diff: '+ ALTER TABLE org ADD COLUMN tenant_id UUID;' } },\n    { id: 'v2', timestamp: '1h ago', action: 'API Auth Refactor', description: 'Upgraded JWT verification to RS256 algorithm.', author: 'Sarah K.', details: { diff: '- alg: HS256\n+ alg: RS256' } },\n    { id: 'v1', timestamp: 'Yesterday', action: 'Initial Release', description: 'Base schema initialized in primary region.', author: 'Alex W.' },\n  ];\n\n  return (\n    <RecoveryLedger\n      entries={entries}\n      currentEntryId={currentId}\n      onRestore={async (id) => setCurrentId(id)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/RecoveryLedger.tsx",
        "type": "registry:ui",
        "target": "components/ui/recovery-ledger.tsx"
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
  },
  {
    "id": "reveal-card",
    "name": "Reveal Card",
    "tagline": "3D cursor physics tilt with interactive glare reveal",
    "description": "A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.",
    "category": "Motion",
    "badges": [
      "3D Tilt",
      "Dynamic Glare",
      "Micro-interaction"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/reveal-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Reveal Card component into my project.\n\nA high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/reveal-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}\n```\n\nDeclared props:\n- `maxTilt` (number); default: 12 — Max tilt angle in degrees\n- `revealContent` (ReactNode); default: undefined — Content shown on hover\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/reveal-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "6ca45bc27b7ac5be18eb1c47d1f59d53b4c74a85556cd483ddfaf0f201f7ce60",
    "features": [
      "Cursor-aware 3D perspective rotation springs",
      "Dynamic radial glare reflection overlay",
      "Hidden metadata section revealed on hover"
    ],
    "props": [
      {
        "name": "maxTilt",
        "type": "number",
        "default": "12",
        "description": "Max tilt angle in degrees"
      },
      {
        "name": "revealContent",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Content shown on hover"
      }
    ],
    "accessibility": [
      "Subtle tilt respects reduced-motion settings",
      "All content accessible via DOM"
    ],
    "createdAt": "2026-08-06",
    "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/RevealCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/reveal-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "rocket-party-popper",
    "name": "Rocket Party Popper",
    "tagline": "Lift-off milestone celebration with colorful confetti blast",
    "description": "An interactive black rocket launch that blasts into a colorful party popper confetti shower to reveal celebratory milestones.",
    "category": "Feedback",
    "badges": [
      "Party Popper",
      "Confetti Blast",
      "Interactive Motion",
      "Milestones"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/rocket-party-popper",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Rocket Party Popper component into my project.\n\nAn interactive black rocket launch that blasts into a colorful party popper confetti shower to reveal celebratory milestones.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/rocket-party-popper\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { RocketPartyPopper } from \"@/components/ui/rocket-party-popper\";\n\nexport function Demo() {\n  return (\n    <RocketPartyPopper\n      title=\"Release Shipped\"\n      description=\"All registry, lint, and SEO checks passed.\"\n      metric=\"v2.4.0 Live\"\n      onLaunch={() => console.log('Rocket Launched!')}\n    />\n  );\n}\n```\n\nDeclared props:\n- `title` (string); default: 'Mission Accomplished' — Primary celebration headline\n- `description` (string); default: 'All checks passed and your release is ready to deploy.' — Supporting celebration description\n- `metric` (string); default: '100% Production Ready' — Metadata badge shown on milestone card\n- `triggerLabel` (string); default: 'Launch celebration' — Label for the launch button\n- `confettiCount` (number); default: 50 — Total confetti particles spawned on blast\n- `defaultLaunched` (boolean); default: false — Initial launched/revealed state\n- `onLaunch` (() => void); default: undefined — Callback fired on launch trigger\n- `onReset` (() => void); default: undefined — Callback fired on reset\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/rocket-party-popper.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "63056f69d7fe9a051bc311cadf3fa9cedafa1ad609a744436ada3b632d4bf58f",
    "features": [
      "Sleek matte black rocket capsule with thruster ember anticipation",
      "Smooth lift-off acceleration trailing thruster flame and smoke",
      "360° Colorful party popper confetti explosion with physics gravity and flutter",
      "Apple-grade fluid spring reveal for celebratory milestone cards",
      "Built-in replay and reset support for repeatable celebratory interactions"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Mission Accomplished'",
        "description": "Primary celebration headline"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'All checks passed and your release is ready to deploy.'",
        "description": "Supporting celebration description"
      },
      {
        "name": "metric",
        "type": "string",
        "default": "'100% Production Ready'",
        "description": "Metadata badge shown on milestone card"
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "default": "'Launch celebration'",
        "description": "Label for the launch button"
      },
      {
        "name": "confettiCount",
        "type": "number",
        "default": "50",
        "description": "Total confetti particles spawned on blast"
      },
      {
        "name": "defaultLaunched",
        "type": "boolean",
        "default": "false",
        "description": "Initial launched/revealed state"
      },
      {
        "name": "onLaunch",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired on launch trigger"
      },
      {
        "name": "onReset",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired on reset"
      }
    ],
    "accessibility": [
      "Revealed milestone card uses role=\"status\" and aria-live=\"polite\"",
      "Supports prefers-reduced-motion with instant graceful celebration transition",
      "Full keyboard interaction via Enter and Spacebar"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { RocketPartyPopper } from \"@/components/ui/rocket-party-popper\";\n\nexport function Demo() {\n  return (\n    <RocketPartyPopper\n      title=\"Release Shipped\"\n      description=\"All registry, lint, and SEO checks passed.\"\n      metric=\"v2.4.0 Live\"\n      onLaunch={() => console.log('Rocket Launched!')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/RocketPartyPopper.tsx",
        "type": "registry:ui",
        "target": "components/ui/rocket-party-popper.tsx"
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
  },
  {
    "id": "scroll-progress-nav",
    "name": "Scroll Progress Navigation",
    "tagline": "Floating progress navigation pill tracking scroll depth and active document headings",
    "description": "A floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Scroll Physics",
      "Floating"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scroll-progress-nav",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Scroll Progress Navigation component into my project.\n\nA floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/scroll-progress-nav\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ScrollProgressNav } from \"@/components/ui/scroll-progress-nav\";\n\nexport function Demo() {\n  return (\n    <ScrollProgressNav\n      sections={[\n        { id: \"overview\", index: \"01\", label: \"Overview\" },\n        { id: \"features\", index: \"02\", label: \"Features\" },\n        { id: \"components\", index: \"03\", label: \"Components\" },\n        { id: \"docs\", index: \"04\", label: \"Documentation\" }\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `sections` (NavSectionItem[]); default: [...] — Navigation links with IDs, index numbers, and labels\n- `scrollThreshold` (number); default: 150 — Scroll distance in px before morphing into floating pill\n- `activeId` (string); default: undefined — Controlled active section ID override\n- `onSectionClick` ((id: string) => void); default: undefined — Callback fired when user selects a section\n- `position` ('top-center' | 'bottom-center' | 'top-right'); default: 'top-center' — Screen anchor position\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/scroll-progress-nav.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "a7183630c897aa953c44810070b3751fe08f058eb2f3a45fd26250fbe5a8b55c",
    "features": [
      "Real-time document scroll progress bar integrated along the pill boundary",
      "Shared layout pill indicator smoothly moving between active headings",
      "Seamless transition from static page banner to compact floating island",
      "Smooth scroll anchoring with customizable offset threshold",
      "Mobile-optimized responsive compact menu preventing content obstruction"
    ],
    "props": [
      {
        "name": "sections",
        "type": "NavSectionItem[]",
        "default": "[...]",
        "description": "Navigation links with IDs, index numbers, and labels"
      },
      {
        "name": "scrollThreshold",
        "type": "number",
        "default": "150",
        "description": "Scroll distance in px before morphing into floating pill"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Controlled active section ID override"
      },
      {
        "name": "onSectionClick",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback fired when user selects a section"
      },
      {
        "name": "position",
        "type": "'top-center' | 'bottom-center' | 'top-right'",
        "default": "'top-center'",
        "description": "Screen anchor position"
      }
    ],
    "accessibility": [
      "Semantic nav element with aria-label=\"Table of contents\"",
      "Keyboard navigable tab order and focus-visible outlines",
      "Smooth scroll honors prefers-reduced-motion settings"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ScrollProgressNav } from \"@/components/ui/scroll-progress-nav\";\n\nexport function Demo() {\n  return (\n    <ScrollProgressNav\n      sections={[\n        { id: \"overview\", index: \"01\", label: \"Overview\" },\n        { id: \"features\", index: \"02\", label: \"Features\" },\n        { id: \"components\", index: \"03\", label: \"Components\" },\n        { id: \"docs\", index: \"04\", label: \"Documentation\" }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ScrollProgressNav.tsx",
        "type": "registry:ui",
        "target": "components/ui/scroll-progress-nav.tsx"
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
  },
  {
    "id": "scrollvelocitytext",
    "name": "Scroll Velocity Text",
    "tagline": "Direction-aware kinetic text that expands and contracts with scroll",
    "description": "A direction-aware kinetic typography component that smoothly expands letter-spacing and scale on downward scroll, and winds back on upward scroll, with zero per-frame React re-renders.",
    "category": "Motion",
    "badges": [
      "Kinetic Typography",
      "Scroll Driven",
      "Accessibility",
      "Zero Overhead"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scrollvelocitytext",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Scroll Velocity Text component into my project.\n\nA direction-aware kinetic typography component that smoothly expands letter-spacing and scale on downward scroll, and winds back on upward scroll, with zero per-frame React re-renders.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/scrollvelocitytext\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ScrollVelocityText } from \"@/components/ui/scrollvelocitytext\";\n\nexport function Demo() {\n  return (\n    <div className=\"min-h-[140vh] flex flex-col items-center justify-center p-8\">\n      <p className=\"text-xs font-mono uppercase tracking-widest text-text-muted mb-4\">\n        Scroll down to expand · Scroll up to wind back\n      </p>\n      <ScrollVelocityText\n        as=\"h1\"\n        text=\"BUILD SOMETHING GREAT\"\n        intensity={1.2}\n        expandDistance={450}\n        minLetterSpacing={0.05}\n        maxLetterSpacing={0.8}\n        maxScale={1.5}\n        className=\"text-4xl sm:text-6xl font-black tracking-tight text-text-primary uppercase select-none text-center\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `text` (string) — The text string to render as a single accessible text node\n- `as` (keyof JSX.IntrinsicElements); default: 'span' — HTML tag to render as (e.g. \"h1\", \"h2\", \"span\", \"p\", \"div\")\n- `expandDistance` (number); default: 500 — Net scroll distance in pixels needed to progress from resting size to fully expanded and faded out\n- `intensity` (number); default: 1 — Multiplier on how much each scrolled pixel contributes to expansion progress\n- `minLetterSpacing` (number); default: 0 — Letter-spacing in em units at rest (zero scroll progress)\n- `maxLetterSpacing` (number); default: 1 — Letter-spacing in em units at full scroll expansion\n- `maxScale` (number); default: 1.6 — Scale multiplier at full scroll expansion (1 = no scale change)\n- `fadeStart` (number); default: 0.4 — Progress fraction (0–1) at which the text begins fading out (>= 1 disables fading)\n- `smoothingMs` (number); default: 400 — Duration in milliseconds of the CSS easing transition between scroll updates\n- `transformOrigin` (string); default: 'center center' — CSS transform origin for expansion and scaling (e.g. \"left center\" for left-aligned headlines)\n- `scrollContainerRef` (RefObject<HTMLElement | null>) — Optional ref to a custom scrollable container instead of the window viewport\n- `className` (string) — Additional CSS classes for font size, weight, color, and positioning\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/scrollvelocitytext.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8868c2fec0aeae6bca1796702ebb1cc2e0514c7f16162704a6538b9ee6b1f18e",
    "features": [
      "Direction-aware scroll physics: expands on downward scroll, winds back on upward scroll, and holds position on idle",
      "Zero per-frame React re-renders: progress is written directly to the DOM via requestAnimationFrame batching",
      "GPU-accelerated CSS transitions with cubic-bezier easing for buttery smooth kinetic tracking",
      "Screen-reader safe: rendered as an unbroken native text node rather than fragmented per-letter DOM spans",
      "Customizable expansion range, letter spacing bounds (em), scale multiplier, and fade threshold",
      "Flexible polymorphic tag rendering via the \"as\" prop (h1, h2, span, p, etc.) with custom transform-origin",
      "Supports both global window scroll and scoped scrollable container refs",
      "Built-in prefers-reduced-motion detection automatically locks text to resting state"
    ],
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "The text string to render as a single accessible text node"
      },
      {
        "name": "as",
        "type": "keyof JSX.IntrinsicElements",
        "default": "'span'",
        "description": "HTML tag to render as (e.g. \"h1\", \"h2\", \"span\", \"p\", \"div\")"
      },
      {
        "name": "expandDistance",
        "type": "number",
        "default": "500",
        "description": "Net scroll distance in pixels needed to progress from resting size to fully expanded and faded out"
      },
      {
        "name": "intensity",
        "type": "number",
        "default": "1",
        "description": "Multiplier on how much each scrolled pixel contributes to expansion progress"
      },
      {
        "name": "minLetterSpacing",
        "type": "number",
        "default": "0",
        "description": "Letter-spacing in em units at rest (zero scroll progress)"
      },
      {
        "name": "maxLetterSpacing",
        "type": "number",
        "default": "1",
        "description": "Letter-spacing in em units at full scroll expansion"
      },
      {
        "name": "maxScale",
        "type": "number",
        "default": "1.6",
        "description": "Scale multiplier at full scroll expansion (1 = no scale change)"
      },
      {
        "name": "fadeStart",
        "type": "number",
        "default": "0.4",
        "description": "Progress fraction (0–1) at which the text begins fading out (>= 1 disables fading)"
      },
      {
        "name": "smoothingMs",
        "type": "number",
        "default": "400",
        "description": "Duration in milliseconds of the CSS easing transition between scroll updates"
      },
      {
        "name": "transformOrigin",
        "type": "string",
        "default": "'center center'",
        "description": "CSS transform origin for expansion and scaling (e.g. \"left center\" for left-aligned headlines)"
      },
      {
        "name": "scrollContainerRef",
        "type": "RefObject<HTMLElement | null>",
        "description": "Optional ref to a custom scrollable container instead of the window viewport"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for font size, weight, color, and positioning"
      }
    ],
    "accessibility": [
      "Renders a single continuous text node rather than splitting words into individual <span> letters, ensuring screen readers announce the text smoothly and search engines index it properly",
      "Under prefers-reduced-motion: reduce, scroll tracking is disabled, letter-spacing and scale are pinned to resting state, and CSS transitions are neutralized"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { ScrollVelocityText } from \"@/components/ui/scrollvelocitytext\";\n\nexport function Demo() {\n  return (\n    <div className=\"min-h-[140vh] flex flex-col items-center justify-center p-8\">\n      <p className=\"text-xs font-mono uppercase tracking-widest text-text-muted mb-4\">\n        Scroll down to expand · Scroll up to wind back\n      </p>\n      <ScrollVelocityText\n        as=\"h1\"\n        text=\"BUILD SOMETHING GREAT\"\n        intensity={1.2}\n        expandDistance={450}\n        minLetterSpacing={0.05}\n        maxLetterSpacing={0.8}\n        maxScale={1.5}\n        className=\"text-4xl sm:text-6xl font-black tracking-tight text-text-primary uppercase select-none text-center\"\n      />\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/Scrollvelocitytext.tsx",
        "type": "registry:ui",
        "target": "components/ui/scrollvelocitytext.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "selection-basket",
    "name": "Selection Basket",
    "tagline": "Floating bulk-action toolbar for multi-item batch operations and export flows",
    "description": "A floating bulk-action toolbar that smoothly rises from the bottom of the screen when multiple dataset items are selected, supporting batch operations, horizontal scrolling, and clear triggers.",
    "category": "Overlays",
    "badges": [
      "Bulk Actions",
      "Toolbars",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/selection-basket",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Selection Basket component into my project.\n\nA floating bulk-action toolbar that smoothly rises from the bottom of the screen when multiple dataset items are selected, supporting batch operations, horizontal scrolling, and clear triggers.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/selection-basket\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SelectionBasket } from \"@/components/ui/selection-basket\";\n\nexport function Demo() {\n  const [selected, setSelected] = useState<string[]>(['item-1', 'item-2']);\n\n  return (\n    <SelectionBasket\n      selectedCount={selected.length}\n      totalCount={10}\n      onClearSelection={() => setSelected([])}\n      actions={[\n        { id: 'export', label: 'Export', onClick: () => console.log('Exporting') },\n        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => console.log('Deleting') }\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `selectedCount` (number); default: 0 — Current number of selected items\n- `totalCount` (number); default: undefined — Total item universe count\n- `actions` (SelectionActionItem[]); default: [...] — List of bulk action definitions\n- `onClearSelection` (() => void); default: undefined — Callback fired when user clears selection\n- `onSelectAll` (() => void); default: undefined — Callback fired when user selects all\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/selection-basket.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "80ed9e0261c275bc0acbef442da1d87175c8fe350edb0f96c421592fee018918",
    "features": [
      "Appears naturally with spring rise physics as soon as selected count > 0",
      "Responsive horizontal scrolling action container preventing mobile cutoff",
      "Integrated batch action buttons (Delete, Move, Export, Share)",
      "Dynamic select all / clear all selection toggle synchronization",
      "Accessible role=\"toolbar\" keyboard navigation and focus rings"
    ],
    "props": [
      {
        "name": "selectedCount",
        "type": "number",
        "default": "0",
        "description": "Current number of selected items"
      },
      {
        "name": "totalCount",
        "type": "number",
        "default": "undefined",
        "description": "Total item universe count"
      },
      {
        "name": "actions",
        "type": "SelectionActionItem[]",
        "default": "[...]",
        "description": "List of bulk action definitions"
      },
      {
        "name": "onClearSelection",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clears selection"
      },
      {
        "name": "onSelectAll",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user selects all"
      }
    ],
    "accessibility": [
      "ARIA role=\"toolbar\" and aria-label=\"Bulk actions toolbar\"",
      "Keyboard navigable action items with tab and arrow keys"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SelectionBasket } from \"@/components/ui/selection-basket\";\n\nexport function Demo() {\n  const [selected, setSelected] = useState<string[]>(['item-1', 'item-2']);\n\n  return (\n    <SelectionBasket\n      selectedCount={selected.length}\n      totalCount={10}\n      onClearSelection={() => setSelected([])}\n      actions={[\n        { id: 'export', label: 'Export', onClick: () => console.log('Exporting') },\n        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => console.log('Deleting') }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SelectionBasket.tsx",
        "type": "registry:ui",
        "target": "components/ui/selection-basket.tsx"
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
  },
  {
    "id": "settle-modal",
    "name": "SettleModal",
    "tagline": "Content scales and settles, never fades",
    "description": "A modal whose content has a tiny scale/settle instead of a generic fade. The panel scales 0.94 -> 1.02 -> 1.0 with a small y travel, then the inner content layers its own gentle settle on top.",
    "category": "Overlays",
    "badges": [
      "Scale Settle",
      "Layered Motion",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/settle-modal",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI SettleModal component into my project.\n\nA modal whose content has a tiny scale/settle instead of a generic fade. The panel scales 0.94 -> 1.02 -> 1.0 with a small y travel, then the inner content layers its own gentle settle on top.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/settle-modal\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { SettleModal } from \"@/components/ui/settle-modal\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Open modal</PressButton>\n      <SettleModal\n        open={open}\n        onClose={() => setOpen(false)}\n        title=\"Confirm archive\"\n        description=\"Archived projects can be restored within 30 days.\"\n        footer={\n          <>\n            <PressButton variant=\"ghost\" onClick={() => setOpen(false)}>Cancel</PressButton>\n            <PressButton variant=\"primary\" onClick={() => setOpen(false)}>Archive</PressButton>\n          </>\n        }\n      >\n        <p className=\"text-sm text-[#A1A1A1] leading-relaxed\">\n          This project and its 14 components will be moved to the archive.\n        </p>\n      </SettleModal>\n    </>\n  );\n}\n```\n\nDeclared props:\n- `open` (boolean); default: undefined — Whether the modal is open\n- `onClose` (() => void); default: undefined — Called when the modal should close\n- `title` (React.ReactNode); default: undefined — Optional title rendered at the top\n- `description` (React.ReactNode); default: undefined — Optional secondary description below the title\n- `children` (React.ReactNode); default: undefined — Main content area\n- `footer` (React.ReactNode); default: undefined — Footer area, typically action buttons\n- `hideCloseButton` (boolean); default: false — Hide the close (X) button\n- `closeOnBackdrop` (boolean); default: true — Click on backdrop closes the modal\n- `size` ('sm' | 'md' | 'lg'); default: 'md' — Maximum width preset\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/settle-modal.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "09402b4ce8095167f90061f1d67bbccb2354b25b169b6fc357d7a15bbed3be2b",
    "features": [
      "Panel animates scale 0.94 -> 1.02 -> 1.0 with ease-soft curve for a tactile \"settle\"",
      "Inner content has its own layered scale-up (0.98 -> 1.0) for a nested feel",
      "Escape key dismisses; backdrop click closes by default (toggle via closeOnBackdrop)",
      "Scroll lock while open; restores previous overflow on close",
      "Three size presets (sm / md / lg) with optional title, description, and footer slots"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Whether the modal is open"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "undefined",
        "description": "Called when the modal should close"
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Optional title rendered at the top"
      },
      {
        "name": "description",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Optional secondary description below the title"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Main content area"
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Footer area, typically action buttons"
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "default": "false",
        "description": "Hide the close (X) button"
      },
      {
        "name": "closeOnBackdrop",
        "type": "boolean",
        "default": "true",
        "description": "Click on backdrop closes the modal"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Maximum width preset"
      }
    ],
    "accessibility": [
      "role=\"dialog\" with aria-modal=\"true\" and aria-labelledby wired to the title",
      "Body scroll lock while open; restored on close",
      "Escape key dismisses; focus-ring on the close button",
      "Reduced-motion users get the same content but the entry curve is shorter"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { useState } from \"react\";\nimport { SettleModal } from \"@/components/ui/settle-modal\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Open modal</PressButton>\n      <SettleModal\n        open={open}\n        onClose={() => setOpen(false)}\n        title=\"Confirm archive\"\n        description=\"Archived projects can be restored within 30 days.\"\n        footer={\n          <>\n            <PressButton variant=\"ghost\" onClick={() => setOpen(false)}>Cancel</PressButton>\n            <PressButton variant=\"primary\" onClick={() => setOpen(false)}>Archive</PressButton>\n          </>\n        }\n      >\n        <p className=\"text-sm text-[#A1A1A1] leading-relaxed\">\n          This project and its 14 components will be moved to the archive.\n        </p>\n      </SettleModal>\n    </>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SettleModal.tsx",
        "type": "registry:ui",
        "target": "components/ui/settle-modal.tsx"
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
  },
  {
    "id": "sheet",
    "name": "Sheet",
    "tagline": "Drag-to-dismiss sheet with spring physics",
    "description": "A draggable sheet / drawer that slides in from any side and can be dragged away to dismiss — swipe left/right sheets anywhere on touch, top/bottom sheets via the grab handle. Springs back if you let go early.",
    "category": "Overlays",
    "badges": [
      "Drag to Dismiss",
      "Spring Physics",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sheet",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Sheet component into my project.\n\nA draggable sheet / drawer that slides in from any side and can be dragged away to dismiss — swipe left/right sheets anywhere on touch, top/bottom sheets via the grab handle. Springs back if you let go early.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/sheet\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport {\n  Sheet, SheetBody, SheetClose, SheetContent, SheetDescription,\n  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,\n} from \"@/components/ui/sheet\";\n\n<Sheet>\n  <SheetTrigger className=\"h-9 rounded-lg bg-neutral-900 px-4 text-sm text-white dark:bg-white dark:text-neutral-900\">\n    Open\n  </SheetTrigger>\n\n  <SheetContent side=\"right\">\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>Make changes, then save.</SheetDescription>\n    </SheetHeader>\n    <SheetBody>{/* scrolls on its own */}</SheetBody>\n    <SheetFooter>\n      <SheetClose>Cancel</SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>\n```\n\nDeclared props:\n- `open` (boolean); default: undefined — Controlled open state (on Sheet)\n- `defaultOpen` (boolean); default: false — Initial open state (uncontrolled)\n- `onOpenChange` ((open: boolean) => void); default: undefined — Open state change callback\n- `side` ('right' | 'left' | 'top' | 'bottom'); default: 'right' — Side the sheet slides in from (on SheetContent)\n- `showClose` (boolean); default: true — Show the built-in close button\n- `className` (string); default: undefined — Additional class for the panel\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/sheet.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "7b11545bf88c0d1066c25401b251b335b54999a8086bda924561c14589bceedb",
    "features": [
      "Four sides: right, left, top, bottom with directional drag-to-dismiss",
      "Touch: swipe left/right sheets anywhere; top/bottom sheets use the grab handle",
      "Springs back when released early; rubber-band elastic resistance",
      "Portal rendering, focus trap + focus return, Esc, scroll lock without layout shift",
      "ARIA dialog wired to SheetTitle/SheetDescription; backdrop click closes"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state (on Sheet)"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open state (uncontrolled)"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Open state change callback"
      },
      {
        "name": "side",
        "type": "'right' | 'left' | 'top' | 'bottom'",
        "default": "'right'",
        "description": "Side the sheet slides in from (on SheetContent)"
      },
      {
        "name": "showClose",
        "type": "boolean",
        "default": "true",
        "description": "Show the built-in close button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional class for the panel"
      }
    ],
    "accessibility": [
      "role=\"dialog\" with aria-modal, labelled by SheetTitle, described by SheetDescription",
      "Focus is trapped inside and returned to the trigger on close; Escape dismisses",
      "Body scroll locks while open with scrollbar-width compensation (no layout shift)"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import {\n  Sheet, SheetBody, SheetClose, SheetContent, SheetDescription,\n  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,\n} from \"@/components/ui/sheet\";\n\n<Sheet>\n  <SheetTrigger className=\"h-9 rounded-lg bg-neutral-900 px-4 text-sm text-white dark:bg-white dark:text-neutral-900\">\n    Open\n  </SheetTrigger>\n\n  <SheetContent side=\"right\">\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>Make changes, then save.</SheetDescription>\n    </SheetHeader>\n    <SheetBody>{/* scrolls on its own */}</SheetBody>\n    <SheetFooter>\n      <SheetClose>Cancel</SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/sheet.tsx",
        "type": "registry:ui",
        "target": "components/ui/sheet.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "shooting-stars",
    "name": "Shooting Stars",
    "tagline": "Deep space canvas cosmos with glowing shooting stars, radiant twinkling starfield, and interactive stardust",
    "description": "A high-performance deep-space cosmos background featuring multi-depth twinkling celestial stars, glowing atmospheric nebula clouds, and cinematic shooting stars with luminous head flares, tapered fading trails, ember stardust, and click-to-summon interactivity.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Space",
      "Stars",
      "Interactive",
      "Background"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/shooting-stars",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Shooting Stars component into my project.\n\nA high-performance deep-space cosmos background featuring multi-depth twinkling celestial stars, glowing atmospheric nebula clouds, and cinematic shooting stars with luminous head flares, tapered fading trails, ember stardust, and click-to-summon interactivity.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/shooting-stars\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ShootingStars } from \"@/components/ui/shooting-stars\";\n\nexport function SpaceHeroDemo() {\n  return (\n    <div className=\"relative w-full h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center\">\n      <ShootingStars\n        starCount={140}\n        interval={1800}\n        trailColor=\"#38BDF8\"\n        headColor=\"#FFFFFF\"\n        angle={45}\n        nebula={true}\n        parallax={true}\n        clickToSpawn={true}\n        className=\"w-full h-full\"\n      >\n        <div className=\"flex flex-col items-center justify-center h-full text-center px-6\">\n          <span className=\"inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-full mb-4\">\n            ✦ Celestial Cosmos\n          </span>\n          <h1 className=\"text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight\">\n            Journey Into The Stars\n          </h1>\n          <p className=\"mt-4 text-sm sm:text-base text-slate-400 max-w-lg\">\n            High-performance cosmic background with realistic meteors, radiant starfields, and atmospheric nebula glow.\n          </p>\n        </div>\n      </ShootingStars>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `children` (ReactNode) — Optional content rendered above the starry sky with full interactivity and clickability\n- `background` (string); default: '#020617' — Deep space background color (CSS color, hex, rgba, or gradient)\n- `starCount` (number); default: 120 — Total number of ambient background stars distributed across the sky\n- `starColors` (string[]); default: ['#FFFFFF', '#E0F2FE', '#C7D2FE', '#FEF08A'] — Palette of celestial tints applied to ambient background stars\n- `minStarSize` (number); default: 0.6 — Minimum radius in pixels of ambient stars\n- `maxStarSize` (number); default: 2.2 — Maximum radius in pixels of ambient stars\n- `twinkleSpeed` (number); default: 1 — Frequency speed multiplier for ambient star twinkle pulsation\n- `trailColor` (string); default: '#38BDF8' — Primary neon/atmospheric color of the shooting star trail\n- `headColor` (string); default: '#FFFFFF' — Luminous core burst color of the shooting star meteor head\n- `interval` (number); default: 2200 — Average delay in milliseconds between automatic shooting star spawns\n- `speed` ([number, number] | number); default: [12, 22] — Speed range [min, max] or uniform velocity in pixels per frame\n- `trailLength` ([number, number] | number); default: [90, 180] — Trail length range [min, max] or uniform length in pixels\n- `angle` (number); default: 42 — Trajectory flight angle in degrees clockwise from horizontal (45° is down-right)\n- `maxActiveShootingStars` (number); default: 2 — Maximum concurrent active meteors streaking across the sky at once\n- `showEmbers` (boolean); default: true — Whether shooting stars shed glowing stardust ember particles in their wake\n- `nebula` (boolean); default: true — Enables layered atmospheric cosmic nebula clouds in the deep background\n- `clickToSpawn` (boolean); default: true — Enables clicking or tapping to summon a shooting star sweeping past the cursor\n- `parallax` (boolean); default: true — Enables subtle mouse parallax perspective shifting background stars by depth\n- `className` (string) — Additional CSS classes for container sizing, layout, and styling\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/shooting-stars.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "2e11602da90b2afda439271f3d1f69288da9a21595f1233ca77dfc4623c290a6",
    "features": [
      "Zero external runtime dependencies: 100% native HTML5 Canvas 2D with sub-pixel DPR scaling",
      "Multi-depth twinkling starfield with radiant 4-point celestial cross-sparkles and soft halo blooms",
      "Cinematic meteors with radiant head bursts, tapered linear-gradient fading trails, and custom trajectory angles",
      "Stardust ember particles dynamically shed from traveling meteor tails for realistic atmospheric burns",
      "Subtle ambient cosmic nebula haze clouds rendering layered indigo, violet, and cyan deep-space depth",
      "Interactive mouse parallax tilt creating multi-plane 3D astronomical perspective",
      "Interactive click & tap summons custom meteors sweeping directly across the interaction point",
      "Full prefers-reduced-motion compliance freezing meteors and twinkle to a serene static night sky",
      "Stratified children wrapper supporting titles, hero copy, and buttons with intact pointer events"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Optional content rendered above the starry sky with full interactivity and clickability"
      },
      {
        "name": "background",
        "type": "string",
        "default": "'#020617'",
        "description": "Deep space background color (CSS color, hex, rgba, or gradient)"
      },
      {
        "name": "starCount",
        "type": "number",
        "default": "120",
        "description": "Total number of ambient background stars distributed across the sky"
      },
      {
        "name": "starColors",
        "type": "string[]",
        "default": "['#FFFFFF', '#E0F2FE', '#C7D2FE', '#FEF08A']",
        "description": "Palette of celestial tints applied to ambient background stars"
      },
      {
        "name": "minStarSize",
        "type": "number",
        "default": "0.6",
        "description": "Minimum radius in pixels of ambient stars"
      },
      {
        "name": "maxStarSize",
        "type": "number",
        "default": "2.2",
        "description": "Maximum radius in pixels of ambient stars"
      },
      {
        "name": "twinkleSpeed",
        "type": "number",
        "default": "1",
        "description": "Frequency speed multiplier for ambient star twinkle pulsation"
      },
      {
        "name": "trailColor",
        "type": "string",
        "default": "'#38BDF8'",
        "description": "Primary neon/atmospheric color of the shooting star trail"
      },
      {
        "name": "headColor",
        "type": "string",
        "default": "'#FFFFFF'",
        "description": "Luminous core burst color of the shooting star meteor head"
      },
      {
        "name": "interval",
        "type": "number",
        "default": "2200",
        "description": "Average delay in milliseconds between automatic shooting star spawns"
      },
      {
        "name": "speed",
        "type": "[number, number] | number",
        "default": "[12, 22]",
        "description": "Speed range [min, max] or uniform velocity in pixels per frame"
      },
      {
        "name": "trailLength",
        "type": "[number, number] | number",
        "default": "[90, 180]",
        "description": "Trail length range [min, max] or uniform length in pixels"
      },
      {
        "name": "angle",
        "type": "number",
        "default": "42",
        "description": "Trajectory flight angle in degrees clockwise from horizontal (45° is down-right)"
      },
      {
        "name": "maxActiveShootingStars",
        "type": "number",
        "default": "2",
        "description": "Maximum concurrent active meteors streaking across the sky at once"
      },
      {
        "name": "showEmbers",
        "type": "boolean",
        "default": "true",
        "description": "Whether shooting stars shed glowing stardust ember particles in their wake"
      },
      {
        "name": "nebula",
        "type": "boolean",
        "default": "true",
        "description": "Enables layered atmospheric cosmic nebula clouds in the deep background"
      },
      {
        "name": "clickToSpawn",
        "type": "boolean",
        "default": "true",
        "description": "Enables clicking or tapping to summon a shooting star sweeping past the cursor"
      },
      {
        "name": "parallax",
        "type": "boolean",
        "default": "true",
        "description": "Enables subtle mouse parallax perspective shifting background stars by depth"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for container sizing, layout, and styling"
      }
    ],
    "accessibility": [
      "Cosmic canvas is marked with aria-hidden=\"true\" and pointer-events-none",
      "Child elements retain standard focus order, screen reader accessibility, and pointer handling",
      "Supports prefers-reduced-motion media query: disables meteor spawning, particle embers, and twinkle oscillations"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { ShootingStars } from \"@/components/ui/shooting-stars\";\n\nexport function SpaceHeroDemo() {\n  return (\n    <div className=\"relative w-full h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center\">\n      <ShootingStars\n        starCount={140}\n        interval={1800}\n        trailColor=\"#38BDF8\"\n        headColor=\"#FFFFFF\"\n        angle={45}\n        nebula={true}\n        parallax={true}\n        clickToSpawn={true}\n        className=\"w-full h-full\"\n      >\n        <div className=\"flex flex-col items-center justify-center h-full text-center px-6\">\n          <span className=\"inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-full mb-4\">\n            ✦ Celestial Cosmos\n          </span>\n          <h1 className=\"text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight\">\n            Journey Into The Stars\n          </h1>\n          <p className=\"mt-4 text-sm sm:text-base text-slate-400 max-w-lg\">\n            High-performance cosmic background with realistic meteors, radiant starfields, and atmospheric nebula glow.\n          </p>\n        </div>\n      </ShootingStars>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/ShootingStars.tsx",
        "type": "registry:ui",
        "target": "components/ui/shooting-stars.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "sidebar",
    "name": "Sidebar",
    "tagline": "Cursor-following hover pill & gliding active indicator",
    "description": "A collapsible application sidebar with a hover pill that follows the cursor and a shared-layout active pill that glides between items. Includes nested sections, icon-only mode with tooltips, ⌘B toggle, and a draggable mobile drawer.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Keyboard Friendly",
      "Light & Dark",
      "Mobile Drawer"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sidebar",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Sidebar component into my project.\n\nA collapsible application sidebar with a hover pill that follows the cursor and a shared-layout active pill that glides between items. Includes nested sections, icon-only mode with tooltips, ⌘B toggle, and a draggable mobile drawer.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/sidebar\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport * as React from \"react\";\nimport { Bell, Folder, Home, Inbox, Settings, Users } from \"lucide-react\";\nimport { Sidebar, SidebarTrigger, useSidebar, type SidebarSection } from \"@/components/ui/sidebar\";\n\nconst sections: SidebarSection[] = [\n  {\n    items: [\n      { id: \"home\", label: \"Home\", icon: <Home /> },\n      { id: \"inbox\", label: \"Inbox\", icon: <Inbox />, badge: 4 },\n    ],\n  },\n  {\n    title: \"Workspace\",\n    items: [\n      {\n        id: \"projects\",\n        label: \"Projects\",\n        icon: <Folder />,\n        children: [\n          { id: \"active\", label: \"Active\", badge: 12 },\n          { id: \"archived\", label: \"Archived\" },\n        ],\n      },\n      { id: \"team\", label: \"Team\", icon: <Users /> },\n      { id: \"alerts\", label: \"Alerts\", icon: <Bell /> },\n      { id: \"settings\", label: \"Settings\", icon: <Settings /> },\n    ],\n  },\n];\n\nexport default function Page() {\n  const [active, setActive] = React.useState(\"home\");\n\n  return (\n    <div className=\"flex h-screen\">\n      <Sidebar sections={sections} activeId={active} onActiveChange={setActive} />\n      <main className=\"flex-1 p-4\">\n        <SidebarTrigger />\n      </main>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `sections` (SidebarSection[]); default: undefined — Navigation sections with items, optional titles, badges, and nested children\n- `activeId` (string); default: undefined — ID of the active item\n- `onActiveChange` ((id: string) => void); default: undefined — Called when an item or child is selected\n- `header` (React.ReactNode); default: undefined — Brand/header slot (use useSidebar() to adapt when collapsed)\n- `footer` (React.ReactNode); default: undefined — Footer slot above the collapse toggle\n- `collapsed` (boolean); default: undefined — Controlled collapsed (icon-only) state\n- `defaultCollapsed` (boolean); default: false — Initial collapsed state (uncontrolled)\n- `onCollapsedChange` ((collapsed: boolean) => void); default: undefined — Collapse state change callback\n- `mobileOpen` (boolean); default: undefined — Controlled mobile drawer open state\n- `onMobileOpenChange` ((open: boolean) => void); default: undefined — Mobile drawer open state callback\n- `className` (string); default: undefined — Additional class for the aside\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/sidebar.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c56f1c838e1ba3c9ad3c3b680f40566c05e5c208167bf9cb562c4bea9645ac79",
    "features": [
      "Hover pill tracks the cursor; active pill glides between items with a shared layout spring",
      "Nested items with animated expand/collapse and active dot indicator",
      "Icon-only collapse mode with floating tooltips, toggled via ⌘B / Ctrl+B",
      "Mobile drawer under md with drag-to-dismiss and backdrop blur",
      "Header and footer slots adapt to the collapsed state via useSidebar()"
    ],
    "props": [
      {
        "name": "sections",
        "type": "SidebarSection[]",
        "default": "undefined",
        "description": "Navigation sections with items, optional titles, badges, and nested children"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "ID of the active item"
      },
      {
        "name": "onActiveChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Called when an item or child is selected"
      },
      {
        "name": "header",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Brand/header slot (use useSidebar() to adapt when collapsed)"
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Footer slot above the collapse toggle"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled collapsed (icon-only) state"
      },
      {
        "name": "defaultCollapsed",
        "type": "boolean",
        "default": "false",
        "description": "Initial collapsed state (uncontrolled)"
      },
      {
        "name": "onCollapsedChange",
        "type": "(collapsed: boolean) => void",
        "default": "undefined",
        "description": "Collapse state change callback"
      },
      {
        "name": "mobileOpen",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled mobile drawer open state"
      },
      {
        "name": "onMobileOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Mobile drawer open state callback"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional class for the aside"
      }
    ],
    "accessibility": [
      "aria-current=\"page\" on active items, aria-expanded on parents, aria-label in icon-only mode",
      "Full keyboard support: Tab focusable items, ⌘B / Ctrl+B toggle, Esc closes the mobile drawer",
      "Mobile drawer uses role=\"dialog\" with aria-modal and backdrop click to close"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import * as React from \"react\";\nimport { Bell, Folder, Home, Inbox, Settings, Users } from \"lucide-react\";\nimport { Sidebar, SidebarTrigger, useSidebar, type SidebarSection } from \"@/components/ui/sidebar\";\n\nconst sections: SidebarSection[] = [\n  {\n    items: [\n      { id: \"home\", label: \"Home\", icon: <Home /> },\n      { id: \"inbox\", label: \"Inbox\", icon: <Inbox />, badge: 4 },\n    ],\n  },\n  {\n    title: \"Workspace\",\n    items: [\n      {\n        id: \"projects\",\n        label: \"Projects\",\n        icon: <Folder />,\n        children: [\n          { id: \"active\", label: \"Active\", badge: 12 },\n          { id: \"archived\", label: \"Archived\" },\n        ],\n      },\n      { id: \"team\", label: \"Team\", icon: <Users /> },\n      { id: \"alerts\", label: \"Alerts\", icon: <Bell /> },\n      { id: \"settings\", label: \"Settings\", icon: <Settings /> },\n    ],\n  },\n];\n\nexport default function Page() {\n  const [active, setActive] = React.useState(\"home\");\n\n  return (\n    <div className=\"flex h-screen\">\n      <Sidebar sections={sections} activeId={active} onActiveChange={setActive} />\n      <main className=\"flex-1 p-4\">\n        <SidebarTrigger />\n      </main>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/sidebar.tsx",
        "type": "registry:ui",
        "target": "components/ui/sidebar.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "sign-up",
    "name": "Sign Up",
    "tagline": "Multi-step capable user registration with strength telemetry",
    "description": "A comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.",
    "category": "Auth",
    "badges": [
      "Registration",
      "Forms",
      "Password Strength",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sign-up",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Sign Up component into my project.\n\nA comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.\n\nCategory: Auth.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/sign-up\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SignUp } from \"@/components/ui/sign-up\";\n\nexport function Demo() {\n  const handleSignUp = async (data: any) => {\n    console.log(\"Registering account:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <SignUp\n        onSubmit={handleSignUp}\n        onSignInClick={() => alert(\"Redirect to sign in\")}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `title` (string); default: 'Create an account' — Primary card title text\n- `description` (string); default: 'Join EasyUI to access components and templates' — Subtitle description below the title\n- `logo` (React.ReactNode); default: <SparklesIcon /> — Brand badge or logo displayed at the top\n- `error` (string | null); default: null — Server-side registration error banner message\n- `isLoading` (boolean); default: false — Submitting state displaying loader on submit button\n- `onSubmit` ((data: SignUpFormData) => void); default: undefined — Form submission callback with name, email, password, confirmPassword, agreeToTerms\n- `onSignInClick` (() => void); default: undefined — Callback for switching to login view\n- `showSocialSignUp` (boolean); default: true — Toggles GitHub and Google SSO buttons\n- `requireConfirmPassword` (boolean); default: true — Includes confirmation password field and checks match\n- `termsText` (React.ReactNode); default: Default Terms & Privacy links — Custom agreement label text or JSX\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/sign-up.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "1da945d1c5c521d5640501b56146b5b3045167154b4303348218578619125e38",
    "features": [
      "Integrated live 4-tier password strength indicator bar",
      "Password confirmation matching validation",
      "Interactive eye icons for show/hide password visibility",
      "Terms of service and privacy agreement checkbox validation",
      "Customizable social onboarding SSO buttons (GitHub & Google)",
      "Submitting state with monochrome button spinner",
      "Responsive layout with atmospheric glow and dark slate tokens"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Create an account'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Join EasyUI to access components and templates'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side registration error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: SignUpFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with name, email, password, confirmPassword, agreeToTerms"
      },
      {
        "name": "onSignInClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for switching to login view"
      },
      {
        "name": "showSocialSignUp",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "requireConfirmPassword",
        "type": "boolean",
        "default": "true",
        "description": "Includes confirmation password field and checks match"
      },
      {
        "name": "termsText",
        "type": "React.ReactNode",
        "default": "Default Terms & Privacy links",
        "description": "Custom agreement label text or JSX"
      }
    ],
    "accessibility": [
      "Accessible input labels with required indicators and autocomplete values (name, email, new-password)",
      "Role=\"alert\" for validation errors with smooth Framer Motion spring entrances",
      "Keyboard navigable form submission and checkbox selection",
      "Sky-400 focus ring on all focusable controls"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SignUp } from \"@/components/ui/sign-up\";\n\nexport function Demo() {\n  const handleSignUp = async (data: any) => {\n    console.log(\"Registering account:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <SignUp\n        onSubmit={handleSignUp}\n        onSignInClick={() => alert(\"Redirect to sign in\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SignUp.tsx",
        "type": "registry:ui",
        "target": "components/ui/sign-up.tsx"
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
      },
      {
        "path": "src/components/ui/Button.tsx",
        "type": "registry:ui",
        "target": "components/ui/button.tsx"
      },
      {
        "path": "src/components/ui/Form.tsx",
        "type": "registry:ui",
        "target": "components/ui/form.tsx"
      }
    ],
    "featured": true
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "tagline": "Subtle shimmer sweep and smooth content reveal",
    "description": "Placeholder blocks with a subtle light sweep, text/avatar presets, and a SkeletonReveal container that eases real content in with a gentle rise and un-blur.",
    "category": "Feedback",
    "badges": [
      "Light Sweep",
      "Content Reveal",
      "Avatar & Text",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/skeleton",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Skeleton component into my project.\n\nPlaceholder blocks with a subtle light sweep, text/avatar presets, and a SkeletonReveal container that eases real content in with a gentle rise and un-blur.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/skeleton\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Skeleton, SkeletonAvatar, SkeletonText, SkeletonReveal } from \"@/components/ui/skeleton\";\n\n<SkeletonReveal\n  loading={isLoading}\n  skeleton={\n    <div className=\"flex gap-3\">\n      <SkeletonAvatar size={40} />\n      <div className=\"flex-1 space-y-2\">\n        <Skeleton className=\"h-4 w-1/3\" />\n        <SkeletonText lines={2} />\n      </div>\n    </div>\n  }\n>\n  <UserCard user={user} />\n</SkeletonReveal>\n```\n\nDeclared props:\n- `className` (string); default: undefined — CSS classes to size and position the skeleton block\n- `lines` (number); default: 3 — Number of lines for the SkeletonText component\n- `size` (number); default: 40 — Pixel size for the circular SkeletonAvatar component\n- `loading` (boolean); default: undefined — Active loading state for the SkeletonReveal wrapper\n- `skeleton` (React.ReactNode); default: undefined — Placeholder element rendered while loading is true\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/skeleton.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b1b633a6402bd1d54f8bf9a0a6b71a4022059294e732987822968ef3d3e35d9f",
    "features": [
      "Quiet shimmer blocks with smooth gradient light sweep animation",
      "SkeletonReveal transitions seamlessly to live content using fade, subtle rise, and un-blur",
      "Convenient SkeletonText preset with natural staggered line length distribution",
      "SkeletonAvatar preset for profile pictures and user thumbnails",
      "Clean reduced-motion fallback that disables continuous sweeping"
    ],
    "props": [
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "CSS classes to size and position the skeleton block"
      },
      {
        "name": "lines",
        "type": "number",
        "default": "3",
        "description": "Number of lines for the SkeletonText component"
      },
      {
        "name": "size",
        "type": "number",
        "default": "40",
        "description": "Pixel size for the circular SkeletonAvatar component"
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "undefined",
        "description": "Active loading state for the SkeletonReveal wrapper"
      },
      {
        "name": "skeleton",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Placeholder element rendered while loading is true"
      }
    ],
    "accessibility": [
      "Applies aria-hidden to placeholder skeletons to avoid cluttering screen readers",
      "SkeletonReveal uses role=\"status\" and aria-busy=\"true\" during loading",
      "Respects prefers-reduced-motion without disorienting fast flashing"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonReveal } from \"@/components/ui/skeleton\";\n\n<SkeletonReveal\n  loading={isLoading}\n  skeleton={\n    <div className=\"flex gap-3\">\n      <SkeletonAvatar size={40} />\n      <div className=\"flex-1 space-y-2\">\n        <Skeleton className=\"h-4 w-1/3\" />\n        <SkeletonText lines={2} />\n      </div>\n    </div>\n  }\n>\n  <UserCard user={user} />\n</SkeletonReveal>",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/skeleton.tsx",
        "type": "registry:ui",
        "target": "components/ui/skeleton.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "slide-pagination",
    "name": "SlidePagination",
    "tagline": "Active indicator slides between pages",
    "description": "A pagination control where the active indicator slides between pages rather than instantly switching. The active background uses shared layoutId so the indicator visibly travels from one item to the next.",
    "category": "Navigation",
    "badges": [
      "Shared Layout",
      "Indicator Travel",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/slide-pagination",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI SlidePagination component into my project.\n\nA pagination control where the active indicator slides between pages rather than instantly switching. The active background uses shared layoutId so the indicator visibly travels from one item to the next.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/slide-pagination\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SlidePagination } from \"@/components/ui/slide-pagination\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center\">\n      <SlidePagination pageCount={12} defaultPage={5} siblingCount={1} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `pageCount` (number); default: undefined — Total number of pages\n- `page` (number); default: undefined — Controlled current page\n- `defaultPage` (number); default: 1 — Initial current page (uncontrolled)\n- `siblingCount` (number); default: 1 — Visible pages around the current one\n- `onChange` ((page: number) => void); default: undefined — Page change callback\n- `showControls` (boolean); default: true — Show previous / next buttons\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/slide-pagination.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "0540b8be80494016686c2d13b5e693a3aacb7e94449950debd7c72ab09a9e512",
    "features": [
      "Active background uses framer-motion shared layoutId for visible travel between pages",
      "Snappy spring (springSnappy) drives the indicator for a precise, physical feel",
      "Configurable siblingCount for windowed page ranges with ellipsis",
      "Optional previous / next controls; disabled at boundaries",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "pageCount",
        "type": "number",
        "default": "undefined",
        "description": "Total number of pages"
      },
      {
        "name": "page",
        "type": "number",
        "default": "undefined",
        "description": "Controlled current page"
      },
      {
        "name": "defaultPage",
        "type": "number",
        "default": "1",
        "description": "Initial current page (uncontrolled)"
      },
      {
        "name": "siblingCount",
        "type": "number",
        "default": "1",
        "description": "Visible pages around the current one"
      },
      {
        "name": "onChange",
        "type": "(page: number) => void",
        "default": "undefined",
        "description": "Page change callback"
      },
      {
        "name": "showControls",
        "type": "boolean",
        "default": "true",
        "description": "Show previous / next buttons"
      }
    ],
    "accessibility": [
      "aria-current=\"page\" on the active item; aria-label per page button",
      "Disabled state on prev/next at boundaries",
      "Focus-ring visible on keyboard navigation"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { SlidePagination } from \"@/components/ui/slide-pagination\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center\">\n      <SlidePagination pageCount={12} defaultPage={5} siblingCount={1} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SlidePagination.tsx",
        "type": "registry:ui",
        "target": "components/ui/slide-pagination.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "small-floating-dock",
    "name": "Small Floating Dock",
    "tagline": "Hover proximity scale & tactile action pills",
    "description": "A minimal, gesture-responsive floating dock for quick access to 3-5 primary actions.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Navigation",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/small-floating-dock",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Small Floating Dock component into my project.\n\nA minimal, gesture-responsive floating dock for quick access to 3-5 primary actions.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/small-floating-dock\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SmallFloatingDock } from \"@/components/ui/small-floating-dock\";\nimport { Sparkles, Terminal, Code2, Bell } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <SmallFloatingDock\n      position=\"bottom-right\"\n      items={[\n        { id: '1', label: 'AI Assistant', icon: <Sparkles className=\"w-4 h-4\" />, action: () => {} },\n        { id: '2', label: 'Terminal', icon: <Terminal className=\"w-4 h-4\" />, action: () => {} },\n        { id: '3', label: 'Editor', icon: <Code2 className=\"w-4 h-4\" />, action: () => {} },\n        { id: '4', label: 'Notifications', icon: <Bell className=\"w-4 h-4\" />, action: () => {}, badge: 3 },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (DockItem[]); default: [] — Array of 3 to 5 action items with icon, label, action, and badge\n- `position` ('bottom-right' | 'bottom-center' | 'bottom-left'); default: 'bottom-right' — Screen placement\n- `size` ('sm' | 'md' | 'lg'); default: 'md' — Button sizing scale\n- `hideOnScroll` (boolean); default: false — Auto-hides dock during downward scroll\n- `variant` ('icon-only' | 'icon-label'); default: 'icon-only' — Icon only with tooltips or labeled buttons\n- `activeId` (string); default: undefined — Selected active item ID\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/small-floating-dock.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "e33c29fbbbee786a8bbf58851aa646e9425a7c0dc3229a49e2858ccedd95c508",
    "features": [
      "Proximity-aware hover scale with elastic spring snap-back physics",
      "Supports 3 to 5 actions with numeric unread badges and contextual tooltips",
      "Configurable screen positioning (bottom-right, bottom-center, bottom-left)",
      "Optional hide-on-scroll behavior with smooth viewport transitions",
      "Full keyboard tab navigation and WCAG AA focus rings"
    ],
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "default": "[]",
        "description": "Array of 3 to 5 action items with icon, label, action, and badge"
      },
      {
        "name": "position",
        "type": "'bottom-right' | 'bottom-center' | 'bottom-left'",
        "default": "'bottom-right'",
        "description": "Screen placement"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Button sizing scale"
      },
      {
        "name": "hideOnScroll",
        "type": "boolean",
        "default": "false",
        "description": "Auto-hides dock during downward scroll"
      },
      {
        "name": "variant",
        "type": "'icon-only' | 'icon-label'",
        "default": "'icon-only'",
        "description": "Icon only with tooltips or labeled buttons"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Selected active item ID"
      }
    ],
    "accessibility": [
      "Semantic <nav> landmark with role=\"navigation\"",
      "aria-label on all action buttons and aria-current=\"page\" on active item",
      "Keyboard focus and tooltip synchronization on Tab / Escape"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { SmallFloatingDock } from \"@/components/ui/small-floating-dock\";\nimport { Sparkles, Terminal, Code2, Bell } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <SmallFloatingDock\n      position=\"bottom-right\"\n      items={[\n        { id: '1', label: 'AI Assistant', icon: <Sparkles className=\"w-4 h-4\" />, action: () => {} },\n        { id: '2', label: 'Terminal', icon: <Terminal className=\"w-4 h-4\" />, action: () => {} },\n        { id: '3', label: 'Editor', icon: <Code2 className=\"w-4 h-4\" />, action: () => {} },\n        { id: '4', label: 'Notifications', icon: <Bell className=\"w-4 h-4\" />, action: () => {}, badge: 3 },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SmallFloatingDock.tsx",
        "type": "registry:ui",
        "target": "components/ui/small-floating-dock.tsx"
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
  },
  {
    "id": "smart-comparison",
    "name": "Smart Comparison",
    "tagline": "Interactive tier comparison matrix with difference filtering",
    "description": "An interactive feature matrix and SaaS tier comparison component featuring live difference filtering, collapsible specification categories, search indexing, and mobile card toggle.",
    "category": "Navigation",
    "badges": [
      "Feature Matrix",
      "SaaS Pricing",
      "Diff Filter"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smart-comparison",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Smart Comparison component into my project.\n\nAn interactive feature matrix and SaaS tier comparison component featuring live difference filtering, collapsible specification categories, search indexing, and mobile card toggle.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/smart-comparison\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SmartComparison } from \"@/components/ui/smart-comparison\";\n\nconst plans = [\n  { id: \"hobby\", name: \"Hobby\", tagline: \"For side projects\", price: \"$0\", billingPeriod: \"mo\" },\n  { id: \"pro\", name: \"Pro\", tagline: \"For fast-moving teams\", price: \"$29\", billingPeriod: \"mo\", featured: true, badge: \"Popular\" },\n  { id: \"enterprise\", name: \"Enterprise\", tagline: \"Dedicated compliance\", price: \"Custom\", billingPeriod: \"yr\" },\n];\n\nconst categories = [\n  {\n    id: \"compute\",\n    title: \"Compute & Scale\",\n    features: [\n      { id: \"bandwidth\", name: \"Global Bandwidth\", values: { hobby: \"100 GB\", pro: \"1 TB\", enterprise: \"Unlimited\" } },\n      { id: \"regions\", name: \"Multi-Region Routing\", values: { hobby: false, pro: true, enterprise: true } },\n      { id: \"concurrency\", name: \"Max Concurrency\", values: { hobby: \"10\", pro: \"250\", enterprise: \"Dedicated\" } },\n    ],\n  },\n];\n\nexport function Demo() {\n  return <SmartComparison plans={plans} categories={categories} />;\n}\n```\n\nDeclared props:\n- `plans` (ComparisonPlan[]); default: [] — Array of plans/tiers containing pricing and metadata\n- `categories` (ComparisonCategory[]); default: [] — Grouped feature categories with plan-specific values\n- `defaultPlanId` (string); default: featured plan or plans[0].id — Initial plan selected on mobile viewports\n- `enableSearch` (boolean); default: true — Whether to show the instant feature search input\n- `enableDiffFilter` (boolean); default: true — Whether to render the \"Differences Only\" toggle button\n- `className` (string); default: undefined — Optional CSS class name for container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/smart-comparison.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "6a9dce456bb1cd64a02a0f192724f4d059987ec99e33492f2426f12650c9b2a0",
    "features": [
      "Live \"Differences Only\" filter to instantly surface plan divergence",
      "Integrated feature keyword search with real-time row matching",
      "Collapsible category groups with spring height transitions",
      "Segmented mobile plan selector avoiding wide horizontal table scrolling",
      "Contextual info tooltips and custom value cell rendering"
    ],
    "props": [
      {
        "name": "plans",
        "type": "ComparisonPlan[]",
        "default": "[]",
        "description": "Array of plans/tiers containing pricing and metadata"
      },
      {
        "name": "categories",
        "type": "ComparisonCategory[]",
        "default": "[]",
        "description": "Grouped feature categories with plan-specific values"
      },
      {
        "name": "defaultPlanId",
        "type": "string",
        "default": "featured plan or plans[0].id",
        "description": "Initial plan selected on mobile viewports"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the instant feature search input"
      },
      {
        "name": "enableDiffFilter",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the \"Differences Only\" toggle button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS class name for container"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA labels",
      "Keyboard accessible category accordions and tooltips",
      "High-contrast state indicators with screen reader readable labels"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SmartComparison } from \"@/components/ui/smart-comparison\";\n\nconst plans = [\n  { id: \"hobby\", name: \"Hobby\", tagline: \"For side projects\", price: \"$0\", billingPeriod: \"mo\" },\n  { id: \"pro\", name: \"Pro\", tagline: \"For fast-moving teams\", price: \"$29\", billingPeriod: \"mo\", featured: true, badge: \"Popular\" },\n  { id: \"enterprise\", name: \"Enterprise\", tagline: \"Dedicated compliance\", price: \"Custom\", billingPeriod: \"yr\" },\n];\n\nconst categories = [\n  {\n    id: \"compute\",\n    title: \"Compute & Scale\",\n    features: [\n      { id: \"bandwidth\", name: \"Global Bandwidth\", values: { hobby: \"100 GB\", pro: \"1 TB\", enterprise: \"Unlimited\" } },\n      { id: \"regions\", name: \"Multi-Region Routing\", values: { hobby: false, pro: true, enterprise: true } },\n      { id: \"concurrency\", name: \"Max Concurrency\", values: { hobby: \"10\", pro: \"250\", enterprise: \"Dedicated\" } },\n    ],\n  },\n];\n\nexport function Demo() {\n  return <SmartComparison plans={plans} categories={categories} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmartComparison.tsx",
        "type": "registry:ui",
        "target": "components/ui/smart-comparison.tsx"
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
  },
  {
    "id": "smooth-accordion",
    "name": "Smooth Accordion",
    "tagline": "Zero-jank spring collapsible content panels",
    "description": "An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.",
    "category": "Feedback",
    "badges": [
      "Spring Height",
      "Zero Layout Shift",
      "Multi or Single"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smooth-accordion",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Smooth Accordion component into my project.\n\nAn accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/smooth-accordion\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}\n```\n\nDeclared props:\n- `items` (AccordionItem[]); default: [] — Accordion items\n- `allowMultiple` (boolean); default: false — Allow multiple open panels\n- `defaultOpen` (string[]); default: [] — Default open item ids\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/smooth-accordion.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "2b30af8eb8ec7a5a92ce17c055e2ea3bb6f85c622100e181852006bdf8710d56",
    "features": [
      "Spring physics height interpolation",
      "Zero content clipping or layout jumps",
      "Single or multi-panel open mode"
    ],
    "props": [
      {
        "name": "items",
        "type": "AccordionItem[]",
        "default": "[]",
        "description": "Accordion items"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allow multiple open panels"
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "default": "[]",
        "description": "Default open item ids"
      }
    ],
    "accessibility": [
      "WAI-ARIA accordion pattern",
      "aria-expanded and aria-controls attributes"
    ],
    "createdAt": "2026-08-05",
    "usageCode": "import { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmoothAccordion.tsx",
        "type": "registry:ui",
        "target": "components/ui/smooth-accordion.tsx"
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
  },
  {
    "id": "sparkles-core",
    "name": "Sparkles Core",
    "tagline": "Zero-dependency GPU canvas particle sparkles with celestial stars, organic twinkle, and cursor reactions",
    "description": "A high-performance, zero-dependency particle sparkle canvas with multi-shape geometry (circles, radiant diamond stars, cross starlets), organic twinkling, interactive cursor repulsion/attraction, click particle bursts, and fluid SSR safety.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Particles",
      "Interactive",
      "Background"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sparkles-core",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Sparkles Core component into my project.\n\nA high-performance, zero-dependency particle sparkle canvas with multi-shape geometry (circles, radiant diamond stars, cross starlets), organic twinkling, interactive cursor repulsion/attraction, click particle bursts, and fluid SSR safety.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/sparkles-core\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SparklesCore } from \"@/components/ui/sparkles-core\";\n\nexport function SparklesDemo() {\n  return (\n    <div className=\"relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center\">\n      <SparklesCore\n        id=\"tsparticlesfullpage\"\n        background=\"transparent\"\n        minSize={0.6}\n        maxSize={2}\n        particleDensity={100}\n        className=\"w-full h-full\"\n        particleColor=\"#FFFFFF\"\n        particleShape=\"mixed\"\n        particleColors={[\"#60A5FA\", \"#C084FC\", \"#F472B6\", \"#FFFFFF\"]}\n        cursorMode=\"repulse\"\n        clickPush={10}\n      >\n        <div className=\"flex flex-col items-center justify-center h-full px-4 text-center\">\n          <h1 className=\"text-3xl md:text-5xl font-bold text-white tracking-tight\">\n            Build Stunning Interfaces\n          </h1>\n          <p className=\"mt-3 text-sm text-slate-400 max-w-sm\">\n            Zero-dependency canvas particle sparkle system with celestial stars and cursor dynamics.\n          </p>\n        </div>\n      </SparklesCore>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `id` (string) — Optional unique HTML id attribute for the canvas element\n- `background` (string); default: 'transparent' — Background color of the sparkle container (CSS color, hex, rgba, or gradient)\n- `className` (string) — Additional CSS utility classes applied to the root container\n- `particleColor` (string); default: '#FFFFFF' — Primary color for single-tint particle sparkle fields\n- `particleColors` (string[]) — Array of colors distributed across sparkles for chromatic or starry night effects\n- `minSize` (number); default: 0.6 — Minimum radius/size in pixels for spawned sparkles\n- `maxSize` (number); default: 2.4 — Maximum radius/size in pixels for spawned sparkles\n- `particleSize` (number) — Uniform particle size override (locks both minSize and maxSize)\n- `speed` (number); default: 1 — Particle movement velocity multiplier\n- `particleDensity` (number); default: 120 — Particle density factor calculated relative to a 400x400 area\n- `particleCount` (number) — Exact particle count override ignoring density calculations\n- `particleShape` ('circle' | 'star' | 'cross' | 'mixed'); default: 'circle' — Geometry shape of particles: circle, 4-point radiant star, cross starlet, or mixed\n- `direction` ('none' | 'top' | 'bottom' | 'left' | 'right'); default: 'none' — Directional flow drift; none provides organic cosmic floating\n- `twinkle` (boolean); default: true — Enables dynamic sinusoidal twinkle opacity pulsation\n- `twinkleSpeed` (number); default: 1 — Frequency speed multiplier for twinkle pulsation\n- `interactive` (boolean); default: true — Enables mouse pointer tracking and interaction reactions\n- `cursorMode` ('repulse' | 'attract' | 'sparkle' | 'none'); default: 'repulse' — Cursor reaction: repulse away, attract toward cursor, or sparkle illuminate\n- `cursorRadius` (number); default: 140 — Influence radius in pixels around the pointer\n- `clickPush` (number); default: 6 — Number of spark particles burst on click/tap\n- `opacity` (number); default: 1 — Global master opacity scalar for the sparkle canvas\n- `blur` (number); default: 0 — CSS blur filter radius in pixels for soft glowing bloom\n- `children` (ReactNode) — Optional content rendered above the sparkles with full clickability and isolation\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/sparkles-core.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "0aba539f4cc45c2d33591f213837ecfcb60b3954613f737a1deb636e487c38dc",
    "features": [
      "Zero external particle dependencies: 100% native HTML5 Canvas 2D with sub-pixel DPR scaling",
      "Full backward compatibility with Aceternity SparklesCore props signature",
      "Multiple particle shapes: circle, 4-pointed diamond star, celestial cross starlet, or mixed",
      "Multi-color palette distribution supporting chromatic nebulae and gradient sparkle fields",
      "Organic twinkle brightness pulsation with phase modulation and customizable twinkle speeds",
      "Directional drift flows: float organically in all directions, or drift top, bottom, left, or right",
      "Interactive cursor modes: repulsion, attraction, or proximity radiant enlargement",
      "Click & tap particle burst generation spawning dynamic kinetic firework sparks",
      "Wraps arbitrary children effortlessly with pointer event pass-through and depth stratification",
      "Full accessibility: aria-hidden canvas and prefers-reduced-motion compliance"
    ],
    "props": [
      {
        "name": "id",
        "type": "string",
        "description": "Optional unique HTML id attribute for the canvas element"
      },
      {
        "name": "background",
        "type": "string",
        "default": "'transparent'",
        "description": "Background color of the sparkle container (CSS color, hex, rgba, or gradient)"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS utility classes applied to the root container"
      },
      {
        "name": "particleColor",
        "type": "string",
        "default": "'#FFFFFF'",
        "description": "Primary color for single-tint particle sparkle fields"
      },
      {
        "name": "particleColors",
        "type": "string[]",
        "description": "Array of colors distributed across sparkles for chromatic or starry night effects"
      },
      {
        "name": "minSize",
        "type": "number",
        "default": "0.6",
        "description": "Minimum radius/size in pixels for spawned sparkles"
      },
      {
        "name": "maxSize",
        "type": "number",
        "default": "2.4",
        "description": "Maximum radius/size in pixels for spawned sparkles"
      },
      {
        "name": "particleSize",
        "type": "number",
        "description": "Uniform particle size override (locks both minSize and maxSize)"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Particle movement velocity multiplier"
      },
      {
        "name": "particleDensity",
        "type": "number",
        "default": "120",
        "description": "Particle density factor calculated relative to a 400x400 area"
      },
      {
        "name": "particleCount",
        "type": "number",
        "description": "Exact particle count override ignoring density calculations"
      },
      {
        "name": "particleShape",
        "type": "'circle' | 'star' | 'cross' | 'mixed'",
        "default": "'circle'",
        "description": "Geometry shape of particles: circle, 4-point radiant star, cross starlet, or mixed"
      },
      {
        "name": "direction",
        "type": "'none' | 'top' | 'bottom' | 'left' | 'right'",
        "default": "'none'",
        "description": "Directional flow drift; none provides organic cosmic floating"
      },
      {
        "name": "twinkle",
        "type": "boolean",
        "default": "true",
        "description": "Enables dynamic sinusoidal twinkle opacity pulsation"
      },
      {
        "name": "twinkleSpeed",
        "type": "number",
        "default": "1",
        "description": "Frequency speed multiplier for twinkle pulsation"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "default": "true",
        "description": "Enables mouse pointer tracking and interaction reactions"
      },
      {
        "name": "cursorMode",
        "type": "'repulse' | 'attract' | 'sparkle' | 'none'",
        "default": "'repulse'",
        "description": "Cursor reaction: repulse away, attract toward cursor, or sparkle illuminate"
      },
      {
        "name": "cursorRadius",
        "type": "number",
        "default": "140",
        "description": "Influence radius in pixels around the pointer"
      },
      {
        "name": "clickPush",
        "type": "number",
        "default": "6",
        "description": "Number of spark particles burst on click/tap"
      },
      {
        "name": "opacity",
        "type": "number",
        "default": "1",
        "description": "Global master opacity scalar for the sparkle canvas"
      },
      {
        "name": "blur",
        "type": "number",
        "default": "0",
        "description": "CSS blur filter radius in pixels for soft glowing bloom"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Optional content rendered above the sparkles with full clickability and isolation"
      }
    ],
    "accessibility": [
      "Canvas layer is isolated with aria-hidden=\"true\" and pointer-events-none",
      "Respects prefers-reduced-motion media query: freezes particle drift and twinkle when requested",
      "Children render in a stratified foreground container with native keyboard and focus semantics intact"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { SparklesCore } from \"@/components/ui/sparkles-core\";\n\nexport function SparklesDemo() {\n  return (\n    <div className=\"relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center\">\n      <SparklesCore\n        id=\"tsparticlesfullpage\"\n        background=\"transparent\"\n        minSize={0.6}\n        maxSize={2}\n        particleDensity={100}\n        className=\"w-full h-full\"\n        particleColor=\"#FFFFFF\"\n        particleShape=\"mixed\"\n        particleColors={[\"#60A5FA\", \"#C084FC\", \"#F472B6\", \"#FFFFFF\"]}\n        cursorMode=\"repulse\"\n        clickPush={10}\n      >\n        <div className=\"flex flex-col items-center justify-center h-full px-4 text-center\">\n          <h1 className=\"text-3xl md:text-5xl font-bold text-white tracking-tight\">\n            Build Stunning Interfaces\n          </h1>\n          <p className=\"mt-3 text-sm text-slate-400 max-w-sm\">\n            Zero-dependency canvas particle sparkle system with celestial stars and cursor dynamics.\n          </p>\n        </div>\n      </SparklesCore>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SparklesCore.tsx",
        "type": "registry:ui",
        "target": "components/ui/sparkles-core.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "speed-warp",
    "name": "Speed Warp",
    "tagline": "High-velocity 3D perspective starfield tunnel with canvas streaks.",
    "description": "A 3D perspective canvas starfield simulation that projects relativistic light streaks toward the viewer, creating an intense hyperspace or warp drive velocity effect.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Background Effect",
      "3D Perspective"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/speed-warp",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Speed Warp component into my project.\n\nA 3D perspective canvas starfield simulation that projects relativistic light streaks toward the viewer, creating an intense hyperspace or warp drive velocity effect.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/speed-warp\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\n<div className=\"relative h-[480px] w-full overflow-hidden rounded-2xl bg-[#050505] border border-border\">\n  <SpeedWarp speed={30} starCount={700} />\n  <div className=\"relative z-10 flex h-full items-center justify-center\">\n    <h2 className=\"text-3xl font-bold tracking-tight text-white\">Engage Warp Drive</h2>\n  </div>\n</div>\n```\n\nDeclared props:\n- `speed` (number); default: 25 — Velocity multiplier of stars moving toward the camera\n- `starCount` (number); default: 600 — Total number of 3D stars rendered in the volume\n- `className` (string); default: undefined — Optional custom CSS class name for styling\n- `children` (React.ReactNode) — Optional overlay content rendered above the starfield\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/speed-warp.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8f37c910d00166349f6c5fe287eadd3301a9b820222b16a9214c9f328ba0c8f0",
    "features": [
      "Real-time 3D perspective projection with focal length scaling",
      "Dynamic depth-alpha fading and velocity-driven streak lines",
      "Completely transparent canvas background for seamless layering over any dark UI or hero section",
      "Automatic canvas resizing via ResizeObserver to match parent container dimensions"
    ],
    "props": [
      {
        "name": "speed",
        "type": "number",
        "default": "25",
        "description": "Velocity multiplier of stars moving toward the camera"
      },
      {
        "name": "starCount",
        "type": "number",
        "default": "600",
        "description": "Total number of 3D stars rendered in the volume"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom CSS class name for styling"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "Optional overlay content rendered above the starfield"
      }
    ],
    "accessibility": [
      "Canvas is marked aria-hidden=\"true\" to prevent screen reader interference",
      "Responsive viewport tracking via ResizeObserver without blocking the main UI thread",
      "Transparent canvas overlay preserves keyboard access and focus management for interactive children"
    ],
    "createdAt": "2026-09-16",
    "usageCode": "<div className=\"relative h-[480px] w-full overflow-hidden rounded-2xl bg-[#050505] border border-border\">\n  <SpeedWarp speed={30} starCount={700} />\n  <div className=\"relative z-10 flex h-full items-center justify-center\">\n    <h2 className=\"text-3xl font-bold tracking-tight text-white\">Engage Warp Drive</h2>\n  </div>\n</div>",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/SpeedWarp.tsx",
        "type": "registry:ui",
        "target": "components/ui/speed-warp.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "split-button",
    "name": "Split Button",
    "tagline": "A primary action with a chevron trigger for related actions.",
    "description": "A primary action fused with a chevron trigger that reveals related actions in a spring-timed dropdown, sharing a single pill silhouette.",
    "category": "Buttons",
    "badges": [
      "Framer Motion",
      "Floating UI"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/split-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Split Button component into my project.\n\nA primary action fused with a chevron trigger that reveals related actions in a spring-timed dropdown, sharing a single pill silhouette.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/split-button\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\n<SplitButton\n  label=\"Deploy\"\n  onClick={handleDeploy}\n  options={[\n    { value: 'preview', label: 'Deploy preview', onSelect: handlePreview },\n    { value: 'rollback', label: 'Rollback', onSelect: handleRollback },\n  ]}\n/>\n```\n\nDeclared props:\n- `label` (string) — Label for the primary (left) action\n- `onClick` (() => void) — Called when the primary action is pressed\n- `options` (SplitButtonOption[]) — Dropdown options revealed by the chevron trigger\n- `size` ('sm' | 'md' | 'lg'); default: 'md' — Padding and text size\n- `variant` ('primary' | 'secondary'); default: 'primary' — Visual style of both halves of the control\n- `disabled` (boolean); default: false — Disables the entire control\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/split-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "04eaf7c654f61dd6c6cd799ec5c4b190708fba5d58158d0a30393472b8ce31be",
    "features": [
      "Primary action and chevron trigger share a single rounded pill silhouette",
      "Chevron rotates with a snappy spring on open/close",
      "Menu flips above the trigger when there is not enough room below",
      "Supports primary and secondary visual variants",
      "Closes on outside click and on Escape"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Label for the primary (left) action"
      },
      {
        "name": "onClick",
        "type": "() => void",
        "description": "Called when the primary action is pressed"
      },
      {
        "name": "options",
        "type": "SplitButtonOption[]",
        "description": "Dropdown options revealed by the chevron trigger"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Padding and text size"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary'",
        "default": "'primary'",
        "description": "Visual style of both halves of the control"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the entire control"
      }
    ],
    "accessibility": [
      "Chevron trigger uses aria-haspopup=\"menu\" and aria-expanded to announce state",
      "Dropdown uses role=\"menu\" with role=\"menuitem\" items",
      "Arrow Up/Down, Home, and End move roving focus between enabled items",
      "Enter/Space selects the active item, Escape closes and returns focus to the trigger",
      "Tab closes the menu without trapping focus",
      "Respects prefers-reduced-motion by collapsing spring transitions to instant"
    ],
    "createdAt": "2026-09-16",
    "usageCode": "<SplitButton\n  label=\"Deploy\"\n  onClick={handleDeploy}\n  options={[\n    { value: 'preview', label: 'Deploy preview', onSelect: handlePreview },\n    { value: 'rollback', label: 'Rollback', onSelect: handleRollback },\n  ]}\n/>",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SplitButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/split-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "spotlight-card",
    "name": "Spotlight Card",
    "tagline": "Radial pointer tracking over dark layered surface",
    "description": "A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.",
    "category": "Motion",
    "badges": [
      "Shader Feel",
      "Pointer Physics",
      "Dark Elevation"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Spotlight Card component into my project.\n\nA dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/spotlight-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}\n```\n\nDeclared props:\n- `spotlightColor` (string); default: 'rgba(56, 189, 248, 0.08)' — Inner ambient radial color\n- `spotlightSize` (number); default: 350 — Radius of spotlight effect in pixels\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/spotlight-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "fd49767d280c915ad55406b6aba373336e876d4585ae7d71831efeee30314a3c",
    "features": [
      "Hardware-accelerated dynamic radial mask",
      "Dual illumination (border beam + ambient inner glow)",
      "Near-black layered background preservation"
    ],
    "props": [
      {
        "name": "spotlightColor",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.08)'",
        "description": "Inner ambient radial color"
      },
      {
        "name": "spotlightSize",
        "type": "number",
        "default": "350",
        "description": "Radius of spotlight effect in pixels"
      }
    ],
    "accessibility": [
      "Accessible contrast ratio for all nested text and actions",
      "No reliance on animation for critical content reading"
    ],
    "createdAt": "2026-08-15",
    "usageCode": "import { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "spotlight-search",
    "name": "Spotlight Search",
    "tagline": "Global ⌘K search overlay with moving highlight spring physics",
    "description": "A global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.",
    "category": "Overlays",
    "badges": [
      "Command Palette",
      "Search",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-search",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Spotlight Search component into my project.\n\nA global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.\n\nCategory: Overlays.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/spotlight-search\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SpotlightSearch } from \"@/components/ui/spotlight-search\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>\n      <SpotlightSearch open={open} onOpenChange={setOpen} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `open` (boolean); default: false — Controlled visibility state\n- `onOpenChange` ((open: boolean) => void); default: undefined — Callback fired when modal visibility toggles\n- `items` (SpotlightSearchItem[]); default: [...] — List of searchable actions and components\n- `placeholder` (string); default: 'Search components, actions...' — Input placeholder text\n- `onSelect` ((item: SpotlightSearchItem) => void); default: undefined — Callback fired when item is chosen\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/spotlight-search.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "2cb9567146bfe184911170c8eb2059f1f694c54bb1cf7458890fb489ca99767b",
    "features": [
      "Global keyboard listener for ⌘K / Ctrl+K and Escape dismissal",
      "Animated active highlight tracking item selection with layoutId spring physics",
      "Categorized search results with contextual icons and technical kbd badges",
      "Dimmed backdrop with subtle blur preserving focus on command box",
      "Full arrow key navigation and Enter selection execution"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controlled visibility state"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when modal visibility toggles"
      },
      {
        "name": "items",
        "type": "SpotlightSearchItem[]",
        "default": "[...]",
        "description": "List of searchable actions and components"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search components, actions...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSelect",
        "type": "(item: SpotlightSearchItem) => void",
        "default": "undefined",
        "description": "Callback fired when item is chosen"
      }
    ],
    "accessibility": [
      "Aria-expanded and aria-autocomplete attributes on input",
      "Complete keyboard control (Up/Down arrows, Enter, Escape)",
      "Traps focus within dialog while active and restores focus on close"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SpotlightSearch } from \"@/components/ui/spotlight-search\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>\n      <SpotlightSearch open={open} onOpenChange={setOpen} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-search.tsx"
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
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "spring-select",
    "name": "SpringSelect",
    "tagline": "Menu follows the trigger with a tiny spring",
    "description": "A select dropdown whose menu follows the trigger with a tiny spring. The chevron rotates a hair past 180° before settling, and the panel slides down with a subtle overshoot.",
    "category": "Forms",
    "badges": [
      "Origin Spring",
      "Keyboard",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spring-select",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI SpringSelect component into my project.\n\nA select dropdown whose menu follows the trigger with a tiny spring. The chevron rotates a hair past 180° before settling, and the panel slides down with a subtle overshoot.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/spring-select\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { SpringSelect } from \"@/components/ui/spring-select\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-sm\">\n      <SpringSelect\n        label=\"Workspace\"\n        placeholder=\"Choose a workspace\"\n        defaultValue=\"design\"\n        options={[\n          { value: \"design\", label: \"Design Team\", description: \"12 members\" },\n          { value: \"eng\", label: \"Engineering\", description: \"34 members\" },\n          { value: \"ops\", label: \"Operations\", description: \"8 members\" },\n          { value: \"labs\", label: \"R&D Labs\", description: \"5 members\", disabled: true },\n        ]}\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `options` (SpringSelectOption[]); default: [] — Array of options with value, label, optional description, and disabled\n- `value` (string); default: undefined — Controlled value\n- `defaultValue` (string); default: undefined — Initial value (uncontrolled)\n- `placeholder` (string); default: 'Select…' — Placeholder text when no value is selected\n- `onChange` ((value: string) => void); default: undefined — Called when a new value is selected\n- `label` (string); default: undefined — Visible label rendered above the trigger\n- `disabled` (boolean); default: false — Prevents interaction\n- `error` (string); default: undefined — Error message; presence triggers danger styling\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/spring-select.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "f34dbae3da12248dd54cf00d705d9226ccef950fd80b1c8f0ad6d83d84669b4d",
    "features": [
      "Dropdown panel springs from the trigger with a subtle scale: 0.98 -> 1 overshoot",
      "Chevron rotates to 192° (slightly past 180°) and settles back via snappy spring",
      "Keyboard navigation: ArrowUp/Down to move, Enter to select, Escape to close",
      "Hover and active item highlight via tracked activeIndex state",
      "Selected item checkmark that follows selection through the spring motion",
      "Light/dark theme aware via CSS variables — works in both palettes"
    ],
    "props": [
      {
        "name": "options",
        "type": "SpringSelectOption[]",
        "default": "[]",
        "description": "Array of options with value, label, optional description, and disabled"
      },
      {
        "name": "value",
        "type": "string",
        "default": "undefined",
        "description": "Controlled value"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "undefined",
        "description": "Initial value (uncontrolled)"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Select…'",
        "description": "Placeholder text when no value is selected"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Called when a new value is selected"
      },
      {
        "name": "label",
        "type": "string",
        "default": "undefined",
        "description": "Visible label rendered above the trigger"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      },
      {
        "name": "error",
        "type": "string",
        "default": "undefined",
        "description": "Error message; presence triggers danger styling"
      }
    ],
    "accessibility": [
      "aria-haspopup / aria-expanded / aria-selected / aria-disabled on appropriate elements",
      "Full keyboard navigation with proper focus restoration to trigger on close",
      "Escape key dismisses the panel without changing the value",
      "Disabled state is conveyed to assistive tech"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { SpringSelect } from \"@/components/ui/spring-select\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-sm\">\n      <SpringSelect\n        label=\"Workspace\"\n        placeholder=\"Choose a workspace\"\n        defaultValue=\"design\"\n        options={[\n          { value: \"design\", label: \"Design Team\", description: \"12 members\" },\n          { value: \"eng\", label: \"Engineering\", description: \"34 members\" },\n          { value: \"ops\", label: \"Operations\", description: \"8 members\" },\n          { value: \"labs\", label: \"R&D Labs\", description: \"5 members\", disabled: true },\n        ]}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SpringSelect.tsx",
        "type": "registry:ui",
        "target": "components/ui/spring-select.tsx"
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
  },
  {
    "id": "stack-unfold-panel",
    "name": "Stack Unfold Panel",
    "tagline": "Progressive disclosure card stack with spring height animation",
    "description": "A vertically stacked card deck that unfolds progressively with spring physics, shifting adjacent panels with zero layout jank.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Accordion",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stack-unfold-panel",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Stack Unfold Panel component into my project.\n\nA vertically stacked card deck that unfolds progressively with spring physics, shifting adjacent panels with zero layout jank.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/stack-unfold-panel\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StackUnfoldPanel } from \"@/components/ui/stack-unfold-panel\";\n\nexport function Demo() {\n  return (\n    <StackUnfoldPanel\n      cards={[\n        { id: '1', title: 'Global Edge Runtime', subtitle: 'v2.4.0 Engine', content: 'Distributed across 320+ edge point-of-presence regions with instant failover.' },\n        { id: '2', title: 'Zero-Copy Serialization', subtitle: 'Binary Protocol', content: 'High-speed Protobuf and FlatBuffers compression with minimal CPU overhead.' },\n        { id: '3', title: 'Automated CI Verification', subtitle: 'GitHub Actions', content: 'Continuous testing and schema verification on every pull request.' },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `cards` (StackCard[]) — Array of card items (id, title, subtitle, content, badge)\n- `expandedIds` (string[]); default: undefined — Controlled array of opened card IDs\n- `onExpandedChange` ((ids: string[]) => void); default: undefined — Expansion event callback\n- `allowMultiple` (boolean); default: false — Allows simultaneous expansion of multiple cards\n- `variant` ('default' | 'minimal'); default: 'default' — Bordered card or minimal underline layout\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/stack-unfold-panel.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "569a59b23f3e05658343204209b44b1c2d0b81df4ad77eed352036a8d64569bc",
    "features": [
      "Progressive vertical expansion with GPU-accelerated height calculation",
      "Automatic single-card accordion mode or multi-card unfolding",
      "Rotating chevron indicators with smooth 180-degree spring flip",
      "Full accessibility with aria-expanded, aria-controls, and keyboard triggers"
    ],
    "props": [
      {
        "name": "cards",
        "type": "StackCard[]",
        "description": "Array of card items (id, title, subtitle, content, badge)"
      },
      {
        "name": "expandedIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled array of opened card IDs"
      },
      {
        "name": "onExpandedChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Expansion event callback"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows simultaneous expansion of multiple cards"
      },
      {
        "name": "variant",
        "type": "'default' | 'minimal'",
        "default": "'default'",
        "description": "Bordered card or minimal underline layout"
      }
    ],
    "accessibility": [
      "Interactive header buttons with aria-expanded and aria-controls",
      "Tab key navigable with Space and Enter expansion toggles",
      "Compliant with WCAG AA contrast guidelines"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { StackUnfoldPanel } from \"@/components/ui/stack-unfold-panel\";\n\nexport function Demo() {\n  return (\n    <StackUnfoldPanel\n      cards={[\n        { id: '1', title: 'Global Edge Runtime', subtitle: 'v2.4.0 Engine', content: 'Distributed across 320+ edge point-of-presence regions with instant failover.' },\n        { id: '2', title: 'Zero-Copy Serialization', subtitle: 'Binary Protocol', content: 'High-speed Protobuf and FlatBuffers compression with minimal CPU overhead.' },\n        { id: '3', title: 'Automated CI Verification', subtitle: 'GitHub Actions', content: 'Continuous testing and schema verification on every pull request.' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/StackUnfoldPanel.tsx",
        "type": "registry:ui",
        "target": "components/ui/stack-unfold-panel.tsx"
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
  },
  {
    "id": "stacked-cards",
    "name": "Stacked Cards",
    "tagline": "Scroll-driven sticky stacking cards",
    "description": "A responsive, scroll-driven stacking cards component built with Tailwind CSS and Framer Motion. Cards start aligned in a column and stack gracefully on scroll without hijacking page scrolling.",
    "category": "Motion",
    "badges": [
      "Motion",
      "Tailwind",
      "Scroll-Driven",
      "Sticky"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stacked-cards",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Stacked Cards component into my project.\n\nA responsive, scroll-driven stacking cards component built with Tailwind CSS and Framer Motion. Cards start aligned in a column and stack gracefully on scroll without hijacking page scrolling.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/stacked-cards\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StackedCards } from \"@/components/ui/StackedCards\";\n\nexport function Demo() {\n  return (\n    <StackedCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description: \"Explore the latest trends, insights, and stories.\",\n          image: \"https://images.unsplash.com/photo-1497366811353-6870744d04b2\",\n          ctaLabel: \"Read story\",\n        },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `cards` (StackedCard[]); default: defaultCards — Array of card objects with title, description, image, and optional CTA link\n- `title` (string); default: undefined — Optional section heading title\n- `subtitle` (string); default: undefined — Optional section description subtitle\n- `className` (string); default: undefined — Optional custom Tailwind styling for the outer wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/stacked-cards.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c968716995f037603d05a8662155e76b2d328ad85133c90c35b59c1670c2c534",
    "features": [
      "Naturally aligned column layout in the initial view",
      "Scroll-driven sticky stacking where cards stack one above another on scroll",
      "Non-blocking native window scrolling — continues to subsequent sections seamlessly",
      "Responsive two-column grid on desktop, single-column on mobile",
      "Dark and light mode compatible with high-contrast typography and borders",
      "Hardware accelerated motion transitions with subtle depth shadow",
      "Respects prefers-reduced-motion preferences"
    ],
    "props": [
      {
        "name": "cards",
        "type": "StackedCard[]",
        "default": "defaultCards",
        "description": "Array of card objects with title, description, image, and optional CTA link"
      },
      {
        "name": "title",
        "type": "string",
        "default": "undefined",
        "description": "Optional section heading title"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "undefined",
        "description": "Optional section description subtitle"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom Tailwind styling for the outer wrapper"
      }
    ],
    "accessibility": [
      "Respects prefers-reduced-motion media query",
      "Uses semantic section and article elements",
      "Preserves standard keyboard navigation and browser focus management"
    ],
    "createdAt": "2026-09-12T11:29:47.829Z",
    "usageCode": "import { StackedCards } from \"@/components/ui/StackedCards\";\n\nexport function Demo() {\n  return (\n    <StackedCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description: \"Explore the latest trends, insights, and stories.\",\n          image: \"https://images.unsplash.com/photo-1497366811353-6870744d04b2\",\n          ctaLabel: \"Read story\",\n        },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/StackedCards.tsx",
        "type": "registry:ui",
        "target": "components/ui/stacked-cards.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Stat Card component into my project.\n\nA KPI tile with a count-up headline number, a direction-aware delta pill, and a scrubable sparkline. Pair several with StatGrid for a responsive metrics row that works from phones to wide dashboards.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/stat-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StatCard, StatGrid } from \"@/components/ui/stat-card\";\n\nconst revenue = [41200, 42100, 41800, 43600, 44200, 45800, 47100];\n\nexport function Demo() {\n  return (\n    <StatGrid>\n      <StatCard\n        label=\"Revenue\"\n        value={revenue[revenue.length - 1]}\n        previous={revenue[0]}\n        trend={revenue}\n        period=\"Last 7 days\"\n      />\n      <StatCard\n        label=\"Churn\"\n        value={2.4}\n        previous={2.9}\n        trend={[2.9, 2.8, 2.7, 2.6, 2.5, 2.4]}\n        goodWhen=\"down\"\n        format={(n) => `${n.toFixed(1)}%`}\n        period=\"Last 6 weeks\"\n        color=\"#ff6b8b\"\n      />\n    </StatGrid>\n  );\n}\n```\n\nDeclared props:\n- `label` (string) — Metric name shown above the headline number\n- `value` (number) — Headline number; usually the latest point of trend\n- `trend` (number[]) — Sparkline points ordered oldest to newest\n- `trendLabels` (string[]) — Names for each trend point, shown while scrubbing\n- `previous` (number) — Previous-period value used to compute the delta pill\n- `delta` (number) — Explicit delta percentage, overriding the computed value\n- `goodWhen` (\"up\" | \"down\"); default: \"up\" — Which direction counts as positive news\n- `period` (string); default: \"vs previous period\" — Caption under the number when not scrubbing\n- `format` ((n: number) => string); default: Intl.NumberFormat — Formats the headline, labels, and aria text\n- `color` (string); default: CHART_COLORS[0] — Sparkline stroke and gradient color\n- `animated` (boolean); default: true — Counts up on mount and animates the line (disabled for reduced motion)\n- `className` (string); default: \"\" — Additional CSS classes for the card\n- `StatGrid.children` (ReactNode) — StatCard tiles to arrange responsively\n- `StatGrid.className` (string); default: \"\" — Additional CSS classes for the grid\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/stat-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "stepper",
    "name": "Stepper",
    "tagline": "Animated connector line, gliding focus ring, and step panels",
    "description": "A multi-step progress indicator with line fills, gliding active rings, drawing checkmarks, and direction-aware sliding step panels.",
    "category": "Navigation",
    "badges": [
      "Connector Line",
      "Draw Checkmark",
      "Directional Panels",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stepper",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Stepper component into my project.\n\nA multi-step progress indicator with line fills, gliding active rings, drawing checkmarks, and direction-aware sliding step panels.\n\nCategory: Navigation.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/stepper\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { Stepper, StepPanels, type Step } from \"@/components/ui/stepper\";\n\nconst steps: Step[] = [\n  { title: \"Account\", description: \"Your details\" },\n  { title: \"Workspace\", description: \"Name it\" },\n  { title: \"Invite\", description: \"Optional\" },\n  { title: \"Done\" },\n];\n\nconst [current, setCurrent] = React.useState(0);\n\n<Stepper steps={steps} current={current} onStepChange={setCurrent} />\n<StepPanels current={current}>\n  <div>Step 1 content</div>\n  <div>Step 2 content</div>\n  <div>Step 3 content</div>\n  <div>Step 4 content</div>\n</StepPanels>\n```\n\nDeclared props:\n- `steps` (Step[]); default: undefined — List of steps with title and optional description\n- `current` (number); default: 0 — Zero-based index of the active step\n- `onStepChange` ((index: number) => void); default: undefined — Callback enabling jump-back clicks on completed steps\n- `orientation` ('horizontal' | 'vertical'); default: 'horizontal' — Layout direction of the stepper line\n- `className` (string); default: undefined — Additional CSS classes for the stepper container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/stepper.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8475ee62ff688ca94292172639ac826670018c8305e9327a846d8aa9b67047ed",
    "features": [
      "Connector line fills smoothly as you advance through steps",
      "A single active indicator ring glides between steps using Framer Motion layoutId",
      "Completed step checkmark animates its stroke path on completion",
      "Direction-aware StepPanels: slides left/right depending on forward or backward navigation",
      "Horizontal and vertical layouts, clickable completed steps, and responsive mobile labels"
    ],
    "props": [
      {
        "name": "steps",
        "type": "Step[]",
        "default": "undefined",
        "description": "List of steps with title and optional description"
      },
      {
        "name": "current",
        "type": "number",
        "default": "0",
        "description": "Zero-based index of the active step"
      },
      {
        "name": "onStepChange",
        "type": "(index: number) => void",
        "default": "undefined",
        "description": "Callback enabling jump-back clicks on completed steps"
      },
      {
        "name": "orientation",
        "type": "'horizontal' | 'vertical'",
        "default": "'horizontal'",
        "description": "Layout direction of the stepper line"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS classes for the stepper container"
      }
    ],
    "accessibility": [
      "Uses semantic <ol aria-label=\"Progress\"> and <li> elements with aria-current=\"step\"",
      "Provides hidden text \"(completed)\" for screen readers on completed steps",
      "Full keyboard navigation and visible focus rings for interactive step buttons"
    ],
    "createdAt": "2026-10-11",
    "usageCode": "import { Stepper, StepPanels, type Step } from \"@/components/ui/stepper\";\n\nconst steps: Step[] = [\n  { title: \"Account\", description: \"Your details\" },\n  { title: \"Workspace\", description: \"Name it\" },\n  { title: \"Invite\", description: \"Optional\" },\n  { title: \"Done\" },\n];\n\nconst [current, setCurrent] = React.useState(0);\n\n<Stepper steps={steps} current={current} onStepChange={setCurrent} />\n<StepPanels current={current}>\n  <div>Step 1 content</div>\n  <div>Step 2 content</div>\n  <div>Step 3 content</div>\n  <div>Step 4 content</div>\n</StepPanels>",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/stepper.tsx",
        "type": "registry:ui",
        "target": "components/ui/stepper.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "sticky-pages",
    "name": "Sticky Pages",
    "tagline": "Static sticky full-page stacking scroll sections with clean physical shadows and natural release",
    "description": "A pure static full-page sticky stacking scroll component where pages slide up and stack cleanly one over another without any tilting or distortion, before releasing smoothly into natural page scrolling.",
    "category": "Motion",
    "badges": [
      "CSS Sticky",
      "Stacking",
      "Scroll",
      "New"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sticky-pages",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Sticky Pages component into my project.\n\nA pure static full-page sticky stacking scroll component where pages slide up and stack cleanly one over another without any tilting or distortion, before releasing smoothly into natural page scrolling.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/sticky-pages\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StickyPages, StickyPage } from \"@/components/ui/sticky-pages\";\n\nexport function StickyPagesDemo() {\n  return (\n    <div className=\"w-full bg-slate-950\">\n      {/* Intro content */}\n      <div className=\"h-96 flex items-center justify-center\">\n        <p className=\"text-slate-400\">Scroll down to see the sticky pages stack</p>\n      </div>\n\n      {/* Sticky Stacking Pages */}\n      <StickyPages>\n        <StickyPage className=\"bg-slate-900 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">01. Architected for Speed</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-indigo-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">02. Modern Aesthetic System</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-sky-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">03. Production Grade Components</h2>\n        </StickyPage>\n      </StickyPages>\n\n      {/* Subsequent normal page content */}\n      <div className=\"h-96 flex items-center justify-center bg-black\">\n        <p className=\"text-slate-400\">Normal scroll resumes seamlessly here.</p>\n      </div>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `pages` (StickyPageItem[]) — Array of page data objects (title, subtitle, description, badge, content, bg)\n- `pageHeight` (string); default: '100vh' — CSS height of each sticky page (e.g. 100vh, 85vh, 600px)\n- `topOffset` (number); default: 0 — Distance from top of viewport in pixels when a page locks into sticky position\n- `stackOffset` (number); default: 0 — Progressive pixel offset between stacked cards (0 for clean cover, 24 for visible deck header tabs)\n- `rounded` (boolean); default: true — Whether pages have rounded top corners (rounded-t-3xl) as they stack over one another\n- `shadow` (boolean); default: true — Whether pages cast an elevated top drop shadow over the preceding page\n- `border` (boolean); default: true — Whether pages have a subtle top highlight border\n- `className` (string) — Additional CSS classes for outer container\n- `children` (ReactNode) — Optional <StickyPage> elements for JSX composition mode\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/sticky-pages.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "d85f2201d9a1c1524c8672dddb06fe010eb434a404f9091df078a3dc2b7aab3e",
    "features": [
      "Pure static stacking: zero tilting, zero rotation, zero transform distortion",
      "Native browser scrolling: zero scroll hijacking or wheel locking, built on native CSS position: sticky",
      "Stacking depth: each page slides up directly over the previous one with elevated top shadows and rounded borders",
      "Natural release: once the final page finishes stacking, the container seamlessly transitions back into normal document flow",
      "Dual composition support: pass a structured pages data array or arbitrary <StickyPage> child components",
      "Configurable top offset, stack offset, page height, rounded corners, and drop shadows",
      "Full prefers-reduced-motion compliance maintaining standard clean sticky reading"
    ],
    "props": [
      {
        "name": "pages",
        "type": "StickyPageItem[]",
        "description": "Array of page data objects (title, subtitle, description, badge, content, bg)"
      },
      {
        "name": "pageHeight",
        "type": "string",
        "default": "'100vh'",
        "description": "CSS height of each sticky page (e.g. 100vh, 85vh, 600px)"
      },
      {
        "name": "topOffset",
        "type": "number",
        "default": "0",
        "description": "Distance from top of viewport in pixels when a page locks into sticky position"
      },
      {
        "name": "stackOffset",
        "type": "number",
        "default": "0",
        "description": "Progressive pixel offset between stacked cards (0 for clean cover, 24 for visible deck header tabs)"
      },
      {
        "name": "rounded",
        "type": "boolean",
        "default": "true",
        "description": "Whether pages have rounded top corners (rounded-t-3xl) as they stack over one another"
      },
      {
        "name": "shadow",
        "type": "boolean",
        "default": "true",
        "description": "Whether pages cast an elevated top drop shadow over the preceding page"
      },
      {
        "name": "border",
        "type": "boolean",
        "default": "true",
        "description": "Whether pages have a subtle top highlight border"
      },
      {
        "name": "className",
        "type": "string",
        "description": "Additional CSS classes for outer container"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Optional <StickyPage> elements for JSX composition mode"
      }
    ],
    "accessibility": [
      "Maintains standard keyboard Tab order and native browser scroll behavior without wheel trapping",
      "Accessible for screen readers with semantic document structure"
    ],
    "createdAt": "2026-09-20",
    "usageCode": "import { StickyPages, StickyPage } from \"@/components/ui/sticky-pages\";\n\nexport function StickyPagesDemo() {\n  return (\n    <div className=\"w-full bg-slate-950\">\n      {/* Intro content */}\n      <div className=\"h-96 flex items-center justify-center\">\n        <p className=\"text-slate-400\">Scroll down to see the sticky pages stack</p>\n      </div>\n\n      {/* Sticky Stacking Pages */}\n      <StickyPages>\n        <StickyPage className=\"bg-slate-900 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">01. Architected for Speed</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-indigo-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">02. Modern Aesthetic System</h2>\n        </StickyPage>\n\n        <StickyPage className=\"bg-sky-950 flex items-center justify-center\">\n          <h2 className=\"text-4xl font-bold text-white\">03. Production Grade Components</h2>\n        </StickyPage>\n      </StickyPages>\n\n      {/* Subsequent normal page content */}\n      <div className=\"h-96 flex items-center justify-center bg-black\">\n        <p className=\"text-slate-400\">Normal scroll resumes seamlessly here.</p>\n      </div>\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/StickyPages.tsx",
        "type": "registry:ui",
        "target": "components/ui/sticky-pages.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "story-card",
    "name": "Story Cards",
    "tagline": "Responsive interactive story cards carousel",
    "description": "A responsive, accessible story cards carousel for React applications built with Tailwind CSS and Framer Motion.",
    "category": "Motion",
    "badges": [
      "Motion",
      "Tailwind",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/story-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Story Cards component into my project.\n\nA responsive, accessible story cards carousel for React applications built with Tailwind CSS and Framer Motion.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/story-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StoryCards } from \"@/components/ui/StoryCard\";\n\nexport function Demo() {\n  return (\n    <StoryCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description:\n            \"We survived another year of meetings, deadlines, bugs, and pretending everything was part of the plan.\",\n          image:\n            \"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85\",\n          imageAlt: \"Modern office interior\",\n          ctaLabel: \"Read the damage\",\n        },\n        {\n          id: 2,\n          title: \"Building for the future\",\n          description:\n            \"A deep dive into how we build things nobody asked for, then spend three weeks fixing them.\",\n          image:\n            \"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Team collaborating in an office\",\n          ctaLabel: \"See the chaos\",\n        },\n        {\n          id: 3,\n          title: \"Inside the journey\",\n          description:\n            \"One person's inspiring journey from 'this should be easy' to 47 browser tabs and a Stack Overflow account.\",\n          image:\n            \"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Person exploring a landscape\",\n          ctaLabel: \"Join the adventure\",\n        },\n        {\n          id: 4,\n          title: \"The internet economy\",\n          description:\n            \"An extremely serious investigation into why everything costs money, including things that used to be free.\",\n          image:\n            \"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Technology infrastructure\",\n          ctaLabel: \"Understand capitalism\",\n        }\n        }\n    />\n  );\n}\n```\n\nDeclared props:\n- `cards` (StoryCard[]); default: undefined — Array of story cards containing title, image, description, and optional link information\n- `initialIndex` (number); default: 0 — Index of the story displayed initially\n- `loop` (boolean); default: true — Enables endless circular scrolling through the cards\n- `enableWheelScroll` (boolean); default: true — Allows trackpad or mouse wheel gestures to scroll through cards\n- `autoPlay` (boolean); default: false — Automatically advances through the story cards\n- `autoPlayInterval` (number); default: 5000 — Time in milliseconds between automatic story transitions\n- `showNavigation` (boolean); default: true — Controls whether previous and next navigation buttons are displayed\n- `title` (string); default: \"What's happening\" — Custom title heading for the story cards section\n- `subtitle` (string); default: \"Discover the latest stories.\" — Custom subtitle for the story cards section\n- `className` (string); default: undefined — Optional custom Tailwind styling for the component wrapper\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/story-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "7dd2278fa19b9c1436990e94ffa33d3ffc092336f5193bbdf680e71bc3ef8bfc",
    "features": [
      "Infinite loop carousel with continuous smooth transitions",
      "Responsive horizontal story card layout",
      "Large featured card with compact preview cards",
      "Mouse wheel and trackpad horizontal/vertical scroll support",
      "Touch swipe and drag gesture navigation",
      "Smooth spring-powered layout animations",
      "Previous and next navigation controls",
      "Clickable story previews for quick navigation",
      "Optional autoplay with configurable interval and hover pause",
      "Keyboard navigation with arrow keys",
      "Hardware accelerated animations",
      "Respects reduced-motion preferences",
      "Customizable appearance with standard Tailwind utility classes"
    ],
    "props": [
      {
        "name": "cards",
        "type": "StoryCard[]",
        "default": "undefined",
        "description": "Array of story cards containing title, image, description, and optional link information"
      },
      {
        "name": "initialIndex",
        "type": "number",
        "default": "0",
        "description": "Index of the story displayed initially"
      },
      {
        "name": "loop",
        "type": "boolean",
        "default": "true",
        "description": "Enables endless circular scrolling through the cards"
      },
      {
        "name": "enableWheelScroll",
        "type": "boolean",
        "default": "true",
        "description": "Allows trackpad or mouse wheel gestures to scroll through cards"
      },
      {
        "name": "autoPlay",
        "type": "boolean",
        "default": "false",
        "description": "Automatically advances through the story cards"
      },
      {
        "name": "autoPlayInterval",
        "type": "number",
        "default": "5000",
        "description": "Time in milliseconds between automatic story transitions"
      },
      {
        "name": "showNavigation",
        "type": "boolean",
        "default": "true",
        "description": "Controls whether previous and next navigation buttons are displayed"
      },
      {
        "name": "title",
        "type": "string",
        "default": "\"What's happening\"",
        "description": "Custom title heading for the story cards section"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "\"Discover the latest stories.\"",
        "description": "Custom subtitle for the story cards section"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom Tailwind styling for the component wrapper"
      }
    ],
    "accessibility": [
      "Respects prefers-reduced-motion media query",
      "Provides semantic section and button elements",
      "Supports keyboard navigation with left and right arrow keys",
      "Provides accessible labels for navigation controls and stories",
      "Uses aria-current to identify the active story",
      "Uses descriptive image alt text for story images",
      "Maintains visible focus states for interactive elements"
    ],
    "createdAt": "2026-09-12T10:03:04.539Z",
    "usageCode": "import { StoryCards } from \"@/components/ui/StoryCard\";\n\nexport function Demo() {\n  return (\n    <StoryCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description:\n            \"We survived another year of meetings, deadlines, bugs, and pretending everything was part of the plan.\",\n          image:\n            \"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85\",\n          imageAlt: \"Modern office interior\",\n          ctaLabel: \"Read the damage\",\n        },\n        {\n          id: 2,\n          title: \"Building for the future\",\n          description:\n            \"A deep dive into how we build things nobody asked for, then spend three weeks fixing them.\",\n          image:\n            \"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Team collaborating in an office\",\n          ctaLabel: \"See the chaos\",\n        },\n        {\n          id: 3,\n          title: \"Inside the journey\",\n          description:\n            \"One person's inspiring journey from 'this should be easy' to 47 browser tabs and a Stack Overflow account.\",\n          image:\n            \"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Person exploring a landscape\",\n          ctaLabel: \"Join the adventure\",\n        },\n        {\n          id: 4,\n          title: \"The internet economy\",\n          description:\n            \"An extremely serious investigation into why everything costs money, including things that used to be free.\",\n          image:\n            \"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Technology infrastructure\",\n          ctaLabel: \"Understand capitalism\",\n        }\n        }\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/StoryCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/story-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "stretch-switch",
    "name": "StretchSwitch",
    "tagline": "Thumb stretches on press, then snaps",
    "description": "A toggle switch whose thumb stretches slightly while dragging or pressing, then snaps naturally to its destination via a snappy spring.",
    "category": "Forms",
    "badges": [
      "Stretch Physics",
      "Spring Snap",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stretch-switch",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI StretchSwitch component into my project.\n\nA toggle switch whose thumb stretches slightly while dragging or pressing, then snaps naturally to its destination via a snappy spring.\n\nCategory: Forms.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/stretch-switch\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { StretchSwitch } from \"@/components/ui/stretch-switch\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3 max-w-sm\">\n      <StretchSwitch\n        label=\"Reduce motion\"\n        description=\"Disables parallax and large translations across the app.\"\n        defaultChecked\n      />\n      <StretchSwitch\n        label=\"Show pre-release features\"\n        description=\"Toggle to preview experiments in the dashboard.\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `checked` (boolean); default: undefined — Controlled checked state\n- `defaultChecked` (boolean); default: false — Initial checked state (uncontrolled)\n- `disabled` (boolean); default: false — Prevents interaction\n- `onChange` ((checked: boolean) => void); default: undefined — Called when the switch toggles\n- `label` (React.ReactNode); default: undefined — Label text on the left\n- `description` (string); default: undefined — Helper text below the label\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/stretch-switch.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "95db5792767ff316bf2e6a55ceabe6d3ae35341f4d8c815c0f94ad76f0e57c70",
    "features": [
      "Thumb scaleX -> 1.18 / scaleY -> 0.86 while pointer is held for a tactile stretch",
      "Snappy spring (springSnappy) drives the snap to the new x position on release",
      "Press state is captured via pointerdown / pointerup, so it works for keyboard activations too",
      "Controlled / uncontrolled state, with onChange callback",
      "Light/dark theme aware via CSS variables — works in both palettes"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled checked state"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean) => void",
        "default": "undefined",
        "description": "Called when the switch toggles"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Label text on the left"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the label"
      }
    ],
    "accessibility": [
      "role=\"switch\" with aria-checked for assistive technology",
      "Pointer-based stretch effect does not interfere with keyboard activation",
      "Disabled state communicated both visually and to AT"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { StretchSwitch } from \"@/components/ui/stretch-switch\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3 max-w-sm\">\n      <StretchSwitch\n        label=\"Reduce motion\"\n        description=\"Disables parallax and large translations across the app.\"\n        defaultChecked\n      />\n      <StretchSwitch\n        label=\"Show pre-release features\"\n        description=\"Toggle to preview experiments in the dashboard.\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/StretchSwitch.tsx",
        "type": "registry:ui",
        "target": "components/ui/stretch-switch.tsx"
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
  },
  {
    "id": "text-scramble-decoder",
    "name": "Text Scramble Decoder",
    "tagline": "Controlled technical typography reveal",
    "description": "A controlled text reveal that resolves scrambled glyphs into readable copy without changing the text semantics.",
    "category": "Motion",
    "badges": [
      "Typography",
      "Reduced Motion",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/text-scramble-decoder",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Text Scramble Decoder component into my project.\n\nA controlled text reveal that resolves scrambled glyphs into readable copy without changing the text semantics.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/text-scramble-decoder\n\nDependencies (install only those missing): lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { TextScrambleDecoder } from \"@/components/ui/text-scramble-decoder\";\n\nexport function Demo() {\n  return (\n    <TextScrambleDecoder\n      text=\"EASYUI.REGISTRY.SYNCED\"\n      trigger=\"manual\"\n      duration={1000}\n    />\n  );\n}\n```\n\nDeclared props:\n- `text` (string) — Final readable text announced to assistive technology\n- `characters` (string); default: A-Z, 0-9, symbols — Characters used during the temporary scramble phase\n- `duration` (number); default: 900 — Decode duration in milliseconds\n- `trigger` ('mount' | 'hover' | 'manual'); default: 'mount' — When the decode sequence should run\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/text-scramble-decoder.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "b87ce704b6e444b29f97e52718b34aa812e21783b247743594e2a2ca487064f4",
    "features": [
      "Position-staged character resolution with a stable final state",
      "Mount, hover, and manual replay trigger modes",
      "Configurable glyph set and duration"
    ],
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "Final readable text announced to assistive technology"
      },
      {
        "name": "characters",
        "type": "string",
        "default": "A-Z, 0-9, symbols",
        "description": "Characters used during the temporary scramble phase"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "900",
        "description": "Decode duration in milliseconds"
      },
      {
        "name": "trigger",
        "type": "'mount' | 'hover' | 'manual'",
        "default": "'mount'",
        "description": "When the decode sequence should run"
      }
    ],
    "accessibility": [
      "The readable text is exposed through aria-label while animated glyphs are hidden from assistive technology",
      "Reduced motion renders the final text immediately"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { TextScrambleDecoder } from \"@/components/ui/text-scramble-decoder\";\n\nexport function Demo() {\n  return (\n    <TextScrambleDecoder\n      text=\"EASYUI.REGISTRY.SYNCED\"\n      trigger=\"manual\"\n      duration={1000}\n    />\n  );\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/TextScrambleDecoder.tsx",
        "type": "registry:ui",
        "target": "components/ui/text-scramble-decoder.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "thinking-orb",
    "name": "Thinking Orb",
    "tagline": "Minimalist monochrome particle vortex for AI interfaces",
    "description": "Minimalist monochrome spherical particle vortex with orbital physics, pure black-and-white luminous styling, and 9 cognitive state deformations.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Monochrome",
      "Orbital Physics",
      "Reduced Motion",
      "AI Indicator"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/thinking-orb",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Thinking Orb component into my project.\n\nMinimalist monochrome spherical particle vortex with orbital physics, pure black-and-white luminous styling, and 9 cognitive state deformations.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/thinking-orb\n\nNo additional package dependencies were detected by the registry sync.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { ThinkingOrb } from \"@/components/ui/thinking-orb\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [state, setState] = useState<\n    \"working\" | \"searching\" | \"solving\" | \"listening\" | \"connecting\" | \"weaving\" | \"composing\" | \"breathing\" | \"shaping\"\n  >(\"working\");\n\n  return (\n    <div className=\"flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#09090b] border border-[#27272a]\">\n      <ThinkingOrb state={state} size={72} speed={1} dark={true} />\n      <div className=\"flex flex-wrap justify-center gap-1.5\">\n        {([\"working\", \"searching\", \"solving\", \"listening\", \"connecting\", \"weaving\", \"composing\", \"breathing\", \"shaping\"] as const).map((s) => (\n          <button\n            key={s}\n            onClick={() => setState(s)}\n            className={`px-3 py-1 text-xs rounded-lg transition-colors ${\n              state === s\n                ? \"bg-white text-black font-semibold\"\n                : \"bg-[#18181b] text-neutral-400 hover:text-white\"\n            }`}\n          >\n            {s}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `state` ('working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'); default: 'working' — Cognitive animation behavior preset and mathematical deformation pattern\n- `size` (number); default: 64 — Diameter of the canvas orb in pixels (e.g. 64 for avatar/assistant, 20 for inline text)\n- `speed` (number); default: 1 — Animation playback speed multiplier (1 = standard, 2 = 2x faster, 0.5 = slow)\n- `dark` (boolean); default: true — Dark mode tuning: true renders luminous white particles, false renders crisp dark graphite particles\n- `paused` (boolean); default: false — Freezes animation frame progression while preserving current particle positions\n- `className` (string); default: undefined — Optional CSS class string applied to the outer container\n- `style` (CSSProperties); default: undefined — Inline styles passed directly to the container span\n- `aria-label` (string); default: '${state} orb' — Accessible label for screen readers announcing the orb state\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/thinking-orb.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "6ede33854d86587030725824f2a7803768de39b3396e93d2dcc4631b63ac1e88",
    "features": [
      "Pure monochrome aesthetic (clean white/silver on dark, deep obsidian on light) with zero colors",
      "9 unique cognitive states: working, searching, solving, listening, connecting, weaving, composing, breathing, and shaping",
      "GPU-accelerated Canvas rendering with 3D spherical trigonometry and perspective projection",
      "Adaptive particle density scaling automatically calibrated to size",
      "Full accessibility support with automatic prefers-reduced-motion fallback",
      "Minimalist optical core with subtle particle motion trailing and star sparkles"
    ],
    "props": [
      {
        "name": "state",
        "type": "'working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'",
        "default": "'working'",
        "description": "Cognitive animation behavior preset and mathematical deformation pattern"
      },
      {
        "name": "size",
        "type": "number",
        "default": "64",
        "description": "Diameter of the canvas orb in pixels (e.g. 64 for avatar/assistant, 20 for inline text)"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Animation playback speed multiplier (1 = standard, 2 = 2x faster, 0.5 = slow)"
      },
      {
        "name": "dark",
        "type": "boolean",
        "default": "true",
        "description": "Dark mode tuning: true renders luminous white particles, false renders crisp dark graphite particles"
      },
      {
        "name": "paused",
        "type": "boolean",
        "default": "false",
        "description": "Freezes animation frame progression while preserving current particle positions"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS class string applied to the outer container"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "default": "undefined",
        "description": "Inline styles passed directly to the container span"
      },
      {
        "name": "aria-label",
        "type": "string",
        "default": "'${state} orb'",
        "description": "Accessible label for screen readers announcing the orb state"
      }
    ],
    "accessibility": [
      "Canvas is marked with aria-hidden=\"true\" while wrapper span maintains descriptive ARIA role and label",
      "Automatically honors prefers-reduced-motion by freezing time-based coordinate progression",
      "Zero layout shift using explicit inline-flex dimensions and flex-shrink protection"
    ],
    "createdAt": "2026-09-11",
    "usageCode": "import { ThinkingOrb } from \"@/components/ui/thinking-orb\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [state, setState] = useState<\n    \"working\" | \"searching\" | \"solving\" | \"listening\" | \"connecting\" | \"weaving\" | \"composing\" | \"breathing\" | \"shaping\"\n  >(\"working\");\n\n  return (\n    <div className=\"flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#09090b] border border-[#27272a]\">\n      <ThinkingOrb state={state} size={72} speed={1} dark={true} />\n      <div className=\"flex flex-wrap justify-center gap-1.5\">\n        {([\"working\", \"searching\", \"solving\", \"listening\", \"connecting\", \"weaving\", \"composing\", \"breathing\", \"shaping\"] as const).map((s) => (\n          <button\n            key={s}\n            onClick={() => setState(s)}\n            className={`px-3 py-1 text-xs rounded-lg transition-colors ${\n              state === s\n                ? \"bg-white text-black font-semibold\"\n                : \"bg-[#18181b] text-neutral-400 hover:text-white\"\n            }`}\n          >\n            {s}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/ThinkingOrb.tsx",
        "type": "registry:ui",
        "target": "components/ui/thinking-orb.tsx"
      }
    ]
  },
  {
    "id": "torque-dial",
    "name": "Torque Dial",
    "tagline": "Rotational control knob with physical spin momentum",
    "description": "A rotational control dial with realistic physical angular momentum, velocity tracking, and exponential friction deceleration.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Physics Simulation",
      "Precision Control",
      "Forms"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/torque-dial",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Torque Dial component into my project.\n\nA rotational control dial with realistic physical angular momentum, velocity tracking, and exponential friction deceleration.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/torque-dial\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { TorqueDial } from \"@/components/ui/torque-dial\";\n\nexport function Demo() {\n  const [gain, setGain] = useState(48);\n\n  return (\n    <div className=\"p-8 flex items-center justify-center bg-[#090909] rounded-2xl border border-[#1F1F1F]\">\n      <TorqueDial\n        value={gain}\n        onChange={setGain}\n        min={0}\n        max={100}\n        unit=\"%\"\n        label=\"Gain Level\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `value` (number) — Current numeric value\n- `min` (number); default: 0 — Minimum dial threshold\n- `max` (number); default: 100 — Maximum dial threshold\n- `step` (number); default: 1 — Step resolution increment\n- `onChange` ((val: number) => void) — Callback fired on rotation value updates\n- `momentum` (boolean); default: true — Enables velocity-based inertial spin after drag release\n- `size` (number); default: 120 — Diameter in pixels\n- `unit` (string); default: '' — Optional unit suffix (e.g. \"%\", \"dB\", \"°\")\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/torque-dial.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "ac2325f98b6e1debe63c32533aaea97f0762696e62b1e12f5e7097382fea704d",
    "features": [
      "Natural angular momentum release with exponential friction deceleration decay",
      "Supports drag rotation, mouse wheel fine-tuning, keyboard arrow adjustments, and double-click centering",
      "Dynamic SVG radial progress ring with continuous value telemetry",
      "Full accessibility with role=\"slider\", aria-valuenow, and keyboard stepping"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "description": "Current numeric value"
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum dial threshold"
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum dial threshold"
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Step resolution increment"
      },
      {
        "name": "onChange",
        "type": "(val: number) => void",
        "description": "Callback fired on rotation value updates"
      },
      {
        "name": "momentum",
        "type": "boolean",
        "default": "true",
        "description": "Enables velocity-based inertial spin after drag release"
      },
      {
        "name": "size",
        "type": "number",
        "default": "120",
        "description": "Diameter in pixels"
      },
      {
        "name": "unit",
        "type": "string",
        "default": "''",
        "description": "Optional unit suffix (e.g. \"%\", \"dB\", \"°\")"
      }
    ],
    "accessibility": [
      "Semantic role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow",
      "Arrow keys, Home, and End support for fine keyboard tuning",
      "Visible focus outline around knob bounding perimeter"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { TorqueDial } from \"@/components/ui/torque-dial\";\n\nexport function Demo() {\n  const [gain, setGain] = useState(48);\n\n  return (\n    <div className=\"p-8 flex items-center justify-center bg-[#090909] rounded-2xl border border-[#1F1F1F]\">\n      <TorqueDial\n        value={gain}\n        onChange={setGain}\n        min={0}\n        max={100}\n        unit=\"%\"\n        label=\"Gain Level\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/TorqueDial.tsx",
        "type": "registry:ui",
        "target": "components/ui/torque-dial.tsx"
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
  },
  {
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
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Traffic Card component into my project.\n\nA compact traffic block with a count-up visit total, a Day / Week switcher, and a stacked column chart where every channel is its own rounded capsule. Built with hand-written SVG, light and dark themes, and full keyboard support.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/traffic-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { TrafficCard } from \"@/components/ui/traffic-card\";\n\nconst channels = [\n  { id: \"direct\", label: \"Direct\" },\n  { id: \"referral\", label: \"Referral\" },\n  { id: \"social\", label: \"Social\" },\n  { id: \"search\", label: \"Search\" },\n  { id: \"paid\", label: \"Paid\" },\n];\n\nconst ranges = [\n  {\n    id: \"day\",\n    label: \"Day\",\n    caption: \"Last 22 days\",\n    points: [\n      { label: \"Oct 27\", values: { direct: 210, referral: 340, social: 402, search: 268, paid: 246 } },\n      { label: \"Oct 28\", values: { direct: 246, referral: 372, social: 438, search: 301, paid: 289 } },\n      // …one point per column\n    ],\n  },\n  {\n    id: \"week\",\n    label: \"Week\",\n    caption: \"Last 22 weeks\",\n    points: [\n      { label: \"Jun 22\", values: { direct: 812, referral: 1290, social: 1520, search: 1040, paid: 960 } },\n      // …one point per column\n    ],\n  },\n];\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-[380px]\">\n      <TrafficCard channels={channels} ranges={ranges} />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `ranges` (TrafficRange[]) — Switchable ranges, each with its own points, caption, and optional total\n- `channels` (TrafficChannel[]) — Channel definitions rendered bottom-to-top in every stacked column\n- `defaultRange` (string); default: first range — Range id selected on first render\n- `onRangeChange` ((id: string) => void) — Called when the visitor switches the Day / Week control\n- `title` (string); default: \"Traffic\" — Heading shown at the top of the card\n- `unit` (string); default: \"visits\" — Noun displayed beside the headline number\n- `format` ((n: number) => string); default: rounded Intl.NumberFormat — Formats the headline, tooltip values, and screen-reader table\n- `height` (number); default: 132 — Chart height in pixels\n- `animated` (boolean); default: true — Count-up and column entrance animations (disabled for reduced motion)\n- `className` (string); default: \"\" — Additional CSS classes for the card\n- `TrafficRange.points` (TrafficPoint[]) — One column per entry, ordered oldest to newest\n- `TrafficPoint.values` (Record<string, number>) — Channel id → visits for that interval\n- `TrafficChannel.color` (string) — Optional CSS color; defaults to the built-in traffic palette\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/traffic-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
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
  },
  {
    "id": "typewriter-button",
    "name": "Typewriter Button",
    "tagline": "Character-by-character reveal with mechanical sound feedback",
    "description": "An interactive button that reveals its label character-by-character with optional synthesized mechanical audio feedback.",
    "category": "Buttons",
    "badges": [
      "Web Audio API",
      "Framer Motion",
      "Tactile Audio",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/typewriter-button",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Typewriter Button component into my project.\n\nAn interactive button that reveals its label character-by-character with optional synthesized mechanical audio feedback.\n\nCategory: Buttons.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/typewriter-button\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { TypewriterButton } from \"@/components/ui/typewriter-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <TypewriterButton soundEnabled variant=\"primary\">\n        npm install @easyui/react\n      </TypewriterButton>\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `children` (string) — Label text to type out\n- `charDuration` (number); default: 75 — Milliseconds per character reveal\n- `soundEnabled` (boolean); default: false — Enables mechanical keystroke sound cues\n- `soundVolume` (number); default: 0.25 — Web Audio synthesizer output volume (0 to 1)\n- `variant` ('primary' | 'secondary' | 'outline'); default: 'primary' — Styling appearance\n- `autoStart` (boolean); default: false — Begins typing immediately upon mounting\n- `onComplete` (() => void); default: undefined — Callback on typing completion\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/typewriter-button.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8bdfd2b9eec9ed3c2607c8f5c60c19cda327100285af2d91d1cf92a3704e2c4a",
    "features": [
      "Progressive character-by-character typewriter reveal with blinking cursor",
      "Synthesized mechanical click sound generated dynamically via Web Audio API (zero audio file assets)",
      "Configurable typing speed, sound volume, variants, and auto-start mode",
      "Full accessibility with complete aria-label announcement and keyboard triggers"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "description": "Label text to type out"
      },
      {
        "name": "charDuration",
        "type": "number",
        "default": "75",
        "description": "Milliseconds per character reveal"
      },
      {
        "name": "soundEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Enables mechanical keystroke sound cues"
      },
      {
        "name": "soundVolume",
        "type": "number",
        "default": "0.25",
        "description": "Web Audio synthesizer output volume (0 to 1)"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline'",
        "default": "'primary'",
        "description": "Styling appearance"
      },
      {
        "name": "autoStart",
        "type": "boolean",
        "default": "false",
        "description": "Begins typing immediately upon mounting"
      },
      {
        "name": "onComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback on typing completion"
      }
    ],
    "accessibility": [
      "Always contains full text in aria-label to prevent truncated screen reader speech",
      "Respects reduced motion by immediately rendering full text if desired",
      "Interactive <button> element with standard keyboard activation"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { TypewriterButton } from \"@/components/ui/typewriter-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <TypewriterButton soundEnabled variant=\"primary\">\n        npm install @easyui/react\n      </TypewriterButton>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/TypewriterButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/typewriter-button.tsx"
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
  },
  {
    "id": "undo-toast",
    "name": "Undo Toast",
    "tagline": "Refined undo notification with real-time countdown progress and reversal animation",
    "description": "An advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.",
    "category": "Feedback",
    "badges": [
      "Notification",
      "Feedback",
      "Timer Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/undo-toast",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Undo Toast component into my project.\n\nAn advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/undo-toast\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { UndoToast } from \"@/components/ui/undo-toast\";\n\nexport function Demo() {\n  const [show, setShow] = useState(true);\n\n  return (\n    <UndoToast\n      open={show}\n      title=\"File deleted\"\n      description=\"Item moved to trash\"\n      duration={5000}\n      onUndo={() => console.log('Action reversed')}\n      onDismiss={() => setShow(false)}\n    />\n  );\n}\n```\n\nDeclared props:\n- `open` (boolean); default: true — Visibility state of the undo toast\n- `title` (string); default: 'Project archived' — Primary notification message title\n- `description` (string); default: 'Changes will be permanent in a few seconds' — Optional descriptive subtitle\n- `undoLabel` (string); default: 'Undo' — Label for undo action trigger\n- `restoredMessage` (string); default: 'Restored successfully' — Title displayed when action has been reversed\n- `duration` (number); default: 5000 — Duration in milliseconds before auto-dismissal\n- `variant` ('default' | 'success' | 'warning' | 'error' | 'info'); default: 'default' — Semantic visual tone\n- `position` ('top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'); default: 'bottom-center' — Screen placement\n- `onUndo` (() => void); default: undefined — Callback fired when user clicks Undo\n- `onDismiss` (() => void); default: undefined — Callback fired when toast closes or expires\n- `showProgress` (boolean); default: true — Whether to show the countdown bar\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/undo-toast.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "2927c757d4a94cb7c6754088369b24bbc4137ea89f542489d22af86e779fdc8d",
    "features": [
      "Real-time smooth countdown progress bar illustrating time window remaining",
      "Intelligent pause-on-hover physics so users never miss undo deadlines",
      "Visual state morphing upon clicking Undo before gentle dismissal",
      "Configurable multi-corner positioning (top, bottom, center, corners)",
      "Multiple semantically tinted variants: Default, Success, Warning, Error, and Info"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "true",
        "description": "Visibility state of the undo toast"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Project archived'",
        "description": "Primary notification message title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Changes will be permanent in a few seconds'",
        "description": "Optional descriptive subtitle"
      },
      {
        "name": "undoLabel",
        "type": "string",
        "default": "'Undo'",
        "description": "Label for undo action trigger"
      },
      {
        "name": "restoredMessage",
        "type": "string",
        "default": "'Restored successfully'",
        "description": "Title displayed when action has been reversed"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5000",
        "description": "Duration in milliseconds before auto-dismissal"
      },
      {
        "name": "variant",
        "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
        "default": "'default'",
        "description": "Semantic visual tone"
      },
      {
        "name": "position",
        "type": "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        "default": "'bottom-center'",
        "description": "Screen placement"
      },
      {
        "name": "onUndo",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Undo"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when toast closes or expires"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the countdown bar"
      }
    ],
    "accessibility": [
      "ARIA live role=\"status\" announcements for screen readers",
      "Full keyboard accessibility for Undo and Close buttons",
      "Respects reduced motion preferences by bypassing entry translations"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { UndoToast } from \"@/components/ui/undo-toast\";\n\nexport function Demo() {\n  const [show, setShow] = useState(true);\n\n  return (\n    <UndoToast\n      open={show}\n      title=\"File deleted\"\n      description=\"Item moved to trash\"\n      duration={5000}\n      onUndo={() => console.log('Action reversed')}\n      onDismiss={() => setShow(false)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/UndoToast.tsx",
        "type": "registry:ui",
        "target": "components/ui/undo-toast.tsx"
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
  },
  {
    "id": "unfold-accordion",
    "name": "UnfoldAccordion",
    "tagline": "Content unfolds with chevron and spacing",
    "description": "An accordion whose content unfolds with the chevron and spacing moving together. The chevron rotates 180° while the content height expands and the inner content slides up to close the gap, producing a single, fluid motion.",
    "category": "Feedback",
    "badges": [
      "Coordinated Motion",
      "Spring Height",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/unfold-accordion",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI UnfoldAccordion component into my project.\n\nAn accordion whose content unfolds with the chevron and spacing moving together. The chevron rotates 180° while the content height expands and the inner content slides up to close the gap, producing a single, fluid motion.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/unfold-accordion\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { UnfoldAccordion } from \"@/components/ui/unfold-accordion\";\n\nexport function Demo() {\n  return (\n    <UnfoldAccordion\n      defaultOpen={[\"design\"]}\n      items={[\n        {\n          id: \"design\",\n          title: \"Design tokens\",\n          subtitle: \"Foundations\",\n          content: \"A small set of variables for color, type, and spacing. Each token is named for its role, not its value, so themes can be swapped without rewriting components.\",\n        },\n        {\n          id: \"motion\",\n          title: \"Motion language\",\n          subtitle: \"Spring physics\",\n          content: \"Every transition is a spring with explicit mass, stiffness, and damping. Linear easing is reserved for color and opacity only.\",\n        },\n        {\n          id: \"shipping\",\n          title: \"Shipping workflow\",\n          subtitle: \"From sync to deploy\",\n          content: \"Run component:sync to regenerate the registry, then push. The CI workflow re-validates and re-syncs on every PR.\",\n        },\n      ]}\n    />\n  );\n}\n```\n\nDeclared props:\n- `items` (UnfoldAccordionItem[]); default: [] — Array of accordion items\n- `allowMultiple` (boolean); default: false — Allow multiple items open at once\n- `defaultOpen` (string[]); default: [] — Ids of items open by default\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/unfold-accordion.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "db1b5f9b0ea6d4cab1c9fef3e7871d8064ba5b0fa9b2196c11ccf2b7c59fe9fa",
    "features": [
      "Chevron rotation, content height, and inner content slide are tuned to overlap",
      "Inner content uses a slightly faster ease so it \"leads\" the chevron by a hair",
      "Spring-based height expansion (springGentle) for a calm, continuous feel",
      "Single-open by default; allowMultiple for multi-open mode",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "items",
        "type": "UnfoldAccordionItem[]",
        "default": "[]",
        "description": "Array of accordion items"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allow multiple items open at once"
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "default": "[]",
        "description": "Ids of items open by default"
      }
    ],
    "accessibility": [
      "aria-expanded reflects open state on the trigger button",
      "Native <button> semantics for keyboard activation",
      "Focus-ring visible on keyboard navigation"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { UnfoldAccordion } from \"@/components/ui/unfold-accordion\";\n\nexport function Demo() {\n  return (\n    <UnfoldAccordion\n      defaultOpen={[\"design\"]}\n      items={[\n        {\n          id: \"design\",\n          title: \"Design tokens\",\n          subtitle: \"Foundations\",\n          content: \"A small set of variables for color, type, and spacing. Each token is named for its role, not its value, so themes can be swapped without rewriting components.\",\n        },\n        {\n          id: \"motion\",\n          title: \"Motion language\",\n          subtitle: \"Spring physics\",\n          content: \"Every transition is a spring with explicit mass, stiffness, and damping. Linear easing is reserved for color and opacity only.\",\n        },\n        {\n          id: \"shipping\",\n          title: \"Shipping workflow\",\n          subtitle: \"From sync to deploy\",\n          content: \"Run component:sync to regenerate the registry, then push. The CI workflow re-validates and re-syncs on every PR.\",\n        },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/UnfoldAccordion.tsx",
        "type": "registry:ui",
        "target": "components/ui/unfold-accordion.tsx"
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
    ],
    "featured": true
  },
  {
    "id": "velocity-toast",
    "name": "VelocityToast",
    "tagline": "Enters with velocity, settles naturally",
    "description": "A toast that enters with velocity and settles, with a progress indicator that responds naturally — pauses on hover, resumes with no jump, and eases slightly in the final 10% so dismissal feels intentional.",
    "category": "Feedback",
    "badges": [
      "Velocity Entry",
      "Natural Progress",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/velocity-toast",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI VelocityToast component into my project.\n\nA toast that enters with velocity and settles, with a progress indicator that responds naturally — pauses on hover, resumes with no jump, and eases slightly in the final 10% so dismissal feels intentional.\n\nCategory: Feedback.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/velocity-toast\n\nDependencies (install only those missing): framer-motion, lucide-react.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useState } from \"react\";\nimport { VelocityToast } from \"@/components/ui/velocity-toast\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Show toast</PressButton>\n      <VelocityToast\n        open={open}\n        onDismiss={() => setOpen(false)}\n        title=\"File uploaded\"\n        description=\"easyui-2026-09.zip is ready.\"\n        variant=\"success\"\n        position=\"bottom-right\"\n      />\n    </>\n  );\n}\n```\n\nDeclared props:\n- `open` (boolean); default: undefined — Whether the toast is visible\n- `onDismiss` (() => void); default: undefined — Called when toast is dismissed (auto or manual)\n- `title` (string); default: undefined — Toast title\n- `description` (string); default: undefined — Secondary description\n- `duration` (number); default: 4000 — Auto-dismiss duration in ms\n- `variant` ('default' | 'success' | 'warning' | 'error' | 'info'); default: 'default' — Visual tone\n- `position` (VelocityToastPosition); default: 'bottom-center' — Screen placement\n- `showProgress` (boolean); default: true — Show countdown progress bar\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/velocity-toast.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "6338ea46d7f4c06dafa2e28e5e77819be4d8571e9d426971de6f1840bb44f9ce",
    "features": [
      "Entry animation starts further out (y: 22px) for higher perceived velocity, then springs to rest",
      "Progress indicator uses a slight ease-in (pow 1.05) so the final 10% feels decisive",
      "Hover pauses progress without visual jump; resume picks up from the remaining time",
      "6 position presets, 5 variant tones, optional custom icon",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Whether the toast is visible"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Called when toast is dismissed (auto or manual)"
      },
      {
        "name": "title",
        "type": "string",
        "default": "undefined",
        "description": "Toast title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Secondary description"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "4000",
        "description": "Auto-dismiss duration in ms"
      },
      {
        "name": "variant",
        "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
        "default": "'default'",
        "description": "Visual tone"
      },
      {
        "name": "position",
        "type": "VelocityToastPosition",
        "default": "'bottom-center'",
        "description": "Screen placement"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Show countdown progress bar"
      }
    ],
    "accessibility": [
      "role=\"status\" with aria-live=\"polite\" for screen readers",
      "Hover pause is non-disruptive — no focus traps or input blocking",
      "Visual close button is keyboard-reachable with focus-ring"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { useState } from \"react\";\nimport { VelocityToast } from \"@/components/ui/velocity-toast\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Show toast</PressButton>\n      <VelocityToast\n        open={open}\n        onDismiss={() => setOpen(false)}\n        title=\"File uploaded\"\n        description=\"easyui-2026-09.zip is ready.\"\n        variant=\"success\"\n        position=\"bottom-right\"\n      />\n    </>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/VelocityToast.tsx",
        "type": "registry:ui",
        "target": "components/ui/velocity-toast.tsx"
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
  },
  {
    "id": "wallet-balance",
    "name": "Wallet Balance",
    "tagline": "Interactive payment cards tucked into a leather pouch with eye-toggle balance obscuring",
    "description": "An interactive wallet balance component where branded cards tuck neatly into an embossed leather pouch with spring physics. Tap the eye button to reveal or mask balances with smooth blur-crossfade transitions.",
    "category": "Motion",
    "badges": [
      "Wallet",
      "Spring Physics",
      "Privacy Eye",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/wallet-balance",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Wallet Balance component into my project.\n\nAn interactive wallet balance component where branded cards tuck neatly into an embossed leather pouch with spring physics. Tap the eye button to reveal or mask balances with smooth blur-crossfade transitions.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/wallet-balance\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { WalletBalance } from \"@/components/ui/wallet-balance\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <WalletBalance />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `accounts` (WalletAccount[]); default: DEFAULT_ACCOUNTS — Array of up to 3 accounts displaying logo, balance, and custom colors\n- `visible` (boolean); default: undefined — Controlled visibility state for balances and cards\n- `defaultVisible` (boolean); default: true — Uncontrolled initial visibility state\n- `onVisibleChange` ((visible: boolean) => void); default: undefined — Callback fired when balance visibility is toggled\n- `currency` (string); default: 'USD' — ISO currency symbol used for formatted card amounts\n- `locale` (string); default: 'en-US' — Locale string for number formatting\n- `totalLabel` (string); default: 'Total Balance' — Caption label displayed below the total balance figure\n- `className` (string); default: '' — Optional CSS class overrides for the outer container\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/wallet-balance.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "d1fd5568f110fb939a4a2bee5b251f01b0d9f73b609e35cd8fd496e2983ddc37",
    "features": [
      "Interactive eye-toggle button to reveal or mask balances with blur-crossfade and popLayout transitions",
      "Staggered spring animations for fanning out and tucking cards into the pouch",
      "Responsive stage scaling with ResizeObserver for crisp rendering on any viewport width",
      "Customizable accounts array with brand marks, individual balances, and background themes",
      "Full accessibility support with aria-pressed, live screen reader announcements, and prefers-reduced-motion"
    ],
    "props": [
      {
        "name": "accounts",
        "type": "WalletAccount[]",
        "default": "DEFAULT_ACCOUNTS",
        "description": "Array of up to 3 accounts displaying logo, balance, and custom colors"
      },
      {
        "name": "visible",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled visibility state for balances and cards"
      },
      {
        "name": "defaultVisible",
        "type": "boolean",
        "default": "true",
        "description": "Uncontrolled initial visibility state"
      },
      {
        "name": "onVisibleChange",
        "type": "(visible: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when balance visibility is toggled"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'USD'",
        "description": "ISO currency symbol used for formatted card amounts"
      },
      {
        "name": "locale",
        "type": "string",
        "default": "'en-US'",
        "description": "Locale string for number formatting"
      },
      {
        "name": "totalLabel",
        "type": "string",
        "default": "'Total Balance'",
        "description": "Caption label displayed below the total balance figure"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional CSS class overrides for the outer container"
      }
    ],
    "accessibility": [
      "Toggle button provides aria-pressed and dynamic aria-label (\"Show balances\" / \"Hide balances\")",
      "Polite aria-live region announces total balance changes when revealed or hidden",
      "Card graphics and pocket SVG elements are marked aria-hidden to eliminate screen reader noise",
      "Full keyboard navigation with visible focus outline on the interactive eye toggle",
      "Respects prefers-reduced-motion with instant transitions and zero blur effects"
    ],
    "createdAt": "2026-10-14",
    "usageCode": "import { WalletBalance } from \"@/components/ui/wallet-balance\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <WalletBalance />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/WalletBalance.tsx",
        "type": "registry:ui",
        "target": "components/ui/wallet-balance.tsx"
      }
    ]
  },
  {
    "id": "wallet-card",
    "name": "Wallet Card",
    "tagline": "Dark wallet card with pointer-driven cyan shine",
    "description": "A premium dark wallet card with a blue radial-gradient surface, live balance display, iOS-style toggle, and a primary action button. The card surface responds to the pointer with a soft cyan shine driven entirely by MotionValues.",
    "category": "Motion",
    "badges": [
      "Pointer Shine",
      "Spring Tap",
      "Painted Surface"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/wallet-card",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Wallet Card component into my project.\n\nA premium dark wallet card with a blue radial-gradient surface, live balance display, iOS-style toggle, and a primary action button. The card surface responds to the pointer with a soft cyan shine driven entirely by MotionValues.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/wallet-card\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { WalletCard } from \"@/components/ui/wallet-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <WalletCard\n        balance=\"$4,566.00\"\n        cardType=\"Mastercard\"\n        cardLastFour=\"3040\"\n        buttonLabel=\"Use Wallet\"\n        onUseWallet={() => console.log('wallet used')}\n        balanceLabel=\"Total Balance\"\n      />\n    </div>\n  );\n}\n```\n\nDeclared props:\n- `balance` (string); default: '$4,566.00' — Headline balance figure rendered as the dominant type\n- `cardType` (string); default: 'Mastercard' — Card brand label shown in the subtitle\n- `cardLastFour` (string); default: '3040' — Last four digits of the underlying card\n- `buttonLabel` (string); default: 'Use Wallet' — Label for the primary action button\n- `onUseWallet` (() => void); default: undefined — Click handler for the action button\n- `disabled` (boolean); default: false — Disable the action button\n- `balanceLabel` (string); default: 'Total Balance' — Small caption under the balance figure\n- `className` (string); default: undefined — Additional Tailwind classes merged into the card root\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/wallet-card.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "8a81b93dec681411713a6b9cfedede5bd3074061836198ab7430ee804fb9022f",
    "features": [
      "Live balance figure with iOS-style toggle and primary action button",
      "Painted blue radial-gradient surface with diagonal specular sweep and outer glow",
      "Pointer-driven cyan shine — same MotionValue architecture as SpotlightCard",
      "Spring-tap response on the action button (0.97 scale)",
      "Full keyboard support and visible focus outline on the button",
      "Respects prefers-reduced-motion — shine is skipped, button tap is disabled",
      "Responsive aspect ratio; surface adapts without layout shift"
    ],
    "props": [
      {
        "name": "balance",
        "type": "string",
        "default": "'$4,566.00'",
        "description": "Headline balance figure rendered as the dominant type"
      },
      {
        "name": "cardType",
        "type": "string",
        "default": "'Mastercard'",
        "description": "Card brand label shown in the subtitle"
      },
      {
        "name": "cardLastFour",
        "type": "string",
        "default": "'3040'",
        "description": "Last four digits of the underlying card"
      },
      {
        "name": "buttonLabel",
        "type": "string",
        "default": "'Use Wallet'",
        "description": "Label for the primary action button"
      },
      {
        "name": "onUseWallet",
        "type": "() => void",
        "default": "undefined",
        "description": "Click handler for the action button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disable the action button"
      },
      {
        "name": "balanceLabel",
        "type": "string",
        "default": "'Total Balance'",
        "description": "Small caption under the balance figure"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the card root"
      }
    ],
    "accessibility": [
      "Semantic <article> root with descriptive title and subtitle",
      "Native <button> for the action with aria-label and visible focus outline",
      "Pointer shine is purely decorative — aria-hidden on all glow layers",
      "prefers-reduced-motion fallback: shine is never tracked, button tap is skipped"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { WalletCard } from \"@/components/ui/wallet-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <WalletCard\n        balance=\"$4,566.00\"\n        cardType=\"Mastercard\"\n        cardLastFour=\"3040\"\n        buttonLabel=\"Use Wallet\"\n        onUseWallet={() => console.log('wallet used')}\n        balanceLabel=\"Total Balance\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/WalletCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/wallet-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "wave-transition",
    "name": "Wave Transition",
    "tagline": "Carry the interface forward on a smooth wave of color",
    "description": "A source-aware view transition with a soft rainbow light wave, refracted color, and theme-friendly edge glow.",
    "category": "Motion",
    "badges": [
      "View Transition",
      "Motion",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/wave-transition",
    "installPrompt": "## Task\n\nInstall and integrate the EasyUI Wave Transition component into my project.\n\nA source-aware view transition with a soft rainbow light wave, refracted color, and theme-friendly edge glow.\n\nCategory: Motion.\n\n## Before you change anything\n\nInspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.\n\n## Compatibility check\n\nCompare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.\n\n## Install\n\nnpx shadcn@latest add Surajmaurya1/easyui/wave-transition\n\nDependencies (install only those missing): framer-motion.\n\n## Usage\n\nImport path and example from component metadata:\n\n```tsx\nimport { useRef, useState } from \"react\";\nimport { WaveTransition } from \"@/components/ui/WaveTransition\";\n\nexport function Demo() {\n  const [revealed, setRevealed] = useState(false);\n  const triggerRef = useRef<HTMLButtonElement>(null);\n\n  return (\n    <WaveTransition\n      revealed={revealed}\n      revealedContent={<div className=\"grid h-64 place-items-center\">New view</div>}\n      source={triggerRef}\n      palette=\"rainbow\"\n      overlay={(\n        <button ref={triggerRef} onClick={() => setRevealed((value) => !value)}>\n          Toggle view\n        </button>\n      )}\n    >\n      <div className=\"grid h-64 place-items-center\">Current view</div>\n    </WaveTransition>\n  );\n}\n```\n\nDeclared props:\n- `revealed` (boolean); default: required — Controls which view is shown and the wave direction\n- `revealedContent` (React.ReactNode); default: required — The view revealed by the wave\n- `children` (React.ReactNode); default: required — The starting view\n- `type` (\"vertical\" | \"horizontal\" | \"center\"); default: \"vertical\" — Wave shape and default origin\n- `source` (React.RefObject<HTMLElement | null>); default: undefined — Optional element whose center anchors the wave\n- `palette` (WavePalette); default: \"colorful\" — Colorful, rainbow, ocean, sunset, green, mono, or three custom colors\n- `duration` (number); default: 1.1 — Outgoing wave duration in seconds; return is 25% faster\n- `overlay` (React.ReactNode); default: undefined — Persistent content layered above both views\n- `onFinish` ((revealed: boolean) => void); default: undefined — Called when the wave finishes\n\n## Unverified items\n\nRequired setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: https://easyui.site/r/wave-transition.json\n\n## Rules for you (the agent)\n\nKeep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.\n\n## Verify\n\nRun the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.\n\n## Report\n\nReport files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.\n",
    "installPromptHash": "c6d9c89192010d12166e1d09da1cfa3028c10276c374e2c6174ac3f48c874d68",
    "features": [
      "Vertical, horizontal, and center-origin wave geometry",
      "Optional source element anchors the reveal to its measured center",
      "Organic rainbow light wash and six configurable color palettes",
      "Color and edge glow remain visible on light and dark surfaces",
      "Controlled revealed state with completion callback",
      "Reduced-motion mode replaces the expanding clip with a simple fade"
    ],
    "props": [
      {
        "name": "revealed",
        "type": "boolean",
        "default": "required",
        "description": "Controls which view is shown and the wave direction"
      },
      {
        "name": "revealedContent",
        "type": "React.ReactNode",
        "default": "required",
        "description": "The view revealed by the wave"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "required",
        "description": "The starting view"
      },
      {
        "name": "type",
        "type": "\"vertical\" | \"horizontal\" | \"center\"",
        "default": "\"vertical\"",
        "description": "Wave shape and default origin"
      },
      {
        "name": "source",
        "type": "React.RefObject<HTMLElement | null>",
        "default": "undefined",
        "description": "Optional element whose center anchors the wave"
      },
      {
        "name": "palette",
        "type": "WavePalette",
        "default": "\"colorful\"",
        "description": "Colorful, rainbow, ocean, sunset, green, mono, or three custom colors"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "1.1",
        "description": "Outgoing wave duration in seconds; return is 25% faster"
      },
      {
        "name": "overlay",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Persistent content layered above both views"
      },
      {
        "name": "onFinish",
        "type": "(revealed: boolean) => void",
        "default": "undefined",
        "description": "Called when the wave finishes"
      }
    ],
    "accessibility": [
      "The inactive view is hidden from assistive technology and made inert",
      "Respects prefers-reduced-motion by skipping the clip-path expansion",
      "Overlay controls remain interactive above the transitioning views"
    ],
    "createdAt": "2026-11-18",
    "usageCode": "import { useRef, useState } from \"react\";\nimport { WaveTransition } from \"@/components/ui/WaveTransition\";\n\nexport function Demo() {\n  const [revealed, setRevealed] = useState(false);\n  const triggerRef = useRef<HTMLButtonElement>(null);\n\n  return (\n    <WaveTransition\n      revealed={revealed}\n      revealedContent={<div className=\"grid h-64 place-items-center\">New view</div>}\n      source={triggerRef}\n      palette=\"rainbow\"\n      overlay={(\n        <button ref={triggerRef} onClick={() => setRevealed((value) => !value)}>\n          Toggle view\n        </button>\n      )}\n    >\n      <div className=\"grid h-64 place-items-center\">Current view</div>\n    </WaveTransition>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/WaveTransition.tsx",
        "type": "registry:ui",
        "target": "components/ui/wave-transition.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  }
];
