import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { VelocityToast } = DEMO_COMPONENTS;

export const ToastDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium cursor-pointer"
      >
        Show toast
      </button>
      <VelocityToast
        open={open}
        onDismiss={() => setOpen(false)}
        title="File uploaded"
        description="ready to share"
        duration={3500}
        position="bottom-center"
        variant="success"
      />
    </div>
  );
};

export default ToastDemo;
