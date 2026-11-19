import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { NotificationBell } = DEMO_COMPONENTS;

export const NotificationBellShowcase: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Edge worker deployed to global clusters.', timestamp: 'Just now', read: false },
    { id: '2', message: 'Memory consumption decreased by 14.8%.', timestamp: '12m ago', read: false },
    { id: '3', message: 'Database backup verified successfully.', timestamp: '1h ago', read: true },
  ]);

  const addNotification = () => {
    const newId = String(Date.now());
    setNotifications((prev) => [
      { id: newId, message: `New telemetry event emitted (#${newId.slice(-4)})`, timestamp: 'Just now', read: false },
      ...prev,
    ]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="py-8 sm:py-12 flex flex-col items-center justify-center gap-6 w-full px-2">
      <div className="p-4 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-6 shadow-md w-full max-w-sm relative">
        <NotificationBell
          notifications={notifications}
          onMarkAsRead={handleMarkRead}
          onMarkAllAsRead={handleMarkAllRead}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addNotification}
            className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-white transition-colors cursor-pointer"
          >
            + Trigger Alert (Shake Test)
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBellShowcase;
