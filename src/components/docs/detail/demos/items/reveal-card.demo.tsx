import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { RevealCard } = DEMO_COMPONENTS;

export const meta = { id: 'reveal-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([RevealCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 flex justify-center">
          <RevealCard
            key={demoKey}
            revealContent={
              <div className="text-xs text-[#FAFAFA] space-y-1">
                <div>✓ Latency: 0.12ms</div>
                <div>✓ Region: us-east-1</div>
              </div>
            }
            className="max-w-sm w-full p-6 bg-[#0E0E0E] border border-[#1F1F1F]"
          >
            <h4 className="text-sm font-semibold text-[#FAFAFA] mb-1">Interactive 3D Tilt</h4>
            <p className="text-xs text-[#A1A1A1]">Hover cursor to rotate perspective and reveal telemetry.</p>
          </RevealCard>
        </div>
      );
}
