import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { DrawCheckbox } = DEMO_COMPONENTS;

export const meta = { id: 'draw-checkbox', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DrawCheckbox.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 px-4 sm:px-0 flex flex-col items-center justify-center gap-4 w-full max-w-2xl mx-auto">
          {/* Stack vertically on mobile so the three checkbox + label
              groups fit within the viewport; go horizontal on sm+ when
              there is room. */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <DrawCheckbox defaultChecked label="Product updates" />
            <DrawCheckbox label="Newsletter" />
            <DrawCheckbox indeterminate label="Beta features" />
          </div>
        </div>
      );
}
