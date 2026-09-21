import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

export default function AdvancedDataTablePreview({ isHovered = false }: ComponentPreviewProps) {
  const rows = [
    { name: 'Button', status: 'Stable', usage: '2.4k' },
    { name: 'Dialog', status: 'Stable', usage: '1.8k' },
    { name: 'AIResponse', status: 'New', usage: '420' },
  ];

  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="h-full flex items-center justify-center p-4 select-none w-full font-sans"
    >
      <motion.div
        animate={{
          y: isHovered ? -2 : 0,
          borderColor: isHovered ? 'var(--border-hover)' : 'var(--border)',
        }}
        transition={motionTransitions.springSnappy}
        className="w-full max-w-[280px] rounded-xl border border-border/70 bg-surface/40 overflow-hidden font-sans text-xs"
      >
        {/* Mini Toolbar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border/50 bg-surface/30">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-normal">
            <Search className="w-3 h-3" />
            <span>Search...</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-normal">
            3 records
          </span>
        </div>

        {/* Mini Table */}
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-border/50 bg-surface-raised/20 text-xs text-muted-foreground">
              <th className="px-3.5 py-2 font-medium">Name</th>
              <th className="px-2.5 py-2 font-medium">Status</th>
              <th className="px-3.5 py-2 font-medium text-right">Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {rows.map((r, i) => (
              <tr
                key={i}
                className="hover:bg-surface-hover/50 transition-colors text-foreground/80"
              >
                <td className="px-3.5 py-2 font-medium text-foreground truncate">
                  {r.name}
                </td>
                <td className="px-2.5 py-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {r.status}
                  </span>
                </td>
                <td className="px-3.5 py-2 text-right tabular-nums text-muted-foreground">
                  {r.usage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mini Footer */}
        <div className="flex items-center justify-between px-3.5 py-2 border-t border-border/50 bg-surface/20 text-[11px] text-muted-foreground font-normal">
          <span>Showing 1–3 of 3</span>
          <span className="text-foreground/80">Page 1/1</span>
        </div>
      </motion.div>
    </div>
  );
}
