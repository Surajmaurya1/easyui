import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { AvatarStackShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'avatar-stack', aliases: ['avatar-stacks', 'avatarstack'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.AvatarStackShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <AvatarStackShowcase key={demoKey} />;
}
