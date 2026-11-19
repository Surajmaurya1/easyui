import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { PaymentReceiptPrinter } = DEMO_COMPONENTS;

export const meta = { id: 'payment-receipt-printer', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([PaymentReceiptPrinter.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full flex justify-center">
          <PaymentReceiptPrinter
            key={demoKey}
            merchant="EasyUI Store"
            merchantSubtext="Official Component Registry"
            orderNumber="#4821"
            items={[
              { name: 'EasyUI Pro License', price: '$200.00', quantity: 1, tag: 'Annual' },
              { name: 'Framer Motion Pack', price: '$20.00', quantity: 1, description: 'Micro-interactions & physics' },
            ]}
            subtotal="$220.00"
            total="$220.00"
            paymentMethod="Apple Pay •••• 4242"
            message="Thank you for your order!"
            autoPrint={true}
            showActions={true}
          />
        </div>
      );
}
