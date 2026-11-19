import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { TorqueDialShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'torque-dial', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.TorqueDialShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <TorqueDialShowcase key={demoKey} />;
}
