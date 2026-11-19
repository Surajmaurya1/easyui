import { useState } from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { ChartCard, SegmentedControl, fullFmt } from '../../../../../lib/chart-primitives';
import { CHART_DONUT } from '../chart-demo-data';

const { DonutChart } = DEMO_COMPONENTS;

export const meta = { id: 'donut-chart', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DonutChart.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const [variant, setVariant] = useState<'donut' | 'semi'>('donut');

  return (
    <div className="w-full max-w-md">
      <ChartCard
        key={demoKey}
        title="Spend by service"
        description="This billing period"
        actions={
          <SegmentedControl
            label="Chart style"
            value={variant}
            onChange={setVariant}
            options={[
              { value: 'donut', label: 'Donut' },
              { value: 'semi', label: 'Gauge' },
            ]}
          />
        }
      >
        <DonutChart
          data={CHART_DONUT}
          variant={variant}
          centerLabel="Total spend"
          formatValue={(n: number) => `$${fullFmt.format(n)}`}
        />
      </ChartCard>
    </div>
  );
}
