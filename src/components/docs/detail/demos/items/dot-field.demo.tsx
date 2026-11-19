import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DotField } = DEMO_COMPONENTS;

export const meta = { id: 'dot-field', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DotField.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[#1F1F1F] bg-[#0E0E0E]">
          <DotField dotRadius={1.2} dotSpacing={20} gradientFrom="#818cf8" gradientTo="#c084fc" className="w-full h-80 rounded-2xl" />
        </div>
      );
}
