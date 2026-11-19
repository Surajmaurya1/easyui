import { useState, useEffect, useCallback } from 'react';

const sourceCache = new Map<string, string>();
const inFlightRequests = new Map<string, Promise<string>>();
const SOURCE_REQUEST_TIMEOUT_MS = 15_000;

/**
 * Loads the source code for a given component slug from public/source/{slug}.json.
 * Uses in-memory caching and request deduplication.
 */
export async function fetchComponentSource(slug: string): Promise<string> {
  if (!slug) throw new Error('Component slug is required');

  if (sourceCache.has(slug)) {
    return sourceCache.get(slug)!;
  }

  if (inFlightRequests.has(slug)) {
    return inFlightRequests.get(slug)!;
  }

  const promise = (async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SOURCE_REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(`/source/${slug}.json`, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Failed to load source code for ${slug} (${res.status} ${res.statusText})`);
      }
      const data = await res.json();
      const code = data.sourceCode || data.code || '';
      sourceCache.set(slug, code);
      return code;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`Timed out loading source code for ${slug} after ${SOURCE_REQUEST_TIMEOUT_MS / 1000} seconds`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
      inFlightRequests.delete(slug);
    }
  })();

  inFlightRequests.set(slug, promise);
  return promise;
}

export interface UseComponentSourceResult {
  sourceCode: string | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Hook to load component source code on-demand when user visits code tab.
 */
export function useComponentSource(
  slug: string | null | undefined,
  enabled = true
): UseComponentSourceResult {
  const [sourceCode, setSourceCode] = useState<string | null>(() => {
    if (slug && sourceCache.has(slug)) {
      return sourceCache.get(slug)!;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!slug || !enabled) return;

    if (sourceCache.has(slug)) {
      setSourceCode(sourceCache.get(slug)!);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchComponentSource(slug)
      .then((code) => {
        setSourceCode(code);
        setError(null);
      })
      .catch((err: any) => {
        console.error(`[useComponentSource] Error loading source for "${slug}":`, err);
        setError(err.message || 'Failed to load source code.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, enabled]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    sourceCode,
    isLoading,
    error,
    reload: load,
  };
}
