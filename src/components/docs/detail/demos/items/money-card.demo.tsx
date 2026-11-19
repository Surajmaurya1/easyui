import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MoneyCard } = DEMO_COMPONENTS;

export const meta = { id: 'money-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MoneyCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full flex items-center justify-center py-6">
          <MoneyCard key={demoKey} className="max-w-[440px]" />
        </div>
      );
}
