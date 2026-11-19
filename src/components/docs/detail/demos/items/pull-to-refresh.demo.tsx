import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PullToRefresh } = DEMO_COMPONENTS;

export const meta = { id: 'pull-to-refresh', aliases: ['pulltorefresh'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PullToRefresh.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <PullToRefresh key={demoKey} />
        </div>
      );
}
