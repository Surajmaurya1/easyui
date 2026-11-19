import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { DragToConfirmShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'drag-to-confirm', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.DragToConfirmShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <DragToConfirmShowcase key={demoKey} />;
}
