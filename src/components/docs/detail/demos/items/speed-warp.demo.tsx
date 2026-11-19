import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { SpeedWarpShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'speed-warp', aliases: ['speed-warps', 'speedwarp'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.SpeedWarpShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <SpeedWarpShowcase key={demoKey} />;
}
