import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { MorphingIconShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'morphing-icon', aliases: ['morphing-icons', 'morphingicon'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.MorphingIconShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <MorphingIconShowcase key={demoKey} />;
}
