'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Layout, BookOpen, Terminal, CornerDownLeft, Cpu, GitPullRequest, Sliders } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { GITHUB_URL } from '../../lib/constants';
import { CATALOG_INDEX } from '../registry/catalog-index';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Components' | 'Documentation' | 'Actions' | 'Navigation';
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent?: (id: string) => void;
  onNavigateDocs?: (topicId?: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
  onNavigateDocs,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems: CommandItem[] = useMemo(() => {
    // Dynamic component entries derived from generated catalog
    const componentEntries: CommandItem[] = CATALOG_INDEX.map((comp) => ({
      id: comp.id,
      title: comp.name,
      category: 'Components',
      icon: comp.category === 'Motion' ? <Sparkles className="w-4 h-4 text-[#D4D4D4]" /> : <Layout className="w-4 h-4 text-[#D4D4D4]" />,
      shortcut: 'C',
      onSelect: () => {
        onSelectComponent?.(comp.id);
        onClose();
      },
    }));

    const docEntries: CommandItem[] = [
      {
        id: 'doc-intro',
        title: 'Docs: Introduction & Vision',
        category: 'Documentation',
        icon: <BookOpen className="w-4 h-4 text-[#ECECEC]" />,
        shortcut: 'D',
        onSelect: () => {
          onNavigateDocs?.('introduction');
          onClose();
        },
      },
      {
        id: 'doc-quickstart',
        title: 'Docs: Quick Start & shadcn CLI',
        category: 'Documentation',
        icon: <Terminal className="w-4 h-4 text-[#ECECEC]" />,
        shortcut: 'D',
        onSelect: () => {
          onNavigateDocs?.('quick-start');
          onClose();
        },
      },
      {
        id: 'doc-architecture',
        title: 'Docs: Automatic Structure & Registry Engine',
        category: 'Documentation',
        icon: <Cpu className="w-4 h-4 text-[#ECECEC]" />,
        shortcut: 'D',
        onSelect: () => {
          onNavigateDocs?.('architecture');
          onClose();
        },
      },
      {
        id: 'doc-collaboration',
        title: 'Docs: How to Collaborate & Add Components',
        category: 'Documentation',
        icon: <GitPullRequest className="w-4 h-4 text-[#ECECEC]" />,
        shortcut: 'D',
        onSelect: () => {
          onNavigateDocs?.('collaboration');
          onClose();
        },
      },
      {
        id: 'doc-motion',
        title: 'Docs: Motion Tokens & Physics Curves',
        category: 'Documentation',
        icon: <Sliders className="w-4 h-4 text-[#ECECEC]" />,
        shortcut: 'D',
        onSelect: () => {
          onNavigateDocs?.('motion');
          onClose();
        },
      },
    ];

    const actionEntries: CommandItem[] = [
      {
        id: 'cli-add',
        title: 'Copy CLI Add Command',
        category: 'Actions',
        icon: <Terminal className="w-4 h-4 text-[#A1A1A1]" />,
        shortcut: '⌘C',
        onSelect: () => {
          copyToClipboard('npx shadcn@latest add Surajmaurya1/easyui/magnetic-button');
          onClose();
        },
      },
      {
        id: 'github-repo',
        title: 'View GitHub Repository',
        category: 'Navigation',
        icon: <GithubIcon className="w-4 h-4 text-[#A1A1A1]" />,
        shortcut: 'G',
        onSelect: () => {
          window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];

    return [...componentEntries, ...docEntries, ...actionEntries];
  }, [onSelectComponent, onNavigateDocs, onClose]);

  const filteredItems = useMemo(() => {
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [commandItems, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].onSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={motionTransitions.springSnappy}
            className="relative w-full max-w-xl rounded-xl border border-[#1F1F1F] bg-[#141414] shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-[#1F1F1F]">
              <Search className="w-4 h-4 text-[#525252] mr-2.5 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search components, docs..."
                className="w-full bg-transparent text-[16px] text-[#FAFAFA] placeholder-[#6B6B6B] focus:outline-none"
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0E0E0E] border border-[#1F1F1F] text-[#6B6B6B]">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-1.5" role="listbox">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#6B6B6B]">
                  No commands or documentation matching "{query}"
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.onSelect}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        role="option"
                        aria-selected={isSelected}
                        className={cn(
                          'flex w-full items-center justify-between px-3 py-2 rounded-md text-xs transition-colors text-left',
                          isSelected
                            ? 'bg-[#1F1F1F] text-[#FAFAFA]'
                            : 'text-[#A1A1A1] hover:bg-[#0E0E0E]'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span className="font-normal">{item.title}</span>
                          <span className="text-[10px] text-[#555555] ml-1">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <CornerDownLeft className="w-3 h-3 text-white" />
                          )}
                          {item.shortcut && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] text-[#606060]">
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer status */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-t border-[#1F1F1F] text-[11px] text-[#6B6B6B]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-[#0E0E0E] border border-[#1F1F1F] px-1 rounded text-[10px] text-[#A1A1A1]">↑↓</span> navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-[#0E0E0E] border border-[#1F1F1F] px-1 rounded text-[10px] text-[#A1A1A1]">↵</span> select
                </span>
              </div>
              <span className="text-[#6B6B6B]">EasyUI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
