import React, { useState, useEffect } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { AnimatedNumber } = DEMO_COMPONENTS;

export const AnimatedNumberShowcase: React.FC = () => {
  const [revenue, setRevenue] = useState(12450);
  const [growth, setGrowth] = useState(24.5);
  const [isLiveTicker, setIsLiveTicker] = useState(false);

  useEffect(() => {
    if (!isLiveTicker) return;
    const interval = setInterval(() => {
      setRevenue((prev) => prev + Math.floor(Math.random() * 350) + 50);
      setGrowth((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.15)).toFixed(1)));
    }, 1800);
    return () => clearInterval(interval);
  }, [isLiveTicker]);

  return (
    <div className="py-6 w-full max-w-lg mx-auto space-y-4 select-none px-2">
      {/* Top Main Hero Metric */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] text-center space-y-3 shadow-xs">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6B6B]">Live Production ARR</span>
        <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-[#FAFAFA] flex items-center justify-center">
          <AnimatedNumber value={revenue} prefix="$" useGrouping />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
          <span>+</span>
          <AnimatedNumber value={growth} suffix="%" decimals={1} />
          <span className="text-[#6B6B6B]">annualized expansion</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-3.5 rounded-xl bg-[#141414] border border-[#1F1F1F] space-y-3">
        <div className="text-xs font-medium text-[#FAFAFA] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#6B6B6B]">Live Playground</span>
          <button
            type="button"
            onClick={() => setIsLiveTicker(!isLiveTicker)}
            className={cn(
              'px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors flex items-center gap-1.5 cursor-pointer',
              isLiveTicker
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[#0E0E0E] border-[#1F1F1F] text-[#A1A1A1] hover:text-white'
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', isLiveTicker ? 'bg-emerald-400 animate-pulse' : 'bg-[#6B6B6B]')} />
            {isLiveTicker ? 'Ticker Active' : 'Simulate Ticker'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRevenue((prev) => prev + 1000)}
            className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-mono text-[#FAFAFA] transition-colors text-center cursor-pointer"
          >
            +$1,000
          </button>
          <button
            type="button"
            onClick={() => setRevenue((prev) => Math.max(100, prev - 500))}
            className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-mono text-[#FAFAFA] transition-colors text-center cursor-pointer"
          >
            -$500
          </button>
          <button
            type="button"
            onClick={() => setRevenue(Math.floor(Math.random() * 88000) + 12000)}
            className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-mono text-[#FAFAFA] transition-colors text-center cursor-pointer"
          >
            Randomize
          </button>
          <button
            type="button"
            onClick={() => {
              setRevenue(12450);
              setGrowth(24.5);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-mono text-[#6B6B6B] hover:text-white transition-colors text-center cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedNumberShowcase;
