import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { AnimatedNumberShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'animated-number', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.AnimatedNumberShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <AnimatedNumberShowcase key={demoKey} />;
}
