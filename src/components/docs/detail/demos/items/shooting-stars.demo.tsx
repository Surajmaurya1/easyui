import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ShootingStarsLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'shooting-stars', aliases: ['shootingstars', 'celestial-stars'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ShootingStarsLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <ShootingStarsLiveShowcase key={demoKey} />;
}
