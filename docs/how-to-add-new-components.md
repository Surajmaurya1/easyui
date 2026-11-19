# How to add new EasyUI components

This guide describes the current workflow after the `ComponentDetailPage` refactor. Follow it when adding a component, especially when an AI agent is making the change. Keep the component page's public API and existing UI behavior intact.

## Where things live

- Component implementation: `src/components/ui/<ComponentName>.tsx`
- Human-written component metadata: `src/components/ui/<ComponentName>.meta.ts`
- Lazy wrappers for UI components used by demos: `src/components/docs/detail/demo-components.ts`
- One route demo module per component: `src/components/docs/detail/demos/items/<component-id>.demo.tsx`
- Demo route IDs and aliases: `src/components/docs/detail/demo-route-registry.ts`
- Reusable custom showcase components: `src/components/docs/detail/demos/`
- Lazy wrappers for reusable showcase components: `src/components/docs/detail/inline-demo-registry.tsx`
- Refactored page composition and sections: `src/components/docs/detail/`
- Public component detail import path: `src/components/docs/ComponentDetailPage.tsx`

`registry.json`, `src/components/registry/components-data.ts`, `src/components/registry/catalog-index.ts`, `public/source/`, the sitemap, and `public/llms.txt` are generated. Do not edit them by hand.

## Workflow

### 1. Inspect the existing patterns

Before editing, inspect a nearby component and its `.meta.ts` file, plus a similar route demo under `demos/items/`. Check `demo-components.ts` for the existing lazy component wrapper. Reuse the current category, import, styling, and demo patterns where they fit. Do not reopen or recreate the old monolithic `ComponentDetailPage` switch.

### 2. Create the component and metadata

Scaffold the pair with:

```sh
npm run component:new AuroraCard
```

This creates `src/components/ui/AuroraCard.tsx` and `src/components/ui/AuroraCard.meta.ts`. Edit the component into its intended production form; the scaffold is only a starting point. Complete accurate metadata, especially the title, description, category, tagline, props, accessibility notes, features, and `usageCode` example. Keep the example import and component API consistent with the actual implementation.

For a folder-based, multi-file component, follow the existing generator conventions and put its metadata in the component folder as `meta.ts`. Check `docs/ARCHITECTURE.md` before choosing this layout.

### 3. Register the component's lazy demo wrapper

Add a `lazyNamed` entry to `demo-components.ts` for each UI export that the demo renders. Point it at the actual component module and use the exact exported name. For example:

```ts
AuroraCard: lazyNamed(() => import('../../ui/AuroraCard'), 'AuroraCard'),
```

If the demo uses several exports from one module, register each export with the same module path and its own export name, following the `Form` entries. Do not statically import a UI component into the page shell. `AnimatedTabs` is a deliberate existing exception and must remain eagerly loaded as it is now.

### 4. Add a route demo module

Create `demos/items/<component-id>.demo.tsx`, where `<component-id>` is the generated kebab-case ID. Route modules must export a default React component and an async `preload()` function. Keep all demo-specific JSX and preview copy in this module rather than adding another branch to a page-sized component.

Example:

```tsx
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { AuroraCard } = DEMO_COMPONENTS;

export const meta = { id: 'aurora-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AuroraCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  return <AuroraCard key={demoKey}>Preview content</AuroraCard>;
}
```

Include every lazy component or lazy showcase used by the demo in `preload()`. This lets static prerender load the preview before writing the page HTML. If the demo does not use `props`, include `void props;` so the parameter remains compatible with `DemoProps` without an unused-variable warning. Preserve keys and stateful demo setup where the existing examples use them.

### 5. Register its canonical ID and aliases

Add one entry to `DEMO_ROUTE_MODULES` in `demo-route-registry.ts`:

```ts
'aurora-card': { aliases: [], load: () => import('./demos/items/aurora-card.demo') },
```

Keep the route ID identical to the ID generated from component metadata. Put any supported legacy IDs in that entry's `aliases` array and in the route module's `meta.aliases`, so the route registry and module metadata agree. Do not duplicate a canonical ID or alias.

Every component in the generated catalog needs a demo route. A custom fallback is only appropriate when the product intentionally has no interactive demo; document that exception and update the coverage test's `DEMOS_INTENTIONALLY_MISSING` list with a reason.

### 6. Add reusable showcase code only when needed

If the preview needs a custom showcase that is reused by other routes or is already organized as an inline showcase, put it in `demos/<name>.demo.tsx` and register its lazy wrapper in `inline-demo-registry.tsx`. Import it from `INLINE_DEMO_COMPONENTS` in the route module, then include its `.preload()` call in that route's `preload()` function.

Keep these roles clear:

- `demos/items/` contains the route-level demo for one component.
- `demos/` contains reusable showcase implementations.
- `demo-components.ts` contains lazy wrappers around UI exports.
- `inline-demo-registry.tsx` contains lazy wrappers around showcase implementations.

### 7. Regenerate and validate

Run registry generation and validation first:

```sh
npm run component:sync
```

Review the generated diff to confirm the component ID, source path, dependencies, CLI command, and catalog entry are correct. Do not commit unexpected generated changes without understanding why the generator produced them.

Run the demo coverage test and the full test suite, then build:

```sh
npx vitest run src/components/docs/detail/__tests__/demo-coverage.test.ts
npm test -- --run
npm run build
```

The build runs registry sync and validation, TypeScript, Vite, prerendering, and the SEO audit. Confirm it prerenders the new component detail page and that the preview is present in static HTML rather than stuck on its loading fallback. Restore generated files that changed only because a timestamp or local build date advanced.

## AI change rules

When implementing a component request:

1. Read the existing component, metadata, demo, and registry patterns before editing.
2. Make the component, metadata, lazy wrapper, route demo module, and route registry entry in the same change.
3. Preserve all existing IDs, aliases, public exports, labels, CSS classes, keys, motion, and user-visible behavior unless the user specifically requests a product change.
4. Keep demo code in its own module; do not grow `ComponentDetailPage.tsx` or move demo branches back into it.
5. Keep lazy loading and prerender preloading working; never omit a used component from the route demo's `preload()` function.
6. Do not hand-edit generated registry/catalog/source outputs.
7. Run the verification commands above when requested or when completing an implementation, and report failures without silently changing unrelated components to make tests pass.
