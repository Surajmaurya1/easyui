import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { SpotlightSearchShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'spotlight-search', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.SpotlightSearchShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <SpotlightSearchShowcase key={demoKey} />;
}
