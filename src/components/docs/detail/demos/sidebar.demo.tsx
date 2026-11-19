import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Sidebar, SidebarTrigger } = DEMO_COMPONENTS;
import { SIDEBAR_DEMO_SECTIONS } from '../demo-shared';

export const SidebarDemo: React.FC = () => {
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-[340px] w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0E0E10]">
      <Sidebar
        sections={SIDEBAR_DEMO_SECTIONS}
        activeId={active}
        onActiveChange={setActive}
        header={
          <div className="flex items-center gap-2.5">
            <div className="grid size-6 shrink-0 place-items-center rounded-md bg-neutral-900 text-xs font-semibold text-white dark:bg-white dark:text-neutral-900">
              e
            </div>
            <span className="text-sm font-medium">easyui</span>
          </div>
        }
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />
      <main className="flex flex-1 flex-col items-start gap-3 p-4">
        <SidebarTrigger onClick={() => setMobileOpen(true)} />
        <p className="text-xs text-text-muted">
          Press <kbd className="rounded border border-black/10 dark:border-white/15 px-1 text-[10px]">⌘B</kbd> to
          collapse — or shrink the window for the mobile drawer.
        </p>
      </main>
    </div>
  );
};

export default SidebarDemo;
