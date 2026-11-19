import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SparklesCoreLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'sparkles-core', aliases: ['sparklescore', 'sparkles'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SparklesCoreLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <SparklesCoreLiveShowcase key={demoKey} />;
}
