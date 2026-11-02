import React from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface ActionBarItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface ExpandableActionBarProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  items: ActionBarItem[];
  className?: string;
}

export const ExpandableActionBar: React.FC<ExpandableActionBarProps> = ({
  items,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : motionTransitions.springSnappy;

  function onActionClick(action: () => void) {
    setIsExpanded(false);
    action();
  }

  return (
    <motion.div
      layout
      role="toolbar"
      transition={transition}
      onHoverStart={() => {
        setIsExpanded(true);
      }}
      onHoverEnd={() => {
        setIsExpanded(false);
      }}
      // Keyboard users get the same expansion as hover users.
      onFocus={() => setIsExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsExpanded(false);
        }
      }}
      className={cn(
        'inline-flex items-center gap-2 p-2 rounded-xl border border-[#f1f1f1] bg-[#ffffff] dark:border-[#222222] dark:bg-[#0E0E0E]',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <motion.button
          key={item.label}
          layout
          type="button"
          onClick={() => onActionClick(item.onClick)}
          aria-label={item.label}
          transition={transition}
          className={cn(
            'flex items-center rounded-lg px-2.5 py-2 text-[#0E0E0E] dark:text-[#f1f1f1] cursor-pointer',
            'hover:bg-[#f2f2f2] dark:hover:bg-[#222222] transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5]/60 dark:focus-visible:ring-[#0E0E0E]/60'
          )}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            {item.icon}
          </span>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.span
                key="label"
                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                animate={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                transition={transition}
                className="overflow-hidden whitespace-nowrap text-xs font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ExpandableActionBar;