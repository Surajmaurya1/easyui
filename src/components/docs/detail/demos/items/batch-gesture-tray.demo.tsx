import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { Terminal, Sparkles } from 'lucide-react';


const { BatchGestureTray } = DEMO_COMPONENTS;

export const meta = { id: 'batch-gesture-tray', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([BatchGestureTray.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-lg mx-auto">
          <BatchGestureTray
            key={demoKey}
            items={[
              { id: '1', title: 'cluster-config.prod.yaml', subtitle: 'Modified 3m ago by alex' },
              { id: '2', title: 'telemetry-collector.ts', subtitle: 'Modified 14m ago by sarah' },
              { id: '3', title: 'database-migration.sql', subtitle: 'Modified 1h ago by system' },
              { id: '4', title: 'docker-compose.edge.json', subtitle: 'Modified 3h ago by dev' },
            ]}
            actions={[
              { id: 'export', label: 'Export', icon: <Terminal className="w-3.5 h-3.5" />, action: async () => { } },
              { id: 'archive', label: 'Archive', icon: <Sparkles className="w-3.5 h-3.5" />, action: async () => { } },
            ]}
          />
        </div>
      );
}
