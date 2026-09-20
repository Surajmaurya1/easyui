import React from 'react';
import type { EasyComponentMeta } from '../../../types/component';

export type PreviewType = 'interactive' | 'lightweight' | 'static' | 'deferred';

export interface ComponentPreviewProps {
  component: EasyComponentMeta;
  isHovered?: boolean;
  isInViewport?: boolean;
}

export interface ComponentPreviewMetadata {
  type?: PreviewType;
  requiresPointer?: boolean;
  heavyAnimation?: boolean;
  description?: string;
  [key: string]: unknown;
}

export interface ComponentPreviewDefinition {
  id: string;
  componentId: string;
  aliases?: string[];
  load: () => Promise<{ default: React.ComponentType<ComponentPreviewProps> }>;
  fallback?: React.ComponentType<ComponentPreviewProps> | React.ReactNode;
  metadata?: ComponentPreviewMetadata;
}
