import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { PackageBox } = DEMO_COMPONENTS;

export const PackageBoxDemoShowcase: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'cardboard' | 'cream' | 'dark'>('cardboard');

  const themeColors = {
    cardboard: undefined,
    cream: { box: '#c7a379', tape: '#e8dcbe', paper: '#fffdfa', ink: '#1f1d1a', accent: '#d9532f' },
    dark: { box: '#3b322a', tape: '#5e5246', paper: '#1f1e1c', ink: '#f2ece4', accent: '#e0683b' },
  }[themeMode];

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-2 sm:p-4 w-full max-w-xl mx-auto">
      {/* Mobile-first theme selector pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface-raised,rgba(0,0,0,0.04))] border border-[var(--border)] text-[11px]">
        {(['cardboard', 'cream', 'dark'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setThemeMode(mode)}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              themeMode === mode
                ? 'bg-[var(--text-primary)] text-[var(--bg)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <div className="w-full flex items-center justify-center overflow-hidden">
        <PackageBox
          key={themeMode}
          colors={themeColors}
          maxWidth={440}
        />
      </div>

      <p className="text-[11px] text-[var(--text-muted)] text-center px-2">
        Click or tap the box or button to unfold 3D flaps and reveal packing slip. Fully responsive on mobile.
      </p>
    </div>
  );
};

export default PackageBoxDemoShowcase;
