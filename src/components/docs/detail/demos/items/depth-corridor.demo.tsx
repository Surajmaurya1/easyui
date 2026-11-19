import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DepthCorridor } = DEMO_COMPONENTS;

export const meta = { id: 'depth-corridor', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DepthCorridor.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-xl mx-auto">
          <DepthCorridor
            key={demoKey}
            layers={[
              {
                id: '1',
                title: 'Edge Telemetry Gateway',
                subtitle: 'Real-time routing engine',
                content: <div className="text-emerald-400 font-mono text-xs">● 12.4ms avg global latency</div>,
              },
              {
                id: '2',
                title: 'Serverless Worker Pool',
                subtitle: 'Autonomous scaling nodes',
                content: <div className="text-sky-400 font-mono text-xs">● 128 active clusters</div>,
              },
              {
                id: '3',
                title: 'Distributed State Cache',
                subtitle: 'In-memory key-value mesh',
                content: <div className="text-amber-400 font-mono text-xs">● 99.98% cache hit ratio</div>,
              },
              {
                id: '4',
                title: 'Cold Storage Archive',
                subtitle: 'S3-compatible immutable vault',
                content: <div className="text-zinc-400 font-mono text-xs">● 42.8 TB encrypted data</div>,
              },
            ]}
          />
        </div>
      );
}
