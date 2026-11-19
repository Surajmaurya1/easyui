'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useId, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GooeyMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** List of menu item labels */
  options?: string[];
  /** Controlled active/selected item */
  value?: string;
  /** Initial selected option if uncontrolled */
  defaultValue?: string;
  /** Controlled open state */
  open?: boolean;
  /** Initial open state if uncontrolled */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Callback fired when an option is selected */
  onSelect?: (option: string, index: number) => void;
  /** Pixel width of the panel and the default pill (default: 306) */
  width?: number;
  /** Non-interactive content for an optional custom trigger button */
  trigger?: React.ReactNode;
  /** Accessible name for a custom trigger (default: 'Toggle menu') */
  triggerLabel?: string;
  /** Custom trigger dimensions, padding, and corner shape */
  triggerClassName?: string;
  /** Inline styles for the trigger button */
  triggerStyle?: React.CSSProperties;
  /** Logical panel alignment relative to the trigger (default: 'start') */
  align?: 'start' | 'center' | 'end';
  /** Additional classes for all options or individual actions */
  optionClassName?: string | ((option: string, index: number) => string | undefined);
  /** Additional container styling */
  className?: string;
}

const DEFAULT_OPTIONS = ['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us'];

const W = 306;
const PILL_H = 56;
const GAP = 12;
const ROW_H = 44;
const PANEL_PAD = 10;

const DROP_SPRING = { type: 'spring', stiffness: 240, damping: 17, mass: 1 } as const;
const GROW_SPRING = { type: 'spring', stiffness: 210, damping: 22, mass: 1 } as const;
const SNAP_SPRING = { type: 'spring', stiffness: 240, damping: 20, mass: 0.9 } as const;
const ROW_SPRING = { type: 'spring', stiffness: 420, damping: 26 } as const;

type Corner = [number, number];
type TriggerGeometry = {
  width: number;
  height: number;
  corners: Corner[];
  rtl: boolean;
};

function measureTrigger(button: HTMLButtonElement): TriggerGeometry {
  // Layout dimensions stay correct inside scaled registry/demo previews.
  const width = button.offsetWidth;
  const height = button.offsetHeight;
  const style = getComputedStyle(button);
  const resolveRadius = (value: string, size: number) =>
    value.endsWith('%') ? parseFloat(value) / 100 * size : parseFloat(value);
  const corners: Corner[] = [style.borderTopLeftRadius, style.borderTopRightRadius,
    style.borderBottomRightRadius, style.borderBottomLeftRadius].map((radius) => {
    const [x, y = x] = radius.split(' ');
    return [resolveRadius(x, width), resolveRadius(y, height)];
  });
  // CSS scales overlapping radii together. Match the actual rendered outline.
  const factor = Math.min(1, width / (corners[0][0] + corners[1][0]),
    width / (corners[3][0] + corners[2][0]), height / (corners[0][1] + corners[3][1]),
    height / (corners[1][1] + corners[2][1]));
  return { width, height, corners: corners.map(([x, y]) => [x * factor, y * factor]), rtl: style.direction === 'rtl' };
}

/**
 * GooeyMenu creates an ultra-smooth liquid dropdown menu using SVG metaball
 * color matrix filtering and spring physics.
 */
export const GooeyMenu: React.FC<GooeyMenuProps> = ({
  options = DEFAULT_OPTIONS,
  value,
  defaultValue,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  onSelect,
  width = W,
  trigger,
  triggerLabel,
  triggerClassName,
  triggerStyle,
  align = 'start',
  optionClassName,
  className,
  style,
  onKeyDown,
  ...props
}) => {
  const hasCustomTrigger = trigger !== undefined;
  const reducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const filterId = `easyui-goo-drop-${id}`;
  const listId = `easyui-goo-list-${id}`;
  const isControlledOpen = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const open = isControlledOpen ? controlledOpen : internalOpen;

  const setOpen = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof next === 'function' ? next(open) : next;
    if (!isControlledOpen) {
      setInternalOpen(nextVal);
    }
    onOpenChange?.(nextVal);
  }, [isControlledOpen, open, onOpenChange]);

  const [selected, setSelected] = useState(value ?? defaultValue ?? options[0] ?? 'Home');
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, options.indexOf(value ?? defaultValue ?? options[0]))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const focusListOnOpen = useRef(false);
  const [geometry, setGeometry] = useState<TriggerGeometry>({
    width, height: PILL_H, corners: Array.from({ length: 4 }, () => [PILL_H / 2, PILL_H / 2]), rtl: false,
  });

  useLayoutEffect(() => {
    const button = triggerRef.current;
    if (!button) return;
    const measure = () => {
      const next = measureTrigger(button);
      if (!next.width || !next.height) return;
      setGeometry((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(button);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, trigger, triggerClassName, triggerStyle, open]);

  useEffect(() => {
    if (open && focusListOnOpen.current) {
      listRef.current?.focus({ preventScroll: true });
      focusListOnOpen.current = false;
    }
  }, [open]);

  // Sync external controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
      const idx = options.indexOf(value);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [value, options]);

  // Close on outside click
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (listRef.current?.contains(document.activeElement)) {
          triggerRef.current?.focus({ preventScroll: true });
        }
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener('pointerdown', handlePointerDown);
    }
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [open, setOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.defaultPrevented) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusListOnOpen.current = true;
        setOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      listRef.current?.focus({ preventScroll: true });
      if (options.length) setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      listRef.current?.focus({ preventScroll: true });
      if (options.length) setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (e.target === triggerRef.current) return;
      e.preventDefault();
      choose(activeIndex);
    }
  };

  const choose = (index: number) => {
    const opt = options[index];
    if (opt !== undefined) {
      setSelected(opt);
      setActiveIndex(index);
      onSelect?.(opt, index);
    }
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const panelHeight = options.length * ROW_H + PANEL_PAD * 2;
  const panelY = geometry.height + GAP;
  const panelX = align === 'center' ? (geometry.width - width) / 2
    : (align === 'end') !== geometry.rtl ? geometry.width - width : 0;
  const totalHeight = panelY + panelHeight + 24;
  const surfaceLeft = Math.min(0, panelX);
  const surfaceWidth = Math.max(geometry.width, panelX + width) - surfaceLeft;
  const cornerNames = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'] as const;
  const originCorners = Object.fromEntries(cornerNames.map((name, index) => {
    const [x, y] = geometry.corners[index];
    return [name, `${x}px ${y}px`];
  }));
  const collapsedCorners = Object.fromEntries(cornerNames.map((name, index) => {
    const [x, y] = geometry.corners[index];
    return [name, `${x * width / geometry.width}px ${y * panelHeight / geometry.height}px`];
  }));
  const expandedCorners = Object.fromEntries(cornerNames.map((name) => [name, '22px 22px']));

  return (
    <div
      {...props}
      ref={containerRef}
      onKeyDown={(event) => { onKeyDown?.(event); handleKeyDown(event); }}
      className={cn('relative inline-flex flex-col items-center select-none', className)}
      style={{ width: hasCustomTrigger ? 'fit-content' : width, ...style }}
    >
      {/* SVG Gooey Metamorphic Matrix Filter */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={Math.min(10, Math.min(geometry.width, geometry.height) / 5)} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 22 -14"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative" style={hasCustomTrigger ? undefined : { width, height: totalHeight }}>
        {/* Gooey Surface Layer - Pure Solid Blobs for fast 60fps GPU rasterization */}
        <div
          className="absolute top-0 pointer-events-none"
          style={{
            left: surfaceLeft,
            width: surfaceWidth,
            height: totalHeight,
            filter: reducedMotion ? 'none' : `url(#${filterId})`,
            transform: 'translateZ(0)',
            isolation: 'isolate',
          }}
        >
          {/* Top Pill Solid Shape */}
          <div
            className="absolute top-0 bg-black dark:bg-[#0E0E0E]"
            style={{ left: -surfaceLeft, width: geometry.width, height: geometry.height, ...originCorners }}
          />

          {/* Morphing Dropping Panel Solid Shape */}
          <motion.div
            data-testid="gooey-menu-surface"
            className="absolute top-0 bg-black dark:bg-[#0E0E0E]"
            style={{
              left: -surfaceLeft,
              width,
              height: panelHeight,
              transformOrigin: '0% 0%',
              willChange: 'transform',
            }}
            initial={false}
            animate={
              open
                ? { x: panelX, y: panelY, scaleX: 1, scaleY: 1, ...expandedCorners }
                : { x: 0, y: 0, scaleX: geometry.width / width, scaleY: geometry.height / panelHeight, ...collapsedCorners }
            }
            transition={
              reducedMotion ? { duration: 0 } : open
                ? { ...DROP_SPRING, scaleX: { ...GROW_SPRING, delay: 0.05 }, scaleY: { ...GROW_SPRING, delay: 0.05 } }
                : SNAP_SPRING
            }
          />
        </div>

        {/* Trigger Header Button */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={triggerLabel ?? (hasCustomTrigger ? 'Toggle menu' : undefined)}
          data-testid="gooey-menu-trigger"
          onClick={() => setOpen((o) => !o)}
          className={cn('cursor-pointer z-20 flex items-center justify-between bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]',
            hasCustomTrigger ? 'relative' : 'absolute left-0 top-0 px-[22px]', triggerClassName)}
          style={{ ...(hasCustomTrigger ? {} : { width, height: PILL_H, borderRadius: PILL_H / 2 }), ...triggerStyle }}
        >
          {hasCustomTrigger ? trigger : <>
          <span className="text-[15.5px] font-medium tracking-[0.1px] text-[#F4F4F4]">
            {selected}
          </span>
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cfcfcf"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
          </>}
        </button>

        {/* List of Options */}
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={-1}
              aria-label={triggerLabel ?? 'Menu options'}
              aria-hidden={!open}
              inert={!open}
              aria-activedescendant={options.length ? `${listId}-opt-${activeIndex}` : undefined}
              data-testid="gooey-menu-options"
              className="absolute m-0 list-none p-0 z-20 outline-none"
              style={{ left: panelX, top: panelY, width, paddingTop: PANEL_PAD, paddingBottom: PANEL_PAD, pointerEvents: open ? 'auto' : 'none' }}
              initial="closed"
              animate={open ? 'open' : 'closed'}
              variants={{
                open: { transition: { staggerChildren: reducedMotion ? 0 : 0.035, delayChildren: reducedMotion ? 0 : 0.12 } },
                closed: { transition: { staggerChildren: reducedMotion ? 0 : 0.015, staggerDirection: -1 } },
              }}
            >
              {options.map((opt, i) => {
                const isActive = i === activeIndex;
                const isCurrentSelected = opt === selected;
                return (
                  <motion.li
                    key={`${i}-${opt}`}
                    id={`${listId}-opt-${i}`}
                    role="option"
                    aria-selected={isCurrentSelected}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => choose(i)}
                    variants={{
                      open: { opacity: 1, y: 0, transition: reducedMotion ? { duration: 0 } : ROW_SPRING },
                      closed: { opacity: 0, y: reducedMotion ? 0 : -10, transition: reducedMotion ? { duration: 0 } : SNAP_SPRING },
                    }}
                    className={cn(
                      'mx-[10px] flex cursor-pointer items-center justify-between rounded-[14px] px-[12px] text-[15.5px] transition-colors duration-150 ease-out select-none',
                      isActive
                        ? 'bg-[#232323] text-white'
                        : 'text-[#DCDCDC] hover:text-white bg-transparent',
                      typeof optionClassName === 'function' ? optionClassName(opt, i) : optionClassName
                    )}
                    style={{ height: ROW_H }}
                  >
                    <span>{opt}</span>
                    {isCurrentSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
      </div>
    </div>
  );
};

export default GooeyMenu;

