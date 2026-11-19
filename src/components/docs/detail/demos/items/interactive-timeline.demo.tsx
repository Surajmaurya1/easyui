import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { InteractiveTimeline } = DEMO_COMPONENTS;

export const meta = { id: 'interactive-timeline', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([InteractiveTimeline.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full">
          <InteractiveTimeline
            key={demoKey}
            items={[
              {
                id: 'step-1',
                title: 'Build & Tree-Shaking Verification',
                timestamp: '10:42 AM · 48s',
                status: 'completed',
                tag: 'CI/CD',
                commitHash: '9f8a12bc',
                description:
                  'Production bundle analyzed with zero unreferenced dead code. All chunks under budget.',
                metrics: [
                  { label: 'Bundle Size', value: '142 KB' },
                  { label: 'Tree Shake', value: '99.4%' },
                  { label: 'Chunks', value: '8 total' },
                ],
                author: { name: 'Alex Rivera', role: 'Staff Eng' },
              },
              {
                id: 'step-2',
                title: 'Global Edge Layer Replication',
                timestamp: '10:43 AM · In Progress',
                status: 'in-progress',
                tag: 'Infra',
                commitHash: 'a81d4e77',
                description:
                  'Replicating immutable build layers across 32 regional edge locations worldwide.',
                metrics: [
                  { label: 'Active Edge Nodes', value: '28 / 32' },
                  { label: 'Edge Latency', value: '12 ms' },
                ],
                author: { name: 'Infra Bot', role: 'Automated' },
              },
              {
                id: 'step-3',
                title: 'Synthetic Canary Smoke Suite',
                timestamp: 'Pending · 120s est',
                status: 'pending',
                tag: 'QA',
                description:
                  'Executes 400 parallel headless browser journeys verifying checkout, auth, and webhooks.',
              },
              {
                id: 'step-4',
                title: 'Atomic DNS Traffic Cutover',
                timestamp: 'Pending',
                status: 'pending',
                tag: 'DNS',
                description:
                  'Zero-downtime blue/green routing switch to the freshly certified edge release.',
              },
            ]}
            defaultSelectedId="step-2"
          />
        </div>
      );
}
