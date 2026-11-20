import * as React from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { WaveTransition } = DEMO_COMPONENTS;

export const meta = { id: 'wave-transition', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([WaveTransition.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const [paid, setPaid] = React.useState(false);
  const confirmRef = React.useRef<HTMLButtonElement>(null);

  const recipient = (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#202024] text-sm font-semibold text-white shadow-inner dark:bg-white dark:text-[#202024]">
      E
    </div>
  );

  return (
    <div className="flex w-full justify-center py-5">
      <WaveTransition
        key={demoKey}
        revealed={paid}
        revealedContent={(
          <div className="flex min-h-[402px] flex-col items-center rounded-[32px] bg-white p-[18px] text-[#171719] dark:bg-[#202020] dark:text-white">
            <div className="mt-1">{recipient}</div>
            <p className="mt-3 text-xs text-black/55 dark:text-white/55">EasyUI sponsorship</p>
            <span className="mt-1 text-[31px] leading-tight tracking-[-0.045em]">$49.00</span>
            <div className="mt-5 flex w-full flex-1 flex-col justify-center rounded-[22px] border border-black/[0.08] bg-black/[0.025] px-[14px] dark:border-white/[0.09] dark:bg-white/[0.025]">
              <div className="flex items-center justify-between border-b border-black/[0.07] py-[11px] text-xs dark:border-white/[0.08]">
                <span className="text-black/50 dark:text-white/50">Plan</span>
                <span className="font-medium">EasyUI Sponsor</span>
              </div>
              <div className="flex items-center justify-between py-[11px] text-xs">
                <span className="text-black/50 dark:text-white/50">Duration</span>
                <span className="font-medium">1 month</span>
              </div>
            </div>
          </div>
        )}
        type="center"
        palette="rainbow"
        source={confirmRef}
        duration={1.5}
        overlay={(
          <div className="flex h-full items-end p-[17px]">
            <button
              ref={confirmRef}
              type="button"
              onClick={() => setPaid((value) => !value)}
              className="w-full rounded-full bg-black px-5 py-[13px] text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] dark:bg-[#F7F7F8] dark:text-[#111114] dark:hover:bg-white"
            >
              {paid ? 'Done' : 'Confirm'}
            </button>
          </div>
        )}
        className="min-h-[402px] w-full max-w-[344px] rounded-[32px] border border-black/[0.08] bg-white shadow-[0_18px_55px_-34px_rgba(0,0,0,0.3)] dark:border-white/[0.09] dark:bg-[#202020] dark:shadow-[0_18px_55px_-34px_rgba(0,0,0,0.75)]"
      >
        <div className="flex min-h-[402px] flex-col items-center rounded-[32px] bg-white p-[18px] text-[#171719] dark:bg-[#202020] dark:text-white">
          <div className="mt-1">{recipient}</div>
          <p className="mt-3 text-xs text-black/55 dark:text-white/55">Purchasing <span className="font-medium text-black/90 dark:text-white">EasyUI Sponsor</span></p>
          <span className="mt-1 text-[31px] leading-tight tracking-[-0.045em]">$49.00</span>
          <div className="mt-4 flex w-full flex-1 flex-col justify-center rounded-[22px] border border-black/[0.08] bg-black/[0.025] px-[14px] dark:border-white/[0.09] dark:bg-white/[0.025]">
            <div className="flex items-center justify-between border-b border-black/[0.07] py-[10px] text-xs dark:border-white/[0.08]">
              <span className="text-black/50 dark:text-white/50">From</span>
              <span className="font-medium">Everyday ·· 4821</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/[0.07] py-[10px] text-xs dark:border-white/[0.08]">
              <span className="text-black/50 dark:text-white/50">Duration</span>
              <span className="font-medium">1 month</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/[0.07] py-[10px] text-xs dark:border-white/[0.08]">
              <span className="text-black/50 dark:text-white/50">Plan</span>
              <span className="font-medium">EasyUI Sponsor</span>
            </div>
            <div className="flex items-center justify-between py-[10px] text-xs">
              <span className="text-black/50 dark:text-white/50">Fee</span>
              <span className="font-medium">Free</span>
            </div>
          </div>
        </div>
      </WaveTransition>
    </div>
  );
}
