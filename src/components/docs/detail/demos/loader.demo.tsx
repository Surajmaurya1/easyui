import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Loader } = DEMO_COMPONENTS;

export const LoaderShowcase: React.FC = () => {
  const [variant, setVariant] = useState<'arc' | 'dots' | 'line' | 'rings'>('arc');
  const [size, setSize] = useState(36);

  return (
    <div className="py-8 sm:py-12 flex flex-col items-center justify-center gap-6 max-w-full overflow-hidden">
      <div className="p-4 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-6 max-w-full shadow-md">
        <Loader variant={variant} size={size} />

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            {(['arc', 'dots', 'line', 'rings'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer',
                  variant === v ? 'bg-[#FAFAFA] text-[#050505] font-semibold shadow-xs' : 'text-[#8A8A8A] hover:text-white'
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B6B]">
            <span>Size:</span>
            {[24, 32, 40, 48].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  'px-2 py-0.5 rounded border transition-colors cursor-pointer',
                  size === s ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]' : 'border-[#1F1F1F] bg-[#141414] text-[#8A8A8A] hover:text-white'
                )}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-[#6B6B6B]">Calm, continuous motion indicators with zero visual stress</p>
    </div>
  );
};

export default LoaderShowcase;
