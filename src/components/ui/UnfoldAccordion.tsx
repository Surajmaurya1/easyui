'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface UnfoldAccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export interface UnfoldAccordionProps {
  items: UnfoldAccordionItem[];
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Default open item ids */
  defaultOpen?: string[];
  className?: string;
}

/**
 * UnfoldAccordion — Content unfolds with the chevron and spacing moving
 * together. The chevron rotates 180°, while the content area expands its
 * height. The spacing between the title and content collapses with a
 * tighter timing so the content slides up into place alongside the chevron
 * rotation, producing a "single motion" feel.
 */
export const UnfoldAccordion: React.FC<UnfoldAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden',
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between p-4 text-left font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors focus-ring cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">{item.title}</div>
                {item.subtitle && (
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{item.subtitle}</div>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={motionTransitions.springSnappy}
                className="text-[var(--text-secondary)] ml-2 shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={motionTransitions.springGentle}
                  className="overflow-hidden"
                >
                  {/* Inner motion moves the spacing between the title and the
                      content together with the height: when closed, no extra
                      padding; when open, the content slides up into place. */}
                  <motion.div
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{
                      // Slightly faster than the height transition so the
                      // content "leads" the chevron by a hair.
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="px-4 pb-4 pt-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
