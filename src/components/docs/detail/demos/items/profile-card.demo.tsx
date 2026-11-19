import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ProfileCard } = DEMO_COMPONENTS;

export const meta = { id: 'profile-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ProfileCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-md mx-auto">
          <ProfileCard
            key={demoKey}
            name="Suraj"
            username="@surajmaurya_m"
            description="Building EasyUI. Engineer."
            followers="200K"
            posts="72"
            website="easyui.site"
          />
        </div>
      );
}
