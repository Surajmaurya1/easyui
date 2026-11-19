import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MorphingDialog } = DEMO_COMPONENTS;

export const meta = { id: 'morphing-dialog', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MorphingDialog.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-10 flex flex-col items-center justify-center gap-4">
          <MorphingDialog
            key={demoKey}
            id="detail-morph"
            title="Authentication Settings"
            subtitle="Configure multi-factor tokens and OAuth2 providers."
            trigger={(open: () => void) => (
              <button
                onClick={open}
                className="px-5 py-2.5 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#FAFAFA] transition-all cursor-pointer"
              >
                Open Morphing Dialog
              </button>
            )}
          >
            <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] text-xs text-[#A1A1A1]">
              Continuous layoutId expansion without jarring modal popping.
            </div>
          </MorphingDialog>
          <p className="text-xs text-[#6B6B6B]">Click trigger to see smooth shared layout transition</p>
        </div>
      );
}
