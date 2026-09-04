import React, { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface DirectionalTooltipProps {
  /** Trigger element(s) */
  children: React.ReactElement;
  /** Tooltip content */
  content: React.ReactNode;
  /** Preferred side; may be flipped if there's no space (auto by default) */
  side?: TooltipSide;
  /** Alignment along the side */
  align?: TooltipAlign;
  /** Delay before showing, in ms */
  delayDuration?: number;
  /** Whether to show an arrow */
  showArrow?: boolean;
  /** Offset from the trigger in px */
  offset?: number;
  className?: string;
  /** Force the tooltip to always be visible (for design previews) */
  forceOpen?: boolean;
}

const sideTransform: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: 0, y: 8 },
  right: { x: -8, y: 0 },
  bottom: { x: 0, y: -8 },
  left: { x: 8, y: 0 },
};

const sideStyles: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
};

const arrowStyles: Record<TooltipSide, { position: string; borderColorSide: string }> = {
  top: {
    position: 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-l-transparent border-r-transparent border-b-transparent',
    borderColorSide: 'borderTopColor',
  },
  right: {
    position: 'right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-t-transparent border-b-transparent border-l-transparent',
    borderColorSide: 'borderRightColor',
  },
  bottom: {
    position: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-l-transparent border-r-transparent border-t-transparent',
    borderColorSide: 'borderBottomColor',
  },
  left: {
    position: 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-t-transparent border-b-transparent border-r-transparent',
    borderColorSide: 'borderLeftColor',
  },
};

const alignStyles: Record<TooltipAlign, Record<TooltipSide, string>> = {
  start: {
    top: 'left-0 translate-x-0',
    right: 'top-0 translate-y-0',
    bottom: 'left-0 translate-x-0',
    left: 'top-0 translate-y-0',
  },
  center: {
    top: 'left-1/2 -translate-x-1/2',
    right: 'top-1/2 -translate-y-1/2',
    bottom: 'left-1/2 -translate-x-1/2',
    left: 'top-1/2 -translate-y-1/2',
  },
  end: {
    top: 'right-0 translate-x-0',
    right: 'bottom-0 translate-y-0',
    bottom: 'right-0 translate-x-0',
    left: 'bottom-0 translate-y-0',
  },
};

/**
 * DirectionalTooltip — Appears from the direction it originates.
 * The tooltip starts a small distance outside the trigger in its preferred
 * direction and springs inward, so the user perceives it as materializing
 * from the trigger toward the content.
 */
export const DirectionalTooltip: React.FC<DirectionalTooltipProps> = ({
  children,
  content,
  side = 'top',
  align = 'center',
  delayDuration = 150,
  showArrow = true,
  offset = 8,
  className,
  forceOpen = false,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const id = useId();

  const handleOpen = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(true), delayDuration);
  };
  const handleClose = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  // Clone the trigger and wire ref + hover handlers
  const trigger = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      // forward existing ref if any
      const existingRef = (children as any).ref;
      if (typeof existingRef === 'function') existingRef(node);
      else if (existingRef && 'current' in existingRef) {
        (existingRef as any).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleOpen();
      (children.props as any).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleClose();
      (children.props as any).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      handleOpen();
      (children.props as any).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      handleClose();
      (children.props as any).onBlur?.(e);
    },
    'aria-describedby': open ? id : undefined,
  } as any);

  const isOpen = open || forceOpen;
  const offsetT = sideTransform[side];
  const applyOffset = (val: number) => val + (Math.sign(val) || 0) * 0; // keep tiny entry; offset handled by CSS spacing

  return (
    <span className="relative inline-flex">
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{
              opacity: 0,
              scale: 0.94,
              x: applyOffset(offsetT.x),
              y: applyOffset(offsetT.y),
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              x: applyOffset(offsetT.x) * 0.5,
              y: applyOffset(offsetT.y) * 0.5,
            }}
            transition={motionTransitions.springSnappy}
            className={cn(
              'absolute z-50 max-w-xs whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-elevated)] px-2.5 py-1.5 text-xs leading-relaxed',
              sideStyles[side],
              alignStyles[align][side],
              className
            )}
            style={{ margin: offset }}
          >
            {content}
            {showArrow && (
              <span
                aria-hidden="true"
                className={cn('absolute w-2 h-2 border-4', arrowStyles[side].position)}
                style={{ [arrowStyles[side].borderColorSide]: 'var(--border)' } as React.CSSProperties}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
