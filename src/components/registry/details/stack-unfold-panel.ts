// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
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
};

export default component;
