import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { GravityParticleBurst } = DEMO_COMPONENTS;

export const meta = { id: 'gravity-particle-burst', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([GravityParticleBurst.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center gap-4">
          <GravityParticleBurst key={demoKey}>Commit release</GravityParticleBurst>
          <p className="text-xs text-[#6B6B6B]">Click or tap to emit gravity-driven particles.</p>
        </div>
      );
}
