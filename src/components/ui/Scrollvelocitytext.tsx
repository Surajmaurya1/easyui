"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface ScrollVelocityTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** The text to render. Rendered as a single continuous text node — never split into per-letter spans — so screen readers read it normally. */
  text: string;
  /** HTML element to render as (e.g. "span", "h1", "h2", "h3", "p", "div"). Default: "span". */
  as?: keyof React.JSX.IntrinsicElements;
  /** Extra class names applied to the text element. */
  className?: string;
  /**
   * Net scroll distance in pixels scrolled in one continuous direction needed
   * to travel from resting size to fully expanded & invisible. Default: 500.
   */
  expandDistance?: number;
  /** Overall multiplier on how much each pixel of scroll contributes to expansion. Default: 1. */
  intensity?: number;
  /** Letter-spacing (in em) at rest / zero scroll progress. Default: 0. */
  minLetterSpacing?: number;
  /** Letter-spacing (in em) at full scroll progress (fully expanded). Default: 1. */
  maxLetterSpacing?: number;
  /** Scale factor at full scroll progress. 1 = no scale change. Default: 1.6. */
  maxScale?: number;
  /**
   * Fraction of full progress (0–1) at which the text starts fading out.
   * Below this, only spacing and scale change and opacity stays at 1.
   * Set >= 1 to disable fading entirely. Default: 0.4.
   */
  fadeStart?: number;
  /**
   * Duration (ms) equivalent for the inertial smooth-scroll damping.
   * Higher values produce heavier, softer gliding momentum; lower values respond snappier.
   * Default: 400.
   */
  smoothingMs?: number;
  /** Transform origin for letter expansion and scaling (e.g. "center center", "left center", "right center"). Default: "center center". */
  transformOrigin?: string;
  /** Optional scrollable container ref to track instead of the window. */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * ScrollVelocityText
 * -------------------
 * Kinetic text that starts at resting size and reacts smoothly to scroll direction:
 * - Scrolling DOWN smoothly expands letter spacing, scales up, and fades out.
 * - Scrolling UP winds that exact progress back toward resting size.
 * - Progress holds in place whenever scrolling stops (does not auto-snap back on idle).
 *
 * Smooth-Scroll Physics Architecture:
 * - Frame-rate independent exponential damping loop (LERP) driven by requestAnimationFrame.
 * - Progress is written directly to the DOM ref (zero per-frame React state re-renders).
 * - RAF sleep state: loop automatically pauses when settled, waking instantly on new scroll input.
 * - Screen-reader safe: rendered as an unbroken native text node without fragmented letter spans.
 */
export const ScrollVelocityText = React.forwardRef<HTMLElement, ScrollVelocityTextProps>(
  (
    {
      text,
      as = "span",
      className,
      expandDistance = 500,
      intensity = 1,
      minLetterSpacing = 0,
      maxLetterSpacing = 1,
      maxScale = 1.6,
      fadeStart = 0.4,
      smoothingMs = 400,
      transformOrigin = "center center",
      scrollContainerRef,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const Component = as as React.ElementType;
    const rawId = React.useId().replace(/[^a-zA-Z0-9-_]/g, "");
    const instanceClass = `scroll-velocity-text-${rawId}`;

    const elRef = React.useRef<HTMLElement | null>(null);
    const progressRef = React.useRef(0); // Current displayed progress [0, 1]
    const targetProgressRef = React.useRef(0); // Scroll-driven target progress [0, 1]
    const lastY = React.useRef(0);
    const lastTimeRef = React.useRef(0);
    const rafId = React.useRef<number | undefined>(undefined);
    const enabledRef = React.useRef(true);

    const safeDistance = Math.max(1, expandDistance);
    const safeIntensity = Math.max(0, intensity);
    const safeSmoothing = Math.max(20, smoothingMs);

    // Merge forwarded ref and internal direct-mutation ref
    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        elRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const applyDOMProgress = React.useCallback(
      (progress: number) => {
        const el = elRef.current;
        if (!el) return;

        const spacing = minLetterSpacing + progress * (maxLetterSpacing - minLetterSpacing);
        const scale = 1 + progress * (maxScale - 1);
        const opacity =
          fadeStart >= 1
            ? 1
            : progress <= fadeStart
              ? 1
              : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart));

        el.style.letterSpacing = `${spacing.toFixed(4)}em`;
        el.style.transform = scale !== 1 ? `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)` : "";
        el.style.opacity = opacity.toFixed(4);
      },
      [minLetterSpacing, maxLetterSpacing, maxScale, fadeStart]
    );

    // Start or sustain the smooth exponential damping loop
    const scheduleTick = React.useCallback(() => {
      if (rafId.current != null) return;

      lastTimeRef.current = performance.now();

      const tick = (now: number) => {
        if (!enabledRef.current) {
          rafId.current = undefined;
          return;
        }

        // Delta-time normalization ensures identical physics on 60Hz, 120Hz (ProMotion), and 240Hz
        const dt = Math.min(0.064, (now - lastTimeRef.current) / 1000);
        lastTimeRef.current = now;

        const current = progressRef.current;
        const target = targetProgressRef.current;
        const diff = target - current;

        // Damping constant derived from smoothingMs (e.g. 400ms -> lambda ~ 8.75)
        const lambda = (1000 / safeSmoothing) * 3.5;
        const factor = 1 - Math.exp(-lambda * dt);

        if (Math.abs(diff) > 0.0003) {
          const next = current + diff * factor;
          progressRef.current = next;
          applyDOMProgress(next);
          rafId.current = window.requestAnimationFrame(tick);
        } else {
          // Settled: snap cleanly to target and put RAF loop to sleep
          progressRef.current = target;
          applyDOMProgress(target);
          rafId.current = undefined;
        }
      };

      rafId.current = window.requestAnimationFrame(tick);
    }, [applyDOMProgress, safeSmoothing]);

    React.useEffect(() => {
      if (typeof window === "undefined") return;

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      enabledRef.current = !media.matches;

      const handleMediaChange = () => {
        enabledRef.current = !media.matches;
        if (!enabledRef.current) {
          progressRef.current = 0;
          targetProgressRef.current = 0;
          applyDOMProgress(0);
          if (rafId.current != null) {
            window.cancelAnimationFrame(rafId.current);
            rafId.current = undefined;
          }
        }
      };

      media.addEventListener("change", handleMediaChange);

      if (!enabledRef.current) {
        // Reduced motion: lock to resting state and skip scroll listeners
        applyDOMProgress(0);
        return () => media.removeEventListener("change", handleMediaChange);
      }

      const target: Window | HTMLElement = scrollContainerRef?.current ?? window;
      const getScrollY = () =>
        target === window
          ? window.scrollY || window.pageYOffset || 0
          : (target as HTMLElement).scrollTop;

      lastY.current = getScrollY();

      const handleScroll = () => {
        if (!enabledRef.current) return;
        const y = getScrollY();
        const dy = y - lastY.current; // positive = scrolled down, negative = scrolled up
        lastY.current = y;
        if (dy === 0) return;

        const delta = (dy / safeDistance) * safeIntensity;
        let nextTarget = Math.min(1, Math.max(0, targetProgressRef.current + delta));

        // When scrolling to the absolute top of the page, ensure target rests at 0
        if (target === window && y <= 0) {
          nextTarget = 0;
        }

        targetProgressRef.current = nextTarget;
        scheduleTick();
      };

      // Reset lastY on resize to prevent sudden displacement jumps from mobile viewport shifts
      const handleResize = () => {
        lastY.current = getScrollY();
      };

      target.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        target.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        media.removeEventListener("change", handleMediaChange);
        if (rafId.current != null) {
          window.cancelAnimationFrame(rafId.current);
          rafId.current = undefined;
        }
      };
    }, [applyDOMProgress, safeDistance, safeIntensity, scheduleTick, scrollContainerRef]);

    return (
      <>
        <style>{`
          .scroll-velocity-text-base {
            display: inline-block;
            will-change: letter-spacing, transform, opacity;
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
          }
          .${instanceClass} {
            transform-origin: ${transformOrigin};
          }
          @media (prefers-reduced-motion: reduce) {
            .${instanceClass} {
              letter-spacing: ${minLetterSpacing}em !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
        <Component
          ref={setRefs}
          className={cn("scroll-velocity-text-base", instanceClass, className)}
          style={{
            letterSpacing: `${minLetterSpacing}em`,
            opacity: 1,
            ...style,
          }}
          {...props}
        >
          {text}
        </Component>
      </>
    );
  }
);

ScrollVelocityText.displayName = "ScrollVelocityText";

// Aliases matching both naming conventions for seamless imports
export const Scrollvelocitytext = ScrollVelocityText;
export type ScrollvelocitytextProps = ScrollVelocityTextProps;

export default ScrollVelocityText;