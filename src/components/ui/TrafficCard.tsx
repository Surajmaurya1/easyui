"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  EASE_OUT,
  clamp,
  cx,
  defaultFormat,
  focus,
  muted,
  ring,
  useDismissOutside,
  useElementWidth,
} from "../../lib/chart-primitives";

/* -------------------------------------------------------------------------- */
/*  TrafficCard                                                               */
/*                                                                            */
/*  A compact traffic block: a big visit count, a Day / Week switcher, and a   */
/*  stacked column chart where every channel is its own rounded capsule.       */
/*  Hand-written SVG · light and dark · measures its own container.            */
/* -------------------------------------------------------------------------- */

export const TRAFFIC_COLORS = ["#f26f6f", "#a78bfa", "#5b9dff", "#9bc8fd", "#f2c66d"];

const TOOLTIP_W = 150;
const HOVER_SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

export interface TrafficChannel {
  /** Matches a key in every point's `values` record */
  id: string;
  label: string;
  /** Any CSS color. Defaults to the built-in traffic palette */
  color?: string;
}

export interface TrafficPoint {
  /** Axis label, e.g. "Oct 04" */
  label: string;
  /** Channel id → visits for this interval */
  values: Record<string, number>;
}

export interface TrafficRange {
  id: string;
  /** Segmented-control label, e.g. "Day" */
  label: string;
  /** Caption under the title, e.g. "Last 20 days" */
  caption?: string;
  /** Headline total. Defaults to the sum of all points */
  total?: number;
  /** One column per entry, oldest → newest */
  points: TrafficPoint[];
}

export interface TrafficCardProps {
  ranges: TrafficRange[];
  channels: TrafficChannel[];
  /** Initial range id (default: the first range) */
  defaultRange?: string;
  onRangeChange?: (id: string) => void;
  title?: string;
  /** Noun next to the headline number */
  unit?: string;
  /** Formats the headline, axis, tooltip, and screen-reader values */
  format?: (n: number) => string;
  /** Chart height in pixels */
  height?: number;
  /** Entrance animation (also disabled by prefers-reduced-motion) */
  animated?: boolean;
  className?: string;
}

/* --------------------------------- switch --------------------------------- */

function RangeSwitch<T extends string>({
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
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (dir: number) => {
    const current = options.findIndex((o) => o.value === value);
    const next = (current + dir + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          move(-1);
        }
      }}
      className="relative inline-flex shrink-0 rounded-full bg-black/[0.045] p-[3px] dark:bg-white/[0.07]"
    >
      {options.map((o, index) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={cx(
              "relative z-10 h-7 rounded-full px-3.5 text-[12px] font-medium transition-colors duration-150 [-webkit-tap-highlight-color:transparent]",
              on
                ? "text-neutral-900 dark:text-neutral-50"
                : "text-neutral-500 [@media(hover:hover)]:hover:text-neutral-700 dark:[@media(hover:hover)]:hover:text-neutral-300",
              focus,
            )}
          >
            {on && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.14)] dark:bg-white/[0.14] dark:shadow-none"
                transition={{ type: "spring", duration: 0.3, bounce: 0.12 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------- number --------------------------------- */

function AnimatedNumber({
  value,
  format,
  animated,
}: {
  value: number;
  format: (n: number) => string;
  animated: boolean;
}) {
  const reduce = useReducedMotion();
  const shown = useMotionValue(value);
  const fmt = useRef(format);
  fmt.current = format;
  const text = useTransform(shown, (v) => fmt.current(v));
  const first = useRef(true);

  // Start the first browser frame at zero without flashing the final value
  // that the server rendered.
  useLayoutEffect(() => {
    if (!first.current) return;
    first.current = false;
    if (animated && !reduce) shown.jump(0);
  }, [animated, reduce, shown]);

  useEffect(() => {
    if (!animated || reduce) {
      shown.set(value);
      return;
    }
    const controls = animate(shown, value, { duration: 0.9, ease: EASE_OUT });
    return () => controls.stop();
  }, [value, animated, reduce, shown]);

  return <motion.span>{text}</motion.span>;
}

/* ---------------------------------- card ---------------------------------- */

const countFormat = (n: number) => defaultFormat(Math.round(n));

export function TrafficCard({
  ranges,
  channels,
  defaultRange,
  onRangeChange,
  title = "Traffic",
  unit = "visits",
  format = countFormat,
  height = 132,
  animated = true,
  className = "",
}: TrafficCardProps) {
  const reduce = useReducedMotion();
  const anim = animated && !reduce;
  const [rangeId, setRangeId] = useState(defaultRange ?? ranges[0]?.id ?? "");
  const [active, setActive] = useState<number | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [boxRef, width] = useElementWidth<HTMLDivElement>(340);
  useDismissOutside(cardRef, active !== null, useCallback(() => setActive(null), []));

  const range = ranges.find((r) => r.id === rangeId) ?? ranges[0];

  const points = range?.points ?? [];
  const n = points.length;
  const valueOf = (point: TrafficPoint, channel: TrafficChannel) =>
    Math.max(0, Number(point.values[channel.id]) || 0);
  const columnTotals = points.map((point) =>
    channels.reduce((sum, channel) => sum + valueOf(point, channel), 0),
  );
  const total = range?.total ?? columnTotals.reduce((sum, v) => sum + v, 0);

  const padTop = 6;
  const gapY = 3;
  const maxTotal = Math.max(1, ...columnTotals);
  const maxSegments = Math.max(
    1,
    ...points.map((point) => channels.filter((channel) => valueOf(point, channel) > 0).length),
  );
  const scale = Math.max(1, height - padTop - gapY * (maxSegments - 1)) / maxTotal;
  const stepX = width / Math.max(1, n);
  const barW = clamp(stepX * 0.44, 3, 10);

  const colorOf = (channel: TrafficChannel, index: number) =>
    channel.color ?? TRAFFIC_COLORS[index % TRAFFIC_COLORS.length];

  const columns = points.map((point, i) => {
    const segments: { id: string; y: number; h: number; color: string }[] = [];
    let cursor = height;
    channels.forEach((channel, ci) => {
      const value = valueOf(point, channel);
      if (value <= 0) return;
      const h = Math.max(2, value * scale);
      segments.push({ id: channel.id, y: cursor - h, h, color: colorOf(channel, ci) });
      cursor -= h + gapY;
    });
    return {
      x: stepX * i + stepX / 2 - barW / 2,
      // Segments stack upward, so the last one drawn sits at the top.
      top: segments[segments.length - 1]?.y ?? height,
      segments,
    };
  });

  const chooseRange = (id: string) => {
    setRangeId(id);
    setActive(null);
    onRangeChange?.(id);
  };

  /* hover ring + tooltip: placed at once when they appear, then glide */
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const ringH = useMotionValue(0);
  const tipX = useMotionValue(0);
  const hovered = useRef(false);
  useEffect(() => {
    const column = active !== null ? columns[active] : undefined;
    if (!column) {
      hovered.current = false;
      return;
    }
    const right = column.x + barW + 8;
    const target = {
      x: column.x - 3,
      y: column.top - 3,
      h: height - column.top + 6,
      tip: right + TOOLTIP_W <= width ? right : Math.max(4, column.x - 8 - TOOLTIP_W),
    };
    if (!hovered.current) {
      ringX.jump(target.x);
      ringY.jump(target.y);
      ringH.jump(target.h);
      tipX.jump(target.tip);
      hovered.current = true;
      return;
    }
    const transition = reduce ? { duration: 0 } : HOVER_SPRING;
    animate(ringX, target.x, transition);
    animate(ringY, target.y, transition);
    animate(ringH, target.h, transition);
    animate(tipX, target.tip, transition);
  }, [active, columns, width, height, barW, reduce, ringX, ringY, ringH, tipX]);

  const move = (e: ReactPointerEvent<SVGRectElement>) => {
    if (n < 1) return;
    const box = e.currentTarget.getBoundingClientRect();
    setActive(clamp(Math.floor((e.clientX - box.left) / stepX), 0, n - 1));
  };
  const onKey = (e: ReactKeyboardEvent) => {
    if (!n) return;
    if (e.key === "ArrowRight") setActive((a) => clamp((a ?? n - 2) + 1, 0, n - 1));
    else if (e.key === "ArrowLeft") setActive((a) => clamp((a ?? n) - 1, 0, n - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(n - 1);
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  };

  return (
    <section
      ref={cardRef}
      aria-label={title}
      className={`w-full min-w-0 select-none rounded-[20px] bg-white p-5 text-neutral-700 antialiased [--traffic-slab:#ffffff] dark:bg-[#0b0b0c] dark:text-neutral-300 dark:[--traffic-slab:#0b0b0c] ${ring} ${className}`}
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 24px 48px -32px rgba(0,0,0,0.18)" }}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-medium tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          {range?.caption && <p className={`mt-0.5 truncate text-[12.5px] ${muted}`}>{range.caption}</p>}
        </div>
        {ranges.length > 1 && (
          <RangeSwitch
            label="Traffic range"
            value={range?.id ?? ""}
            onChange={chooseRange}
            options={ranges.map((r) => ({ value: r.id, label: r.label }))}
          />
        )}
      </div>

      {/* headline */}
      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-[36px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-neutral-900 dark:text-neutral-50 sm:text-[40px]">
          <AnimatedNumber value={total} format={format} animated={anim} />
        </span>
        <span className={`text-[13px] ${muted}`}>{unit}</span>
      </p>

      {/* chart */}
      <div ref={boxRef} className="relative mt-4" style={{ height }}>
        {n > 1 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={`${title} by ${channels.map((c) => c.label).join(", ")} across ${n} intervals, from ${points[0].label} to ${points[n - 1].label}. Use the left and right arrow keys to inspect each interval.`}
            tabIndex={0}
            onKeyDown={onKey}
            onBlur={() => setActive(null)}
            className="block touch-pan-y overflow-visible rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/60 dark:focus-visible:ring-white/30"
          >
            {/* stacked capsules */}
            <g key={range?.id}>
              {columns.map((column, i) => (
                <g key={i}>
                  <motion.g
                    initial={anim ? { opacity: 0, scaleY: 0.9 } : false}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={anim ? { duration: 0.55, ease: EASE_OUT, delay: i * 0.02 } : { duration: 0 }}
                    style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                  >
                    {column.segments.map((segment) => (
                      <rect
                        key={segment.id}
                        x={column.x}
                        y={segment.y}
                        width={barW}
                        height={segment.h}
                        rx={Math.min(barW / 2, segment.h / 2)}
                        fill={segment.color}
                        style={{
                          fill:
                            active !== null && active !== i
                              ? `color-mix(in srgb, ${segment.color} 38%, var(--traffic-slab))`
                              : segment.color,
                          transition: "fill .18s ease",
                        }}
                      />
                    ))}
                  </motion.g>
                </g>
              ))}
            </g>

            {/* pointer surface */}
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="transparent"
              onPointerMove={move}
              onPointerDown={move}
              onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
            />
          </svg>
        )}

        {/* ring round the hovered stack */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 border border-black/[0.16] dark:border-white/25"
          style={{
            x: ringX,
            y: ringY,
            height: ringH,
            width: barW + 6,
            borderRadius: barW / 2 + 3,
          }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1 }}
          transition={{ duration: 0.12 }}
        />

        {/* one tooltip glides beside the hovered column */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 rounded-xl bg-white/95 px-2.5 py-2 text-[11px] shadow-lg backdrop-blur ring-1 ring-black/[0.07] dark:bg-neutral-900/95 dark:ring-white/[0.07]"
          style={{ x: tipX, width: TOOLTIP_W }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1 }}
          transition={{ duration: 0.14, ease: EASE_OUT }}
        >
          {active !== null && points[active] && (
            <>
              <p className="flex items-baseline justify-between gap-3 font-medium text-neutral-900 dark:text-neutral-100">
                <span className="truncate">{points[active].label}</span>
                <span className="shrink-0 tabular-nums">{format(columnTotals[active] ?? 0)}</span>
              </p>
              <ul className="mt-1.5 space-y-[3px]">
                {channels.map((channel, ci) => {
                  const value = valueOf(points[active], channel);
                  if (value <= 0) return null;
                  return (
                    <li key={channel.id} className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-1.5 text-neutral-500">
                        <span
                          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: colorOf(channel, ci) }}
                        />
                        <span className="truncate">{channel.label}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-neutral-900 dark:text-neutral-100">
                        {format(value)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </motion.div>

        {n < 2 && <p className={`absolute inset-0 grid place-items-center text-[12.5px] ${muted}`}>Not enough data</p>}
      </div>

      {/* axis */}
      <div className={`mt-3 flex items-center justify-between gap-3 text-[11.5px] tabular-nums ${muted}`}>
        <span>{points[0]?.label}</span>
        <span>{points[n - 1]?.label}</span>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {active !== null && points[active]
          ? `${points[active].label}: ${format(columnTotals[active] ?? 0)} ${unit}`
          : ""}
      </p>

      <table className="sr-only">
        <caption>{`${title} by channel, ${range?.label ?? ""} (${range?.caption ?? ""})`}</caption>
        <thead>
          <tr>
            <th scope="col">Interval</th>
            {channels.map((channel) => (
              <th key={channel.id} scope="col">
                {channel.label}
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, i) => (
            <tr key={i}>
              <th scope="row">{point.label}</th>
              {channels.map((channel) => (
                <td key={channel.id}>{format(valueOf(point, channel))}</td>
              ))}
              <td>{format(columnTotals[i])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">All</th>
            {channels.map((channel) => (
              <td key={channel.id}>{format(points.reduce((sum, p) => sum + valueOf(p, channel), 0))}</td>
            ))}
            <td>{format(total)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default TrafficCard;
