// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
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
};

export default component;
