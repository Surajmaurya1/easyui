import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { BookCallButton } = DEMO_COMPONENTS;

export const meta = { id: 'book-call-button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([BookCallButton.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-12 flex flex-col items-center justify-center">
          <BookCallButton key={demoKey} />
        </div>
      );
}
