import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { MorphingBlob } = DEMO_COMPONENTS;

export const meta = { id: 'morphing-blob', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([MorphingBlob.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="flex items-center justify-center h-[400px] w-full">
          <MorphingBlob speed={10} baseRadius={180} points={18} />
        </div>
      );
}
