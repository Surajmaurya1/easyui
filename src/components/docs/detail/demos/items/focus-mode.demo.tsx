import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { FocusMode } = DEMO_COMPONENTS;

export const meta = { id: 'focus-mode', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([FocusMode.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full max-w-2xl mx-auto">
          <FocusMode key={demoKey} />
        </div>
      );
}
