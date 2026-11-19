import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { StickyPagesLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'sticky-pages', aliases: ['stickypages', 'sticky-stacking-pages'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([StickyPagesLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <StickyPagesLiveShowcase key={demoKey} />;
}
