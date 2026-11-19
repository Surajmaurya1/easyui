import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MeteorsLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'meteors', aliases: ['meteor-shower', 'meteor-card'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MeteorsLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <MeteorsLiveShowcase key={demoKey} />;
}
