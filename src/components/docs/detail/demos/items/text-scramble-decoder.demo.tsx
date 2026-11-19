import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { TextScrambleDecoder } = DEMO_COMPONENTS;

export const meta = { id: 'text-scramble-decoder', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([TextScrambleDecoder.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center gap-4">
          <TextScrambleDecoder key={demoKey} text="EASYUI.REGISTRY.SYNCED" trigger="manual" duration={1000} />
          <p className="text-xs text-[#6B6B6B]">Replay the controlled decode sequence.</p>
        </div>
      );
}
