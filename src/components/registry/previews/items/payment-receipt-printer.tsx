import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] flex flex-col items-center pointer-events-none scale-100 sm:scale-100">
              <div className="w-full p-2 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-between shadow-md z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
                  <span className="text-[10px] font-semibold text-white">Paid #4821</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <motion.div
                animate={{ y: hovered ? 4 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-[88%] -mt-1 p-2.5 rounded-b-md bg-[#F9F9F8] text-[#111111] font-mono text-[9px] shadow border border-[#E0E0DE] space-y-1"
              >
                <div className="flex justify-between font-bold border-b border-dashed border-black/20 pb-1">
                  <span>EASYUI PRO</span>
                  <span>$200.00</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>TOTAL:</span>
                  <span className="font-bold">$200.00</span>
                </div>
              </motion.div>
            </div>
          </div>
        );
}
