import React, { useState, useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search, ArrowRight } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { ComponentPagination } from '../common/ComponentPagination';
import {
  getSortedComponents,
  isComponentNew,
  getPaginatedComponents,
} from '../../lib/components';
import { cn } from '../../lib/utils';

export interface ComponentDirectoryProps {
  onSelectComponent: (id: string) => void;
  onNavigateAllComponents?: () => void;
}

const HOMEPAGE_PAGE_SIZE = 6;

export const ComponentDirectory: React.FC<ComponentDirectoryProps> = ({
  onSelectComponent,
  onNavigateAllComponents,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('easyui_dir_page');
      const p = saved ? parseInt(saved, 10) : 1;
      return !isNaN(p) && p > 0 ? p : 1;
    }
    return 1;
  });

  const categories: ComponentCategory[] = [
    'All',
    'Recent',
    'Motion',
    'Buttons',
    'Navigation',
    'Feedback',
    'Overlays',
    'Forms',
    'Auth',
  ];

  // 1. Sort components by createdAt DESC
  const allSortedComponents = useMemo(() => {
    return getSortedComponents(EASY_COMPONENTS);
  }, []);

  // 2. Filter by category & search
  const filteredComponents = useMemo(() => {
    return allSortedComponents.filter((comp) => {
      const isRecent =
        isComponentNew(comp) ||
        comp.badges?.some((b) => b.toLowerCase() === 'new');

      const matchCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Recent'
          ? isRecent
          : comp.category === selectedCategory;

      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allSortedComponents, selectedCategory, searchQuery]);

  // 3. Calculate pagination (6 per page across all category components)
  const pagination = useMemo(() => {
    return getPaginatedComponents(filteredComponents, currentPage, HOMEPAGE_PAGE_SIZE);
  }, [filteredComponents, currentPage]);

  const handleCategorySelect = (cat: ComponentCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section id="components-directory" className="py-24 sm:py-32 lg:py-40 bg-background border-t border-border">
      <Container size="xl">
        {/* Section header — eyebrow + headline + count, no supporting paragraph */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
              Directory
            </span>
            <h2 className="mt-3 text-3xl sm:text-[44px] font-semibold text-text-primary tracking-[-0.02em] leading-[1.1]">
              Components
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-text-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-[14px] rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-text-subtle transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills — text-only, no border, no bg, generous spacing */}
        <div className="flex items-center gap-7 overflow-x-auto pb-4 mb-10 sm:mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={cn(
                'relative text-[13px] font-medium whitespace-nowrap transition-colors focus-ring cursor-pointer',
                selectedCategory === cat
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {cat}
              {selectedCategory === cat && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-text-primary" aria-hidden />
              )}
            </button>
          ))}
        </div>

        {/* Components Grid — larger gap, larger breathing room */}
        {filteredComponents.length === 0 ? (
          <div className="py-24 text-center rounded-xl border border-border bg-surface px-4">
            {selectedCategory === 'Recent' ? (
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm text-text-secondary leading-relaxed">
                  No recent components available at the moment. Check out all components on the components page.
                </p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateAllComponents) {
                        onNavigateAllComponents();
                      } else {
                        setSelectedCategory('All');
                        setSearchQuery('');
                        setCurrentPage(1);
                      }
                    }}
                    className="px-4 py-2 text-xs rounded-xl bg-accent text-background font-medium hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    View all components
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm text-text-muted">No components found matching your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="mt-2 text-xs text-text-primary hover:underline focus-ring rounded cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {pagination.items.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  isNew={isComponentNew(comp)}
                  onSelect={onSelectComponent}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-16 sm:mt-20">
                <ComponentPagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    if (typeof window !== 'undefined') {
                      sessionStorage.setItem('easyui_dir_page', page.toString());
                    }
                    const el = document.getElementById('components-directory');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            )}

            {/* View all components — text-led, centered */}
            {onNavigateAllComponents && (
              <div className="mt-16 flex justify-center">
                <button
                  type="button"
                  onClick={onNavigateAllComponents}
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
                >
                  <span className="relative">
                    View all components
                    <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-text-secondary transition-transform duration-300" />
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

