import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CursorFollowerProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Custom icon, text badge, or React element displayed inside follower */
  children?: React.ReactNode;
  /** Width and height in pixels */
  size?: number;
  /** Horizontal offset from cursor */
  offsetX?: number;
  /** Vertical offset from cursor */
  offsetY?: number;
  /** Spring stiffness controlling snap velocity */
  stiffness?: number;
  /** Spring damping controlling oscillation smoothness */
  damping?: number;
  /** Spring mass controlling weight and inertia */
  mass?: number;
  /** Hides the follower when pointer leaves window or viewport */
  hideOnLeave?: boolean;
  /** Dynamically scales the follower slightly while in motion */
  scaleOnMove?: boolean;
  /** Additional custom Tailwind styling */
  className?: string;
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({
  children,
  size = 32,
  offsetX = 0,
  offsetY = 0,
  stiffness = 450,
  damping = 32,
  mass = 0.5,
  hideOnLeave = true,
  scaleOnMove = true,
  className,
  style,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness,
    damping,
    mass,
  });

  const springY = useSpring(mouseY, {
    stiffness,
    damping,
    mass,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX + offsetX);
      mouseY.set(event.clientY + offsetY);

      setVisible(true);

      if (scaleOnMove) {
        setIsMoving(true);
        if (moveTimerRef.current) {
          clearTimeout(moveTimerRef.current);
        }
        moveTimerRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 120);
      }
    };

    const handleMouseLeave = () => {
      if (hideOnLeave) {
        setVisible(false);
        setIsMoving(false);
      }
    };

    const handleWindowBlur = () => {
      if (hideOnLeave) {
        setVisible(false);
        setIsMoving(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleWindowBlur);
      if (moveTimerRef.current) {
        clearTimeout(moveTimerRef.current);
      }
    };
  }, [offsetX, offsetY, hideOnLeave, scaleOnMove, mouseX, mouseY]);

  // Direct positioning for users with reduced motion preferences
  const x = shouldReduceMotion ? mouseX : springX;
  const y = shouldReduceMotion ? mouseY : springY;

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999]',
        'flex items-center justify-center rounded-full',
        'will-change-transform select-none',
        className
      )}
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: '-50%',
        translateY: '-50%',
        ...style,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: scaleOnMove && isMoving ? 1.15 : 1,
      }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { type: 'spring', stiffness: 350, damping: 22 },
      }}
      {...props}
    >
      {children || (
        <div className="relative flex h-full w-full items-center justify-center rounded-full border-1 border-text-primary/30 bg-text-primary/10">
          <div className="h-1 w-1 rounded-full bg-text-primary" />
        </div>
      )}
    </motion.div>
  );
};
