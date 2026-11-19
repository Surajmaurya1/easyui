import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ParticleDelete } = DEMO_COMPONENTS;

export const meta = { id: 'particle-delete', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ParticleDelete.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-2 w-full">
          <ParticleDelete key={demoKey} />
        </div>
      );
}
