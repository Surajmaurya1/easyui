import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface OrbitalMenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface OrbitalMenuProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  items: OrbitalMenuItem[];
  /** Icon inside the center button. Defaults to a plus that turns into a close mark. */
  triggerIcon?: React.ReactNode;
  /** Distance from the center button to each item, in px. */
  radius?: number;
  /** Diameter of the center button, in px. */
  triggerSize?: number;
  /** Diameter of each item, in px. */
  itemSize?: number;
  /** Angle of the first item in degrees. -90 is straight up. */
  startAngle?: number;
  /** Total arc the items spread across. 360 is a full circle. */
  sweep?: number;
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const SWIRL_DEGREES = 120;

// Light is the default; dark: variants switch with Tailwind's dark mode (class or media).
const surface = 'bg-white dark:bg-[#0E0E0E]';
const border = 'border-[#E4E4E7] dark:border-[#222222]';
const text = 'text-[#0E0E0E] dark:text-[#F5F5F5]';
const itemHover = 'hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1A]';
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E0E0E]/50 dark:focus-visible:ring-[#F5F5F5]/60';

export const OrbitalMenu: React.FC<OrbitalMenuProps> = ({
  items,
  triggerIcon,
  radius = 88,
  triggerSize = 56,
  itemSize = 44,
  startAngle = -90,
  sweep = 360,
  defaultOpen = false,
  closeOnSelect = true,
  onOpenChange,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : motionTransitions.springSnappy;

  const setOpen = React.useCallback(
    (next: boolean) => {
      setIsOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  // Close on outside press or Escape while open.
  React.useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setOpen]);

  // A full circle spreads items evenly without overlapping the first and last.
  // A partial arc puts the first and last items on the arc's two ends.
  const isFullCircle = Math.abs(sweep) >= 360;
  const step =
    items.length > 1
      ? isFullCircle
        ? sweep / items.length
        : sweep / (items.length - 1)
      : 0;

  const size = radius * 2 + itemSize;

  return (
    <motion.div
      ref={rootRef}
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      {/* The trigger's own surface. Closed, it is the circle button; open, it
          expands into the orbit that the items sit on. Opacity (not a color
          value) is animated so the fill follows the active theme. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          aria-hidden="true"
          className={cn('rounded-full border', surface, border)}
          initial={false}
          animate={{
            width: isOpen ? radius * 2 : triggerSize,
            height: isOpen ? radius * 2 : triggerSize,
            opacity: isOpen ? 0.65 : 1,
          }}
          transition={transition}
        />
      </div>

      {/* Items. The group swirls into place and each item counter-rotates to stay upright. */}
      <motion.div
        role="menu"
        id={menuId}
        aria-label="Menu"
        className="absolute inset-0"
        initial={false}
        animate={{ rotate: isOpen ? 0 : -SWIRL_DEGREES }}
        transition={transition}
      >
        {items.map((item, i) => {
          const angle = ((startAngle + step * i) * Math.PI) / 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.button
              key={item.label}
              type="button"
              role="menuitem"
              aria-label={item.label}
              aria-hidden={!isOpen}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                item.onClick();
                if (closeOnSelect) {
                  setOpen(false);
                  triggerRef.current?.focus();
                }
              }}
              className={cn(
                'group absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border',
                'transition-colors',
                surface,
                border,
                text,
                itemHover,
                focusRing,
                !isOpen && 'pointer-events-none'
              )}
              style={{
                width: itemSize,
                height: itemSize,
                marginLeft: -itemSize / 2,
                marginTop: -itemSize / 2,
              }}
              initial={false}
              animate={{
                x: isOpen ? x : 0,
                y: isOpen ? y : 0,
                rotate: isOpen ? 0 : SWIRL_DEGREES,
                scale: isOpen ? 1 : 0.4,
                opacity: isOpen ? 1 : 0,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { ...motionTransitions.springSnappy, delay: isOpen ? 0.08 + i * 0.03 : 0 }
              }
            >
              <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>
              <span
                className={cn(
                  'pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-md border px-2 py-1 text-xs',
                  'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
                  surface,
                  border,
                  text
                )}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Center trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!isOpen)}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        className={cn(
          'absolute left-1/2 top-1/2 z-10 flex items-center justify-center rounded-full bg-transparent',
          'transition-colors hover:bg-black/5 dark:hover:bg-white/5',
          text,
          focusRing
        )}
        style={{
          width: triggerSize,
          height: triggerSize,
          marginLeft: -triggerSize / 2,
          marginTop: -triggerSize / 2,
        }}
      >
        <motion.span
          className="flex h-5 w-5 items-center justify-center"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={transition}
        >
          {triggerIcon ?? (
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              <path
                d="M10 4v12M4 10h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default OrbitalMenu;