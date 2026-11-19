import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { WalletCard } = DEMO_COMPONENTS;

export const meta = { id: 'wallet-card', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([WalletCard.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full max-w-md mx-auto">
          <WalletCard
            key={demoKey}
            balance="$4,566.00"
            cardType="Mastercard"
            cardLastFour="3040"
            buttonLabel="Use Wallet"
            balanceLabel="Total Balance"
          />
        </div>
      );
}
