'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
  badge?: number;
  disabled?: boolean;
}

export interface SmallFloatingDockProps {
  /** Array of 3-5 action items. */
  items: DockItem[];
  /** Screen float anchor position. Default is 'bottom-right'. */
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  /** Sizing profile. Default is 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Automatically hide dock on downward scroll. Default is false. */
  hideOnScroll?: boolean;
  /** Presentation variant: icon only with tooltip or with visible label. Default is 'icon-only'. */
  variant?: 'icon-only' | 'icon-label';
  /** Optional active item identifier. */
  activeId?: string;
  /** Custom CSS class names. */
  className?: string;
}

export const SmallFloatingDock: React.FC<SmallFloatingDockProps> = ({
  items,
  position = 'bottom-right',
  size = 'md',
  hideOnScroll = false,
  variant = 'icon-only',
  activeId,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideOnScroll) return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll]);

  const sizeClasses = {
    sm: 'p-1.5 gap-1.5',
    md: 'p-2 gap-2',
    lg: 'p-2.5 gap-2.5',
  };

  const buttonSizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          role="navigation"
          aria-label="Quick Actions Dock"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isHovered ? 1 : 0.95,
          }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={motionTransitions.springSmooth}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveTooltip(null);
          }}
          className={cn(
            'fixed z-50 flex items-center rounded-full bg-[#0E0E0E]/90 backdrop-blur-xl border border-[#1F1F1F] shadow-[0_12px_40px_rgba(0,0,0,0.6)]',
            sizeClasses[size],
            positionClasses[position],
            className
          )}
        >
          {items.slice(0, 5).map((item) => {
            const isActive = activeId === item.id;
            return (
              <div key={item.id} className="relative flex items-center">
                <motion.button
                  type="button"
                  onClick={item.action}
                  disabled={item.disabled}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  onFocus={() => setActiveTooltip(item.id)}
                  onBlur={() => setActiveTooltip(null)}
                  onMouseEnter={() => setActiveTooltip(item.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={motionTransitions.springSnappy}
                  className={cn(
                    'relative flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer',
                    buttonSizeClasses[size],
                    item.disabled && 'opacity-40 cursor-not-allowed',
                    isActive
                      ? 'bg-[#FAFAFA] text-[#050505] font-semibold shadow-xs'
                      : 'bg-[#141414] text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#0E0E0E] border border-[#1F1F1F]'
                  )}
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    {item.icon}
                  </span>

                  {variant === 'icon-label' && (
                    <span className="ml-2 text-xs font-medium pr-1">{item.label}</span>
                  )}

                  {/* Notification badge */}
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-[#0E0E0E]"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.span>
                  )}
                </motion.button>

                {/* Floating tooltip */}
                {variant === 'icon-only' && activeTooltip === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: -36, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[#141414] border border-[#1F1F1F] text-[10px] font-medium text-[#FAFAFA] shadow-md pointer-events-none whitespace-nowrap z-20"
                  >
                    {item.label}
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
