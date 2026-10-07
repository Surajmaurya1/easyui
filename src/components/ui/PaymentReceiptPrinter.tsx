'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, RotateCcw, Copy, CheckCircle2, Store, CreditCard, Printer } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

// Fallback clipboard utility for standalone copy-paste support
function copyTextToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch {}
    textArea.remove();
  }
}

// Resilient spring transition tokens with zero-dependency fallback
const defaultSpringSnappy = motionTransitions?.springSnappy || {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};


export interface ReceiptItem {
  name: string;
  price: string | number;
  quantity?: number;
  description?: string;
  tag?: string;
}

export interface PaymentReceiptPrinterProps {
  /** Current lifecycle status of payment & printing */
  status?: 'idle' | 'printing' | 'completed' | 'success';
  /** Store or merchant brand name */
  merchant?: string;
  /** Merchant location or subtext */
  merchantSubtext?: string;
  /** Custom logo or icon component for merchant */
  merchantLogo?: React.ReactNode;
  /** Order or invoice tracking number */
  orderNumber?: string;
  /** Transaction timestamp or custom date string */
  date?: string | Date;
  /** List of purchased items on receipt */
  items?: ReceiptItem[];
  /** Single item shorthand fallback */
  item?: ReceiptItem;
  /** Subtotal cost (optional, auto-derived if omitted) */
  subtotal?: string | number;
  /** Tax amount (optional) */
  tax?: string | number;
  /** Discount amount (optional) */
  discount?: string | number;
  /** Final total amount paid */
  total?: string | number;
  /** Currency symbol */
  currency?: string;
  /** Payment method label (e.g. "Apple Pay •••• 4242") */
  paymentMethod?: string;
  /** Receipt footer message */
  message?: string;
  /** Automatically trigger printing animation on mount */
  autoPrint?: boolean;
  /** Duration of receipt printing extrusion in seconds */
  printDuration?: number;
  /** Whether to show the top payment status card */
  showStatusCard?: boolean;
  /** Title for the payment status banner */
  statusTitle?: string;
  /** Subtitle for the payment status banner */
  statusSubtitle?: string;
  /** Whether to show interactive action buttons (Replay, Copy, Print) */
  showActions?: boolean;
  /** Whether to render the thermal barcode */
  showBarcode?: boolean;
  /** Whether to render jagged serrated paper edges */
  showCutEffect?: boolean;
  /** Paper color theme */
  paperTheme?: 'light' | 'dark' | 'cream';
  /** Callback fired when paper printing extrusion begins */
  onPrintStart?: () => void;
  /** Callback fired when paper printing extrusion finishes */
  onPrintComplete?: () => void;
  /** Callback fired when replay animation is triggered */
  onReplay?: () => void;
  /** Additional container CSS class names */
  className?: string;
  /** Additional printer housing CSS class names */
  printerClassName?: string;
  /** Additional receipt paper CSS class names */
  receiptClassName?: string;
}

export const PaymentReceiptPrinter: React.FC<PaymentReceiptPrinterProps> = ({
  status: controlledStatus,
  merchant = 'EasyUI Store',
  merchantSubtext = 'Official Component Registry',
  merchantLogo,
  orderNumber = '#4821',
  date,
  items,
  item,
  subtotal,
  tax,
  discount,
  total = '$200.00',
  currency = '$',
  paymentMethod = 'Apple Pay •••• 4242',
  message = 'Thank you for your order!',
  autoPrint = true,
  printDuration = 2.4,
  showStatusCard = true,
  statusTitle = 'Payment Complete',
  statusSubtitle = 'Receipt has been issued',
  showActions = true,
  showBarcode = true,
  showCutEffect = true,
  paperTheme = 'light',
  onPrintStart,
  onPrintComplete,
  onReplay,
  className,
  printerClassName,
  receiptClassName,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [internalStatus, setInternalStatus] = useState<'idle' | 'printing' | 'completed'>(
    shouldReduceMotion ? 'completed' : autoPrint ? 'printing' : 'idle'
  );
  const [copied, setCopied] = useState(false);
  const [printKey, setPrintKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Normalize items list
  const receiptItems: ReceiptItem[] = items && items.length > 0
    ? items
    : item
    ? [item]
    : [
        { name: 'EasyUI Pro Subscription', price: '$200.00', quantity: 1, tag: 'Annual' },
      ];

  // Derive date string
  const formattedDate = date
    ? typeof date === 'string'
      ? date
      : date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
    : 'Aug 20, 2026 · 10:42 AM';

  const currentStatus = controlledStatus || internalStatus;
  const isPrinting = currentStatus === 'printing';
  const isCompleted = currentStatus === 'completed' || currentStatus === 'success';

  // Handle printing timeline sequence
  const startPrinting = useCallback(() => {
    if (shouldReduceMotion) {
      setInternalStatus('completed');
      onPrintComplete?.();
      return;
    }

    setInternalStatus('printing');
    onPrintStart?.();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setInternalStatus('completed');
      onPrintComplete?.();
    }, printDuration * 1000);
  }, [shouldReduceMotion, printDuration, onPrintStart, onPrintComplete]);

  useEffect(() => {
    if (autoPrint && !shouldReduceMotion) {
      const delay = setTimeout(() => {
        startPrinting();
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [autoPrint, shouldReduceMotion, startPrinting]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleReplay = () => {
    setPrintKey((prev) => prev + 1);
    setInternalStatus('idle');
    onReplay?.();
    setTimeout(() => {
      startPrinting();
    }, 150);
  };

  const handleCopyOrder = () => {
    copyTextToClipboard(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Paper Theme Background & Text Colors
  const paperThemeStyles = {
    light: 'bg-[#F9F9F8] text-[#111111] border-[#E2E2E0] shadow-[0_15px_35px_rgba(0,0,0,0.4)]',
    dark: 'bg-[#0E0E0E] text-[#FAFAFA] border-[#1F1F1F] shadow-[0_15px_35px_rgba(0,0,0,0.6)]',
    cream: 'bg-[#FDFBF7] text-[#1F1C18] border-[#EAE3D9] shadow-[0_15px_35px_rgba(0,0,0,0.4)]',
  };

  const isDarkPaper = paperTheme === 'dark';

  return (
    <div
      className={cn(
        'w-full max-w-[360px] mx-auto flex flex-col items-center select-none font-sans',
        className
      )}
      role="region"
      aria-label="Payment Receipt Printer"
    >
      {/* 1. Top Success / Status Banner (Optional) */}
      {showStatusCard && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={defaultSpringSnappy}
          className="w-full mb-3 p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-between shadow-md"
          aria-live="polite"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-[#FAFAFA] truncate">{statusTitle}</h4>
              <p className="text-[10px] text-[#A1A1A1] truncate">{statusSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                isPrinting
                  ? 'bg-amber-400 animate-ping'
                  : isCompleted
                  ? 'bg-emerald-400'
                  : 'bg-[#555555]'
              )}
            />
            <span className="text-[10px] font-mono text-[#525252]">
              {isPrinting ? 'Printing' : isCompleted ? 'Ready' : 'Idle'}
            </span>
          </div>
        </motion.div>
      )}

      {/* 2. Main Printer Chassis Container */}
      <div className="w-full relative flex flex-col items-center">
        {/* Physical Printer Body */}
        <motion.div
          animate={
            isPrinting && !shouldReduceMotion
              ? {
                  x: [0, -0.6, 0.6, -0.4, 0.4, 0],
                  y: [0, -0.2, 0.2, 0],
                }
              : { x: 0, y: 0 }
          }
          transition={{
            repeat: isPrinting ? Infinity : 0,
            duration: 0.18,
            ease: 'easeInOut',
          }}
          className={cn(
            'w-full z-20 relative rounded-2xl bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-[#0B0B0B] border border-[#1F1F1F] p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.6)]',
            printerClassName
          )}
        >
          {/* Printer Bevel Top Highlight */}
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Printer Control Bar */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-center text-[#A1A1A1]">
                <Printer className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-mono font-medium text-[#FAFAFA] tracking-tight">
                POS-8000
              </span>
            </div>

            {/* LED Status Light */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#050505] border border-[#1F1F1F]">
                <motion.span
                  animate={
                    isPrinting
                      ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    isPrinting
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : isCompleted
                      ? 'bg-emerald-500 shadow-[0_0_5px_rgba(52,211,153,0.4)]'
                      : 'bg-[#444444]'
                  )}
                />
                <span className="text-[9px] font-mono text-[#6B6B6B] uppercase">
                  {isPrinting ? 'FEED' : isCompleted ? 'ONLINE' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>

          {/* Printer Feed Mouth / Exit Slot */}
          <div className="relative w-full h-3 rounded-full bg-[#050505] border border-[#1F1F1F] overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center">
            {/* Dark slot depth & roller guide */}
            <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent" />
          </div>
        </motion.div>

        {/* 3. Extruding Receipt Paper (Emerging from behind printer slot) */}
        <div className="w-full relative -mt-1.5 z-10 overflow-hidden pt-1 pb-4 flex justify-center">
          <motion.div
            key={printKey}
            initial={
              shouldReduceMotion
                ? { y: 0, opacity: 1 }
                : { y: '-100%', opacity: 0.4 }
            }
            animate={
              isPrinting || isCompleted || shouldReduceMotion
                ? { y: '0%', opacity: 1 }
                : { y: '-100%', opacity: 0.4 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : printDuration,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              'w-[92%] relative rounded-b-md px-5 pt-5 pb-6 border font-mono text-left transition-colors',
              paperThemeStyles[paperTheme],
              receiptClassName
            )}
          >
            {/* Top Serrated Edge (if enabled) */}
            {showCutEffect && (
              <div className="absolute top-0 inset-x-0 h-1.5 overflow-hidden flex -translate-y-full">
                <svg
                  className={cn(
                    'w-full h-1.5',
                    isDarkPaper ? 'text-[#0E0E0E]' : paperTheme === 'cream' ? 'text-[#FDFBF7]' : 'text-[#F9F9F8]'
                  )}
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                >
                  <polygon
                    fill="currentColor"
                    points="0,10 5,0 10,10 15,0 20,10 25,0 30,10 35,0 40,10 45,0 50,10 55,0 60,10 65,0 70,10 75,0 80,10 85,0 90,10 95,0 100,10"
                  />
                </svg>
              </div>
            )}

            {/* Side Perforation Ticket Notches */}
            <div className="absolute -left-2 top-28 w-3.5 h-3.5 rounded-full bg-[#050505] border-r border-[#1F1F1F]" />
            <div className="absolute -right-2 top-28 w-3.5 h-3.5 rounded-full bg-[#050505] border-l border-[#1F1F1F]" />

            {/* Header: Merchant & Star Icon */}
            <div className="text-center pb-3 border-b border-dashed border-current/25">
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-current/5 mb-1.5">
                {merchantLogo || <Store className="w-3.5 h-3.5" />}
              </div>
              <h3 className="text-xs font-bold tracking-wider uppercase">{merchant}</h3>
              {merchantSubtext && (
                <p className="text-[9px] opacity-60 tracking-tight mt-0.5">{merchantSubtext}</p>
              )}
            </div>

            {/* Order Meta Telemetry */}
            <div className="py-2.5 border-b border-dashed border-current/25 text-[10px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="opacity-60">ORDER NO:</span>
                <span className="font-semibold">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">DATE:</span>
                <span>{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">PAYMENT:</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-2.5 h-2.5 opacity-70" />
                  <span>{paymentMethod}</span>
                </span>
              </div>
            </div>

            {/* Items Breakdown Table */}
            <div className="py-3 border-b border-dashed border-current/25 space-y-2">
              <div className="flex justify-between text-[9px] font-bold opacity-60 uppercase">
                <span>ITEM</span>
                <span>PRICE</span>
              </div>

              {receiptItems.map((itm, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[10px] items-baseline gap-2">
                    <span className="font-medium truncate">
                      {itm.quantity && itm.quantity > 1 ? `${itm.quantity}x ` : ''}
                      {itm.name}
                    </span>
                    <span className="font-semibold shrink-0">
                      {typeof itm.price === 'number' ? `${currency}${itm.price.toFixed(2)}` : itm.price}
                    </span>
                  </div>
                  {itm.description && (
                    <p className="text-[9px] opacity-60 italic">{itm.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="py-2.5 border-b border-dashed border-current/25 text-[10px] space-y-1">
              {subtotal && (
                <div className="flex justify-between opacity-70">
                  <span>SUBTOTAL:</span>
                  <span>{typeof subtotal === 'number' ? `${currency}${subtotal.toFixed(2)}` : subtotal}</span>
                </div>
              )}
              {discount && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>DISCOUNT:</span>
                  <span>-{typeof discount === 'number' ? `${currency}${discount.toFixed(2)}` : discount}</span>
                </div>
              )}
              {tax && (
                <div className="flex justify-between opacity-70">
                  <span>TAX (0%):</span>
                  <span>{typeof tax === 'number' ? `${currency}${tax.toFixed(2)}` : tax}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline text-xs font-bold pt-1 border-t border-current/15">
                <span>TOTAL:</span>
                <span className="text-sm">
                  {typeof total === 'number' ? `${currency}${total.toFixed(2)}` : total}
                </span>
              </div>
            </div>

            {/* Barcode & Bottom Perforation */}
            {showBarcode && (
              <div className="pt-3 pb-1 text-center flex flex-col items-center">
                {/* SVG Barcode */}
                <div className="w-full max-w-[200px] h-7 opacity-80 flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 160 40"
                    fill="currentColor"
                  >
                    {/* Authentic thermal barcode pattern */}
                    <rect x="0" y="0" width="3" height="40" />
                    <rect x="5" y="0" width="1.5" height="40" />
                    <rect x="9" y="0" width="4" height="40" />
                    <rect x="15" y="0" width="2" height="40" />
                    <rect x="19" y="0" width="1" height="40" />
                    <rect x="22" y="0" width="3" height="40" />
                    <rect x="27" y="0" width="1.5" height="40" />
                    <rect x="31" y="0" width="5" height="40" />
                    <rect x="38" y="0" width="2" height="40" />
                    <rect x="42" y="0" width="1" height="40" />
                    <rect x="45" y="0" width="4" height="40" />
                    <rect x="51" y="0" width="2" height="40" />
                    <rect x="55" y="0" width="1.5" height="40" />
                    <rect x="58" y="0" width="3" height="40" />
                    <rect x="63" y="0" width="5" height="40" />
                    <rect x="70" y="0" width="1.5" height="40" />
                    <rect x="73" y="0" width="3" height="40" />
                    <rect x="78" y="0" width="2" height="40" />
                    <rect x="82" y="0" width="4" height="40" />
                    <rect x="88" y="0" width="1.5" height="40" />
                    <rect x="92" y="0" width="3" height="40" />
                    <rect x="97" y="0" width="1" height="40" />
                    <rect x="100" y="0" width="4" height="40" />
                    <rect x="106" y="0" width="2" height="40" />
                    <rect x="110" y="0" width="3" height="40" />
                    <rect x="115" y="0" width="1.5" height="40" />
                    <rect x="118" y="0" width="5" height="40" />
                    <rect x="125" y="0" width="2" height="40" />
                    <rect x="129" y="0" width="1" height="40" />
                    <rect x="132" y="0" width="4" height="40" />
                    <rect x="138" y="0" width="2" height="40" />
                    <rect x="142" y="0" width="1.5" height="40" />
                    <rect x="145" y="0" width="3" height="40" />
                    <rect x="150" y="0" width="2" height="40" />
                    <rect x="154" y="0" width="4" height="40" />
                    <rect x="159" y="0" width="1" height="40" />
                  </svg>
                </div>
                <span className="text-[8px] font-mono tracking-widest opacity-60 mt-1">
                  * {orderNumber.replace('#', '')} *
                </span>
              </div>
            )}

            {/* Friendly Message & EasyUI Stamp */}
            <div className="pt-2 text-center text-[9px] opacity-70">
              <p className="font-medium">{message}</p>
              <p className="text-[8px] opacity-50 mt-0.5">AUTH #99824 · EASYUI ECOSYSTEM</p>
            </div>

            {/* Bottom Serrated Edge (if enabled) */}
            {showCutEffect && (
              <div className="absolute bottom-0 inset-x-0 h-1.5 overflow-hidden flex translate-y-full">
                <svg
                  className={cn(
                    'w-full h-1.5',
                    isDarkPaper ? 'text-[#0E0E0E]' : paperTheme === 'cream' ? 'text-[#FDFBF7]' : 'text-[#F9F9F8]'
                  )}
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                >
                  <polygon
                    fill="currentColor"
                    points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 4. Action Control Bar (Replay, Copy, Print) */}
      {showActions && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={defaultSpringSnappy}
          className="mt-3 flex items-center justify-center gap-2 w-full"
        >
          <button
            type="button"
            onClick={handleReplay}
            disabled={isPrinting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#A1A1A1] hover:text-[#FAFAFA] transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-ring cursor-pointer"
            title="Replay printing animation"
          >
            <RotateCcw className={cn('w-3.5 h-3.5', isPrinting && 'animate-spin')} />
            <span>Replay Print</span>
          </button>

          <button
            type="button"
            onClick={handleCopyOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#A1A1A1] hover:text-[#FAFAFA] transition-all focus-ring cursor-pointer"
            title="Copy order number"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#525252]" />
                <span>Copy Order</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};
