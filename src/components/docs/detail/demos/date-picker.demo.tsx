import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { DatePicker, DateRangePicker } = DEMO_COMPONENTS;

export const DatePickerDemo: React.FC = () => (
  <div className="flex flex-col sm:flex-row min-h-[500px] sm:min-h-0 sm:h-[400px] w-full max-w-2xl items-center sm:items-start justify-start sm:justify-center self-start gap-4 sm:gap-6 pt-2 sm:pt-4">
    <DatePicker placeholder="Pick a date" className="w-72 max-w-full" />
    <DateRangePicker placeholder="Pick a range" className="w-72 max-w-full" />
  </div>
);

export default DatePickerDemo;
