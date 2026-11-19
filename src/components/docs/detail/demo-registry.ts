import { DEMO_COMPONENTS } from './demo-components';
import { DEMO_ALIASES, DEMO_ROUTES, DEMO_ROUTE_MODULES } from './demo-route-registry';
import { INLINE_DEMO_COMPONENTS } from './inline-demo-registry';

export { DEMO_COMPONENTS, DEMO_ALIASES, DEMO_ROUTE_MODULES };

export const DEMOS_INTENTIONALLY_MISSING: readonly string[] = [];

let nestedDemoPreload: Promise<void> | undefined;

function preloadNestedDemoComponents(): Promise<void> {
  if (!nestedDemoPreload) {
    nestedDemoPreload = Promise.all([
      ...Object.values(DEMO_COMPONENTS).map((component) => component.preload()),
      ...Object.values(INLINE_DEMO_COMPONENTS).map((component) => component.preload()),
    ]).then(() => undefined);
  }
  return nestedDemoPreload;
}

export function resolveDemoId(idOrAlias: string): string {
  return DEMO_ALIASES[idOrAlias] ?? idOrAlias;
}

export function hasDemo(idOrAlias: string): boolean {
  return Object.prototype.hasOwnProperty.call(DEMO_ROUTE_MODULES, resolveDemoId(idOrAlias));
}

/** Preload a detail demo during prerender so its Suspense boundary is resolved. */
export async function preloadComponentDemo(componentId: string): Promise<void> {
  const demoId = resolveDemoId(componentId);
  const demo = DEMO_ROUTES[demoId as keyof typeof DEMO_ROUTES];
  const route = DEMO_ROUTE_MODULES[demoId as keyof typeof DEMO_ROUTE_MODULES];
  if (!demo || !route) return;

  try {
    // Load the wrapper so its render path is synchronous during SSR, and also
    // preload any lazy components nested inside the demo module or its children.
    const [, module] = await Promise.all([demo.preload(), route.load()]);
    await module.preload();
    await preloadNestedDemoComponents();
  } catch {
    // Demo preload failures are non-fatal during prerender.
  }
}
