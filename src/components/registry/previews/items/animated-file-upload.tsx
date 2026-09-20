import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ borderColor: hovered ? '#4A4A4A' : '#1F1F1F', scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-3 rounded-xl border border-dashed bg-[#0E0E0E] flex flex-col items-center justify-center text-center pointer-events-none scale-100 sm:scale-100 transition-colors shadow-xs"
            >
              <motion.div
                animate={{ y: hovered ? -3 : 0 }}
                className={cn('w-7 h-7 rounded-lg border flex items-center justify-center mb-1.5 transition-colors', hovered ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]' : 'bg-[#141414] border-[#1F1F1F] text-[#A1A1A1]')}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-[11px] font-medium text-[#FAFAFA]">{hovered ? 'Drop to Upload' : 'Drop files here'}</span>
              <span className="text-[9px] text-[#6B6B6B]">or browse device</span>
            </motion.div>
          </div>
        );
}
