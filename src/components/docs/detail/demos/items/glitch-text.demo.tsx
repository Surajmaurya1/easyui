import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { GlitchTextLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'glitch-text', aliases: ['glitchtext', 'glitch-typography'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([GlitchTextLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <GlitchTextLiveShowcase key={demoKey} />;
}
