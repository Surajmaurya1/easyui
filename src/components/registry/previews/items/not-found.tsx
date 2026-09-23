import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';
import { Button } from '../../../ui/Button';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-4 select-none">
      {/* 404 Floating Digits with interactive micro-drift on hover */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <motion.span
          animate={{
            x: isHovered ? -5 : 0,
            y: isHovered ? -3 : 0,
            rotateZ: isHovered ? -4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="font-sans font-bold text-5xl sm:text-6xl text-text-primary tracking-tighter"
        >
          4
        </motion.span>
        <motion.span
          animate={{
            y: isHovered ? 4 : 0,
            rotateZ: isHovered ? 2 : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="font-sans font-bold text-5xl sm:text-6xl text-text-primary tracking-tighter"
        >
          0
        </motion.span>
        <motion.span
          animate={{
            x: isHovered ? 5 : 0,
            y: isHovered ? -3 : 0,
            rotateZ: isHovered ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="font-sans font-bold text-5xl sm:text-6xl text-text-primary tracking-tighter"
        >
          4
        </motion.span>
      </div>

      {/* Narrative minimal copy */}
      <div className="text-center mt-3 space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-text-primary tracking-tight">
          This page took a wrong turn.
        </p>
        <p className="text-[11px] text-text-muted">
          The requested page doesn't exist.
        </p>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Button variant="primary" size="sm">
          Go back home
        </Button>
      </div>
    </div>
  );
}
