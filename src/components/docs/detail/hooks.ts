import React, { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { useTheme } from '../../../lib/theme/useTheme';
import { EASY_COMPONENTS } from '../../registry/components-data';
import type { EasyComponentMeta } from '../../../types/component';
import type { MainTab, PkgManager } from './types';

export function useDetailUiState(
  componentId: string | undefined,
  setActiveTab: Dispatch<SetStateAction<MainTab>>,
) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [pkgManager, setPkgManager] = useState<PkgManager>('pnpm');
  const [installMode, setInstallMode] = useState<'cli' | 'manual'>('cli');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [demoKey] = useState(0);
  const [previewMenuOpen, setPreviewMenuOpen] = useState(false);
  const previewMenuRef = React.useRef<HTMLDivElement>(null);
  // Preview surface follows the global page theme (no local toggle).
  const { theme } = useTheme();

  // Reset tab and scroll top on component change
  useEffect(() => {
    setActiveTab('preview');
    setIsFullscreenPreview(false);
    setMobileSidebarOpen(false);
    setPreviewMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [componentId]);

  // Click outside to close preview options menu
  useEffect(() => {
    if (!previewMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (previewMenuRef.current && !previewMenuRef.current.contains(e.target as Node)) {
        setPreviewMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [previewMenuOpen]);

  // Handle ESC for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenPreview) {
        setIsFullscreenPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenPreview]);


  return { copiedCode, setCopiedCode, pkgManager, setPkgManager, installMode, setInstallMode, isFullscreenPreview, setIsFullscreenPreview, sidebarFilter, setSidebarFilter, mobileSidebarOpen, setMobileSidebarOpen, isDesktopSidebarOpen, setIsDesktopSidebarOpen, demoKey, previewMenuOpen, setPreviewMenuOpen, previewMenuRef, theme };
}

export function useSidebarComponents(sidebarFilter: string, component: EasyComponentMeta | undefined) {
  // Filtered components list for the sidebar
  const filteredComponents = useMemo(() => {
    return EASY_COMPONENTS.filter(
      (i) =>
        !sidebarFilter ||
        i.name.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
        i.category.toLowerCase().includes(sidebarFilter.toLowerCase())
    );
  }, [sidebarFilter]);

  // Related components from same or other categories
  const relatedComponents = useMemo(() => {
    if (!component) return [];
    return EASY_COMPONENTS.filter(
      (c) => c.id !== component.id && c.category === component.category
    ).slice(0, 3);
  }, [component]);


  return { filteredComponents, relatedComponents };
}
