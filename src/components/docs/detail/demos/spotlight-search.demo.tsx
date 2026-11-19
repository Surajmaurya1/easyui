import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SpotlightSearch } = DEMO_COMPONENTS;

export const SpotlightSearchShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-8 w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2.5 rounded-xl bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] text-xs font-mono text-[#FAFAFA] flex items-center gap-3 transition-colors hover:border-[#4A4A4A] shadow-md cursor-pointer"
      >
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] text-white">⌘K</kbd>
        <span>or click to open Spotlight Search</span>
      </button>
      <p className="text-xs text-[#6B6B6B] font-mono">Keyboard-driven overlay with instant fuzzy filter and smooth spring highlight</p>
      <SpotlightSearch
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
};

export default SpotlightSearchShowcase;
