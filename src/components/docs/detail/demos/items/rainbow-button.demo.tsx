import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { RainbowButtonLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'rainbow-button', aliases: ['rainbowbutton', 'chromatic-button'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([RainbowButtonLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <RainbowButtonLiveShowcase key={demoKey} />;
}
