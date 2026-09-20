import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#6B6B6B]">p99 Latency</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{hovered ? '-24.8%' : '-18.4%'}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold font-mono text-[#FAFAFA]">{hovered ? '11.8' : '14.2'}</span>
                <span className="text-[10px] font-mono text-[#6B6B6B]">ms</span>
              </div>
              <div className="h-6 w-full flex items-end gap-1">
                {[35, 45, 55, 40, 65, 75, 50, 85, 90, 60, 40, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: hovered ? `${Math.min(100, h + 15)}%` : `${h}%` }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className={cn('flex-1 rounded-t', hovered ? 'bg-[#3B82F6]' : 'bg-white/20')}
                  />
                ))}
              </div>
            </div>
          </div>
        );
}
