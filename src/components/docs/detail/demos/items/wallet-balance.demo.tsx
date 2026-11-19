import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { WalletBalance } = DEMO_COMPONENTS;

export const meta = { id: 'wallet-balance', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([WalletBalance.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full flex items-center justify-center py-6">
          <WalletBalance key={demoKey} className="max-w-[360px]" />
        </div>
      );
}
