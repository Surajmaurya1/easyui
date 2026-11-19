import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { LiquidRippleButton } = DEMO_COMPONENTS;

export const meta = { id: 'liquid-ripple-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([LiquidRippleButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex items-center justify-center gap-3">
          <LiquidRippleButton key={demoKey} variant="secondary">Generate preview</LiquidRippleButton>
          <LiquidRippleButton variant="primary">Run sync</LiquidRippleButton>
        </div>
      );
}
