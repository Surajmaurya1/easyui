'use client';

import React, { useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface SettleModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer area (typically action buttons) */
  footer?: React.ReactNode;
  /** Hide the close (X) button in the top-right */
  hideCloseButton?: boolean;
  /** Click on backdrop closes the modal (default true) */
  closeOnBackdrop?: boolean;
  /** Maximum width of the modal (Tailwind class) */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap: Record<NonNullable<SettleModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

/**
 * SettleModal — Content has a tiny scale + settle instead of a generic fade.
 *
 * The panel scales from 0.94 -> 1.02 -> 1.0 (with a slight y travel), then the
 * inner content crossfades in with a tiny 0.96 -> 1.0 scale-up, so the
 * perceived motion is "settle" rather than "fade in".
 */
export const SettleModal: React.FC<SettleModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  hideCloseButton = false,
  closeOnBackdrop = true,
  size = 'md',
  className,
}) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby={title ? titleId : undefined}
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop fades in softly */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransitions.easeSoft}
            onClick={() => closeOnBackdrop && onClose()}
          />

          {/* Panel: scale + slight overshoot for the "settle" feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{
              opacity: 1,
              scale: [0.94, 1.02, 1],
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              'relative w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-elevated)] p-6 sm:p-8 focus:outline-none',
              sizeMap[size],
              className
            )}
          >
            {!hideCloseButton && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-md text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors focus-ring cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Inner content does its own tiny scale/settle — a layer deeper than the panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: 2 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05,
              }}
            >
              {title && (
                <h2
                  id={titleId}
                  className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)] pr-8"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{description}</p>
              )}

              {children && <div className="mt-5">{children}</div>}

              {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
