"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Interactive Area Chart — hand-written SVG, no chart library                */
/*  Deps: react 19, framer-motion, tailwindcss.                                */
/* -------------------------------------------------------------------------- */

export type ChartPoint = { date: number; value: number }; // date = UTC ms
export type AreaChartData = Record<string, ChartPoint[]>;

export interface InteractiveAreaChartProps {
  data?: AreaChartData;
  defaultRange?: string;
  title?: string;
  height?: number;
  className?: string;
}

const N = 72; // every dataset is resampled to N points so ranges can morph 1:1
const PAD = { t: 48, r: 12, b: 28, l: 48 };
const TIP_W = 124;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const f = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------- Demo data --------------------------------- */

const DAY = 86_400_000;
const END = Date.UTC(2026, 9, 13);

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeSeries(n: number, seed: number, start: number, drift: number, vol: number): ChartPoint[] {
  const r = rng(seed);
  let v = start;
  return Array.from({ length: n }, (_, i) => {
    v += drift + (r() - 0.5) * vol + Math.sin(i / (n / 6)) * vol * 0.15;
    v = Math.max(v, start * 0.4);
    return { date: END - (n - 1 - i) * DAY, value: Math.round(v) };
  });
}

export const DEFAULT_AREA_CHART_DATA: AreaChartData = {
  "7D": makeSeries(7, 11, 11800, 180, 900),
  "30D": makeSeries(30, 7, 9200, 95, 1100),
  "1Y": makeSeries(365, 3, 4200, 28, 700),
};

/* --------------------------------- Maths ----------------------------------- */

// Catmull-Rom sample so sparse datasets (7 points) resample smoothly
function spline(v: number[], pos: number) {
  const n = v.length;
  if (n === 1) return v[0];
  const i = Math.min(Math.floor(pos), n - 2);
  const t = pos - i;
  const p0 = v[Math.max(i - 1, 0)];
  const p1 = v[i];
  const p2 = v[i + 1];
  const p3 = v[Math.min(i + 2, n - 1)];
  return p1 + 0.5 * t * (p2 - p0 + t * (2 * p0 - 5 * p1 + 4 * p2 - p3 + t * (3 * (p1 - p2) + p3 - p0)));
}

function niceScale(min: number, max: number, count = 4) {
  const raw = ((max - min) || 1) / (count - 1);
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

function buildModel(data: AreaChartData) {
  const out: Record<string, { pts: ChartPoint[]; ny: Float64Array; lo: number; hi: number; ticks: number[] }> = {};
  for (const [key, pts] of Object.entries(data)) {
    const vals = pts.map((p) => p.value);
    const { lo, hi, ticks } = niceScale(Math.min(...vals), Math.max(...vals));
    const ny = new Float64Array(N);
    for (let k = 0; k < N; k++) ny[k] = (spline(vals, (k / (N - 1)) * (vals.length - 1)) - lo) / (hi - lo);
    out[key] = { pts, ny, lo, hi, ticks };
  }
  return out;
}

function smoothPath(p: [number, number][]) {
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

const fmtFull = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtCompact = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });
const fmtTip = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const axisFmt = (len: number, isNarrow = false) =>
  new Intl.DateTimeFormat(
    "en-US",
    len <= 10
      ? { weekday: "short", timeZone: "UTC" }
      : isNarrow
        ? { month: "numeric", day: "numeric", timeZone: "UTC" }
        : len <= 60
          ? { month: "short", day: "numeric", timeZone: "UTC" }
          : { month: "short", timeZone: "UTC" },
  );

/* -------------------------------- Component -------------------------------- */

export function InteractiveAreaChart({
  data = DEFAULT_AREA_CHART_DATA,
  defaultRange = "30D",
  title = "Revenue",
  height = 280,
  className = "",
}: InteractiveAreaChartProps) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const model = useMemo(() => buildModel(data), [data]);
  const keys = Object.keys(model);

  const [range, setRange] = useState(keys.includes(defaultRange) ? defaultRange : keys[0]);
  const [hover, setHover] = useState<number | null>(null);
  const [width, setWidth] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<Float64Array>(model[range].ny);
  const toRef = useRef<Float64Array>(model[range].ny);
  const morphCtl = useRef<{ stop: () => void } | null>(null);
  const started = useRef(false);
  const lastHover = useRef(0);

  const t = useMotionValue(1); // morph progress between datasets
  const ver = useMotionValue(0); // bumps on every range change
  const wMV = useMotionValue(0);
  const reveal = useMotionValue(reduce ? 1 : 0); // intro draw progress
  const cx = useMotionValue(0);
  const cxS = useSpring(cx, { stiffness: 520, damping: 42, mass: 0.6 });

  const innerH = height - PAD.t - PAD.b;
  const bottom = PAD.t + innerH;
  const yPx = (n: number) => PAD.t + (1 - n) * innerH;
  const disp = (k: number) => {
    const a = fromRef.current[k];
    return a + (toRef.current[k] - a) * t.get();
  };
  const points = (w: number) => {
    const iw = Math.max(1, w - PAD.l - PAD.r);
    return Array.from({ length: N }, (_, k) => [PAD.l + (k / (N - 1)) * iw, yPx(disp(k))] as [number, number]);
  };
  const sampleY = (frac: number) => {
    const k = clamp(frac, 0, 1) * (N - 1);
    const i = Math.min(Math.floor(k), N - 2);
    const a = disp(i);
    return yPx(a + (disp(i + 1) - a) * (k - i));
  };

  const lineD = useTransform([t, wMV, ver], () => {
    const w = wMV.get();
    return w ? smoothPath(points(w)) : "M0 0";
  });
  const areaD = useTransform([t, wMV, ver], () => {
    const w = wMV.get();
    if (!w) return "M0 0";
    const p = points(w);
    return `${smoothPath(p)}L${f(p[N - 1][0])} ${bottom}L${f(p[0][0])} ${bottom}Z`;
  });
  const clipW = useTransform([reveal, wMV], ([r, w]: number[]) =>
    r >= 0.999 ? w : PAD.l + Math.max(0, w - PAD.l - PAD.r) * r,
  );
  const leadX = useTransform([reveal, wMV], ([r, w]: number[]) => PAD.l + Math.max(0, w - PAD.l - PAD.r) * r);
  const leadY = useTransform([reveal, t, wMV, ver], ([r]: number[]) => sampleY(r));
  const leadO = useTransform(reveal, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);
  const dotY = useTransform([cxS, t, wMV, ver], ([c]: number[]) =>
    sampleY((c - PAD.l) / Math.max(1, wMV.get() - PAD.l - PAD.r)),
  );
  const tipX = useTransform([cxS, wMV], ([c, w]: number[]) => clamp(c - TIP_W / 2, 0, Math.max(0, w - TIP_W)));

  // Track width + start the intro draw once we know it
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const initialW = Math.round(el.getBoundingClientRect().width || el.offsetWidth || 500);
    if (initialW > 0 && width === 0) {
      setWidth(initialW);
      wMV.set(initialW);
      if (!started.current) {
        started.current = true;
        if (reduce) reveal.set(1);
        else animate(reveal, 1, { duration: 1.1, ease: EASE_IN_OUT });
      }
    }

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width || initialW);
      if (w > 0) {
        setWidth(w);
        wMV.set(w);
        if (!started.current) {
          started.current = true;
          if (reduce) reveal.set(1);
          else animate(reveal, 1, { duration: 1.1, ease: EASE_IN_OUT });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const m = model[range];
  const len = m.pts.length;

  // Morph: interruptible — always starts from what's currently on screen
  const changeRange = (next: string) => {
    if (next === range) return;
    morphCtl.current?.stop();
    const e = t.get();
    const cur = new Float64Array(N);
    for (let k = 0; k < N; k++) cur[k] = fromRef.current[k] + (toRef.current[k] - fromRef.current[k]) * e;
    fromRef.current = cur;
    toRef.current = model[next].ny;
    t.set(0);
    ver.set(ver.get() + 1);
    morphCtl.current = animate(t, 1, { duration: reduce ? 0 : 0.55, ease: EASE_IN_OUT });
    setRange(next);
    setHover(null);
  };

  // Scrubbing: snap to the nearest real data point, spring the visuals
  const moveTo = (idx: number) => {
    const iw = Math.max(1, width - PAD.l - PAD.r);
    const target = PAD.l + (len > 1 ? idx / (len - 1) : 0.5) * iw;
    cx.set(target);
    if (hover === null) cxS.jump(target); // don't sweep in from the left on first hover
    lastHover.current = idx;
    setHover(idx);
  };
  const onScrub = (e: React.PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const frac = clamp((e.clientX - box.left - PAD.l) / Math.max(1, width - PAD.l - PAD.r), 0, 1);
    moveTo(Math.round(frac * (len - 1)));
  };

  const shown = m.pts[hover ?? len - 1];
  const tipPt = m.pts[Math.min(lastHover.current, len - 1)];
  const delta = (shown.value - m.pts[0].value) / m.pts[0].value;
  const isNarrow = width > 0 && width < 380;
  const axis = axisFmt(len, isNarrow);
  const labelCount = isNarrow ? 3 : width < 520 ? 4 : 5;
  const xLabels = [...new Set(
    Array.from({ length: labelCount }, (_, j) => Math.round((j / (labelCount - 1)) * (len - 1)))
  )];

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-[13px] text-neutral-500">{title}</p>
          <p className="mt-0.5 text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
            {fmtFull.format(shown.value)}
          </p>
          <p
            className={`mt-1 text-xs sm:text-[13px] tabular-nums ${
              delta >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {delta >= 0 ? "+" : ""}
            {(delta * 100).toFixed(1)}%{" "}
            <span className="text-neutral-500">
              {hover !== null ? fmtTip.format(shown.date) : `last ${range}`}
            </span>
          </p>
        </div>

        <div role="tablist" aria-label="Range" className="flex self-start sm:self-auto shrink-0 rounded-full bg-neutral-100 p-0.5 dark:bg-neutral-900">
          {keys.map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={k === range}
              onClick={() => changeRange(k)}
              className={`relative z-10 rounded-full px-2.5 sm:px-3 py-1 text-xs font-medium outline-none transition-[color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                k === range ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500"
              }`}
            >
              {k === range && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-neutral-800"
                  transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                />
              )}
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div ref={wrapRef} className="relative" style={{ height }}>
        {width > 0 && (
          <>
            <svg
              width={width}
              height={height}
              role="img"
              tabIndex={0}
              aria-label={`${title}, last ${range}: from ${fmtFull.format(m.pts[0].value)} to ${fmtFull.format(m.pts[len - 1].value)}. Use left and right arrow keys to inspect values.`}
              className="block select-none text-neutral-900 outline-none dark:text-neutral-100"
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault();
                  moveTo(clamp((hover ?? len - 1) + (e.key === "ArrowRight" ? 1 : -1), 0, len - 1));
                } else if (e.key === "Escape") setHover(null);
              }}
              onBlur={() => setHover(null)}
            >
              <defs>
                <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
                <clipPath id={`${uid}-clip`}>
                  <motion.rect x={0} y={0} height={height} width={clipW} />
                </clipPath>
              </defs>

              {/* Grid + axes: crossfade per range */}
              <AnimatePresence>
                <motion.g
                  key={range}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  {m.ticks.map((v) => {
                    const y = yPx((v - m.lo) / (m.hi - m.lo));
                    return (
                      <g key={v}>
                        <line
                          x1={PAD.l}
                          x2={width - PAD.r}
                          y1={y}
                          y2={y}
                          stroke="currentColor"
                          className="text-neutral-200 dark:text-neutral-800"
                        />
                        <text
                          x={PAD.l - 10}
                          y={y}
                          textAnchor="end"
                          dominantBaseline="middle"
                          className="fill-neutral-500 text-[11px] tabular-nums"
                        >
                          {fmtCompact.format(v)}
                        </text>
                      </g>
                    );
                  })}
                  {xLabels.map((idx, j) => (
                    <text
                      key={idx}
                      x={PAD.l + (idx / (len - 1)) * (width - PAD.l - PAD.r)}
                      y={height - 6}
                      textAnchor={j === 0 ? "start" : j === xLabels.length - 1 ? "end" : "middle"}
                      className="fill-neutral-500 text-[11px]"
                    >
                      {axis.format(m.pts[idx].date)}
                    </text>
                  ))}
                </motion.g>
              </AnimatePresence>

              {/* Area + line (revealed left→right on load) */}
              <g clipPath={`url(#${uid}-clip)`}>
                <motion.path d={areaD} fill={`url(#${uid}-fill)`} />
                <motion.path
                  d={lineD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <motion.circle cx={leadX} cy={leadY} r={3.5} fill="currentColor" style={{ opacity: leadO }} />

              {/* Crosshair + dot */}
              <motion.g
                initial={false}
                animate={{ opacity: hover !== null ? 1 : 0 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                pointerEvents="none"
              >
                <motion.line
                  x1={cxS}
                  x2={cxS}
                  y1={PAD.t - 6}
                  y2={bottom}
                  stroke="currentColor"
                  strokeOpacity={0.3}
                  strokeDasharray="3 3"
                />
                <motion.circle
                  cx={cxS}
                  cy={dotY}
                  r={4.5}
                  stroke="currentColor"
                  strokeWidth={2}
                  className="fill-white dark:fill-neutral-950"
                />
              </motion.g>

              {/* Pointer surface */}
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="transparent"
                style={{ touchAction: "pan-y", cursor: "crosshair" }}
                onPointerMove={onScrub}
                onPointerDown={onScrub}
                onPointerLeave={() => setHover(null)}
              />
            </svg>

            {/* Tooltip */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
              style={{ x: tipX, width: TIP_W }}
              initial={false}
              animate={{ opacity: hover !== null ? 1 : 0 }}
              transition={{ duration: 0.15, ease: EASE_OUT }}
            >
              <p className="text-[11px] leading-tight text-neutral-500">{fmtTip.format(tipPt.date)}</p>
              <p className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-50">
                {fmtFull.format(tipPt.value)}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default InteractiveAreaChart;
