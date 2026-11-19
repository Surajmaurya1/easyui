import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { SplitButtonShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'split-button', aliases: ['split-buttons', 'splitbutton'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.SplitButtonShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <SplitButtonShowcase key={demoKey} />;
}
