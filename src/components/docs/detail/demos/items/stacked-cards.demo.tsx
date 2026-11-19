import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { StackedCards } = DEMO_COMPONENTS;

export const meta = { id: 'stacked-cards', aliases: ['stacked-card', 'stack-cards', 'stack-card'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StackedCards.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-5xl mx-auto">
          <StackedCards key={demoKey} />
        </div>
      );
}
