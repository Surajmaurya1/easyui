import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SpotlightCard } = DEMO_COMPONENTS;

export const meta = { id: 'spotlight-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SpotlightCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 flex justify-center">
          <SpotlightCard key={demoKey} className="max-w-md w-full p-6 bg-[#0E0E0E] border border-[#1F1F1F]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white" />
              <h4 className="text-sm font-semibold text-[#FAFAFA]">Spotlight Shader</h4>
            </div>
            <p className="text-xs text-[#A1A1A1] leading-relaxed mb-4">
              Pointer-aware radial illumination calculating Euclidean coordinates in real time.
            </p>
            <div className="p-3 rounded-lg bg-[#141414] border border-[#1F1F1F] text-xs font-mono text-[#A1A1A1]">
              Coordinates: Hardware Accelerated
            </div>
          </SpotlightCard>
        </div>
      );
}
