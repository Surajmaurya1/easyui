import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import { Sparkles } from 'lucide-react';


const { MagneticButton } = DEMO_COMPONENTS;

export const meta = { id: 'magnetic-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MagneticButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-4">
          <MagneticButton key={demoKey} variant="primary" size="lg" strength={0.4}>
            <span>Magnetic Button</span>
            <Sparkles className="w-4 h-4 text-[#ECECEC]" />
          </MagneticButton>
          <p className="text-xs text-[#6F6F6F]">Hover cursor around button to test magnetic pull</p>
        </div>
      );
}
