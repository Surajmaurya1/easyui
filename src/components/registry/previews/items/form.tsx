import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#A1A1A1] font-medium">Workspace Email</span>
                <span className="text-[#FF7A7A]">*</span>
              </div>
              <motion.div
                animate={{ borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
                className="h-8 px-2.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-[11px] text-[#FAFAFA] flex items-center justify-between transition-colors shadow-xs"
              >
                <span>alex@easyui.dev</span>
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400')} />
              </motion.div>
            </div>
          </div>
        );
}
