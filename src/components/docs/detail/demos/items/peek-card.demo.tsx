import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PeekCard } = DEMO_COMPONENTS;

export const meta = { id: 'peek-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PeekCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 w-full flex flex-col items-center justify-center gap-4">
          <PeekCard
            key={demoKey}
            data={{
              title: 'Payment #3948',
              subtitle: 'Stripe Direct Charge',
              amount: '$249.00',
              status: 'Succeeded',
              customer: {
                name: 'Alexander Wright',
                email: 'alex.w@acme-corp.com',
              },
              timestamp: 'Oct 24, 2026 at 2:15 PM',
              metadata: [
                { label: 'Method', value: 'Mastercard •••• 4242' },
                { label: 'Fee', value: '$7.52 (3%)' },
                { label: 'Risk Score', value: 'Normal (08)' },
              ],
            }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-mono text-[#FAFAFA] cursor-pointer transition-colors">
              Hover over: Payment #3948
            </span>
          </PeekCard>
          <p className="text-xs text-[#6B6B6B]">Contextual preview card emerging smoothly from trigger element</p>
        </div>
      );
}
