"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  CHART_COLORS,
  Dot,
  EASE_OUT,
  clamp,
  cx,
  defaultFormat,
  focus,
  muted,
  useDismissOutside,
  useElementWidth,
} from "../../lib/chart-primitives";

export interface DonutDatum {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutDatum[];
  /** donut: full ring · semi: half-ring gauge */
  variant?: "donut" | "semi";
  /** Largest diameter in px (it shrinks to fit its container) */
  size?: number;
  thickness?: number;
  /** Text above the total in the centre */
  centerLabel?: string;
  formatValue?: (n: number) => string;
  showLegend?: boolean;
  animated?: boolean;
  ariaLabel?: string;
  className?: string;
}

const pt = (cxp: number, cyp: number, r: number, a: number) => ({ x: cxp + r * Math.sin(a), y: cyp - r * Math.cos(a) });
function arcPath(cxp: number, cyp: number, r: number, a0: number, a1: number) {
  const p0 = pt(cxp, cyp, r, a0);
  const p1 = pt(cxp, cyp, r, a1);
  return `M${p0.x.toFixed(2)} ${p0.y.toFixed(2)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

function AnimatedNumber({ value, format, fromZero }: { value: number; format: (n: number) => string; fromZero?: boolean }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(fromZero && !reduce ? 0 : value);
  const fmt = useRef(format);
  fmt.current = format;
  const text = useTransform(mv, (v) => fmt.current(v));
  useEffect(() => {
    const c = animate(mv, value, { duration: reduce ? 0 : 0.8, ease: EASE_OUT });
    return () => c.stop();
  }, [value, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}

function Arc({
  centre,
  r,
  a0,
  a1,
  color,
  width,
  dim,
  animated,
  delay,
  label,
  onEnter,
  onLeave,
  onClick,
}: {
  centre: { x: number; y: number };
  r: number;
  a0: number;
  a1: number;
  color: string;
  width: number;
  dim: boolean;
  animated: boolean;
  delay: number;
  label: string;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const s = useMotionValue(a0);
  const e = useMotionValue(animated ? a0 : a1);
  const w = useMotionValue(width);
  const first = useRef(true);
  const d = useTransform<number, string>([s, e], ([x, y]) => arcPath(centre.x, centre.y, r, x, Math.max(y, x + 0.0004)));

  useEffect(() => {
    const intro = first.current && animated;
    const spring = { type: "spring", duration: 0.7, bounce: 0 } as const;
    const c1 = animate(s, a0, intro ? { duration: 0 } : spring);
    const c2 = animate(e, a1, intro ? { duration: 1, ease: EASE_OUT, delay } : spring);
    first.current = false;
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [a0, a1, animated, delay, s, e]);
  useEffect(() => {
    const c = animate(w, width, { type: "spring", duration: 0.35, bounce: 0.15 });
    return () => c.stop();
  }, [width, w]);

  return (
    <g style={{ opacity: dim ? 0.35 : 1, transition: "opacity .2s" }}>
      <motion.path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
      <motion.path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={30}
        strokeLinecap="round"
        pointerEvents="stroke"
        style={{ cursor: "pointer" }}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onClick={onClick}
        aria-label={label}
      />
    </g>
  );
}

export function DonutChart({
  data,
  variant = "donut",
  size = 240,
  thickness = 16,
  centerLabel = "Total",
  formatValue = defaultFormat,
  showLegend = true,
  animated = true,
  ariaLabel,
  className = "",
}: DonutChartProps) {
  const reduce = useReducedMotion();
  const anim = animated && !reduce;
  const [rootRef, rootW] = useElementWidth<HTMLDivElement>(560);
  const [hidden, setHidden] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useDismissOutside(wrapRef, active !== null, useCallback(() => setActive(null), []));

  const semi = variant === "semi";
  const side = showLegend && rootW >= 520;
  const D = Math.round(Math.max(120, Math.min(size, side ? rootW * 0.42 : rootW)));
  const grow = thickness + 6;
  const r = D / 2 - grow / 2 - 1;
  const cy = semi ? r + grow / 2 + 1 : D / 2;
  const H = semi ? Math.round(r + grow + 3) : D;
  const centre = { x: D / 2, y: cy };

  const items = data.map((d, i) => ({ ...d, i, color: d.color ?? CHART_COLORS[i % CHART_COLORS.length], off: hidden.includes(i) }));
  const total = items.reduce((s, x) => s + (x.off ? 0 : Math.max(0, x.value)), 0);
  const S = semi ? -Math.PI / 2 : 0;
  const A = semi ? Math.PI : Math.PI * 2;
  const pad = 3.5 / r + thickness / 2 / r; // arc gap + round cap
  let acc = 0;
  const segs = items.map((it) => {
    const f = it.off || total === 0 ? 0 : Math.max(0, it.value) / total;
    const a0 = S + acc * A;
    acc += f;
    const a1 = S + acc * A;
    const room = a1 - a0 - 2 * pad;
    const mid = (a0 + a1) / 2;
    return { ...it, f, a0: room > 0 ? a0 + pad : mid, a1: room > 0 ? a1 - pad : mid };
  });

  const toggle = (i: number) =>
    setHidden((h) => (h.includes(i) ? h.filter((x) => x !== i) : items.length - h.length > 1 ? [...h, i] : h));
  const act = active !== null ? segs[active] : null;
  const valueSize = clamp(D * 0.15, 22, 38);

  if (!data.length) return <p className={`py-10 text-center text-[13px] ${muted}`}>No data</p>;

  return (
    <div ref={rootRef} className={cx("w-full", side ? "flex items-center gap-8" : "flex flex-col items-center gap-5", className)}>
      <div ref={wrapRef} className="relative shrink-0" style={{ width: D, height: H }}>
        <svg
          width={D}
          height={H}
          role="img"
          aria-label={ariaLabel ?? `${semi ? "Gauge" : "Donut"} chart. Total ${formatValue(total)}`}
          className="block overflow-visible"
        >
          {/* track */}
          <path
            d={semi ? arcPath(centre.x, centre.y, r, S + pad, S + A - pad) : arcPath(centre.x, centre.y, r, 0, Math.PI * 1.9999)}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            className="stroke-black/[0.05] dark:stroke-white/[0.06]"
          />
          {segs.map((sg, i) => (
            <Arc
              key={i}
              centre={centre}
              r={r}
              a0={sg.a0}
              a1={sg.a1}
              color={sg.color}
              width={sg.off ? 0 : active === i ? thickness + 4 : thickness}
              dim={active !== null && active !== i}
              animated={anim}
              delay={0.12 + i * 0.09}
              label={`${sg.label}: ${formatValue(sg.value)}`}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
              onClick={() => setActive((a) => (a === i ? null : i))}
            />
          ))}
        </svg>

        {/* centre readout */}
        <div className={cx("pointer-events-none absolute inset-x-0 flex flex-col items-center text-center", semi ? "bottom-0 justify-end" : "inset-y-0 justify-center")}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active ?? "total"}
              className="max-w-[70%]"
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -4 }}
              transition={{ duration: 0.16, ease: EASE_OUT }}
            >
              <p className={`truncate text-[12px] ${muted}`}>{act ? act.label : centerLabel}</p>
              <p className="font-semibold leading-tight tracking-[-0.03em] tabular-nums text-neutral-900 dark:text-neutral-50" style={{ fontSize: valueSize }}>
                {act ? formatValue(act.value) : <AnimatedNumber value={total} format={formatValue} fromZero={anim} />}
              </p>
              {act && <p className={`text-[12px] tabular-nums ${muted}`}>{Math.round(act.f * 100)}%</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {showLegend && (
        <ul className={cx("w-full", side ? "max-w-[280px] flex-1" : "max-w-sm")} aria-label="Legend">
          {segs.map((sg, i) => (
            <li key={i}>
              <button
                type="button"
                aria-pressed={!sg.off}
                onClick={() => toggle(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`flex h-11 w-full items-center gap-3 rounded-xl px-2.5 text-left text-[13px] transition-[background-color,opacity] duration-150 [-webkit-tap-highlight-color:transparent] sm:h-10 [@media(hover:hover)]:hover:bg-black/[0.04] dark:[@media(hover:hover)]:hover:bg-white/[0.05] ${focus} ${
                  sg.off ? "opacity-45" : ""
                }`}
              >
                <Dot color={sg.color} />
                <span className={cx("min-w-0 flex-1 truncate text-neutral-700 dark:text-neutral-300", sg.off && "line-through")}>{sg.label}</span>
                <span className="tabular-nums text-neutral-900 dark:text-neutral-100">{formatValue(sg.value)}</span>
                <span className={`w-9 text-right text-[12px] tabular-nums ${muted}`}>{sg.off ? "—" : `${Math.round(sg.f * 100)}%`}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
