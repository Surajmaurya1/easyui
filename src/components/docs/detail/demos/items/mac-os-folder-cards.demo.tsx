import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MacOSFolderCards } = DEMO_COMPONENTS;

export const meta = { id: 'mac-os-folder-cards', aliases: ['macos-folder-cards', 'velocity-aware-scroll-cards'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MacOSFolderCards.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-8 w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
          <MacOSFolderCards key={demoKey} />
        </div>
      );
}
