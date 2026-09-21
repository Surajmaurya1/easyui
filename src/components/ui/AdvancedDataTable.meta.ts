import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Advanced Data Table',
  description: 'A powerful, accessible data table component with multi-column sorting, faceted filters, global search, row selection, bulk actions, expandable sub-rows, and pagination.',
  category: 'Forms',
  tagline: 'Enterprise-grade data table with sorting, filtering, selection, and expandable rows',
  badges: ['Table', 'Interactive', 'Enterprise', 'Accessible'],
  createdAt: '2026-09-21T10:00:00.000Z',
  features: [
    'Multi-state column sorting with clean directional indicator icons',
    'Global live search with instant filtering across all data fields',
    'Faceted filter chips with multi-selection and reset counters',
    'Indeterminate select-all checkbox, row selection, and animated bulk actions drawer',
    'Smooth Framer Motion expandable rows for nested data and telemetry inspection',
    'Configurable pagination with page size dropdown and first/last page jump buttons',
    'Dynamic column visibility toggle menu to hide or show columns on demand',
    'Polished skeleton loading and informative empty state with clear filters trigger',
  ],
  props: [
    { name: 'data', type: 'T[]', default: '[]', description: 'Array of data records to render in the table' },
    { name: 'columns', type: 'ColumnDef<T>[]', default: '[]', description: 'Column configuration defining headers, accessors, sorting, filtering, and custom cell renderers' },
    { name: 'title', type: 'string', default: 'undefined', description: 'Optional table title displayed in the toolbar' },
    { name: 'searchPlaceholder', type: 'string', default: "'Search records...'", description: 'Placeholder text for the global search input' },
    { name: 'defaultPageSize', type: 'number', default: '10', description: 'Initial number of records to show per page' },
    { name: 'renderSubComponent', type: '(row: T) => ReactNode', default: 'undefined', description: 'Render prop function for expandable row sub-details' },
    { name: 'onBulkDelete', type: '(selectedIds: string[]) => void', default: 'undefined', description: 'Callback fired when user executes bulk deletion' },
    { name: 'onBulkExport', type: '(selectedIds: string[]) => void', default: 'undefined', description: 'Callback fired when user clicks bulk export' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Renders animated skeleton placeholders when true' },
    { name: 'error', type: 'string | null', default: 'null', description: 'Renders an error state banner when present' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom Tailwind class names for styling overrides' },
  ],
  accessibility: [
    'Uses semantic HTML <table>, <thead>, <tbody>, <th>, <tr>, <td> elements with appropriate ARIA attributes',
    'Select-all checkbox supports aria-label and programmatic HTML indeterminate state',
    'Expandable row triggers declare aria-expanded and descriptive screen-reader labels',
    'Sortable header buttons announce current sort direction via text and icons',
    'Full keyboard navigation support with visible focus rings on all interactive elements',
  ],
  usageCode: `import { AdvancedDataTable, type ColumnDef } from "@/components/ui/advanced-data-table";

interface UserRecord {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'pending';
}

const columns: ColumnDef<UserRecord>[] = [
  { id: 'name', header: 'User', accessorKey: 'name', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status', filterable: true },
];

export function Demo() {
  const data: UserRecord[] = [
    { id: '1', name: 'Alex Chen', role: 'Engineer', status: 'active' },
    { id: '2', name: 'Elena Rostova', role: 'Designer', status: 'pending' },
  ];

  return (
    <AdvancedDataTable
      title="Team Members"
      data={data}
      columns={columns}
      onBulkDelete={(ids) => console.log('Delete:', ids)}
    />
  );
}`,
};

export default meta;
