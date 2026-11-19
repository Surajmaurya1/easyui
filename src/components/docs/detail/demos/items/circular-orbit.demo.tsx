import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { CircularOrbit } = DEMO_COMPONENTS;

export const meta = { id: 'circular-orbit', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([CircularOrbit.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-2xl mx-auto">
          <CircularOrbit
            key={demoKey}
            title="Orbit"
            speed={0.00022}
            radius={240}
            pauseOnHover
          />
        </div>
      );
}
