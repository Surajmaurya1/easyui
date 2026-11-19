import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { TorqueDial } = DEMO_COMPONENTS;

export const TorqueDialShowcase: React.FC = () => {
  const [value, setValue] = useState(48);

  return (
    <div className="py-12 flex flex-col items-center justify-center gap-6">
      <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-4 shadow-md">
        <TorqueDial
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          unit="%"
          label="Master Output Gain"
        />
        <span className="text-xs text-[#6B6B6B]">Click and drag or use mouse wheel to rotate dial with physical momentum</span>
      </div>
    </div>
  );
};

export default TorqueDialShowcase;
