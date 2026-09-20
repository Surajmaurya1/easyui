import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[260px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#FAFAFA]">Pro Tier</span>
                <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors', hovered ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]' : 'text-[#FAFAFA] bg-[#141414] border-[#1F1F1F]')}>$29/mo</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[#6B6B6B]">
                <div className="flex justify-between"><span>Multi-Region</span><span className="text-[#FAFAFA]">✓ Included</span></div>
                <div className="flex justify-between"><span>Concurrency</span><span className="text-[#FAFAFA]">250 nodes</span></div>
              </div>
            </motion.div>
          </div>
        );
}
