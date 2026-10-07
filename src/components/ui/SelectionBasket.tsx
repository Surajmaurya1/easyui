'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Share2,
  Download,
  FolderInput,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface SelectionActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger' | 'primary';
  onClick?: () => void;
}

export interface SelectionBasketProps {
  /** Count of selected items */
  selectedCount: number;
  /** Total count of all items (for select all calculation) */
  totalCount?: number;
  /** Position mode: 'fixed' attaches to browser viewport, 'contained' / 'inline' stays within parent container */
  mode?: 'fixed' | 'contained' | 'inline';
  /** Custom actions list */
  actions?: SelectionActionItem[];
  /** Callback to clear all selections */
  onClearSelection?: () => void;
  /** Callback to select all items */
  onSelectAll?: () => void;
  /** Custom class name */
  className?: string;
}

const defaultActions: SelectionActionItem[] = [
  { id: 'export', label: 'Export', icon: <Download className="w-3.5 h-3.5" /> },
  { id: 'move', label: 'Move to Folder', icon: <FolderInput className="w-3.5 h-3.5" /> },
  { id: 'share', label: 'Share', icon: <Share2 className="w-3.5 h-3.5" /> },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, variant: 'danger' },
];

export const SelectionBasket: React.FC<SelectionBasketProps> = ({
  selectedCount,
  totalCount,
  mode = 'fixed',
  actions = defaultActions,
  onClearSelection,
  onSelectAll,
  className,
}) => {
  const isVisible = selectedCount > 0;
  const isAllSelected = totalCount !== undefined && selectedCount === totalCount && totalCount > 0;

  const wrapperClass =
    mode === 'fixed'
      ? 'fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]'
      : mode === 'contained'
      ? 'absolute bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-[95%]'
      : 'relative mt-4 mx-auto w-fit z-20';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={cn('pointer-events-none font-sans select-none', wrapperClass)}>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.15 } }}
            transition={motionTransitions.springResponsive}
            className={cn(
              'pointer-events-auto flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E]/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-x-auto max-w-full',
              className
            )}
            role="toolbar"
            aria-label="Bulk actions toolbar"
          >
            {/* Selected Count Indicator */}
            <div className="flex items-center gap-2 pl-3 pr-2 py-1 border-r border-[#1F1F1F] shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#FAFAFA] text-[#050505] text-[11px] font-bold font-mono flex items-center justify-center">
                {selectedCount}
              </span>
              <span className="text-xs font-medium text-[#FAFAFA] whitespace-nowrap">
                {selectedCount === 1 ? 'item selected' : 'items selected'}
              </span>

              {/* Select all toggle */}
              {onSelectAll && totalCount && (
                <button
                  type="button"
                  onClick={onSelectAll}
                  className="text-[11px] font-mono text-[#6B6B6B] hover:text-white transition-colors ml-1 underline underline-offset-2 cursor-pointer"
                >
                  {isAllSelected ? 'Select none' : `All (${totalCount})`}
                </button>
              )}
            </div>

            {/* Action Buttons (Horizontally scrollable on narrow screens) */}
            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto py-0.5">
              {actions.map((action) => {
                const isDanger = action.variant === 'danger';
                const isPrimary = action.variant === 'primary';

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.onClick}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus-ring whitespace-nowrap cursor-pointer',
                      isDanger
                        ? 'bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/30 text-rose-400'
                        : isPrimary
                        ? 'bg-[#FAFAFA] hover:bg-white text-[#050505]'
                        : 'bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-[#A1A1A1] hover:text-[#FAFAFA]'
                    )}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Clear selection close button */}
            {onClearSelection && (
              <button
                type="button"
                onClick={onClearSelection}
                className="w-7 h-7 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] flex items-center justify-center text-[#525252] hover:text-[#FAFAFA] transition-colors focus-ring shrink-0 ml-1 cursor-pointer"
                title="Clear selection"
                aria-label="Clear selection"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
