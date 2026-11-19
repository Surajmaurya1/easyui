import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { AvatarStack } = DEMO_COMPONENTS;
import { AVATAR_STACK_DEMO_ITEMS } from '../demo-shared';

export const AvatarStackShowcase: React.FC = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [overlap, setOverlap] = useState<'sm' | 'md' | 'lg'>('md');
  const [max, setMax] = useState<number>(5);

  return (
    <div className="py-10 flex flex-col items-center justify-center gap-8 w-full max-w-lg mx-auto">
      <div className="p-8 rounded-2xl bg-surface-raised/60 border border-border flex items-center justify-center min-h-[140px] w-full shadow-inner">
        <AvatarStack
          avatars={AVATAR_STACK_DEMO_ITEMS}
          size={size}
          overlap={overlap}
          max={max}
          showTooltip={true}
          showCount={true}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 bg-surface-raised border border-border p-1 rounded-xl">
          <span className="px-2 font-mono text-[10px] text-text-muted">Size:</span>
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-medium transition-colors',
                size === s ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-surface-raised border border-border p-1 rounded-xl">
          <span className="px-2 font-mono text-[10px] text-text-muted">Overlap:</span>
          {(['sm', 'md', 'lg'] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOverlap(o)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-medium transition-colors',
                overlap === o ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {o.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-surface-raised border border-border p-1 rounded-xl">
          <span className="px-2 font-mono text-[10px] text-text-muted">Max:</span>
          {[3, 4, 5, 6].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMax(m)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-medium transition-colors',
                max === m ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarStackShowcase;
