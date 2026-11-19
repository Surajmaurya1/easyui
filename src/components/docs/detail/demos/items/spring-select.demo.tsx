import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SpringSelect } = DEMO_COMPONENTS;

export const meta = { id: 'spring-select', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SpringSelect.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
          <SpringSelect
            label="Workspace"
            options={[
              { value: 'design', label: 'Design Team' },
              { value: 'engineering', label: 'Engineering' },
              { value: 'marketing', label: 'Marketing' },
            ]}
            defaultValue="design"
          />
        </div>
      );
}
