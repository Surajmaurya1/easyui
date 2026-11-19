"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  ParticleDelete — items dissolve into dust, the list closes the gap.        */
/*  One file. Deps: react 19, framer-motion, tailwindcss. No lucide, no lib.   */
/*                                                                             */
/*  Exports: ParticleDelete · ParticleDeleteContainer · particleDelete()       */
/*           useParticleDelete() · restoreParticleDelete()                     */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  1. Particle engine (framework-free)                                       */
/* ========================================================================== */

export type ParticleDeleteOptions = {
  /** Dissolve duration in ms (default 1100) */
  duration?: number;
  /** Particles per 1,000 px² of the element (default 14) */
  density?: number;
  /** Hard cap on particles (default 1400, lower on touch / low-power devices) */
  maxParticles?: number;
  /** Which way the dissolve sweeps and the dust drifts (default "right") */
  direction?: "right" | "left" | "up" | "down";
  /** Override the colors. Defaults to light/dark compatible neutral greys */
  colors?: string[];
};

// Neutral grey palette with balanced contrast for visibility on both light and dark backgrounds
const DEFAULT_PARTICLE_COLORS = ["#8a8a8e", "#71717a", "#9ca3af", "#6b7280", "#78716c"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function restoreParticleDelete(el: HTMLElement) {
  el.style.maskImage = "";
  el.style.webkitMaskImage = "";
  el.style.filter = "";
  el.style.opacity = "";
  el.style.willChange = "";
}

export function particleDelete(el: HTMLElement, options: ParticleDeleteOptions = {}): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
  const {
    duration = 1100,
    density = 14,
    maxParticles = coarse || lowPower ? 700 : 1400,
    direction = "right",
    colors,
  } = options;

  // Reduced motion: a quick fade instead of dust
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return el
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" })
      .finished.then(() => {
        el.style.opacity = "0";
      });
  }

  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return Promise.resolve();

  /* --- palette --- */
  const palette = (colors?.length ? colors : DEFAULT_PARTICLE_COLORS).map((c) => ({
    c,
    w: 1,
  }));
  const total = palette.reduce((s, p) => s + p.w, 0);
  const pick = () => {
    let r = Math.random() * total;
    for (let i = 0; i < palette.length; i++) {
      r -= palette[i].w;
      if (r <= 0) return i;
    }
    return palette.length - 1;
  };

  /* --- canvas overlay (document-anchored so it survives scrolling) --- */
  const pad = Math.round(Math.min(140, Math.max(60, Math.max(rect.width, rect.height) * 0.35)));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cw = rect.width + pad * 2;
  const ch = rect.height + pad * 2;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(cw * dpr);
  canvas.height = Math.round(ch * dpr);
  Object.assign(canvas.style, {
    position: "absolute",
    left: `${rect.left + window.scrollX - pad}px`,
    top: `${rect.top + window.scrollY - pad}px`,
    width: `${cw}px`,
    height: `${ch}px`,
    pointerEvents: "none",
    zIndex: "2147483000",
  });
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve();
  ctx.scale(dpr, dpr);
  ctx.translate(pad, pad);
  document.body.appendChild(canvas);

  /* --- geometry --- */
  const horizontal = direction === "right" || direction === "left";
  const sgn = direction === "right" || direction === "down" ? 1 : -1;
  const L = horizontal ? rect.width : rect.height; // length along the sweep
  const C = horizontal ? rect.height : rect.width; // cross length
  const angle = { right: 90, left: 270, down: 180, up: 0 }[direction];
  const SOFT = 14; // soft edge of the mask, in %

  type Particle = {
    t0: number; x: number; y: number; vx: number; vy: number;
    life: number; age: number; size: number; ph: number; a0: number; ci: number;
  };

  const count = Math.round(Math.min(maxParticles, Math.max(80, (rect.width * rect.height * density) / 1000)));
  const queue: Particle[] = Array.from({ length: count }, () => {
    const u = Math.random(); // where along the sweep this speck lives
    const f = (u * 100 + SOFT) / (100 + SOFT); // mask progress when it becomes see-through
    const t0 = (Math.acos(1 - 2 * f) / Math.PI) * duration; // inverse of the sine ease
    const a = u * L + (Math.random() - 0.5) * 3;
    const c = Math.random() * C;
    const along = sgn * (24 + Math.random() ** 2 * 210);
    const cross = horizontal ? -(10 + Math.random() * 80) + (Math.random() - 0.5) * 40 : (Math.random() - 0.5) * 100;
    const big = Math.random() < 0.06;
    return {
      t0,
      x: horizontal ? (sgn === 1 ? a : L - a) : c,
      y: horizontal ? c : sgn === 1 ? a : L - a,
      vx: horizontal ? along : cross,
      vy: horizontal ? cross : along,
      life: 520 + Math.random() * 620,
      age: 0,
      size: big ? 2.4 + Math.random() * 1.2 : 0.7 + Math.random() * 1.5,
      ph: Math.random() * Math.PI * 2,
      a0: 0.55 + Math.random() * 0.45,
      ci: pick(),
    };
  }).sort((p, q) => p.t0 - q.t0);

  const active: Particle[][] = palette.map(() => []);
  let next = 0;
  let live = 0;

  el.style.willChange = "mask-image, filter";

  return new Promise<void>((resolve) => {
    const start = performance.now();
    let last = start;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      canvas.remove();
      el.style.willChange = "";
      resolve();
    };

    const frame = (now: number) => {
      if (done) return;
      const t = now - start;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const sec = t / 1000;

      // 1) the element itself erodes along the sweep
      const p = clamp01(t / duration);
      const f = 0.5 * (1 - Math.cos(Math.PI * p));
      const pos = f * (100 + SOFT);
      const mask = `linear-gradient(${angle}deg, transparent ${(pos - SOFT).toFixed(2)}%, #000 ${pos.toFixed(2)}%)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
      el.style.filter = `blur(${(f * 1.4).toFixed(2)}px)`;

      // 2) release specks as the edge passes them
      while (next < queue.length && queue[next].t0 <= t) {
        const q = queue[next++];
        active[q.ci].push(q);
        live++;
      }

      // 3) simulate + draw
      ctx.clearRect(-pad, -pad, cw, ch);
      for (let ci = 0; ci < active.length; ci++) {
        const bucket = active[ci];
        if (!bucket.length) continue;
        ctx.fillStyle = palette[ci].c;
        for (let i = bucket.length - 1; i >= 0; i--) {
          const q = bucket[i];
          q.age += dt * 1000;
          if (q.age >= q.life) {
            bucket[i] = bucket[bucket.length - 1];
            bucket.pop();
            live--;
            continue;
          }
          // gentle curl noise gives the dust an organic drift
          q.vx += Math.sin(q.y * 0.021 + sec * 3.1 + q.ph) * 70 * dt;
          q.vy += (Math.cos(q.x * 0.019 + sec * 2.4 + q.ph) * 70 - 20) * dt;
          const damp = 1 - 0.6 * dt;
          q.vx *= damp;
          q.vy *= damp;
          q.x += q.vx * dt;
          q.y += q.vy * dt;
          const k = q.age / q.life;
          const s = q.size * (1 - 0.5 * k);
          ctx.globalAlpha = q.a0 * (1 - k) ** 1.6;
          ctx.fillRect(q.x - s / 2, q.y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;

      if (p >= 1 && next >= queue.length && live <= 0) {
        el.style.maskImage = "linear-gradient(0deg, transparent, transparent)";
        el.style.webkitMaskImage = el.style.maskImage;
        finish();
        return;
      }
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
    setTimeout(finish, duration + 2600); // safety net
  });
}

export function useParticleDelete(options?: ParticleDeleteOptions) {
  const [isDeleting, setIsDeleting] = useState(false);
  const opts = useRef(options);
  opts.current = options;

  const triggerDelete = useCallback(async (el: HTMLElement, onDone?: () => void) => {
    setIsDeleting(true);
    try {
      await particleDelete(el, opts.current);
    } finally {
      setIsDeleting(false);
    }
    onDone?.();
  }, []);

  return { isDeleting, triggerDelete };
}

/* ========================================================================== */
/*  2. Reusable wrapper — attach the dissolve to anything                     */
/* ========================================================================== */

export interface ParticleDeleteContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Called after the dissolve finishes (the element stays hidden — unmount it here) */
  onDelete?: () => void;
  options?: ParticleDeleteOptions;
  children:
    | React.ReactNode
    | ((args: { isDeleting: boolean; handleDelete: () => void }) => React.ReactNode);
}

export const ParticleDeleteContainer = React.forwardRef<HTMLDivElement, ParticleDeleteContainerProps>(
  ({ onDelete, options, children, className, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const { isDeleting, triggerDelete } = useParticleDelete(options);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const handleDelete = () => {
      const el = localRef.current;
      if (el) void triggerDelete(el, onDelete);
      else onDelete?.();
    };

    return (
      <div
        ref={setRefs}
        className={["relative", className].filter(Boolean).join(" ")}
        data-deleting={isDeleting}
        {...props}
      >
        {typeof children === "function" ? children({ isDeleting, handleDelete }) : children}
      </div>
    );
  },
);
ParticleDeleteContainer.displayName = "ParticleDeleteContainer";

/* ========================================================================== */
/*  3. The component                                                          */
/* ========================================================================== */

export interface ParticleDeleteItem {
  id: string;
  title: string;
  /** Shown as a tooltip (kept in the type for backwards compatibility) */
  category: string;
  description: string;
  icon: "shield" | "database" | "cpu" | "layers";
  /** Status label, shown with a live dot */
  tag: string;
  /** Shown as a tooltip */
  meta: string;
}

export interface ParticleDeleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialItems?: ParticleDeleteItem[];
  options?: ParticleDeleteOptions;
  onItemDeleted?: (item: ParticleDeleteItem) => void;
  onRestore?: () => void;
}

const DEFAULT_SAMPLE_ITEMS: ParticleDeleteItem[] = [
  {
    id: "edge-cluster-iad1",
    title: "Edge Cluster",
    category: "Infra",
    description: "12 workers · 42 ms latency",
    icon: "cpu",
    tag: "Healthy",
    meta: "iad-1 · Primary route",
  },
  {
    id: "auth-session-vault",
    title: "Session Vault",
    category: "Security",
    description: "RSA-4096 · Rotation active",
    icon: "shield",
    tag: "Active",
    meta: "Vault #01",
  },
  {
    id: "redis-cache-layer",
    title: "L2 Memory Cache",
    category: "Database",
    description: "1.2 GB · 99.8% hit ratio",
    icon: "database",
    tag: "Optimal",
    meta: "Redis v7",
  },
];

/* ---------------------------------- Icons ---------------------------------- */

const ICON_PATHS: Record<string, string> = {
  shield: "M12 3 4.5 6v5.5c0 4.4 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5.1 7.5-9.5V6Z",
  database:
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3ZM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  cpu: "M7 7h10v10H7ZM10 10h4v4h-4ZM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
  layers: "m12 3 9 5-9 5-9-5ZM3 12.5l9 5 9-5",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3",
  restore: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
};

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={ICON_PATHS[name] ?? ICON_PATHS.layers} />
    </svg>
  );
}

/* -------------------------------- Component -------------------------------- */

const SPRING = { type: "spring", duration: 0.45, bounce: 0 } as const;
const ring =
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

export const ParticleDelete: React.FC<ParticleDeleteProps> = ({
  initialItems = DEFAULT_SAMPLE_ITEMS,
  options,
  onItemDeleted,
  onRestore,
  className = "",
  ...props
}) => {
  const reduce = useReducedMotion();

  const [removed, setRemoved] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<string[]>([]);
  const [announce, setAnnounce] = useState("");

  const cardRefs = useRef(new Map<string, HTMLElement>());
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const restoreRef = useRef<HTMLButtonElement>(null);
  const emptyRestoreRef = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<string | null>(null);

  const items = initialItems.filter((i) => !removed.includes(i.id));

  // Animate the card's height as rows leave / return
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep keyboard focus on something sensible after a row disappears
  useEffect(() => {
    const id = focusNext.current;
    if (!id) return;
    focusNext.current = null;
    (buttonRefs.current.get(id) ?? emptyRestoreRef.current ?? restoreRef.current)?.focus({ preventScroll: true });
  }, [removed]);

  const handleDelete = async (item: ParticleDeleteItem) => {
    if (deleting.includes(item.id)) return;
    const idx = items.findIndex((i) => i.id === item.id);
    const neighbour = (items[idx + 1] ?? items[idx - 1])?.id ?? null;

    setDeleting((d) => [...d, item.id]);
    const el = cardRefs.current.get(item.id);
    if (el) await particleDelete(el, options);

    focusNext.current = neighbour ?? "__none";
    setRemoved((r) => [...r, item.id]);
    setDeleting((d) => d.filter((x) => x !== item.id));
    setAnnounce(`${item.title} deleted`);
    onItemDeleted?.(item);
  };

  const handleRestore = () => {
    setRemoved([]);
    setAnnounce("All resources restored");
    onRestore?.();
  };

  return (
    <div
      role="region"
      aria-label="Resources"
      className={`mx-auto w-full max-w-lg ${className}`}
      {...props}
    >
      <motion.div
        className="overflow-hidden rounded-2xl bg-[#0b0b0c] text-neutral-100 ring-1 ring-white/[0.07]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.4), 0 28px 56px -28px rgba(0,0,0,0.85)",
        }}
        initial={false}
        animate={{ height: height ?? "auto" }}
        transition={reduce ? { duration: 0 } : SPRING}
      >
        <div ref={innerRef} className="p-2">
          {/* Header */}
          <div className="flex h-9 items-center justify-between px-2.5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-[12px] font-medium tracking-[0.01em] text-neutral-300">Resources</h2>
              <span className="relative inline-flex h-4 min-w-[1ch] overflow-hidden text-[11px] tabular-nums text-neutral-600">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={items.length}
                    initial={{ y: reduce ? 0 : 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: reduce ? 0 : -8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {items.length}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <AnimatePresence initial={false}>
              {removed.length > 0 && (
                <motion.button
                  key="restore"
                  ref={restoreRef}
                  type="button"
                  onClick={handleRestore}
                  initial={{ opacity: 0, x: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`-mr-1 inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-[11.5px] text-neutral-500 transition-colors duration-150 [@media(hover:hover)]:hover:text-neutral-200 ${ring}`}
                >
                  <Icon name="restore" className="h-3 w-3" />
                  Restore{removed.length > 1 ? ` ${removed.length}` : ""}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Rows */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <span className="h-6 w-6 rounded-full border border-dashed border-white/15" aria-hidden />
              <p className="text-[12.5px] text-neutral-500">Nothing left. All dissolved.</p>
              <button
                ref={emptyRestoreRef}
                type="button"
                onClick={handleRestore}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] text-neutral-300 underline decoration-white/20 underline-offset-4 transition-colors duration-150 [@media(hover:hover)]:hover:text-white ${ring}`}
              >
                Restore resources
              </button>
            </div>
          ) : (
            <ul className="mt-1 flex flex-col gap-1.5">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const busy = deleting.includes(item.id);
                  return (
                    <motion.li
                      key={item.id}
                      layout="position"
                      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ layout: reduce ? { duration: 0 } : SPRING, duration: 0.25 }}
                    >
                      <div
                        ref={(node) => {
                          if (node) cardRefs.current.set(item.id, node);
                          else cardRefs.current.delete(item.id);
                        }}
                        title={`${item.category} · ${item.meta}`}
                        aria-busy={busy}
                        className={`group flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-2.5 ring-1 ring-white/[0.06] transition-[background-color,box-shadow] duration-200 focus-within:bg-white/[0.045] [@media(hover:hover)]:hover:bg-white/[0.045] [@media(hover:hover)]:hover:ring-white/[0.11] ${
                          busy ? "pointer-events-none" : ""
                        }`}
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-neutral-400 ring-1 ring-white/[0.06]">
                          <Icon name={item.icon} className="h-[15px] w-[15px]" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium leading-tight tracking-[-0.01em] text-neutral-100">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] leading-tight text-neutral-500">
                            {item.description}
                          </span>
                        </span>

                        <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-neutral-500">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            style={{ boxShadow: "0 0 8px rgba(52,211,153,0.55)" }}
                            aria-hidden
                          />
                          <span className="hidden sm:inline">{item.tag}</span>
                          <span className="sr-only sm:hidden">{item.tag}</span>
                        </span>

                        <button
                          ref={(node) => {
                            if (node) buttonRefs.current.set(item.id, node);
                            else buttonRefs.current.delete(item.id);
                          }}
                          type="button"
                          disabled={busy}
                          onClick={() => handleDelete(item)}
                          aria-label={`Delete ${item.title}`}
                          className={`-mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-neutral-600 transition-[color,background-color,opacity,transform] duration-150 active:scale-[0.92] [-webkit-tap-highlight-color:transparent] focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:hover:bg-rose-500/10 [@media(hover:hover)]:hover:text-rose-300 ${ring}`}
                        >
                          <Icon name="trash" className="h-[15px] w-[15px]" />
                        </button>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </motion.div>

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </div>
  );
};

export default ParticleDelete;