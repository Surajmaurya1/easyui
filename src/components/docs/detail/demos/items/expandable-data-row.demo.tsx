import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ExpandableDataRow } = DEMO_COMPONENTS;

export const meta = { id: 'expandable-data-row', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ExpandableDataRow.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full max-w-2xl mx-auto">
          <ExpandableDataRow key={demoKey} allowMultiple={false} defaultExpandedIds={['usr_01']} />
        </div>
      );
}
