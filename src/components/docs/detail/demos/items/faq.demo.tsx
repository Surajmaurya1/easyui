import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { FAQ } = DEMO_COMPONENTS;

export const meta = { id: 'faq', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([FAQ.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full max-w-2xl mx-auto">
          <FAQ
            key={demoKey}
            allowMultiple={true}
            searchable={true}
            showCategories={true}
            defaultOpen={['faq-1']}
            items={[
              {
                id: 'faq-1',
                question: 'How do I add EasyUI components to my existing project?',
                answer:
                  'You can install any component directly using the official shadcn CLI: "npx shadcn@latest add Surajmaurya1/easyui/<component-name>".',
                category: 'Installation',
                badge: 'CLI',
              },
              {
                id: 'faq-2',
                question: 'What makes EasyUI animations feel natural?',
                answer:
                  'EasyUI uses physical spring simulations rather than standard CSS bezier ease curves.',
                category: 'Animation',
                badge: 'Physics',
              },
            ]}
          />
        </div>
      );
}
