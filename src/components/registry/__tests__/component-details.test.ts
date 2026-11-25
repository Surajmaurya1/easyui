import { describe, expect, it } from 'vitest';
import { preloadComponentMeta } from '../component-details';

describe('component detail metadata loaders', () => {
  it('loads only the requested component details', async () => {
    const component = await preloadComponentMeta('model-picker');

    expect(component?.name).toBe('Model Picker');
    expect(component?.usageCode).toContain('ModelPicker');
    expect(component?.installPrompt).toBeUndefined();
    expect(component?.installPromptHash).toBeTruthy();
  });

  it('returns undefined for unknown component IDs', async () => {
    await expect(preloadComponentMeta('not-a-component')).resolves.toBeUndefined();
  });
});
