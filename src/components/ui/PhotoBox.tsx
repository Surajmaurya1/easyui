"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  PhotoBox — frosted cover + paper box with polaroid prints that fan out.    */
/*  Hover (or tap) opens the box · click a print to view it large · click      */
/*  anywhere to put it back.                                                   */
/*                                                                             */
/*  Deps: react 19, framer-motion, tailwindcss. Nothing else.                  */
/*  <PhotoBox />   or   <PhotoBox prints={[{ id, title, caption, src }]} />    */
/* -------------------------------------------------------------------------- */

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type PhotoPrint = {
  id: string;
  /** Printed on the polaroid border */
  title: string;
  /** Shown under the print when it's opened */
  caption: string;
  /** Your own image URL. Takes priority over `art` */
  src?: string;
  alt?: string;
  /** Any node that fills the picture area (e.g. an SVG) */
  art?: ReactNode;
};

export type PhotoBoxProps = {
  /** Up to 3 prints (the box has 3 slots) */
  prints?: PhotoPrint[];
  title?: string;
  /** Defaults to "Photo Box · N prints" */
  subtitle?: string;
  className?: string;
  /** Optional controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (id: string | null) => void;
};

/* ------------------------------ Design space ------------------------------- */
// Authored on a 490-wide stage and scaled to the container (works down to ~280px).

const W = 490;
const COVER = { x: 16, y: 150, w: 247, h: 156 };
const BOX = { left: 97, w: 273, backTop: 157, lipTop: 241, bottom: 301 };
const SHIFT = 85; // how far the box slides out from under the cover
const PRINT = { w: 120, h: 150, s: 0.7 };

// Print centres relative to the box's left edge, per slot
const IDLE = [
  { cx: 118, cy: 226, r: -6 },
  { cx: 170, cy: 226, r: -1 },
  { cx: 222, cy: 226, r: 4 },
];
const OPEN = [
  { cx: 97, cy: 184, r: -12 },
  { cx: 154, cy: 176, r: -2 },
  { cx: 227, cy: 194, r: 9 },
];

const metrics = (compact: boolean) =>
  compact
    ? { H: 530, oy: 45, sExp: 2.4, cy: 208 } // phones: taller stage, bigger enlarged print
    : { H: 440, oy: 0, sExp: 2.05, cy: 172 };

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const JP = '"Hiragino Sans","Noto Sans JP","Yu Gothic","Meiryo",system-ui,sans-serif';

/* ---------------------------------- Art ------------------------------------ */

function SeaArt() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 106 104" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7b76b" />
          <stop offset="55%" stopColor="#f48a7b" />
          <stop offset="100%" stopColor="#d9647f" />
        </linearGradient>
      </defs>
      <rect width="106" height="104" fill={`url(#${id})`} />
      <circle cx="64" cy="54" r="15" fill="#ffd9a3" opacity=".92" />
      <rect y="55" width="106" height="49" fill="#27335e" />
      <g stroke="#f3a27a" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round">
        <path d="M18 63h32M60 69h36M28 78h42M10 90h28M62 92h32" />
      </g>
    </svg>
  );
}

function CatArt() {
  return (
    <svg viewBox="0 0 106 104" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <rect width="106" height="104" fill="#bfe0d1" />
      <rect x="66" y="8" width="30" height="34" rx="4" fill="#d9f0e5" stroke="#a7cbb9" strokeWidth="2" />
      <path d="M81 8v34M66 25h30" stroke="#a7cbb9" strokeWidth="2" />
      <path d="M22 104V70c0-10 4-16 8-20l-2-20 14 12c6-2 16-2 22 0l14-12-2 20c4 4 8 10 8 20v34Z" fill="#45414f" />
      <g fill="#f2c230">
        <circle cx="40" cy="62" r="6.2" />
        <circle cx="66" cy="62" r="6.2" />
      </g>
      <g fill="#1c1a22">
        <ellipse cx="40" cy="62" rx="1.6" ry="4.2" />
        <ellipse cx="66" cy="62" rx="1.6" ry="4.2" />
      </g>
      <path d="M50 73l3 3.2 3-3.2Z" fill="#f19aa8" />
      <g stroke="#fff" strokeOpacity=".65" strokeWidth=".9" strokeLinecap="round">
        <path d="M31 75 14 72M31 79 14 81M75 75l17-3M75 79l17 2" />
      </g>
    </svg>
  );
}

function ToriiArt() {
  return (
    <svg viewBox="0 0 106 104" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <rect width="106" height="104" fill="#8fbfee" />
      <ellipse cx="26" cy="22" rx="14" ry="6" fill="#fff" />
      <ellipse cx="84" cy="14" rx="10" ry="4.5" fill="#fff" />
      <path d="M0 84C20 66 46 62 70 66c16 2 28 8 36 14v24H0Z" fill="#3f7d46" />
      <g fill="#d4382b">
        <rect x="34" y="44" width="7" height="46" />
        <rect x="65" y="44" width="7" height="46" />
        <rect x="28" y="54" width="50" height="6" />
        <rect x="24" y="40" width="58" height="6" rx="1" />
      </g>
      <path d="M19 34q34 5 68 0l1 4q-35 5-70 0Z" fill="#25201f" />
      <path d="M0 94c30-12 70-12 106-2v12H0Z" fill="#33693b" />
    </svg>
  );
}

export const DEFAULT_PRINTS: PhotoPrint[] = [
  { id: "sea", title: "朝の海", caption: "The sea at first light", art: <SeaArt /> },
  { id: "cat", title: "ねこ", caption: "The cat at the window", art: <CatArt /> },
  { id: "torii", title: "旅", caption: "A torii on the way", art: <ToriiArt /> },
];

/* --------------------------------- Pieces ---------------------------------- */

function Polaroid({ print }: { print: PhotoPrint }) {
  return (
    <span
      className="relative block h-[150px] w-[120px] rounded-[4px] p-[7px]"
      style={{
        background: "linear-gradient(180deg,#fbf9f5 0%,#f3efe8 100%)",
        boxShadow: "0 1px 2px rgba(60,40,20,0.28), 0 8px 16px -6px rgba(60,40,20,0.3)",
      }}
    >
      <span className="relative block h-[104px] w-full overflow-hidden rounded-[2px] bg-neutral-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
        {print.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={print.src} alt={print.alt ?? ""} draggable={false} className="h-full w-full object-cover" />
        ) : (
          print.art
        )}
      </span>
      <span
        className="mt-[11px] block text-center text-[15px] font-medium leading-none text-neutral-600"
        style={{ fontFamily: JP }}
      >
        {print.title}
      </span>
    </span>
  );
}

function useMedia(query: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/* -------------------------------- Component -------------------------------- */

export function PhotoBox({
  prints = DEFAULT_PRINTS,
  title = "写真箱",
  subtitle,
  className = "",
  open: controlledOpen,
  onOpenChange,
  onSelect,
}: PhotoBoxProps) {
  const reduce = useReducedMotion();
  const coarse = useMedia("(pointer: coarse)");
  const list = prints.slice(0, 3);
  const sub = subtitle ?? `Photo Box · ${list.length} prints`;

  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const printRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastPointer = useRef("mouse");

  const [width, setWidth] = useState(0);
  const [uncontrolledHover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false); // touch / keyboard
  const [selected, setSelected] = useState<string | null>(null);
  const [lifted, setLifted] = useState<string | null>(null); // keeps the print above the box until it lands back

  const compact = width > 0 && width < 520;
  const { H, oy, sExp, cy: expCy } = metrics(compact);
  const scale = width / W || 1;
  const open = (controlledOpen !== undefined ? controlledOpen : uncontrolledHover) || pinned || selected !== null;
  const expanded = selected !== null;
  const selectedPrint = list.find((p) => p.id === selected) ?? null;

  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth || (typeof window !== "undefined" && window.innerWidth ? Math.min(W, window.innerWidth) : W));
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);
  useEffect(() => {
    onSelect?.(selected);
  }, [selected, onSelect]);

  // Tap outside closes a pinned (touch / keyboard) box
  useEffect(() => {
    if (!pinned) return;
    const down = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPinned(false);
    };
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [pinned]);

  useEffect(() => {
    if (selected) layerRef.current?.focus({ preventScroll: true });
  }, [selected]);

  const collapse = () => {
    const id = selected;
    setSelected(null);
    if (id) requestAnimationFrame(() => printRefs.current[id]?.focus({ preventScroll: true }));
  };

  // Mouse hover is hit-tested against the composition (not the whole stage)
  const onPointerMove = (e: React.PointerEvent) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "touch" || expanded || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / scale;
    const y = (e.clientY - r.top) / scale - oy;
    const inside = open
      ? x >= 8 && x <= 480 && y >= 106 && y <= 314
      : x >= 14 && x <= 392 && y >= 148 && y <= 310;
    setHover(inside);
  };

  const onTap = (e: React.MouseEvent) => {
    if (lastPointer.current === "touch" || e.detail === 0) setPinned((p) => !p);
  };

  /* ----------------------------- Motion helpers ----------------------------- */

  const spring = (delay = 0, bounce = 0.18) =>
    reduce ? { duration: 0 } : ({ type: "spring", duration: 0.55, bounce, delay } as const);
  const fade = { duration: reduce ? 0 : 0.28, ease: EASE_OUT };

  const away = expanded; // everything but the chosen print recedes
  const boxAnim = {
    x: open ? SHIFT : 0,
    opacity: away ? 0.14 : 1,
    filter: away && !reduce ? "blur(2px)" : "blur(0px)",
  };
  const boxTransition = { x: spring(0, 0.12), opacity: fade, filter: fade };

  const printAnim = (i: number, id: string) => {
    const idle = IDLE[i];
    const o = OPEN[i];
    if (id === selected) {
      return {
        x: SHIFT + (W / 2 - (BOX.left + idle.cx + SHIFT)),
        y: expCy - (idle.cy + oy),
        rotate: 0,
        scale: sExp,
        opacity: 1,
        filter: "blur(0px)",
      };
    }
    if (open) {
      return {
        x: SHIFT + (o.cx - idle.cx),
        y: o.cy - idle.cy,
        rotate: o.r,
        scale: PRINT.s,
        opacity: away ? 0.14 : 1,
        filter: away && !reduce ? "blur(2px)" : "blur(0px)",
      };
    }
    return { x: 0, y: 0, rotate: idle.r, scale: PRINT.s, opacity: 1, filter: "blur(0px)" };
  };

  const printTransition = (i: number, id: string) =>
    id === selected
      ? { ...spring(0, 0.1), opacity: fade, filter: fade }
      : { ...spring(open ? i * 0.04 : (list.length - 1 - i) * 0.03, 0.24), opacity: fade, filter: fade };

  const hairline = "block h-px bg-white/30";
  const captionTop = (expCy + (PRINT.h * sExp) / 2 + 16) * scale;
  const hint = coarse ? "Tap anywhere to put it back" : "Click anywhere to put it back";

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto w-full max-w-[640px] select-none ${className}`}
      style={{ aspectRatio: `${W} / ${H}`, opacity: width ? 1 : 0, touchAction: "manipulation" }}
      onPointerMove={onPointerMove}
      onPointerDownCapture={(e) => (lastPointer.current = e.pointerType)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") setHover(false);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (expanded) collapse();
        else setPinned(false);
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        {/* Touch / click target for the empty part of the box */}
        <div
          aria-hidden
          onClick={onTap}
          className="absolute"
          style={{ left: COVER.x, top: COVER.y + oy - 44, width: 380, height: COVER.h + 48, zIndex: 1 }}
        />

        {/* Box: back panel */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-t-[10px]"
          style={{
            left: BOX.left,
            top: BOX.backTop + oy,
            width: BOX.w,
            height: BOX.bottom - BOX.backTop,
            zIndex: 2,
            background: "linear-gradient(180deg,#bba67c 0%,#ad9669 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        />

        {/* Prints (sit between the back panel and the front lip) */}
        {list.map((p, i) => {
          const idle = IDLE[i];
          const isSel = p.id === selected;
          return (
            <motion.button
              key={p.id}
              ref={(el) => {
                printRefs.current[p.id] = el;
              }}
              type="button"
              aria-label={`Open print: ${p.title}. ${p.caption}`}
              tabIndex={open && !expanded ? 0 : -1}
              onClick={() => {
                if (!open || expanded) return;
                setLifted(p.id);
                setSelected(p.id);
              }}
              onAnimationComplete={() => {
                if (!selected && lifted === p.id) setLifted(null);
              }}
              className="absolute rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[#e8742f] focus-visible:ring-offset-2"
              style={{
                left: BOX.left + idle.cx - PRINT.w / 2,
                top: idle.cy + oy - PRINT.h / 2,
                width: PRINT.w,
                height: PRINT.h,
                zIndex: lifted === p.id || isSel ? 30 : 3 + i,
                cursor: open && !expanded ? "zoom-in" : "default",
                pointerEvents: open && !expanded ? "auto" : "none",
                transformOrigin: "50% 50%",
                WebkitTapHighlightColor: "transparent",
              }}
              initial={false}
              animate={printAnim(i, p.id)}
              transition={printTransition(i, p.id)}
            >
              <Polaroid print={p} />
            </motion.button>
          );
        })}

        {/* Box: front lip + latch */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-b-[10px] rounded-t-[3px]"
          style={{
            left: BOX.left,
            top: BOX.lipTop + oy,
            width: BOX.w,
            height: BOX.bottom - BOX.lipTop,
            zIndex: 6,
            background: "linear-gradient(180deg,#ecdcb9 0%,#e3d1a9 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 10px 16px -8px rgba(90,60,20,0.35)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        >
          <span
            className="absolute left-1/2 top-[-3px] h-[30px] w-[30px] -translate-x-1/2 rounded-full"
            style={{ background: "#cdb584", boxShadow: "inset 0 2px 3px rgba(90,60,20,0.25)" }}
          />
          <span
            className="absolute inset-x-0 bottom-[13px] text-center text-[9px] font-medium uppercase tracking-[0.24em]"
            style={{ color: "rgba(110,90,55,0.6)" }}
          >
            Prints · {list.length}
          </span>
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-l-[2px] rounded-r-[7px]"
          style={{
            left: BOX.left + BOX.w - 4,
            top: 207 + oy,
            width: 18,
            height: 38,
            zIndex: 6,
            background: "linear-gradient(180deg,#d1522a 0%,#bd4320 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 8px -3px rgba(120,40,10,0.4)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        />

        {/* Frosted cover */}
        <motion.button
          type="button"
          onClick={onTap}
          aria-expanded={open}
          aria-label={`${title}, ${sub}. ${pinned ? "Close" : "Open"} the box`}
          className="absolute rounded-[14px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#e8742f] focus-visible:ring-offset-2"
          style={{
            left: COVER.x,
            top: COVER.y + oy,
            width: COVER.w,
            height: COVER.h,
            zIndex: 20,
            WebkitTapHighlightColor: "transparent",
            boxShadow: "0 22px 30px -14px rgba(160,70,10,0.5), 0 4px 8px rgba(160,70,10,0.18)",
          }}
          initial={false}
          animate={away ? "away" : "idle"}
        >
          {/* glass body */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-[14px]"
            variants={{ idle: { opacity: 1 }, away: { opacity: 0.14 } }}
            transition={fade}
            style={{
              background: "linear-gradient(135deg,rgba(242,142,84,0.94) 0%,rgba(232,116,47,0.92) 55%,rgba(226,106,36,0.92) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          />
          {/* frosted strip where prints pass behind the cover */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 right-0 w-[36%] rounded-r-[14px]"
            variants={{ idle: { opacity: 1 }, away: { opacity: 0.14 } }}
            transition={fade}
            style={{
              background: "linear-gradient(90deg,rgba(255,236,220,0) 0%,rgba(255,236,220,0.3) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maskImage: "linear-gradient(90deg,transparent 0%,#000 75%)",
              WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 75%)",
            }}
          />
          <motion.span
            className="absolute inset-x-[18px] bottom-[16px] block"
            variants={{ idle: { opacity: 1 }, away: { opacity: 0.14 } }}
            transition={fade}
          >
            <span className="block text-[23px] font-medium leading-none tracking-[0.02em] text-white" style={{ fontFamily: JP }}>
              {title}
            </span>
            <span className="mt-[7px] block text-[13px] leading-none text-white/75">{sub}</span>
            <span className={`${hairline} mt-[9px]`} />
            <span className={`${hairline} mt-[5px]`} />
          </motion.span>
        </motion.button>
      </div>

      {/* Enlarged view: caption + click-anywhere-to-close layer */}
      <AnimatePresence>
        {selectedPrint && (
          <motion.div
            key="layer"
            ref={layerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPrint.title}. ${selectedPrint.caption}`}
            tabIndex={-1}
            onClick={collapse}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                collapse();
              }
            }}
            className="absolute inset-0 z-40 cursor-zoom-out outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
          >
            <motion.div
              className="absolute inset-x-0 px-5 text-center"
              style={{ top: captionTop }}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.2, duration: reduce ? 0 : 0.3, ease: EASE_OUT } }}
            >
              <p className="text-[17px] font-medium leading-tight text-neutral-800" style={{ fontFamily: JP }}>
                {selectedPrint.title}
              </p>
              <p className="mt-1 text-[14px] leading-snug text-neutral-500">{selectedPrint.caption}</p>
              <p className="mt-2 text-[12px] text-neutral-400">{hint}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- Demo ----------------------------------- */

export function PhotoBoxDemo() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-[#f1f1f1] via-[#ececec] to-[#d9d9d9] p-4 sm:p-8">
      <PhotoBox />
    </div>
  );
}

export default PhotoBox;
