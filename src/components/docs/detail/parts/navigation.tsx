import React, { type Dispatch, type SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, PanelLeft, Search, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { isComponentNew } from '../../../../lib/components';
import { NewBadge } from '../../../common/NewBadge';
import type { EasyComponentMeta } from '../../../../types/component';
import type { ComponentDetailPageProps } from '../types';

type NavigationProps = Pick<ComponentDetailPageProps, 'onSelectComponent' | 'onNavigateHome' | 'onNavigateComponents' | 'onNavigateDocs'> & {
  component: EasyComponentMeta;
  isDesktopSidebarOpen: boolean;
  setIsDesktopSidebarOpen: Dispatch<SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarFilter: string;
  setSidebarFilter: Dispatch<SetStateAction<string>>;
  filteredComponents: EasyComponentMeta[];
};

export const DetailHeader: React.FC<NavigationProps> = ({ component, onNavigateComponents, isDesktopSidebarOpen, setIsDesktopSidebarOpen, setMobileSidebarOpen }) => (
<div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-black/[0.05] dark:border-white/[0.08]">
          {/* Left: PanelLeft Icon + Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setMobileSidebarOpen((prev) => !prev);
                } else {
                  setIsDesktopSidebarOpen((prev) => !prev);
                }
              }}
              className="p-1 -ml-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer flex items-center justify-center shrink-0"
              title={isDesktopSidebarOpen ? 'Toggle sidebar' : 'Expand sidebar'}
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Breadcrumb Trail */}
            <nav aria-label="Breadcrumb" className="text-xs text-text-muted min-w-0">
              <ol className="flex items-center gap-1.5 list-none p-0 m-0 truncate">
                <li>
                  <a
                    href="/components"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onNavigateComponents();
                      }
                    }}
                    className="hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Components
                  </a>
                </li>
                <li aria-hidden className="text-text-subtle"><ChevronRight className="w-3 h-3 text-text-muted" /></li>
                <li aria-current="page" className="text-text-primary font-medium truncate">
                  {component.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
);

export const MobileSidebarDrawer: React.FC<NavigationProps> = ({ component, mobileSidebarOpen, setMobileSidebarOpen, sidebarFilter, setSidebarFilter, filteredComponents, onSelectComponent }) => (
<AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                  mass: 0.8,
                }}
                className="relative w-80 max-w-[85vw] bg-background border-r border-black/[0.06] dark:border-white/[0.08] h-full p-5 overflow-y-auto z-10 flex flex-col gap-4 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Components Catalog</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary bg-[#F1F1F2] dark:bg-[#18181B] border border-black/[0.04] dark:border-white/[0.06] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
                  <input
                    type="text"
                    value={sidebarFilter}
                    onChange={(e) => setSidebarFilter(e.target.value)}
                    placeholder="Filter components..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F1F1F2] dark:bg-[#18181B] border border-black/[0.04] dark:border-white/[0.06] text-[16px] text-text-primary placeholder-text-muted focus:outline-none focus:border-text-subtle transition-colors"
                  />
                </div>
                {/* Items */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest px-2 mb-1.5">
                    Components
                  </h4>
                  <div className="space-y-0.5">
                    {filteredComponents.map((item) => {
                      const isActive = item.id === component.id;
                      const isNew = isComponentNew(item);
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectComponent(item.id);
                            setMobileSidebarOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-[15px] lg:text-[13px] transition-all text-left cursor-pointer',
                            isActive
                              ? 'bg-white dark:bg-[#27272A] text-text-primary font-medium border border-black/[0.04] dark:border-white/[0.08] shadow-xs'
                              : 'text-text-secondary hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                          )}
                        >
                          <span className="truncate">{item.name}</span>
                          {isNew && <NewBadge size="xs" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
);

export const DesktopSidebar: React.FC<NavigationProps> = ({ isDesktopSidebarOpen, sidebarFilter, setSidebarFilter, onNavigateHome, onNavigateComponents, onNavigateDocs, component, filteredComponents, onSelectComponent }) => (
isDesktopSidebarOpen && (
            <aside className="hidden lg:block w-60 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto select-none pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Filter Search Box */}
              <div className="relative mb-5">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
                <input
                  type="text"
                  value={sidebarFilter}
                  onChange={(e) => setSidebarFilter(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#F1F1F2] dark:bg-[#18181B] border border-black/[0.04] dark:border-white/[0.06] text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-text-subtle transition-colors"
                />
                {sidebarFilter && (
                  <button
                    onClick={() => setSidebarFilter('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text-primary"
                    aria-label="Clear filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Navigation Sections */}
              <div className="space-y-5">
                {/* INTRO Section */}
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-2.5 mb-1.5">
                    Intro
                  </h4>
                  <button
                    onClick={onNavigateHome}
                    className="w-full flex items-center px-2.5 py-1.5 rounded-lg text-[13px] sm:text-sm text-text-secondary hover:text-text-primary hover:bg-[#F1F1F2] dark:hover:bg-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    <span>Home</span>
                  </button>
                  <button
                    onClick={onNavigateComponents}
                    className="w-full flex items-center px-2.5 py-1.5 rounded-lg text-[13px] sm:text-sm text-text-secondary hover:text-text-primary hover:bg-[#F1F1F2] dark:hover:bg-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    <span>Components</span>
                  </button>
                </div>

                {/* GUIDES Section */}
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-2.5 mb-1.5">
                    Guides
                  </h4>
                  <button
                    onClick={() => onNavigateDocs('quick-start')}
                    className="w-full flex items-center px-2.5 py-1.5 rounded-lg text-[13px] sm:text-sm text-text-secondary hover:text-text-primary hover:bg-[#F1F1F2] dark:hover:bg-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    <span>Quick Start</span>
                  </button>
                  <button
                    onClick={() => onNavigateDocs('architecture')}
                    className="w-full flex items-center px-2.5 py-1.5 rounded-lg text-[13px] sm:text-sm text-text-secondary hover:text-text-primary hover:bg-[#F1F1F2] dark:hover:bg-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    <span>Architecture</span>
                  </button>
                </div>

                {/* COMPONENTS Section */}
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-2.5 mb-1.5">
                    Components
                  </h4>
                  <div className="space-y-0.5">
                    {filteredComponents.map((item) => {
                      const isActive = item.id === component.id;
                      const isNew = isComponentNew(item);
                      return (
                        <a
                          key={item.id}
                          href={`/components/${item.id}`}
                          onClick={(e) => {
                            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                              e.preventDefault();
                              onSelectComponent(item.id);
                            }
                          }}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] sm:text-sm transition-all text-left group cursor-pointer',
                            isActive
                              ? 'bg-[#F1F1F2] dark:bg-[#18181B] text-text-primary font-medium border border-black/[0.04] dark:border-white/[0.06] shadow-2xs'
                              : 'text-text-secondary hover:text-text-primary hover:bg-[#F1F1F2]/60 dark:hover:bg-[#18181B]/60'
                          )}
                        >
                          <span className="truncate">{item.name}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isNew && <NewBadge size="xs" />}
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          )
);
