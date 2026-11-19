import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { GlyphMatrix } = DEMO_COMPONENTS;

export const GlyphMatrixShowcase: React.FC = () => {
  const [color, setColor] = useState('#00FF66');
  const [speed, setSpeed] = useState(1.2);
  const [isPaused, setIsPaused] = useState(false);

  const colors = [
    { name: 'Matrix Green', value: '#00FF66' },
    { name: 'Cyber Cyan', value: '#00E5FF' },
    { name: 'Neon Pink', value: '#FF007F' },
    { name: 'Amber Gold', value: '#FFB000' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-2xl border border-border bg-[#050505] shadow-2xl">
        <GlyphMatrix
          color={color}
          headColor="#FFFFFF"
          speed={speed}
          paused={isPaused}
          interactive={true}
          className="absolute inset-0 h-full w-full"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono drop-shadow-md">
              Wake up, Neo...
            </h3>
            <p className="text-xs sm:text-sm mt-3 font-mono px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-xs text-white/80">
              Interactive Canvas • Move cursor to scatter glyphs
            </p>
          </div>
        </GlyphMatrix>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-raised border border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono">Color:</span>
          {colors.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setColor(c.value)}
              className={cn(
                'w-6 h-6 rounded-full border-2 transition-transform',
                color === c.value ? 'scale-110 border-white ring-2 ring-white/20' : 'border-transparent opacity-70 hover:opacity-100'
              )}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-mono text-text-primary hover:bg-surface-hover transition-colors"
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-mono">Speed:</span>
            {[0.8, 1.2, 2.0].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-mono transition-colors',
                  speed === s ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlyphMatrixShowcase;
