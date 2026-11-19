import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DirectionalTooltip } = DEMO_COMPONENTS;

export const meta = { id: 'directional-tooltip', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DirectionalTooltip.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-6">
          <DirectionalTooltip side="top" content="Save your changes">
            <button className="px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] text-[var(--text-primary)]">Save</button>
          </DirectionalTooltip>
          <div className="flex gap-6">
            <DirectionalTooltip side="left" content="Profile">
              <button className="px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] text-[var(--text-primary)]">←</button>
            </DirectionalTooltip>
            <DirectionalTooltip side="right" content="Settings">
              <button className="px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] text-[var(--text-primary)]">→</button>
            </DirectionalTooltip>
          </div>
        </div>
      );
}
