import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SpeedWarp } = DEMO_COMPONENTS;

export const SpeedWarpShowcase: React.FC = () => {
  const [speed, setSpeed] = useState(28);
  const [starCount, setStarCount] = useState(650);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-2xl border border-border bg-[#050505] shadow-2xl">
        <SpeedWarp
          speed={speed}
          starCount={starCount}
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Engage Warp Drive
          </h3>
          <p className="text-xs sm:text-sm mt-3 font-mono px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-xs text-white/80">
            3D Perspective Hyperspace Simulation • {starCount} Stars
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-raised border border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono">Warp Speed:</span>
          {[12, 28, 48, 70].map((s, idx) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-mono transition-colors',
                speed === s ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Warp {idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono">Star Density:</span>
          {[300, 650, 1000].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setStarCount(count)}
              className={cn(
                'px-2 py-0.5 rounded text-xs font-mono transition-colors',
                starCount === count ? 'bg-text-primary text-background' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeedWarpShowcase;
