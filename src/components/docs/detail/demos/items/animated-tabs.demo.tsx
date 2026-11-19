import type { DemoProps } from '../../demo-types';
import { AnimatedTabs } from '../../../../ui/AnimatedTabs';

export const meta = { id: 'animated-tabs', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 flex flex-col items-center justify-center">
          <AnimatedTabs
            key={demoKey}
            tabs={[
              {
                id: 'tab1',
                label: 'Overview',
                content: (
                  <div className="text-xs text-text-secondary p-4 bg-surface-raised rounded-xl border border-border dark:bg-[#141414] dark:border-[#1F1F1F] dark:text-[#A1A1A1]">
                    Overview metrics & telemetry
                  </div>
                ),
              },
              {
                id: 'tab2',
                label: 'Integration',
                content: (
                  <div className="text-xs text-text-secondary p-4 bg-surface-raised rounded-xl border border-border dark:bg-[#141414] dark:border-[#1F1F1F] dark:text-[#A1A1A1]">
                    Next.js App Router setup
                  </div>
                ),
              },
              {
                id: 'tab3',
                label: 'Security',
                content: (
                  <div className="text-xs text-text-secondary p-4 bg-surface-raised rounded-xl border border-border dark:bg-[#141414] dark:border-[#1F1F1F] dark:text-[#A1A1A1]">
                    Zero external runtime network dependencies
                  </div>
                ),
              },
            ]}
            defaultTab="tab1"
          />
        </div>
      );
}
