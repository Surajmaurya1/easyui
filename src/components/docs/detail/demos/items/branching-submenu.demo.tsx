import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { BranchingSubmenu } = DEMO_COMPONENTS;

export const meta = { id: 'branching-submenu', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([BranchingSubmenu.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 flex min-h-[360px] items-start justify-center w-full">
          <BranchingSubmenu key={demoKey} />
        </div>
      );
}
