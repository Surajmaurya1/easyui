"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

/* -------------------------------------------------------------------------- */
/*  WaveTransition                                                            */
/*  A coloured wave that carries one view into another. It pulls the old view */
/*  toward the source, then a softly blurred liquid wave crosses the view.   */
/*  The wave uses CSS gradients and masking for consistent WebKit support.   */
/* -------------------------------------------------------------------------- */

export type WaveType = "vertical" | "horizontal" | "center";

const PALETTES = {
  colorful: ["#ff63b5", "#79e7ff", "#a78bfa"],
  rainbow: ["#ff5f9e", "#8b7cff", "#4dd7ff"],
  ocean: ["#22d3ee", "#38bdf8", "#818cf8"],
  sunset: ["#fb7185", "#fb923c", "#fbbf24"],
  green: ["#34d399", "#86efac", "#a7f3d0"],
  mono: ["#ffffff", "#d4d4d8", "#71717a"],
} as const;

const LIQUID_BAND =
  "radial-gradient(closest-side, transparent 58%, #000 68%, #000 82%, transparent 96%)";

export type WavePalette = keyof typeof PALETTES | [string, string, string];

// width / height of the wave front. vertical = wide + flat, horizontal = tall + narrow
const ASPECT: Record<WaveType, number> = {
  vertical: 2.4,
  horizontal: 1 / 2.4,
  center: 1,
};

function measure(
  root: HTMLElement,
  src: HTMLElement | null | undefined,
  type: WaveType
) {
  const w = root.offsetWidth;
  const h = root.offsetHeight;

  // default origin per type, overridden by the source element's centre
  let ox = type === "horizontal" ? 0 : w / 2;
  let oy = type === "vertical" ? h : h / 2;

  if (src) {
    const r = root.getBoundingClientRect();
    const s = src.getBoundingClientRect();
    const k = r.width ? w / r.width : 1;
    ox = (s.left + s.width / 2 - r.left) * k;
    oy = (s.top + s.height / 2 - r.top) * k;
  }

  // size the ellipse so it fully covers the farthest corner
  const dx = Math.max(ox, w - ox);
  const dy = Math.max(oy, h - oy);
  const a = ASPECT[type];
  const ry = Math.sqrt((dx / a) ** 2 + dy ** 2) * 1.1 + 1;
  return { ox, oy, rx: ry * a, ry };
}

export interface WaveTransitionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Sends the wave out when true, collapses it back into the source when false. */
  revealed: boolean;
  /** The view the wave leaves behind. */
  revealedContent: React.ReactNode;
  /** The starting view. */
  children: React.ReactNode;
  type?: WaveType;
  /** Element the wave opens from. Falls back to a per-type default origin. */
  source?: React.RefObject<HTMLElement | null>;
  palette?: WavePalette;
  /** Seconds for the outgoing wave. Return is 25% faster. */
  duration?: number;
  /** Stays on top, unaffected by the wave (put your trigger button here). */
  overlay?: React.ReactNode;
  onFinish?: (revealed: boolean) => void;
}

export function WaveTransition({
  revealed,
  revealedContent,
  children,
  type = "vertical",
  source,
  palette = "colorful",
  duration = 1.1,
  overlay,
  onFinish,
  className,
  style,
  ...props
}: WaveTransitionProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const geom = React.useRef({ ox: 0, oy: 0, rx: 1, ry: 1 });
  const onFinishRef = React.useRef(onFinish);
  onFinishRef.current = onFinish;

  const reduced = !!useReducedMotion();
  const colors = typeof palette === "string" ? PALETTES[palette] : palette;
  const waveGradient =
    palette === "rainbow"
      ? "conic-gradient(from 12deg, #ff4d8d, #ffad62, #f3e86b, #7de4a2, #53d7ff, #8c7cff, #ff4d8d)"
      : `conic-gradient(from 12deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`;

  const progress = useMotionValue(revealed ? 1 : 0);
  const fade = useMotionValue(revealed ? 0 : 1); // glow fade after the run

  React.useEffect(() => {
    const root = rootRef.current;
    const target = revealed ? 1 : 0;
    if (!root || progress.get() === target) return;

    const g = measure(root, source?.current, type);
    geom.current = g;
    root.style.setProperty("--ox", `${g.ox}px`);
    root.style.setProperty("--oy", `${g.oy}px`);
    root.style.setProperty("--wx", `${g.rx * 2}px`);
    root.style.setProperty("--wy", `${g.ry * 2}px`);

    fade.set(1);
    const controls = animate(progress, target, {
      duration: reduced ? 0.3 : revealed ? duration : duration * 0.75,
      ease: [0.65, 0, 0.2, 1],
      onComplete: () => {
        animate(fade, 0, { duration: 0.9, ease: "easeOut" });
        onFinishRef.current?.(revealed);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  /* revealed view: grows out of the source */
  const clipPath = useTransform(progress, (p) => {
    if (reduced || p >= 1) return "none";
    const { ox, oy, rx, ry } = geom.current;
    const k = p * 0.95;
    return `ellipse(${rx * k}px ${ry * k}px at ${ox}px ${oy}px)`;
  });
  const revealedOpacity = useTransform(progress, (p) => (reduced ? p : 1));
  const revealedScale = useTransform(progress, (p) =>
    reduced ? 1 : 1.06 - 0.06 * p
  );
  const revealedVisibility = useTransform(progress, (p) =>
    p <= 0 ? "hidden" : "visible"
  );

  /* base view: gets pulled toward the source first */
  const baseScale = useTransform(progress, (p) =>
    reduced ? 1 : 1 - 0.03 * Math.sin(Math.PI * Math.min(1, p * 1.6))
  );

  /* Color wash fades at the transition edges to keep the view itself clear. */
  const liquidOpacity = useTransform(progress, (p) => {
    if (p <= 0 || p >= 1) return 0;
    const envelope = Math.min(1, p / 0.06, (1 - p) / 0.12);
    // Keep a brief, low intensity color cue when Reduce Motion is enabled.
    return envelope * (reduced ? 0.28 : 1);
  });
  const waveScale = useTransform(progress, (p) => p * 1.08);

  /* colour that stays on the edges, then clears */
  const edgeRise = useTransform(progress, [0, 0.5, 1], [0, 1, 1]);
  const edgeOpacity = useTransform(
    [edgeRise, fade],
    ([e, f]: number[]) => e * f * (reduced ? 0.24 : 1)
  );

  return (
    <div
      ref={rootRef}
      className={cn("relative grid overflow-hidden", className)}
      style={
        {
          "--ox": "50%",
          "--oy": "50%",
          "--wx": "0px",
          "--wy": "0px",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* base */}
      <motion.div
        className="[grid-area:1/1]"
        style={{ scale: baseScale, transformOrigin: "var(--ox) var(--oy)" }}
        inert={revealed}
        aria-hidden={revealed}
      >
        {children}
      </motion.div>

      {/* revealed */}
      <motion.div
        className="[grid-area:1/1]"
        style={{
          clipPath,
          opacity: revealedOpacity,
          scale: revealedScale,
          visibility: revealedVisibility,
          transformOrigin: "var(--ox) var(--oy)",
        }}
        inert={!revealed}
        aria-hidden={!revealed}
      >
        {revealedContent}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10"
        style={{
          left: "var(--ox)",
          top: "var(--oy)",
          width: "var(--wx)",
          height: "var(--wy)",
          borderRadius: "50%",
          WebkitMaskImage: LIQUID_BAND,
          maskImage: LIQUID_BAND,
          x: "-50%",
          y: "-50%",
          scale: waveScale,
          opacity: liquidOpacity,
          backgroundImage: waveGradient,
          // Avoid inline SVG filters and backdrop-filter here: WebKit can drop
          // the filtered layer when both are composed, especially on iOS.
          filter: "blur(7px) saturate(1.35)",
        }}
      />

      {/* edge glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{
          opacity: edgeOpacity,
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${colors[0]} 68%, transparent), inset 0 0 30px color-mix(in srgb, ${colors[1]} 24%, transparent), inset 0 0 48px color-mix(in srgb, ${colors[2]} 26%, transparent)`,
        }}
      />

      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-20 [&>*]:pointer-events-auto">
          {overlay}
        </div>
      )}
    </div>
  );
}

export default WaveTransition;
