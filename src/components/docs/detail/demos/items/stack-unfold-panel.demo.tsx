import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { StackUnfoldPanel } = DEMO_COMPONENTS;

export const meta = { id: 'stack-unfold-panel', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StackUnfoldPanel.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-lg mx-auto">
          <StackUnfoldPanel
            key={demoKey}
            cards={[
              {
                id: '1',
                title: 'Edge Compute Engine',
                subtitle: 'v2.4.0 High-throughput pipeline',
                content: 'Lightweight V8 isolates execute with zero cold-starts and under 5ms execution overhead globally.',
                badge: 'Core',
              },
              {
                id: '2',
                title: 'Zero-Allocation Parser',
                subtitle: 'Binary protocol serializer',
                content: 'Stream-based decoding without heap allocation penalty, optimizing CPU utilization during peak traffic.',
                badge: 'Protocol',
              },
              {
                id: '3',
                title: 'Cryptographic Attestation',
                subtitle: 'Hardware TPM integrity',
                content: 'Hardware-verified boot trust and per-request cryptographic telemetry verification.',
                badge: 'Security',
              },
            ]}
          />
        </div>
      );
}
