// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
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
};

export default component;
