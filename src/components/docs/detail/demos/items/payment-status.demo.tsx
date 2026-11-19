import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PaymentStatus } = DEMO_COMPONENTS;

export const meta = { id: 'payment-status', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PaymentStatus.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full max-w-md mx-auto">
          <PaymentStatus
            key={demoKey}
            amount="$149.00"
            status="success"
            transactionId="tx_9842a8d11c7f"
            paymentMethod="Apple Pay"
            last4="4242"
          />
        </div>
      );
}
