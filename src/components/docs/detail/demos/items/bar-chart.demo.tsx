import { useState } from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { ChartCard, SegmentedControl, fullFmt } from '../../../../../lib/chart-primitives';
import { CHART_BARS, CHART_SERIES } from '../chart-demo-data';

const { BarChart } = DEMO_COMPONENTS;

export const meta = { id: 'bar-chart', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([BarChart.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const [variant, setVariant] = useState<'grouped' | 'stacked'>('grouped');

  return (
    <div className="w-full max-w-3xl">
      <ChartCard
        key={demoKey}
        title="Requests by platform"
        description="Monthly volume, last 12 months"
        actions={
          <SegmentedControl
            label="Bar layout"
            value={variant}
            onChange={setVariant}
            options={[
              { value: 'grouped', label: 'Grouped' },
              { value: 'stacked', label: 'Stacked' },
            ]}
          />
        }
      >
        <BarChart
          data={CHART_BARS}
          series={CHART_SERIES}
          variant={variant}
          height={260}
          formatValue={(n: number) => `${fullFmt.format(n)} req`}
        />
      </ChartCard>
    </div>
  );
}
