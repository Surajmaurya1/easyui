import { motion } from 'framer-motion';
import { fullFmt } from '../../../../lib/chart-primitives';
import { TRAFFIC_CHANNELS, TRAFFIC_RANGES } from '../../../docs/detail/demos/chart-demo-data';
import { TRAFFIC_COLORS } from '../../../ui/TrafficCard';
import type { ComponentPreviewProps } from '../types';

/* A compact rendering of the traffic card for the catalog grid. The full card
   is too tall for the card slot, so this keeps the same layout language —
   headline, Day/Week switch, capsule columns, axis — at preview scale. */

const RANGE = TRAFFIC_RANGES[0];
const POINTS = RANGE.points;
const W = 264;
const H = 72;
const PAD_TOP = 4;
const GAP = 2;

const valueOf = (index: number, channel: string) => POINTS[index].values[channel] ?? 0;
const totals = POINTS.map((_, i) =>
  TRAFFIC_CHANNELS.reduce((sum, channel) => sum + valueOf(i, channel.id), 0),
);
const total = totals.reduce((sum, value) => sum + value, 0);
const maxTotal = Math.max(1, ...totals);
const scale = (H - PAD_TOP - GAP * (TRAFFIC_CHANNELS.length - 1)) / maxTotal;
const step = W / POINTS.length;
const barW = Math.min(10, step * 0.5);

const columns = POINTS.map((_, i) => {
  let cursor = H;
  return {
    x: step * i + step / 2 - barW / 2,
    segments: TRAFFIC_CHANNELS.flatMap((channel, ci) => {
      const value = valueOf(i, channel.id);
      if (value <= 0) return [];
      const h = Math.max(1.5, value * scale);
      const rect = {
        y: cursor - h,
        h,
        color: TRAFFIC_COLORS[ci % TRAFFIC_COLORS.length],
      };
      cursor -= h + GAP;
      return [rect];
    }),
  };
});

export default function TrafficCardPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full items-center justify-center overflow-hidden p-3 pointer-events-none select-none">
      <motion.div
        animate={{ y: isHovered ? -2 : 0, scale: isHovered ? 1.01 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[300px] rounded-[20px] bg-white p-3.5 text-neutral-700 ring-1 ring-black/[0.07] dark:bg-[#0b0b0c] dark:text-neutral-300 dark:ring-white/[0.07]"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 20px 40px -28px rgba(0,0,0,0.28)' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[11.5px] font-medium tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
              Traffic
            </p>
            <p className="mt-0.5 truncate text-[9.5px] text-neutral-500">{RANGE.caption}</p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-black/[0.045] p-[2px] dark:bg-white/[0.07]">
            {['Day', 'Week'].map((label) => {
              const on = label === 'Day';
              return (
                <span
                  key={label}
                  className={
                    on
                      ? 'rounded-full bg-white px-2 py-0.5 text-[8px] font-medium text-neutral-900 shadow-sm dark:bg-white/[0.14] dark:text-neutral-50 dark:shadow-none'
                      : 'px-2 py-0.5 text-[8px] font-medium text-neutral-500'
                  }
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <p className="mt-2 flex items-baseline gap-1.5">
          <span className="text-[26px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-neutral-900 dark:text-neutral-50">
            {fullFmt.format(total)}
          </span>
          <span className="text-[9.5px] text-neutral-500">visits</span>
        </p>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" aria-hidden>
          {columns.map((column, i) => (
            <g key={i}>
              {column.segments.map((segment, si) => (
                <rect
                  key={si}
                  x={column.x}
                  y={segment.y}
                  width={barW}
                  height={segment.h}
                  rx={Math.min(barW / 2, segment.h / 2)}
                  fill={segment.color}
                />
              ))}
            </g>
          ))}
        </svg>

        <div className="mt-1.5 flex items-center justify-between gap-3 text-[9px] tabular-nums text-neutral-500">
          <span>{POINTS[0].label}</span>
          <span>{POINTS[POINTS.length - 1].label}</span>
        </div>
      </motion.div>
    </div>
  );
}
