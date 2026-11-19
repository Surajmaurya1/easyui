"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  PackageBox — a cardboard box. Click: the tape splits, the flaps fold open, */
/*  and a paper document rises out and turns to face you.                      */
/*                                                                             */
/*  One file · pure CSS 3D + framer-motion · no images · no other deps.        */
/*  <PackageBox />                                                             */
/*  <PackageBox colors={{ box: "#a9825a" }} slip={{ title: "Hi, Sam." }} />    */
/*  <PackageBox>{/* anything you want printed on the paper *\/}</PackageBox>     */
/* -------------------------------------------------------------------------- */

export type PackageSlip = {
  title?: string;
  subtitle?: string;
  /** Top-right of the paper, e.g. "№ 4821" */
  reference?: string;
  date?: string;
  recipient?: string;
  address?: string;
  items?: { name: string; qty?: number; price?: string }[];
  total?: string;
  /** Round stamp at the bottom. Pass "" to hide it */
  stamp?: string;
  /** Small label at the top-left of the paper */
  eyebrow?: string;
};

export type PackageBoxColors = {
  /** Cardboard base color. All faces are shaded from this one */
  box?: string;
  tape?: string;
  paper?: string;
  ink?: string;
  /** Stamp color */
  accent?: string;
};

export type PackageBoxProps = {
  /** Controlled open state */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Replaces the default packing slip with your own content (sized 240 × 340) */
  children?: ReactNode;
  /** Text for the default packing slip */
  slip?: PackageSlip;
  /** Max width in px. The whole scene scales to fit (default 460) */
  maxWidth?: number;
  colors?: PackageBoxColors;
  /** Sticker on the left face. `false` hides it */
  label?: ReactNode | false;
  /** Marks on the right face. `false` hides them */
  symbols?: ReactNode | false;
  /** Packing tape across the top (default true) */
  tape?: boolean;
  /** Caption button under the box (default true). Always present for screen readers */
  hint?: boolean;
  openLabel?: string;
  closeLabel?: string;
  /** Keep the full height reserved while closed, so the page doesn't shift */
  reserveSpace?: boolean;
  className?: string;
  paperClassName?: string;
};

/* ------------------------------ Design space ------------------------------- */
// Everything is authored in "design px" on a 440-wide stage, then scaled to fit.

const S = 200; // box edge
const H2 = S / 2;
const PAPER_W = 240;
const PAPER_H = 340;
const PAPER_S0 = 0.54; // paper's scale while it's still inside the box
const TAPE_W = 46;

const STAGE_W = 440;
const H_CLOSED = 392; // stage height with the box closed
const H_OPEN = 650; // …and with the paper fully out
const BOX_CENTER_FROM_BOTTOM = 197;

const TILT = -30; // camera looks down on the box
const TURN = -45; // box turned so two faces are visible
const MAJOR_OPEN = -238;
const MINOR_OPEN = -212;
const FORWARD_DIST = 56;

const OPEN_SECONDS = 2.4;
const CLOSE_SECONDS = 1.5;

const rad = (d: number) => (d * Math.PI) / 180;
type V3 = [number, number, number];
const rotX = ([x, y, z]: V3, a: number): V3 => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const rotY = ([x, y, z]: V3, a: number): V3 => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
// The scene direction that points at the camera (so the paper can step toward you)
const FORWARD = rotY(rotX([0, 0, 1], rad(-TILT)), rad(-TURN));

const EASE_FLAP = cubicBezier(0.34, 1.1, 0.5, 1);
const EASE_RISE = cubicBezier(0.22, 0.8, 0.2, 1);
const EASE_SHOW = cubicBezier(0.3, 0.9, 0.3, 1);

// Safe SSR layout effect
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Where the paper is, as it rises (r) and then turns to face you (s)
function paperPose(r: number, s: number) {
  const scale = PAPER_S0 + (1 - PAPER_S0) * s;
  const bottom = 96 - 208 * r - 14 * s; // y of the paper's bottom edge (scene units, y down)
  const cy = bottom - (PAPER_H * scale) / 2;
  const d = FORWARD_DIST * s;
  return `translate3d(${(FORWARD[0] * d).toFixed(2)}px, ${(cy + FORWARD[1] * d).toFixed(2)}px, ${(FORWARD[2] * d).toFixed(2)}px) rotateY(${(-TURN * s).toFixed(2)}deg) rotateX(${(-TILT * s).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
}

/* --------------------------------- Surfaces -------------------------------- */

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .3 0 0 0 0 .17 0 0 0 0 .06 0 0 0 .5 -.1'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const mix = (a: string, b: string, pct: number) => `color-mix(in srgb, ${a}, ${b} ${pct}%)`;
const BOX = "var(--box)";

const FACE = {
  left: `${GRAIN}, linear-gradient(165deg, ${mix(BOX, "white", 6)}, ${mix(BOX, "black", 7)})`,
  right: `${GRAIN}, linear-gradient(165deg, ${mix(BOX, "black", 26)}, ${mix(BOX, "black", 36)})`,
  top: `${GRAIN}, linear-gradient(135deg, ${mix(BOX, "white", 14)}, ${mix(BOX, "white", 3)})`,
  inside: `linear-gradient(180deg, ${mix(BOX, "black", 42)} 0%, ${mix(BOX, "black", 72)} 100%)`,
  underside: `linear-gradient(180deg, ${mix(BOX, "black", 36)}, ${mix(BOX, "black", 50)})`,
  floor: mix(BOX, "black", 80),
};

const fill: CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  pointerEvents: "auto",
};

/* ----------------------------- Default artwork ----------------------------- */

function Sticker() {
  return (
    <div
      className="h-full w-full rounded-[2px] bg-[#f6f4ef] p-[5%]"
      style={{ boxShadow: "0 1px 2px rgba(40,20,5,0.35)" }}
      aria-hidden
    >
      <div className="h-[8%] w-[70%] rounded-[1px] bg-neutral-700/80" />
      <div className="mt-[7%] flex h-[52%] gap-[8%]">
        <div
          className="w-[46%]"
          style={{
            background:
              "repeating-linear-gradient(90deg,#26231f 0 1px,transparent 1px 2px,#26231f 2px 4px,transparent 4px 5px)",
          }}
        />
        <div className="flex flex-1 flex-col justify-between py-[3%]">
          <span className="block h-[10%] w-full rounded-[1px] bg-neutral-400/80" />
          <span className="block h-[10%] w-[80%] rounded-[1px] bg-neutral-400/80" />
          <span className="block h-[10%] w-full rounded-[1px] bg-neutral-400/80" />
          <span className="block h-[10%] w-[60%] rounded-[1px] bg-neutral-400/80" />
        </div>
      </div>
      <div className="mt-[6%] h-[14%] w-full rounded-[1px] bg-neutral-300/90" />
    </div>
  );
}

function Symbols() {
  const ink = mix(BOX, "#24130a", 72);
  return (
    <svg viewBox="0 0 100 64" className="h-full w-full" aria-hidden style={{ color: ink, opacity: 0.85 }}>
      {/* fragile glass */}
      <path d="M8 6h38c0 15-8 23-19 23S8 21 8 6Z" fill="currentColor" />
      <path d="M17 6l5 8-6 5 6 6" fill="none" stroke={mix(BOX, "black", 26)} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M27 29v22M15 53h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* this side up */}
      <g fill="currentColor">
        <rect x="66" y="22" width="5" height="28" rx="1" />
        <path d="M68.5 8l8 15h-16Z" />
        <rect x="84" y="22" width="5" height="28" rx="1" />
        <path d="M86.5 8l8 15h-16Z" />
      </g>
      <path d="M62 56h36" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

const DEFAULT_SLIP: Required<PackageSlip> = {
  eyebrow: "Packing slip",
  title: "Thank you, Ana.",
  subtitle: "Your order is packed and on its way.",
  reference: "№ 4821",
  date: "Oct 15, 2026",
  recipient: "Ana Rivera",
  address: "24 Linden Street, Lisbon",
  items: [
    { name: "Oak desk lamp", qty: 1, price: "$89.00" },
    { name: "Linen pouch", qty: 2, price: "$36.00" },
    { name: "Dotted notebook", qty: 1, price: "$14.00" },
  ],
  total: "$139.00",
  stamp: "Packed",
};

function Slip({ data }: { data: Required<PackageSlip> }) {
  const soft: CSSProperties = { color: "color-mix(in srgb, var(--ink) 52%, transparent)" };
  const rule = <div className="my-3 border-t" style={{ borderColor: "color-mix(in srgb, var(--ink) 14%, transparent)" }} />;
  return (
    <div className="flex h-full flex-col px-6 pb-5 pt-6">
      <div className="flex items-center justify-between text-[8.5px] font-medium uppercase tracking-[0.18em]" style={soft}>
        <span>{data.eyebrow}</span>
        <span className="font-mono tracking-normal">{data.reference}</span>
      </div>

      <h3 className="mt-4 font-serif text-[22px] leading-[1.08] tracking-[-0.02em]">{data.title}</h3>
      <p className="mt-1.5 text-[10.5px] leading-snug" style={soft}>
        {data.subtitle}
      </p>

      {rule}

      <div className="grid grid-cols-[1fr_auto] gap-x-4 text-[10px] leading-snug">
        <div>
          <p style={soft}>Ship to</p>
          <p className="mt-0.5 font-medium">{data.recipient}</p>
          <p style={soft}>{data.address}</p>
        </div>
        <div className="text-right">
          <p style={soft}>Date</p>
          <p className="mt-0.5 font-medium tabular-nums">{data.date}</p>
        </div>
      </div>

      {rule}

      <ul className="space-y-1.5 text-[10.5px]">
        {data.items.map((it, i) => (
          <li key={i} className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate">
              {it.qty && it.qty > 1 ? `${it.qty}× ` : ""}
              {it.name}
            </span>
            {it.price && <span className="shrink-0 tabular-nums">{it.price}</span>}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-baseline justify-between border-t pt-2.5" style={{ borderColor: "color-mix(in srgb, var(--ink) 14%, transparent)" }}>
        <span className="text-[8.5px] font-medium uppercase tracking-[0.18em]" style={soft}>
          Total
        </span>
        <span className="font-serif text-[18px] leading-none tracking-[-0.02em] tabular-nums">{data.total}</span>
      </div>

      <div className="mt-auto flex items-end justify-between">
        <svg viewBox="0 0 70 26" className="h-6 w-[68px]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ opacity: 0.7 }}>
          <path d="M2 20c7-14 12-17 14-8s-5 13 0 11 9-17 14-13-3 11 2 9 9-9 14-7 6 6 11 2" />
        </svg>
        {data.stamp && (
          <span
            className="grid h-[46px] w-[46px] -rotate-[10deg] place-items-center rounded-full border-[1.5px] text-[7.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)", borderColor: "var(--accent)", opacity: 0.85, mixBlendMode: "multiply" }}
          >
            {data.stamp}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- 3D building blocks ------------------------------- */

const preserve: CSSProperties = { transformStyle: "preserve-3d" };

function Wall({
  transform,
  outer,
  outerStyle,
  inner = FACE.inside,
  children,
  flap,
}: {
  transform: string;
  outer: string;
  outerStyle?: CSSProperties;
  inner?: string;
  children?: ReactNode;
  flap?: ReactNode;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, transform, ...preserve }}>
      <div style={{ ...fill, background: outer, borderRadius: 5, ...outerStyle }}>{children}</div>
      <div style={{ ...fill, background: inner, borderRadius: 5, transform: "rotateY(180deg)" }} />
      {flap}
    </div>
  );
}

function Flap({
  angle,
  minor,
  tapeHalf,
}: {
  angle: ReturnType<typeof useMotionValue<number>>;
  minor?: boolean;
  tapeHalf?: ReactNode;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: minor ? 1.5 : 0,
        width: S,
        height: H2,
        transformOrigin: "50% 0%",
        rotateX: angle,
        ...preserve,
      }}
    >
      {/* underside — what you see once it's folded back */}
      <div style={{ ...fill, background: FACE.underside, borderRadius: "0 0 4px 4px" }} />
      {/* top surface — what you see while it's closed */}
      <div style={{ ...fill, background: FACE.top, borderRadius: "0 0 4px 4px", transform: "rotateY(180deg)", boxShadow: "inset 0 -1px 0 rgba(60,30,5,0.28)" }}>
        {tapeHalf}
      </div>
    </motion.div>
  );
}

/* -------------------------------- Component -------------------------------- */

export function PackageBox({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  slip,
  maxWidth = 460,
  colors,
  label,
  symbols,
  tape = true,
  hint = true,
  openLabel = "Click to open",
  closeLabel = "Close",
  reserveSpace = false,
  className = "",
  paperClassName = "",
}: PackageBoxProps) {
  const reduce = useReducedMotion();
  const paperId = useId();

  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  }, [isOpen, open, onOpenChange]);

  /* ----------------------------- Master timeline ---------------------------- */
  // One value drives everything: 0 = closed, 1 = fully open. Each part of the
  // choreography reads its own slice, so closing is just the same film in reverse
  // and clicking mid-way simply changes direction.
  const t = useMotionValue(defaultOpen ? 1 : 0);
  useEffect(() => {
    const controls = animate(
      t,
      isOpen ? 1 : 0,
      reduce ? { duration: 0.01 } : { duration: isOpen ? OPEN_SECONDS : CLOSE_SECONDS, ease: "linear" },
    );
    return () => controls.stop();
  }, [isOpen, reduce, t]);

  const cut = useTransform(t, [0, 0.08], [0, 1]);
  const majorF = useTransform(t, [0.08, 0.34], [-90, MAJOR_OPEN], { ease: EASE_FLAP, clamp: false });
  const majorB = useTransform(t, [0.11, 0.37], [-90, MAJOR_OPEN], { ease: EASE_FLAP, clamp: false });
  const minorR = useTransform(t, [0.26, 0.5], [-90, MINOR_OPEN], { ease: EASE_FLAP, clamp: false });
  const minorL = useTransform(t, [0.29, 0.53], [-90, MINOR_OPEN], { ease: EASE_FLAP, clamp: false });
  const rise = useTransform(t, [0.46, 0.78], [0, 1], { ease: EASE_RISE });
  const show = useTransform(t, [0.66, 1], [0, 1], { ease: EASE_SHOW });

  const paperTransform = useTransform([rise, show], ([r, s]) =>
    paperPose(r as number, s as number)
  );
  const tapeH = useTransform(cut, [0, 1], [TAPE_W / 2, TAPE_W / 2 - 0.9]);

  /* ---------------------------- Responsive scaling --------------------------- */
  const wrapRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const grow = useTransform([rise, show], ([r, s]) => 0.65 * (r as number) + 0.35 * (s as number));
  const height = useTransform([grow, scale], ([g, sc]) =>
    (reserveSpace ? H_OPEN : H_CLOSED + (H_OPEN - H_CLOSED) * (g as number)) * (sc as number),
  );

  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      scale.set(el.clientWidth / STAGE_W);
      setReady(true);
    };
    update();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, [scale]);

  // Esc closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isOpen, toggle]);

  /* ---------------------------------- Theme --------------------------------- */
  const theme = {
    "--box": colors?.box ?? "#b07b4a",
    "--tape": colors?.tape ?? "#d3c3aa",
    "--paper": colors?.paper ?? "#fbfaf6",
    "--ink": colors?.ink ?? "#1c1a17",
    "--accent": colors?.accent ?? "#c2552b",
  } as CSSProperties;

  const tapeStyle: CSSProperties = {
    background: "linear-gradient(180deg, color-mix(in srgb, var(--tape), white 18%), var(--tape) 55%, color-mix(in srgb, var(--tape), black 8%))",
    boxShadow: "0 0 0 0.5px rgba(80,50,20,0.18)",
  };

  const slipData = { ...DEFAULT_SLIP, ...slip };

  return (
    <div className={`mx-auto w-full overflow-hidden ${className}`} style={{ maxWidth }}>
      <div ref={wrapRef} className="relative w-full" style={{ ...theme, opacity: ready ? 1 : 0 }}>
        <motion.div className="relative w-full" style={{ height }}>
          {/* Stage: fixed design size, scaled to the container, anchored to the bottom */}
          <motion.div
            className="absolute bottom-0 left-1/2"
            style={{
              width: STAGE_W,
              height: H_OPEN,
              x: "-50%",
              scale,
              transformOrigin: "50% 100%",
              pointerEvents: "none",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
              animate={{ y: hovered && !isOpen && !reduce ? -4 : 0 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onClick={toggle}
            >
              <div className="absolute inset-0" style={{ perspective: 2200, perspectiveOrigin: "50% 38%", pointerEvents: "none" }}>
                {/* Scene */}
                <div
                  style={{
                    position: "absolute",
                    left: STAGE_W / 2 - H2,
                    top: H_OPEN - BOX_CENTER_FROM_BOTTOM - H2,
                    width: S,
                    height: S,
                    transform: `rotateX(${TILT}deg) rotateY(${TURN}deg)`,
                    cursor: "pointer",
                    pointerEvents: "none",
                    ...preserve,
                  }}
                >
                  {/* soft ground shadow */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -70,
                      top: -70,
                      width: S + 140,
                      height: S + 140,
                      transform: `rotateX(90deg) translateZ(${-H2 - 3}px)`,
                      background: "radial-gradient(closest-side, rgba(45,28,10,0.34), rgba(45,28,10,0.14) 58%, transparent 100%)",
                    }}
                  />

                  {/* Box (decorative) */}
                  <div aria-hidden style={{ position: "absolute", inset: 0, ...preserve }}>
                    {/* floor */}
                    <Wall transform={`rotateX(-90deg) translateZ(${H2}px)`} outer={FACE.floor} inner={FACE.floor} />

                    {/* back + left: seen from the inside once open */}
                    <Wall
                      transform={`rotateY(180deg) translateZ(${H2}px)`}
                      outer={FACE.left}
                      flap={<Flap angle={majorB} tapeHalf={tape ? <motion.div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: tapeH, ...tapeStyle }} /> : undefined} />}
                    />
                    <Wall
                      transform={`rotateY(-90deg) translateZ(${H2}px)`}
                      outer={FACE.right}
                      flap={<Flap angle={minorL} minor />}
                    >
                      {tape && <TapeTail cut={cut} style={tapeStyle} />}
                    </Wall>

                    {/* front (label) + right (marks): the two faces you see */}
                    <Wall
                      transform={`translateZ(${H2}px)`}
                      outer={FACE.left}
                      outerStyle={{ boxShadow: "inset -12px 0 20px -12px rgba(60,30,5,0.3), inset 0 10px 14px -10px rgba(255,255,255,0.2)" }}
                      flap={<Flap angle={majorF} tapeHalf={tape ? <motion.div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: tapeH, ...tapeStyle }} /> : undefined} />}
                    >
                      {label !== false && (
                        <div style={{ position: "absolute", left: "58%", top: "20%", width: "33%", height: "38%" }}>
                          {label ?? <Sticker />}
                        </div>
                      )}
                    </Wall>
                    <Wall
                      transform={`rotateY(90deg) translateZ(${H2}px)`}
                      outer={FACE.right}
                      outerStyle={{ boxShadow: "inset 12px 0 20px -12px rgba(30,15,0,0.35), inset 0 10px 14px -10px rgba(255,255,255,0.1)" }}
                      flap={<Flap angle={minorR} minor />}
                    >
                      {tape && <TapeTail cut={cut} style={tapeStyle} />}
                      {symbols !== false && (
                        <div style={{ position: "absolute", left: "36%", top: "58%", width: "58%", height: "32%" }}>
                          {symbols ?? <Symbols />}
                        </div>
                      )}
                    </Wall>
                  </div>

                  {/* The document */}
                  <motion.div
                    id={paperId}
                    role="document"
                    aria-label="Document"
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    onClick={(e) => e.stopPropagation()}
                    className={`overflow-hidden rounded-[3px] font-sans antialiased ${paperClassName}`}
                    style={{
                      position: "absolute",
                      left: H2 - PAPER_W / 2,
                      top: H2 - PAPER_H / 2,
                      width: PAPER_W,
                      height: PAPER_H,
                      transform: paperTransform,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      color: "var(--ink)",
                      cursor: "default",
                      pointerEvents: isOpen ? "auto" : "none",
                      background:
                        "linear-gradient(180deg, transparent 33%, rgba(0,0,0,0.035) 33.3%, transparent 34%, transparent 66.3%, rgba(0,0,0,0.035) 66.6%, transparent 67.3%), radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.7), transparent 60%), var(--paper)",
                      boxShadow: "0 1px 0 rgba(0,0,0,0.05), 0 14px 28px -10px rgba(40,25,10,0.35), 0 2px 6px rgba(40,25,10,0.12)",
                    }}
                  >
                    {children ?? <Slip data={slipData} />}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Accessible, keyboard-friendly control (also the visible hint) */}
      <div className="mt-1 flex justify-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={paperId}
          className={
            hint
              ? "inline-flex h-9 items-center rounded-full px-4 text-[12.5px] font-medium text-neutral-500 outline-none transition-[color,background-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-neutral-400 [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-black/[0.04] [@media(hover:hover)]:hover:text-neutral-800"
              : "sr-only"
          }
        >
          {isOpen ? closeLabel : openLabel}
        </button>
      </div>
    </div>
  );
}

// Tape that wraps down the side of the box and gets cut along the seam
function TapeTail({ cut, style }: { cut: ReturnType<typeof useMotionValue<number>>; style: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% - ${TAPE_W / 2}px)`,
        top: 0,
        width: TAPE_W,
        height: S * 0.3,
        borderRadius: "0 0 2px 2px",
        ...style,
      }}
    >
      <motion.span
        style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(70,40,15,0.5)", opacity: cut }}
      />
    </div>
  );
}

export default PackageBox;

/* ---------------------------------- Demo ----------------------------------- */

export function PackageBoxDemo() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f4f3f0] p-4">
      <PackageBox />
    </div>
  );
}
