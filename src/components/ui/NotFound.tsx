"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  NotFound — a premium 404 page. A frosted-glass folder over a big "404".    */
/*                                                                             */
/*  One file · deps: react 19, framer-motion, tailwindcss · no images.         */
/*  Drop it in as app/not-found.tsx (Next) or your router's catch-all route.   */
/*                                                                             */
/*    <NotFound />                                                             */
/*    <NotFound LinkComponent={Link} suggestions={[{ label: "Docs", href: "/docs" }]} /> */
/* -------------------------------------------------------------------------- */

export interface NotFoundSuggestion {
  label: string;
  href: string;
  description?: string;
}

export interface NotFoundProps {
  errorCode?: string;
  badgeLabel?: string;
  title?: string;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  homeHref?: string;
  homeLabel?: string;
  showBack?: boolean;
  backLabel?: string;
  secondaryActionLabel?: string;
  onBack?: () => void;
  onSecondaryAction?: () => void;
  children?: ReactNode;
  /**
   * The missing path, shown in a small chip. Left undefined it's read from
   * window.location.pathname after mount (the query string is never shown).
   * Pass `null` to hide it.
   */
  path?: string | null;
  /** Up to 3 helpful destinations */
  suggestions?: NotFoundSuggestion[];
  /** Pass next/link (or your router's Link) so navigation stays client-side */
  LinkComponent?: ElementType;
  /** Browser tab title (React 19 hoists it into <head>) */
  documentTitle?: string;
  /** Heading level when the component is embedded inside another page. */
  headingLevel?: 1 | 2;
  /** Emit page-level title and noindex metadata (enabled for standalone 404 pages). */
  includeDocumentMetadata?: boolean;
  /** Pointer parallax on the illustration (desktop, default true) */
  parallax?: boolean;
  footer?: ReactNode;
  className?: string;
}

/* ------------------------------ Design space ------------------------------- */
// The illustration is authored on a 460 × 360 stage and scaled to its container.
// Local coordinates have their origin at the artwork's centre; the whole group
// is rotated 8° to match the reference.

const W = 460;
const H = 360;
const CX = 230;
const CY = 185;
const TILT = 8;

const ORANGE = "#fe5510";
const WHITE = "#fafbff";

const GLASS = { x: -151, y: -31, w: 288, h: 142 };
// Folder outline (tab on the top-left), in glass-local px
const FOLDER =
  "M12 0H64Q72 0 78 6L90 20Q94 26 102 26H276Q288 26 288 38V130Q288 142 276 142H12Q0 142 0 130V12Q0 0 12 0Z";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// "4": outer outline + the small triangular counter (even-odd)
const FOUR = "M76 0H110V102H124V134H110V154H76V134H0V102ZM76 46V102H36Z";
// "0": outer ellipse + counter (even-odd), centred on (-6,-40)
const ZERO =
  "M-69 -40a63 77 0 1 0 126 0a63 77 0 1 0 -126 0ZM-43 -40a37 49 0 1 1 74 0a37 49 0 1 1 -74 0Z";

/* ------------------------------- Frosted glass ------------------------------ */
// Written as real CSS so it can use @supports (graceful, opaque fallback when
// backdrop-filter isn't available) and a hover transition. No quotes, ">" or "&"
// so it survives any renderer untouched.
const CSS = `
.np404-glass{
  background:linear-gradient(180deg,rgba(236,238,252,0.92) 0%,rgba(150,150,225,0.85) 52%,rgba(62,72,214,0.9) 100%);
  transition:-webkit-backdrop-filter .4s ease,backdrop-filter .4s ease;
}
@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))){
  .np404-glass{
    background:linear-gradient(180deg,rgba(255,255,255,0.55) 0%,rgba(236,238,255,0.35) 30%,rgba(130,118,232,0.38) 58%,rgba(62,72,214,0.6) 88%,rgba(59,70,207,0.7) 100%);
    -webkit-backdrop-filter:blur(5px) saturate(1.2);
    backdrop-filter:blur(5px) saturate(1.2);
  }
}
@media (hover:hover) and (pointer:fine){
  @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))){
    .np404-hero:hover .np404-glass{
      -webkit-backdrop-filter:blur(3px) saturate(1.25);
      backdrop-filter:blur(3px) saturate(1.25);
    }
  }
}
`;

/* -------------------------------- Illustration ------------------------------ */

export function Illustration({ parallax = true }: { parallax?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pointer parallax: each layer moves a different amount for depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  useEffect(() => {
    if (!parallax || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    const reset = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [parallax, reduce, mx, my]);

  const panelX = useTransform(sx, (v) => v * -5);
  const panelY = useTransform(sy, (v) => v * -3);
  const textX = useTransform(sx, (v) => v * 4);
  const textY = useTransform(sy, (v) => v * 2.5);
  const glassX = useTransform(sx, (v) => v * 11);
  const glassY = useTransform(sy, (v) => v * 7);
  const markX = useTransform(sx, (v) => v * 16);
  const markY = useTransform(sy, (v) => v * 10);

  const spring = (delay: number) =>
    reduce ? { duration: 0 } : ({ type: "spring", duration: 0.9, bounce: 0.18, delay } as const);

  const layer = "absolute inset-0";
  const svgProps = { viewBox: `0 0 ${W} ${H}`, className: "absolute inset-0 h-full w-full overflow-visible", "aria-hidden": true } as const;
  const group = `translate(${CX} ${CY}) rotate(${TILT})`;
  const anchor: CSSProperties = { position: "absolute", left: CX, top: CY, width: 0, height: 0, transform: `rotate(${TILT}deg)` };

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="A frosted glass folder covering the number 404"
      className="np404-hero relative mx-auto w-full max-w-[460px]"
      style={{ aspectRatio: `${W} / ${H}`, opacity: scale === null ? 0 : 1 }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* clip shape for the glass (kept in the DOM, zero size) */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={`${uid}-folder`} clipPathUnits="objectBoundingBox">
            <path d={FOLDER} transform={`scale(${1 / GLASS.w} ${1 / GLASS.h})`} />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale ?? 1})` }}>
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={reduce ? undefined : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          {/* 1 · orange back panel */}
          <motion.div className={layer} style={{ x: panelX, y: panelY }}>
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring(0)}
            >
              <svg {...svgProps}>
                <defs>
                  <linearGradient id={`${uid}-panel`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor={ORANGE} />
                    <stop offset="0.72" stopColor={ORANGE} />
                    <stop offset="1" stopColor="#cf4a12" />
                  </linearGradient>
                </defs>
                <g transform={group}>
                  <rect x={-140} y={-63} width={285} height={168} rx={9} fill={`url(#${uid}-panel)`} />
                </g>
              </svg>
            </motion.div>
          </motion.div>

          {/* 2 · the big white 404 */}
          <motion.div className={layer} style={{ x: textX, y: textY }}>
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={spring(0.08)}
              style={{ transformOrigin: "50% 50%" }}
            >
              <svg {...svgProps} style={{ filter: "drop-shadow(0 6px 10px rgba(110,20,0,0.35))" }}>
                <defs>
                  <linearGradient id={`${uid}-ink`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#eef0ff" />
                  </linearGradient>
                </defs>
                <g transform={group} fill={`url(#${uid}-ink)`} stroke={`url(#${uid}-ink)`} strokeWidth={6} strokeLinejoin="round">
                  <path d={FOUR} fillRule="evenodd" transform="translate(-177 -117)" />
                  <path d={ZERO} fillRule="evenodd" />
                  <path d={FOUR} fillRule="evenodd" transform="translate(45 -117)" />
                </g>
              </svg>
            </motion.div>
          </motion.div>

          {/* 3 · frosted-glass folder */}
          <motion.div className={layer} style={{ x: glassX, y: glassY }}>
            <div style={anchor}>
              <motion.div
                style={{ position: "absolute", left: GLASS.x, top: GLASS.y, width: GLASS.w, height: GLASS.h }}
                initial={reduce ? false : { y: 30 }}
                animate={{ y: 0 }}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={spring(0.2)}
              >
                {/* soft blue glow under the glass */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    bottom: -10,
                    height: 40,
                    borderRadius: 24,
                    background: "rgba(53,68,187,0.55)",
                    filter: "blur(22px)",
                  }}
                />
                <motion.div
                  className="np404-glass"
                  style={{ position: "absolute", inset: 0, clipPath: `url(#${uid}-folder)`, WebkitClipPath: `url(#${uid}-folder)` }}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.25, ease: EASE_OUT }}
                />
                {/* glass rim */}
                <svg width={GLASS.w} height={GLASS.h} viewBox={`0 0 ${GLASS.w} ${GLASS.h}`} className="pointer-events-none absolute inset-0" aria-hidden>
                  <defs>
                    <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
                      <stop offset="0.45" stopColor="#fff" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path d={FOLDER} fill="none" stroke={`url(#${uid}-rim)`} strokeWidth={1.2} />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* 4 · the X */}
          <motion.div className={layer} style={{ x: markX, y: markY }}>
            <div style={anchor}>
              <motion.div
                style={{ position: "absolute", left: -5 - 28, top: 107 - 28, width: 56, height: 56 }}
                initial={reduce ? false : { scale: 0, rotate: -70 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={reduce ? undefined : { rotate: 90 }}
                transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.7, bounce: 0.35, delay: 0.5 }}
              >
                <svg viewBox="0 0 56 56" width="56" height="56" aria-hidden style={{ filter: "drop-shadow(0 4px 6px rgba(20,24,90,0.4))" }}>
                  <g transform="translate(28 28)" fill={WHITE}>
                    <rect x={-23} y={-5.5} width={46} height={11} rx={5.5} transform="rotate(45)" />
                    <rect x={-23} y={-5.5} width={46} height={11} rx={5.5} transform="rotate(-45)" />
                  </g>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------- Page ----------------------------------- */

const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15161b]";

export function NotFound({
  errorCode = "404",
  badgeLabel,
  title = "This page took a wrong turn.",
  description = "The requested page doesn't exist or may have moved.",
  actionLabel,
  onAction,
  homeHref = "/",
  homeLabel,
  showBack = true,
  backLabel,
  secondaryActionLabel,
  onBack,
  onSecondaryAction,
  children,
  path,
  suggestions,
  LinkComponent,
  documentTitle,
  headingLevel = 1,
  includeDocumentMetadata = true,
  parallax = true,
  footer,
  className = "",
}: NotFoundProps) {
  const reduce = useReducedMotion();
  const Anchor: ElementType = LinkComponent ?? "a";
  const Heading = headingLevel === 1 ? motion.h1 : motion.h2;
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [detected, setDetected] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    setDetected(window.location.pathname);
    setCanGoBack(window.history.length > 1);
    headingRef.current?.focus({ preventScroll: true }); // announce the page to screen readers on navigation
  }, []);

  const shownPath = path === undefined ? detected : path;
  const effectiveDocumentTitle = documentTitle ?? `${errorCode} · ${title}`;
  const effectiveHomeLabel = actionLabel || homeLabel || "Go back home";
  const effectiveBackLabel = secondaryActionLabel || backLabel || "Go back";
  const effectiveGoBack = () => {
    if (onSecondaryAction) return onSecondaryAction();
    if (onBack) return onBack();
    window.history.back();
  };
  const isBackVisible = showBack && (canGoBack || Boolean(onBack) || Boolean(onSecondaryAction) || Boolean(secondaryActionLabel));
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE_OUT } };

  return (
    <main
      className={`relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-14 text-center text-neutral-100 antialiased sm:px-8 ${className}`}
      style={{ minHeight: "100dvh" }}
    >
      {includeDocumentMetadata && (
        <>
          <title>{effectiveDocumentTitle}</title>
          <meta name="robots" content="noindex" />
        </>
      )}

      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[560px] max-w-[120vw] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(254,85,16,0.16), transparent)", filter: "blur(30px)" }} />
        <div className="absolute left-1/2 top-[42%] h-[360px] w-[520px] max-w-[110vw] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(59,70,207,0.16), transparent)", filter: "blur(36px)" }} />
      </div>

      <div className="flex w-full max-w-xl flex-col items-center">
        <Illustration parallax={parallax} />

        <p className="sr-only">{`Error ${errorCode}: ${title}`}</p>
        <motion.p {...rise(0.15)} className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.22em] text-neutral-500">
          {badgeLabel ?? `Error ${errorCode}`}
        </motion.p>

        <Heading
          ref={headingRef}
          tabIndex={-1}
          {...rise(0.22)}
          className="mt-3 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-transparent outline-none sm:text-[44px]"
        >
          {title}
        </Heading>

        <motion.p {...rise(0.3)} className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-400 sm:text-[16px]">
          {description}
        </motion.p>

        {shownPath && (
          <motion.div
            {...rise(0.36)}
            className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-1.5 ring-1 ring-white/10"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fe5510]" aria-hidden />
            <code title={shownPath} className="truncate font-mono text-[12px] text-neutral-400">
              {shownPath.length > 80 ? `${shownPath.slice(0, 79)}…` : shownPath}
            </code>
          </motion.div>
        )}

        {children ? (
          <motion.div {...rise(0.42)} className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            {children}
          </motion.div>
        ) : (
          <motion.div {...rise(0.42)} className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            {onAction ? (
              <button
                type="button"
                onClick={onAction}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-neutral-950 shadow-sm transition-[transform,background-color] duration-150 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-neutral-100 ${focus}`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" />
                </svg>
                {effectiveHomeLabel}
              </button>
            ) : (
              <Anchor
                href={homeHref}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-neutral-950 shadow-sm transition-[transform,background-color] duration-150 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-neutral-100 ${focus}`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" />
                </svg>
                {effectiveHomeLabel}
              </Anchor>
            )}

            {isBackVisible && (
              <button
                type="button"
                onClick={effectiveGoBack}
                className={`inline-flex h-11 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.04] px-6 text-[14px] font-medium text-neutral-700 dark:text-neutral-300 ring-1 ring-black/10 dark:ring-white/12 transition-[transform,background-color,color] duration-150 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-black/[0.06] dark:[@media(hover:hover)]:hover:bg-white/[0.08] [@media(hover:hover)]:hover:text-neutral-950 dark:[@media(hover:hover)]:hover:text-white ${focus}`}
              >
                {effectiveBackLabel}
              </button>
            )}
          </motion.div>
        )}

        {suggestions && suggestions.length > 0 && (
          <motion.nav {...rise(0.5)} aria-label="Helpful links" className="mt-12 w-full">
            <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.18em] text-neutral-600">Maybe you were looking for</p>
            <ul className="grid grid-cols-1 gap-2.5 text-left sm:grid-cols-3">
              {suggestions.slice(0, 3).map((s) => (
                <li key={s.href}>
                  <Anchor
                    href={s.href}
                    className={`group flex h-full flex-col rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.07] transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.985] [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-white/[0.06] [@media(hover:hover)]:hover:ring-white/[0.14] ${focus}`}
                  >
                    <span className="flex items-center justify-between gap-2 text-[14px] font-medium text-neutral-100">
                      {s.label}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-neutral-500 transition-transform duration-200 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                    {s.description && <span className="mt-1 text-[12.5px] leading-snug text-neutral-500">{s.description}</span>}
                  </Anchor>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}

        {footer && <motion.div {...rise(0.58)} className="mt-12 text-[12.5px] text-neutral-600">{footer}</motion.div>}
      </div>
    </main>
  );
}

export default NotFound;

/* ---------------------------------- Demo ----------------------------------- */

export function NotFoundDemo() {
  return (
    <NotFound
      path="/docs/components/old-page"
      suggestions={[
        { label: "Documentation", href: "/docs", description: "Guides and API reference" },
        { label: "Components", href: "/components", description: "Browse the full library" },
        { label: "Pricing", href: "/pricing", description: "Plans for every team" },
      ]}
      footer={
        <>
          Think this is a mistake?{" "}
          <a href="mailto:support@example.com" className="underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-neutral-300">
            Let us know
          </a>
        </>
      }
    />
  );
}
