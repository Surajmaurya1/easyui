import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Calendar } = DEMO_COMPONENTS;

export const CalendarDemo: React.FC = () => (
  <div className="w-fit rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] shadow-xs overflow-hidden">
    <Calendar />
  </div>
);

export default CalendarDemo;
