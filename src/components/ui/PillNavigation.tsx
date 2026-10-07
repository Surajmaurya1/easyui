'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface PillSubItem {
  id: string;
  label: string;
  badge?: string;
}

export interface PillNavigationItem {
  id: string;
  label: string;
  children?: PillSubItem[];
}

export interface PillNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: PillNavigationItem[];
  defaultValue?: string;
  defaultSubValue?: string;
  onChange?: (id: string, subId?: string) => void;
}

const defaultItems: PillNavigationItem[] = [
  { id: 'overview', label: 'Overview' },
  {
    id: 'motion',
    label: 'Motion',
    children: [
      { id: 'springs', label: 'Spring Physics' },
      { id: 'caustics', label: 'Liquid Caustics' },
      { id: 'gestures', label: 'Gesture Drag' },
    ],
  },
  { id: 'access', label: 'Access' },
  {
    id: 'code',
    label: 'Code',
    children: [
      { id: 'react', label: 'React JSX' },
      { id: 'tailwind', label: 'Tailwind v3' },
    ],
  },
];

export const PillNavigation: React.FC<PillNavigationProps> = ({
  items = defaultItems,
  defaultValue,
  defaultSubValue,
  onChange,
  className,
  ...props
}) => {
  const [activeId, setActiveId] = useState(defaultValue || items[0]?.id);
  const [activeSubId, setActiveSubId] = useState<string | undefined>(defaultSubValue);
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const activeItem = items.find((item) => item.id === activeId) || items[0];
  const hasSubmenu = Boolean(activeItem?.children && activeItem.children.length > 0);

  const selectMain = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (id === activeId && item?.children) {
      // Toggle submenu on repeated click
      setSubmenuOpen((prev) => !prev);
      return;
    }

    setActiveId(id);
    setSubmenuOpen(true);
    const firstChild = item?.children?.[0]?.id;
    setActiveSubId(firstChild);
    onChange?.(id, firstChild);
  };

  const selectSub = (subId: string) => {
    setActiveSubId(subId);
    onChange?.(activeId, subId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      selectMain(items[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      selectMain(items[prevIndex].id);
    } else if (e.key === 'ArrowDown' && hasSubmenu && activeItem?.children) {
      e.preventDefault();
      const currentSubIndex = activeItem.children.findIndex((s) => s.id === activeSubId);
      const nextSubIndex = (currentSubIndex + 1) % activeItem.children.length;
      selectSub(activeItem.children[nextSubIndex].id);
    } else if (e.key === 'ArrowUp' && hasSubmenu && activeItem?.children) {
      e.preventDefault();
      const currentSubIndex = activeItem.children.findIndex((s) => s.id === activeSubId);
      const prevSubIndex =
        (currentSubIndex - 1 + activeItem.children.length) % activeItem.children.length;
      selectSub(activeItem.children[prevSubIndex].id);
    } else if (e.key === 'Escape') {
      setSubmenuOpen(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      layout={!reducedMotion}
      transition={motionTransitions.springGentle}
      className={cn('inline-flex flex-col items-center gap-2 select-none', className)}
      role="navigation"
      aria-label="Pill navigation with submenu"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...(props as any)}
    >
      {/* 1. Main Segmented Control Bar */}
      <div
        role="tablist"
        className="inline-flex items-center rounded-full border border-[#1F1F1F] bg-[#050505] p-1 shadow-inner"
      >
        {items.map((item) => {
          const active = item.id === activeId;
          const itemHasChildren = Boolean(item.children && item.children.length > 0);

          return (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-expanded={active && itemHasChildren ? submenuOpen : undefined}
              tabIndex={active ? 0 : -1}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              onClick={() => selectMain(item.id)}
              className={cn(
                'focus-ring relative flex min-h-8 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer',
                active ? 'text-[#050505] font-semibold' : 'text-[#A1A1A1] hover:text-[#FAFAFA]'
              )}
            >
              {active && !reducedMotion && (
                <motion.span
                  layoutId="easyui-pill-main-indicator"
                  transition={motionTransitions.springMorph}
                  className="absolute inset-0 rounded-full bg-[#FAFAFA] shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                />
              )}
              {active && reducedMotion && (
                <span className="absolute inset-0 rounded-full bg-[#FAFAFA]" />
              )}

              <span className="relative z-10">{item.label}</span>

              {itemHasChildren && (
                <ChevronDown
                  className={cn(
                    'relative z-10 h-3 w-3 transition-transform duration-200',
                    active ? 'text-[#050505]' : 'text-[#6B6B6B]',
                    active && submenuOpen && 'rotate-180'
                  )}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 2. Fluid Morphing Submenu Bar */}
      <AnimatePresence mode="wait">
        {hasSubmenu && submenuOpen && (
          <motion.div
            key={activeItem.id}
            layout={!reducedMotion}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
            transition={motionTransitions.springGentle}
            role="menu"
            aria-label={`${activeItem.label} submenu`}
            className="inline-flex items-center gap-1 rounded-full border border-[#171717] bg-[#0B0B0B]/90 backdrop-blur-md p-1 shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
          >
            {(activeItem.children || []).map((subItem) => {
              const isSubActive = subItem.id === activeSubId;

              return (
                <motion.button
                  key={subItem.id}
                  type="button"
                  role="menuitem"
                  aria-checked={isSubActive}
                  whileTap={reducedMotion ? undefined : { scale: 0.95 }}
                  onClick={() => selectSub(subItem.id)}
                  className={cn(
                    'focus-ring relative flex min-h-7 items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer',
                    isSubActive ? 'text-[#FAFAFA] font-semibold' : 'text-[#525252] hover:text-[#D4D4D4]'
                  )}
                >
                  {isSubActive && !reducedMotion && (
                    <motion.span
                      layoutId="easyui-pill-sub-indicator"
                      transition={motionTransitions.springMorph}
                      className="absolute inset-0 rounded-full bg-[#2E2E2E] border border-[#404040] shadow-xs"
                    />
                  )}
                  {isSubActive && reducedMotion && (
                    <span className="absolute inset-0 rounded-full bg-[#2E2E2E] border border-[#404040]" />
                  )}

                  <span className="relative z-10">{subItem.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PillNavigation;
