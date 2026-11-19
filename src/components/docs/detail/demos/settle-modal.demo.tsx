import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SettleModal } = DEMO_COMPONENTS;

export const SettleModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium cursor-pointer"
      >
        Open modal
      </button>
      <SettleModal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm archive"
        description="This will archive the project and notify collaborators."
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium cursor-pointer"
            >
              Archive
            </button>
          </>
        }
      />
    </>
  );
};

export default SettleModalDemo;
