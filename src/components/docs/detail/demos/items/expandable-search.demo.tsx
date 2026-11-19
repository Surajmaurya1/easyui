import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ExpandableSearch } = DEMO_COMPONENTS;

export const meta = { id: 'expandable-search', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ExpandableSearch.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-4">
          <ExpandableSearch key={demoKey} placeholder="Search components, tokens..." />
          <p className="text-xs text-[#6B6B6B]">Click input or focus to test smooth width expansion</p>
        </div>
      );
}
