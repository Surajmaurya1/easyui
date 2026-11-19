import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ScrollVelocityTextLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'scrollvelocitytext', aliases: ['scroll-velocity-text', 'velocity-text'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ScrollVelocityTextLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <ScrollVelocityTextLiveShowcase key={demoKey} />;
}
