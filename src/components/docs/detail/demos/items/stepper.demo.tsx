import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { StepperDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'stepper', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.StepperDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <StepperDemo key={demoKey} />;
}
