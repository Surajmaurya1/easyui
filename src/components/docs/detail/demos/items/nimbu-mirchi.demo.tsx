import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { NimbuMirchi } = DEMO_COMPONENTS;

export const meta = { id: 'nimbu-mirchi', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([NimbuMirchi.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-md mx-auto">
          <NimbuMirchi
            key={demoKey}
            maxRotation={13}
            stiffnessX={55}
            stiffnessY={45}
            damping={9}
            caption="Hanging nimbu-mirchi charm"
          />
        </div>
      );
}
