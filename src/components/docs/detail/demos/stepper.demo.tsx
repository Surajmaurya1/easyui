import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Stepper, StepPanels } = DEMO_COMPONENTS;

export const StepperDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const steps = [
    { title: 'Account', description: 'Personal info' },
    { title: 'Workspace', description: 'Name project' },
    { title: 'Invite', description: 'Add team' },
    { title: 'Launch', description: 'Done' },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-xl">
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>Orientation:</span>
        <button
          type="button"
          onClick={() => setOrientation('horizontal')}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition',
            orientation === 'horizontal'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          Horizontal
        </button>
        <button
          type="button"
          onClick={() => setOrientation('vertical')}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition',
            orientation === 'vertical'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          Vertical
        </button>
      </div>

      <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xs space-y-6">
        <Stepper
          steps={steps}
          current={step}
          onStepChange={setStep}
          orientation={orientation}
        />

        <div className="rounded-xl border border-[var(--border)] bg-neutral-50/50 dark:bg-neutral-900/50 p-6 min-h-[140px] flex items-center justify-center text-center">
          <StepPanels current={step} className="w-full">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Step 1: Your Account</h4>
              <p className="text-xs text-[var(--text-muted)]">Configure your profile details and preferences.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Step 2: Workspace Setup</h4>
              <p className="text-xs text-[var(--text-muted)]">Name your workspace and pick a region.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Step 3: Invite Team Members</h4>
              <p className="text-xs text-[var(--text-muted)]">Send email invitations to colleagues (optional).</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">All Done!</h4>
              <p className="text-xs text-[var(--text-muted)]">Your workspace is ready to go.</p>
            </div>
          </StepPanels>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="h-8 px-4 rounded-lg border border-[var(--border)] text-xs font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Back
          </button>
          <button
            type="button"
            disabled={step === steps.length - 1}
            onClick={() => setStep((s) => s + 1)}
            className="h-8 px-4 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition hover:opacity-90"
          >
            {step === steps.length - 2 ? 'Finish' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperDemo;
