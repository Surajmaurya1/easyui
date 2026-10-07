'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  AlertCircle,
  RotateCcw,
  Copy,
  Download,
  Receipt,
  CreditCard,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type PaymentLifecycleStatus =
  | 'processing'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'refunded';

export interface PaymentReceiptItem {
  name: string;
  quantity?: number;
  price: string | number;
}

export interface PaymentStatusProps {
  /** Current payment status */
  status?: PaymentLifecycleStatus;
  /** Formatted payment amount (e.g. "$128.00" or 128) */
  amount?: string | number;
  /** Currency code or symbol */
  currency?: string;
  /** Unique transaction reference ID */
  transactionId?: string;
  /** Transaction date */
  date?: string | Date;
  /** Payment method label */
  paymentMethod?: string;
  /** Card or account last 4 digits */
  last4?: string;
  /** Custom error message when status is 'failed' */
  errorMessage?: string;
  /** Refund reason or note when status is 'refunded' */
  refundReason?: string;
  /** Itemized summary items for receipt view */
  items?: PaymentReceiptItem[];
  /** Merchant or product title */
  merchantName?: string;
  /** Retry payment handler */
  onRetry?: () => void;
  /** Change payment method handler */
  onChangePaymentMethod?: () => void;
  /** Custom handler when downloading receipt */
  onDownloadReceipt?: () => void;
  /** Custom handler when viewing receipt */
  onViewReceipt?: () => void;
  /** Custom class name */
  className?: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  status = 'processing',
  amount = '$149.00',
  currency = '$',
  transactionId = 'tx_9842a8d11c7f',
  date = 'Today at 3:42 PM',
  paymentMethod = 'Apple Pay',
  last4 = '4242',
  errorMessage = "Payment couldn't be completed. Your card issuer declined the request.",
  refundReason = 'Refunded to original payment method within 3–5 business days.',
  items = [
    { name: 'EasyUI Pro Team Plan', quantity: 1, price: '$129.00' },
    { name: 'Priority Support Add-on', quantity: 1, price: '$20.00' },
  ],
  merchantName = 'EasyUI Cloud',
  onRetry,
  onChangePaymentMethod,
  onDownloadReceipt,
  onViewReceipt,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [showReceiptDetails, setShowReceiptDetails] = useState(false);

  const formattedAmount =
    typeof amount === 'number'
      ? `${currency}${amount.toFixed(2)}`
      : amount.startsWith(currency)
      ? amount
      : `${currency}${amount}`;

  const formattedDate =
    date instanceof Date
      ? date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : date;

  const handleCopyId = () => {
    copyToClipboard(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      const receiptText = `RECEIPT - ${merchantName}
Transaction ID: ${transactionId}
Date: ${formattedDate}
Payment Method: ${paymentMethod} (•••• ${last4})
Amount: ${formattedAmount}
Status: ${status.toUpperCase()}
Items:
${items.map((i) => `- ${i.name} (${i.quantity || 1}x): ${i.price}`).join('\n')}
`;
      const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${transactionId}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-6 sm:p-7 text-left font-sans shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-all select-none',
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* Status Indicator Badge */}
        <div className="relative mb-5">
          {status === 'processing' && (
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-center relative">
              <motion.div
                className="absolute inset-0 rounded-full border border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <CreditCard className="w-5 h-5 text-[#525252]" />
            </div>
          )}

          {status === 'verifying' && (
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-center relative">
              <motion.div
                className="absolute inset-1 rounded-full border border-sky-400/40 border-t-sky-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={motionTransitions.springSnappy}
              className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={motionTransitions.springSnappy}
              className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400"
            >
              <AlertCircle className="w-7 h-7" />
            </motion.div>
          )}

          {status === 'refunded' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={motionTransitions.springSnappy}
              className="w-14 h-14 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#525252]"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.div>
          )}
        </div>

        {/* Heading and Subtext */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#FAFAFA] tracking-tight">
          {status === 'processing' && 'Processing Payment'}
          {status === 'verifying' && 'Verifying Transaction'}
          {status === 'success' && 'Payment Successful'}
          {status === 'failed' && "Payment Couldn't Be Completed"}
          {status === 'refunded' && 'Payment Refunded'}
        </h3>

        <p className="text-xs sm:text-sm text-[#A1A1A1] mt-1 max-w-xs">
          {status === 'processing' && 'Securely communicating with payment provider...'}
          {status === 'verifying' && 'Confirming token authorization and anti-fraud checks...'}
          {status === 'success' && `Your purchase with ${merchantName} is confirmed.`}
          {status === 'failed' && errorMessage}
          {status === 'refunded' && refundReason}
        </p>

        {/* Amount Pill */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#141414] border border-[#1F1F1F]">
          <span className="text-[11px] font-mono text-[#6B6B6B]">Total</span>
          <span className="text-sm font-semibold font-mono text-[#FAFAFA]">
            {formattedAmount}
          </span>
        </div>
      </div>

      {/* Transaction Details Staggered Card */}
      <AnimatePresence mode="wait">
        {(status === 'success' || status === 'refunded') && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={motionTransitions.springGentle}
            className="mt-6 pt-5 border-t border-[#1F1F1F] space-y-2.5 text-xs"
          >
            <div className="flex items-center justify-between py-1">
              <span className="text-[#A1A1A1]">Transaction ID</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 font-mono text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring px-1.5 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] cursor-pointer"
                title="Copy Transaction ID"
              >
                <span>{transactionId.slice(0, 14)}...</span>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#6B6B6B]" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-[#A1A1A1]">Date & Time</span>
              <span className="font-mono text-[#FAFAFA]">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-[#A1A1A1]">Payment Method</span>
              <span className="text-[#FAFAFA] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#525252]" />
                {paymentMethod} {last4 ? `(•••• ${last4})` : ''}
              </span>
            </div>

            {/* Receipt Actions */}
            <div className="pt-4 mt-2 border-t border-[#1F1F1F] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowReceiptDetails(!showReceiptDetails);
                  onViewReceipt?.();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
              >
                <Receipt className="w-3.5 h-3.5 text-[#525252]" />
                <span>{showReceiptDetails ? 'Hide Details' : 'View Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#525252]" />
                <span>Download</span>
              </button>
            </div>

            {/* Unfolding Receipt Item Breakdown */}
            <AnimatePresence>
              {showReceiptDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={motionTransitions.springGentle}
                  className="overflow-hidden pt-2 space-y-1.5 bg-[#050505] p-3 rounded-lg border border-[#1F1F1F]"
                >
                  <p className="text-[10px] font-mono uppercase text-[#6B6B6B] tracking-wider mb-1">
                    Itemized Breakdown
                  </p>
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-[#A1A1A1]">
                      <span>
                        {item.quantity ? `${item.quantity}x ` : ''}
                        {item.name}
                      </span>
                      <span className="font-mono text-[#FAFAFA]">{item.price}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#1F1F1F] flex justify-between font-medium text-xs text-[#FAFAFA]">
                    <span>Total Paid</span>
                    <span className="font-mono">{formattedAmount}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {status === 'failed' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={motionTransitions.springGentle}
            className="mt-6 pt-5 border-t border-[#1F1F1F] space-y-2"
          >
            <button
              type="button"
              onClick={onRetry}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAFAFA] hover:bg-white text-[#050505] font-medium text-xs sm:text-sm transition-all focus-ring shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              type="button"
              onClick={onChangePaymentMethod}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] text-[#A1A1A1] hover:text-[#FAFAFA] font-medium text-xs transition-colors focus-ring cursor-pointer"
            >
              <span>Change Payment Method</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6B6B6B]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
