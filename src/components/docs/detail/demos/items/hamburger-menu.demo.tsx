import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { HamburgerMenuShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'hamburger-menu', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.HamburgerMenuShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <HamburgerMenuShowcase key={demoKey} />;
}
