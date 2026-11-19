import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { CarSmokePageTransition } = DEMO_COMPONENTS;

export const CarSmokePageTransitionShowcase: React.FC = () => {
  const [direction, setDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');
  const [smokeDensity, setSmokeDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [carSize, setCarSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [status, setStatus] = useState<string | null>(null);

  const handleComplete = () => {
    setStatus('Transition completed');
    setTimeout(() => setStatus(null), 2500);
  };

  return (
    <div className="py-12 sm:py-16 flex flex-col items-center justify-center gap-8 w-full select-none px-4">
      {/* Central Interactive Trigger */}
      <div className="flex flex-col items-center gap-3">
        <CarSmokePageTransition
          direction={direction}
          smokeDensity={smokeDensity}
          carSize={carSize}
          onTransitionComplete={handleComplete}
        >
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-text-primary text-background font-medium text-xs sm:text-sm tracking-tight hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Launch Transition</span>
            <span className="font-mono text-xs opacity-60">→</span>
          </button>
        </CarSmokePageTransition>

        <span className="text-xs font-mono text-text-muted transition-opacity duration-200">
          {status ? (
            <span className="text-emerald-400">✓ {status}</span>
          ) : (
            'Click to trigger Ferrari drift & smoke transition'
          )}
        </span>
      </div>

      {/* Minimal EasyUI Inline Segmented Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-1.5 rounded-2xl bg-surface-raised border border-border text-xs font-mono">
        {/* Direction Toggle */}
        <div className="flex items-center p-0.5 rounded-xl bg-surface border border-border">
          {(['left-to-right', 'right-to-left'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setDirection(dir)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer',
                direction === dir
                  ? 'bg-text-primary text-background font-semibold shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {dir === 'left-to-right' ? 'LTR' : 'RTL'}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-border hidden sm:block" />

        {/* Smoke Density */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-text-muted uppercase px-1">Smoke</span>
          <div className="flex items-center p-0.5 rounded-xl bg-surface border border-border">
            {(['low', 'medium', 'high'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSmokeDensity(d)}
                className={cn(
                  'px-2 py-1 rounded-lg text-[11px] capitalize transition-colors cursor-pointer',
                  smokeDensity === d
                    ? 'bg-text-primary text-background font-semibold shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-border hidden sm:block" />

        {/* Scale */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-text-muted uppercase px-1">Size</span>
          <div className="flex items-center p-0.5 rounded-xl bg-surface border border-border">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setCarSize(s)}
                className={cn(
                  'px-2 py-1 rounded-lg text-[11px] uppercase transition-colors cursor-pointer',
                  carSize === s
                    ? 'bg-text-primary text-background font-semibold shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSmokePageTransitionShowcase;
