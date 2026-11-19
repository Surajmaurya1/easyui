import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { IOSSearchBarShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'ios-search-bar', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.IOSSearchBarShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <IOSSearchBarShowcase key={demoKey} />;
}
