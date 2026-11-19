import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { AIResponseLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'ai-response', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AIResponseLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return <AIResponseLiveShowcase />;
}
