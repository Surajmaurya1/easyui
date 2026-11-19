import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { Pricing } = DEMO_COMPONENTS;

export const meta = { id: 'pricing', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Pricing.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-3 sm:py-6 w-full max-w-5xl mx-auto min-w-0">
          <Pricing
            key={demoKey}
            freeTier={{
              name: 'Free',
              tagline: 'For personal & open-source projects',
              price: '$0',
              cadence: 'Forever',
              features: [
                'All components',
                'Copy & paste',
                'React + Tailwind',
                'MIT licensed',
              ],
              ctaLabel: 'Get started',
            }}
            proTier={{
              name: 'Pro',
              tagline: 'For production teams',
              price: '$29',
              cadence: 'One-time payment',
              features: [
                'Everything in Free',
                'Premium components',
                'Advanced animations',
                'Future updates',
              ],
              ctaLabel: 'Get Pro',
            }}
          />
        </div>
      );
}
