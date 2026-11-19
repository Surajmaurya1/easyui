import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SmoothAccordion } = DEMO_COMPONENTS;

export const meta = { id: 'smooth-accordion', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SmoothAccordion.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 max-w-md mx-auto w-full">
          <SmoothAccordion
            key={demoKey}
            items={[
              {
                id: '1',
                title: 'Zero Layout Jank',
                content:
                  'Framer motion spring dynamics calculate natural content height interpolation.',
              },
              {
                id: '2',
                title: 'TypeScript Friendly',
                content: 'Fully typed props with strict accessibility compliance.',
              },
            ]}
            defaultOpen={['1']}
          />
        </div>
      );
}
