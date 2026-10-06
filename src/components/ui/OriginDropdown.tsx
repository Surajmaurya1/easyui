'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type DropdownSide = 'top' | 'right' | 'bottom' | 'left';

export interface OriginDropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface OriginDropdownProps {
  /** Trigger element (rendered as a button by default) */
  trigger?: React.ReactNode;
  /** Items rendered in the menu */
  items?: OriginDropdownItem[];
  /** Pre-built menu content (alternative to items) */
  children?: React.ReactNode;
  /** Side the menu should open from */
  side?: DropdownSide;
  /** Optional controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open state change callback */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  /** Placeholder trigger content if no trigger provided */
  placeholder?: string;
}

const sideTransform: Record<DropdownSide, { x: number; y: number }> = {
  top: { x: 0, y: 8 },
  bottom: { x: 0, y: -8 },
  left: { x: 8, y: 0 },
  right: { x: -8, y: 0 },
};

const sideStyles: Record<DropdownSide, string> = {
  top: 'bottom-full left-0 mb-2',
  bottom: 'top-full left-0 mt-2',
  left: 'right-full top-0 mr-2',
  right: 'left-full top-0 ml-2',
};

const sideOrigin: Record<DropdownSide, string> = {
  top: 'origin-bottom-left',
  bottom: 'origin-top-left',
  left: 'origin-right-top',
  right: 'origin-left-top',
};

/**
 * OriginDropdown — Origin-aware expansion rather than simply appearing.
 * The menu materializes from the chosen side with a slight scale (0.96 -> 1)
 * and an outward -> inward translation, so the perceived origin is the edge
 * of the trigger closest to the menu.
 */
export const OriginDropdown: React.FC<OriginDropdownProps> = ({
  trigger,
  items,
  children,
  side = 'bottom',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  placeholder = 'Open menu',
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const offsetT = sideTransform[side];

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3.5 h-9 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-hover)] transition-colors focus-ring cursor-pointer"
      >
        {trigger ?? <span>{placeholder}</span>}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={motionTransitions.springSnappy}
          className="text-[var(--text-secondary)]"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{
              opacity: 0,
              scale: 0.96,
              x: offsetT.x,
              y: offsetT.y,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              x: offsetT.x * 0.4,
              y: offsetT.y * 0.4,
            }}
            transition={motionTransitions.springSnappy}
            className={cn(
              'absolute z-50 min-w-[200px] py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]',
              sideStyles[side],
              sideOrigin[side]
            )}
          >
            {children ? (
              children
            ) : (
              <ul className="flex flex-col">
                {items?.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;
                        item.onSelect?.();
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-start gap-2.5 px-3 py-2 text-xs text-left transition-colors focus-ring cursor-pointer',
                        item.disabled
                          ? 'opacity-30 cursor-not-allowed'
                          : item.destructive
                            ? 'text-rose-400 hover:bg-[var(--surface-raised)]'
                            : 'text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
                      )}
                    >
                      {item.icon && <span className="mt-0.5 text-[var(--text-secondary)]">{item.icon}</span>}
                      <span className="flex flex-col">
                        <span className="leading-tight font-medium">{item.label}</span>
                        {item.description && (
                          <span className="text-[10px] text-[var(--text-muted)] mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
