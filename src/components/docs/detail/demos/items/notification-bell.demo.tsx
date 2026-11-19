import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { NotificationBellShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'notification-bell', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.NotificationBellShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <NotificationBellShowcase key={demoKey} />;
}
