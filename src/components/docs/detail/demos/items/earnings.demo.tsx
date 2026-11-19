import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { EARNINGS_PERIODS } from '../chart-demo-data';

const { Earnings } = DEMO_COMPONENTS;

export const meta = { id: 'earnings', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Earnings.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;

  return (
    <div className="flex w-full min-w-0 items-start justify-center py-4 sm:py-8">
      <Earnings
        key={demoKey}
        className="max-w-[520px]"
        periods={EARNINGS_PERIODS}
        payout={{ date: 'Nov 5', amount: 1240 }}
      />
    </div>
  );
}
