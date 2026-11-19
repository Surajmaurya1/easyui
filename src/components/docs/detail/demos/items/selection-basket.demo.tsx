import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { SelectionBasketShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'selection-basket', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.SelectionBasketShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <SelectionBasketShowcase key={demoKey} />;
}
