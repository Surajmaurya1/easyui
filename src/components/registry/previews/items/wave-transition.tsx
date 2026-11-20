import type { ComponentPreviewProps } from '../types';

const DETAILS = [
  ['From', 'Everyday ·· 4821'],
  ['Duration', '1 month'],
  ['Plan', 'EasyUI Sponsor'],
  ['Fee', 'Free'],
] as const;

export default function Preview(_props: ComponentPreviewProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-52 w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 flex min-h-[320px] w-[310px] max-w-none -translate-x-1/2 -translate-y-1/2 scale-[0.62] flex-col items-center rounded-[26px] border border-black/[0.07] bg-white p-4 text-[#171719] shadow-[0_12px_32px_-24px_rgba(0,0,0,0.35)] dark:border-white/[0.09] dark:bg-[#202020] dark:text-white dark:shadow-[0_12px_32px_-24px_rgba(0,0,0,0.8)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#202024] text-xs font-semibold text-white dark:bg-white dark:text-[#202024]">
          E
        </div>
        <p className="mt-2 text-[10px] text-black/55 dark:text-white/55">
          Purchasing <span className="font-medium text-black/90 dark:text-white">EasyUI Sponsor</span>
        </p>
        <span className="mt-0.5 text-[27px] leading-tight tracking-[-0.045em]">
          $49.00
        </span>

        <div className="mt-3 flex w-full flex-1 flex-col justify-center rounded-[18px] border border-black/[0.08] bg-black/[0.025] px-3 dark:border-white/[0.09] dark:bg-white/[0.025]">
          {DETAILS.map(([label, value], index) => (
            <div
              key={label}
              className={`flex items-center justify-between py-[8px] text-[10px] ${
                index < DETAILS.length - 1
                  ? 'border-b border-black/[0.07] dark:border-white/[0.08]'
                  : ''
              }`}
            >
              <span className="text-black/50 dark:text-white/50">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex w-full items-center justify-center rounded-full bg-black px-4 py-[9px] text-[11px] font-medium text-white dark:bg-[#F7F7F8] dark:text-[#111114]">
          Confirm
        </div>
      </div>
    </div>
  );
}
