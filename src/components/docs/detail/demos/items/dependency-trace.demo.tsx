import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DependencyTrace } = DEMO_COMPONENTS;

export const meta = { id: 'dependency-trace', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DependencyTrace.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-xl mx-auto">
          <DependencyTrace
            key={demoKey}
            nodes={[
              { id: 'gateway', label: 'API Gateway', x: 200, y: 50 },
              { id: 'auth', label: 'Auth Svc', x: 100, y: 140 },
              { id: 'billing', label: 'Billing API', x: 300, y: 140 },
              { id: 'postgres', label: 'Postgres DB', x: 100, y: 230 },
              { id: 'stripe', label: 'Stripe Mesh', x: 300, y: 230 },
            ]}
            connections={[
              { from: 'gateway', to: 'auth' },
              { from: 'gateway', to: 'billing' },
              { from: 'auth', to: 'postgres' },
              { from: 'billing', to: 'stripe' },
              { from: 'billing', to: 'postgres' },
            ]}
          />
        </div>
      );
}
