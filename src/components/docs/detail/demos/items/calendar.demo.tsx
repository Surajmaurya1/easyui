import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { CalendarDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'calendar', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.CalendarDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <CalendarDemo key={demoKey} />;
}
