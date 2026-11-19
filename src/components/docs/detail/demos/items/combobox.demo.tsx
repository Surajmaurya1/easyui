import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { ComboboxDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'combobox', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.ComboboxDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <ComboboxDemo key={demoKey} />;
}
