"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { CircleUserRound } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  MoneyCard — balance, quick-send contacts, last transaction, Send / Receive */
/*  Deps: react 19, react-dom, framer-motion, tailwindcss. Nothing else.       */
/*                                                                             */
/*  The component is CONTROLLED: you own `balance` + `transactions`, and it    */
/*  calls `onSend` / `onRequest` (promises). Resolve = success screen, reject  */
/*  = inline error. Update your state/server inside those handlers.            */
/*  See <MoneyCardDemo /> at the bottom for a complete wiring example.         */
/* -------------------------------------------------------------------------- */

export type Contact = {
  id: string;
  name: string;
  /** Emoji, Lucide icon, or an image URL (https:, /, data:) */
  avatar: ReactNode;
  /** Avatar background color */
  tint: string;
};

export type Transaction = {
  id: string;
  title: string;
  date: Date | string | number;
  /** Signed, in major units. Negative = money out, positive = money in */
  amount: number;
  /** Emoji / image URL / any node. Falls back to an arrow icon */
  icon?: ReactNode;
};

export type TransferRequest = { contact: Contact; amount: number; note: string };

export type MoneyCardProps = {
  user?: { name: string; avatar: ReactNode };
  balance?: number;
  contacts?: Contact[];
  /** Newest first */
  transactions?: Transaction[];
  onSend?: (req: TransferRequest) => Promise<void>;
  onRequest?: (req: TransferRequest) => Promise<void>;
  /** Override what "View all" does (default: opens the built-in activity list) */
  onViewAll?: () => void;
  currency?: string;
  locale?: string;
  /** Shown in settings and on the receive sheet with a copy button */
  paymentLink?: string;
  className?: string;
  style?: CSSProperties;
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const MAX_INT_DIGITS = 8;
const MAX_VISIBLE_CONTACTS = 5;
const BLUE =
  "radial-gradient(120% 95% at 36% 0%, #e6edff 0%, #b4c8f7 24%, #6f98ee 52%, #4f80e8 78%, #4a79e3 100%)";

/* --------------------------------- Helpers --------------------------------- */

const isSrc = (s: string) => /^(https?:|\/|data:|blob:)/.test(s);
const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

function useMoney(locale: string, currency: string) {
  return useMemo(() => {
    const nf = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const grouped = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const symbol =
      new Intl.NumberFormat(locale, { style: "currency", currency })
        .formatToParts(0)
        .find((p) => p.type === "currency")?.value ?? currency;
    const decimal = nf.formatToParts(1.1).find((p) => p.type === "decimal")?.value ?? ".";
    return {
      symbol,
      decimal,
      num: (v: number) => nf.format(v),
      int: (n: number) => grouped.format(n),
      full: (v: number) => `${symbol}${nf.format(v)}`,
    };
  }, [locale, currency]);
}
type Money = ReturnType<typeof useMoney>;

function fmtDate(d: Date | string | number, locale: string) {
  const date = new Date(d);
  const day = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
  return `${day} · ${time}`;
}

// Keypad logic on a raw string like "12.5" — avoids float math entirely
function press(raw: string, key: string): string {
  if (key === "⌫") return raw.slice(0, -1);
  if (key === ".") return raw.includes(".") ? raw : raw === "" ? "0." : `${raw}.`;
  if (raw.includes(".")) return raw.split(".")[1].length >= 2 ? raw : raw + key;
  if (raw.length >= MAX_INT_DIGITS) return raw;
  if (raw === "0") return key === "0" ? raw : key;
  return raw + key;
}
function showRaw(raw: string, m: Money) {
  const [i = "", d = ""] = raw.split(".");
  const int = m.int(Number(i || "0"));
  return raw.includes(".") ? `${int}${m.decimal}${d}` : int;
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/* ---------------------------------- Icons ---------------------------------- */

function Ico({ d, className = "h-5 w-5", sw = 1.8 }: { d: string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}
const P = {
  up: "M12 20V5M6 11l6-6 6 6",
  down: "M12 4v15M6 13l6 6 6-6",
  swap: "M7 20V5M3.5 8.5 7 5l3.5 3.5M17 4v15M13.5 15.5 17 19l3.5-3.5",
  close: "M6 6l12 12M18 6 6 18",
  back: "M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9L3 12ZM12.5 9.5l5 5M17.5 9.5l-5 5",
  copy: "M9 9h10v10H9zM5 15V5h10",
};

function HexIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" aria-hidden>
      <path d="M12 2.6 20.2 7.3v9.4L12 21.4 3.8 16.7V7.3Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function BallIcon() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9c4f6" />
          <stop offset="55%" stopColor="#b98be8" />
          <stop offset="100%" stopColor="#f0a7c8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="19" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round">
        <path d="M7 19c10 4 23 4 34-3" />
        <path d="M9 35c9-8 20-9 31-2" />
        <path d="M19 5.5c5 10 5 27-1 37" />
      </g>
    </svg>
  );
}

/* --------------------------------- Avatars --------------------------------- */

function Face({ src }: { src: ReactNode }) {
  if (typeof src === "string") {
    return isSrc(src) ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
    ) : (
      <span aria-hidden className="flex h-full w-full items-center justify-center leading-none">
        {src}
      </span>
    );
  }
  return (
    <span aria-hidden className="flex h-full w-full items-center justify-center">
      {src}
    </span>
  );
}

function TxIcon({ tx }: { tx: Transaction }) {
  const icon = tx.icon;
  return (
    <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-white text-[1.3em] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
      {typeof icon === "string" ? (
        <Face src={icon} />
      ) : icon ? (
        icon
      ) : (
        <Ico d={tx.amount < 0 ? P.up : P.down} className="h-[45%] w-[45%] text-neutral-600" />
      )}
    </span>
  );
}

/* ------------------------------ Animated number ----------------------------- */

function AnimatedAmount({ value, format }: { value: number; format: (v: number) => string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, format);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const c = animate(mv, value, { duration: reduce ? 0 : 0.9, ease: EASE_OUT });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}

/* ---------------------------------- Sheet ---------------------------------- */
// Bottom sheet on phones (drag handle to dismiss), centered dialog on desktop.

function Sheet({
  open,
  title,
  labelId,
  onClose,
  onExited,
  children,
}: {
  open: boolean;
  title: string;
  labelId: string;
  onClose: () => void;
  onExited: () => void;
  children: ReactNode;
}) {
  const desktop = useMedia("(min-width: 640px)");
  const reduce = useReducedMotion();
  const drag = useDragControls();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock page scroll without layout shift
  useEffect(() => {
    if (!open) return;
    const b = document.body;
    const prev = { o: b.style.overflow, p: b.style.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    b.style.overflow = "hidden";
    if (gap > 0) b.style.paddingRight = `${gap}px`;
    return () => {
      b.style.overflow = prev.o;
      b.style.paddingRight = prev.p;
    };
  }, [open]);

  useEffect(() => {
    if (open) ref.current?.focus({ preventScroll: true });
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !ref.current) return;
    const f = Array.from(ref.current.querySelectorAll<HTMLElement>('button:not(:disabled), input, [href]'));
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const enter = desktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 };
  const leave = desktop ? { opacity: 0, scale: 0.96, y: 12 } : { y: "100%" };

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <motion.div
          key="layer"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelId}
              tabIndex={-1}
              onKeyDown={onKeyDown}
              className="pointer-events-auto relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white text-neutral-900 shadow-2xl outline-none sm:max-h-[min(88dvh,740px)] sm:max-w-[420px] sm:rounded-[28px] [&_h2]:!text-neutral-900 [&_h3]:!text-neutral-900"
              style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
              initial={leave}
              animate={enter}
              exit={leave}
              transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.1 }}
              drag={desktop ? false : "y"}
              dragListener={false}
              dragControls={drag}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 600) onClose();
              }}
            >
              <div
                className="flex touch-none flex-col items-center px-5 pt-2.5 sm:pt-4"
                onPointerDown={(e) => !desktop && drag.start(e)}
              >
                <span className="h-1 w-9 rounded-full bg-neutral-200 sm:hidden" aria-hidden />
                <div className="mt-1 flex h-12 w-full items-center justify-between">
                  <h2 id={labelId} className="text-[18px] font-semibold tracking-[-0.01em] text-neutral-900 !text-neutral-900">
                    {title}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="Close"
                    className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-neutral-500 outline-none transition-[background-color,transform] duration-150 active:scale-[0.94] focus-visible:ring-2 focus-visible:ring-blue-500/60 [@media(hover:hover)]:hover:bg-neutral-100"
                  >
                    <Ico d={P.close} />
                  </button>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(20px,env(safe-area-inset-bottom))]">
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ------------------------------ Sheet contents ------------------------------ */

function CopyLink({ link, className = "" }: { link: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-[14px] font-medium text-neutral-600 outline-none transition-[background-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-blue-500/60 [@media(hover:hover)]:hover:bg-neutral-100 ${className}`}
    >
      <Ico d={P.copy} className="h-4 w-4" />
      <span aria-live="polite">{copied ? "Link copied" : link}</span>
    </button>
  );
}

function TransferSheet({
  mode,
  contacts,
  initialContactId,
  balance,
  money: m,
  paymentLink,
  onSubmit,
  onClose,
  lock,
}: {
  mode: "send" | "request";
  contacts: Contact[];
  initialContactId?: string;
  balance: number;
  money: Money;
  paymentLink?: string;
  onSubmit: (req: TransferRequest) => Promise<void>;
  onClose: () => void;
  lock: React.RefObject<boolean>;
}) {
  const [contactId, setContactId] = useState<string | null>(initialContactId ?? null);
  const [raw, setRaw] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ amount: number; name: string } | null>(null);

  const contact = contacts.find((c) => c.id === contactId) ?? null;
  const cents = Math.round(parseFloat(raw || "0") * 100);
  const over = mode === "send" && cents > Math.round(balance * 100);
  const valid = !!contact && cents > 0 && !over;
  const isSend = mode === "send";

  useEffect(() => {
    lock.current = status === "pending";
    return () => {
      lock.current = false;
    };
  }, [status, lock]);

  const submit = async () => {
    if (!valid || !contact || status === "pending") return;
    setStatus("pending");
    setError(null);
    try {
      await onSubmit({ contact, amount: cents / 100, note: note.trim() });
      setDone({ amount: cents / 100, name: contact.name });
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (status === "pending" || done) return;
    const t = e.target as HTMLElement;
    if (t.tagName === "INPUT") {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[0-9.,]$/.test(e.key)) {
      e.preventDefault();
      setError(null);
      setRaw((r) => press(r, e.key === "," ? "." : e.key));
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setRaw((r) => press(r, "⌫"));
    } else if (e.key === "Enter" && t.tagName !== "BUTTON") {
      e.preventDefault();
      submit();
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center px-2 pb-2 pt-6 text-center">
        <motion.div
          className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-600" aria-hidden>
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: EASE_OUT }}
            />
          </svg>
        </motion.div>
        <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-neutral-900 !text-neutral-900" role="status">
          {isSend ? "Money sent" : "Request sent"}
        </h3>
        <p className="mt-1 text-[15px] text-neutral-500 !text-neutral-500">
          {isSend
            ? `${m.full(done.amount)} to ${done.name}`
            : `${done.name} was asked for ${m.full(done.amount)}`}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 h-14 w-full rounded-full bg-neutral-900 text-[17px] font-semibold text-white outline-none transition-transform duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
        >
          Done
        </button>
      </div>
    );
  }

  const shown = showRaw(raw, m);
  const size = shown.length > 11 ? 34 : shown.length > 8 ? 44 : 56;
  const label = status === "pending"
    ? isSend ? "Sending…" : "Requesting…"
    : !contact ? "Choose a recipient"
      : cents === 0 ? "Enter an amount"
        : over ? "Not enough balance"
          : `${isSend ? "Send" : "Request"} ${m.full(cents / 100)} ${isSend ? "to" : "from"} ${contact.name}`;

  return (
    <div onKeyDown={onKeyDown} className="flex flex-col gap-3.5 pt-1">
      <div role="group" aria-label="Choose a contact" className="flex justify-between gap-1">
        {contacts.slice(0, MAX_VISIBLE_CONTACTS).map((c) => {
          const on = c.id === contactId;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setContactId(c.id)}
              className="flex w-[60px] flex-col items-center gap-1.5 rounded-2xl py-1 outline-none transition-transform duration-150 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              <span
                className={`grid h-[52px] w-[52px] place-items-center overflow-hidden rounded-full text-[26px] transition-[box-shadow,opacity] duration-200 ${on ? "opacity-100 ring-2 ring-neutral-900 ring-offset-2" : contactId ? "opacity-55" : "opacity-100"
                  }`}
                style={{ background: c.tint }}
              >
                <Face src={c.avatar} />
              </span>
              <span className={`max-w-full truncate text-[12px] ${on ? "font-medium text-neutral-900" : "text-neutral-500"}`}>
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <div
          className="flex items-baseline justify-center gap-2 font-semibold tabular-nums tracking-[-0.03em]"
          style={{ fontSize: size }}
          aria-label={`Amount ${m.symbol}${shown}`}
        >
          <span className="text-neutral-300">{m.symbol}</span>
          <span className={raw ? "text-neutral-900" : "text-neutral-300"}>{shown}</span>
        </div>
        <p
          className={`mt-1 h-5 text-[13px] ${over ? "text-red-600" : "text-neutral-400"}`}
          role={over ? "alert" : undefined}
        >
          {over
            ? "That's more than your balance"
            : isSend
              ? `Balance ${m.full(balance)}`
              : contact
                ? `Requesting from ${contact.name}`
                : "Choose who to request from"}
        </p>
      </div>

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={40}
        placeholder="Add a note"
        aria-label="Note (optional)"
        enterKeyHint="send"
        className="h-11 w-full rounded-2xl bg-neutral-100 px-4 text-[16px] text-neutral-900 !text-neutral-900 outline-none transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500/50"
      />

      <div className="grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((k) => (
          <button
            key={k}
            type="button"
            aria-label={k === "⌫" ? "Delete" : k === "." ? "Decimal point" : k}
            onClick={() => {
              setError(null);
              setRaw((r) => press(r, k));
            }}
            className="grid h-[50px] place-items-center rounded-2xl bg-neutral-100 text-[22px] font-medium tabular-nums text-neutral-900 !text-neutral-900 outline-none transition-[background-color,transform] duration-100 active:scale-[0.95] active:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-blue-500/60 [-webkit-tap-highlight-color:transparent]"
          >
            {k === "⌫" ? <Ico d={P.back} className="h-6 w-6" /> : k}
          </button>
        ))}
      </div>

      <div className="min-h-5 text-center" aria-live="polite">
        {error && (
          <p role="alert" className="text-[13px] text-red-600">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!valid || status === "pending"}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-neutral-900 text-[17px] font-semibold text-white outline-none transition-[background-color,color,transform] duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:active:scale-100"
      >
        {status === "pending" && (
          <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        <span className="truncate px-2">{label}</span>
      </button>

      {!isSend && paymentLink && (
        <div className="flex justify-center">
          <CopyLink link={paymentLink} />
        </div>
      )}
    </div>
  );
}

function ActivityList({ transactions, money: m, locale }: { transactions: Transaction[]; money: Money; locale: string }) {
  if (!transactions.length) {
    return <p className="py-10 text-center text-[15px] text-neutral-400">No transactions yet</p>;
  }
  return (
    <ul className="flex flex-col pt-1">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center gap-3 border-b border-neutral-100 py-3 last:border-0">
          <span className="h-11 w-11 shrink-0 text-[22px]">
            <TxIcon tx={t} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium">{t.title}</span>
            <span className="block text-[13px] text-neutral-400">{fmtDate(t.date, locale)}</span>
          </span>
          <span
            className={`text-[16px] font-semibold tabular-nums ${t.amount > 0 ? "text-emerald-600" : "text-neutral-900"}`}
          >
            {t.amount > 0 ? "+" : ""}
            {m.full(Math.abs(t.amount))}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-[52px] shrink-0 rounded-full outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 ${checked ? "bg-neutral-900" : "bg-neutral-200"
        }`}
    >
      <motion.span
        className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-sm"
        initial={false}
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
      />
    </button>
  );
}

/* -------------------------------- Main card -------------------------------- */

type SheetConfig =
  | { type: "send" | "request"; contactId?: string }
  | { type: "activity" }
  | { type: "settings" };

const SHEET_TITLES = { send: "Send money", request: "Receive money", activity: "Activity", settings: "Settings" } as const;

const circleBtn =
  "relative grid shrink-0 place-items-center rounded-full text-neutral-800 outline-none transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-blue-500/60 [-webkit-tap-highlight-color:transparent]";
const lightSurface: CSSProperties = {
  background: "linear-gradient(180deg,#ffffff 0%,#f1f1f3 100%)",
  boxShadow: "inset 0 1px 0 #fff, 0 1px 1px rgba(0,0,0,0.05), 0 6px 14px -6px rgba(0,0,0,0.14)",
};
const actionH = "clamp(46px,13.2cqw,62px)";

export const DEFAULT_USER = {
  name: "Ana",
  avatar: <CircleUserRound className="h-[65%] w-[65%] text-neutral-800" strokeWidth={2} />,
};

export const DEFAULT_CONTACTS: Contact[] = [
  {
    id: "zane",
    name: "Zane",
    avatar: "🦖",
    tint: "#a6e3b0",
  },
  {
    id: "maya",
    name: "Maya",
    avatar: "🐱",
    tint: "#d3c8f7",
  },
  {
    id: "remy",
    name: "Remy",
    avatar: "🦊",
    tint: "#f7b5bc",
  },
  {
    id: "arjun",
    name: "Arjun",
    avatar: "🐼",
    tint: "#ecc9a6",
  },
  {
    id: "nova",
    name: "Nova",
    avatar: <CircleUserRound className="h-[54%] w-[54%] text-[#0d4b73]" strokeWidth={2.2} />,
    tint: "#aedcf9",
  },
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: "t0", title: "Dribbble Pro", date: new Date().toISOString(), amount: -60, icon: <BallIcon /> },
  { id: "t1", title: "Elena Rostova", date: new Date(Date.now() - 3600000 * 4).toISOString(), amount: 350 },
  { id: "t2", title: "Coffee Roasters", date: new Date(Date.now() - 86400000).toISOString(), amount: -14.5 },
];

export function MoneyCard({
  user = DEFAULT_USER,
  balance = 52002.5,
  contacts = DEFAULT_CONTACTS,
  transactions = DEFAULT_TRANSACTIONS,
  onSend,
  onRequest,
  onViewAll,
  currency = "USD",
  locale = "en-US",
  paymentLink = "pay.example/ana",
  className = "",
  style,
}: MoneyCardProps) {
  const reduce = useReducedMotion();
  const m = useMoney(locale, currency);
  const labelId = useId();

  const [sheet, setSheet] = useState<SheetConfig | null>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [info, setInfo] = useState(false);

  const opener = useRef<HTMLElement | null>(null);
  const locked = useRef(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const defaultSend = async (_req: TransferRequest) => {
    await new Promise((r) => setTimeout(r, 600));
  };
  const defaultRequest = async (_req: TransferRequest) => {
    await new Promise((r) => setTimeout(r, 600));
  };

  const handleSend = onSend ?? defaultSend;
  const handleRequest = onRequest ?? defaultRequest;

  const show = (c: SheetConfig) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSheet(c);
    setOpen(true);
    setInfo(false);
  };
  const close = () => {
    if (!locked.current) setOpen(false); // can't dismiss mid-payment
  };

  // Info popover: outside click + Escape
  useEffect(() => {
    if (!info) return;
    const down = (e: PointerEvent) => {
      if (!infoRef.current?.contains(e.target as Node)) setInfo(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setInfo(false);
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [info]);

  const last = transactions[0];
  const people = contacts.slice(0, MAX_VISIBLE_CONTACTS);

  return (
    <div
      className={`mx-auto w-full max-w-[480px] font-sans ${className}`}
      style={{
        containerType: "inline-size",
        fontFamily: "var(--font-sans, 'Geist', sans-serif)",
        ...style,
      }}
    >
      <section
        aria-label="Wallet"
        className="relative rounded-[clamp(28px,8cqw,40px)] p-[3cqw]"
        style={
          {
            "--av": "clamp(44px,12.6cqw,62px)",
            background: "linear-gradient(180deg,#ffffff 0%,#f6f6f7 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.04), 0 10px 20px -10px rgba(20,30,60,0.14), 0 40px 70px -30px rgba(20,30,60,0.28)",
          } as CSSProperties
        }
      >
        {/* Balance panel */}
        <div
          className="relative px-[5cqw] pt-[4.6cqw]"
          style={{
            paddingBottom: "calc(var(--av) / 2 + 4.4cqw)",
            borderRadius:
              "clamp(26px,11cqw,52px) clamp(26px,11cqw,52px) clamp(30px,13cqw,62px) clamp(30px,13cqw,62px)",
            background: BLUE,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 18px 30px -20px rgba(59,100,210,0.6)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-[2cqw]">
              <span
                className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-white/70 ring-2 ring-white/60"
                style={{ width: "clamp(28px,7.4cqw,36px)", height: "clamp(28px,7.4cqw,36px)", fontSize: "clamp(16px,4.2cqw,20px)" }}
              >
                <Face src={user.avatar} />
              </span>
              <span className="truncate text-[clamp(13px,3.5cqw,16px)] font-medium text-white/85">{user.name}</span>
            </div>

            <div ref={infoRef} className="relative">
              <button
                type="button"
                onClick={() => setInfo((v) => !v)}
                aria-label="About your balance"
                aria-expanded={info}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-[14px] font-semibold text-white ring-1 ring-white/30 outline-none transition-transform duration-150 active:scale-[0.94] focus-visible:ring-2 focus-visible:ring-white [@media(hover:hover)]:hover:bg-white/30"
              >
                i
              </button>
              <AnimatePresence>
                {info && (
                  <motion.div
                    role="status"
                    className="absolute right-0 top-[calc(100%+8px)] z-20 w-[210px] origin-top-right rounded-2xl bg-white p-3 text-[13px] leading-snug text-neutral-600 shadow-xl ring-1 ring-black/5"
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: reduce ? 0 : 0.16, ease: EASE_OUT }}
                  >
                    Your available balance. It updates the moment a payment is sent or received.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-[1.6cqw] flex justify-center">
            <span className="rounded-full border border-white/35 bg-white/15 px-[3.4cqw] py-[1.2cqw] text-[clamp(10px,2.9cqw,13px)] font-medium uppercase tracking-[0.05em] text-white/85">
              Your balance
            </span>
          </div>

          <p
            aria-hidden
            className="mt-[4.4cqw] text-center font-semibold leading-none tracking-[-0.035em] text-white tabular-nums"
            style={{ fontSize: "clamp(30px,10.6cqw,54px)" }}
          >
            {hidden ? (
              <>
                {m.symbol} ••••••
              </>
            ) : (
              <>
                {m.symbol} <AnimatedAmount value={balance} format={m.num} />
              </>
            )}
          </p>
          <span className="sr-only" aria-live="polite">
            {hidden ? "Balance hidden" : `Balance ${m.full(balance)}`}
          </span>
        </div>

        {/* Quick-send contacts straddle the panel edge */}
        <div
          role="group"
          aria-label="Send money to a recent contact"
          className="relative z-10 flex justify-center gap-[2.2cqw]"
          style={{ marginTop: "calc(var(--av) / -2)" }}
        >
          {people.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              aria-label={`Send money to ${c.name}`}
              onClick={() => show({ type: "send", contactId: c.id })}
              whileTap={reduce ? undefined : { scale: 0.93 }}
              transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
              className="grid shrink-0 place-items-center overflow-hidden rounded-full outline-none transition-transform duration-200 ease-out focus-visible:ring-2 focus-visible:ring-blue-600 [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:-translate-y-[3px]"
              style={{
                width: "var(--av)",
                height: "var(--av)",
                fontSize: "calc(var(--av) * 0.56)",
                background: c.tint,
                boxShadow: `0 0 0 3px color-mix(in srgb, ${c.tint} 45%, white), 0 8px 16px -6px rgba(40,70,140,0.35)`,
              }}
            >
              <Face src={c.avatar} />
            </motion.button>
          ))}
        </div>

        {/* Last transaction */}
        <div
          className="mt-[3.4cqw] rounded-[clamp(22px,6.4cqw,32px)] p-[4.6cqw]"
          style={{
            background: "linear-gradient(180deg,#fcfcfc 0%,#f4f4f5 100%)",
            boxShadow: "inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center justify-between text-[clamp(12px,3.4cqw,15px)]">
            <span className="text-neutral-400">Last transaction</span>
            <button
              type="button"
              onClick={() => (onViewAll ? onViewAll() : show({ type: "activity" }))}
              className="-m-2 rounded-lg p-2 text-neutral-800 underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 [-webkit-tap-highlight-color:transparent]"
            >
              View all
            </button>
          </div>

          <div className="relative mt-[3cqw] min-h-[clamp(44px,12cqw,56px)]">
            <AnimatePresence mode="popLayout" initial={false}>
              {last ? (
                <motion.div
                  key={last.id}
                  className="flex items-center gap-[3.2cqw]"
                  initial={{ opacity: 0, y: reduce ? 0 : 14, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10, filter: "blur(3px)" }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
                >
                  <span className="shrink-0" style={{ width: "clamp(44px,12.4cqw,58px)", height: "clamp(44px,12.4cqw,58px)", fontSize: "clamp(20px,5.6cqw,26px)" }}>
                    <TxIcon tx={last} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[clamp(15px,4.2cqw,19px)] font-semibold tracking-[-0.01em] text-neutral-900">
                      {last.title}
                    </span>
                    <span className="mt-0.5 block text-[clamp(12px,3.3cqw,15px)] text-neutral-400">
                      {fmtDate(last.date, locale)}
                    </span>
                  </span>
                  <span
                    className={`self-end text-[clamp(18px,5.2cqw,24px)] font-semibold tabular-nums tracking-[-0.02em] ${last.amount > 0 ? "text-emerald-600" : "text-neutral-900"
                      }`}
                  >
                    {last.amount > 0 ? "+" : ""}
                    {m.full(Math.abs(last.amount))}
                  </span>
                </motion.div>
              ) : (
                <motion.p key="empty" className="py-3 text-[15px] text-neutral-400" initial={false}>
                  No transactions yet
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-[3.4cqw] flex items-center gap-[1.8cqw]">
          <button
            type="button"
            aria-label="Settings"
            onClick={() => show({ type: "settings" })}
            className={circleBtn}
            style={{ ...lightSurface, width: actionH, height: actionH }}
          >
            <HexIcon />
          </button>
          <button
            type="button"
            aria-label="Activity"
            onClick={() => show({ type: "activity" })}
            className={circleBtn}
            style={{ ...lightSurface, width: actionH, height: actionH }}
          >
            <Ico d={P.swap} className="h-[22px] w-[22px]" />
          </button>
          <button
            type="button"
            onClick={() => show({ type: "request" })}
            className="relative flex min-w-0 flex-[1.15] items-center justify-center gap-[1.4cqw] rounded-full text-[clamp(15px,4.6cqw,21px)] font-medium text-neutral-900 outline-none transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-blue-500/60 [-webkit-tap-highlight-color:transparent]"
            style={{ ...lightSurface, height: actionH }}
          >
            Receive <Ico d={P.down} className="h-[1.1em] w-[1.1em]" sw={2} />
          </button>
          <button
            type="button"
            onClick={() => show({ type: "send" })}
            className="relative flex min-w-0 flex-1 items-center justify-center gap-[1.4cqw] overflow-hidden rounded-full text-[clamp(15px,4.6cqw,21px)] font-medium text-white outline-none transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 [-webkit-tap-highlight-color:transparent]"
            style={{
              height: actionH,
              background: "linear-gradient(180deg,#2b2b2e 0%,#000 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 20px -8px rgba(0,0,0,0.55)",
            }}
          >
            <span aria-hidden className="pointer-events-none absolute left-[12%] top-[4%] h-[46%] w-[46%] rounded-full bg-white/25 blur-[9px]" />
            <span className="relative">Send</span>
            <Ico d={P.up} className="relative h-[1.1em] w-[1.1em]" sw={2} />
          </button>
        </div>
      </section>

      <Sheet
        open={open}
        title={sheet ? SHEET_TITLES[sheet.type] : ""}
        labelId={labelId}
        onClose={close}
        onExited={() => {
          setSheet(null);
          opener.current?.focus?.({ preventScroll: true });
        }}
      >
        {sheet && (sheet.type === "send" || sheet.type === "request") && (
          <TransferSheet
            mode={sheet.type}
            contacts={contacts}
            initialContactId={sheet.contactId}
            balance={balance}
            money={m}
            paymentLink={paymentLink}
            onSubmit={sheet.type === "send" ? handleSend : handleRequest}
            onClose={close}
            lock={locked}
          />
        )}
        {sheet?.type === "activity" && <ActivityList transactions={transactions} money={m} locale={locale} />}
        {sheet?.type === "settings" && (
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 p-4">
              <div>
                <p className="text-[15px] font-medium">Hide balance</p>
                <p className="text-[13px] text-neutral-500">Mask your balance on the card</p>
              </div>
              <Switch checked={hidden} onChange={setHidden} label="Hide balance" />
            </div>
            {paymentLink && (
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-[15px] font-medium">Your payment link</p>
                <p className="mb-1 text-[13px] text-neutral-500">Anyone with this link can pay you</p>
                <CopyLink link={paymentLink} className="-ml-4" />
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
}

/* ----------------------------- Demo / wiring example ------------------------ */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const round2 = (n: number) => Math.round(n * 100) / 100;

export function MoneyCardDemo() {
  const [balance, setBalance] = useState(52002.5);
  const [txs, setTxs] = useState<Transaction[]>(() => {
    const d = new Date();
    d.setMonth(0, 17);
    d.setHours(20, 12, 0, 0);
    return [{ id: "t0", title: "Dribbble Pro", date: d, amount: -60, icon: <BallIcon /> }];
  });

  const record = (title: string, icon: ReactNode, amount: number) => {
    setBalance((b) => round2(b + amount));
    setTxs((p) => [{ id: uid(), title, icon, date: new Date(), amount }, ...p]);
  };

  const onSend = async ({ contact, amount }: TransferRequest) => {
    await wait(900); // API call simulation
    if (amount > balance) throw new Error("Insufficient funds");
    record(`To ${contact.name}`, contact.avatar, -amount);
  };

  const onRequest = async ({ contact, amount }: TransferRequest) => {
    await wait(700); // API call simulation
    setTimeout(() => record(`From ${contact.name}`, contact.avatar, amount), 2600);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f0f0f1] p-4 sm:p-8 font-sans">
      <MoneyCard
        user={DEFAULT_USER}
        balance={balance}
        contacts={DEFAULT_CONTACTS}
        transactions={txs}
        onSend={onSend}
        onRequest={onRequest}
        paymentLink="pay.example/ana"
      />
    </div>
  );
}

export default MoneyCard;
