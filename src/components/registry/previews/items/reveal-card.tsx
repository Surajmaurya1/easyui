import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { RevealCard } from '../../../ui/RevealCard';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ rotateX: hovered ? 8 : 0, rotateY: hovered ? -8 : 0 }} className="w-full">
              <RevealCard
                revealContent={<span className="text-xs text-white font-medium">Revealed on hover tilt</span>}
                className={cn('p-4 transition-colors', hovered ? 'bg-[#141414] border-[#4A4A4A]' : 'bg-[#0E0E0E] border-[#1F1F1F]')}
              >
                <span className="text-xs font-semibold text-[#FAFAFA] block">3D Tilt & Glare</span>
                <span className="text-[11px] text-[#6B6B6B]">Hover cursor across surface</span>
              </RevealCard>
            </motion.div>
          </div>
        );
}
