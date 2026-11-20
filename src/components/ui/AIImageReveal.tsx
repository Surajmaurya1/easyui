"use client";

import {
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  AIImageReveal — the "image is being generated" moment.                     */
/*                                                                             */
/*   1. While the model works: a soft cloud of particles drifts and breathes.   */
/*   2. When the image arrives: every particle flies to a spot on the canvas,   */
/*      wearing the color of the pixel it will become (a noisy mosaic that      */
/*      cleans up as it lands, like denoising).                                 */
/*   3. The real image resolves out of the mosaic: blur → sharp.                */
/*                                                                             */
/*  One file · deps: react 19, framer-motion, tailwindcss · light + dark.      */
/*  The particle engine is plain typed-array math on one small canvas, so it   */
/*  stays smooth on phones, and it switches itself off the moment it's done.   */
/*                                                                             */
/*    <AIImageReveal src={url} alt="A lake at dusk" />   // no src = generating */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Particle engine (headless, exported for tests)                            */
/* ========================================================================== */

export interface ParticleField {
  readonly count: number;
  readonly cols: number;
  readonly rows: number;
  readonly cell: number;
  /** Advance the ambient cloud */
  stepIdle(dt: number, t: number): void;
  /** Aim every particle at a cell of the image. `rgb` = 3 bytes per cell (or null for soft generic colors) */
  setTargets(rgb: ArrayLike<number> | null): void;
  /**
   * Paint the field into `out` (RGBA, little-endian Uint32, width*height).
   * `elapsed` = seconds since the gather began, or null for the idle cloud.
   * Returns true once every particle has landed.
   */
  draw(out: Uint32Array, t: number, elapsed: number | null, duration: number): boolean;
}

const TAU = Math.PI * 2;
const clamp = (v: number, min: number, max: number) => (v < min ? min : v > max ? max : v);
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hexRgb = (h: string): [number, number, number] => {
  const n = parseInt(h.replace("#", "").slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export function createParticleField(opts: {
  width: number;
  height: number;
  cell: number;
  colors: string[];
  seed?: number;
}): ParticleField {
  const { width: W, height: H, cell, colors } = opts;
  const rnd = mulberry32(opts.seed ?? 7);
  const cols = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);
  const n = cols * rows;
  const palette = (colors.length ? colors : ["#888888"]).map(hexRgb);

  const px = new Float32Array(n), py = new Float32Array(n);
  const sx = new Float32Array(n), sy = new Float32Array(n);
  const tx = new Float32Array(n), ty = new Float32Array(n);
  const delay = new Float32Array(n), arc = new Float32Array(n), nz = new Float32Array(n), ph = new Float32Array(n);
  const size = new Float32Array(n);
  const ir = new Uint8Array(n), ig = new Uint8Array(n), ib = new Uint8Array(n);
  const tr = new Uint8Array(n), tg = new Uint8Array(n), tb = new Uint8Array(n);
  const perm = new Uint32Array(n);

  const cx = W / 2, cy = H / 2;
  const sigma = Math.min(W, H) * 0.2;
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(TAU * rnd());

  for (let i = 0; i < n; i++) {
    perm[i] = i;
    px[i] = cx + gauss() * sigma * 1.15;
    py[i] = cy + gauss() * sigma;
    ph[i] = rnd() * TAU;
    size[i] = 1 + rnd() * 1.6;
    delay[i] = rnd();
    arc[i] = rnd() * 2 - 1;
    nz[i] = rnd() * 2 - 1;
    const c = palette[Math.floor(rnd() * palette.length)];
    ir[i] = c[0];
    ig[i] = c[1];
    ib[i] = c[2];
  }
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }

  const pack = (r: number, g: number, b: number, a: number) =>
    ((a & 255) << 24) | ((b & 255) << 16) | ((g & 255) << 8) | (r & 255);

  const block = (out: Uint32Array, x: number, y: number, s: number, color: number) => {
    const ps = s < 1.5 ? 1 : Math.round(s);
    const x0 = Math.round(x - ps / 2), y0 = Math.round(y - ps / 2);
    const xa = x0 < 0 ? 0 : x0, ya = y0 < 0 ? 0 : y0;
    const xb = x0 + ps > W ? W : x0 + ps, yb = y0 + ps > H ? H : y0 + ps;
    for (let yy = ya; yy < yb; yy++) {
      const row = yy * W;
      for (let xx = xa; xx < xb; xx++) out[row + xx] = color;
    }
  };

  return {
    count: n,
    cols,
    rows,
    cell,

    stepIdle(dt, t) {
      const omega = 0.16;
      const k = 0.2;
      for (let i = 0; i < n; i++) {
        const dx = px[i] - cx, dy = py[i] - cy;
        const vx = -dy * omega + Math.sin(py[i] * 0.021 + t * 0.55 + ph[i]) * 30 - dx * k;
        const vy = dx * omega + Math.cos(px[i] * 0.018 - t * 0.47 + ph[i]) * 30 - dy * k;
        px[i] += vx * dt;
        py[i] += vy * dt;
      }
    },

    setTargets(rgb) {
      for (let i = 0; i < n; i++) {
        const c = perm[i];
        const col = c % cols, row = (c / cols) | 0;
        tx[i] = (col + 0.5) * cell;
        ty[i] = (row + 0.5) * cell;
        sx[i] = px[i];
        sy[i] = py[i];
        if (rgb) {
          tr[i] = rgb[c * 3];
          tg[i] = rgb[c * 3 + 1];
          tb[i] = rgb[c * 3 + 2];
        } else {
          // no pixel access (cross-origin image): a soft generic gradient, the image resolves over it
          const m = palette[(col + row) % palette.length];
          tr[i] = m[0];
          tg[i] = m[1];
          tb[i] = m[2];
        }
      }
    },

    draw(out, t, elapsed, duration) {
      out.fill(0);
      if (elapsed === null) {
        for (let i = 0; i < n; i++) {
          const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + ph[i] * 3);
          block(out, px[i], py[i], size[i], pack(ir[i], ig[i], ib[i], 90 + 150 * tw));
        }
        return false;
      }
      const travel = duration * 0.72;
      const maxDelay = duration * 0.28;
      let done = true;
      for (let i = 0; i < n; i++) {
        const u = clamp((elapsed - delay[i] * maxDelay) / travel, 0, 1);
        if (u < 1) done = false;
        const e = easeInOut(u);
        let x = sx[i] + (tx[i] - sx[i]) * e;
        let y = sy[i] + (ty[i] - sy[i]) * e;
        // curved flight: a sideways bow that vanishes on arrival
        const dxv = tx[i] - sx[i], dyv = ty[i] - sy[i];
        const len = Math.hypot(dxv, dyv) || 1;
        const bow = arc[i] * Math.sin(Math.PI * e) * len * 0.22;
        x += (-dyv / len) * bow;
        y += (dxv / len) * bow;
        const s = size[i] + (cell - size[i]) * e * e;
        // colour: starts as the cloud's, ends as the pixel; noise melts away as it lands (denoise)
        const noise = nz[i] * 80 * (1 - e);
        const r = ir[i] + (tr[i] - ir[i]) * e + noise;
        const g = ig[i] + (tg[i] - ig[i]) * e + noise;
        const b = ib[i] + (tb[i] - ib[i]) * e + noise;
        block(
          out,
          e >= 1 ? tx[i] : x,
          e >= 1 ? ty[i] : y,
          s,
          pack(clamp(r, 0, 255) | 0, clamp(g, 0, 255) | 0, clamp(b, 0, 255) | 0, 150 + 105 * e),
        );
      }
      return done;
    },
  };
}

/** Average colour of every `cell`×`cell` block of an RGBA image (3 bytes per block) */
export function averageCells(data: ArrayLike<number>, W: number, H: number, cell: number): Uint8Array {
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const out = new Uint8Array(cols * rows * 3);
  for (let cy = 0; cy < rows; cy++) {
    for (let cxx = 0; cxx < cols; cxx++) {
      let r = 0, g = 0, b = 0, c = 0;
      const x1 = Math.min(W, (cxx + 1) * cell), y1 = Math.min(H, (cy + 1) * cell);
      const step = Math.max(1, Math.floor(cell / 4));
      for (let y = cy * cell; y < y1; y += step)
        for (let x = cxx * cell; x < x1; x += step) {
          const o = (y * W + x) * 4;
          r += data[o];
          g += data[o + 1];
          b += data[o + 2];
          c++;
        }
      const k = (cy * cols + cxx) * 3;
      out[k] = r / (c || 1);
      out[k + 1] = g / (c || 1);
      out[k + 2] = b / (c || 1);
    }
  }
  return out;
}

/* ========================================================================== */
/*  Component                                                                 */
/* ========================================================================== */

export interface AIImageRevealHandle {
  /** Play the generate → reveal sequence again with the current image */
  replay: () => void;
}

export interface AIImageRevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The finished image. Leave empty while the model is still working */
  src?: string | null;
  alt: string;
  /** Force the waiting state even if `src` is already set (default: waiting when there is no src) */
  generating?: boolean;
  /** width ÷ height (default 1, a square) */
  aspectRatio?: number;
  /** Shown under the image */
  prompt?: string;
  /** Text on the status pill while waiting (default "Generating…") */
  generatingLabel?: string;
  /** Particle colors for the waiting cloud (#rrggbb). Defaults suit the current theme */
  colors?: string[];
  /** 0.4 – 2. More particles = finer mosaic (default 1) */
  density?: number;
  /** Seconds the whole particles → image reveal takes (default 3.2) */
  duration?: number;
  crossOrigin?: "anonymous" | "use-credentials" | "";
  onReveal?: () => void;
  onImageError?: () => void;
}

type Phase = "idle" | "gather" | "refine" | "done" | "error";

const isDark = () => {
  const el = document.documentElement;
  if (el.classList.contains("dark")) return true;
  if (el.classList.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
const DARK_COLORS = ["#8ea2ff", "#7ee8d6", "#ffd28a", "#ff9bb8", "#c4b0ff", "#f4f4f5"];
const LIGHT_COLORS = ["#5b6cf0", "#0f9d8f", "#d99a1f", "#e5546f", "#8a63e8", "#27272a"];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const REFINE_AT = 0.9; // the image starts resolving when the particles are 90% landed

export const AIImageReveal = forwardRef<AIImageRevealHandle, AIImageRevealProps>(function AIImageReveal(
  {
    src,
    alt,
    generating,
    aspectRatio = 1,
    prompt,
    generatingLabel = "Generating…",
    colors,
    density = 1,
    duration = 3.2,
    crossOrigin = "anonymous",
    onReveal,
    onImageError,
    className = "",
    ...rest
  },
  ref,
) {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState<Phase>("idle");
  const [loaded, setLoaded] = useState<string | null>(null); // the src that is decoded and ready to show
  const [run, setRun] = useState(0); // bump to replay

  const waiting = generating ?? !src;
  const cb = useRef({ onReveal, onImageError, duration });
  cb.current = { onReveal, onImageError, duration };

  // live engine state (kept out of React so the loop never re-renders)
  const engine = useRef<{
    field: ParticleField | null;
    mode: "idle" | "gather" | "hold";
    gatherStart: number;
    refined: boolean;
    kick: () => void;
  }>({ field: null, mode: "idle", gatherStart: -1, refined: false, kick: () => {} });

  useImperativeHandle(ref, () => ({ replay: () => setRun((n) => n + 1) }), []);

  /* ------------------------------ measure ------------------------------ */
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      if (w && h) setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* --------------------- engine: field + render loop --------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !size.w || reduce) return;

    const W = size.w, H = size.h;
    const maxParticles = clamp(9000 * density, 1500, 24000);
    const cell = clamp(Math.round(Math.sqrt((W * H) / maxParticles)), 3, 16);
    canvas.width = W;
    canvas.height = H;
    const palette = colors?.length ? colors : isDark() ? DARK_COLORS : LIGHT_COLORS;
    const field = createParticleField({ width: W, height: H, cell, colors: palette });
    const image = ctx.createImageData(W, H);
    const buf = new Uint32Array(image.data.buffer);
    const eng = engine.current;
    eng.field = field;
    // a resize mid-gather: land instantly rather than restart
    if (eng.mode === "gather") eng.mode = "idle";

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let visible = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (eng.mode === "idle") {
        field.stepIdle(dt, t);
        field.draw(buf, t, null, 0);
        ctx.putImageData(image, 0, 0);
      } else if (eng.mode === "gather") {
        if (eng.gatherStart < 0) eng.gatherStart = now;
        const dur = cb.current.duration * 0.55;
        const elapsed = (now - eng.gatherStart) / 1000;
        const done = field.draw(buf, t, elapsed, dur);
        ctx.putImageData(image, 0, 0);
        if (!eng.refined && elapsed >= dur * REFINE_AT) {
          eng.refined = true;
          setPhase("refine");
        }
        if (done) {
          if (!eng.refined) {
            eng.refined = true;
            setPhase("refine");
          }
          eng.mode = "hold";
          stop(); // the mosaic is complete: nothing left to animate
        }
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (raf || eng.mode === "hold" || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    eng.kick = start;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      eng.kick = () => {};
    };
  }, [size.w, size.h, density, colors, reduce]);

  /* ----------------- load the image, then start the reveal ----------------- */
  useEffect(() => {
    let alive = true;
    const eng = engine.current;
    setLoaded(null);

    if (!src || waiting) {
      eng.mode = "idle";
      eng.refined = false;
      setPhase("idle");
      eng.kick();
      return () => {
        alive = false;
      };
    }
    if (!size.w) return;

    // go back to the waiting cloud while we fetch (covers replay and swapping images)
    eng.mode = "idle";
    eng.refined = false;
    setPhase("idle");
    eng.kick();

    const img = new Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.decoding = "async";
    img.onerror = () => {
      if (!alive) return;
      setPhase("error");
      cb.current.onImageError?.();
    };
    img.onload = () => {
      if (!alive) return;
      setLoaded(src);
      if (reduce || !eng.field) {
        setPhase("refine");
        return;
      }
      // read the pixels the particles should become (falls back gracefully if the image is cross-origin)
      let rgb: Uint8Array | null = null;
      try {
        const W = size.w, H = size.h;
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const g = c.getContext("2d", { willReadFrequently: true });
        if (g) {
          const s = Math.max(W / img.naturalWidth, H / img.naturalHeight); // object-fit: cover
          const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
          g.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
          rgb = averageCells(g.getImageData(0, 0, W, H).data, W, H, eng.field.cell);
        }
      } catch {
        rgb = null;
      }
      eng.field.setTargets(rgb);
      eng.gatherStart = -1;
      eng.refined = false;
      eng.mode = "gather";
      setPhase("gather");
      eng.kick();
    };
    img.src = src;
    return () => {
      alive = false;
      img.onload = img.onerror = null;
    };
  }, [src, waiting, run, size.w, size.h, crossOrigin, reduce]);

  /* ----------------------- refine → done, onReveal ----------------------- */
  useEffect(() => {
    if (phase !== "refine") return;
    const ms = (reduce ? 0.35 : duration * 0.4) * 1000;
    const id = window.setTimeout(() => {
      setPhase("done");
      cb.current.onReveal?.();
    }, ms);
    return () => clearTimeout(id);
  }, [phase, duration, reduce]);

  /* ------------------------------- render ------------------------------- */
  const shown = phase === "refine" || phase === "done";
  const refineMs = reduce ? 0.35 : duration * 0.4;

  return (
    <figure {...rest} className={`m-0 w-full ${className}`} aria-busy={phase === "idle" || phase === "gather"}>
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden rounded-[20px] bg-transparent"
        style={{ aspectRatio: String(aspectRatio) }}
      >
        {/* soft wash behind the particles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(120,120,160,0.12),transparent)] dark:bg-[radial-gradient(closest-side,rgba(160,160,255,0.1),transparent)]"
        />

        {/* the finished image, resolving out of the mosaic */}
        {loaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            src={loaded}
            alt={shown ? alt : ""}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={
              shown
                ? { opacity: 1, filter: "blur(0px)", scale: 1 }
                : { opacity: 0, filter: reduce ? "blur(0px)" : "blur(22px)", scale: reduce ? 1 : 1.05 }
            }
            transition={{ duration: shown ? refineMs : 0.3, ease: EASE_OUT }}
          />
        )}

        {/* particles */}
        <motion.canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
          style={{ imageRendering: "pixelated", visibility: phase === "done" || reduce ? "hidden" : "visible" }}
          initial={false}
          animate={{ opacity: shown ? 0 : 1 }}
          transition={{ duration: shown ? refineMs * 0.85 : 0.3, ease: "easeOut" }}
        />

        {/* reduced-motion + loading fallback: a calm pulse instead of particles */}
        {reduce && !shown && phase !== "error" && (
          <div aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-br from-black/[0.04] to-black/[0.09] dark:from-white/[0.04] dark:to-white/[0.09]" />
        )}

        {/* status pill */}
        <AnimatePresence>
          {(phase === "idle" || phase === "gather") && (
            <motion.div
              key="status"
              className="absolute bottom-3 left-3 inline-flex h-8 items-center gap-2 rounded-full bg-white/80 px-3 text-[12.5px] font-medium text-neutral-700 shadow-sm ring-1 ring-black/[0.06] backdrop-blur dark:bg-black/55 dark:text-neutral-200 dark:ring-white/[0.1]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-neutral-500/60 motion-reduce:hidden" />
                <span className="relative h-2 w-2 rounded-full bg-neutral-700 dark:bg-neutral-200" />
              </span>
              <span className="sr-only">{generatingLabel}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "error" && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-[13.5px] text-neutral-600 dark:text-neutral-300">Couldn’t load the image.</p>
            <button
              type="button"
              onClick={() => setRun((n) => n + 1)}
              className="h-9 rounded-full bg-neutral-900 px-4 text-[12.5px] font-medium text-white transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-white dark:text-neutral-900"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {prompt && <figcaption className="mt-2.5 px-1 text-[13px] leading-snug text-neutral-500">{prompt}</figcaption>}
      <p className="sr-only" role="status" aria-live="polite">
        {phase === "idle" || phase === "gather" ? "Generating image" : phase === "done" ? `Image ready: ${alt}` : ""}
      </p>
    </figure>
  );
});

export default AIImageReveal;

/* ========================================================================== */
/*  Demo — a fake "generate" flow (waits 2.4 s, then returns an image)         */
/* ========================================================================== */

const SAMPLES: { prompt: string; src: string }[] = [
  {
    prompt: "Mountain lake at sunset, soft haze",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
  },
  {
    prompt: "Aurora over a still lake, stars, mountains",
    src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85",
  },
  {
    prompt: "A quiet mountain lake beneath a clear sky",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
  },
];

export function AIImageRevealDemo() {
  const [i, setI] = useState(0);
  const [src, setSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const generate = useCallback(() => {
    if (busy) return;
    const next = (i + (src ? 1 : 0)) % SAMPLES.length;
    setI(next);
    setSrc(null); // back to the particle cloud…
    setBusy(true);
    timer.current = setTimeout(() => {
      setSrc(SAMPLES[next].src); // …until the "API" answers
      setBusy(false);
    }, 2400);
  }, [busy, i, src]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-5 bg-transparent px-4 py-10 antialiased">
      <div className="w-full min-w-[240px] max-w-[440px]">
        <AIImageReveal src={src} alt={SAMPLES[i].prompt} />
      </div>
      <button
        type="button"
        onClick={generate}
        disabled={busy}
        aria-label={busy ? "Generating image" : "Generate another image"}
        title={busy ? "Generating image" : "Generate another image"}
        className="inline-flex size-9 items-center justify-center rounded-full bg-neutral-900 text-white transition-[transform,opacity] duration-150 active:scale-[0.97] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:focus-visible:ring-offset-black"
      >
        <RefreshCw aria-hidden="true" className={`size-4 ${busy ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
