import type { ComponentType } from 'react';
import type { EasyComponentMeta } from '../../../types/component';

export interface DemoProps {
  component: EasyComponentMeta;
  demoKey: number;
  inlineDemos: InlineDemoComponents;
}


export type InlineDemoComponents = Record<string, ComponentType<any>>;

export interface DemoRenderArgs {
  component: EasyComponentMeta;
  demoKey: number;
  inlineDemos: InlineDemoComponents;
}
