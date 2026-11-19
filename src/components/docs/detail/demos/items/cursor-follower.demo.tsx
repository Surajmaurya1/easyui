import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { CursorFollower } = DEMO_COMPONENTS;

export const meta = { id: 'cursor-follower', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([CursorFollower.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-6">
          <CursorFollower />
          <div className="max-w-md w-full p-8 rounded-2xl bg-surface border border-border text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border text-xs text-text-secondary font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Spring Tracked (stiffness: 450, damping: 32)</span>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Interactive Follower Stage</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Move your pointer across this page to experience fluid spring-damped momentum and velocity scaling.
            </p>
          </div>
        </div>
      );
}
