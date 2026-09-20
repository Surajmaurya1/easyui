import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ y: hovered ? -1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400')} />
                <span className="text-[11px] text-[#FAFAFA] truncate">Edge Lambda deployed</span>
                <span className="ml-auto text-[9px] font-mono text-[#6B6B6B]">Just now</span>
              </motion.div>
              <motion.div
                animate={{ y: hovered ? 1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[11px] text-[#FAFAFA] truncate">POST /v1/auth 200 OK</span>
                <span className="ml-auto text-[9px] font-mono text-[#6B6B6B]">18ms</span>
              </motion.div>
            </div>
          </div>
        );
}
