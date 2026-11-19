import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PillNavigation } = DEMO_COMPONENTS;

export const meta = { id: 'pill-navigation', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PillNavigation.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex justify-center">
          <PillNavigation key={demoKey} />
        </div>
      );
}
