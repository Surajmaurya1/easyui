import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Data Table',
  description:
    'A sortable, searchable data table with sticky headers, row selection and range selection, animated bulk actions, paging, responsive stacked cards, and ready-made sparkline and delta cells.',
  category: 'Forms',
  tagline: 'Sortable, searchable table that becomes stacked cards on mobile',
  badges: ['Table', 'Data', 'Responsive', 'Accessible'],
  createdAt: '2026-11-11',
  features: [
    'Three-state column sorting (ascending, descending, off) with natural string comparison and nulls last',
    'Sticky header with a subtle elevation shadow once the table is scrolled',
    'Row selection with select-all, indeterminate state, shift-click ranges, and an animated bulk-action bar',
    'Animated row reordering on sort using Framer Motion layout transitions',
    'Search across every column accessor, or supply extra searchable text per row',
    'Show-more paging, an informative empty state, and a clear-search action',
    'Responsive layout: below the card breakpoint rows become stacked cards with a dedicated sort menu',
    'Sparkline and DeltaPill cell helpers for trend and percentage-change columns',
  ],
  props: [
    { name: 'rows', type: 'T[]', default: 'required', description: 'Rows to render. Each row must include a stable id' },
    { name: 'columns', type: 'DataTableColumn<T>[]', default: 'required', description: 'Column definitions with headers, accessors, custom cells, alignment, widths, and mobile behavior' },
    { name: 'getRowLabel', type: '(row: T) => string', default: 'String(row.id)', description: 'Readable row name used by checkbox labels and screen readers' },
    { name: 'selectable', type: 'boolean', default: 'true', description: 'Enables row selection, select-all, and the bulk-action bar' },
    { name: 'searchable', type: 'boolean', default: 'true', description: 'Shows the search field that filters rows' },
    { name: 'searchPlaceholder', type: 'string', default: "'Search…'", description: 'Placeholder text for the search field' },
    { name: 'searchText', type: '(row: T) => string', default: 'undefined', description: 'Extra text to match when searching beyond the column accessors' },
    { name: 'defaultSort', type: 'SortState', default: 'null', description: 'Initial sort used when the sort prop is not controlled' },
    { name: 'sort', type: 'SortState', default: 'undefined', description: 'Controlled sort state' },
    { name: 'onSortChange', type: '(sort: SortState) => void', default: 'undefined', description: 'Callback fired whenever the sort changes' },
    { name: 'selected', type: 'Id[]', default: 'undefined', description: 'Controlled selection state' },
    { name: 'onSelectionChange', type: '(ids: Id[]) => void', default: 'undefined', description: 'Callback fired whenever the selection changes' },
    { name: 'bulkActions', type: '(selectedIds: Id[]) => ReactNode', default: 'undefined', description: 'Buttons rendered in the bar while rows are selected' },
    { name: 'toolbar', type: 'ReactNode', default: 'undefined', description: 'Extra controls rendered on the right side of the toolbar' },
    { name: 'pageSize', type: 'number', default: '20', description: 'Rows shown initially and revealed per "Show more" click. Infinity shows all rows' },
    { name: 'maxHeight', type: 'number', default: '520', description: 'Table scroll height in pixels before the header sticks' },
    { name: 'density', type: "'comfortable' | 'compact'", default: "'comfortable'", description: 'Row padding and minimum height' },
    { name: 'cardBreakpoint', type: 'number', default: '640', description: 'Width below which rows render as stacked cards' },
    { name: 'onRowClick', type: '(row: T) => void', default: 'undefined', description: 'Makes rows interactive and keyboard-activatable' },
    { name: 'emptyState', type: 'ReactNode', default: 'undefined', description: 'Custom content shown when no rows match' },
    { name: 'ariaLabel', type: 'string', default: "'Data table'", description: 'Accessible name for the table region' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom Tailwind class names for the outer wrapper' },
  ],
  accessibility: [
    'Uses table, row, columnheader, and cell roles with aria-rowcount, aria-colcount, aria-rowindex, and aria-sort',
    'Select-all checkbox exposes a mixed aria-checked state and every row checkbox names its row',
    'Sortable headers are real buttons with visible focus rings and announced sort direction through a live status region',
    'On mobile the sort control is a labelled native select that keeps keyboard and screen-reader support',
    'Reduced motion disables row layout animation while preserving all functionality',
  ],
  usageCode: `import { DataTable, Sparkline, DeltaPill, type DataTableColumn } from "@/components/ui/data-table";

interface Product {
  id: number;
  name: string;
  revenue: number;
  trend: number[];
  change: number;
}

const columns: DataTableColumn<Product>[] = [
  { key: "name", header: "Product", primary: true },
  {
    key: "revenue",
    header: "Revenue",
    align: "right",
    cell: (row) => <span className="tabular-nums">\${row.revenue.toLocaleString()}</span>,
  },
  { key: "trend", header: "Trend", sortable: false, cell: (row) => <Sparkline data={row.trend} /> },
  { key: "change", header: "Change", align: "right", cell: (row) => <DeltaPill value={row.change} /> },
];

export function Demo() {
  return (
    <DataTable
      rows={rows}
      columns={columns}
      getRowLabel={(row) => row.name}
      defaultSort={{ key: "revenue", dir: "desc" }}
      bulkActions={(ids) => <button type="button">Export {ids.length}</button>}
    />
  );
}`,
};

export default meta;
