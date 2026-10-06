export type ComponentCategory = 'All' | 'Recent' | 'Motion' | 'Buttons' | 'Navigation' | 'Feedback' | 'Overlays' | 'Forms' | 'Auth';

/**
 * Lightweight catalog entry used in the initial app-shell bundle.
 *
 * Contains only the fields required by the homepage, routing, and card previews.
 * Heavy fields (usageCode, props, accessibility, features, files) are omitted
 * to keep the entry chunk small. The full EasyComponentMeta is available only
 * in lazy-loaded route chunks that actually need it.
 */
export interface ComponentCatalogIndex {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Exclude<ComponentCategory, 'All'>;
  badges: string[];
  cliCommand: string;
  createdAt: string;
  featured?: boolean;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * Human-written metadata for an EasyUI component.
 * Slugs, dependencies, source paths, and CLI commands are auto-derived.
 */
export interface EasyUIComponentMeta {
  title: string;
  description: string;
  category?: Exclude<ComponentCategory, 'All'>;
  tagline?: string;
  badges?: string[];
  props?: ComponentProp[];
  accessibility?: string[];
  features?: string[];
  usageCode?: string;
  featured?: boolean;
  createdAt?: string;
}

/**
 * Complete component catalog entry used across the EasyUI website.
 * Contains human-written metadata + auto-derived attributes.
 */
export interface EasyComponentMeta {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Exclude<ComponentCategory, 'All'>;
  badges: string[];
  cliCommand: string;
  usageCode: string;
  sourceCode?: string;
  props: ComponentProp[];
  accessibility: string[];
  features: string[];
  createdAt: string;
  /** When true, this component is featured in the homepage showcase. */
  featured?: boolean;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{
    path: string;
    type: 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:component' | 'registry:block' | 'registry:page';
    target?: string;
  }>;
}
