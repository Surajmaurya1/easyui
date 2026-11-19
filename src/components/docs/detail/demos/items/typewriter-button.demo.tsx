import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { TypewriterButton } = DEMO_COMPONENTS;

export const meta = { id: 'typewriter-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([TypewriterButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] max-w-full shadow-md">
            <TypewriterButton
              key={demoKey}
              soundEnabled
              variant="primary"
              charDuration={65}
            >
              npx easyui add button
            </TypewriterButton>
            <TypewriterButton
              key={`${demoKey}-sec`}
              soundEnabled
              variant="secondary"
              charDuration={50}
            >
              git push origin main
            </TypewriterButton>
          </div>
          <p className="text-xs text-[#6B6B6B]">Click buttons to test typewriter text reveal + Web Audio mechanical clicks</p>
        </div>
      );
}
