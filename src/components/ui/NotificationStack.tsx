'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
  time?: string;
}

export interface NotificationStackProps {
  initialNotifications?: NotificationItem[];
  className?: string;
  maxVisible?: number;
}

export const NotificationStack: React.FC<NotificationStackProps> = ({
  initialNotifications = [
    {
      id: '1',
      title: 'Deployment Successful',
      description: 'Production build v2.4.0 deployed to edge nodes.',
      type: 'success',
      time: 'Just now',
    },
    {
      id: '2',
      title: 'Component Synced',
      description: 'magnetic-button synced from EasyUI GitHub registry.',
      type: 'info',
      time: '2m ago',
    },
    {
      id: '3',
      title: 'API Limit Warning',
      description: '85% of monthly request quota utilized.',
      type: 'warning',
      time: '10m ago',
    },
  ],
  className,
  maxVisible = 3,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isExpanded, setIsExpanded] = useState(false);

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addSampleNotification = () => {
    const types: ('success' | 'info' | 'warning')[] = ['success', 'info', 'warning'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title: randomType === 'success' ? 'Cache Invalidation Done' : randomType === 'warning' ? 'High Memory Usage' : 'New Webhook Triggered',
      description: 'Triggered by automated pipeline workflow #841.',
      type: randomType,
      time: 'Just now',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const getIcon = (type?: 'success' | 'info' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-white" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-[#D4D4D4]" />;
      default:
        return <Info className="w-4 h-4 text-[#ECECEC]" />;
    }
  };

  return (
    <div className={cn('flex flex-col gap-3 max-w-sm w-full select-none', className)}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1A1]">
          <Bell className="w-3.5 h-3.5 text-[#525252]" />
          <span>Notifications ({notifications.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addSampleNotification}
            className="text-[11px] text-[#FAFAFA] hover:text-white font-medium transition-colors cursor-pointer"
          >
            + Simulate
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] text-[#6B6B6B] hover:text-[#A1A1A1] transition-colors cursor-pointer"
          >
            {isExpanded ? 'Stack' : 'Expand'}
          </button>
        </div>
      </div>

      <div className="relative min-h-[140px]">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] text-xs text-[#6B6B6B]"
            >
              No pending notifications
            </motion.div>
          ) : (
            notifications.slice(0, isExpanded ? notifications.length : maxVisible).map((item, index) => {
              const offset = index * 12;
              const scale = 1 - index * 0.04;
              const zIndex = notifications.length - index;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: isExpanded ? index * 74 : offset,
                    scale: isExpanded ? 1 : scale,
                    zIndex,
                  }}
                  exit={{ opacity: 0, x: 80, scale: 0.9 }}
                  transition={motionTransitions.springResponsive}
                  drag="x"
                  dragConstraints={{ left: 0, right: 100 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 60) {
                      dismiss(item.id);
                    }
                  }}
                  style={{
                    position: isExpanded ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                  className="rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 shadow-md cursor-grab active:cursor-grabbing hover:border-[#4A4A4A] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">{getIcon(item.type)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-[#FAFAFA]">{item.title}</h4>
                          <span className="text-[10px] text-[#6B6B6B]">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#A1A1A1] mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismiss(item.id)}
                      className="text-[#525252] hover:text-[#FAFAFA] p-0.5 rounded transition-colors cursor-pointer"
                      aria-label="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
