import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { OTPInput } = DEMO_COMPONENTS;

export const meta = { id: 'otp-input', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([OTPInput.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="flex items-center justify-center h-[400px] w-full">
          <OTPInput length={6} autoFocus onComplete={(value: string) => {
            alert(value)
          }} />
        </div>
      );
}
