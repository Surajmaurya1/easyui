import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { DatePickerDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'date-picker', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.DatePickerDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <DatePickerDemo key={demoKey} />;
}
