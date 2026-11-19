import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { UnfoldAccordion } = DEMO_COMPONENTS;

export const meta = { id: 'unfold-accordion', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([UnfoldAccordion.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <UnfoldAccordion
            items={[
              {
                id: '1',
                title: 'What is spring physics?',
                content: 'Spring tokens drive motion across the system so the chevron, height, and content move together.',
              },
              {
                id: '2',
                title: 'How does it feel different?',
                content: 'Each interaction has a specific motion character, not a generic transition.',
              },
              {
                id: '3',
                title: 'Is it accessible?',
                content: 'Yes — full keyboard support, ARIA roles, and focus management are built in.',
              },
            ]}
          />
        </div>
      );
}
