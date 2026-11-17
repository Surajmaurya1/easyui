import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { TRAFFIC_CHANNELS, TRAFFIC_RANGES } from '../chart-demo-data';

const { TrafficCard } = DEMO_COMPONENTS;

export const meta = { id: 'traffic-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([TrafficCard.preload()]);
}

export default function ComponentDemo({ demoKey }: DemoProps) {
  return (
    <div className="w-full max-w-[380px]">
      <TrafficCard key={demoKey} channels={TRAFFIC_CHANNELS} ranges={TRAFFIC_RANGES} />
    </div>
  );
}
