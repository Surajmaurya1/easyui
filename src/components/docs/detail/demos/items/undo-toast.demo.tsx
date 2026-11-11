import { useState } from 'react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { UndoToast } = DEMO_COMPONENTS;

export const meta = { id: 'undo-toast', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([UndoToast.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
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
          <UndoToast
            key={demoKey}
            open={open}
            title="Project archived"
            description="5 seconds remaining to restore project"
            duration={5000}
            onDismiss={() => setOpen(false)}
          />
        </div>
      );
}
