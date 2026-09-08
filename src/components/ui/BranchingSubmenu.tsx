import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface BranchingSubmenuItem {
  id: string;
  label: string;
  description?: string;
  children?: Array<{ id: string; label: string; description?: string }>;
}

export interface BranchingSubmenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: BranchingSubmenuItem[];
  label?: string;
}

const defaultItems: BranchingSubmenuItem[] = [
  {
    id: 'build',
    label: 'Build',
    description: 'Component pipeline',
    children: [
      { id: 'registry', label: 'Registry sync', description: 'Generate shadcn entries' },
      { id: 'types', label: 'Type check', description: 'Validate exports' },
      { id: 'audit', label: 'SEO audit', description: 'Review metadata' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Quality gates',
    children: [
      { id: 'motion', label: 'Motion pass', description: 'Reduce noise' },
      { id: 'a11y', label: 'Accessibility', description: 'Keyboard and focus' },
    ],
  },
];

export const BranchingSubmenu: React.FC<BranchingSubmenuProps> = ({
  items = defaultItems,
  label = 'Branching navigation',
  className,
  ...props
}) => {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [focusIndex, setFocusIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [isKeyboardInteracting, setIsKeyboardInteracting] = useState(false);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const active = items.find((item) => item.id === activeId) || items[0];

  useEffect(() => {
    if (isKeyboardInteracting && open) {
      itemRefs.current[focusIndex]?.focus();
    }
  }, [focusIndex, isKeyboardInteracting, open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsKeyboardInteracting(true);
      setFocusIndex((index) => {
        const next = (index + 1) % items.length;
        setActiveId(items[next]?.id);
        return next;
      });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsKeyboardInteracting(true);
      setFocusIndex((index) => {
        const prev = (index - 1 + items.length) % items.length;
        setActiveId(items[prev]?.id);
        return prev;
      });
    }
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
      event.preventDefault();
      setIsKeyboardInteracting(true);
      setActiveId(items[focusIndex]?.id);
      setOpen(true);
    }
  };

  return (
    <motion.div
      layout={!reducedMotion}
      transition={motionTransitions.springGentle}
      className={cn(
        'w-full max-w-xl rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)] select-none',
        className
      )}
      role="navigation"
      aria-label={label}
      onKeyDown={handleKeyDown}
      {...(props as any)}
    >
      <div className="grid gap-3 grid-cols-[150px_1fr] sm:grid-cols-[180px_1fr] items-start">
        {/* Left Navigation Master Menu */}
        <div className="space-y-1">
          {items.map((item, index) => {
            const selected = item.id === active?.id;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                aria-expanded={selected && open}
                onFocus={() => setFocusIndex(index)}
                onMouseEnter={() => {
                  setActiveId(item.id);
                  setOpen(true);
                }}
                onClick={() => {
                  setActiveId(item.id);
                  setOpen(true);
                }}
                className={cn(
                  'focus-ring relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors cursor-pointer',
                  selected ? 'text-[#FAFAFA] font-medium' : 'text-[#A1A1A1] hover:text-[#FAFAFA]'
                )}
              >
                {/* Smooth sliding selection pill indicator */}
                {selected && !reducedMotion && (
                  <motion.span
                    layoutId="easyui-branching-active-pill"
                    transition={motionTransitions.springMorph}
                    className="absolute inset-0 rounded-xl bg-[#050505] border border-[#1F1F1F] shadow-sm"
                  />
                )}
                {selected && reducedMotion && (
                  <span className="absolute inset-0 rounded-xl bg-[#050505] border border-[#1F1F1F]" />
                )}

                <span className="relative z-10">
                  <span className="block text-xs font-medium">{item.label}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-[10px] text-[#6B6B6B]">{item.description}</span>
                  )}
                </span>
                <ChevronRight
                  className={cn(
                    'relative z-10 h-3.5 w-3.5 transition-transform duration-200',
                    selected ? 'text-white translate-x-0.5' : 'text-[#6B6B6B]'
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right Fluid Morphing Submenu Container */}
        <motion.div
          layout={!reducedMotion}
          transition={motionTransitions.springGentle}
          className="relative overflow-hidden rounded-xl border border-[#171717] bg-[#050505] p-3.5"
        >
          <div className="absolute left-0 top-8 h-px w-6 bg-[#1F1F1F]" aria-hidden="true" />

          <AnimatePresence mode="wait" initial={false}>
            {open && active && (
              <motion.div
                key={active.id}
                layout={!reducedMotion}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                transition={motionTransitions.springGentle}
                className="space-y-1.5"
              >
                <div className="mb-2.5 flex items-center gap-2 px-1 text-xs font-semibold text-[#FAFAFA]">
                  <Layers className="h-3.5 w-3.5 text-[#525252]" />
                  <span>{active.label}</span>
                </div>

                <div className="space-y-1">
                  {(active.children || []).map((child, index) => (
                    <motion.button
                      key={child.id}
                      type="button"
                      initial={reducedMotion ? false : { opacity: 0, x: -6 }}
                      animate={reducedMotion ? false : { opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="focus-ring group relative flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:border-[#1F1F1F] hover:bg-[#0E0E0E] cursor-pointer"
                    >
                      <span className="h-px w-3 bg-[#1F1F1F] group-hover:bg-[#52525B] transition-colors" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-xs font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="block text-[10px] text-[#6B6B6B] group-hover:text-[#A1A1A1] transition-colors">
                            {child.description}
                          </span>
                        )}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

