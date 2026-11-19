import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { ThinkingOrbDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'thinking-orb', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.ThinkingOrbDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-2 w-full">
          <ThinkingOrbDemo key={demoKey} />
        </div>
      );
}
