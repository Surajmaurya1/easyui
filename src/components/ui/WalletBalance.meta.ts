import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Wallet Balance',
  description: 'An interactive wallet balance component where branded cards tuck neatly into an embossed leather pouch with spring physics. Tap the eye button to reveal or mask balances with smooth blur-crossfade transitions.',
  category: 'Motion',
  tagline: 'Interactive payment cards tucked into a leather pouch with eye-toggle balance obscuring',
  badges: ['Wallet', 'Spring Physics', 'Privacy Eye', 'Motion'],
  createdAt: '2026-10-14',
  features: [
    'Interactive eye-toggle button to reveal or mask balances with blur-crossfade and popLayout transitions',
    'Staggered spring animations for fanning out and tucking cards into the pouch',
    'Responsive stage scaling with ResizeObserver for crisp rendering on any viewport width',
    'Customizable accounts array with brand marks, individual balances, and background themes',
    'Full accessibility support with aria-pressed, live screen reader announcements, and prefers-reduced-motion',
  ],
  props: [
    { name: 'accounts', type: 'WalletAccount[]', default: 'DEFAULT_ACCOUNTS', description: 'Array of up to 3 accounts displaying logo, balance, and custom colors' },
    { name: 'visible', type: 'boolean', default: 'undefined', description: 'Controlled visibility state for balances and cards' },
    { name: 'defaultVisible', type: 'boolean', default: 'true', description: 'Uncontrolled initial visibility state' },
    { name: 'onVisibleChange', type: '(visible: boolean) => void', default: 'undefined', description: 'Callback fired when balance visibility is toggled' },
    { name: 'currency', type: 'string', default: "'USD'", description: 'ISO currency symbol used for formatted card amounts' },
    { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale string for number formatting' },
    { name: 'totalLabel', type: 'string', default: "'Total Balance'", description: 'Caption label displayed below the total balance figure' },
    { name: 'className', type: 'string', default: "''", description: 'Optional CSS class overrides for the outer container' },
  ],
  accessibility: [
    'Toggle button provides aria-pressed and dynamic aria-label ("Show balances" / "Hide balances")',
    'Polite aria-live region announces total balance changes when revealed or hidden',
    'Card graphics and pocket SVG elements are marked aria-hidden to eliminate screen reader noise',
    'Full keyboard navigation with visible focus outline on the interactive eye toggle',
    'Respects prefers-reduced-motion with instant transitions and zero blur effects',
  ],
  usageCode: `import { WalletBalance } from "@/components/ui/wallet-balance";

export function Demo() {
  return (
    <div className="w-full py-12 flex justify-center">
      <WalletBalance />
    </div>
  );
}`,
};

export default meta;
