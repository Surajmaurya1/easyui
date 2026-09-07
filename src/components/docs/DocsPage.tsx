import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Container } from '../layout/Container';
import { DocSidebar } from './DocSidebar';
import { DocIntroduction } from './sections/DocIntroduction';
import { DocQuickStart } from './sections/DocQuickStart';
import { DocArchitecture } from './sections/DocArchitecture';
import { DocCollaboration } from './sections/DocCollaboration';
import { DocMotionSystem } from './sections/DocMotionSystem';
import { DocSEO } from './sections/DocSEO';

export interface DocsPageProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
  onNavigateHome: () => void;
  onNavigateComponents: () => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({
  activeTopic,
  onSelectTopic,
  onNavigateHome,
  onNavigateComponents,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Derive human-readable topic title for breadcrumbs
  const getBreadcrumbLabel = () => {
    switch (activeTopic) {
      case 'introduction':
        return 'Introduction';
      case 'quick-start':
        return 'Quick Start';
      case 'motion':
        return 'Motion Tokens';
      case 'architecture':
        return 'Registry Architecture';
      case 'seo':
        return 'Automated SEO';
      case 'collaboration':
        return 'Contributing Guide';
      default:
        return 'Documentation';
    }
  };

  const handleSelectTopicWithMobileClose = (topicId: string) => {
    onSelectTopic(topicId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pt-2 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs — quiet one-line rhythm, no heavy border row */}
        <div className="flex items-center justify-between gap-3 py-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Mobile Sidebar Trigger */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Open documentation menu"
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface hover:bg-surface-hover border border-border text-xs font-medium text-text-secondary hover:text-text-primary transition-colors shrink-0 focus-ring cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Menu</span>
            </button>

            {/* Breadcrumbs — same quiet rhythm as the site footer */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[12px] text-text-muted truncate"
            >
              <button
                onClick={onNavigateHome}
                className="hover:text-text-primary transition-colors shrink-0"
              >
                EasyUI
              </button>
              <span className="text-text-subtle">/</span>
              <button
                onClick={() => handleSelectTopicWithMobileClose('introduction')}
                className="hover:text-text-primary transition-colors shrink-0"
              >
                Docs
              </button>
              <span className="text-text-subtle">/</span>
              <span className="text-text-primary truncate">{getBreadcrumbLabel()}</span>
            </nav>
          </div>

          {/* Right Action — quiet back arrow */}
          <button
            onClick={onNavigateComponents}
            aria-label="Back to Components"
            className="p-1.5 rounded-md text-text-subtle hover:text-text-primary hover:bg-surface transition-colors focus-ring cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layout Grid: Sticky Sidebar + Centered Clean Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:w-64 shrink-0 lg:sticky lg:top-24 self-start">
            <DocSidebar
              activeTopic={activeTopic}
              onSelectTopic={handleSelectTopicWithMobileClose}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
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
                  className="relative w-72 max-w-[80vw] bg-surface-raised border-r border-border h-full p-6 overflow-y-auto z-10 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.18em]">
                      Documentation
                    </span>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      aria-label="Close menu"
                      className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <DocSidebar
                    activeTopic={activeTopic}
                    onSelectTopic={handleSelectTopicWithMobileClose}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Main Documentation Article */}
          <main className="flex-1 min-w-0 max-w-3xl pb-12">
            {activeTopic === 'introduction' && (
              <DocIntroduction onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'quick-start' && (
              <DocQuickStart onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'motion' && (
              <DocMotionSystem onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'architecture' && (
              <DocArchitecture onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'seo' && (
              <DocSEO onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'collaboration' && (
              <DocCollaboration onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {/* Fallback to Introduction for unknown or root doc topic */}
            {!['introduction', 'quick-start', 'motion', 'architecture', 'seo', 'collaboration'].includes(activeTopic) && (
              <DocIntroduction onNavigateSection={handleSelectTopicWithMobileClose} />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default DocsPage;
