'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface SpringSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SpringSelectProps {
  /** Option list */
  options: SpringSelectOption[];
  /** Currently selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Placeholder when no value is selected */
  placeholder?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Visible label */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Custom class name for the root */
  className?: string;
}

/**
 * SpringSelect — The dropdown menu follows the trigger with a tiny spring.
 * On open, the menu slides down with a slight overshoot; the chevron rotates
 * a hair past 180° before settling. Closing is a smooth ease-back.
 */
export const SpringSelect: React.FC<SpringSelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select…',
  onChange,
  label,
  disabled = false,
  error,
  className,
}) => {
  const generatedId = useId();
  const rootId = `spring-select-${generatedId}`;
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;
  const currentOption = options.find((o) => o.value === current);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleSelect = (opt: SpringSelectOption, idx: number) => {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
    setActiveIndex(idx);
    triggerRef.current?.focus();
  };

  const handleTriggerKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => (i < 0 ? options.findIndex((o) => o.value === current) : i));
    }
  };

  const handleListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(options[activeIndex], activeIndex);
    }
  };

  return (
    <div ref={rootRef} className={cn('relative w-full', className)} id={rootId}>
      {label && (
        <label
          htmlFor={`${rootId}-trigger`}
          className="block text-xs font-medium text-[var(--text-primary)] tracking-tight mb-1.5 select-none"
        >
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={`${rootId}-trigger`}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleTriggerKey}
        className={cn(
          'relative w-full h-10 px-3.5 pr-9 text-xs rounded-lg border outline-none text-left flex items-center justify-between transition-colors duration-150 focus-ring',
          'bg-[var(--surface-raised)]',
          open
            ? 'border-[var(--border-hover)]'
            : error
              ? 'border-rose-500/50 hover:border-rose-500/70'
              : 'border-[var(--border)] hover:border-[var(--border-hover)]',
          disabled && 'opacity-30 cursor-not-allowed',
          currentOption ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
        )}
      >
        <span className="truncate">{currentOption?.label ?? placeholder}</span>

        <motion.div
          animate={{
            rotate: open ? 192 : 0, // 192° gives a tiny past-180° before settle
          }}
          transition={motionTransitions.springSnappy}
          className="absolute right-3 text-[var(--text-secondary)]"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleListKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={motionTransitions.springSnappy}
            // The container itself rides the spring: a tiny upward slide that
            // "settles" with the snappy spring, plus a slight overshoot via the
            // scale: 0.98 -> 1 motion.
            className="absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-auto py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-elevated)] focus:outline-none"
          >
            {options.map((opt, idx) => {
              const selected = opt.value === current;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={opt.disabled}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(opt, idx)}
                  className={cn(
                    'relative px-3 py-2 mx-1 rounded-md text-xs cursor-pointer flex items-center justify-between gap-2',
                    selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]',
                    opt.disabled && 'opacity-30 cursor-not-allowed',
                    activeIndex === idx && !opt.disabled && 'bg-[var(--surface-raised)]'
                  )}
                >
                  <span className="flex flex-col">
                    <span className="leading-tight">{opt.label}</span>
                    {opt.description && (
                      <span className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        {opt.description}
                      </span>
                    )}
                  </span>
                  {selected && <Check className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransitions.springSnappy}
          className="text-[11px] text-rose-400 font-medium mt-1.5"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
