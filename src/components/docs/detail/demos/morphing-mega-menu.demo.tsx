import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { MorphingMegaMenu } = DEMO_COMPONENTS;

export const MorphingMegaMenuDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-4 sm:gap-6 p-0 sm:p-4 w-full min-h-[460px]">
      <div className="w-full max-w-2xl py-2 sm:py-6 flex flex-col items-center">
        <MorphingMegaMenu />
        <p className="mt-80 sm:mt-28 text-xs text-[var(--text-muted)] text-center px-2">
          Hover over or click any trigger to open.
        </p>
      </div>
    </div>
  );
};

export default MorphingMegaMenuDemo;
