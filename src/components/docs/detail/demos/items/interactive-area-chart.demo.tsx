import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { InteractiveAreaChartDemo } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'interactive-area-chart', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.InteractiveAreaChartDemo.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <InteractiveAreaChartDemo key={demoKey} />;
}
