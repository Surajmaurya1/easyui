import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { LiquidToggle } = DEMO_COMPONENTS;

export const meta = { id: 'liquid-toggle', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([LiquidToggle.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center">
          <LiquidToggle key={demoKey} width={88} height={44} />
        </div>
      );
}
