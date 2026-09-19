'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

// -----------------------------------------------------------------------------
// Motion
// -----------------------------------------------------------------------------

const springSnappy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type SplitButtonSize = 'sm' | 'md' | 'lg';

export interface SplitButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface SplitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Label for the primary (left) action. */
  label: string;

  /** Called when the primary action is pressed. */
  onClick?: () => void;

  /** Dropdown options revealed by the chevron trigger. */
  options: SplitButtonOption[];

  size?: SplitButtonSize;

  /**
   * `primary` matches the light accent CTA.
   * `secondary` matches the raised control style.
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'info';

  disabled?: boolean;
  className?: string;
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const SIZE_STYLES: Record<
  SplitButtonSize,
  {
    primary: string;
    chevron: string;
    radius: string;
    menuText: string;
  }
> = {
  sm: {
    primary: 'gap-1.5 px-3.5 py-1.5 text-xs',
    chevron: 'px-2 py-1.5',
    radius: 'rounded-[8px]',
    menuText: 'text-xs',
  },

  md: {
    primary: 'gap-2 px-5 py-2.5 text-sm',
    chevron: 'px-2.5 py-2.5',
    radius: 'rounded-[8px]',
    menuText: 'text-sm',
  },

  lg: {
    primary: 'gap-2.5 px-7 py-3.5 text-base',
    chevron: 'px-3 py-3.5',
    radius: 'rounded-[10px]',
    menuText: 'text-sm',
  },
};

const TRANSITION =
  'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:translate-y-0 active:scale-[0.98]';

const VARIANT_STYLES: Record<'primary' | 'secondary' | 'danger' | 'info', string> = {
  primary:
    // light: dark pill on a light canvas · dark: light pill on a dark canvas (mirrors your existing button)
    'bg-[#151515] text-[#F5F5F5] hover:bg-black ' +
    'dark:bg-[#F5F5F5] dark:text-[#050505] dark:hover:bg-white ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] ' +
    'dark:shadow-[0_0_20px_-3px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_28px_-4px_rgba(255,255,255,0.28)] ' +
    TRANSITION,

  secondary:
    'border border-[#E3E3E8] bg-[#F4F4F9] text-[#151515] hover:border-[#D2D2D8] hover:bg-[#ECECF2] ' +
    'dark:border-border dark:bg-surface-raised dark:text-text-primary ' +
    'dark:hover:border-border-hover dark:hover:bg-surface-hover ' +
    'shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.15)] ' +
    'dark:shadow-none dark:hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] ' +
    TRANSITION,

  danger:
    'bg-[#DC2626] text-white hover:bg-[#E23F3F] ' +
    'dark:bg-[#DC2626]/90 dark:hover:bg-[#EF4444] ' +
    'shadow-[0_0_0_1px_rgba(220,38,38,0.15)] hover:shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] ' +
    'dark:shadow-[0_0_18px_-4px_rgba(220,38,38,0.35)] dark:hover:shadow-[0_0_26px_-6px_rgba(220,38,38,0.5)] ' +
    TRANSITION,

  info:
    'bg-[#3B82F6] text-white hover:bg-[#529BF8] ' +
    'dark:bg-[#3B82F6]/90 dark:hover:bg-[#60A5FA] ' +
    'shadow-[0_0_0_1px_rgba(59,130,246,0.15)] hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.4)] ' +
    'dark:shadow-[0_0_18px_-4px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_0_26px_-6px_rgba(59,130,246,0.5)] ' +
    TRANSITION,
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * SplitButton
 *
 * A primary action fused with a secondary chevron trigger.
 *
 * Features:
 * - Primary + dropdown action split
 * - Keyboard accessible menu navigation
 * - Outside-click dismissal
 * - Escape-to-close
 * - Home / End navigation
 * - Viewport-aware dropdown placement
 * - Reduced-motion support
 * - Disabled options
 * - Framer Motion transitions
 */
export function SplitButton({
  label,
  onClick,
  options,
  size = 'md',
  variant = 'primary',
  disabled = false,
  className,
  ...props
}: SplitButtonProps) {
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const sizeStyles = SIZE_STYLES[size];

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  const enabledIndices = options.reduce<number[]>((indices, option, index) => {
    if (!option.disabled) {
      indices.push(index);
    }

    return indices;
  }, []);

  const menuTransition = reduceMotion
    ? { duration: 0 }
    : springSnappy;

  // ---------------------------------------------------------------------------
  // Menu helpers
  // ---------------------------------------------------------------------------

  const closeMenu = useCallback(() => {
    setOpen(false);
    chevronRef.current?.focus();
  }, []);

  const selectOption = useCallback(
    (option: SplitButtonOption) => {
      if (option.disabled) {
        return;
      }

      option.onSelect?.();
      closeMenu();
    },
    [closeMenu],
  );

  // ---------------------------------------------------------------------------
  // Outside click
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  // ---------------------------------------------------------------------------
  // Viewport-aware placement
  // ---------------------------------------------------------------------------

  useLayoutEffect(() => {
    if (!open || !chevronRef.current) {
      return;
    }

    const triggerRect = chevronRef.current.getBoundingClientRect();

    // Approximate menu height:
    // option height + menu vertical padding.
    const estimatedMenuHeight = options.length * 36 + 16;

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const shouldFlip =
      spaceBelow < estimatedMenuHeight &&
      spaceAbove > estimatedMenuHeight;

    setPlacement(shouldFlip ? 'top' : 'bottom');
  }, [open, options.length]);

  // ---------------------------------------------------------------------------
  // Reset active option when opening
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!open) {
      return;
    }

    setActiveIndex(enabledIndices[0] ?? 0);
  }, [open, enabledIndices]);

  // ---------------------------------------------------------------------------
  // Focus menu when opened
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!open) {
      return;
    }

    requestAnimationFrame(() => {
      menuRef.current?.focus();
    });
  }, [open]);

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!enabledIndices.length) {
        if (event.key === 'Escape' || event.key === 'Tab') {
          event.preventDefault();

          if (event.key === 'Escape') {
            closeMenu();
          } else {
            setOpen(false);
          }
        }

        return;
      }

      const currentPosition = enabledIndices.indexOf(activeIndex);

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();

          const nextPosition =
            currentPosition < 0
              ? 0
              : (currentPosition + 1) % enabledIndices.length;

          setActiveIndex(enabledIndices[nextPosition]);
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();

          const previousPosition =
            currentPosition < 0
              ? enabledIndices.length - 1
              : (currentPosition - 1 + enabledIndices.length) %
                enabledIndices.length;

          setActiveIndex(enabledIndices[previousPosition]);
          break;
        }

        case 'Home': {
          event.preventDefault();
          setActiveIndex(enabledIndices[0]);
          break;
        }

        case 'End': {
          event.preventDefault();
          setActiveIndex(enabledIndices[enabledIndices.length - 1]);
          break;
        }

        case 'Enter':
        case ' ': {
          event.preventDefault();

          const activeOption = options[activeIndex];

          if (activeOption) {
            selectOption(activeOption);
          }

          break;
        }

        case 'Escape': {
          event.preventDefault();
          closeMenu();
          break;
        }

        case 'Tab': {
          setOpen(false);
          break;
        }

        default:
          break;
      }
    },
    [
      activeIndex,
      closeMenu,
      enabledIndices,
      options,
      selectOption,
    ],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={rootRef}
      className={cn('relative inline-flex', className)}
    >
      {/* ---------------------------------------------------------------------
          Button group
      --------------------------------------------------------------------- */}

      <div
        className={cn(
          'inline-flex overflow-hidden',
          sizeStyles.radius,
          disabled && 'pointer-events-none opacity-30',
        )}
      >
        {/* -------------------------------------------------------------------
            Primary action
        ------------------------------------------------------------------- */}

        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'relative inline-flex items-center justify-center',
            'select-none font-medium',
            'cursor-pointer',
            'focus-ring',
            'transition-colors duration-200',
            'disabled:cursor-not-allowed',
            sizeStyles.primary,
            VARIANT_STYLES[variant],
          )}
          {...props}
        >
          {label}
        </button>

        {/* -------------------------------------------------------------------
            Divider
        ------------------------------------------------------------------- */}

        <span
          aria-hidden="true"
          className={cn(
            'my-1.5 w-px self-stretch',
            variant === 'primary'
              ? 'bg-black/10'
              : 'bg-border',
          )}
        />

        {/* -------------------------------------------------------------------
            Dropdown trigger
        ------------------------------------------------------------------- */}

        <button
          ref={chevronRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`More ${label} options`}
          disabled={disabled}
          onClick={() => setOpen((previous) => !previous)}
          className={cn(
            'relative inline-flex items-center justify-center',
            'select-none',
            'cursor-pointer',
            'focus-ring',
            'transition-colors duration-200',
            'disabled:cursor-not-allowed',
            sizeStyles.chevron,
            VARIANT_STYLES[variant],
          )}
        >
          <motion.span
            aria-hidden="true"
            animate={{
              rotate: open ? 180 : 0,
            }}
            transition={menuTransition}
            className="flex items-center justify-center"
          >
            <ChevronDown
              className="h-4 w-4"
              strokeWidth={2}
            />
          </motion.span>
        </button>
      </div>

      {/* -----------------------------------------------------------------------
          Dropdown menu
      ----------------------------------------------------------------------- */}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label={`${label} options`}
            tabIndex={-1}
            onKeyDown={handleMenuKeyDown}
            initial={{
              opacity: 0,
              scale: 0.96,
              y: placement === 'bottom' ? -4 : 4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.12 },
            }}
            transition={menuTransition}
            className={cn(
              'absolute right-0 z-30',
              'min-w-[10rem]',
              'rounded-xl',
              'border border-border',
              'bg-surface-raised',
              'p-1',
              'shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)]',
              'origin-top-right',
              placement === 'bottom'
                ? 'top-[calc(100%+8px)]'
                : 'bottom-[calc(100%+8px)]',
            )}
          >
            {options.map((option, index) => {
              const isActive =
                index === activeIndex && !option.disabled;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  disabled={option.disabled}
                  aria-disabled={
                    option.disabled || undefined
                  }
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => {
                    if (!option.disabled) {
                      setActiveIndex(index);
                    }
                  }}
                  className={cn(
                    'flex w-full items-center gap-2',
                    'rounded-lg',
                    'px-3 py-2',
                    'text-left',
                    'font-medium',
                    'select-none',
                    'transition-colors duration-150',
                    sizeStyles.menuText,

                    option.disabled
                      ? [
                          'cursor-not-allowed',
                          'text-text-muted',
                        ]
                      : [
                          'cursor-pointer',
                          'text-text-secondary',
                          'hover:bg-surface-hover',
                          'hover:text-text-primary',
                        ],

                    isActive && [
                      'bg-surface-hover',
                      'text-text-primary',
                    ],
                  )}
                >
                  {option.icon && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex shrink-0 items-center justify-center',
                        '[&_svg]:h-3.5',
                        '[&_svg]:w-3.5',
                      )}
                    >
                      {option.icon}
                    </span>
                  )}

                  <span className="min-w-0 truncate">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SplitButton;