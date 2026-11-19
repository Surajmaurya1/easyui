import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchComponentSource } from './source-loader';

describe('fetchComponentSource', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches source code from /source/{slug}.json and caches result', async () => {
    const mockPayload = { id: 'test-comp', sourceCode: 'export const Test = () => null;' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    });
    vi.stubGlobal('fetch', fetchMock);

    const code = await fetchComponentSource('test-comp');
    expect(code).toBe(mockPayload.sourceCode);
    expect(fetchMock).toHaveBeenCalledWith('/source/test-comp.json', {
      signal: expect.any(AbortSignal),
    });

    // Second call should return cached without re-fetching
    const cachedCode = await fetchComponentSource('test-comp');
    expect(cachedCode).toBe(mockPayload.sourceCode);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('throws error when fetch response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchComponentSource('non-existent-comp')).rejects.toThrow(
      'Failed to load source code for non-existent-comp (404 Not Found)'
    );
  });
});
