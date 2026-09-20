import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, rotate: hovered ? -1 : 0 }}
              className="w-full max-w-[260px] rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="px-2.5 py-1.5 bg-[#141414] border-b border-[#1F1F1F] flex items-center justify-between text-[10px] font-mono text-[#6B6B6B]">
                <span>client.ts</span>
                <span className="text-[#FAFAFA]">TypeScript</span>
              </div>
              <div className="p-2.5 font-mono text-[10px] text-[#A1A1A1] leading-relaxed">
                <div><span className="text-[#FAFAFA]">import</span> &#123; EasyUI &#125; <span className="text-[#FAFAFA]">from</span> <span className="text-white/70">"@easyui/sdk"</span>;</div>
                <div className={cn(hovered ? 'text-emerald-400' : 'text-[#6B6B6B]')}>{hovered ? '// Connected to cluster' : '// Instant completions API'}</div>
              </div>
            </motion.div>
          </div>
        );
}
