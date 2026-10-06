'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface Notification {
  id: string;
  message: string;
  timestamp: Date | string;
  read: boolean;
  action?: () => void;
}

export interface NotificationBellProps {
  /** List of notifications. */
  notifications: Notification[];
  /** Handler when an item is marked as read. */
  onMarkAsRead: (id: string) => void;
  /** Optional handler to mark all as read. */
  onMarkAllAsRead?: () => void;
  /** Controlled open state of notification drawer/panel. */
  isOpen?: boolean;
  /** Open state change handler. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Show numeric counter inside red badge. Default is true. */
  showCount?: boolean;
  /** Custom CSS class names. */
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  isOpen: controlledIsOpen,
  onOpenChange,
  showCount = true,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isPanelOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setPanelOpen = useCallback(
    (open: boolean) => {
      if (onOpenChange) onOpenChange(open);
      else setInternalIsOpen(open);
    },
    [onOpenChange]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;
  const prevCountRef = useRef(unreadCount);

  // Trigger subtle bell shake when new unread notifications arrive
  useEffect(() => {
    if (unreadCount > prevCountRef.current) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = unreadCount;
  }, [unreadCount]);

  // Click outside to close panel
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    if (isPanelOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isPanelOpen, setPanelOpen]);

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      {/* Bell Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setPanelOpen(!isPanelOpen)}
        animate={
          isShaking
            ? {
                rotate: [0, -12, 10, -8, 6, -2, 0],
              }
            : {}
        }
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isPanelOpen}
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notifications`
            : 'Notifications'
        }
        className={cn(
          'relative p-2.5 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer',
          isPanelOpen
            ? 'bg-[#141414] border-[#4A4A4A] text-[#FAFAFA]'
            : 'bg-[#0E0E0E] border-[#1F1F1F] text-[#525252] hover:text-[#FAFAFA] hover:border-[#4A4A4A]'
        )}
      >
        <Bell className="w-5 h-5" />

        {/* Unread Badge / Red Dot */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={motionTransitions.springSnappy}
              className={cn(
                'absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-rose-500 text-white font-mono font-bold border-2 border-[#0E0E0E]',
                showCount
                  ? 'min-w-[18px] h-[18px] px-1 text-[9px]'
                  : 'w-2.5 h-2.5'
              )}
            >
              {showCount && (unreadCount > 99 ? '99+' : unreadCount)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Notification Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={motionTransitions.springSnappy}
            className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-[calc(100vw-4rem)] max-w-[320px] sm:max-w-none sm:w-96 rounded-2xl bg-[#0E0E0E]/95 backdrop-blur-xl border border-[#1F1F1F] shadow-[0_16px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F1F1F] bg-[#141414]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#FAFAFA]">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && onMarkAllAsRead && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    className="p-1 rounded-lg text-[10px] text-[#525252] hover:text-white hover:bg-[#141414] transition-colors flex items-center gap-1 cursor-pointer"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Read all</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="p-1 rounded-lg text-[#525252] hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
                  aria-label="Close notifications"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-[#1F1F1F]">
              {notifications.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <Bell className="w-6 h-6 text-[#6B6B6B] mx-auto mb-2" />
                  <p className="text-xs text-[#6B6B6B]">No notifications right now</p>
                </div>
              ) : (
                notifications.map((item) => {
                  const dateString =
                    typeof item.timestamp === 'string'
                      ? item.timestamp
                      : item.timestamp.toLocaleDateString();

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        'p-3 flex items-start gap-3 transition-colors hover:bg-white/[0.02]',
                        !item.read && 'bg-[#141414]'
                      )}
                    >
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full mt-1.5 shrink-0',
                          item.read ? 'bg-transparent' : 'bg-rose-500 animate-pulse'
                        )}
                      />

                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs text-[#A1A1A1] leading-relaxed', !item.read && 'font-medium text-[#FAFAFA]')}>
                          {item.message}
                        </p>
                        <span className="text-[10px] font-mono text-[#6B6B6B] mt-1 block">
                          {dateString}
                        </span>
                      </div>

                      {!item.read && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(item.id)}
                          className="p-1 rounded text-[#525252] hover:text-white hover:bg-[#0E0E0E] transition-colors shrink-0 cursor-pointer"
                          title="Mark as read"
                          aria-label="Mark notification as read"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
