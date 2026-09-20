import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
                  <span className="text-[11px] font-semibold text-[#FAFAFA]">Payment Successful</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">$149.00</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#6B6B6B] border-t border-[#1F1F1F] pt-1.5">
                <span>tx_9842a8d11c7f</span>
                <span>Apple Pay</span>
              </div>
            </motion.div>
          </div>
        );
}
