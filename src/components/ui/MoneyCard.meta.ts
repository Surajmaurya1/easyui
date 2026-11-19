import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Money Card',
  description: 'An interactive financial wallet card featuring animated live balance updates, quick-send contact shortcuts, recent transaction history, and responsive modal sheets for sending, receiving, and viewing activity.',
  category: 'Motion',
  tagline: 'Interactive financial wallet card with quick-send contacts and animated transfer sheets',
  badges: ['Financial Card', 'Quick Send', 'Interactive Sheet', 'Motion'],
  createdAt: '2026-10-14',
  features: [
    'Animated balance counter utilizing MotionValue and custom formatters for fluid number interpolation',
    'Interactive send and receive sheets with built-in keypad, contact selector, note input, and error handling',
    'Quick-send contact avatars straddling the card boundary with spring-press tactile response',
    'Animated transaction feed displaying directional amount badges and expandable activity list',
    'Settings drawer with toggleable balance masking and copyable personal payment link',
    'Container query architecture ensuring flawless responsiveness across all screen sizes',
  ],
  props: [
    { name: 'user', type: '{ name: string; avatar: string }', default: 'DEFAULT_USER', description: 'User profile with display name and avatar icon' },
    { name: 'balance', type: 'number', default: '52002.5', description: 'Headline account balance in major currency units' },
    { name: 'contacts', type: 'Contact[]', default: 'DEFAULT_CONTACTS', description: 'List of quick-send contacts with avatars and tints' },
    { name: 'transactions', type: 'Transaction[]', default: 'DEFAULT_TRANSACTIONS', description: 'List of recent transactions sorted newest first' },
    { name: 'onSend', type: '(req: TransferRequest) => Promise<void>', default: 'undefined', description: 'Async handler called upon submitting a send transfer' },
    { name: 'onRequest', type: '(req: TransferRequest) => Promise<void>', default: 'undefined', description: 'Async handler called upon submitting a request transfer' },
    { name: 'onViewAll', type: '() => void', default: 'undefined', description: 'Optional callback overriding default activity list opening' },
    { name: 'currency', type: 'string', default: "'USD'", description: 'ISO currency symbol used for formatted monetary values' },
    { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale string for number and date formatting' },
    { name: 'paymentLink', type: 'string', default: "'pay.example/ana'", description: 'Personal payment link displayed on receive and settings sheets' },
    { name: 'className', type: 'string', default: "''", description: 'Optional CSS class overrides for the outer container' },
  ],
  accessibility: [
    'Accessible dialog sheets with focus traps, Escape key dismissal, and backdrop click handlers',
    'Polite aria-live region announcing balance changes and masked privacy states',
    'Touch-friendly drag dismiss handles on mobile bottom sheets with reduced motion alternatives',
    'Semantic role="switch" for privacy balance toggle with visible keyboard focus rings',
  ],
  usageCode: `import { MoneyCard } from "@/components/ui/money-card";

export function Demo() {
  return (
    <div className="w-full py-12 flex justify-center">
      <MoneyCard
        balance={52002.5}
        onSend={async ({ contact, amount }) => {
          console.log(\`Sent \${amount} to \${contact.name}\`);
        }}
        onRequest={async ({ contact, amount }) => {
          console.log(\`Requested \${amount} from \${contact.name}\`);
        }}
      />
    </div>
  );
}`,
};

export default meta;
