import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { ScrollProgressNavShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'scroll-progress-nav', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.ScrollProgressNavShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <ScrollProgressNavShowcase key={demoKey} />;
}
