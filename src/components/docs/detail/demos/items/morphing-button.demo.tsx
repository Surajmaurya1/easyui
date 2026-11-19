import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MorphingButton } = DEMO_COMPONENTS;

export const meta = { id: 'morphing-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MorphingButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 w-full flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MorphingButton key={`idle-${demoKey}`} status="idle" idleText="Save Changes" />
            <MorphingButton key={`loading-${demoKey}`} status="loading" loadingText="Saving..." />
            <MorphingButton key={`success-${demoKey}`} status="success" successText="Saved ✓" />
            <MorphingButton key={`error-${demoKey}`} status="error" errorText="Failed" variant="danger" />
          </div>
          <p className="text-xs text-[#6B6B6B]">Maintains physical shape & size across asynchronous state morphs</p>
        </div>
      );
}
