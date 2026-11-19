import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { NeonEdgeButton } = DEMO_COMPONENTS;

export const meta = { id: 'neon-edge-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([NeonEdgeButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex justify-center">
          <NeonEdgeButton key={demoKey}>Deploy preview</NeonEdgeButton>
        </div>
      );
}
