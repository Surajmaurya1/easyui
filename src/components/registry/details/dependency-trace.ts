// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
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
};

export default component;
