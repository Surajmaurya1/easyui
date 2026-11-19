import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MorphingShapeLoader } = DEMO_COMPONENTS;

export const meta = { id: 'morphing-shape-loader', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MorphingShapeLoader.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center">
          <MorphingShapeLoader
            key={demoKey}
            size={160}
            shapes={['circle', 'square', 'triangle', 'hexagon', 'star', 'pentagon']}
            duration={1.4}
            strokeWidth={0.06}
          />
        </div>
      );
}
