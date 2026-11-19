import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { ChartCard } from '../../../../../lib/chart-primitives';
import { DASHBOARD_LIVE_INITIAL, DASHBOARD_LIVE_SOURCE } from '../chart-demo-data';

const { LiveLineChart } = DEMO_COMPONENTS;

export const meta = { id: 'live-line-chart', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([LiveLineChart.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;

  return (
    <div className="w-full max-w-3xl min-w-0">
      <ChartCard
        key={demoKey}
        title="Requests per second"
        description="Live from the edge network. Hover to pause and inspect."
      >
        <LiveLineChart
          source={DASHBOARD_LIVE_SOURCE}
          initial={DASHBOARD_LIVE_INITIAL}
          unit="req/s"
          height={240}
          ariaLabel="Live requests per second from the edge network"
        />
      </ChartCard>
    </div>
  );
}
