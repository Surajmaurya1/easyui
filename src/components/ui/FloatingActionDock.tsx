'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: boolean;
}

export interface FloatingActionDockProps {
  items: DockItem[];
  className?: string;
  activeId?: string;
}

function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: DockItem;
  mouseX: MotionValue;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={item.onClick}
      whileTap={{ scale: 0.88 }}
      transition={motionTransitions.springSnappy}
      className={cn(
        'group relative flex items-center justify-center rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] hover:bg-[#171717] transition-colors focus-ring cursor-pointer',
        isActive && 'border-[#4A4A4A] bg-[#171717]'
      )}
      aria-label={item.label}
    >
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] text-[11px] text-[#FAFAFA] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md z-20">
        {item.label}
      </div>

      {/* Icon */}
      <span className="text-[#525252] group-hover:text-[#FAFAFA] transition-colors [&>svg]:w-5 [&>svg]:h-5">
        {item.icon}
      </span>

      {/* Active Dot */}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FAFAFA]" />
      )}
    </motion.button>
  );
}

export const FloatingActionDock: React.FC<FloatingActionDockProps> = ({
  items,
  className,
  activeId,
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'inline-flex items-end gap-2.5 px-3 py-2.5 rounded-2xl bg-[#0E0E0E]/90 backdrop-blur-md border border-[#1F1F1F] shadow-[0_12px_32px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      {items.map((item) => (
        <DockIcon
          key={item.id}
          item={item}
          mouseX={mouseX}
          isActive={activeId === item.id}
        />
      ))}
    </motion.div>
  );
};
