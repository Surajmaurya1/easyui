import { useState } from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { ChartCard, SegmentedControl } from '../../../../../lib/chart-primitives';
import { CHART_DAYS, CHART_MATRIX } from '../chart-demo-data';

const { ActivityHeatmap } = DEMO_COMPONENTS;

export const meta = { id: 'activity-heatmap', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ActivityHeatmap.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const [mode, setMode] = useState<'calendar' | 'hours'>('calendar');

  return (
    <div className="w-full max-w-4xl">
      <ChartCard
        key={demoKey}
        title="Activity"
        description={mode === 'calendar' ? 'Daily contributions' : 'When your team is most active'}
        actions={
          <SegmentedControl
            label="Heatmap type"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'calendar', label: 'Calendar' },
              { value: 'hours', label: 'By hour' },
            ]}
          />
        }
      >
        {mode === 'calendar' ? (
          <ActivityHeatmap key="cal" mode="calendar" data={CHART_DAYS} unit="contributions" />
        ) : (
          <ActivityHeatmap key="hrs" mode="hours" matrix={CHART_MATRIX} unit="events" color="#6d7cff" />
        )}
      </ChartCard>
    </div>
  );
}
