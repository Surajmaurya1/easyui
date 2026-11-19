"use client";

import {
  type ReactNode,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Wallet Balance — cards tucked in a pouch, tap the eye to reveal / hide      */
/*  Deps: react 19, framer-motion, tailwindcss. No other imports.              */
/*                                                                             */
/*  <WalletBalance />                                                          */
/*  <WalletBalance accounts={myAccounts} visible={v} onVisibleChange={setV} /> */
/* -------------------------------------------------------------------------- */

export type WalletAccount = {
  id: string;
  name: string;
  balance: number;
  /** Brand mark. Swap the typographic stand-ins for official SVGs here. */
  logo: ReactNode;
  /** Any CSS background color for the card */
  background: string;
  /** Color of the amount text on the card */
  amountColor?: string;
};

export type WalletBalanceProps = {
  /** Up to 3 accounts are shown (the layout fits three cards) */
  accounts?: WalletAccount[];
  /** Controlled visibility */
  visible?: boolean;
  /** Uncontrolled initial visibility (default true) */
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  /** ISO currency used on the cards (default "USD") */
  currency?: string;
  locale?: string;
  totalLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

/* ------------------------------ Design space ------------------------------- */
// Everything is authored on a 340×400 stage, then scaled to the container width.

const STAGE_W = 340;
const STAGE_H = 400;
const CARD_W = 266;
const CARD_H = 130;
const CARD_LEFT = (STAGE_W - CARD_W) / 2;
const HIDE_SCALE = 0.89;
const MAX_CARDS = 3;
const POCKET_TOP = 179;

const visibleTop = (i: number) => 13 + i * 49.5; // fanned out
const hiddenTop = (i: number) => 75 + i * 35; // tucked into the pouch

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const MONO = 'var(--font-mono, "JetBrains Mono", ui-monospace, "SF Mono", "Space Mono", Menlo, Consolas, monospace)';
const MASK = "******";

/* ------------------------------ Brand stand-ins ----------------------------- */

function StripeMark() {
  return (
    <span className="text-[22px] font-bold lowercase leading-none tracking-[-0.045em] text-white">
      stripe
    </span>
  );
}

function WiseMark() {
  return (
    <span className="flex items-center gap-[3px] text-[#163300]">
      <svg viewBox="0 0 17 16" className="h-[14px] w-[15px]" aria-hidden>
        <path fill="currentColor" d="M12.2 0 5 8.4h4.6L6.7 15.6 17 4.2h-5.1L14.4 0z" />
      </svg>
      <span className="text-[21px] font-extrabold italic uppercase leading-none tracking-[-0.04em]">
        wise
      </span>
    </span>
  );
}

function PayPalMark() {
  return (
    <span className="text-[21px] font-extrabold italic leading-none tracking-[-0.04em]">
      <span className="text-[#253b80]">Pay</span>
      <span className="text-[#179bd7]">Pal</span>
    </span>
  );
}

export const DEFAULT_ACCOUNTS: WalletAccount[] = [
  { id: "stripe", name: "Stripe", balance: 32495, logo: <StripeMark />, background: "#a9a6f0", amountColor: "#5f5c98" },
  { id: "wise", name: "Wise", balance: 45654, logo: <WiseMark />, background: "#a0d67b", amountColor: "#4f7a3b" },
  { id: "paypal", name: "PayPal", balance: 345865, logo: <PayPalMark />, background: "#dedede", amountColor: "#6d6d6d" },
];

/* ------------------------------- Small parts -------------------------------- */

// Crossfades between a real value and its mask. The real value is never in the
// DOM while hidden.
function Swap({
  show,
  value,
  mask = MASK,
  className = "",
  maskClassName = "",
}: {
  show: boolean;
  value: string;
  mask?: string;
  className?: string;
  maskClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={show ? "value" : "mask"}
          className={`whitespace-nowrap ${show ? className : maskClassName || className}`}
          initial={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(4px)" }}
          transition={{ duration: reduce ? 0 : 0.18, ease: EASE_OUT }}
        >
          {show ? value : mask}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  const t = { duration: reduce ? 0 : 0.28, ease: EASE_OUT };
  return (
    <motion.svg
      viewBox="0 0 34 24"
      className="h-[22px] w-[31px] overflow-visible"
      initial={false}
      animate={{ color: open ? "#a4d37e" : "#44593a" }}
      transition={t}
      aria-hidden
    >
      <path d="M1.5 12C5.5 5 10.5 1.5 17 1.5S28.5 5 32.5 12c-4 7-9 10.5-15.5 10.5S5.5 19 1.5 12Z" fill="currentColor" />
      <circle cx="17" cy="12" r="6.6" fill="#243420" />
      <circle cx="17" cy="12" r="3.6" fill="currentColor" />
      {/* slash draws in when hidden: dark underlay cuts the eye, light stroke on top */}
      <motion.path
        d="M5 22.5 29 1.5"
        stroke="#243420"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={{ pathLength: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={t}
      />
      <motion.path
        d="M5 22.5 29 1.5"
        stroke="#9aa890"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        initial={false}
        animate={{ pathLength: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={t}
      />
    </motion.svg>
  );
}

/* -------------------------------- Component --------------------------------- */

export function WalletBalance({
  accounts = DEFAULT_ACCOUNTS,
  visible,
  defaultVisible = true,
  onVisibleChange,
  currency = "USD",
  locale = "en-US",
  totalLabel = "Total Balance",
  className = "",
  style,
}: WalletBalanceProps) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  const [inner, setInner] = useState(defaultVisible);
  const isVisible = visible ?? inner;
  const toggle = () => {
    const next = !isVisible;
    if (visible === undefined) setInner(next);
    onVisibleChange?.(next);
  };

  const list = accounts.slice(0, MAX_CARDS);
  const total = useMemo(() => list.reduce((s, a) => s + a.balance, 0), [list]);
  const money = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );
  const plain = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale]);

  // Scale the fixed stage to whatever width we're given (mobile friendly)
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / STAGE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const spring = (delay: number) =>
    reduce ? { duration: 0 } : ({ type: "spring", duration: 0.5, bounce: 0.16, delay } as const);

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label="Wallet balances"
      className={`relative mx-auto w-full max-w-[400px] select-none ${className}`}
      style={{
        aspectRatio: `${STAGE_W} / ${STAGE_H}`,
        fontFamily: "var(--font-sans, 'Geist', sans-serif)",
        ...style,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
      >
        {/* Back of the pouch */}
        <svg
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          width={STAGE_W}
          height={STAGE_H}
          className="absolute inset-0"
          style={{ filter: "drop-shadow(0 22px 26px rgba(31,48,22,0.26))" }}
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-back`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35472b" />
              <stop offset="100%" stopColor="#2b3a22" />
            </linearGradient>
          </defs>
          <path
            d="M20 112C20 102 28 96 38 96H302C312 96 320 102 320 112V316A66 66 0 0 1 254 382H86A66 66 0 0 1 20 316Z"
            fill={`url(#${uid}-back)`}
          />
        </svg>

        {/* Cards */}
        {list.map((a, i) => {
          const n = list.length;
          const delay = (isVisible ? i : n - 1 - i) * 0.03;
          return (
            <motion.div
              key={a.id}
              className="absolute overflow-hidden rounded-[18px] will-change-transform"
              style={{
                left: CARD_LEFT,
                top: 0,
                width: CARD_W,
                height: CARD_H,
                zIndex: i + 1,
                transformOrigin: "50% 0%",
                background: `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0) 45%), ${a.background}`,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.65), 0 -1px 0 rgba(0,0,0,0.04), 0 6px 14px rgba(0,0,0,0.10)",
              }}
              initial={false}
              animate={{
                y: isVisible ? visibleTop(i) : hiddenTop(i),
                scale: isVisible ? 1 : HIDE_SCALE,
              }}
              transition={spring(delay)}
            >
              <div className="flex h-[40px] items-center justify-between px-[16px]">
                <span aria-label={a.name} className="flex items-center">
                  {a.logo}
                </span>
                <span
                  className="text-[15px] font-medium tabular-nums tracking-[0.05em]"
                  style={{ fontFamily: MONO, color: a.amountColor ?? "rgba(0,0,0,0.45)" }}
                >
                  <Swap show={isVisible} value={money.format(a.balance)} />
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Front pocket */}
        <svg
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          width={STAGE_W}
          height={STAGE_H}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 10 }}
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-front`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#273921" />
              <stop offset="100%" stopColor="#202e1a" />
            </linearGradient>
          </defs>
          <path
            d={`M30 198C30 188 41 ${POCKET_TOP} 54 ${POCKET_TOP}L286 ${POCKET_TOP}C299 ${POCKET_TOP + 1} 310 188 310 198V322A56 56 0 0 1 254 378H86A56 56 0 0 1 30 322Z`}
            fill={`url(#${uid}-front)`}
            stroke="rgba(255,255,255,0.05)"
          />
          <path
            d="M38 199C38 192 46 187 56 187L284 187C294 187 302 192 302 199V322A48 48 0 0 1 254 370H86A48 48 0 0 1 38 322Z"
            fill="none"
            stroke="rgba(170,196,146,0.55)"
            strokeWidth={1}
            strokeDasharray="4 3.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Total + toggle (above the pocket) */}
        <div className="absolute inset-x-0 text-center" style={{ top: 191, zIndex: 11 }}>
          <div className="flex h-[36px] items-center justify-center">
            <Swap
              show={isVisible}
              value={plain.format(total)}
              className="text-[28px] font-medium tabular-nums tracking-[0.1em] text-[#e0e6d8]"
              maskClassName="text-[26px] font-medium tracking-[0.34em] text-[#a2aa98]"
            />
          </div>
          <p className="mt-[2px] text-[15px] tracking-[0.01em] text-[#8c9b83]">{totalLabel}</p>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={isVisible}
          aria-label={isVisible ? "Hide balances" : "Show balances"}
          className="absolute flex h-[56px] w-[56px] items-center justify-center rounded-full outline-none transition-transform duration-150 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.92] focus-visible:ring-2 focus-visible:ring-[#a4d37e]/70"
          style={{ left: STAGE_W / 2 - 28, top: 306, zIndex: 12 }}
        >
          <EyeIcon open={isVisible} />
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {isVisible ? `Total balance ${plain.format(total)}` : "Balances hidden"}
      </span>
    </div>
  );
}

/* ---------------------------------- Demo ----------------------------------- */

export function WalletBalanceDemo() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-[#eef2d9] via-[#f3f4ee] to-[#f1f1f1] p-6">
      <WalletBalance className="max-w-[360px]" />
    </div>
  );
}

export default WalletBalance;
