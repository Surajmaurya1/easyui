import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { StretchSwitch } = DEMO_COMPONENTS;

export const meta = { id: 'stretch-switch', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StretchSwitch.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-4">
          <StretchSwitch defaultChecked label="Reduce motion" description="Disable spring animations" />
          <StretchSwitch label="Dark mode" description="Toggle dark theme" />
        </div>
      );
}
