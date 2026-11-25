"use client";

import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, animate } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Bookshelf — a shelf of real 3D books.                                      */
/*                                                                             */
/*   Hover (or keyboard focus): the book slides out and turns toward you so    */
/*   you can read the cover, and its neighbours part like a dock.              */
/*   Click / tap: it turns to face you, the cover swings open onto the title   */
/*   page, the shelf makes room, and the details unfold underneath.            */
/*                                                                             */
/*  • Pure CSS 3D (no images needed: covers + spines are generated)            */
/*  • Phones: horizontally scrollable shelf, tap to open, selected book        */
/*    scrolls to the middle                                                    */
/*  • Keyboard: ← → move between books · Enter opens · Esc closes              */
/*  • Light + dark · reduced-motion aware                                      */
/*                                                                             */
/*  One file · deps: react 19, framer-motion, tailwindcss.                     */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Types                                                                     */
/* ========================================================================== */

export interface BookItem {
  id: string;
  title: string;
  author: string;
  /** Cover + spine color, #rrggbb */
  color: string;
  /** Text color on the cover. Picked automatically if omitted */
  ink?: string;
  /** Rough page count: thicker books get thicker spines */
  pages?: number;
  /** A cover image URL. Without it, a clean typographic cover is generated */
  coverImage?: string;
  year?: string | number;
  description?: string;
  /** 0–5 */
  rating?: number;
  tags?: string[];
  /** "serif" suits classics, "sans" modern titles, "mono" technical ones (default: picked per book) */
  type?: "serif" | "sans" | "mono";
}

export interface BookshelfProps {
  books: BookItem[];
  /** Controlled: the id of the open book (or null) */
  openId?: string | null;
  onOpenChange?: (id: string | null, book?: BookItem) => void;
  /** Called by the default "Read" button */
  onRead?: (book: BookItem) => void;
  /** Replace the buttons shown for the open book */
  actions?: (book: BookItem, close: () => void) => ReactNode;
  ariaLabel?: string;
  className?: string;
}

/* ========================================================================== */
/*  Helpers                                                                   */
/* ========================================================================== */

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

function inkFor(hex: string) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#ffffff";
  const n = parseInt(m[1], 16);
  const lin = (c: number) => ((c / 255) <= 0.03928 ? c / 255 / 12.92 : (((c / 255) + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.4 ? "#1a1713" : "#ffffff";
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/70 dark:focus-visible:ring-white/40";

function useElementWidth<T extends HTMLElement>(initial: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initial);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.round(el.clientWidth) || initial);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [initial]);
  return [ref, width] as const;
}

/** Smooth height for content that changes size */
function AnimatedHeight({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const inner = useRef<HTMLDivElement>(null);
  const h = useMotionValue<number | "auto">("auto");
  const first = useRef(true);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const update = () => {
      const target = el.offsetHeight;
      if (first.current) {
        h.set(target);
        first.current = false;
      } else {
        animate(h as ReturnType<typeof useMotionValue<number>>, target, reduce ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0 });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [h, reduce]);
  return (
    <motion.div style={{ height: h }} className={cx("relative overflow-hidden", className)}>
      <div ref={inner}>{children}</div>
    </motion.div>
  );
}

/* ========================================================================== */
/*  One 3D book                                                               */
/* ========================================================================== */

type Pose = "rest" | "hover" | "open";

const face = (w: number, h: number) =>
  ({ position: "absolute", left: -w / 2, top: -h / 2, width: w, height: h, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }) as const;

const PAGES_BG =
  "repeating-linear-gradient(90deg, #f6f1e4 0 1.2px, #e2d9c4 1.2px 2.4px)";

function BookObject({
  book,
  W,
  H,
  T,
  s,
  pose,
  closing,
}: {
  book: BookItem;
  W: number;
  H: number;
  T: number;
  s: number;
  pose: Pose;
  closing: boolean;
}) {
  const reduce = useReducedMotion();
  const ink = book.ink ?? inkFor(book.color);
  const serif = (book.type ?? (["serif", "sans", "mono"] as const)[hash(book.id) % 3]) === "serif";
  const mono = (book.type ?? (["serif", "sans", "mono"] as const)[hash(book.id) % 3]) === "mono";
  const fam = serif ? "font-serif" : mono ? "font-mono" : "font-sans";
  const orn = hash(book.id + "o") % 3;

  const poses = {
    rest: { x: 0, y: 0, z: -W / 2, rotateY: 90 },
    hover: { x: W * 0.2, y: -8, z: -W / 2 + 74, rotateY: 38 },
    open: { x: W / 2, y: -14, z: -W / 2 + 90, rotateY: 0 },
  };
  const sp = (duration: number, bounce: number, delay = 0) =>
    reduce ? { duration: 0 } : ({ type: "spring", duration, bounce, delay } as const);

  const rootT =
    pose === "open"
      ? { default: sp(0.62, 0.1), x: sp(0.7, 0.06, 0.4) } // turns to face you, then slides to centre the spread
      : pose === "hover"
        ? { default: sp(0.5, 0.16) }
        : { default: sp(0.6, 0.08, closing ? 0.3 : 0), x: sp(0.55, 0.06) }; // returns after the cover has closed

  const coverT = pose === "open" ? sp(0.95, 0.07, 0.38) : sp(0.55, 0.04);
  const spineGrad = `linear-gradient(90deg, color-mix(in srgb, ${book.color}, white 14%) 0%, ${book.color} 18%, ${book.color} 70%, color-mix(in srgb, ${book.color}, black 24%) 100%)`;
  const coverBg = book.coverImage
    ? `url(${book.coverImage}) center/cover, ${book.color}`
    : `linear-gradient(135deg, color-mix(in srgb, ${book.color}, white 10%), ${book.color} 55%, color-mix(in srgb, ${book.color}, black 14%))`;
  const fs = (n: number) => `${Math.round(n * s * 10) / 10}px`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2"
      style={{ top: 0, width: 0, height: 0, transformStyle: "preserve-3d" }}
      initial={false}
      animate={poses[pose]}
      transition={rootT}
    >
      {/* spine: what you see on the shelf */}
      <div
        style={{ ...face(T, H), transform: `translateX(${-W / 2}px) rotateY(-90deg)`, background: spineGrad, borderRadius: 3, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.2)" }}
      >
        <div className="flex h-full flex-col items-center justify-between py-[10%]" style={{ color: ink }}>
          <span className="block rounded-full" style={{ width: T * 0.34, height: 2, background: ink, opacity: 0.38 }} />
          <span
            className={cx("max-h-[66%] overflow-hidden text-ellipsis whitespace-nowrap font-semibold tracking-tight", fam)}
            style={{ writingMode: "vertical-rl", fontSize: fs(clamp(T * 0.36, 10.5, 14)) }}
          >
            {book.title}
          </span>
          <span className="block rounded-full" style={{ width: T * 0.22, height: T * 0.22, background: ink, opacity: 0.5 }} />
        </div>
      </div>

      {/* back cover, page block, top + bottom edges */}
      <div style={{ ...face(W, H), transform: `translateZ(${-T / 2}px) rotateY(180deg)`, background: book.color, borderRadius: 4 }} />
      <div style={{ ...face(T - 4, H - 6), transform: `translateX(${W / 2 - 1}px) rotateY(90deg)`, background: PAGES_BG }} />
      <div style={{ ...face(W - 2, T - 4), transform: `translateY(${-H / 2 + 3}px) rotateX(90deg)`, background: PAGES_BG }} />
      <div style={{ ...face(W - 2, T - 4), transform: `translateY(${H / 2 - 3}px) rotateX(-90deg)`, background: PAGES_BG }} />

      {/* title page, revealed when the cover opens */}
      <div
        style={{ position: "absolute", left: -W / 2 + 1, top: -H / 2 + 4, width: W - 6, height: H - 8, transform: `translateZ(${T / 2 - 2}px)`, background: "#faf6ec", borderRadius: "1px 3px 3px 1px", backfaceVisibility: "hidden" }}
      >
        <motion.div
          className="flex h-full flex-col justify-between"
          style={{ padding: fs(11), color: "#2a2520" }}
          initial={false}
          animate={{ opacity: pose === "open" ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: pose === "open" ? 0.75 : 0 }}
        >
          <p className="uppercase" style={{ fontSize: fs(7.5), letterSpacing: "0.22em", opacity: 0.6 }}>
            {book.author}
          </p>
          <div>
            <p className={cx("leading-[1.1]", serif ? "font-serif" : fam)} style={{ fontSize: fs(15), fontWeight: 600, letterSpacing: "-0.01em" }}>
              {book.title}
            </p>
            <span className="mt-2 block h-px w-8" style={{ background: "#2a2520", opacity: 0.35 }} />
          </div>
          <p style={{ fontSize: fs(8), opacity: 0.5 }}>{book.year ?? ""}</p>
        </motion.div>
      </div>

      {/* the cover — hinged on the spine edge */}
      <motion.div
        style={{ position: "absolute", left: -W / 2, top: -H / 2, width: W, height: H, transformOrigin: "0% 50%", transformStyle: "preserve-3d", z: T / 2 }}
        initial={false}
        animate={{ rotateY: pose === "open" ? -166 : 0 }}
        transition={coverT}
      >
        {/* outside */}
        <div
          className="overflow-hidden"
          style={{ ...face(W, H), left: 0, top: 0, background: coverBg, borderRadius: "3px 6px 6px 3px", color: ink, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)" }}
        >
          {!book.coverImage && (
            <>
              <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.16), transparent 38%, rgba(0,0,0,0.12))" }} />
              <span className="absolute inset-y-0 block w-px" style={{ left: "7%", background: "rgba(0,0,0,0.28)", boxShadow: "1px 0 0 rgba(255,255,255,0.12)" }} />
              <svg viewBox="0 0 100 100" className="absolute" style={{ right: "-14%", bottom: "-10%", width: "78%", opacity: 0.16 }} fill={ink} aria-hidden>
                {orn === 0 && <circle cx="50" cy="50" r="46" />}
                {orn === 1 && <path d="M4 96A46 46 0 0 1 96 96Z" />}
                {orn === 2 && (
                  <>
                    <rect x="8" y="14" width="84" height="12" rx="6" />
                    <rect x="8" y="38" width="64" height="12" rx="6" />
                    <rect x="8" y="62" width="74" height="12" rx="6" />
                  </>
                )}
              </svg>
              <div className="relative flex h-full flex-col justify-between" style={{ padding: `${fs(15)} ${fs(14)} ${fs(14)} ${fs(20)}` }}>
                <p className={cx("font-semibold leading-[1.08] tracking-[-0.02em]", fam)} style={{ fontSize: fs(clamp(19 - book.title.length * 0.18, 13, 19)) }}>
                  {book.title}
                </p>
                <div>
                  <span className="mb-2 block h-px w-7" style={{ background: ink, opacity: 0.4 }} />
                  <p className="uppercase" style={{ fontSize: fs(7.5), letterSpacing: "0.2em", opacity: 0.78 }}>
                    {book.author}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* inside: the endpaper */}
        <div
          style={{
            ...face(W, H),
            left: 0,
            top: 0,
            transform: "rotateY(180deg)",
            borderRadius: "6px 3px 3px 6px",
            background: `repeating-linear-gradient(135deg, color-mix(in srgb, ${book.color} 16%, #f4eedf) 0 3px, color-mix(in srgb, ${book.color} 9%, #f4eedf) 3px 6px)`,
            boxShadow: "inset -10px 0 14px -10px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ========================================================================== */
/*  Bookshelf                                                                 */
/* ========================================================================== */

export function Bookshelf({
  books,
  openId,
  onOpenChange,
  onRead,
  actions,
  ariaLabel = "Bookshelf",
  className = "",
}: BookshelfProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [rootRef, width] = useElementWidth<HTMLDivElement>(640);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevOpen = useRef<string | null>(null);

  const [innerOpen, setInnerOpen] = useState<string | null>(null);
  const open = openId !== undefined ? openId : innerOpen;
  const [hover, setHover] = useState<number | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const [kbdFocus, setKbdFocus] = useState<number | null>(null);

  const setOpen = useCallback(
    (id: string | null) => {
      if (openId === undefined) setInnerOpen(id);
      onOpenChange?.(id, books.find((b) => b.id === id));
    },
    [openId, onOpenChange, books],
  );

  /* ------------------------------ geometry ------------------------------ */
  const geo = useMemo(() => {
    const s = clamp(width / 560, 0.78, 1.08);
    const W = Math.round(132 * s), H = Math.round(192 * s), gap = Math.round(6 * s);
    const items = books.map((b) => {
      const T = Math.round((b.pages !== undefined ? clamp(b.pages / 10, 26, 58) : 28 + (hash(b.id) % 22)) * s);
      const h = Math.round(H * (0.9 + (hash(b.id + "h") % 12) / 100));
      return { T, h };
    });
    return { s, W, H, gap, items };
  }, [width, books]);

  const openIndex = books.findIndex((b) => b.id === open);
  const activeIndex = openIndex >= 0 ? openIndex : (kbdFocus ?? hover);
  const activeBook = activeIndex !== null && activeIndex >= 0 ? books[activeIndex] : null;

  useEffect(() => {
    if (open === null) return;
    prevOpen.current = open;
  }, [open]);

  // bring the open book to the middle (phones scroll sideways); once now, once after the shelf has made room
  useEffect(() => {
    if (openIndex < 0) return;
    const go = () => slotRefs.current[openIndex]?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
    const a = window.setTimeout(go, 60);
    const b = window.setTimeout(go, 620);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [openIndex, reduce]);

  // Esc closes · tapping outside closes
  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const down = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", key);
    document.addEventListener("pointerdown", down);
    return () => {
      window.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", down);
    };
  }, [open, setOpen, rootRef]);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const enter = (i: number, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(leaveTimer.current);
    setHover(i);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHover(null), 90); // lets the pointer cross small gaps without flicker
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = clamp(i + (e.key === "ArrowRight" ? 1 : -1), 0, books.length - 1);
      setFocusIdx(next);
      slotRefs.current[next]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next = e.key === "Home" ? 0 : books.length - 1;
      setFocusIdx(next);
      slotRefs.current[next]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(books[i].id === open ? null : books[i].id);
    }
  };

  const spreadX = (i: number) => {
    if (open !== null || hover === null || i === hover) return 0;
    const d = Math.abs(i - hover);
    const amt = d === 1 ? 36 : d === 2 ? 15 : d === 3 ? 5 : 0;
    return (i < hover ? -amt : amt) * geo.s;
  };

  const openBook = openIndex >= 0 ? books[openIndex] : null;
  const panelKey = openBook ? `open-${openBook.id}` : activeBook ? `peek-${activeBook.id}` : "idle";

  return (
    <div ref={rootRef} className={cx("w-full text-neutral-700 antialiased dark:text-neutral-300", className)}>
      <style dangerouslySetInnerHTML={{ __html: `.bs-${uid}::-webkit-scrollbar{display:none}` }} />

      {/* the shelf */}
      <div
        ref={scrollRef}
        className={`bs-${uid} overflow-x-auto overscroll-x-contain px-4 pb-1 pt-10`}
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        <div role="list" aria-label={ariaLabel} className="relative mx-auto flex w-max min-w-full items-end justify-center pb-[14px]" style={{ height: geo.H + 24 + 14 }}>
          {books.map((b, i) => {
            const { T, h } = geo.items[i];
            const isOpen = i === openIndex;
            const peek = open === null && (hover === i || kbdFocus === i);
            const pose: Pose = isOpen ? "open" : peek ? "hover" : "rest";
            const slotW = isOpen ? geo.W * 2 + geo.gap * 2 : T + geo.gap;
            const dim = open !== null && !isOpen;
            return (
              <motion.div
                key={b.id}
                role="listitem"
                className="relative shrink-0"
                style={{ height: geo.H + 24, zIndex: isOpen || peek ? 10 : 1 }}
                initial={false}
                animate={{ width: slotW, x: spreadX(i), opacity: dim ? 0.38 : 1 }}
                transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.65, bounce: 0.06 }}
              >
                <div
                  ref={(el) => {
                    slotRefs.current[i] = el;
                  }}
                  role="button"
                  tabIndex={i === focusIdx ? 0 : -1}
                  aria-label={`${b.title} by ${b.author}${isOpen ? ". Open. Press Enter to close" : ". Press Enter to open"}`}
                  aria-expanded={isOpen}
                  onPointerEnter={(e) => enter(i, e)}
                  onPointerLeave={leave}
                  onFocus={(e) => {
                    setFocusIdx(i);
                    if (e.currentTarget.matches(":focus-visible")) setKbdFocus(i);
                  }}
                  onBlur={() => setKbdFocus((k) => (k === i ? null : k))}
                  onClick={() => setOpen(isOpen ? null : b.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cx("absolute inset-0 cursor-pointer rounded-[4px] [-webkit-tap-highlight-color:transparent]", focusRing)}
                  style={{ perspective: 900 + geo.W * 3 }}
                >
                  {/* shadow on the shelf */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 rounded-[50%] bg-black/45 blur-[6px] dark:bg-black/70"
                    style={{ height: 8 * geo.s, marginLeft: 0 }}
                    initial={false}
                    animate={{
                      width: isOpen ? geo.W * 1.9 : peek ? T + geo.W * 0.8 : T * 0.95,
                      x: isOpen ? "-50%" : peek ? `calc(-50% + ${geo.W * 0.1}px)` : "-50%",
                      opacity: isOpen ? 0.5 : peek ? 0.55 : 0.35,
                    }}
                    transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.6, bounce: 0.05 }}
                  />
                  {/* the book sits with its bottom on the shelf: anchor its centre h/2 above it */}
                  <div className="absolute inset-x-0" style={{ top: geo.H + 24 - h / 2 - 2, height: 0 }}>
                    <BookObject book={b} W={geo.W} H={h} T={T} s={geo.s} pose={pose} closing={prevOpen.current === b.id && open === null} />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* the board */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-1 bottom-0 h-[14px] rounded-[7px] bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] dark:from-neutral-700 dark:to-neutral-800 dark:shadow-[0_10px_20px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* details */}
      <AnimatedHeight className="mx-auto mt-6 max-w-xl px-5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={panelKey}
            initial={{ opacity: 0, y: reduce ? 0 : 8, filter: reduce ? "blur(0px)" : "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: reduce ? 0 : -6, filter: reduce ? "blur(0px)" : "blur(4px)", transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="pb-1"
          >
            {openBook ? (
              <div role="region" aria-label={`${openBook.title} details`} aria-live="polite">
                <p className="text-[12.5px] text-neutral-500">
                  {openBook.author}
                  {openBook.year ? ` · ${openBook.year}` : ""}
                </p>
                <h3 className="mt-1 text-[24px] font-semibold leading-tight tracking-[-0.025em] text-neutral-900 dark:text-neutral-50">{openBook.title}</h3>
                {(openBook.rating !== undefined || openBook.tags?.length) && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {openBook.rating !== undefined && (
                      <span className="inline-flex items-center gap-1.5" role="img" aria-label={`Rated ${openBook.rating} out of 5`}>
                        <span className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <svg key={n} viewBox="0 0 20 20" className={cx("h-3.5 w-3.5", n <= Math.round(openBook.rating!) ? "text-amber-400" : "text-black/15 dark:text-white/20")} fill="currentColor" aria-hidden>
                              <path d="m10 1.8 2.4 5 5.4.7-4 3.8 1 5.4L10 14l-4.8 2.7 1-5.4-4-3.8 5.4-.7Z" />
                            </svg>
                          ))}
                        </span>
                        <span className="text-[12.5px] tabular-nums text-neutral-500">{openBook.rating.toFixed(1)}</span>
                      </span>
                    )}
                    {openBook.tags?.map((t) => (
                      <span key={t} className="rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[12px] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {openBook.description && <p className="mt-3.5 text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">{openBook.description}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  {actions ? (
                    actions(openBook, () => setOpen(null))
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => onRead?.(openBook)}
                        className={`h-11 rounded-full bg-neutral-900 px-5 text-[13.5px] font-medium text-white transition-transform duration-150 active:scale-[0.97] dark:bg-white dark:text-neutral-900 ${focusRing}`}
                      >
                        Read
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpen(null)}
                        className={`h-11 rounded-full bg-black/[0.05] px-5 text-[13.5px] font-medium text-neutral-700 transition-transform duration-150 active:scale-[0.97] dark:bg-white/[0.08] dark:text-neutral-200 ${focusRing}`}
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : activeBook ? (
              <div className="text-center" aria-hidden>
                <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">{activeBook.title}</p>
                <p className="mt-0.5 text-[13px] text-neutral-500">{activeBook.author}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </AnimatedHeight>
    </div>
  );
}

export default Bookshelf;

