import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { ModelPickerDemo } = DEMO_COMPONENTS;

export const meta = { id: 'model-picker', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([ModelPickerDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  return <ModelPickerDemo key={demoKey} />;
}
