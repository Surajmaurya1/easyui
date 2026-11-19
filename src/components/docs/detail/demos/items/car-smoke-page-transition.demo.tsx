import type { DemoProps } from '../../demo-types';
import { INLINE_DEMO_COMPONENTS } from '../../inline-demo-registry';

const { CarSmokePageTransitionShowcase } = INLINE_DEMO_COMPONENTS;

export const meta = { id: 'car-smoke-page-transition', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([INLINE_DEMO_COMPONENTS.CarSmokePageTransitionShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="w-full py-4 flex flex-col items-center justify-center">
          <CarSmokePageTransitionShowcase />
        </div>
      );
}
