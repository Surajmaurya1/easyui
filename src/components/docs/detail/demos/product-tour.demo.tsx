import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { ProductTour } = DEMO_COMPONENTS;

export const ProductTourDemoShowcase: React.FC = () => {
  const [open, setOpen] = useState(false);

  const steps = [
    { title: "Welcome aboard", body: "A quick tour of the essentials. Tap Next to move around (← → and Esc work too)." },
    { target: '[data-tour="stage-search"]', title: "Search anything", body: "Jump to any project, person or setting from one place.", placement: "bottom" as const },
    { target: '[data-tour="stage-new"]', title: "Start something new", body: "Projects live here. Create your first one in a click.", placement: "left" as const },
    { target: '[data-tour="stage-stats"]', title: "Numbers at a glance", body: "Revenue, active users and churn update in real time.", placement: "bottom" as const },
    { target: '[data-tour="stage-activity"]', title: "Stay in the loop", body: "Everything your team does lands in this live feed.", placement: "top" as const },
  ];

  const cardStyle = "rounded-2xl border border-[var(--border)] bg-card p-3 sm:p-4";

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 p-2 sm:p-4">
      <header className="flex items-center gap-2">
        <div
          data-tour="stage-search"
          className="flex h-9 flex-1 min-w-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-card px-3 text-xs text-[var(--text-muted)]"
        >
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
          <span className="hidden sm:inline truncate">Search projects…</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-9 rounded-xl border border-[var(--border)] bg-card px-3 sm:px-3.5 text-xs font-medium text-[var(--text-primary)] shadow-2xs hover:bg-[var(--accent)] transition cursor-pointer whitespace-nowrap"
          >
            Start tour
          </button>
          <button
            type="button"
            data-tour="stage-new"
            className="h-9 rounded-xl bg-[var(--text-primary)] px-3 sm:px-3.5 text-xs font-medium text-[var(--bg)] shadow-2xs cursor-pointer whitespace-nowrap"
          >
            + New project
          </button>
        </div>
      </header>

      <div data-tour="stage-stats" className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "Revenue", val: "$48.2k" },
          { label: "Active users", val: "2,841" },
          { label: "Growth", val: "+24.8%" },
        ].map((item) => (
          <div key={item.label} className={cardStyle}>
            <p className="text-[11px] text-[var(--text-muted)]">{item.label}</p>
            <p className="mt-0.5 text-base sm:text-lg font-semibold tabular-nums text-[var(--text-primary)]">
              {item.val}
            </p>
          </div>
        ))}
      </div>

      <div data-tour="stage-activity" className={`${cardStyle} min-h-24`}>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--text-primary)]">Recent Activity</p>
          <span className="text-[10px] text-emerald-500 font-medium">● Live</span>
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Deployed release v2.4.0 to production · 2 minutes ago
        </p>
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center px-2">
        Click &quot;Start tour&quot; to launch the spotlight walkthrough with spring physics and responsive card docking.
      </p>

      <ProductTour open={open} steps={steps} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ProductTourDemoShowcase;
