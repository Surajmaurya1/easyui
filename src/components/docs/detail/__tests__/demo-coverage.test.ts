import { describe, expect, it } from 'vitest';
import { EASY_COMPONENTS } from '../../../registry/components-data';
import {
  DEMO_ALIASES,
  DEMO_ROUTE_MODULES,
  DEMOS_INTENTIONALLY_MISSING,
  hasDemo,
  resolveDemoId,
} from '../demo-registry';

describe('component detail demo registry', () => {
  it('covers each component or documents why its demo is intentionally missing', () => {
    const intentionallyMissing = new Set<string>(DEMOS_INTENTIONALLY_MISSING);

    for (const component of EASY_COMPONENTS) {
      if (intentionallyMissing.has(component.id)) continue;
      expect(hasDemo(component.id), component.id).toBe(true);
    }
  });

  it('keeps aliases unique and pointed at registered canonical demos', () => {
    const componentIds = new Set(EASY_COMPONENTS.map(({ id }) => id));
    const aliasNames = Object.values(DEMO_ROUTE_MODULES).flatMap(({ aliases }) => aliases);
    const registeredNames = new Set(Object.keys(DEMO_ROUTE_MODULES));

    for (const alias of aliasNames) {
      expect(registeredNames.has(alias), alias).toBe(false);
      registeredNames.add(alias);
    }
    for (const [alias, canonicalId] of Object.entries(DEMO_ALIASES)) {
      expect(componentIds.has(alias), alias).toBe(false);
      expect(resolveDemoId(alias)).toBe(canonicalId);
      expect(hasDemo(canonicalId), canonicalId).toBe(true);
    }
  });
});
