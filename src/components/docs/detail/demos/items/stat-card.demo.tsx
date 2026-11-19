import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { fullFmt } from '../../../../../lib/chart-primitives';
import {
  DASHBOARD_CHURN,
  DASHBOARD_CONVERSION,
  DASHBOARD_DAYS,
  DASHBOARD_REVENUE,
  DASHBOARD_USERS,
} from '../chart-demo-data';

const { StatCard, StatGrid } = DEMO_COMPONENTS;

export const meta = { id: 'stat-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StatCard.preload(), StatGrid.preload()]);
}

const money = (n: number) => `$${fullFmt.format(Math.round(n))}`;

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;

  return (
    <div className="w-full max-w-5xl min-w-0">
      <StatGrid key={demoKey}>
        <StatCard
          label="Revenue"
          value={DASHBOARD_REVENUE[13]}
          previous={DASHBOARD_REVENUE[0]}
          trend={DASHBOARD_REVENUE}
          trendLabels={DASHBOARD_DAYS}
          format={money}
          period="Last 14 days"
          color="#6d7cff"
        />
        <StatCard
          label="Active users"
          value={DASHBOARD_USERS[13]}
          previous={DASHBOARD_USERS[0]}
          trend={DASHBOARD_USERS}
          trendLabels={DASHBOARD_DAYS}
          format={(n: number) => fullFmt.format(Math.round(n))}
          period="Last 14 days"
          color="#34d1bf"
        />
        <StatCard
          label="Conversion"
          value={DASHBOARD_CONVERSION[13]}
          previous={DASHBOARD_CONVERSION[0]}
          trend={DASHBOARD_CONVERSION}
          trendLabels={DASHBOARD_DAYS}
          format={(n: number) => `${n.toFixed(2)}%`}
          period="Last 14 days"
          color="#ffb44c"
        />
        <StatCard
          label="Churn"
          value={DASHBOARD_CHURN[13]}
          previous={DASHBOARD_CHURN[0]}
          trend={DASHBOARD_CHURN}
          trendLabels={DASHBOARD_DAYS}
          format={(n: number) => `${n.toFixed(2)}%`}
          goodWhen="down"
          period="Last 14 days"
          color="#ff6b8b"
        />
      </StatGrid>
    </div>
  );
}
