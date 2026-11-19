import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { ChatLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'chat', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ChatLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return <ChatLiveShowcase />;
}
