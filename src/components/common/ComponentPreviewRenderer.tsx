import React, { useState, useEffect, useRef, Suspense } from 'react';
import type { ComponentCatalogIndex } from '../../types/component';
import { getComponentPreview, getLazyPreviewComponent } from '../registry/previews';
import { PreviewSkeleton } from './PreviewSkeleton';
import { PreviewErrorBoundary } from './PreviewErrorBoundary';

export interface ComponentPreviewRendererProps {
  component: ComponentCatalogIndex;
  isHovered?: boolean;
  className?: string;
}

/**
 * Fallback display shown when a component does not have a registered interactive preview.
 */
function DefaultPreviewFallback({ component }: { component: ComponentCatalogIndex }) {
  return (
    <div
      data-testid="default-preview-fallback"
      className="h-52 flex flex-col items-center justify-center p-4 text-center select-none"
    >
      <span className="text-xs font-semibold text-text-primary mb-1">{component.name}</span>
      <span className="text-[11px] text-text-muted line-clamp-2 max-w-50">
        {component.tagline || component.description}
      </span>
    </div>
  );
}

/**
 * Generic preview host component.
 *
 * Responsibilities:
 * 1. Resolves preview definition from the preview registry.
 * 2. Uses IntersectionObserver to defer module downloading until near or in viewport.
 * 3. Renders a layout-shift-free Suspense skeleton matching card dimensions.
 * 4. Isolates runtime errors using PreviewErrorBoundary to prevent crashing sibling cards.
 * 5. Passes `isInViewport` to previews for pausing heavy background animations when scrolled away.
 */
export const ComponentPreviewRenderer: React.FC<ComponentPreviewRendererProps> = ({
  component,
  isHovered = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to false on both server (SSR) and client initial render to ensure 100% hydration parity.
  // IntersectionObserver will trigger loading after mount when in viewport (or immediately in tests).
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    const isIoSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    if (!isIoSupported) {
      setHasEnteredViewport(true);
      setIsInViewport(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;
        if (isIntersecting) {
          setHasEnteredViewport(true);
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      },
      {
        rootMargin: '120px 0px', // Smooth preload and resume slightly ahead of viewport
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const definition = getComponentPreview(component.id);
  const LazyComponent = definition ? getLazyPreviewComponent(component.id) : null;

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <PreviewErrorBoundary componentId={component.id} componentName={component.name}>
        {!definition || !LazyComponent ? (
          <DefaultPreviewFallback component={component} />
        ) : !hasEnteredViewport ? (
          <PreviewSkeleton componentId={component.id} />
        ) : (
          <Suspense fallback={<PreviewSkeleton componentId={component.id} />}>
            <LazyComponent
              component={component}
              isHovered={isHovered}
              isInViewport={isInViewport}
            />
          </Suspense>
        )}
      </PreviewErrorBoundary>
    </div>
  );
};
