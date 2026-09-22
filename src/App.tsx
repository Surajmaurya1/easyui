import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ComponentDirectory } from './components/sections/ComponentDirectory';
import { DevExperience } from './components/sections/DevExperience';
import { FinalCta } from './components/sections/FinalCta';
import { SpotlightSearch } from './components/ui/SpotlightSearch';
import { EASY_COMPONENTS } from './components/registry/components-data';
import type { EasyComponentMeta } from './types/component';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAnalyticsTracker } from './lib/analytics';
import { useSEO } from './lib/seo';
import { scrollToTop } from './lib/utils';
import { AlertCircle, ArrowLeft, Grid } from 'lucide-react';
import { ComponentDetailPage } from './components/docs/ComponentDetailPage';
import { DocsPage } from './components/docs/DocsPage';
import { AllComponentsPage } from './components/sections/AllComponentsPage';

// Fast Map lookup for components
const COMPONENT_MAP = new Map<string, EasyComponentMeta>(
  EASY_COMPONENTS.map((c) => [c.id, c])
);

export interface RouteState {
  activeView: 'showcase' | 'components' | 'docs' | 'component-detail' | 'component-not-found';
  selectedComponent: EasyComponentMeta | null;
  invalidComponentSlug: string | null;
  activeDocTopic: string;
  componentPage: number;
}

/**
 * Pure route parser — extracts the initial and active route state synchronously
 * from a given pathname/search string or from window.location.
 * Runs identically on server (SSR/prerender) and client (hydration/navigation).
 */
export function parseRouteFromUrl(pathname?: string, search?: string): RouteState {
  let effectivePath = pathname;
  let effectiveSearch = search;

  if (effectivePath === undefined && typeof window !== 'undefined') {
    effectivePath = window.location.pathname;
    effectiveSearch = window.location.search;

    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (rawHash.startsWith('components') || rawHash.startsWith('docs') || rawHash.startsWith('all-components')) {
      let migratedPath = '/' + rawHash;
      if (rawHash.includes('?')) {
        const [r, q] = rawHash.split('?');
        migratedPath = '/' + r + (q ? '?' + q : '');
      }
      try {
        window.history.replaceState(null, '', migratedPath);
        effectivePath = window.location.pathname;
        effectiveSearch = window.location.search;
      } catch {
        /* ignore */
      }
    }
  }

  const currentPath = effectivePath || '/';
  const currentSearch = effectiveSearch || '';

  let pageFromUrl = 1;
  if (currentSearch) {
    const params = new URLSearchParams(currentSearch);
    const p = parseInt(params.get('page') || '1', 10);
    if (!isNaN(p) && p > 0) pageFromUrl = p;
  }

  const cleanPath = currentPath.replace(/^\/+|\/+$/g, '');

  // 1. Dedicated component page route: /components/:slug
  if (cleanPath.startsWith('components/')) {
    const compSlug = cleanPath.replace(/^components\//, '').split('/')[0];
    const found = COMPONENT_MAP.get(compSlug);
    if (found) {
      return {
        activeView: 'component-detail',
        selectedComponent: found,
        invalidComponentSlug: null,
        activeDocTopic: 'introduction',
        componentPage: 1,
      };
    } else {
      return {
        activeView: 'component-not-found',
        selectedComponent: null,
        invalidComponentSlug: compSlug,
        activeDocTopic: 'introduction',
        componentPage: 1,
      };
    }
  }

  // 2. All components catalog view: /components or /all-components
  if (cleanPath === 'components' || cleanPath === 'all-components') {
    return {
      activeView: 'components',
      selectedComponent: null,
      invalidComponentSlug: null,
      activeDocTopic: 'introduction',
      componentPage: pageFromUrl,
    };
  }

  // 3. Documentation topics: /docs, /doc, /docs/:topic, /doc/:topic
  if (
    cleanPath === 'docs' ||
    cleanPath === 'doc' ||
    cleanPath.startsWith('docs/') ||
    cleanPath.startsWith('doc/')
  ) {
    const parts = cleanPath.split('/');
    let topic = 'introduction';
    if (parts.length > 1 && parts[1]) {
      const rawTopic = parts[1].toLowerCase();
      if (rawTopic === 'motion-tokens') {
        topic = 'motion';
      } else if (rawTopic === 'contributing') {
        topic = 'collaboration';
      } else {
        topic = rawTopic;
      }
    }
    return {
      activeView: 'docs',
      selectedComponent: null,
      invalidComponentSlug: null,
      activeDocTopic: topic,
      componentPage: 1,
    };
  }

  // 4. Default: showcase / homepage (/)
  return {
    activeView: 'showcase',
    selectedComponent: null,
    invalidComponentSlug: null,
    activeDocTopic: 'introduction',
    componentPage: 1,
  };
}

export interface AppProps {
  initialPath?: string;
}

export function App({ initialPath }: AppProps = {}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [routeState, setRouteState] = useState<RouteState>(() => parseRouteFromUrl(initialPath));
  const { activeView, selectedComponent, invalidComponentSlug, activeDocTopic, componentPage } = routeState;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize analytics & track page/view changes across the SPA
  useAnalyticsTracker({ activeView, componentPage, activeDocTopic });

  // Dynamic SEO metadata & JSON-LD management
  useSEO({
    activeView: activeView === 'component-not-found' ? 'showcase' : activeView,
    componentPage,
    activeDocTopic,
    selectedComponent,
  });

  // Sync state from URL pathname and search params
  const syncUrlState = useCallback(() => {
    setRouteState(parseRouteFromUrl());
  }, []);

  const navigate = useCallback(
    (path: string, replace = false) => {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
      syncUrlState();
    },
    [syncUrlState]
  );

  useEffect(() => {
    syncUrlState();
    window.addEventListener('popstate', syncUrlState);
    return () => {
      window.removeEventListener('popstate', syncUrlState);
    };
  }, [syncUrlState]);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top instantly whenever the active view changes
  useEffect(() => {
    scrollToTop();
  }, [activeView]);

  const handleSelectComponentById = useCallback(
    (id: string) => {
      const found = COMPONENT_MAP.get(id);
      if (found) {
        navigate(`/components/${found.id}`);
        scrollToTop();
      } else {
        navigate(`/components/${id}`);
        scrollToTop();
      }
    },
    [navigate]
  );

  const handleNavigateAllComponents = useCallback(
    (page = 1) => {
      const searchParams = new URLSearchParams(window.location.search);
      if (page > 1) {
        searchParams.set('page', page.toString());
      } else {
        searchParams.delete('page');
      }
      const newQuery = searchParams.toString();
      const newPath = newQuery ? `/components?${newQuery}` : '/components';
      navigate(newPath);
      scrollToTop();
    },
    [navigate]
  );

  const handleNavigateComponents = useCallback(() => {
    const targetPage = componentPage > 1 ? componentPage : 1;
    handleNavigateAllComponents(targetPage);
  }, [handleNavigateAllComponents, componentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      const searchParams = new URLSearchParams(window.location.search);
      if (page > 1) {
        searchParams.set('page', page.toString());
      } else {
        searchParams.delete('page');
      }
      const newQuery = searchParams.toString();
      const newPath = newQuery ? `/components?${newQuery}` : '/components';
      navigate(newPath);
      scrollToTop();
    },
    [navigate]
  );

  const handleNavigateHome = useCallback(() => {
    navigate('/');
    scrollToTop();
  }, [navigate]);

  const handleNavigateDocs = useCallback(
    (topicId?: string) => {
      const topic = topicId || 'introduction';
      navigate(`/docs/${topic}`);
      scrollToTop();
    },
    [navigate]
  );

  const handleSelectDocTopic = useCallback(
    (topicId: string) => {
      navigate(`/docs/${topicId}`);
      scrollToTop();
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-accent/25 selection:text-text-primary">
      {/* Vercel Analytics & Speed Insights (active on production deployment after hydration) */}
      {mounted &&
        typeof window !== 'undefined' &&
        !window.location.hostname.includes('localhost') &&
        !window.location.hostname.includes('127.0.0.1') && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}

      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateComponents={handleNavigateComponents}
        onNavigateDocs={() => handleNavigateDocs('introduction')}
        onNavigateHome={handleNavigateHome}
        activeView={activeView === 'component-not-found' ? 'components' : activeView}
      />

      {/* Main View Router */}
      {activeView === 'component-detail' && selectedComponent ? (
        <ComponentDetailPage
          component={selectedComponent}
          onSelectComponent={handleSelectComponentById}
          onNavigateHome={handleNavigateHome}
          onNavigateComponents={handleNavigateComponents}
          onNavigateDocs={handleNavigateDocs}
        />
      ) : activeView === 'component-not-found' ? (
        <main className="min-h-[70vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-2xl bg-surface border border-border space-y-5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-text-primary tracking-tight">Component Not Found</h1>
              <p className="text-xs text-text-secondary leading-relaxed">
                No component exists matching{' '}
                <code className="px-1.5 py-0.5 rounded bg-surface-hover text-rose-500 font-mono">
                  /components/{invalidComponentSlug || 'unknown'}
                </code>
                . It may have been moved or renamed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleNavigateComponents}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-background text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Browse Components</span>
              </button>
              <button
                type="button"
                onClick={handleNavigateHome}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-hover hover:bg-surface-raised border border-border text-xs text-text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </main>
      ) : activeView === 'docs' ? (
        <DocsPage
          activeTopic={activeDocTopic}
          onSelectTopic={handleSelectDocTopic}
          onNavigateHome={handleNavigateHome}
          onNavigateComponents={handleNavigateComponents}
        />
      ) : activeView === 'components' ? (
        <AllComponentsPage
          currentPage={componentPage}
          onPageChange={handlePageChange}
          onSelectComponent={handleSelectComponentById}
          onNavigateHome={handleNavigateHome}
          onNavigateDocs={() => handleNavigateDocs('introduction')}
        />
      ) : (
        <main>
          {/* Hero */}
          <HeroSection
            onExplore={handleNavigateComponents}
            onSelectComponent={handleSelectComponentById}
          />

          {/* How It Works (Dev Experience) */}
          <DevExperience onExploreDocs={() => handleNavigateDocs('introduction')} />

          {/* Component Directory (Homepage limited 6 items) */}
          <ComponentDirectory
            onSelectComponent={handleSelectComponentById}
            onNavigateAllComponents={() => handleNavigateAllComponents(1)}
          />

          {/* Final CTA */}
          <FinalCta onBrowse={() => handleNavigateAllComponents(1)} />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigateComponents={handleNavigateComponents}
        onNavigateDocs={() => handleNavigateDocs('introduction')}
      />

      {/* Global Spotlight Search (⌘K) */}
      <SpotlightSearch
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelectComponent={handleSelectComponentById}
        onNavigateDocs={handleNavigateDocs}
      />
    </div>
  );
}

export default App;
