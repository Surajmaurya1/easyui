import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { BreadcrumbDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'breadcrumb', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.BreadcrumbDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <BreadcrumbDemo key={demoKey} />;
}
