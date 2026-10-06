'use client';

import React, { useState, useRef } from 'react';
import {
  Trash2,
  RotateCcw,
  Sparkles,
  Layers,
  Database,
  Cpu,
  Shield,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  particleDelete,
  useParticleDelete,
  type ParticleDeleteOptions,
} from '../../lib/particle-delete';

export interface ParticleDeleteItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: 'shield' | 'database' | 'cpu' | 'layers';
  tag: string;
  meta: string;
}

export interface ParticleDeleteContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  onDelete?: () => void;
  options?: ParticleDeleteOptions;
  children: React.ReactNode | ((args: { isDeleting: boolean; handleDelete: () => void }) => React.ReactNode);
  className?: string;
}

/**
 * Reusable wrapper component that attaches the particle dissolution effect to any element upon delete.
 */
export const ParticleDeleteContainer = React.forwardRef<
  HTMLDivElement,
  ParticleDeleteContainerProps
>(({ onDelete, options, children, className, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const { isDeleting, triggerDelete } = useParticleDelete(options);

  const handleDelete = () => {
    const el = (ref && 'current' in ref ? ref.current : null) || localRef.current;
    if (el) {
      triggerDelete(el, onDelete);
    } else {
      onDelete?.();
    }
  };

  return (
    <div
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref && 'current' in ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn('relative', className)}
      data-deleting={isDeleting}
      {...props}
    >
      {typeof children === 'function'
        ? children({ isDeleting, handleDelete })
        : children}
    </div>
  );
});

ParticleDeleteContainer.displayName = 'ParticleDeleteContainer';

export interface ParticleDeleteProps extends React.HTMLAttributes<HTMLDivElement> {
  initialItems?: ParticleDeleteItem[];
  className?: string;
  options?: ParticleDeleteOptions;
}

const DEFAULT_SAMPLE_ITEMS: ParticleDeleteItem[] = [
  {
    id: 'edge-cluster-iad1',
    title: 'Edge Cluster (iad-1)',
    category: 'Infra',
    description: '12 active workers · 42ms latency',
    icon: 'cpu',
    tag: 'Healthy',
    meta: 'Primary route',
  },
  {
    id: 'auth-session-vault',
    title: 'Prod Session Vault',
    category: 'Security',
    description: 'RSA-4096 secret pair · Token rotation active',
    icon: 'shield',
    tag: 'Active',
    meta: 'Vault #01',
  },
  {
    id: 'redis-cache-layer',
    title: 'L2 Memory Cache',
    category: 'Database',
    description: '1.2 GB stored · 99.8% hit ratio',
    icon: 'database',
    tag: 'Optimal',
    meta: 'Redis v7',
  },
];

/**
 * EasyUI ParticleDelete Interactive Component
 *
 * Minimal, refined card deck demonstrating particle dissolution on deletion.
 */
export const ParticleDelete: React.FC<ParticleDeleteProps> = ({
  initialItems = DEFAULT_SAMPLE_ITEMS,
  className,
  options,
  ...props
}) => {
  const [items, setItems] = useState<ParticleDeleteItem[]>(initialItems);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleDeleteItem = async (id: string) => {
    if (deletingId) return;
    const targetEl = cardRefs.current.get(id);

    setDeletingId(id);

    if (targetEl) {
      await particleDelete(targetEl, options);
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeletingId(null);
  };

  const handleReset = () => {
    setItems(initialItems);
  };

  const getItemIcon = (icon: ParticleDeleteItem['icon']) => {
    switch (icon) {
      case 'shield':
        return <Shield className="w-3.5 h-3.5 text-[#A1A1A1]" />;
      case 'database':
        return <Database className="w-3.5 h-3.5 text-[#A1A1A1]" />;
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-[#A1A1A1]" />;
      case 'cpu':
      default:
        return <Cpu className="w-3.5 h-3.5 text-[#A1A1A1]" />;
    }
  };

  return (
    <div
      role="region"
      aria-label="Particle Delete Items"
      className={cn(
        'w-full max-w-lg mx-auto rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 sm:p-4 text-[#FAFAFA]',
        className
      )}
      {...props}
    >
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#FAFAFA]">Active Resources</span>
          <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#141414] px-1.5 py-0.5 rounded border border-[#1F1F1F]">
            {items.length}
          </span>
        </div>

        {items.length < initialItems.length && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A1A1A1] hover:text-white transition-colors cursor-pointer focus-ring rounded"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restore ({initialItems.length - items.length})</span>
          </button>
        )}
      </div>

      {/* Minimal Items List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="py-8 text-center rounded-lg border border-dashed border-[#1F1F1F] bg-[#050505] space-y-2">
            <Sparkles className="w-4 h-4 text-[#6B6B6B] mx-auto" />
            <p className="text-xs text-[#6B6B6B]">All items dissolved into particles.</p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#FAFAFA] underline underline-offset-4 hover:text-white transition-colors cursor-pointer focus-ring rounded"
            >
              Reset resources
            </button>
          </div>
        ) : (
          items.map((item) => {
            const isThisDeleting = deletingId === item.id;

            return (
              <div
                key={item.id}
                ref={(node) => {
                  if (node) cardRefs.current.set(item.id, node);
                  else cardRefs.current.delete(item.id);
                }}
                className={cn(
                  'group rounded-lg border border-[#1F1F1F] bg-[#141414] p-2.5 sm:p-3 hover:border-[#4A4A4A] transition-all flex items-center justify-between gap-3',
                  isThisDeleting && 'pointer-events-none'
                )}
              >
                {/* Left: Icon + Text info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-center shrink-0">
                    {getItemIcon(item.icon)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[#FAFAFA] truncate">
                        {item.title}
                      </span>
                      <span className="text-[9px] font-mono text-[#6B6B6B] px-1 py-0.2 rounded bg-[#0E0E0E] border border-[#1F1F1F]">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A1A1A1] truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Minimal Delete Button */}
                <button
                  type="button"
                  disabled={isThisDeleting || deletingId !== null}
                  onClick={() => handleDeleteItem(item.id)}
                  className={cn(
                    'p-1.5 rounded-md transition-colors cursor-pointer shrink-0 focus-ring',
                    isThisDeleting
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-[#525252] hover:text-rose-400 hover:bg-rose-500/10'
                  )}
                  title={`Delete ${item.title}`}
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
