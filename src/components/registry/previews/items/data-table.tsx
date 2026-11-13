import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

/* Compact catalog-card rendering of <DataTable />: toolbar, sticky-style header,
   selected row, mini trend lines and delta pills — same visual language as the
   full component without shrinking the type below readability. */

const ROWS = [
  { name: 'Aero Desk Lamp', category: 'Lighting', revenue: '$12,480', change: 14.2, trend: [4, 6, 5, 8, 7, 10, 9, 12], selected: true },
  { name: 'Linen Throw', category: 'Textiles', revenue: '$9,215', change: 6.8, trend: [8, 7, 9, 8, 10, 9, 11, 12], selected: false },
  { name: 'Oak Side Table', category: 'Furniture', revenue: '$7,940', change: -3.1, trend: [12, 11, 11, 9, 10, 8, 8, 7], selected: false },
];

function MiniTrend({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const span = Math.max(...data) - min || 1;
  const points = data.map((v, i) => [
    1 + (i / (data.length - 1)) * 36,
    1 + (1 - (v - min) / span) * 10,
  ]);
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
  const color = up ? '#10b981' : '#f43f5e';

  return (
    <svg viewBox="0 0 38 12" className="h-3 w-[38px] overflow-visible" fill="none" aria-hidden>
      <path d={line} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="1.6" fill={color} />
    </svg>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <span
      className={
        on
          ? 'grid h-[14px] w-[14px] shrink-0 place-items-center rounded-[4px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
          : 'grid h-[14px] w-[14px] shrink-0 place-items-center rounded-[4px] ring-1 ring-inset ring-black/20 dark:ring-white/25'
      }
    >
      {on && (
        <svg viewBox="0 0 16 16" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5l3 3 6-6.5" />
        </svg>
      )}
    </span>
  );
}

export default function DataTablePreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full select-none items-center justify-center overflow-hidden px-3 py-2 pointer-events-none">
      <motion.div
        animate={{ y: isHovered ? -2 : 0, scale: isHovered ? 1.01 : 1 }}
        transition={motionTransitions.springSnappy}
        className="w-full max-w-[310px] rounded-[18px] bg-white text-neutral-700 ring-1 ring-black/[0.07] dark:bg-[#0b0b0c] dark:text-neutral-300 dark:ring-white/[0.07]"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 20px 40px -28px rgba(0,0,0,0.28)' }}
      >
        {/* toolbar */}
        <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-2.5">
          <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-black/[0.04] px-2 text-[10px] text-neutral-400 dark:bg-white/[0.05]">
            <Search className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">Search products…</span>
          </span>
          <span className="shrink-0 text-[9.5px] tabular-nums text-neutral-500">24 rows</span>
        </div>

        {/* header */}
        <div
          className="grid items-center gap-x-1.5 border-y border-black/[0.06] bg-white/90 px-2.5 py-1.5 text-[9px] font-medium text-neutral-500 dark:border-white/[0.07] dark:bg-[#0b0b0c]/90"
          style={{ gridTemplateColumns: '14px minmax(0,1.5fr) 40px minmax(0,0.8fr) 42px' }}
        >
          <Check on={false} />
          <span>Product</span>
          <span />
          <span className="text-right">Revenue</span>
          <span className="text-right">Change</span>
        </div>

        {/* rows */}
        <div className="[&>div:last-child]:border-b-0">
          {ROWS.map((row) => (
            <div
              key={row.name}
              className={
                'grid items-center gap-x-1.5 border-b border-black/[0.06] px-2.5 py-1.5 dark:border-white/[0.07] ' +
                (row.selected ? 'bg-neutral-50 dark:bg-white/[0.045]' : '')
              }
              style={{ gridTemplateColumns: '14px minmax(0,1.5fr) 40px minmax(0,0.8fr) 42px' }}
            >
              <Check on={row.selected} />
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[10px] font-medium text-neutral-900 dark:text-neutral-100">{row.name}</span>
                <span className="mt-px block truncate text-[8.5px] font-normal text-neutral-500">{row.category}</span>
              </span>
              <span className="flex justify-center">
                <MiniTrend data={row.trend} up={row.change >= 0} />
              </span>
              <span className="text-right text-[10px] tabular-nums">{row.revenue}</span>
              <span className="flex justify-end">
                <span
                  className={
                    'inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[8.5px] font-medium tabular-nums ' +
                    (row.change >= 0
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400')
                  }
                >
                  <svg
                    viewBox="0 0 10 10"
                    className={'h-1.5 w-1.5 ' + (row.change < 0 ? 'rotate-180' : '')}
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M5 1.5 9 7.5H1Z" />
                  </svg>
                  {Math.abs(row.change).toFixed(1)}%
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-2.5 py-1.5 text-[9px] text-neutral-500">
          <span className="tabular-nums">Showing 3 of 24</span>
          <span className="rounded-md bg-black/[0.05] px-1.5 py-0.5 text-[8.5px] font-medium text-neutral-700 dark:bg-white/[0.07] dark:text-neutral-200">
            Show more
          </span>
        </div>
      </motion.div>
    </div>
  );
}
