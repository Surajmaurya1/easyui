"use client";

import React, {
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Earnings — "how much did I make, and from where?"                          */
/*                                                                             */
/*  • Big total that counts up, with a delta vs the previous period            */
/*  • Trend line you can scrub (the number follows your finger / cursor)       */
/*  • One split bar + a row per income source; hover or tap a source to        */
/*    highlight it and see just its share                                      */
/*  • Period switcher (7D / 30D / 12M): numbers count, the bar and the         */
/*    trend line morph                                                         */
/*                                                                             */
/*  One file · deps: react 19, framer-motion, tailwindcss · light + dark ·     */
/*  fully responsive.                                                          */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Types                                                                     */
/* ========================================================================== */

export interface EarningsSource {
  id: string;
  label: string;
  amount: number;
  /** % change vs the previous period (shown as a small ▲/▼) */
  change?: number;
  /** Any CSS color */
  color?: string;
  /** Your own icon. Defaults to a colored initial */
  icon?: ReactNode;
}

export interface EarningsPeriod {
  id: string;
  /** Segmented-control label, e.g. "30D" */
  label: string;
  /** Under the delta, e.g. "vs previous 30 days" */
  comparison?: string;
  /** Defaults to the sum of the sources */
  total?: number;
  /** Total of the previous period → the delta is computed from it */
  previous?: number;
  /** Earnings per point (day, week, month…), oldest → newest */
  trend: number[];
  /** Name for each trend point, shown while scrubbing ("Oct 12") */
  trendLabels?: string[];
  sources: EarningsSource[];
}

export interface EarningsProps {
  periods: EarningsPeriod[];
  /** Initial period id (default: second one if there are 3+, else the first) */
  defaultPeriod?: string;
  onPeriodChange?: (id: string) => void;
  title?: string;
  currency?: string;
  locale?: string;
  /** Footer line, e.g. { label: "Next payout", date: "Nov 5", amount: 1240 } */
  payout?: { label?: string; date: string; amount?: number };
  animated?: boolean;
  className?: string;
}

/* ========================================================================== */
/*  Helpers                                                                   */
/* ========================================================================== */

export const SOURCE_COLORS = ["#6d7cff", "#34d1bf", "#ffb44c", "#ff6b8b", "#a78bfa", "#5ac8fa"];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
const pct = (x: number) => `${Math.abs(x) >= 10 ? Math.round(Math.abs(x)) : Math.abs(x).toFixed(1)}%`;

const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/70 dark:focus-visible:ring-white/40";
const ring = "ring-1 ring-black/[0.07] dark:ring-white/[0.07]";
const muted = "text-neutral-500";

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

/** Smooth monotone cubic (never overshoots the data) */
export function monotonePath(p: [number, number][]): string {
  const n = p.length;
  if (n < 2) return n ? `M${p[0][0]} ${p[0][1]}` : "";
  const dx: number[] = [], m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = p[i + 1][0] - p[i][0];
    m[i] = (p[i + 1][1] - p[i][1]) / (dx[i] || 1e-9);
  }
  const t: number[] = new Array(n);
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
      if (s > 9) {
        const k = 3 / Math.sqrt(s);
        t[i] = k * a * m[i];
        t[i + 1] = k * b * m[i];
      }
    }
  }
  let d = `M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(p[i][0] + h).toFixed(2)} ${(p[i][1] + t[i] * h).toFixed(2)} ${(p[i + 1][0] - h).toFixed(2)} ${(p[i + 1][1] - t[i + 1] * h).toFixed(2)} ${p[i + 1][0].toFixed(2)} ${p[i + 1][1].toFixed(2)}`;
  }
  return d;
}

/** Linear resample to a fixed number of points so any two trends can morph into each other */
export function resample(v: number[], n: number): number[] {
  if (!v.length) return Array(n).fill(0);
  if (v.length === 1) return Array(n).fill(v[0]);
  return Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * (v.length - 1);
    const i0 = Math.floor(x), i1 = Math.min(v.length - 1, i0 + 1);
    return v[i0] + (v[i1] - v[i0]) * (x - i0);
  });
}

function AnimatedNumber({
  value,
  format,
  duration = 0.9,
  fromZero,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
  fromZero?: boolean;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(fromZero && !reduce ? 0 : value);
  const fmt = useRef(format);
  fmt.current = format;
  const text = useTransform(mv, (v) => fmt.current(v));
  useEffect(() => {
    const c = animate(mv, value, { duration: reduce ? 0 : duration, ease: EASE_OUT });
    return () => c.stop();
  }, [value, duration, mv, reduce]);
  return <motion.span>{text}</motion.span>;
}

function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className="relative inline-flex shrink-0 rounded-full bg-black/[0.04] p-0.5 dark:bg-white/[0.05]">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`relative z-10 h-9 rounded-full px-3.5 text-[12px] font-medium transition-colors duration-150 [-webkit-tap-highlight-color:transparent] sm:h-8 sm:px-3 ${focus} ${
              on ? "text-neutral-900 dark:text-white" : "text-neutral-500"
            }`}
          >
            {on && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-neutral-800"
                transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/*  Earnings                                                                  */
/* ========================================================================== */

const N_POINTS = 32;
const SPARK_H = 76;

export function Earnings({
  periods,
  defaultPeriod,
  onPeriodChange,
  title = "Earnings",
  currency = "USD",
  locale = "en-US",
  payout,
  animated = true,
  className = "",
}: EarningsProps) {
  const reduce = useReducedMotion();
  const anim = animated && !reduce;
  const uid = useId().replace(/:/g, "");
  const [sparkRef, width] = useElementWidth<HTMLDivElement>(480);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const [periodId, setPeriodId] = useState(defaultPeriod ?? periods[periods.length > 2 ? 1 : 0]?.id ?? "");
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [scrub, setScrub] = useState<number | null>(null);

  const period = periods.find((p) => p.id === periodId) ?? periods[0];

  // tap outside clears a tap-selected source / scrub (touch)
  useEffect(() => {
    if (activeSource === null && scrub === null) return;
    const down = (e: PointerEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) {
        setActiveSource(null);
        setScrub(null);
      }
    };
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [activeSource, scrub]);

  const money = useMemo(() => {
    const big = (period?.total ?? period?.sources.reduce((s, x) => s + x.amount, 0) ?? 0) >= 10000;
    const nf = new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: big ? 0 : 2, maximumFractionDigits: big ? 0 : 2 });
    return (n: number) => nf.format(n);
  }, [locale, currency, period]);
  const moneyExact = useMemo(() => {
    const nf = new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n: number) => nf.format(n);
  }, [locale, currency]);

  /* ------------------------------- numbers ------------------------------- */
  const sources = period?.sources ?? [];
  const sum = sources.reduce((s, x) => s + Math.max(0, x.amount), 0);
  const total = period?.total ?? sum;
  const trend = period?.trend ?? [];
  const n = trend.length;

  const delta =
    period?.previous !== undefined && period.previous !== 0
      ? ((total - period.previous) / Math.abs(period.previous)) * 100
      : n > 1 && trend[0] !== 0
        ? ((trend[n - 1] - trend[0]) / Math.abs(trend[0])) * 100
        : 0;
  const deltaRounded = Math.round(delta * 10) / 10;

  const src = sources.find((s) => s.id === activeSource) ?? null;
  const maxAmount = Math.max(1e-9, ...sources.map((s) => s.amount));

  // what the big readout shows right now: a source, a scrubbed point, or the total
  const readout = src
    ? { label: src.label, value: src.amount, change: src.change, note: `${pct(sum ? (src.amount / sum) * 100 : 0)} of earnings` }
    : scrub !== null && n
      ? { label: period.trendLabels?.[scrub] ?? `Point ${scrub + 1}`, value: trend[scrub], change: undefined, note: "earned" }
      : { label: title, value: total, change: deltaRounded, note: period?.comparison ?? "vs previous period" };

  /* -------------------------------- trend -------------------------------- */
  const padX = 2, padT = 10, padB = 6;
  const min = n ? Math.min(...trend) : 0;
  const span = (n ? Math.max(...trend) : 1) - min || 1;
  const yOf = (v: number) => padT + (1 - (v - min) / span) * (SPARK_H - padT - padB);
  const xOf = (f: number) => padX + f * (width - padX * 2);
  const smooth = resample(trend, N_POINTS);
  const pts = smooth.map((v, i) => [xOf(i / (N_POINTS - 1)), yOf(v)] as [number, number]);
  const line = monotonePath(pts);
  const area = n > 1 ? `${line}L${pts[N_POINTS - 1][0].toFixed(2)} ${SPARK_H}L${pts[0][0].toFixed(2)} ${SPARK_H}Z` : "";
  const accent = SOURCE_COLORS[0];

  const curX = useSpring(0, { stiffness: 600, damping: 44, mass: 0.5 });
  const curY = useSpring(0, { stiffness: 600, damping: 44, mass: 0.5 });
  const seen = useRef(false);
  useEffect(() => {
    if (scrub === null || n < 2) {
      seen.current = false;
      return;
    }
    const f = scrub / (n - 1);
    const i0 = Math.min(N_POINTS - 2, Math.floor(f * (N_POINTS - 1)));
    const lf = f * (N_POINTS - 1) - i0;
    const y = pts[i0][1] + (pts[i0 + 1][1] - pts[i0][1]) * lf;
    if (!seen.current) {
      curX.jump(xOf(f));
      curY.jump(y);
      seen.current = true;
    } else {
      curX.set(xOf(f));
      curY.set(y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, width, periodId]);

  const scrubTo = (e: React.PointerEvent) => {
    if (n < 2 || !svgRef.current) return;
    const box = svgRef.current.getBoundingClientRect();
    const f = clamp((e.clientX - box.left - padX) / (width - padX * 2), 0, 1);
    setScrub(Math.round(f * (n - 1)));
    setActiveSource(null);
  };
  const onSparkKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setScrub((s) => clamp((s ?? n - 2) + 1, 0, n - 1));
    else if (e.key === "ArrowLeft") setScrub((s) => clamp((s ?? n) - 1, 0, n - 1));
    else if (e.key === "Escape") setScrub(null);
    else return;
    e.preventDefault();
  };

  const choosePeriod = (id: string) => {
    setPeriodId(id);
    setActiveSource(null);
    setScrub(null);
    onPeriodChange?.(id);
  };

  if (!period) return null;

  const spring = reduce ? { duration: 0 } : ({ type: "spring", duration: 0.6, bounce: 0 } as const);
  const good = readout.change === undefined ? null : readout.change === 0 ? null : readout.change > 0;
  const colorOf = (s: EarningsSource, i: number) => s.color ?? SOURCE_COLORS[i % SOURCE_COLORS.length];

  return (
    <section
      ref={cardRef}
      aria-label={title}
      className={`w-full min-w-0 rounded-[22px] bg-white p-4 text-neutral-700 antialiased dark:bg-[#0b0b0c] dark:text-neutral-300 sm:p-6 ${ring} ${className}`}
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 28px 56px -36px rgba(0,0,0,0.25)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <h3 className={`text-[13px] font-medium ${muted}`}>{title}</h3>
        {periods.length > 1 && (
          <SegmentedControl label="Period" value={period.id} onChange={choosePeriod} options={periods.map((p) => ({ value: p.id, label: p.label }))} />
        )}
      </div>

      {/* readout */}
      <div className="mt-4" aria-live="polite">
        <p className={`h-[18px] truncate text-[12.5px] ${muted}`}>{readout.label}</p>
        <p className="mt-1 text-[36px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-neutral-900 dark:text-neutral-50 sm:text-[44px]">
          <AnimatedNumber
            value={readout.value}
            format={readout.value === total && !src && scrub === null ? money : moneyExact}
            duration={src || scrub !== null ? 0.25 : 0.9}
            fromZero={anim}
          />
        </p>
        <p className="mt-2 flex min-h-[24px] flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]">
          {good !== null && (
            <span
              className={cx(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium tabular-nums",
                good ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              <svg viewBox="0 0 10 10" className={cx("h-2 w-2", !good && "rotate-180")} fill="currentColor" aria-hidden>
                <path d="M5 1.5 9 7.5H1Z" />
              </svg>
              {pct(readout.change as number)}
            </span>
          )}
          <span className={muted}>{readout.note}</span>
        </p>
      </div>

      {/* trend */}
      <div ref={sparkRef} className="mt-4" style={{ height: SPARK_H }}>
        {n > 1 && (
          <svg
            ref={svgRef}
            width={width}
            height={SPARK_H}
            role="img"
            aria-label={`Earnings trend, ${period.label}. Use left and right arrow keys to inspect.`}
            tabIndex={0}
            onKeyDown={onSparkKey}
            onPointerMove={scrubTo}
            onPointerDown={scrubTo}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setScrub(null);
            }}
            onBlur={() => setScrub(null)}
            className="block touch-pan-y overflow-visible rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/60 dark:focus-visible:ring-white/30"
          >
            <defs>
              <linearGradient id={`${uid}-a`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={accent} stopOpacity="0.26" />
                <stop offset="1" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              fill={`url(#${uid}-a)`}
              initial={anim ? { opacity: 0, d: area } : false}
              animate={{ opacity: 1, d: area }}
              transition={{ d: spring, opacity: { duration: 0.8, delay: anim ? 0.4 : 0 } }}
            />
            <motion.path
              fill="none"
              stroke={accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={anim ? { pathLength: 0, d: line } : false}
              animate={{ pathLength: 1, d: line }}
              transition={{ d: spring, pathLength: { duration: 1.1, ease: EASE_OUT, delay: 0.1 } }}
            />
            <motion.g initial={false} animate={{ opacity: scrub === null ? 0 : 1 }} transition={{ duration: 0.12 }}>
              <motion.line y1={0} y2={SPARK_H} x1={curX} x2={curX} strokeDasharray="2 3" className="stroke-black/20 dark:stroke-white/25" />
              <motion.circle cx={curX} cy={curY} r={4.5} fill={accent} strokeWidth={2} className="stroke-white dark:stroke-[#0b0b0c]" />
            </motion.g>
          </svg>
        )}
      </div>

      {/* split bar */}
      <div className="mt-6 flex h-3 w-full gap-[3px]" role="presentation">
        {sources.map((s, i) => {
          const share = sum ? Math.max(0, s.amount) / sum : 0;
          const dim = activeSource !== null && activeSource !== s.id;
          return (
            <motion.div
              key={s.id}
              className="h-full min-w-[3px] cursor-pointer rounded-full"
              style={{ background: colorOf(s, i), opacity: dim ? 0.3 : 1, transition: "opacity .2s" }}
              initial={anim ? { flexGrow: 0 } : false}
              animate={{ flexGrow: Math.max(share, 0.004), scaleY: activeSource === s.id ? 1.5 : 1 }}
              transition={anim ? { type: "spring", duration: 0.8, bounce: 0.1, delay: i * 0.06 } : spring}
              onPointerEnter={(e) => e.pointerType === "mouse" && (setActiveSource(s.id), setScrub(null))}
              onPointerLeave={(e) => e.pointerType === "mouse" && setActiveSource(null)}
              onClick={() => {
                setActiveSource((a) => (a === s.id ? null : s.id));
                setScrub(null);
              }}
            />
          );
        })}
      </div>

      {/* sources */}
      <ul className="mt-3" aria-label="Earnings by source">
        {sources.map((s, i) => {
          const c = colorOf(s, i);
          const on = activeSource === s.id;
          const share = sum ? (Math.max(0, s.amount) / sum) * 100 : 0;
          const up = (s.change ?? 0) > 0;
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={on}
                onPointerEnter={(e) => e.pointerType === "mouse" && (setActiveSource(s.id), setScrub(null))}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActiveSource(null)}
                onFocus={() => setActiveSource(s.id)}
                onBlur={() => setActiveSource(null)}
                onClick={() => {
                  setActiveSource((a) => (a === s.id ? null : s.id));
                  setScrub(null);
                }}
                className={cx(
                  "group relative flex min-h-[56px] w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left transition-[background-color,opacity] duration-150 [-webkit-tap-highlight-color:transparent]",
                  on ? "bg-black/[0.04] dark:bg-white/[0.05]" : "[@media(hover:hover)]:hover:bg-black/[0.03] dark:[@media(hover:hover)]:hover:bg-white/[0.04]",
                  activeSource !== null && !on && "opacity-55",
                  focus,
                )}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[13px] font-semibold"
                  style={{ background: `color-mix(in srgb, ${c} 16%, transparent)`, color: c }}
                  aria-hidden
                >
                  {s.icon ?? s.label.slice(0, 1).toUpperCase()}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[13.5px] font-medium text-neutral-900 dark:text-neutral-100">{s.label}</span>
                    <span className="shrink-0 text-[13.5px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                      <AnimatedNumber value={s.amount} format={moneyExact} fromZero={anim} />
                    </span>
                  </span>
                  <span className="mt-1.5 flex items-center gap-3">
                    <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.07]">
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: c, width: "100%", originX: 0 }}
                        initial={anim ? { scaleX: 0 } : false}
                        animate={{ scaleX: Math.max(0.01, s.amount / maxAmount) }}
                        transition={anim ? { duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.06 } : spring}
                      />
                    </span>
                    <span className="flex w-[84px] shrink-0 items-center justify-end gap-1.5 text-[11.5px] tabular-nums text-neutral-500">
                      {s.change !== undefined && s.change !== 0 && (
                        <span className={up ? "text-emerald-500" : "text-rose-500"}>
                          {up ? "▲" : "▼"} {pct(s.change)}
                        </span>
                      )}
                      <span>{pct(share)}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {payout && (
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4 text-[12.5px] dark:border-white/[0.07]">
          <span className={muted}>
            {payout.label ?? "Next payout"} · <span className="text-neutral-700 dark:text-neutral-300">{payout.date}</span>
          </span>
          {payout.amount !== undefined && <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{moneyExact(payout.amount)}</span>}
        </div>
      )}

      <table className="sr-only">
        <caption>{`${title}, ${period.label}`}</caption>
        <thead>
          <tr>
            <th scope="col">Source</th>
            <th scope="col">Amount</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s) => (
            <tr key={s.id}>
              <th scope="row">{s.label}</th>
              <td>{moneyExact(s.amount)}</td>
              <td>{pct(sum ? (s.amount / sum) * 100 : 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Earnings;
