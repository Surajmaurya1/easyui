import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import type { DragConfirmActionType } from '../../../ui/DragToConfirm';
import type { DragConfirmSize } from '../../../ui/DragToConfirm';
import { DEMO_COMPONENTS } from '../demo-registry';
const { DragToConfirm } = DEMO_COMPONENTS;

export const DragToConfirmShowcase: React.FC = () => {
  const [actionType, setActionType] = useState<DragConfirmActionType>('delete');
  const [size, setSize] = useState<DragConfirmSize>('md');
  const [statusText, setStatusText] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const presets: Record<
    DragConfirmActionType,
    { label: string; confirmedLabel: string; title: string; desc: string }
  > = {
    delete: {
      title: 'Destructive Action',
      label: 'Slide to delete database →',
      confirmedLabel: 'Database Deleted ✓',
      desc: 'Protects critical databases with explicit drag confirmation',
    },
    confirm: {
      title: 'Deployment Release',
      label: 'Slide to confirm release →',
      confirmedLabel: 'Production Deployed ✓',
      desc: 'High-stakes multi-region deployments with spring tactile slider',
    },
    unlock: {
      title: 'Access Security',
      label: 'Slide to unlock vault →',
      confirmedLabel: 'Vault Unlocked ✓',
      desc: 'Safeguards privileged API credentials and hardware tokens',
    },
    archive: {
      title: 'Archive Project',
      label: 'Slide to archive project →',
      confirmedLabel: 'Project Archived ✓',
      desc: 'Bulk state transitions with elastic snapback resistance',
    },
    submit: {
      title: 'Transfer Funds',
      label: 'Slide to transfer funds →',
      confirmedLabel: 'Transfer Completed ✓',
      desc: 'Financial payments and irrevocable wire settlements',
    },
    continue: {
      title: 'Proceed Step',
      label: 'Slide to continue →',
      confirmedLabel: 'Step Completed ✓',
      desc: 'Multi-step provisioning wizards and deployment checks',
    },
  };

  const currentPreset = presets[actionType] || presets.delete;

  return (
    <div className="w-full max-w-lg mx-auto py-6 sm:py-8 space-y-5">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2 rounded-2xl bg-neutral-100/80 dark:bg-surface border border-neutral-200/80 dark:border-border text-xs">
        {/* Archetype selector */}
        <div className="flex items-center gap-1 overflow-x-auto p-0.5 max-w-full">
          {(['delete', 'confirm', 'unlock', 'archive', 'submit'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setActionType(type);
                setStatusText(null);
                setKey((k) => k + 1);
              }}
              className={cn(
                'px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer capitalize text-[11px]',
                actionType === type
                  ? 'bg-white dark:bg-surface-raised text-text-primary shadow-xs border border-neutral-200/80 dark:border-border'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Size selector */}
        <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-neutral-200/70 dark:border-border pt-1.5 sm:pt-0 sm:pl-2">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setKey((k) => k + 1);
              }}
              className={cn(
                'px-2 py-0.5 rounded-md font-mono transition-all cursor-pointer text-[10px] uppercase',
                size === s
                  ? 'bg-text-primary text-background font-semibold shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Drag Slider Interactive Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-border bg-white dark:bg-[#121214] shadow-xs flex flex-col items-center justify-center gap-4 min-h-[160px] transition-colors">
        <div className="w-full max-w-sm flex justify-center">
          <DragToConfirm
            key={`${actionType}-${size}-${key}`}
            actionType={actionType}
            size={size}
            label={currentPreset.label}
            confirmedLabel={currentPreset.confirmedLabel}
            onConfirm={() => {
              setStatusText(`Confirmed: ${currentPreset.title}`);
            }}
            onReset={() => {
              setStatusText(null);
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-text-muted pt-1">
          {statusText ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {statusText}
            </span>
          ) : (
            <span>Drag slider or press Enter / Space to trigger</span>
          )}
        </div>
      </div>

      {/* Reset & Status Bar */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1 font-mono">
        <span className="truncate pr-2">{currentPreset.desc}</span>
        <button
          type="button"
          onClick={() => {
            setStatusText(null);
            setKey((k) => k + 1);
          }}
          className="hover:text-text-primary underline underline-offset-2 transition-colors cursor-pointer shrink-0"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DragToConfirmShowcase;
