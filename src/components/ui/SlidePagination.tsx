'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface SlidePaginationProps {
  /** Total number of pages */
  pageCount: number;
  /** Currently active page (controlled) */
  page?: number;
  /** Default active page (uncontrolled) */
  defaultPage?: number;
  /** Visible sibling count (pages shown around the current one) */
  siblingCount?: number;
  /** Page change callback */
  onChange?: (page: number) => void;
  /** Show previous / next buttons */
  showControls?: boolean;
  className?: string;
}

/**
 * SlidePagination — Active indicator slides between pages rather than
 * instantly switching. The active background uses framer-motion's shared
 * layoutId so the indicator visibly travels from one item to the next.
 *
 * Items collapse/expand via AnimatePresence so the visible set stays
 * focused on the current page and its siblings.
 */
export const SlidePagination: React.FC<SlidePaginationProps> = ({
  pageCount,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  onChange,
  showControls = true,
  className,
}) => {
  const [internalPage, setInternalPage] = useState<number>(
    Math.min(Math.max(1, defaultPage), pageCount)
  );
  const isControlled = controlledPage !== undefined;
  const current = isControlled ? controlledPage : internalPage;
  const layoutId = useId();

  const setCurrent = (next: number) => {
    const clamped = Math.min(Math.max(1, next), pageCount);
    if (!isControlled) setInternalPage(clamped);
    onChange?.(clamped);
  };

  // Build the page range with ellipsis.
  const range = (): (number | '…')[] => {
    const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis
    if (pageCount <= totalNumbers) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const left = Math.max(current - siblingCount, 1);
    const right = Math.min(current + siblingCount, pageCount);

    const showLeftEllipsis = left > 2;
    const showRightEllipsis = right < pageCount - 1;

    const items: (number | '…')[] = [];

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
      items.push(...leftRange, '…', pageCount);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => pageCount - (3 + siblingCount * 2) + i + 1
      );
      items.push(1, '…', ...rightRange);
    } else if (showLeftEllipsis && showRightEllipsis) {
      items.push(1, '…', ...Array.from({ length: siblingCount * 2 + 1 }, (_, i) => left + i), '…', pageCount);
    }

    return items;
  };

  const pages = range();

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'inline-flex items-center gap-1 select-none',
        className
      )}
    >
      {showControls && (
        <button
          type="button"
          aria-label="Previous page"
          disabled={current <= 1}
          onClick={() => setCurrent(current - 1)}
          className={cn(
            'w-8 h-8 inline-flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-hover)] transition-colors focus-ring cursor-pointer',
            current <= 1 && 'opacity-30 cursor-not-allowed hover:bg-transparent hover:text-[var(--text-secondary)]'
          )}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      )}

      <ul className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === '…') {
            return (
              <li
                key={`ellipsis-${idx}`}
                className="w-8 h-8 inline-flex items-center justify-center text-[var(--text-muted)] text-xs"
                aria-hidden="true"
              >
                …
              </li>
            );
          }

          const isActive = p === current;
          return (
            <li key={p}>
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => setCurrent(p)}
                className={cn(
                  'relative w-8 h-8 inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-ring cursor-pointer',
                  isActive
                    ? 'text-[var(--bg)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`slide-pagination-indicator-${layoutId}`}
                    className="absolute inset-0 rounded-md bg-[var(--text-primary)] border border-[var(--text-primary)] shadow-xs"
                    transition={motionTransitions.springSnappy}
                  />
                )}
                <span className="relative z-10">{p}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {showControls && (
        <button
          type="button"
          aria-label="Next page"
          disabled={current >= pageCount}
          onClick={() => setCurrent(current + 1)}
          className={cn(
            'w-8 h-8 inline-flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-hover)] transition-colors focus-ring cursor-pointer',
            current >= pageCount && 'opacity-30 cursor-not-allowed hover:bg-transparent hover:text-[var(--text-secondary)]'
          )}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </nav>
  );
};
