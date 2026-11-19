import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { Code2, Terminal, Sparkles, ShieldCheck } from 'lucide-react';


const { SmallFloatingDock } = DEMO_COMPONENTS;

export const meta = { id: 'small-floating-dock', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SmallFloatingDock.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-6">
          <div className="relative w-full max-w-md h-36 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-center overflow-hidden shadow-md">
            <span className="text-xs text-[#6B6B6B]">Hover proximity to expand actions</span>
            <SmallFloatingDock
              key={demoKey}
              position="bottom-center"
              items={[
                { id: '1', label: 'AI Pilot', icon: <Sparkles className="w-4 h-4" />, action: () => { } },
                { id: '2', label: 'Terminal', icon: <Terminal className="w-4 h-4" />, action: () => { } },
                { id: '3', label: 'Code', icon: <Code2 className="w-4 h-4" />, action: () => { } },
                { id: '4', label: 'Security', icon: <ShieldCheck className="w-4 h-4" />, action: () => { }, badge: 4 },
              ]}
            />
          </div>
        </div>
      );
}
