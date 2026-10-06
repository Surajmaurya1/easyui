'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface PeekCardData {
  title: string;
  subtitle?: string;
  amount?: string;
  status?: string;
  customer?: {
    name: string;
    email: string;
    avatar?: string;
  };
  timestamp?: string;
  metadata?: Array<{ label: string; value: string }>;
  actions?: Array<{ label: string; onClick?: () => void }>;
}

export interface PeekCardProps {
  /** Trigger element (e.g. text link, badge, invoice pill) */
  children: React.ReactNode;
  /** Peek data object or custom render function */
  data?: PeekCardData;
  /** Custom peek preview renderer */
  renderContent?: () => React.ReactNode;
  /** Hover delay in milliseconds */
  delay?: number;
  /** Placement preference: 'top' | 'bottom' | 'auto' */
  placement?: 'top' | 'bottom' | 'auto';
  /** Loading skeleton state */
  isLoading?: boolean;
  /** Custom class name for trigger */
  className?: string;
}

export const PeekCard: React.FC<PeekCardProps> = ({
  children,
  data = {
    title: 'Payment #3948',
    subtitle: 'Stripe Direct Charge',
    amount: '$249.00',
    status: 'Succeeded',
    customer: {
      name: 'Alexander Wright',
      email: 'alex.w@acme-corp.com',
    },
    timestamp: 'Oct 24, 2026 at 2:15 PM',
    metadata: [
      { label: 'Method', value: 'Mastercard •••• 4242' },
      { label: 'Fee', value: '$7.52 (3%)' },
      { label: 'Risk Score', value: 'Normal (08)' },
    ],
  },
  renderContent,
  delay = 200,
  placement = 'auto',
  isLoading = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [calculatedPlacement, setCalculatedPlacement] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (placement === 'top') {
      setCalculatedPlacement('top');
    } else if (placement === 'bottom') {
      setCalculatedPlacement('bottom');
    } else {
      // Auto: prefer top unless space above is tight (< 220px)
      setCalculatedPlacement(spaceAbove < 220 && spaceBelow > spaceAbove ? 'bottom' : 'top');
    }
  }, [placement]);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      calculatePosition();
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    // Mobile tap support
    e.stopPropagation();
    calculatePosition();
    setIsOpen(!isOpen);
  };

  const handleCopyEmail = (email?: string) => {
    if (!email) return;
    copyToClipboard(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTriggerClick}
      onFocus={() => {
        calculatePosition();
        setIsOpen(true);
      }}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={cn('relative inline-flex items-center cursor-pointer select-none font-sans focus-ring rounded', className)}
    >
      {/* Anchor Trigger Component */}
      {children}

      {/* Floating Connected Peek Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: calculatedPlacement === 'top' ? 6 : -6,
              scale: 0.96,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: calculatedPlacement === 'top' ? 4 : -4,
              scale: 0.96,
              transition: { duration: 0.12 },
            }}
            transition={motionTransitions.springSnappy}
            className={cn(
              'absolute left-1/2 -translate-x-1/2 z-50 w-72 sm:w-80 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.6)] cursor-default',
              calculatedPlacement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {renderContent ? (
              renderContent()
            ) : isLoading ? (
              <div className="space-y-2.5 animate-pulse">
                <div className="h-4 bg-[#141414] rounded w-2/3" />
                <div className="h-10 bg-[#141414] rounded" />
                <div className="h-4 bg-[#141414] rounded w-1/2" />
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-[#1F1F1F] pb-2.5">
                  <div>
                    <p className="font-semibold text-sm text-[#FAFAFA]">{data.title}</p>
                    {data.subtitle && <p className="text-[11px] text-[#6B6B6B]">{data.subtitle}</p>}
                  </div>
                  {data.amount && (
                    <span className="font-mono text-sm font-semibold text-[#FAFAFA] bg-[#141414] px-2 py-0.5 rounded border border-[#1F1F1F]">
                      {data.amount}
                    </span>
                  )}
                </div>

                {/* Customer / Actor Profile */}
                {data.customer && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#141414] border border-[#1F1F1F]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-center text-[10px] text-[#FAFAFA]">
                        {data.customer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-[#FAFAFA] truncate">{data.customer.name}</p>
                        <p className="text-[10px] text-[#6B6B6B] truncate">{data.customer.email}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyEmail(data.customer?.email)}
                      className="p-1 rounded text-[#525252] hover:text-white hover:bg-[#0E0E0E] transition-colors cursor-pointer"
                      title="Copy customer email"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}

                {/* Metadata key-values */}
                {data.metadata && (
                  <div className="space-y-1.5 text-[11px]">
                    {data.metadata.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[#A1A1A1]">
                        <span>{item.label}</span>
                        <span className="font-mono text-[#FAFAFA]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Timestamp */}
                {data.timestamp && (
                  <div className="pt-2 border-t border-[#1F1F1F] flex justify-between items-center text-[10px] text-[#6B6B6B] font-mono">
                    <span>{data.timestamp}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {data.status || 'Active'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
