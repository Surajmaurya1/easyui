import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { OrbitalLoadingRing } = DEMO_COMPONENTS;

export const meta = { id: 'orbital-loading-ring', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([OrbitalLoadingRing.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center gap-4">
          <OrbitalLoadingRing key={demoKey} size={96} variant="dense" label="Syncing registry" />
          <p className="text-xs text-[#6B6B6B]">Layered orbital loading with reduced-motion fallback.</p>
        </div>
      );
}
