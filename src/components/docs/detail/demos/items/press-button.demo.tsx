import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PressButton } = DEMO_COMPONENTS;

export const meta = { id: 'press-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PressButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center gap-3">
          <PressButton variant="primary" size="md" onClick={() => { }}>
            Save changes
          </PressButton>
          <PressButton variant="outline" size="md" onClick={() => { }}>
            Cancel
          </PressButton>
        </div>
      );
}
