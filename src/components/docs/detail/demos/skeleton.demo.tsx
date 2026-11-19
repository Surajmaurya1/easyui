import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Skeleton, SkeletonText, SkeletonAvatar, SkeletonReveal } = DEMO_COMPONENTS;

export const SkeletonDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-md">
      <button
        type="button"
        onClick={() => setLoading((l) => !l)}
        className="h-8 px-4 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium cursor-pointer transition hover:opacity-90"
      >
        {loading ? 'Show real content (un-blur & rise)' : 'Simulate loading skeleton'}
      </button>

      <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 shadow-xs">
        <SkeletonReveal
          loading={loading}
          skeleton={
            <div className="flex items-center gap-3">
              <SkeletonAvatar size={48} />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <SkeletonText lines={2} />
              </div>
            </div>
          }
        >
          <div className="flex items-center gap-3">
            <div className="size-12 shrink-0 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
              EU
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">EasyUI Studio</h4>
              <p className="text-xs text-[var(--text-muted)]">Lead Design Engineer &bull; Batch 2</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Loaded state with gentle un-blur</p>
            </div>
          </div>
        </SkeletonReveal>
      </div>
    </div>
  );
};

export default SkeletonDemo;
