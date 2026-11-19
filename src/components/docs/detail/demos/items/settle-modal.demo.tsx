import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { SettleModalDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'settle-modal', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.SettleModalDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center">
          <SettleModalDemo />
        </div>
      );
}
