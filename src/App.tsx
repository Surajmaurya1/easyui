import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
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
import { ThemeProvider } from './lib/theme/useTheme';
import { AlertCircle, ArrowLeft, Grid } from 'lucide-react';

// Route-level lazy loading for bundle optimization
const ComponentDetailPage = lazy(() =>
  import('./components/docs/ComponentDetailPage').then((m) => ({ default: m.ComponentDetailPage }))
);
const DocsPage = lazy(() =>
  import('./components/docs/DocsPage').then((m) => ({ default: m.DocsPage }))
);
const AllComponentsPage = lazy(() =>
  import('./components/sections/AllComponentsPage').then((m) => ({ default: m.AllComponentsPage }))
);

// Fast Map lookup for components
const COMPONENT_MAP = new Map<string, EasyComponentMeta>(
  EASY_COMPONENTS.map((c) => [c.id, c])
);

// Consistent EasyUI page loading indicator
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-xs text-text-muted font-mono">
      <div className="w-6 h-6 border-2 border-border border-t-text-primary rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  );
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<EasyComponentMeta | null>(null);
  const [invalidComponentSlug, setInvalidComponentSlug] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<
    'showcase' | 'components' | 'docs' | 'component-detail' | 'component-not-found'
  >('showcase');
  const [activeDocTopic, setActiveDocTopic] = useState<string>('introduction');
  const [componentPage, setComponentPage] = useState<number>(1);

  // Initialize analytics & track page/view changes across the SPA
  useAnalyticsTracker({ activeView, componentPage, activeDocTopic });

  // Dynamic SEO metadata & JSON-LD management
  useSEO({
    activeView: activeView === 'component-not-found' ? 'showcase' : activeView,
    componentPage,
    activeDocTopic,
    selectedComponent,
  });

  // Sync state from URL pathname and search params (with legacy hash migration support)
  const parseUrlState = useCallback(() => {
    let pathname = window.location.pathname;
    let search = window.location.search;
    const rawHash = window.location.hash.replace(/^#\/?/, '');

    // Seamless migration for legacy bookmarks/links using hash: #components/slug -> /components/slug
    if (rawHash.startsWith('components') || rawHash.startsWith('docs') || rawHash.startsWith('all-components')) {
      let migratedPath = '/' + rawHash;
      if (rawHash.includes('?')) {
        const [r, q] = rawHash.split('?');
        migratedPath = '/' + r + (q ? '?' + q : '');
      }
      window.history.replaceState(null, '', migratedPath);
      pathname = window.location.pathname;
      search = window.location.search;
    }

    // Check pagination search query params (e.g. ?page=2)
    let pageFromUrl = 1;
    if (search) {
      const params = new URLSearchParams(search);
      const p = parseInt(params.get('page') || '1', 10);
      if (!isNaN(p) && p > 0) pageFromUrl = p;
    }

    const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

    // 1. Dedicated component page route: /components/:slug
    if (cleanPath.startsWith('components/')) {
      const compSlug = cleanPath.replace(/^components\//, '').split('/')[0];
      const found = COMPONENT_MAP.get(compSlug);
      if (found) {
        setSelectedComponent(found);
        setInvalidComponentSlug(null);
        setActiveView('component-detail');
        return;
      } else {
        // Invalid component slug: render explicit 404 state instead of silent redirect
        setSelectedComponent(null);
        setInvalidComponentSlug(compSlug);
        setActiveView('component-not-found');
        return;
      }
    }

    // 2. All components catalog view: /components or /all-components
    if (cleanPath === 'components' || cleanPath === 'all-components') {
      setSelectedComponent(null);
      setInvalidComponentSlug(null);
      setActiveView('components');
      setComponentPage(pageFromUrl);
      return;
    }

    // 3. Documentation topics: /docs, /doc, /docs/:topic, /doc/:topic
    if (
      cleanPath === 'docs' ||
      cleanPath === 'doc' ||
      cleanPath.startsWith('docs/') ||
      cleanPath.startsWith('doc/')
    ) {
      setSelectedComponent(null);
      setInvalidComponentSlug(null);
      setActiveView('docs');
      const parts = cleanPath.split('/');
      if (parts.length === 1 || !parts[1]) {
        setActiveDocTopic('introduction');
      } else {
        const rawTopic = parts[1].toLowerCase();
        if (rawTopic === 'motion-tokens') {
          setActiveDocTopic('motion');
        } else if (rawTopic === 'contributing') {
          setActiveDocTopic('collaboration');
        } else {
          setActiveDocTopic(rawTopic);
        }
      }
      return;
    }

    // 4. Default: showcase / homepage (/)
    setSelectedComponent(null);
    setInvalidComponentSlug(null);
    setActiveView('showcase');
  }, []);

  const navigate = useCallback(
    (path: string, replace = false) => {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
      parseUrlState();
    },
    [parseUrlState]
  );

  useEffect(() => {
    parseUrlState();
    window.addEventListener('popstate', parseUrlState);
    return () => {
      window.removeEventListener('popstate', parseUrlState);
    };
  }, [parseUrlState]);

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
        setSelectedComponent(found);
        setInvalidComponentSlug(null);
        setActiveView('component-detail');
        navigate(`/components/${found.id}`);
        scrollToTop();
      } else {
        setSelectedComponent(null);
        setInvalidComponentSlug(id);
        setActiveView('component-not-found');
        navigate(`/components/${id}`);
        scrollToTop();
      }
    },
    [navigate]
  );

  const handleNavigateAllComponents = useCallback(
    (page = 1) => {
      setSelectedComponent(null);
      setInvalidComponentSlug(null);
      const searchParams = new URLSearchParams(window.location.search);
      if (page > 1) {
        searchParams.set('page', page.toString());
      } else {
        searchParams.delete('page');
      }
      const newQuery = searchParams.toString();
      const newPath = newQuery ? `/components?${newQuery}` : '/components';
      navigate(newPath);
      setActiveView('components');
      setComponentPage(page);
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
      setComponentPage(page);
      scrollToTop();
    },
    [navigate]
  );

  const handleNavigateHome = useCallback(() => {
    setSelectedComponent(null);
    setInvalidComponentSlug(null);
    navigate('/');
    setActiveView('showcase');
    scrollToTop();
  }, [navigate]);

  const handleNavigateDocs = useCallback(
    (topicId?: string) => {
      setSelectedComponent(null);
      setInvalidComponentSlug(null);
      const topic = topicId || 'introduction';
      navigate(`/docs/${topic}`);
      setActiveView('docs');
      setActiveDocTopic(topic);
      scrollToTop();
    },
    [navigate]
  );

  const handleSelectDocTopic = useCallback(
    (topicId: string) => {
      navigate(`/docs/${topicId}`);
      setActiveDocTopic(topicId);
      scrollToTop();
    },
    [navigate]
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-accent/25 selection:text-text-primary">
        {/* Vercel Analytics & Speed Insights (active on production deployment) */}
        {typeof window !== 'undefined' &&
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

        {/* Main View Router with Suspense */}
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>

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
    </ThemeProvider>
  );
}

export default App;
