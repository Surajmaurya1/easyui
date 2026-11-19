import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MetricHUD } = DEMO_COMPONENTS;

export const meta = { id: 'metric-hud', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MetricHUD.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full">
          <MetricHUD
            key={demoKey}
            metrics={[
              {
                id: 'latency',
                label: 'p99 API Latency',
                value: '14.2',
                unit: 'ms',
                delta: { value: '-18.4%', trend: 'down', isPositiveGood: true },
                status: 'normal',
                timeSeries: {
                  '1h': [18, 17, 16.5, 15, 14.8, 14.2],
                  '24h': [26, 24, 21, 19, 18, 16, 14.2],
                  '7d': [34, 31, 28, 24, 20, 16, 14.2],
                  '30d': [45, 38, 32, 28, 22, 18, 14.2],
                },
              },
              {
                id: 'throughput',
                label: 'Global Throughput',
                value: '84.5k',
                unit: 'req/s',
                delta: { value: '+12.1%', trend: 'up', isPositiveGood: true },
                status: 'normal',
                timeSeries: {
                  '1h': [62, 68, 72, 75, 81, 84.5],
                  '24h': [40, 52, 65, 74, 80, 84.5],
                  '7d': [30, 45, 60, 70, 78, 84.5],
                  '30d': [20, 35, 50, 65, 75, 84.5],
                },
              },
              {
                id: 'errors',
                label: 'Error Rate',
                value: '0.002',
                unit: '%',
                delta: { value: '-0.04%', trend: 'down', isPositiveGood: true },
                status: 'normal',
                timeSeries: {
                  '1h': [0.008, 0.006, 0.005, 0.003, 0.002],
                  '24h': [0.012, 0.009, 0.006, 0.004, 0.002],
                  '7d': [0.02, 0.015, 0.01, 0.005, 0.002],
                  '30d': [0.05, 0.03, 0.018, 0.008, 0.002],
                },
              },
            ]}
            defaultTimeRange="24h"
          />
        </div>
      );
}
