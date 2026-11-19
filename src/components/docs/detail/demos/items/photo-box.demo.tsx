import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { PhotoBoxDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'photo-box', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.PhotoBoxDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <PhotoBoxDemo key={demoKey} />;
}
