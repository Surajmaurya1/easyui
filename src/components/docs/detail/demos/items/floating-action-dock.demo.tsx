import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { Code2, Terminal, Sparkles, ShieldCheck } from 'lucide-react';


const { FloatingActionDock } = DEMO_COMPONENTS;

export const meta = { id: 'floating-action-dock', aliases: ['floating-dock'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([FloatingActionDock.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-10 flex flex-col items-center justify-center gap-4">
          <FloatingActionDock
            key={demoKey}
            items={[
              { id: '1', label: 'VS Code', icon: <Code2 /> },
              { id: '2', label: 'Terminal', icon: <Terminal /> },
              { id: '3', label: 'AI Pilot', icon: <Sparkles /> },
              { id: '4', label: 'Security', icon: <ShieldCheck /> },
            ]}
            activeId="1"
          />
          <p className="text-xs text-[#6B6B6B]">Hover icons to test magnification curve</p>
        </div>
      );
}
