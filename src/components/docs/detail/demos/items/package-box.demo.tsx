import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { PackageBoxDemoShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'package-box', aliases: ['packagebox'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.PackageBoxDemoShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <PackageBoxDemoShowcase key={demoKey} />;
}
