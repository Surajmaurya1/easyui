import React from 'react';

export const PreviewSkeleton: React.FC = () => {
  return (
    <div
      data-testid="preview-skeleton"
      className="h-52 w-full flex flex-col items-center justify-center p-4 select-none animate-pulse"
      aria-label="Loading component preview..."
      role="status"
    >
      <div className="w-full max-w-[220px] flex flex-col items-center gap-2.5">
        <div className="w-16 h-16 rounded-xl bg-surface-hover/80 border border-border/50 dark:bg-white/5 dark:border-white/10" />
        <div className="h-2 w-24 rounded bg-surface-hover/60 dark:bg-white/5" />
        <div className="h-1.5 w-16 rounded bg-surface-hover/40 dark:bg-white/5" />
      </div>
    </div>
  );
};
