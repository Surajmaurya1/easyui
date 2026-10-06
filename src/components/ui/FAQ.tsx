'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, Search, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface FAQProps {
  /** List of FAQ items */
  items: FAQItem[];
  /** Allow multiple items to be expanded simultaneously */
  allowMultiple?: boolean;
  /** Initial open item IDs (uncontrolled) */
  defaultOpen?: string[] | string;
  /** Explicit open item IDs (controlled) */
  openIds?: string[];
  /** Callback fired when open items change */
  onOpenChange?: (ids: string[]) => void;
  /** Visual indicator icon style: chevron or plus-minus */
  iconStyle?: 'chevron' | 'plus-minus' | 'custom';
  /** Custom open/closed icon renderer */
  renderIcon?: (isOpen: boolean) => React.ReactNode;
  /** Enable search filter bar */
  searchable?: boolean;
  /** Placeholder text for search bar */
  searchPlaceholder?: string;
  /** Enable category filter tabs */
  showCategories?: boolean;
  /** Card visual layout presentation: single card container or separated individual cards */
  variant?: 'unified' | 'separated';
  /** Additional container styling */
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({
  items = [],
  allowMultiple = false,
  defaultOpen,
  openIds: controlledOpenIds,
  onOpenChange,
  iconStyle = 'chevron',
  renderIcon,
  searchable = false,
  searchPlaceholder = 'Search questions...',
  showCategories = false,
  variant = 'unified',
  className,
}) => {
  const defaultInitial = defaultOpen
    ? Array.isArray(defaultOpen)
      ? defaultOpen
      : [defaultOpen]
    : [];

  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultInitial);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const baseId = useId();

  const isControlled = controlledOpenIds !== undefined;
  const activeOpenIds = isControlled ? controlledOpenIds : internalOpenIds;

  // Extract unique categories if requested
  const categories = React.useMemo(() => {
    if (!showCategories) return [];
    const cats = new Set<string>();
    items.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return cats.size > 0 ? ['All', ...Array.from(cats)] : [];
  }, [items, showCategories]);

  // Filter items based on search and category
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof item.answer === 'string' &&
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    let nextIds: string[];
    if (allowMultiple) {
      nextIds = activeOpenIds.includes(id)
        ? activeOpenIds.filter((item) => item !== id)
        : [...activeOpenIds, id];
    } else {
      nextIds = activeOpenIds.includes(id) ? [] : [id];
    }

    if (!isControlled) {
      setInternalOpenIds(nextIds);
    }
    if (onOpenChange) {
      onOpenChange(nextIds);
    }
  };

  const renderItemIndicator = (isOpen: boolean) => {
    if (renderIcon) {
      return renderIcon(isOpen);
    }

    if (iconStyle === 'plus-minus') {
      return (
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={motionTransitions.springSnappy}
          className="text-[#6F6F6F] group-hover:text-[#FAFAFA] transition-colors shrink-0"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      );
    }

    return (
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={motionTransitions.springSnappy}
        className="text-[#6F6F6F] group-hover:text-[#FAFAFA] transition-colors shrink-0"
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    );
  };

  return (
    <div className={cn('w-full max-w-3xl mx-auto space-y-4', className)}>
      {/* Optional Search Bar */}
      {searchable && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#525252] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-10 pr-4 text-xs text-[#FAFAFA] placeholder:text-[#6B6B6B] bg-[#141414] border border-[#1F1F1F] rounded-xl focus:border-[#4A4A4A] focus:outline-none focus-ring transition-colors"
          />
        </div>
      )}

      {/* Optional Category Filter Pills */}
      {showCategories && categories.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-ring cursor-pointer',
                selectedCategory === cat
                  ? 'bg-[#141414] text-[#FAFAFA] border border-[#1F1F1F]'
                  : 'text-[#6B6B6B] hover:text-[#FAFAFA] hover:bg-[#0E0E0E]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items List */}
      {filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-[#1F1F1F] bg-[#0E0E0E]">
          <HelpCircle className="w-6 h-6 text-[#6B6B6B] mx-auto mb-2 opacity-60" />
          <p className="text-xs text-[#6B6B6B]">No matching questions found.</p>
        </div>
      ) : variant === 'separated' ? (
        /* Separated Cards Mode */
        <div className="space-y-2.5">
          {filteredItems.map((item) => {
            const isOpen = activeOpenIds.includes(item.id);
            const contentId = `${baseId}-content-${item.id}`;
            const headerId = `${baseId}-header-${item.id}`;

            return (
              <div
                key={item.id}
                className={cn(
                  'rounded-xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-[#4A4A4A] bg-[#141414] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    : 'border-[#1F1F1F] bg-[#0E0E0E] hover:border-[#4A4A4A]'
                )}
              >
                <button
                  id={headerId}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="group flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors focus-ring cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    {item.icon && (
                      <span className="text-[#525252] group-hover:text-[#FAFAFA] transition-colors shrink-0">
                        {item.icon}
                      </span>
                    )}
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
                        {item.question}
                      </div>
                      {item.badge && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  {renderItemIndicator(isOpen)}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={motionTransitions.springGentle}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed border-t border-[#1F1F1F] pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        /* Unified Accordion Card Mode */
        <div className="flex flex-col divide-y divide-[#1F1F1F] rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden">
          {filteredItems.map((item) => {
            const isOpen = activeOpenIds.includes(item.id);
            const contentId = `${baseId}-content-${item.id}`;
            const headerId = `${baseId}-header-${item.id}`;

            return (
              <div key={item.id} className="transition-colors">
                <button
                  id={headerId}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="group flex w-full items-center justify-between p-4 sm:p-5 text-left text-[#FAFAFA] hover:bg-[#141414] transition-colors focus-ring cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    {item.icon && (
                      <span className="text-[#525252] group-hover:text-[#FAFAFA] transition-colors shrink-0">
                        {item.icon}
                      </span>
                    )}
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
                        {item.question}
                      </div>
                      {item.badge && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  {renderItemIndicator(isOpen)}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={motionTransitions.springGentle}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
