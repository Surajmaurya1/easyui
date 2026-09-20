import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { MorphingDialog } from '../../../ui/MorphingDialog';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ component, isHovered = false }: ComponentPreviewProps) {
  const comp = component;
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ scale: hovered ? 1.05 : 1 }}>
              <MorphingDialog
                id={`card-dialog-${comp.id}`}
                title="Shared Surface Transition"
                subtitle="Smooth layoutId expansion"
                trigger={(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={cn('px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer', hovered ? 'bg-[#0E0E0E] border-[#4A4A4A] text-white' : 'bg-[#141414] border-[#1F1F1F] text-[#FAFAFA]')}
                  >
                    Trigger Modal
                  </button>
                )}
              >
                <p className="text-xs text-[#A1A1A1]">Morphing layout transition without harsh popping.</p>
              </MorphingDialog>
            </motion.div>
          </div>
        );
}
