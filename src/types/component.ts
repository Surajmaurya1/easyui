export type ComponentCategory = 'All' | 'Recent' | 'Motion' | 'Buttons' | 'Navigation' | 'Feedback' | 'Overlays' | 'Forms' | 'Auth';

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
  title: string;
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
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{
    path: string;
    type: 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:component' | 'registry:block' | 'registry:page';
    target?: string;
  }>;
}
