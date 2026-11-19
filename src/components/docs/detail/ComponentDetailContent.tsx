import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EASY_COMPONENTS } from '../../registry/components-data';
import { useDetailUiState, useSidebarComponents } from './hooks';
import { INLINE_DEMO_COMPONENTS } from './inline-demo-registry';
import { DetailHeader, DesktopSidebar, MobileSidebarDrawer } from './parts/navigation';
import { CodeSection, OverviewSection, PropsSection, RelatedSection, TabNavigation, UsageSection } from './parts/content';
import { FullscreenOverlay, PreviewSection } from './parts/preview';
import { InstallSection } from './parts/install';
import type { InlineDemoComponents } from './demo-types';
import { AnimatedTabs } from '../../ui/AnimatedTabs';
import { copyToClipboard } from '../../../lib/utils';
import { trackTracwellEvent } from '../../../lib/tracwell-client';
import { useComponentSource } from '../../../lib/source-loader';



import type { ComponentDetailPageProps, MainTab } from './types';

const INLINE_DEMO_COMPONENTS_WITH_TABS: InlineDemoComponents = { ...INLINE_DEMO_COMPONENTS, AnimatedTabs };

export const ComponentDetailContent: React.FC<ComponentDetailPageProps> = ({
  componentId,
  onSelectComponent,
  onNavigateHome,
  onNavigateComponents,
  onNavigateDocs,
}) => {
  // Resolve the full component metadata from the catalog — EASY_COMPONENTS is already
  // in this chunk, so this lookup adds no extra bundle cost.
  const component = EASY_COMPONENTS.find((c) => c.id === componentId);

  const [activeTab, setActiveTab] = useState<MainTab>('preview');
  const { sourceCode: loadedSourceCode } = useComponentSource(component?.id || '', activeTab === 'code');
  const effectiveSourceCode = loadedSourceCode || component?.sourceCode || '';
  const { copiedCode, setCopiedCode, pkgManager, setPkgManager, installMode, setInstallMode, isFullscreenPreview, setIsFullscreenPreview, sidebarFilter, setSidebarFilter, mobileSidebarOpen, setMobileSidebarOpen, isDesktopSidebarOpen, setIsDesktopSidebarOpen, demoKey, previewMenuOpen, setPreviewMenuOpen, previewMenuRef, theme } = useDetailUiState(component?.id, setActiveTab);

  const { filteredComponents, relatedComponents } = useSidebarComponents(sidebarFilter, component);

  // Guard: if the component doesn't exist (e.g., stale link), show a fallback.
  // This should not occur in normal operation since routing validates the ID first.
  if (!component) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center p-6">
        <p className="text-text-secondary text-sm">Component not found.</p>
      </main>
    );
  }

  const handleCopy = async (text: string, label: string) => {
    const copied = await copyToClipboard(text);
    if (!copied) return;
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
    trackTracwellEvent('component_code_copied', {
      component_id: component.id,
      code_type: label,
    });
  };

  const getInstallDepCommand = () => {
    const deps = component.dependencies || [];
    if (deps.length === 0) return 'npm install';
    const depStr = deps.join(' ');
    switch (pkgManager) {
      case 'npm':
        return `npm install ${depStr}`;
      case 'yarn':
        return `yarn add ${depStr}`;
      case 'bun':
        return `bun add ${depStr}`;
      case 'pnpm':
      default:
        return `pnpm add ${depStr}`;
    }
  };


  const navigationProps = {
    component,
    isDesktopSidebarOpen,
    setIsDesktopSidebarOpen,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    sidebarFilter,
    setSidebarFilter,
    filteredComponents,
    onSelectComponent,
    onNavigateHome,
    onNavigateComponents,
    onNavigateDocs,
  };

  const detailProps = { ...navigationProps, activeTab, setActiveTab, loadedSourceCode, effectiveSourceCode, copiedCode, setCopiedCode, pkgManager, setPkgManager, installMode, setInstallMode, isFullscreenPreview, setIsFullscreenPreview, demoKey, previewMenuOpen, setPreviewMenuOpen, previewMenuRef, theme, relatedComponents, handleCopy, getInstallDepCommand, inlineDemos: INLINE_DEMO_COMPONENTS_WITH_TABS };

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-[#3B82F6]/25 selection:text-text-primary">
      {/* Documentation Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Navigation & Breadcrumb Bar with PanelLeft Icon */}
        <DetailHeader {...navigationProps} />

        {/* Mobile Navigation Drawer */}
        <MobileSidebarDrawer {...navigationProps} />

        {/* 2-Column Responsive Layout */}
        <div className="flex gap-6 lg:gap-8 items-start">
          {/* ========================================================================= */}
          {/* 1. LEFT SIDEBAR: Clean minimalist documentation navigation                 */}
          {/* ========================================================================= */}
          <DesktopSidebar {...navigationProps} />

          {/* ========================================================================= */}
          {/* 2. CENTER COLUMN: Dedicated Component Documentation Surface               */}
          {/* ========================================================================= */}
          <main className="flex-1 min-w-0 pb-20">
            <article className="space-y-8">
              {/* Header: Title and Description in the Dollar-Cost Averaging minimal card aesthetic */}
              <OverviewSection {...detailProps} />

              {/* ========================================================================= */}
              {/* MINIMAL GLASS TABS: Using AnimatedTabs Component                           */}
              {/* ========================================================================= */}
              <TabNavigation {...detailProps} />

              {/* ========================================================================= */}
              {/* TAB VIEW 1: PREVIEW (Interactive Surface Box in #F1F1F2 / #18181B)        */}
              {/* ========================================================================= */}
              <PreviewSection {...detailProps} />

              {/* ========================================================================= */}
              {/* TAB VIEW 2: USAGE                                                         */}
              {/* ========================================================================= */}
              <UsageSection {...detailProps} />

              {/* ========================================================================= */}
              {/* TAB VIEW 3: CODE (Source)                                                 */}
              {/* ========================================================================= */}
              <CodeSection {...detailProps} />

              {/* ========================================================================= */}
              {/* SECTION: INSTALLATION                                                     */}
              {/* ========================================================================= */}
              <InstallSection {...detailProps} />

              {/* ========================================================================= */}
              {/* SECTION: PROPS & API REFERENCE                                            */}
              {/* ========================================================================= */}
              <PropsSection {...detailProps} />

              {/* ========================================================================= */}
              {/* SECTION: RELATED COMPONENTS                                               */}
              {/* ========================================================================= */}
              <RelatedSection {...detailProps} />
            </article>
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Fullscreen Overlay for Component Stage                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        <FullscreenOverlay {...detailProps} />
      </AnimatePresence>
    </div>
  );
};

export default ComponentDetailContent;
