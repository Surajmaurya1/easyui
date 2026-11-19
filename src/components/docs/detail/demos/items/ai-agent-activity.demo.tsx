import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { AIAgentActivityLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'ai-agent-activity', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AIAgentActivityLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return <AIAgentActivityLiveShowcase />;
}
