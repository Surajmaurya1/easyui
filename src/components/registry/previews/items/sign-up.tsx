import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-1.5 pointer-events-none scale-100 sm:scale-100 shadow-xs">
              <div className="text-[11px] font-semibold text-[#FAFAFA]">Create account</div>
              <div className="flex gap-1 h-1">
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <motion.div animate={{ backgroundColor: hovered ? '#34D399' : '#1F1F1F' }} className="flex-1 rounded-full transition-colors" />
              </div>
              <div className="text-[9px] font-mono text-emerald-400 flex justify-between">
                <span>Security</span>
                <span>{hovered ? 'Maximum' : 'Strong'}</span>
              </div>
            </div>
          </div>
        );
}
