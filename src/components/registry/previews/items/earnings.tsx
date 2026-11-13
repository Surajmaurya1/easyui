import { motion } from 'framer-motion';
import { monotonePath, resample } from '../../../ui/Earnings';
import type { ComponentPreviewProps } from '../types';

/* A compact, full-size rendering of the earnings card for the catalog grid.
   The full component is too tall to fit the card slot at a readable scale, so
   this keeps the same layout language (total, delta, trend, split bar, rows)
   without shrinking the type. */

const TREND = [210, 260, 240, 320, 300, 380, 360, 430, 410, 470, 450, 520, 500, 560];
const W = 300;
const H = 38;

const trendValues = resample(TREND, 32);
const trendMin = Math.min(...trendValues);
const trendSpan = Math.max(...trendValues) - trendMin || 1;
const trendPoints = trendValues.map(
  (v, i) => [(i / 31) * W, 4 + (1 - (v - trendMin) / trendSpan) * (H - 6)] as [number, number],
);
const trendLine = monotonePath(trendPoints);
const trendArea = `${trendLine}L${W} ${H}L0 ${H}Z`;

const SOURCES = [
  { id: 'sponsors', label: 'Sponsors', amount: '$4,200.00', share: '58%', color: '#6d7cff', initial: 'S' },
  { id: 'pro', label: 'Pro licenses', amount: '$3,100.00', share: '42%', color: '#34d1bf', initial: 'P' },
];

const PERIODS = ['7D', '30D', '12M'];

export default function EarningsPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full select-none items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        animate={{ y: isHovered ? -2 : 0, scale: isHovered ? 1.01 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[310px] rounded-[20px] bg-white p-3 text-neutral-700 ring-1 ring-black/[0.07] dark:bg-[#0b0b0c] dark:text-neutral-300 dark:ring-white/[0.07]"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 20px 40px -28px rgba(0,0,0,0.28)' }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-neutral-500">Earnings</span>
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-black/[0.04] p-0.5 dark:bg-white/[0.05]">
            {PERIODS.map((p) => (
              <span
                key={p}
                className={
                  p === '30D'
                    ? 'rounded-full bg-white px-2 py-0.5 text-[8px] font-medium text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white'
                    : 'px-2 py-0.5 text-[8px] font-medium text-neutral-500'
                }
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-neutral-900 dark:text-neutral-50">
          $7,300.00
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[9.5px]">
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
            <svg viewBox="0 0 10 10" className="h-1.5 w-1.5" fill="currentColor" aria-hidden>
              <path d="M5 1.5 9 7.5H1Z" />
            </svg>
            14.1%
          </span>
          <span className="text-neutral-500">vs previous 30 days</span>
        </p>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="earnings-preview-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6d7cff" stopOpacity="0.26" />
              <stop offset="1" stopColor="#6d7cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#earnings-preview-area)" d={trendArea} />
          <path fill="none" stroke="#6d7cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d={trendLine} />
          <circle cx={trendPoints[trendPoints.length - 1][0]} cy={trendPoints[trendPoints.length - 1][1]} r="2.5" fill="#6d7cff" />
        </svg>

        <div className="mt-1.5 flex h-1.5 w-full gap-[2px]">
          {SOURCES.map((s) => (
            <span
              key={s.id}
              className="h-full rounded-full"
              style={{ background: s.color, flexGrow: parseInt(s.share, 10) }}
            />
          ))}
        </div>

        <div className="mt-1.5 space-y-1">
          {SOURCES.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span
                className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] text-[8px] font-semibold"
                style={{ background: `color-mix(in srgb, ${s.color} 16%, transparent)`, color: s.color }}
              >
                {s.initial}
              </span>
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-neutral-900 dark:text-neutral-100">
                {s.label}
              </span>
              <span className="shrink-0 text-[9.5px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                {s.amount}
              </span>
              <span className="w-[26px] shrink-0 text-right text-[8.5px] tabular-nums text-neutral-500">{s.share}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
