"use client";

import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Butterfly — half line-art, half ASCII, one set of wings.                   */
/*                                                                             */
/*  The left wings are drawn as fine vector lines (outline, contour rings,     */
/*  veins, spots). The right wings are drawn with text characters that are     */
/*  re-computed every frame from the SAME wing shape, so as the wing folds the */
/*  letters really change, they aren't a flat image being squashed.            */
/*                                                                             */
/*  It flaps like the real thing: bursts of beats (downstroke faster than the  */
/*  upstroke, hindwings a touch behind), then a glide with wings held open,    */
/*  then a perch where the wings slowly open and close. Hover or tap and it    */
/*  gets startled and flutters. It drifts, bobs and its antennae sway.         */
/*                                                                             */
/*  One file · deps: react 19, tailwindcss · light + dark · no images.         */
/*  Pauses off-screen / in background tabs; honors prefers-reduced-motion.     */
/* -------------------------------------------------------------------------- */

/* ========================================================================== */
/*  Geometry (pure — exported so it can be tested or reused)                   */
/* ========================================================================== */

type Pt = [number, number];

/** The wing outlines, right-hand side: x is the distance from the body axis, y is down (0–200) */
const X_SCALE = 0.88;
const FORE: Pt[] = [
  [2, 90], [14, 70], [32, 48], [56, 28], [80, 14], [96, 16], [100, 30], [96, 50], [86, 68], [70, 82], [50, 92], [28, 98], [10, 98],
].map(([x, y]) => [x * X_SCALE, y + 4]);
const HIND: Pt[] = [
  [2, 100], [22, 100], [46, 104], [68, 116], [84, 134], [88, 154], [80, 172], [64, 182], [48, 176], [42, 160], [30, 146], [14, 132], [4, 118],
].map(([x, y]) => [x * X_SCALE, y + 2]);

const FORE_ROOT: Pt = [2 * X_SCALE, 98];
const HIND_ROOT: Pt = [2 * X_SCALE, 108];

const FORE_VEINS: Pt[] = [[92, 26], [96, 44], [86, 66], [66, 84], [40, 96]].map(([x, y]) => [x * X_SCALE, y + 4]);
const HIND_VEINS: Pt[] = [[80, 140], [84, 160], [66, 178], [36, 152]].map(([x, y]) => [x * X_SCALE, y + 2]);
const FORE_SPOTS: [number, number, number][] = [[70 * X_SCALE, 50, 7], [54 * X_SCALE, 72, 4]];
const HIND_SPOTS: [number, number, number][] = [[62 * X_SCALE, 142, 9], [44 * X_SCALE, 130, 4]];

interface WingDetail {
  cell: string;
  cellVeins: string[];
  veins: string[];
  band: string;
  scallops: string[];
  pearls: [number, number, number][];
  ocelli: { cx: number; cy: number; r: number; inner?: number; pupil?: number }[];
  apicalSpots?: { cx: number; cy: number; rx: number; ry: number; rot: number }[];
}

const FORE_DETAIL: WingDetail = {
  cell: "M4 95C14 82 26 68 42 56C44 61 43 68 38 74C27 83 16 90 4 97Z",
  cellVeins: ["M8 94Q24 78 42 63", "M14 91Q28 80 40 69"],
  veins: [
    "M5 92Q28 60 66 24",
    "M22 72Q46 44 77 21",
    "M42 56Q62 39 84 26",
    "M43 61Q64 49 85 43",
    "M42 66Q63 59 81 58",
    "M39 72Q58 70 72 72",
    "M31 79Q47 82 59 86",
    "M19 88Q32 93 43 96",
    "M4 98Q18 100 32 99",
  ],
  band: "M68 23Q76 32 76 44Q74 58 66 71Q54 83 36 91",
  scallops: [
    "M78 24Q84 31 80 39",
    "M80 39Q84 47 78 55",
    "M78 55Q80 63 71 70",
    "M71 70Q70 78 59 83",
    "M59 83Q53 90 42 93",
  ],
  pearls: [
    [80.5, 32, 1.3],
    [80.0, 47, 1.3],
    [74.5, 62, 1.3],
    [64.5, 76, 1.2],
  ],
  ocelli: [
    { cx: 62, cy: 47, r: 6.2, inner: 3.2, pupil: 1.3 },
    { cx: 50, cy: 68, r: 3.4, inner: 1.3 },
  ],
  apicalSpots: [
    { cx: 70, cy: 31, rx: 3.4, ry: 1.8, rot: -32 },
    { cx: 74, cy: 37, rx: 2.6, ry: 1.5, rot: -18 },
  ],
};

const HIND_DETAIL: WingDetail = {
  cell: "M4 109C15 110 26 114 35 123C33 129 29 134 22 135C14 130 8 122 4 114Z",
  cellVeins: ["M7 111Q20 118 32 127"],
  veins: [
    "M14 110Q32 106 49 112",
    "M26 115Q47 116 64 127",
    "M34 122Q54 129 72 142",
    "M34 127Q54 141 72 156",
    "M30 132Q48 151 64 171",
    "M24 135Q38 154 49 175",
    "M14 130Q23 142 30 150",
    "M5 116Q11 126 16 135",
  ],
  band: "M46 113Q61 124 67 141Q69 157 59 170Q47 175 39 160",
  scallops: [
    "M58 121Q67 127 68 136",
    "M68 136Q74 144 71 153",
    "M71 153Q72 162 64 169",
    "M64 169Q56 177 47 174",
  ],
  pearls: [
    [64.5, 131, 1.3],
    [70.5, 146, 1.4],
    [67.5, 161, 1.3],
    [55.5, 174, 1.3],
  ],
  ocelli: [
    { cx: 54, cy: 145, r: 7.2, inner: 3.8, pupil: 1.5 },
    { cx: 40, cy: 131, r: 3.4, inner: 1.2 },
  ],
};

/** Closed Catmull-Rom → cubic Bézier path (smooth wing outline) */
export function smoothClosedPath(p: Pt[]): string {
  const n = p.length;
  let d = `M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(2)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(2)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(2)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return `${d}Z`;
}

/** The same curve as a dense polygon (used to rasterise the wing for the ASCII half) */
export function densePolygon(p: Pt[], steps = 10): Pt[] {
  const n = p.length;
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    for (let k = 0; k < steps; k++) {
      const t = k / steps, u = 1 - t;
      out.push([
        u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
        u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1],
      ]);
    }
  }
  return out;
}

/* --------------------------- ASCII wing masks ---------------------------- */

const RES = 2; // mask pixels per unit
const MW = 100 * RES;
const MH = 200 * RES;

interface WingMask {
  fill: Uint8Array;
  edge: Uint8Array;
  spot: Uint8Array;
  vein: Uint8Array; // 0 none · 1 "/" · 2 "\" · 3 "|" · 4 "-"
  root: Pt;
  reach: number; // farthest distance from the root, for shading
}

function buildMask(outline: Pt[], root: Pt, veins: Pt[], spots: [number, number, number][]): WingMask {
  const poly = densePolygon(outline);
  const fill = new Uint8Array(MW * MH);
  // scanline fill
  for (let y = 0; y < MH; y++) {
    const wy = (y + 0.5) / RES;
    const xs: number[] = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      if ((a[1] <= wy && b[1] > wy) || (b[1] <= wy && a[1] > wy)) xs.push(a[0] + ((wy - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const x0 = Math.max(0, Math.ceil(xs[k] * RES - 0.5)), x1 = Math.min(MW - 1, Math.floor(xs[k + 1] * RES - 0.5));
      for (let x = x0; x <= x1; x++) fill[y * MW + x] = 1;
    }
  }
  const edge = new Uint8Array(MW * MH);
  for (let y = 1; y < MH - 1; y++)
    for (let x = 1; x < MW - 1; x++) {
      const i = y * MW + x;
      if (fill[i] && (!fill[i - 1] || !fill[i + 1] || !fill[i - MW] || !fill[i + MW] || !fill[i - 2] || !fill[i - 2 * MW])) edge[i] = 1;
    }
  const spot = new Uint8Array(MW * MH);
  for (const [sx, sy, r] of spots)
    for (let y = Math.floor((sy - r) * RES); y <= Math.ceil((sy + r) * RES); y++)
      for (let x = Math.floor((sx - r) * RES); x <= Math.ceil((sx + r) * RES); x++)
        if (x >= 0 && y >= 0 && x < MW && y < MH && (x / RES - sx) ** 2 + (y / RES - sy) ** 2 <= r * r && fill[y * MW + x]) spot[y * MW + x] = 1;
  const vein = new Uint8Array(MW * MH);
  for (const [vx, vy] of veins) {
    const dx = vx - root[0], dy = vy - root[1];
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx); // screen angle
    const dir = Math.abs(Math.cos(ang)) < 0.38 ? 3 : Math.abs(Math.sin(ang)) < 0.38 ? 4 : dx * dy < 0 ? 1 : 2;
    for (let s = 0; s <= len * RES * 1.4; s++) {
      const t = s / (len * RES * 1.4);
      const px = root[0] + dx * t, py = root[1] + dy * t;
      for (let oy = -2; oy <= 2; oy++)
        for (let ox = -2; ox <= 2; ox++) {
          const x = Math.round(px * RES) + ox, y = Math.round(py * RES) + oy;
          if (x >= 0 && y >= 0 && x < MW && y < MH && fill[y * MW + x]) vein[y * MW + x] = dir;
        }
    }
  }
  let reach = 1;
  for (const [x, y] of poly) reach = Math.max(reach, Math.hypot(x - root[0], y - root[1]));
  return { fill, edge, spot, vein, root, reach };
}

let masks: { fore: WingMask; hind: WingMask } | null = null;
const getMasks = () => (masks ??= { fore: buildMask(FORE, FORE_ROOT, FORE_VEINS, FORE_SPOTS), hind: buildMask(HIND, HIND_ROOT, HIND_VEINS, HIND_SPOTS) });

export const ASCII_COLS = 40;
export const ASCII_ROWS = 48;
const RAMP = "-=+*#"; // wing body, light → dense
const MIRROR: Record<string, string> = { "/": "\\", "\\": "/" };

/**
 * One frame of the ASCII half. `foreScale` / `hindScale` are the horizontal foreshortening of the
 * wings (1 = open flat, ~0.1 = folded up edge-on). Returns ASCII_ROWS lines of ASCII_COLS characters.
 */
export function asciiWings(foreScale: number, hindScale: number, side: "right" | "left" = "right"): string {
  const { fore, hind } = getMasks();
  const cw = 100 / ASCII_COLS, ch = 200 / ASCII_ROWS;
  const wings = [
    { m: fore, s: Math.max(0.05, foreScale) },
    { m: hind, s: Math.max(0.05, hindScale) },
  ];
  const rows: string[] = [];
  for (let r = 0; r < ASCII_ROWS; r++) {
    let line = "";
    for (let c = 0; c < ASCII_COLS; c++) {
      const x = (c + 0.5) * cw, y = (r + 0.5) * ch;
      let out = " ";
      for (const { m, s } of wings) {
        // coverage from a 3×3 neighbourhood, looked up in the unscaled wing
        let cov = 0, edge = 0;
        for (let oy = -1; oy <= 1; oy++)
          for (let ox = -1; ox <= 1; ox++) {
            const mx = Math.floor(((x + (ox * cw) / 3) / s) * RES), my = Math.floor((y + (oy * ch) / 3) * RES);
            if (mx < 0 || my < 0 || mx >= MW || my >= MH) continue;
            const i = my * MW + mx;
            if (m.fill[i]) cov++;
            if (m.edge[i]) edge++;
          }
        cov /= 9;
        if (cov < 0.2) continue;
        const cx = Math.floor((x / s) * RES), cy = Math.floor(y * RES);
        const ci = cx >= 0 && cx < MW && cy >= 0 && cy < MH ? cy * MW + cx : -1;
        if (ci >= 0 && m.spot[ci]) out = "@";
        else if (ci >= 0 && m.vein[ci]) out = ["", "/", "\\", "|", "-"][m.vein[ci]];
        else if (cov < 0.5) out = ".";
        else if (edge >= 2) out = cov > 0.85 ? "O" : "o";
        else {
          const d = Math.hypot(x / s - m.root[0], y - m.root[1]) / m.reach; // 0 at the root → 1 at the tip
          const dens = Math.min(RAMP.length - 1, Math.max(0, Math.round((1 - d) * 2.2 + (1 - s) * 2)));
          out = RAMP[dens];
        }
        break; // the forewing sits in front of the hindwing
      }
      line += out;
    }
    rows.push(side === "left" ? [...line].reverse().map((ch2) => MIRROR[ch2] ?? ch2).join("") : line);
  }
  return rows.join("\n");
}

/* ========================================================================== */
/*  Flight model (pure)                                                       */
/* ========================================================================== */

export type Behavior = "natural" | "flap" | "glide" | "perch";
type Mode = "flap" | "glide" | "perch";

const MODE_PARAMS: Record<Mode, { lo: number; hi: number; freq: number; float: number }> = {
  flap: { lo: 3, hi: 72, freq: 2.7, float: 1 },
  glide: { lo: 8, hi: 14, freq: 0.9, float: 0.75 },
  perch: { lo: 60, hi: 84, freq: 0.38, float: 0 },
};
const EXCITED = { lo: 2, hi: 78, freq: 3.7, float: 1.25 };

/** Wing-beat waveform, 0 = wings open flat, 1 = folded up. The upstroke is slower than the downstroke */
export const beat = (phase: number) => {
  const u = phase - Math.floor(phase);
  return 0.5 - 0.5 * Math.cos(2 * Math.PI * (u - 0.13 * Math.sin(2 * Math.PI * u)));
};

const RAD = Math.PI / 180;
/** Foreshortening of a wing seen from above, given its beat value */
export const wingScale = (w: number, lo: number, hi: number) => Math.max(0.07, Math.cos((lo + (hi - lo) * w) * RAD));

/* ========================================================================== */
/*  Component                                                                 */
/* ========================================================================== */

export interface ButterflyProps {
  /** split: lines + ASCII (default) · lines: all vector · ascii: all text */
  variant?: "split" | "lines" | "ascii";
  /** Which wings are text in the split variant (default right) */
  asciiSide?: "right" | "left";
  /** natural: flaps, glides and perches · flap: never stops · glide · perch */
  behavior?: Behavior;
  /** Largest width in px (default 380). It shrinks to fit its container */
  size?: number;
  /** Wing-beat speed multiplier (default 1) */
  speed?: number;
  /** Drift around gently (default true) */
  float?: boolean;
  paused?: boolean;
  /** Up to three CSS colors for the line / text gradient. Defaults suit light and dark */
  colors?: [string, string, string?];
  /** Hover or tap startles it into a flutter (default true) */
  interactive?: boolean;
  ariaLabel?: string;
  className?: string;
}

const ASCII_FONT = 0.6; // monospace glyph width ÷ height

export function Butterfly({
  variant = "split",
  asciiSide = "right",
  behavior = "natural",
  size = 380,
  speed = 1,
  float = true,
  paused = false,
  colors,
  interactive = true,
  ariaLabel = "A butterfly slowly beating its wings",
  className = "",
}: ButterflyProps) {
  const uid = useId().replace(/:/g, "");
  const strokeId = `bf-stroke-${uid}`;
  const fillId = `bf-fill-${uid}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const bobRef = useRef<SVGGElement>(null);
  const foreL = useRef<SVGGElement>(null), hindL = useRef<SVGGElement>(null);
  const foreR = useRef<SVGGElement>(null), hindR = useRef<SVGGElement>(null);
  const antL = useRef<SVGGElement>(null), antR = useRef<SVGGElement>(null);
  const asciiA = useRef<HTMLPreElement>(null); // the ASCII half (or the right half when both are text)
  const asciiB = useRef<HTMLPreElement>(null); // the left half when both are text
  const live = useRef({ speed, float, behavior, paused, variant, asciiSide });
  live.current = { speed, float, behavior, paused, variant, asciiSide };
  const startle = useRef(0);

  const [px, setPx] = useState(size);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setPx(Math.round(el.clientWidth) || size);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size]);

  const left = variant === "ascii" ? "ascii" : variant === "lines" ? "lines" : asciiSide === "left" ? "ascii" : "lines";
  const right = variant === "ascii" ? "ascii" : variant === "lines" ? "lines" : asciiSide === "right" ? "ascii" : "lines";

  // a calm resting pose for SSR / reduced motion
  const rest = useMemo(() => ({ f: wingScale(0, 14, 14), h: wingScale(0, 18, 18) }), []);
  const restText = useMemo(() => asciiWings(rest.f, rest.h, "right"), [rest]);
  const restTextLeft = useMemo(() => asciiWings(rest.f, rest.h, "left"), [rest]);

  const paths = useMemo(() => ({
    fore: smoothClosedPath(FORE),
    hind: smoothClosedPath(HIND),
  }), []);

  /* ------------------------------- animation ------------------------------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let visible = true;
    let frame = 0;

    // flight state
    let mode: Mode = "flap";
    let modeLeft = 3.4;
    let phase = 0;
    const cur = { ...MODE_PARAMS.flap };
    let drift = 0;

    const apply = (fs: number, hs: number, bob: number, ant: number, dx: number, dy: number, rot: number, doText: boolean) => {
      const fy = 0.92 + 0.08 * fs, hy = 0.92 + 0.08 * hs;
      const tf = (s: number, sy: number, mirror: boolean) => `translate(100 0) scale(${(mirror ? -s : s).toFixed(3)} ${sy.toFixed(3)}) translate(-100 0)`;
      // Wings fold toward the body, so each wing's own height pivots about its root
      foreL.current?.setAttribute("transform", tf(fs, fy, true));
      hindL.current?.setAttribute("transform", tf(hs, hy, true));
      foreR.current?.setAttribute("transform", tf(fs, fy, false));
      hindR.current?.setAttribute("transform", tf(hs, hy, false));
      bobRef.current?.setAttribute("transform", `translate(0 ${bob.toFixed(2)})`);
      antL.current?.setAttribute("transform", `rotate(${(-ant).toFixed(2)} 98 78)`);
      antR.current?.setAttribute("transform", `rotate(${ant.toFixed(2)} 102 78)`);
      const m = moverRef.current;
      if (m) m.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      if (doText) {
        const L = live.current;
        if (asciiA.current && (L.variant !== "split" || L.asciiSide === "right")) {
          if (right === "ascii") asciiA.current.textContent = asciiWings(fs, hs, "right");
        }
        if (asciiB.current && left === "ascii") asciiB.current.textContent = asciiWings(fs, hs, "left");
        if (asciiA.current && right !== "ascii" && left === "ascii" && L.variant === "split") asciiA.current.textContent = "";
      }
    };

    if (reduce.matches) {
      apply(rest.f, rest.h, 0, 0, 0, 0, 0, true);
      return;
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const L = live.current;
      if (L.paused) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt * L.speed;
      frame++;

      const excited = performance.now() < startle.current;

      // choose what the butterfly is doing
      if (L.behavior !== "natural") mode = L.behavior;
      else if ((modeLeft -= dt * L.speed) <= 0) {
        const r = Math.random();
        if (mode === "flap") {
          mode = r < 0.4 ? "glide" : "perch";
          modeLeft = mode === "glide" ? 1 + Math.random() * 0.8 : 2.4 + Math.random() * 1.4;
        } else {
          mode = "flap";
          modeLeft = 3 + Math.random() * 2.4;
        }
      }
      const target = excited ? EXCITED : MODE_PARAMS[mode];
      const k = 1 - Math.exp(-dt * 3.2);
      cur.lo += (target.lo - cur.lo) * k;
      cur.hi += (target.hi - cur.hi) * k;
      cur.freq += (target.freq - cur.freq) * k;
      cur.float += (target.float - cur.float) * k;
      phase += dt * cur.freq * L.speed;

      const wF = beat(phase);
      const wH = beat(phase - 0.075); // hindwings trail the forewings a little
      const fs = wingScale(wF, cur.lo, cur.hi);
      const hs = wingScale(wH, cur.lo, cur.hi);

      const flapAmp = Math.min(1, (cur.hi - cur.lo) / 60);
      const bob = (0.5 - wF) * 7 * flapAmp;
      const ant = 5 * Math.sin(t * 1.6) + 2 * Math.sin(t * 3.1);

      const fl = L.float ? cur.float : 0;
      drift += dt * L.speed;
      const unit = (moverRef.current?.clientWidth ?? 300) / 200;
      const dx = (7 * Math.sin(drift * 0.55) + 3 * Math.sin(drift * 1.3 + 1)) * fl * unit;
      const dy = (5 * Math.sin(drift * 0.7 + 1.2) + (0.5 - wF) * -3 * flapAmp) * fl * unit;
      const rot = 3.5 * Math.sin(drift * 0.6) * fl;

      apply(fs, hs, bob, ant, dx, dy, rot, frame % 2 === 0); // text at ~30 fps, vectors at full rate
    };

    const run = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? run() : stop();
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVis);
    const onMotion = () => {
      stop();
      if (!reduce.matches) run();
    };
    reduce.addEventListener("change", onMotion);
    run();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener("change", onMotion);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right, rest]);

  const poke = () => {
    if (interactive) startle.current = performance.now() + 2800;
  };

  /* --------------------------------- render -------------------------------- */
  const half = px / 2;
  const fontPx = half / (ASCII_COLS * ASCII_FONT);

  const vars = {
    "--bf-1": colors?.[0],
    "--bf-2": colors?.[1],
    "--bf-3": colors?.[2] ?? colors?.[1],
    ...(colors
      ? {
        "--bf-ascii-1": colors[0],
        "--bf-ascii-2": colors[1],
        "--bf-ascii-3": colors[2] ?? colors[1],
      }
      : {}),
  } as React.CSSProperties;

  const asciiStyle: React.CSSProperties = {
    fontSize: fontPx,
    lineHeight: 1,
    fontFamily: 'var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace)',
    backgroundImage: "linear-gradient(135deg, var(--bf-ascii-1), var(--bf-ascii-2) 55%, var(--bf-ascii-3))",
    backgroundSize: `${px}px ${px}px`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    whiteSpace: "pre",
    letterSpacing: 0,
    margin: 0,
    userSelect: "none",
  };

  const wingLines = (fore: React.RefObject<SVGGElement | null>, hind: React.RefObject<SVGGElement | null>, mirror: boolean) => {
    const rest0 = (s: number) => `translate(100 0) scale(${mirror ? -s : s} 1) translate(-100 0)`;
    const wing = (
      ref: React.RefObject<SVGGElement | null>,
      d: string,
      detail: WingDetail,
      s0: number,
    ) => (
      <g ref={ref} transform={rest0(s0)}>
        <g transform="translate(100 0)">
          {/* outer wing silhouette */}
          <path d={d} fill={`url(#${fillId})`} stroke={`url(#${strokeId})`} strokeWidth={1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

          {/* anatomical discal cell + internal hairlines */}
          <path d={detail.cell} fill="none" stroke={`url(#${strokeId})`} strokeWidth={1.05} strokeOpacity={0.78} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {detail.cellVeins.map((v, i) => (
            <path key={i} d={v} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.75} strokeOpacity={0.34} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}

          {/* branching organic veins */}
          {detail.veins.map((v, i) => (
            <path key={i} d={v} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.9} strokeOpacity={0.62} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}

          {/* submarginal border band & scalloped edge arches */}
          <path d={detail.band} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.85} strokeOpacity={0.44} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {detail.scallops.map((sc, i) => (
            <path key={i} d={sc} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.85} strokeOpacity={0.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}
          {detail.pearls.map(([px2, py2, r], i) => (
            <circle key={i} cx={px2} cy={py2} r={r} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.85} strokeOpacity={0.62} vectorEffect="non-scaling-stroke" />
          ))}

          {/* apical spots */}
          {detail.apicalSpots?.map((sp, i) => (
            <ellipse
              key={i}
              cx={sp.cx}
              cy={sp.cy}
              rx={sp.rx}
              ry={sp.ry}
              fill="none"
              stroke={`url(#${strokeId})`}
              strokeWidth={0.95}
              strokeOpacity={0.72}
              transform={`rotate(${sp.rot} ${sp.cx} ${sp.cy})`}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* detailed ocelli (eyespots) */}
          {detail.ocelli.map((oc, i) => (
            <g key={i}>
              <circle cx={oc.cx} cy={oc.cy} r={oc.r} fill="none" stroke={`url(#${strokeId})`} strokeWidth={1.05} strokeOpacity={0.82} vectorEffect="non-scaling-stroke" />
              {oc.inner && (
                <circle cx={oc.cx} cy={oc.cy} r={oc.inner} fill="none" stroke={`url(#${strokeId})`} strokeWidth={0.85} strokeOpacity={0.58} vectorEffect="non-scaling-stroke" />
              )}
              {oc.pupil && (
                <circle cx={oc.cx} cy={oc.cy} r={oc.pupil} fill={`url(#${strokeId})`} fillOpacity={0.78} />
              )}
            </g>
          ))}
        </g>
      </g>
    );
    return (
      <g>
        {wing(hind, paths.hind, HIND_DETAIL, rest.h)}
        {wing(fore, paths.fore, FORE_DETAIL, rest.f)}
      </g>
    );
  };

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={ariaLabel}
      onPointerEnter={(e) => e.pointerType === "mouse" && poke()}
      onPointerDown={poke}
      className={`relative mx-auto aspect-square w-full touch-manipulation select-none text-[var(--text-primary,#0A0A0A)] [--bf-1:#0A0A0A] [--bf-2:#334155] [--bf-3:#2563EB] [--bf-ascii-1:#166534] [--bf-ascii-2:#15803D] [--bf-ascii-3:#15803D] dark:[--bf-1:#F2F2F3] dark:[--bf-2:#CBD5E1] dark:[--bf-3:#60A5FA] dark:[--bf-ascii-1:#86EFAC] dark:[--bf-ascii-2:#4ADE80] dark:[--bf-ascii-3:#22C55E] ${className}`}
      style={{ maxWidth: size, ...vars }}
    >
      <div className="absolute inset-0" style={{ transform: "rotate(-35deg)" }}>
        <div ref={moverRef} className="absolute inset-0 will-change-transform">
          {/* vector layer: body + whichever wings are line-art */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id={strokeId} x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0" style={{ stopColor: "var(--bf-1)" }} />
                <stop offset="0.55" style={{ stopColor: "var(--bf-2)" }} />
                <stop offset="1" style={{ stopColor: "var(--bf-3)" }} />
              </linearGradient>
              <linearGradient id={fillId} x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0" style={{ stopColor: "var(--bf-1)", stopOpacity: 0.05 }} />
                <stop offset="1" style={{ stopColor: "var(--bf-3)", stopOpacity: 0.025 }} />
              </linearGradient>
            </defs>

            <g ref={bobRef}>
              {left === "lines" && (
                <g transform="translate(100 0) scale(-1 1) translate(-100 0)">{wingLines(foreL, hindL, false)}</g>
              )}
              {right === "lines" && wingLines(foreR, hindR, false)}

              {/* body */}
              <g fill="none" stroke={`url(#${strokeId})`} strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
                {/* head + compound eyes + palps */}
                <circle cx="100" cy="78" r="3.8" />
                <ellipse cx="96.2" cy="77.8" rx="1.2" ry="1.9" fill={`url(#${strokeId})`} fillOpacity={0.3} />
                <ellipse cx="103.8" cy="77.8" rx="1.2" ry="1.9" fill={`url(#${strokeId})`} fillOpacity={0.3} />
                <path d="M98.8 74.6L98.1 72.1" strokeWidth={0.95} />
                <path d="M101.2 74.6L101.9 72.1" strokeWidth={0.95} />

                {/* sculpted thorax + pronotum lines */}
                <path d="M96.4 83.2C94.6 90.5 94.8 103 97.2 112C98.8 113.4 101.2 113.4 102.8 112C105.2 103 105.4 90.5 103.6 83.2C102 81.2 98 81.2 96.4 83.2Z" />
                <path d="M97.8 87.5Q100 94 98.4 107" strokeWidth={0.8} strokeOpacity={0.45} />
                <path d="M102.2 87.5Q100 94 101.6 107" strokeWidth={0.8} strokeOpacity={0.45} />

                {/* tapered abdomen + curved chitin segments */}
                <path d="M97.3 112.2C96.3 128 96.9 149 100 169C103.1 149 103.7 128 102.7 112.2" />
                <path d="M100 115V164" strokeWidth={0.7} strokeOpacity={0.28} />
                {[120, 129, 138, 147, 155, 162].map((y, i) => {
                  const w = 2.5 - i * 0.34;
                  return (
                    <path
                      key={y}
                      d={`M${(100 - w).toFixed(2)} ${y}Q100 ${(y + 1.5).toFixed(2)} ${(100 + w).toFixed(2)} ${y}`}
                      strokeWidth={0.85}
                      strokeOpacity={0.55}
                    />
                  );
                })}

                {/* antennae with clubbed tips */}
                <g ref={antL} style={{ transformOrigin: "98px 78px" }}>
                  <path d="M98.6 74.5C95.8 63.5 89.5 55.5 81.8 50.8" />
                  <ellipse cx="80.6" cy="49.9" rx="2.3" ry="1.15" transform="rotate(28 80.6 49.9)" fill={`url(#${strokeId})`} />
                </g>
                <g ref={antR} style={{ transformOrigin: "102px 78px" }}>
                  <path d="M101.4 74.5C104.2 63.5 110.5 55.5 118.2 50.8" />
                  <ellipse cx="119.4" cy="49.9" rx="2.3" ry="1.15" transform="rotate(-28 119.4 49.9)" fill={`url(#${strokeId})`} />
                </g>
              </g>
            </g>
          </svg>

          {/* text layers: sit exactly on their half of the butterfly */}
          {right === "ascii" && (
            <pre ref={asciiA} aria-hidden className="absolute left-1/2 top-0 overflow-hidden" style={{ ...asciiStyle, backgroundPosition: `-${half}px 0`, height: "100%" }}>
              {restText}
            </pre>
          )}
          {left === "ascii" && (
            <pre ref={asciiB} aria-hidden className="absolute left-0 top-0 overflow-hidden" style={{ ...asciiStyle, backgroundPosition: "0 0", height: "100%" }}>
              {restTextLeft}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default Butterfly;

/* ========================================================================== */
/*  Demo                                                                      */
/* ========================================================================== */

export function ButterflyDemo() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-[var(--bg,#FAFAFA)] px-5 py-12 text-[var(--text-primary,#0A0A0A)] antialiased dark:bg-[var(--bg,#111113)] dark:text-[var(--text-primary,#F2F2F3)]">
      <div className="w-full max-w-[400px]">
        <Butterfly />
        <p className="mt-3 text-center font-mono text-xs tracking-tight text-[var(--text-secondary,#52525B)] dark:text-[var(--text-secondary,#A1A1A6)]">
          Left: line art · Right: ASCII · Hover or tap to startle
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-8 border-t border-[var(--border-subtle,#EDEDEF)] pt-8 sm:grid-cols-2 dark:border-[var(--border,#29292C)]">
        {(
          [
            ["lines", "All lines"],
            ["ascii", "All ASCII"],
          ] as const
        ).map(([v, label]) => (
          <figure key={v} className="m-0">
            <Butterfly variant={v} behavior="flap" size={240} />
            <figcaption className="mt-2 text-center font-mono text-xs tracking-tight text-[var(--text-secondary,#52525B)] dark:text-[var(--text-secondary,#A1A1A6)]">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
