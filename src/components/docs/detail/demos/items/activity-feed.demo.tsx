import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ActivityFeed } = DEMO_COMPONENTS;

export const meta = { id: 'activity-feed', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ActivityFeed.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full">
          <ActivityFeed
            key={demoKey}
            events={[
              {
                id: 'evt-1',
                type: 'deploy',
                status: 'success',
                title: 'Production release v2.4.0 verified',
                timestamp: '2 mins ago',
                duration: '380ms',
                traceId: 'trc_98fa20',
                description: 'All 32 edge clusters updated. Zero errors encountered.',
                actor: { name: 'CI Pipeline', email: 'ci@easyui.dev' },
                payload: { version: '2.4.0', sha: '8f3b2a', regions: ['iad1', 'sfo1', 'fra1'] },
              },
              {
                id: 'evt-2',
                type: 'security',
                status: 'warning',
                title: 'Token rotation required for API key',
                timestamp: '14 mins ago',
                duration: '12ms',
                traceId: 'trc_77b31c',
                description: 'Secret key has exceeded 90-day recommended rotation window.',
                actor: { name: 'Security Guard' },
                payload: { keyId: 'key_prod_8819', ageDays: 92, action: 'notify' },
              },
              {
                id: 'evt-3',
                type: 'api',
                status: 'success',
                title: 'POST /v1/chat/completions 200 OK',
                timestamp: '28 mins ago',
                duration: '22ms',
                traceId: 'trc_55e10a',
                description: 'Streaming token generation handled with 0.12s first-byte latency.',
                actor: { name: 'External Client' },
                payload: { model: 'easy-4o', promptTokens: 140, completionTokens: 420 },
              },
            ]}
            enableLiveSimulation={true}
          />
        </div>
      );
}
