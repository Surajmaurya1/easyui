import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { EvilEye } = DEMO_COMPONENTS;

export const meta = { id: 'evil-eye', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([EvilEye.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-md mx-auto">
          <EvilEye
            key={demoKey}
            maxRotation={13}
            stiffnessX={55}
            stiffnessY={45}
            damping={9}
            caption="Hanging evil eye amulet"
          />
        </div>
      );
}
