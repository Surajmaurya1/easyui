import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { ChartCard, fullFmt } from '../../../../../lib/chart-primitives';
import { DASHBOARD_FUNNEL } from '../chart-demo-data';

const { FunnelChart } = DEMO_COMPONENTS;

export const meta = { id: 'funnel-chart', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([FunnelChart.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;

  return (
    <div className="w-full max-w-lg min-w-0">
      <ChartCard
        key={demoKey}
        title="Signup funnel"
        description="Visit to paid, last 30 days"
      >
        <FunnelChart
          stages={DASHBOARD_FUNNEL}
          formatValue={(n: number) => fullFmt.format(n)}
          ariaLabel="Signup funnel from visited site to started paid plan"
        />
      </ChartCard>
    </div>
  );
}
