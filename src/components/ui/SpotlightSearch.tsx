'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { GITHUB_URL } from '../../lib/constants';
import { CATALOG_INDEX } from '../registry/catalog-index';

export interface SpotlightSearchItem {
  id: string;
  title: string;
  category: 'Components' | 'Documentation' | 'Actions' | 'Navigation' | string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  action?: () => void;
}

export interface SpotlightSearchProps {
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Optional close callback */
  onClose?: () => void;
  /** Callback to navigate to a component */
  onSelectComponent?: (id: string) => void;
  /** Callback to navigate to documentation */
  onNavigateDocs?: (topicId?: string) => void;
  /** Searchable items database override */
  items?: SpotlightSearchItem[];
  /** Search input placeholder */
  placeholder?: string;
  /** Recent searches list */
  recentSearches?: string[];
  /** Callback when an item is selected */
  onSelect?: (item: SpotlightSearchItem) => void;
  /** Enable internal global Cmd+K shortcut */
  enableGlobalShortcut?: boolean;
  /** Custom class name */
  className?: string;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  open,
  onOpenChange,
  onClose,
  onSelectComponent,
  onNavigateDocs,
  items: customItems,
  placeholder = 'Search components, guides, documentation...',
  onSelect,
  enableGlobalShortcut = false,
  className,
}) => {
  const uniqueId = React.useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
      onClose?.();
    } else {
      setInternalOpen(false);
      onOpenChange?.(false);
      onClose?.();
    }
  }, [isControlled, onOpenChange, onClose]);

  const handleOpen = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
      onOpenChange?.(true);
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isControlled, onOpenChange]);

  // Global shortcut (only active when enableGlobalShortcut is true and not externally controlled)
  useEffect(() => {
    if (!enableGlobalShortcut) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableGlobalShortcut, isOpen, handleClose, handleOpen]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Generate comprehensive catalog items if not custom passed
  const items = useMemo<SpotlightSearchItem[]>(() => {
    if (customItems) return customItems;

    const componentEntries: SpotlightSearchItem[] = CATALOG_INDEX.map((comp) => ({
      id: `comp-${comp.id}`,
      title: comp.name,
      category: 'Components',
      action: () => {
        onSelectComponent?.(comp.id);
        handleClose();
      },
    }));

    const docEntries: SpotlightSearchItem[] = [
      {
        id: 'doc-intro',
        title: 'Introduction & Architecture',
        category: 'Documentation',
        action: () => {
          onNavigateDocs?.('introduction');
          handleClose();
        },
      },
      {
        id: 'doc-quickstart',
        title: 'Quick Start & CLI Installation',
        category: 'Documentation',
        action: () => {
          onNavigateDocs?.('quick-start');
          handleClose();
        },
      },
      {
        id: 'doc-architecture',
        title: 'Registry Engine & Sync Automation',
        category: 'Documentation',
        action: () => {
          onNavigateDocs?.('architecture');
          handleClose();
        },
      },
      {
        id: 'doc-motion',
        title: 'Motion Tokens & Physics Curves',
        category: 'Documentation',
        action: () => {
          onNavigateDocs?.('motion-tokens');
          handleClose();
        },
      },
      {
        id: 'doc-collaboration',
        title: 'Contributing & Collaboration Guide',
        category: 'Documentation',
        action: () => {
          onNavigateDocs?.('collaboration');
          handleClose();
        },
      },
    ];

    const actionEntries: SpotlightSearchItem[] = [
      {
        id: 'action-github',
        title: 'View GitHub Repository',
        category: 'Actions',
        action: () => {
          window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
          handleClose();
        },
      },
    ];

    return [...componentEntries, ...docEntries, ...actionEntries];
  }, [customItems, onSelectComponent, onNavigateDocs, handleClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
      return;
    }

    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        current.action?.();
        onSelect?.(current);
        handleClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans select-none">
          {/* Calm backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Ultra-minimal Spotlight Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight Search"
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={motionTransitions.springSnappy}
            className={cn(
              'relative w-full max-w-lg rounded-2xl border border-border bg-surface-raised shadow-elevated overflow-hidden z-10',
              className
            )}
          >
            {/* Top Search Input Bar with ESC */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-text-subtle shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-[16px] text-text-primary placeholder-text-muted focus:outline-none"
                aria-label="Search"
              />
              <kbd
                onClick={handleClose}
                className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface border border-border rounded cursor-pointer hover:text-text-primary transition-colors shrink-0"
              >
                ESC
              </kbd>
            </div>

            {/* Search Results List (Clean Names Only) */}
            <div className="max-h-[340px] overflow-y-auto p-1.5 space-y-0.5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action?.();
                        onSelect?.(item);
                        handleClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'relative flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors text-sm',
                        isSelected ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      )}
                    >
                      {/* Smooth Active Highlight Pill */}
                      {isSelected && (
                        <motion.div
                          layoutId={`spotlight-active-${uniqueId}`}
                          transition={motionTransitions.springGentle}
                          className="absolute inset-0 rounded-xl bg-surface-hover border border-border-hover z-0"
                        />
                      )}

                      <span className="relative z-10 font-medium truncate">
                        {item.title}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center text-xs text-text-muted">
                  No results found for <span className="text-text-primary">"{query}"</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
