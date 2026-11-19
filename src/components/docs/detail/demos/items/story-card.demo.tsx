import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { StoryCards } = DEMO_COMPONENTS;

export const meta = { id: 'story-card', aliases: ['story-cards'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StoryCards.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-5xl mx-auto">
          <StoryCards key={demoKey} />
        </div>
      );
}
