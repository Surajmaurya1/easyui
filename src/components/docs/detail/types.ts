export type MainTab = 'preview' | 'usage' | 'code' | 'props' | 'accessibility';
export type PkgManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export interface ComponentDetailPageProps {
  /** The component's slug/id — the full EasyComponentMeta is resolved internally
   *  from EASY_COMPONENTS so the initial bundle does not need to carry it. */
  componentId: string;
  onSelectComponent: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateComponents: () => void;
  onNavigateDocs: (topicId?: string) => void;
}

import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { EasyComponentMeta } from '../../../types/component';
import type { InlineDemoComponents } from './demo-types';

export interface DetailPartProps {
  component: EasyComponentMeta;
  activeTab: MainTab;
  setActiveTab: Dispatch<SetStateAction<MainTab>>;
  loadedSourceCode: string | null;
  effectiveSourceCode: string;
  copiedCode: string | null;
  setCopiedCode: Dispatch<SetStateAction<string | null>>;
  pkgManager: PkgManager;
  setPkgManager: Dispatch<SetStateAction<PkgManager>>;
  installMode: 'cli' | 'manual';
  setInstallMode: Dispatch<SetStateAction<'cli' | 'manual'>>;
  isFullscreenPreview: boolean;
  setIsFullscreenPreview: Dispatch<SetStateAction<boolean>>;
  demoKey: number;
  previewMenuOpen: boolean;
  setPreviewMenuOpen: Dispatch<SetStateAction<boolean>>;
  previewMenuRef: RefObject<HTMLDivElement | null>;
  theme: string;
  relatedComponents: EasyComponentMeta[];
  handleCopy: (text: string, label: string) => Promise<void>;
  getInstallDepCommand: () => string;
  inlineDemos: InlineDemoComponents;
  onSelectComponent: ComponentDetailPageProps['onSelectComponent'];
}
