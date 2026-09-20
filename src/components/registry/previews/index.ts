import React from 'react';
import type { ComponentPreviewProps } from './types';
import { getComponentPreview } from './registry';

const lazyComponentCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType<ComponentPreviewProps>>
>();

/**
 * Returns a cached React.lazy instance for the given component preview definition.
 * Caching prevents recreating the lazy wrapper on every render.
 */
export function getLazyPreviewComponent(
  id: string
): React.LazyExoticComponent<React.ComponentType<ComponentPreviewProps>> | null {
  const definition = getComponentPreview(id);
  if (!definition) return null;

  let LazyComp = lazyComponentCache.get(definition.id);
  if (!LazyComp) {
    LazyComp = React.lazy(definition.load);
    lazyComponentCache.set(definition.id, LazyComp);
  }
  return LazyComp;
}

export * from './types';
export * from './registry';
