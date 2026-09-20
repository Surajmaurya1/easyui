import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-2 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ x: hovered ? 2 : 0 }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className="w-4 h-4 rounded-full bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="text-[11px] font-medium text-[#FAFAFA]">Edge Build Verified</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400">48s</span>
              </motion.div>
              <motion.div
                animate={{ x: hovered ? 4 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className={cn('w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] text-white', hovered && 'animate-spin')}>●</span>
                <span className="text-[11px] font-medium text-[#A1A1A1]">Global Replication</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400 font-medium">{hovered ? 'Deployed ✓' : 'Active'}</span>
              </motion.div>
            </div>
          </div>
        );
}
