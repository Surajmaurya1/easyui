import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Breadcrumb } = DEMO_COMPONENTS;

export const BreadcrumbDemo: React.FC = () => {
  const [sep, setSep] = useState<'chevron' | 'slash'>('chevron');
  const items = [
    { label: 'Home', href: '#', icon: <Home className="size-4" /> },
    { label: 'Components', href: '#' },
    { label: 'Navigation', href: '#' },
    { label: 'EasyUI', href: '#' },
    { label: 'Breadcrumb' },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-xl">
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>Separator style:</span>
        <button
          type="button"
          onClick={() => setSep('chevron')}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition',
            sep === 'chevron'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          Chevron
        </button>
        <button
          type="button"
          onClick={() => setSep('slash')}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition',
            sep === 'slash'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          Slash
        </button>
      </div>

      <div className="w-full flex justify-center p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-xs overflow-x-auto">
        <Breadcrumb items={items} separator={sep} maxItems={4} />
      </div>
    </div>
  );
};

export default BreadcrumbDemo;
