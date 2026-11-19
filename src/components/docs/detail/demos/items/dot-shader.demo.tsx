import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DotShaderLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'dot-shader', aliases: ['dotshader', 'dot-matrix-shader'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DotShaderLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <DotShaderLiveShowcase key={demoKey} />;
}
