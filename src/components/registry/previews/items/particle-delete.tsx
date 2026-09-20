import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 flex items-center justify-between gap-2 shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-md bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#A1A1A1]">
                  <Terminal className="w-3 h-3" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-[#FAFAFA] truncate">Edge Cluster</div>
                  <div className="text-[9px] font-mono text-[#6B6B6B]">12 workers</div>
                </div>
              </div>
              <span className={cn('p-1 rounded text-[9px] font-mono shrink-0 transition-colors', hovered ? 'bg-rose-500 text-white' : 'text-rose-400 bg-rose-500/10')}>
                Delete
              </span>
            </motion.div>
          </div>
        );
}
