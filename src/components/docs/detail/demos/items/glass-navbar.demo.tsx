import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { GlassNavbar } = DEMO_COMPONENTS;

export const meta = { id: 'glass-navbar', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([GlassNavbar.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full space-y-4">
          <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden">
            <div className="relative py-2">
              <GlassNavbar
                key={demoKey}
                variant="floating"
                sticky={false}
                items={[
                  { label: 'Platform', href: '#platform' },
                  { label: 'Components', href: '#components', badge: 'New' },
                  { label: 'Showcase', href: '#showcase' },
                  { label: 'Docs', href: '#docs' },
                ]}
                cta={
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors cursor-pointer"
                  >
                    Deploy Now
                  </button>
                }
              />
            </div>
          </div>
        </div>
      );
}
