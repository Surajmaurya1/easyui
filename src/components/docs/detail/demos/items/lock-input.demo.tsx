import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { LockInput } = DEMO_COMPONENTS;

export const meta = { id: 'lock-input', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([LockInput.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-12 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
          <LockInput label="Email" placeholder="you@studio.dev" defaultValue="you@studio.dev" />
        </div>
      );
}
