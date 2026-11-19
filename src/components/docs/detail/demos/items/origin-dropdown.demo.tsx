import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { OriginDropdown } = DEMO_COMPONENTS;

export const meta = { id: 'origin-dropdown', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([OriginDropdown.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-4">
          <OriginDropdown
            side="bottom"
            items={[
              { id: 'p', label: 'Profile', description: 'Manage account' },
              { id: 's', label: 'Settings', description: 'App preferences' },
              { id: 'o', label: 'Sign out', destructive: true },
            ]}
          />
          <OriginDropdown
            side="top"
            placeholder="Origin top"
            items={[{ id: 'a', label: 'Above trigger' }]}
          />
        </div>
      );
}
