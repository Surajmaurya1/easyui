import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { GlyphMatrixShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'glyph-matrix', aliases: ['glyph-matrices', 'glyphmatrix'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.GlyphMatrixShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return <GlyphMatrixShowcase key={demoKey} />;
}
