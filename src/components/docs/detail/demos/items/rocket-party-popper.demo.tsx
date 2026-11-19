import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { RocketPartyPopper } = DEMO_COMPONENTS;

export const meta = { id: 'rocket-party-popper', aliases: ['achievement-reveal'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([RocketPartyPopper.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 flex justify-center">
          <RocketPartyPopper
            key={demoKey}
            title="Mission Accomplished"
            description="All registry sync, lint, and SEO checks passed."
            metric="58 Components Live"
          />
        </div>
      );
}
