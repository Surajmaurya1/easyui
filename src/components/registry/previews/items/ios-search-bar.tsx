import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ width: hovered ? '220px' : '160px', borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="h-8 px-3 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-between text-xs text-[#6B6B6B] pointer-events-none"
            >
              <Search className="w-3.5 h-3.5 text-[#525252] shrink-0" />
              <span className="text-[11px] truncate mx-2 text-[#A1A1A1]">{hovered ? 'components...' : 'Search...'}</span>
              <span className="w-4 h-4 rounded-full bg-[#1F1F1F] text-[#A1A1A1] flex items-center justify-center shrink-0">
                <X className="w-2.5 h-2.5" />
              </span>
            </motion.div>
          </div>
        );
}
