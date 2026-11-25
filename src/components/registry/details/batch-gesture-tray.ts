// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
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
};

export default component;
