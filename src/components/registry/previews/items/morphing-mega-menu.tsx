import { motion } from 'framer-motion';
import { CreditCard, Shield, BookOpen } from 'lucide-react';
import { MorphingMegaMenu, type MegaMenuItem } from '../../../ui/MorphingMegaMenu';
import type { ComponentPreviewProps } from '../types';

const PREVIEW_ITEMS: MegaMenuItem[] = [
  {
    id: 'features',
    label: 'Platform',
    content: (
      <div className="w-[230px] p-2 space-y-1">
        <div className="flex items-center gap-2.5 p-1.5 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <span className="flex size-6 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <CreditCard className="w-3.5 h-3.5" />
          </span>
          <div>
            <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Payments</p>
            <p className="text-[11px] text-neutral-500">Global checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-1.5 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <span className="flex size-6 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <Shield className="w-3.5 h-3.5" />
          </span>
          <div>
            <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Shield</p>
            <p className="text-[11px] text-neutral-500">Fraud prevention</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    content: (
      <div className="w-[190px] p-2 space-y-1">
        <div className="flex items-center gap-2.5 p-1.5 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <span className="flex size-6 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <BookOpen className="w-3.5 h-3.5" />
          </span>
          <div>
            <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Documentation</p>
            <p className="text-[11px] text-neutral-500">API and SDKs</p>
          </div>
        </div>
      </div>
    ),
  },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
];

export default function MorphingMegaMenuPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-52 w-full flex flex-col items-center justify-start pt-6 px-3 select-none">
      <motion.div
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-[280px]"
      >
        <MorphingMegaMenu items={PREVIEW_ITEMS} />
      </motion.div>
    </div>
  );
}
