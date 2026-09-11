import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface BatchAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action: (selectedIds: string[]) => Promise<void> | void;
  color?: 'default' | 'danger' | 'success';
}

export interface BatchItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export interface BatchGestureTrayProps {
  /** Array of items available for batch selection. */
  items: BatchItem[];
  /** Array of actions available in the batch tray. */
  actions: BatchAction[];
  /** Controlled array of selected item IDs. */
  selectedIds?: string[];
  /** Selection update callback. */
  onSelectionChange?: (ids: string[]) => void;
  /** Action completion handler. */
  onActionComplete?: (actionId: string) => void;
  /** Custom CSS class names. */
  className?: string;
}

export const BatchGestureTray: React.FC<BatchGestureTrayProps> = ({
  items,
  actions,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  onActionComplete,
  className,
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  const selectedIds =
    controlledSelectedIds !== undefined ? controlledSelectedIds : internalSelectedIds;

  const setSelectedIds = useCallback(
    (ids: string[]) => {
      if (onSelectionChange) onSelectionChange(ids);
      else setInternalSelectedIds(ids);
    },
    [onSelectionChange]
  );

  const toggleItem = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    },
    [selectedIds, setSelectedIds]
  );

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  }, [items, selectedIds, setSelectedIds]);

  const handleClear = useCallback(() => {
    setSelectedIds([]);
  }, [setSelectedIds]);

  const handleExecuteAction = async (act: BatchAction) => {
    if (selectedIds.length === 0 || loadingActionId) return;
    setLoadingActionId(act.id);
    try {
      await act.action(selectedIds);
      if (onActionComplete) onActionComplete(act.id);
      setSelectedIds([]);
    } catch {
      // Error handled gracefully
    } finally {
      setLoadingActionId(null);
    }
  };

  // Keyboard shortcut: Escape to clear selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedIds.length > 0) {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds.length, handleClear]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <div className={cn('relative w-full space-y-2.5', className)}>
      {/* Items List */}
      <div className="space-y-1.5" role="group" aria-label="Selectable items list">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              transition={motionTransitions.springSnappy}
              className={cn(
                'group p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
                isSelected
                  ? 'bg-surface-raised border-text-muted/60 shadow-xs ring-1 ring-text-primary/10'
                  : 'bg-surface border-border hover:bg-surface-hover hover:border-border-hover'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Minimalist Animated Checkbox */}
                <div
                  className={cn(
                    'w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all duration-200 border shrink-0',
                    isSelected
                      ? 'bg-text-primary border-text-primary text-background'
                      : 'bg-surface-raised border-border text-transparent group-hover:border-text-muted'
                  )}
                >
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Item Content */}
                <div className="min-w-0 flex items-center gap-2.5">
                  {item.icon && (
                    <span className="text-text-muted shrink-0 text-sm">{item.icon}</span>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-medium text-text-primary truncate tracking-tight">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-[11px] font-mono text-text-muted truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Bottom Batch Action Tray */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            role="toolbar"
            aria-label="Batch actions toolbar"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={motionTransitions.springSnappy}
            className="sticky bottom-4 inset-x-0 mx-auto z-40 p-1.5 sm:p-2 rounded-2xl bg-surface-raised/95 backdrop-blur-xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-between gap-2 max-w-lg w-full"
          >
            {/* Selection Counter & Select/Deselect All */}
            <div className="flex items-center gap-2 pl-1.5 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-surface text-text-primary font-mono text-[11px] font-semibold border border-border shrink-0 shadow-xs">
                {selectedIds.length}
              </span>
              <span className="text-xs text-text-secondary hidden sm:inline whitespace-nowrap">
                selected
              </span>

              <div className="w-px h-3.5 bg-border hidden sm:block mx-0.5" />

              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-mono text-text-muted hover:text-text-primary transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {actions.map((act) => {
                const isLoading = loadingActionId === act.id;
                const isDanger = act.color === 'danger';

                return (
                  <motion.button
                    key={act.id}
                    type="button"
                    disabled={Boolean(loadingActionId)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => handleExecuteAction(act)}
                    className={cn(
                      'px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0 shadow-xs',
                      isDanger
                        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20'
                        : 'bg-surface text-text-primary hover:bg-surface-hover border border-border'
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    ) : (
                      act.icon && <span className="shrink-0">{act.icon}</span>
                    )}
                    <span>{act.label}</span>
                  </motion.button>
                );
              })}

              <div className="w-px h-3.5 bg-border mx-0.5" />

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss selection (Esc)"
                title="Dismiss selection (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatchGestureTray;
