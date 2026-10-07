import React from 'react';

export type PreloadableComponent<T extends React.ComponentType<any>> =
  React.ComponentType<React.ComponentProps<T>> & {
    preload: () => Promise<T>;
    isLoaded: () => boolean;
  };

/**
 * Creates a code-split component that supports synchronous rendering when preloaded.
 * - On the client: functions like React.lazy, preserving dynamic imports and code splitting.
 * - During SSR/prerender: calling .preload() resolves the component before render,
 *   preventing top-level Suspense boundaries from emitting unresolved fallback shells (<main aria-busy="true">).
 */
export function lazyWithPreload<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T } | Record<string, any>>,
  exportName = 'default'
): PreloadableComponent<T> {
  let LoadedComponent: T | null = null;
  let loadPromise: Promise<T> | null = null;

  const preload = (): Promise<T> => {
    if (!loadPromise) {
      loadPromise = factory().then((mod: any) => {
        LoadedComponent = (mod && mod[exportName]) ? mod[exportName] : (mod?.default || mod);
        return LoadedComponent as T;
      });
    }
    return loadPromise;
  };

  const Lazy = React.lazy(() =>
    preload().then((Comp) => ({ default: Comp }))
  );

  const Component: any = (props: any) => {
    if (LoadedComponent) {
      return React.createElement(LoadedComponent, props);
    }
    return React.createElement(Lazy, props);
  };

  Component.displayName = 'PreloadableLazy';
  Component.preload = preload;
  Component.isLoaded = () => LoadedComponent !== null;

  return Component as PreloadableComponent<T>;
}
