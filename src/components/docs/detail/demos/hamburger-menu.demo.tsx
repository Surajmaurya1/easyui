import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { HamburgerMenu } = DEMO_COMPONENTS;

export const HamburgerMenuShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-12 flex flex-col items-center justify-center gap-4">
      <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-4 shadow-md">
        <HamburgerMenu
          isOpen={isOpen}
          onChange={setIsOpen}
          size={28}
        />
        <span className="text-xs font-mono text-[#A1A1A1]">
          Click to morph ({isOpen ? 'Open (✕)' : 'Closed (☰)'})
        </span>
      </div>
    </div>
  );
};

export default HamburgerMenuShowcase;
