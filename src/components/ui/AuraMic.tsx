import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

/**
 * AuraMic — strictly black & white.
 * Everything is drawn with `currentColor`, so it flips automatically:
 * black on light backgrounds, white on dark (via Tailwind `dark:`).
 *
 * halftone  – a printed dot grid that swells outward in waves
 * moire     – two ring sets drifting against each other, interference fringes appear
 * thread    – a single looping Lissajous line that keeps re-knotting itself
 * ink       – liquid droplets that bleed out of the button and merge back (gooey)
 * eclipse   – thick/thin crescents orbiting the button like a solar corona
 * ridgeline – stacked signal lines that spike like a pulsar plot
 */
export type AuraAnimation =
  | "halftone"
  | "moire"
  | "thread"
  | "ink"
  | "eclipse"
  | "ridgeline";

interface AuraMicProps {
  animation?: AuraAnimation;
  size?: number;
  onListeningChange?: (listening: boolean) => void;
}

/* ---------- helpers ---------- */

const STAGE = 220;
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Keyframe arrays for a point travelling around an ellipse. */
function orbit(rx: number, ry: number, phase = 0, dir = 1, steps = 24) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = phase + dir * (i / steps) * Math.PI * 2;
    xs.push(r1(Math.cos(a) * rx));
    ys.push(r1(Math.sin(a) * ry));
  }
  return { xs, ys };
}

/** Deterministic pseudo-random in [0, 1). */
const hash = (s: number) => {
  const v = Math.sin(s * 127.1) * 43758.5453;
  return v - Math.floor(v);
};

const loop = (duration: number, extra = {}) => ({
  duration,
  repeat: Infinity,
  ease: "linear" as const,
  ...extra,
});

/* ---------- 1. HALFTONE ---------- */

const HALFTONE = (() => {
  const dots: { x: number; y: number; d: number }[] = [];
  const step = 15;
  const n = 7;
  for (let gx = -n; gx <= n; gx++) {
    for (let gy = -n; gy <= n; gy++) {
      const x = gx * step;
      const y = gy * step;
      const d = Math.hypot(x, y);
      if (d <= 100) dots.push({ x, y, d });
    }
  }
  return dots;
})();

function Halftone({ size }: { size: number }) {
  const inner = size / 2 + 8;
  return (
    <g fill="currentColor" stroke="none">
      {HALFTONE.filter((p) => p.d > inner).map(({ x, y, d }, i) => {
        const peak = Math.max(1.5, 7 - (d / 100) * 5.5);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            initial={{ r: 0.5 }}
            animate={{ r: [0.5, peak, 0.5] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (d / 100) * 0.9,
            }}
          />
        );
      })}
    </g>
  );
}

/* ---------- 2. MOIRÉ ---------- */

function Moire({ size }: { size: number }) {
  const radii: number[] = [];
  for (let r = size / 2 + 6; r <= 100; r += 5.5) radii.push(r);
  const { xs, ys } = orbit(8, 8, 0, 1, 16);

  return (
    <g fill="none" strokeWidth={1}>
      <g opacity={0.9}>
        {radii.map((r) => (
          <circle key={r} r={r} />
        ))}
      </g>
      <motion.g
        animate={{ x: xs, y: ys }}
        transition={loop(4)}
        opacity={0.9}
      >
        {radii.map((r) => (
          <circle key={r} r={r} />
        ))}
      </motion.g>
    </g>
  );
}

/* ---------- 3. THREAD (Lissajous) ---------- */

function lissajous(a: number, b: number, phase: number, amp: number, n = 160) {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = r1(Math.sin(a * t + phase) * amp);
    const y = r1(Math.sin(b * t) * amp);
    d += `${i === 0 ? "M" : " L"}${x} ${y}`;
  }
  return d;
}

const THREAD_A = [0, 0.7, 1.5, 2.3].map((p) => lissajous(3, 2, p, 84));
const THREAD_B = [1.2, 2.0, 2.9, 3.6].map((p) => lissajous(5, 4, p, 70));

function Thread() {
  const t = {
    duration: 3.4,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };
  return (
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <motion.path
        d={THREAD_A[0]}
        strokeWidth={1.6}
        animate={{ d: THREAD_A }}
        transition={t}
      />
      <motion.path
        d={THREAD_B[0]}
        strokeWidth={0.8}
        opacity={0.45}
        animate={{ d: THREAD_B }}
        transition={{ ...t, duration: 4.6 }}
      />
    </g>
  );
}

/* ---------- 4. INK (gooey droplets) ---------- */

function Ink({ size, uid }: { size: number; uid: string }) {
  const base = size / 2;
  const blobs = [
    { rx: base + 10, ry: base + 18, r: 13, dur: 5.5, phase: 0, dir: 1 },
    { rx: base + 22, ry: base + 12, r: 9, dur: 4.2, phase: 1.3, dir: -1 },
    { rx: base + 16, ry: base + 26, r: 11, dur: 6.8, phase: 2.6, dir: 1 },
    { rx: base + 28, ry: base + 20, r: 7, dur: 3.6, phase: 3.9, dir: -1 },
    { rx: base + 12, ry: base + 14, r: 10, dur: 4.8, phase: 5.1, dir: 1 },
  ];

  return (
    <>
      <defs>
        <filter
          id={`goo-${uid}`}
          filterUnits="userSpaceOnUse"
          x={-110}
          y={-110}
          width={220}
          height={220}
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
          />
        </filter>
      </defs>
      <g filter={`url(#goo-${uid})`} fill="currentColor" stroke="none">
        {/* core hides under the button so blobs appear to pull away from it */}
        <circle r={base - 2} />
        {blobs.map((b, i) => {
          const { xs, ys } = orbit(b.rx, b.ry, b.phase, b.dir);
          return (
            <motion.circle
              key={i}
              r={b.r}
              animate={{
                cx: xs,
                cy: ys,
                r: [b.r, b.r * 0.55, b.r * 1.1, b.r],
              }}
              transition={{
                cx: loop(b.dur),
                cy: loop(b.dur),
                r: { duration: b.dur / 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          );
        })}
      </g>
    </>
  );
}

/* ---------- 5. ECLIPSE ---------- */

function Eclipse({ size, uid }: { size: number; uid: string }) {
  const base = size / 2;
  const crescents = [
    { R: base + 14, off: 11, dur: 4.5, dir: 1, o: 1 },
    { R: base + 32, off: 15, dur: 7.5, dir: -1, o: 0.55 },
  ];

  return (
    <g fill="currentColor" stroke="none">
      {crescents.map((c, i) => {
        const id = `ecl-${uid}-${i}`;
        const { xs, ys } = orbit(c.off, c.off, i * 2, c.dir);
        return (
          <g key={id}>
            <defs>
              <mask
                id={id}
                maskUnits="userSpaceOnUse"
                x={-110}
                y={-110}
                width={220}
                height={220}
              >
                <circle r={c.R} fill="white" />
                <motion.circle
                  r={c.R}
                  fill="black"
                  animate={{ cx: xs, cy: ys }}
                  transition={loop(c.dur)}
                />
              </mask>
            </defs>
            <circle r={c.R} mask={`url(#${id})`} opacity={c.o} />
          </g>
        );
      })}
    </g>
  );
}

/* ---------- 6. RIDGELINE ---------- */

const RIDGE_LINES = 13;
const RIDGE_FRAMES = 3;

const RIDGES = Array.from({ length: RIDGE_LINES }, (_, i) => {
  const baseY = -84 + i * 14;
  return Array.from({ length: RIDGE_FRAMES }, (_, f) => {
    let d = "";
    for (let j = 0; j <= 40; j++) {
      const x = -100 + j * 5;
      const env = Math.exp(-Math.pow(x / 42, 2));
      const noise = hash(i * 53 + j * 17 + f * 101);
      const y = r1(baseY - env * 18 * noise);
      d += `${j === 0 ? "M" : " L"}${x} ${y}`;
    }
    return d;
  });
});

function Ridgeline() {
  return (
    <g fill="none" strokeWidth={1.3} strokeLinejoin="round">
      <clipPath id="ridge-clip">
        <circle r={100} />
      </clipPath>
      <g clipPath="url(#ridge-clip)">
        {RIDGES.map((frames, i) => (
          <motion.path
            key={i}
            d={frames[0]}
            animate={{ d: frames }}
            transition={{
              duration: 1.1 + (i % 4) * 0.25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </g>
  );
}

/* ---------- component ---------- */

export function AuraMic({
  animation = "halftone",
  size = 48,
  onListeningChange,
}: AuraMicProps) {
  const [listening, setListening] = useState(false);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const toggle = () => {
    const next = !listening;
    setListening(next);
    onListeningChange?.(next);
  };

  return (
    <div
      className="relative flex items-center justify-center text-black dark:text-white"
      style={{ width: STAGE, height: STAGE }}
    >
      <AnimatePresence>
        {listening && !reduceMotion && (
          <motion.svg
            key={animation}
            className="pointer-events-none absolute inset-0"
            width={STAGE}
            height={STAGE}
            viewBox="-110 -110 220 220"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {animation === "halftone" && <Halftone size={size} />}
            {animation === "moire" && <Moire size={size} />}
            {animation === "thread" && <Thread />}
            {animation === "ink" && <Ink size={size} uid={uid} />}
            {animation === "eclipse" && <Eclipse size={size} uid={uid} />}
            {animation === "ridgeline" && <Ridgeline />}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* MIC BUTTON: outlined when idle, solid (inverted) when listening */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        className={[
          "relative z-10 flex items-center justify-center rounded-full border-2",
          "border-black dark:border-white",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
          "focus-visible:outline-black dark:focus-visible:outline-white",
          "transition-colors duration-200",
          listening
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-transparent text-black dark:text-white",
        ].join(" ")}
        style={{ width: size, height: size }}
        aria-label={listening ? "Stop listening" : "Start listening"}
        aria-pressed={listening}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={String(listening)}
            className="flex"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {listening ? <Mic size={size * 0.38} /> : <MicOff size={size * 0.38} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}