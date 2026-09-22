import React, { useState, useMemo, useEffect } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { ComponentPagination } from '../common/ComponentPagination';
import { InspirationNote } from '../common/InspirationNote';
import {
  getSortedComponents,
  isComponentNew,
  getPaginatedComponents,
  ITEMS_PER_PAGE,
} from '../../lib/components';
import { cn } from '../../lib/utils';

export interface AllComponentsPageProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectComponent: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateDocs: () => void;
}

export const AllComponentsPage: React.FC<AllComponentsPageProps> = ({
  currentPage,
  onPageChange,
  onSelectComponent,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category filter from query params after mount/hydration
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const validCategories: ComponentCategory[] = [
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
      if (cat && validCategories.includes(cat as ComponentCategory)) {
        setSelectedCategory(cat as ComponentCategory);
      }
    } catch {
      /* ignore */
    }
  }, []);

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

  // 1. Sort all components by createdAt DESC
  const allSortedComponents = useMemo(() => {
    return getSortedComponents(EASY_COMPONENTS);
  }, []);

  // 2. Filter by category & search query
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

  // 4. Calculate pagination
  const pagination = useMemo(() => {
    return getPaginatedComponents(filteredComponents, currentPage, ITEMS_PER_PAGE);
  }, [filteredComponents, currentPage]);

  // Scroll to top immediately when mounting AllComponentsPage or changing page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
      onPageChange(1);
    }
  }, [pagination.totalPages, currentPage, onPageChange]);

  const handleCategoryChange = (cat: ComponentCategory) => {
    setSelectedCategory(cat);
    const searchParams = new URLSearchParams(window.location.search);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    searchParams.delete('page');
    const newQuery = searchParams.toString();
    const newPath = newQuery ? `/components?${newQuery}` : '/components';
    window.history.replaceState(null, '', newPath);
    onPageChange(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onPageChange(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pt-12 sm:pt-20 pb-24">
      <Container size="xl">
        {/* Breadcrumb — quiet, no border */}
        <div className="flex items-center gap-2 mb-10 sm:mb-14 text-[12px] text-text-muted">
          <button
            onClick={onNavigateHome}
            className="hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
          >
            EasyUI
          </button>
          <span aria-hidden>/</span>
          <span className="text-text-secondary">All components</span>
        </div>

        {/* Section header — eyebrow + headline + count, no supporting paragraph */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
              Directory
            </span>
            <h1 className="mt-3 text-4xl sm:text-[52px] font-semibold text-text-primary tracking-[-0.025em] leading-[1.05]">
              All components
            </h1>
            <p className="mt-4 text-[14px] text-text-secondary max-w-md leading-relaxed">
              {allSortedComponents.length} components. Crafted with spring physics, copy-paste ownership, zero configuration.
            </p>
          </div>

          {/* Search Bar — simplified */}
          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <InspirationNote />
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-text-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-[14px] rounded-lg bg-surface border border-border focus:border-text-subtle text-text-primary placeholder-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category filter — text-only, generous spacing */}
        <div className="flex items-center gap-7 overflow-x-auto pb-4 mb-10 sm:mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        {/* Components Grid */}
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
                      setSelectedCategory('All');
                      setSearchQuery('');
                      onPageChange(1);
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
                    onPageChange(1);
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
            <div className="mt-16 sm:mt-20">
              <ComponentPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) => {
                  onPageChange(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
