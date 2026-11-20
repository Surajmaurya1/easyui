import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { AIImageRevealDemo } = DEMO_COMPONENTS;

export const meta = { id: 'ai-image-reveal', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AIImageRevealDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  return <AIImageRevealDemo key={demoKey} />;
}
