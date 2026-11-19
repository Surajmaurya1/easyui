import React, { useState, useEffect } from 'react';
import { cn } from '../../../../lib/utils';
import { useTheme } from '../../../../lib/theme/useTheme';
import type { ThinkingOrbState } from '../../../ui/ThinkingOrb';
import { DEMO_COMPONENTS } from '../demo-registry';
const { ThinkingOrb } = DEMO_COMPONENTS;

export const ThinkingOrbDemo: React.FC = () => {
  const { theme } = useTheme();
  const [orbState, setOrbState] = useState<ThinkingOrbState>('working');
  const [orbSize, setOrbSize] = useState<number>(80);
  const [orbSpeed, setOrbSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const states: ThinkingOrbState[] = [
    'working',
    'searching',
    'solving',
    'listening',
    'connecting',
    'weaving',
    'composing',
    'breathing',
    'shaping',
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6 select-none">
      {/* Visual Canvas Display */}
      <div className={cn(
        'w-full max-w-lg min-h-[260px] rounded-2xl border flex flex-col items-center justify-center p-8 transition-colors duration-300',
        isDark ? 'bg-[#070709] border-[#222227]' : 'bg-[#F4F4F6] border-[#E2E2E8]'
      )}>
        <ThinkingOrb
          state={orbState}
          size={orbSize}
          speed={orbSpeed}
          dark={isDark}
          paused={isPaused}
        />
        <div className="mt-6 flex items-center gap-2">
          <span className={cn(
            'text-[11px] font-mono px-3 py-1 rounded-md border tracking-wider',
            isDark
              ? 'bg-[#121216] border-[#27272F] text-neutral-300'
              : 'bg-white border-neutral-300 text-neutral-800'
          )}>
            state: <span className="font-bold text-text-primary">{orbState}</span> • {orbSize}px • {orbSpeed}x
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="w-full max-w-lg flex flex-col gap-3 p-4 rounded-xl bg-surface border border-border">
        {/* State Selector */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Cognitive State Preset</span>
          <div className="flex flex-wrap gap-1.5">
            {states.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setOrbState(s)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer',
                  orbState === s
                    ? 'bg-text-primary text-background font-semibold shadow-xs'
                    : 'bg-surface-raised border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders and Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border">
          {/* Size */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-muted uppercase">Size ({orbSize}px)</span>
            <div className="flex gap-1">
              {[40, 64, 80, 110].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setOrbSize(sz)}
                  className={cn(
                    'flex-1 py-1 text-[11px] rounded border transition-colors cursor-pointer',
                    orbSize === sz
                      ? 'bg-text-primary text-background font-bold border-text-primary'
                      : 'bg-surface-raised border-border text-text-secondary hover:text-text-primary'
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Speed */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-muted uppercase">Speed</span>
            <div className="flex gap-1">
              {[0.5, 1, 1.5, 2].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setOrbSpeed(sp)}
                  className={cn(
                    'flex-1 py-1 text-[11px] rounded border transition-colors cursor-pointer',
                    orbSpeed === sp
                      ? 'bg-text-primary text-background font-bold border-text-primary'
                      : 'bg-surface-raised border-border text-text-secondary hover:text-text-primary'
                  )}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-muted uppercase">Atmosphere</span>
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={cn(
                'w-full py-1 text-[11px] rounded border font-medium transition-colors cursor-pointer',
                isDark
                  ? 'bg-text-primary text-background font-semibold border-text-primary'
                  : 'bg-surface-raised text-text-primary border-border hover:border-border-hover'
              )}
            >
              {isDark ? 'Dark (White)' : 'Light (Dark)'}
            </button>
          </div>

          {/* Freeze */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-muted uppercase">Playback</span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={cn(
                'w-full py-1 text-[11px] rounded border font-medium transition-colors cursor-pointer',
                isPaused
                  ? 'bg-text-primary text-background font-semibold border-text-primary'
                  : 'bg-surface-raised text-text-primary border-border hover:border-border-hover'
              )}
            >
              {isPaused ? 'Paused' : 'Playing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingOrbDemo;
