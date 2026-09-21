import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Download,
  AlertCircle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// =============================================================================
// DESIGN SYSTEM CONSTANTS & SPRING TOKENS
// =============================================================================

const SPRING_PHYSICS = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 32,
  mass: 0.6,
};

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type SortDirection = 'asc' | 'desc' | null;
export type DataTableViewMode = 'auto' | 'table' | 'cards';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: (info: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  width?: string;
  align?: 'left' | 'center' | 'right';
  priority?: 'high' | 'medium' | 'low';
}

export interface DataTableContextValue<T = any> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T, index: number) => string;
  // View Mode
  viewMode: DataTableViewMode;
  setViewMode: (mode: DataTableViewMode) => void;
  // Sorting
  sortColumn: string | null;
  sortDirection: SortDirection;
  handleSort: (columnId: string) => void;
  // Searching & Filtering
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: Record<string, string[]>;
  toggleFilter: (columnId: string, value: string) => void;
  clearFilters: () => void;
  // Selection
  selectedRowIds: Set<string>;
  toggleRowSelection: (id: string) => void;
  toggleSelectAll: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  // Expandable Rows
  expandedRowIds: Set<string>;
  toggleRowExpansion: (id: string) => void;
  renderSubComponent?: (row: T) => React.ReactNode;
  // Column Visibility
  hiddenColumnIds: Set<string>;
  toggleColumnVisibility: (columnId: string) => void;
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  totalFilteredCount: number;
  paginatedData: T[];
  // Loading & State
  isLoading?: boolean;
  error?: string | null;
  accentColor?: string;
}

const DataTableContext = createContext<DataTableContextValue | null>(null);

export function useDataTable<T = any>() {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error('useDataTable must be used within <DataTable>');
  }
  return ctx as DataTableContextValue<T>;
}

// =============================================================================
// SUB-COMPONENTS (MINIMAL, SPATIOUS, GEIST FONT ONLY)
// =============================================================================

export interface DataTableToolbarProps {
  title?: string;
  searchPlaceholder?: string;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkExport?: (selectedIds: string[]) => void;
  className?: string;
}

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  title,
  searchPlaceholder = 'Search...',
  onBulkDelete,
  onBulkExport,
  className,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedRowIds,
    columns,
    hiddenColumnIds,
    toggleColumnVisibility,
    viewMode,
    setViewMode,
  } = useDataTable();

  const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false);
  const selectedCount = selectedRowIds.size;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('px-3.5 py-3 sm:px-7 sm:py-5 border-b border-border/50 space-y-3 sm:space-y-4 select-none', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Title or Selection Counter */}
        <div className="flex items-center gap-2.5 min-w-0">
          {title && (
            <h3 className="text-sm font-medium text-foreground tracking-tight truncate">
              {title}
            </h3>
          )}
          {selectedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/40 border border-border/40 text-xs text-foreground font-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              {selectedCount} selected
            </span>
          )}
        </div>

        {/* Global Search + Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64 min-w-0">
            <Search className="w-3.5 h-3.5 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 rounded-lg border border-border/60 bg-surface-raised/20 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border transition-colors font-sans"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
            className="p-1.5 sm:p-2 rounded-lg border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border transition-colors cursor-pointer shrink-0"
            title={viewMode === 'cards' ? 'Switch to Table view' : 'Switch to Cards view'}
            aria-label="Toggle view mode"
          >
            {viewMode === 'cards' ? <List className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
          </motion.button>

          {/* Column Visibility Menu */}
          <div className="relative shrink-0">
            <motion.button
              type="button"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              onClick={() => setIsColumnPickerOpen(!isColumnPickerOpen)}
              className="p-1.5 sm:p-2 rounded-lg border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border transition-colors cursor-pointer"
              title="Toggle columns"
              aria-label="Toggle visible columns"
              aria-expanded={isColumnPickerOpen}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </motion.button>

            {isColumnPickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 max-h-60 overflow-y-auto rounded-xl border border-border/70 bg-surface p-2 shadow-elevated z-30 font-sans">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1">
                  Columns
                </div>
                <div className="divide-y divide-border/40">
                  {columns.map((col) => {
                    const isVisible = !hiddenColumnIds.has(col.id);
                    return (
                      <label
                        key={col.id}
                        className="flex items-center gap-2 px-2 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-surface-hover/50 rounded-md cursor-pointer select-none font-normal"
                      >
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => toggleColumnVisibility(col.id)}
                          className="rounded border-border accent-foreground cursor-pointer"
                        />
                        <span className="truncate">{col.header}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING_PHYSICS}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-2.5 rounded-lg bg-surface-raised/30 border border-border/50 text-xs">
              <span className="text-xs text-muted-foreground font-normal">
                {selectedCount} item{selectedCount === 1 ? '' : 's'} selected:
              </span>
              <div className="flex items-center gap-2">
                {onBulkExport && (
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => onBulkExport(Array.from(selectedRowIds))}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 hover:bg-surface-hover text-foreground transition-colors text-xs font-normal cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export</span>
                  </motion.button>
                )}
                {onBulkDelete && (
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => onBulkDelete(Array.from(selectedRowIds))}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors text-xs font-normal cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface DataTableFiltersProps {
  className?: string;
}

export const DataTableFilters: React.FC<DataTableFiltersProps> = ({ className }) => {
  const { columns, activeFilters, toggleFilter, clearFilters } = useDataTable();

  const filterableColumns = columns.filter((c) => c.filterable && c.filterOptions && c.filterOptions.length > 0);
  const activeCount = Object.values(activeFilters).reduce((sum, vals) => sum + vals.length, 0);

  if (filterableColumns.length === 0) return null;

  return (
    <div className={cn('px-4 py-2 sm:px-7 sm:py-2.5 border-b border-border/50 bg-surface-raised/15 flex items-center gap-2 sm:gap-2.5 text-xs overflow-x-auto scrollbar-none sm:flex-wrap font-sans select-none', className)}>
      <span className="text-xs text-muted-foreground font-normal shrink-0">Filters:</span>

      {filterableColumns.map((col) => {
        const selectedValues = activeFilters[col.id] || [];
        return (
          <div key={col.id} className="flex items-center gap-1 bg-surface-raised/30 border border-border/50 p-0.5 rounded-lg shrink-0">
            <span className="text-xs text-muted-foreground px-2 font-normal">{col.header}:</span>
            {col.filterOptions?.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleFilter(col.id, opt.value)}
                  className={cn(
                    'px-2 py-0.5 rounded-md text-xs font-normal transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover/50'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        );
      })}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto shrink-0 cursor-pointer"
        >
          Reset ({activeCount})
        </button>
      )}
    </div>
  );
};

export interface DataTableContentProps {
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export const DataTableContent: React.FC<DataTableContentProps> = ({
  className,
  emptyTitle = 'No matching records found',
  emptyDescription = 'Try adjusting your search criteria or filters to locate what you are looking for.',
}) => {
  const {
    columns,
    paginatedData,
    hiddenColumnIds,
    getRowId,
    sortColumn,
    sortDirection,
    handleSort,
    selectedRowIds,
    toggleRowSelection,
    toggleSelectAll,
    isAllSelected,
    isIndeterminate,
    expandedRowIds,
    toggleRowExpansion,
    renderSubComponent,
    viewMode,
    isLoading,
    error,
    clearFilters,
  } = useDataTable();

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenColumnIds.has(col.id)),
    [columns, hiddenColumnIds]
  );

  if (error) {
    return (
      <div className="py-12 px-6 text-center flex flex-col items-center justify-center gap-2 font-sans">
        <AlertCircle className="w-5 h-5 text-rose-500" />
        <p className="text-sm font-medium text-foreground">Failed to load data</p>
        <p className="text-xs text-muted-foreground max-w-sm">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-3 font-sans">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-9 rounded-lg bg-surface-raised/30 animate-pulse" />
        ))}
      </div>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <div className="py-12 sm:py-16 px-6 text-center flex flex-col items-center justify-center gap-2 font-sans">
        <div className="w-9 h-9 rounded-full bg-surface-raised/40 border border-border/50 flex items-center justify-center text-muted-foreground mb-1">
          <Search className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-medium text-foreground">{emptyTitle}</h4>
        <p className="text-xs text-muted-foreground max-w-xs">{emptyDescription}</p>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-2 px-3 py-1 rounded-md border border-border/60 hover:bg-surface-hover text-xs text-foreground transition-colors cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    );
  }

  // CARDS VIEW
  if (viewMode === 'cards') {
    return (
      <div className={cn('p-3.5 sm:p-6 space-y-2.5 sm:space-y-3 font-sans', className)}>
        {paginatedData.map((row, index) => {
          const rowId = getRowId(row, index);
          const isSelected = selectedRowIds.has(rowId);
          const isExpanded = expandedRowIds.has(rowId);
          const primaryCol = visibleColumns[0];
          const primaryVal = primaryCol?.accessorKey
            ? row[primaryCol.accessorKey]
            : primaryCol?.accessorFn
            ? primaryCol.accessorFn(row)
            : null;
          const remainingCols = visibleColumns.slice(1);

          return (
            <div
              key={rowId}
              className={cn(
                'rounded-xl border border-border/60 bg-surface/30 p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 transition-colors',
                isSelected && 'bg-surface-raised/40 border-border'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRowSelection(rowId)}
                    aria-label={`Select row ${rowId}`}
                    className="rounded border-border accent-foreground cursor-pointer w-4 h-4 shrink-0"
                  />
                  <span className="font-medium text-xs text-foreground truncate">
                    {primaryCol?.cell
                      ? primaryCol.cell({ row, value: primaryVal })
                      : String(primaryVal ?? '')}
                  </span>
                </div>

                {renderSubComponent && (
                  <button
                    type="button"
                    onClick={() => toggleRowExpansion(rowId)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Collapse row details' : 'Expand row details'}
                  >
                    <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={SPRING_PHYSICS}>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>
                )}
              </div>

              {remainingCols.length > 0 && (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-border/40 text-xs">
                  {remainingCols.map((col) => {
                    const value = col.accessorKey
                      ? row[col.accessorKey]
                      : col.accessorFn
                      ? col.accessorFn(row)
                      : null;
                    return (
                      <div key={col.id} className="min-w-0">
                        <span className="text-xs text-muted-foreground block truncate font-normal">
                          {col.header}
                        </span>
                        <div className="text-foreground/80 truncate mt-0.5">
                          {col.cell ? col.cell({ row, value }) : String(value ?? '—')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {renderSubComponent && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={SPRING_PHYSICS}
                  className="pt-2.5 sm:pt-3 border-t border-border/40 overflow-hidden"
                >
                  {renderSubComponent(row)}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // DESKTOP TABLE VIEW
  return (
    <div className={cn('overflow-x-auto scrollbar-none font-sans', className)}>
      <table className="w-full border-collapse text-left font-sans text-xs min-w-[500px] sm:min-w-full">
        <thead>
          <tr className="border-b border-border/50 bg-surface-raised/20 text-xs text-muted-foreground select-none">
            {/* Checkbox Column */}
            <th className="w-10 sm:w-12 px-3.5 sm:px-6 py-3 sm:py-3.5">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate;
                }}
                onChange={toggleSelectAll}
                aria-label="Select all rows"
                className="rounded border-border accent-foreground cursor-pointer w-4 h-4"
              />
            </th>

            {/* Expand Column */}
            {renderSubComponent && <th className="w-7 sm:w-8 px-1.5 sm:px-2 py-3 sm:py-3.5" />}

            {/* Data Columns */}
            {visibleColumns.map((col) => {
              const isSorted = sortColumn === col.id;
              return (
                <th
                  key={col.id}
                  style={{ width: col.width }}
                  className={cn(
                    'px-3.5 sm:px-6 py-3 sm:py-3.5 font-medium whitespace-nowrap',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center'
                  )}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.id)}
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <span>{col.header}</span>
                      {isSorted ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="w-3.5 h-3.5 text-foreground" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-foreground" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3 h-3 opacity-30 hover:opacity-100" />
                      )}
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-border/40">
          {paginatedData.map((row, index) => {
            const rowId = getRowId(row, index);
            const isSelected = selectedRowIds.has(rowId);
            const isExpanded = expandedRowIds.has(rowId);

            return (
              <React.Fragment key={rowId}>
                <tr
                  className={cn(
                    'transition-colors hover:bg-surface-hover/40 group',
                    isSelected && 'bg-surface-raised/35'
                  )}
                >
                  {/* Checkbox Cell */}
                  <td className="w-10 sm:w-12 px-3.5 sm:px-6 py-3 sm:py-3.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(rowId)}
                      aria-label={`Select row ${rowId}`}
                      className="rounded border-border accent-foreground cursor-pointer w-4 h-4"
                    />
                  </td>

                  {/* Expand Toggle Cell */}
                  {renderSubComponent && (
                    <td className="w-7 sm:w-8 px-1.5 sm:px-2 py-3 sm:py-3.5">
                      <button
                        type="button"
                        onClick={() => toggleRowExpansion(rowId)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Collapse row details' : 'Expand row details'}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={SPRING_PHYSICS}
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </motion.div>
                      </button>
                    </td>
                  )}

                  {/* Data Cells */}
                  {visibleColumns.map((col) => {
                    const value = col.accessorKey
                      ? row[col.accessorKey]
                      : col.accessorFn
                      ? col.accessorFn(row)
                      : null;

                    return (
                      <td
                        key={col.id}
                        className={cn(
                          'px-3.5 sm:px-6 py-3 sm:py-3.5 text-foreground/80 whitespace-nowrap',
                          col.align === 'right' && 'text-right tabular-nums',
                          col.align === 'center' && 'text-center'
                        )}
                      >
                        {col.cell ? col.cell({ row, value }) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>

                {/* Sub-component Expansion Drawer */}
                {renderSubComponent && isExpanded && (
                  <tr className="bg-surface-raised/15">
                    <td colSpan={visibleColumns.length + 2} className="p-0 border-b border-border/50">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={SPRING_PHYSICS}
                        className="p-3.5 sm:p-6 overflow-hidden border-t border-border/40"
                      >
                        {renderSubComponent(row)}
                      </motion.div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export interface DataTablePaginationProps {
  pageSizeOptions?: number[];
  className?: string;
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  pageSizeOptions = [5, 10, 20, 50],
  className,
}) => {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalFilteredCount,
  } = useDataTable();
  const shouldReduceMotion = useReducedMotion();

  const startRecord = totalFilteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalFilteredCount);

  return (
    <div
      className={cn(
        'px-4 py-3 sm:px-7 sm:py-4 border-t border-border/50 bg-surface/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-sans select-none',
        className
      )}
    >
      {/* Count Indicator */}
      <div className="text-muted-foreground tabular-nums">
        Showing <span className="text-foreground font-medium">{startRecord}–{endRecord}</span> of{' '}
        <span className="text-foreground font-medium">{totalFilteredCount}</span> records
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-muted-foreground hidden sm:inline">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            aria-label="Rows per page"
            className="px-2 py-1 rounded-md border border-border/60 bg-surface-raised/20 text-foreground text-xs focus:outline-none focus:border-border cursor-pointer font-sans"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Page Nav Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage <= 1}
            aria-label="First page"
            className="p-1.5 rounded-md border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="p-1.5 rounded-md border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </motion.button>

          <span className="px-2 text-foreground/90 text-xs tabular-nums font-normal">
            {currentPage}/{totalPages || 1}
          </span>

          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="p-1.5 rounded-md border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage >= totalPages}
            aria-label="Last page"
            className="p-1.5 rounded-md border border-border/60 bg-surface-raised/20 text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ROOT COMPOUND CONTAINER & CONTEXT PROVIDER
// =============================================================================

export interface DataTableProps<T = any> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T, index: number) => string;
  defaultPageSize?: number;
  defaultViewMode?: DataTableViewMode;
  accentColor?: string;
  renderSubComponent?: (row: T) => React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  children?: React.ReactNode;
}

export function DataTable<T = any>({
  data,
  columns,
  getRowId = (row: any, i) => row.id || `row-${i}`,
  defaultPageSize = 10,
  defaultViewMode = 'auto',
  accentColor,
  renderSubComponent,
  isLoading,
  error,
  className,
  children,
}: DataTableProps<T>) {
  const [viewMode, setViewMode] = useState<DataTableViewMode>(() => {
    if (defaultViewMode === 'auto') {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        return 'cards';
      }
      return 'table';
    }
    return defaultViewMode;
  });

  useEffect(() => {
    if (defaultViewMode !== 'auto') return;
    const handleResize = () => {
      setViewMode((prev) => {
        const isMobile = window.innerWidth < 640;
        if (isMobile && prev === 'table') return 'cards';
        if (!isMobile && prev === 'cards') return 'table';
        return prev;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultViewMode]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(new Set());
  const [hiddenColumnIds, setHiddenColumnIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleSort = (columnId: string) => {
    if (sortColumn !== columnId) {
      setSortColumn(columnId);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortColumn(null);
      setSortDirection(null);
    }
  };

  const toggleFilter = (columnId: string, value: string) => {
    setActiveFilters((prev) => {
      const existing = prev[columnId] || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [columnId]: updated };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleColumnVisibility = (columnId: string) => {
    setHiddenColumnIds((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) next.delete(columnId);
      else next.add(columnId);
      return next;
    });
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((row: any) =>
        Object.values(row).some((val) =>
          typeof val === 'string' || typeof val === 'number'
            ? String(val).toLowerCase().includes(query)
            : false
        )
      );
    }

    Object.entries(activeFilters).forEach(([colId, filterVals]) => {
      if (filterVals.length === 0) return;
      const col = columns.find((c) => c.id === colId);
      if (!col) return;

      result = result.filter((row: any) => {
        const val = col.accessorKey
          ? row[col.accessorKey]
          : col.accessorFn
          ? col.accessorFn(row)
          : '';
        return filterVals.includes(String(val));
      });
    });

    if (sortColumn && sortDirection) {
      const col = columns.find((c) => c.id === sortColumn);
      if (col) {
        result.sort((a, b) => {
          const aVal = col.accessorKey
            ? a[col.accessorKey]
            : col.accessorFn
            ? col.accessorFn(a)
            : '';
          const bVal = col.accessorKey
            ? b[col.accessorKey]
            : col.accessorFn
            ? col.accessorFn(b)
            : '';

          if (aVal === bVal) return 0;
          if (aVal === null || aVal === undefined) return 1;
          if (bVal === null || bVal === undefined) return -1;

          const comparison = aVal > bVal ? 1 : -1;
          return sortDirection === 'asc' ? comparison : -comparison;
        });
      }
    }

    return result;
  }, [data, columns, searchTerm, activeFilters, sortColumn, sortDirection]);

  const totalFilteredCount = filteredData.length;
  const totalPages = Math.ceil(totalFilteredCount / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const currentPageIds = useMemo(
    () => paginatedData.map((row, i) => getRowId(row, i)),
    [paginatedData, getRowId]
  );
  const selectedOnCurrentPage = currentPageIds.filter((id) => selectedRowIds.has(id));
  const isAllSelected = currentPageIds.length > 0 && selectedOnCurrentPage.length === currentPageIds.length;
  const isIndeterminate = selectedOnCurrentPage.length > 0 && !isAllSelected;

  const toggleSelectAll = () => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        currentPageIds.forEach((id) => next.delete(id));
      } else {
        currentPageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const contextValue: DataTableContextValue<T> = {
    data,
    columns,
    getRowId,
    viewMode,
    setViewMode,
    sortColumn,
    sortDirection,
    handleSort,
    searchTerm,
    setSearchTerm,
    activeFilters,
    toggleFilter,
    clearFilters,
    selectedRowIds,
    toggleRowSelection,
    toggleSelectAll,
    isAllSelected,
    isIndeterminate,
    expandedRowIds,
    toggleRowExpansion,
    renderSubComponent,
    hiddenColumnIds,
    toggleColumnVisibility,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalFilteredCount,
    paginatedData,
    isLoading,
    error,
    accentColor,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <div
        style={{
          fontFamily: "var(--font-sans, 'Geist', sans-serif)",
          ...(accentColor ? ({ '--accent-custom': accentColor } as React.CSSProperties) : {}),
        }}
        className={cn(
          'w-full font-sans rounded-2xl border border-border/70 bg-surface/50 dark:bg-surface/25 text-foreground overflow-hidden transition-colors',
          className
        )}
      >
        {children || (
          <>
            <DataTableToolbar />
            <DataTableFilters />
            <DataTableContent />
            <DataTablePagination />
          </>
        )}
      </div>
    </DataTableContext.Provider>
  );
}

// =============================================================================
// STANDALONE CONVENIENCE COMPONENT
// =============================================================================

export interface AdvancedDataTableProps<T = any> extends DataTableProps<T> {
  title?: string;
  searchPlaceholder?: string;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkExport?: (selectedIds: string[]) => void;
}

export function AdvancedDataTable<T = any>({
  data,
  columns,
  title,
  searchPlaceholder,
  onBulkDelete,
  onBulkExport,
  ...props
}: AdvancedDataTableProps<T>) {
  return (
    <DataTable data={data} columns={columns} {...props}>
      <DataTableToolbar
        title={title}
        searchPlaceholder={searchPlaceholder}
        onBulkDelete={onBulkDelete}
        onBulkExport={onBulkExport}
      />
      <DataTableFilters />
      <DataTableContent />
      <DataTablePagination />
    </DataTable>
  );
}
