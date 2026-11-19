import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { ProductTourDemoShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'product-tour', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.ProductTourDemoShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <ProductTourDemoShowcase key={demoKey} />;
}
