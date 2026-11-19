import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DynamicIsland } = DEMO_COMPONENTS;

export const meta = { id: 'dynamic-island', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DynamicIsland.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-4 min-h-[340px]">
          <DynamicIsland
            key={demoKey}
            name="Suraj Maurya"
            role="Frontend Developer"
            description="Building thoughtful interfaces with React, Next.js, and Framer Motion."
            statusText="Available for hire"
            metadata={[
              { label: 'Role', value: 'Lead Engineer' },
              { label: 'Location', value: 'Remote / Global' },
            ]}
            socials={{
              github: 'https://github.com/Surajmaurya1',
              x: 'https://x.com',
              linkedin: 'https://linkedin.com',
              instagram: 'https://instagram.com',
              email: 'mailto:suraj@example.com',
            }}
          />
        </div>
      );
}
