import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { RecoveryLedger } = DEMO_COMPONENTS;

export const meta = { id: 'recovery-ledger', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([RecoveryLedger.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-lg mx-auto">
          <RecoveryLedger
            key={demoKey}
            currentEntryId="v3"
            entries={[
              {
                id: 'v3',
                timestamp: 'Just now',
                action: 'Production Deploy v3.2.0',
                description: 'Upgraded Web Audio synthesizer engine and added spring tokens.',
                author: 'Suraj M.',
                details: { diff: '+ import { motionTransitions } from "@/lib/motion-tokens";' },
              },
              {
                id: 'v2',
                timestamp: '2 hours ago',
                action: 'Security Patch RS256',
                description: 'Rotated API signature keys and patched JWT verify route.',
                author: 'Alex W.',
                details: { diff: '- const alg = "HS256";\n+ const alg = "RS256";' },
              },
              {
                id: 'v1',
                timestamp: 'Yesterday',
                action: 'Initial Schema Release',
                description: 'Base database schema migration across primary regions.',
                author: 'DevOps',
              },
            ]}
          />
        </div>
      );
}
