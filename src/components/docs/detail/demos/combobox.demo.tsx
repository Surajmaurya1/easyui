import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Combobox } = DEMO_COMPONENTS;
import { COMBOBOX_DEMO_OPTIONS } from '../demo-shared';

export const ComboboxDemo: React.FC = () => (
  <div className="flex h-[380px] w-full max-w-sm items-start justify-center pt-2">
    <Combobox options={COMBOBOX_DEMO_OPTIONS} defaultValue="next" placeholder="Framework" />
  </div>
);

export default ComboboxDemo;
