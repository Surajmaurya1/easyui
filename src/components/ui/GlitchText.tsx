"use client";

import React, { useState, useEffect, useId } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "../../lib/utils";

export type GlitchVariant = "rgb-split" | "slice" | "vhs" | "scramble" | "pulse";
export type GlitchIntensity = "low" | "medium" | "high";
export type GlitchTrigger = "continuous" | "hover" | "click";

export interface GlitchTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** The text string to animate with glitch effects */
  text: string;
  /** Glitch visual style variant. Default: "rgb-split" */
  variant?: GlitchVariant;
  /** Glitch trigger mode. Default: "continuous" */
  trigger?: GlitchTrigger;
  /** Primary chromatic aberration color. Default: "#00e571" */
  color1?: string;
  /** Backward-compatible alias for color1 */
  greenColor?: string;
  /** Secondary chromatic aberration color. Default: "#8b00ff" */
  color2?: string;
  /** Backward-compatible alias for color2 */
  purpleColor?: string;
  /** Glitch intensity level. Default: "medium" */
  intensity?: GlitchIntensity;
  /** Glitch burst animation duration in seconds. Default: 0.5 */
  duration?: number;
  /** Delay between repeating glitch cycles in seconds (for continuous mode). Default: 2.5 */
  repeatDelay?: number;
  /** HTML element to render as (e.g. "span", "h1", "h2", "p", "div"). Default: "span" */
  as?: keyof React.JSX.IntrinsicElements;
  /** Extra class names */
  className?: string;
}

const GLYPH_CHARS = "!<>-_\\/[]{}—=+*^?#_0123456789ABCDEF";

const intensityMultipliers: Record<GlitchIntensity, number> = {
  low: 0.6,
  medium: 1.0,
  high: 1.8,
};

export const GlitchText = React.forwardRef<HTMLElement, GlitchTextProps>(
  (
    {
      text,
      variant = "rgb-split",
      trigger = "continuous",
      color1,
      greenColor = "#00e571",
      color2,
      purpleColor = "#8b00ff",
      intensity = "medium",
      duration = 0.5,
      repeatDelay = 2.5,
      as = "span",
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const Component = as as React.ElementType;
    const resolvedColor1 = color1 || greenColor;
    const resolvedColor2 = color2 || purpleColor;
    const mult = intensityMultipliers[intensity] || 1;

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [scrambledText, setScrambledText] = useState(text);

    const rawId = useId().replace(/[^a-zA-Z0-9-_]/g, "");
    const instanceId = `glitch-${rawId}`;

    // Detect prefers-reduced-motion
    useEffect(() => {
      if (typeof window === "undefined") return;
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }, []);

    // Scramble effect logic
    useEffect(() => {
      if (variant !== "scramble" || reducedMotion) {
        setScrambledText(text);
        return;
      }

      let intervalId: any;
      let frameCount = 0;
      const maxFrames = Math.max(8, Math.round(duration * 25));

      const runScrambleBurst = () => {
        frameCount = 0;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          frameCount++;
          const progress = frameCount / maxFrames;
          const revealedCount = Math.floor(progress * text.length);

          const next = text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealedCount) return text[i];
              return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
            })
            .join("");

          setScrambledText(next);

          if (frameCount >= maxFrames) {
            clearInterval(intervalId);
            setScrambledText(text);
          }
        }, 35);
      };

      if (trigger === "continuous") {
        runScrambleBurst();
        const loopTimer = setInterval(runScrambleBurst, (duration + repeatDelay) * 1000);
        return () => {
          clearInterval(intervalId);
          clearInterval(loopTimer);
        };
      } else if (trigger === "hover" && isHovered) {
        runScrambleBurst();
      } else if (trigger === "click" && isClicked) {
        runScrambleBurst();
      }

      return () => clearInterval(intervalId);
    }, [variant, trigger, isHovered, isClicked, text, duration, repeatDelay, reducedMotion]);

    const isGlitchActive =
      !reducedMotion &&
      (trigger === "continuous" ||
        (trigger === "hover" && isHovered) ||
        (trigger === "click" && isClicked));

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e);
      if (trigger === "click") {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), duration * 1000);
      }
    };

    const baseTransition: Transition = {
      duration,
      repeat: trigger === "continuous" ? Infinity : 0,
      repeatType: "reverse",
      repeatDelay: trigger === "continuous" ? repeatDelay : 0,
      ease: "easeInOut",
    };

    // -------------------------------------------------------------------------
    // Variant 1: RGB-Split Chromatic Aberration
    // -------------------------------------------------------------------------
    const renderRgbSplit = () => (
      <>
        {/* Primary Crisp Center Text */}
        <motion.span
          className="relative z-20 inline-block"
          animate={
            isGlitchActive
              ? {
                  skewX: [0, -18 * mult, 12 * mult, -4 * mult, 0],
                  scaleX: [1, 1.08 * mult, 0.96, 1.04, 1],
                }
              : { skewX: 0, scaleX: 1 }
          }
          transition={baseTransition}
        >
          {text}
        </motion.span>

        {/* Color 1 Offset Layer (Green/Cyan) */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none mix-blend-screen dark:mix-blend-screen"
          style={{ color: resolvedColor1 }}
          animate={
            isGlitchActive
              ? {
                  x: [0, -3 * mult, 4 * mult, -2 * mult, 3 * mult, 0],
                  y: [0, 2 * mult, -3 * mult, 1 * mult, -2 * mult, 0],
                  opacity: [0, 0.85, 0.3, 0.9, 0.2, 0],
                }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{
            ...baseTransition,
            duration: duration * 0.9,
          }}
        >
          {text}
        </motion.span>

        {/* Color 2 Offset Layer (Purple/Fuchsia) */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none mix-blend-screen dark:mix-blend-screen"
          style={{ color: resolvedColor2 }}
          animate={
            isGlitchActive
              ? {
                  x: [0, 3.5 * mult, -3 * mult, 2.5 * mult, -1.5 * mult, 0],
                  y: [0, -2 * mult, 2.5 * mult, -1 * mult, 1.5 * mult, 0],
                  opacity: [0, 0.75, 0.4, 0.85, 0.15, 0],
                }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{
            ...baseTransition,
            duration: duration * 1.1,
          }}
        >
          {text}
        </motion.span>
      </>
    );

    // -------------------------------------------------------------------------
    // Variant 2: Cyberpunk Horizontal Band Slicing
    // -------------------------------------------------------------------------
    const renderSlice = () => (
      <>
        {/* Base Resting Text */}
        <span className="relative z-10 inline-block">{text}</span>

        {/* Top Sliced Segment */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none z-20"
          style={{
            clipPath: "polygon(0% 12%, 100% 12%, 100% 42%, 0% 42%)",
            color: isGlitchActive ? resolvedColor1 : "inherit",
          }}
          animate={
            isGlitchActive
              ? {
                  x: [0, -12 * mult, 8 * mult, -5 * mult, 0],
                  y: [0, 1 * mult, -1 * mult, 0],
                  opacity: [1, 0.9, 1, 0.85, 1],
                }
              : { x: 0, y: 0 }
          }
          transition={baseTransition}
        >
          {text}
        </motion.span>

        {/* Bottom Sliced Segment */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none z-20"
          style={{
            clipPath: "polygon(0% 55%, 100% 55%, 100% 88%, 0% 88%)",
            color: isGlitchActive ? resolvedColor2 : "inherit",
          }}
          animate={
            isGlitchActive
              ? {
                  x: [0, 14 * mult, -10 * mult, 6 * mult, 0],
                  y: [0, -1 * mult, 1.5 * mult, 0],
                  opacity: [1, 0.85, 1, 0.9, 1],
                }
              : { x: 0, y: 0 }
          }
          transition={{
            ...baseTransition,
            duration: duration * 0.95,
          }}
        >
          {text}
        </motion.span>
      </>
    );

    // -------------------------------------------------------------------------
    // Variant 3: VHS / CRT Tracking Loss
    // -------------------------------------------------------------------------
    const renderVhs = () => (
      <>
        <motion.span
          className="relative z-10 inline-block"
          animate={
            isGlitchActive
              ? {
                  y: [0, -3 * mult, 2 * mult, -1 * mult, 0],
                  skewX: [0, 12 * mult, -8 * mult, 4 * mult, 0],
                  filter: [
                    "blur(0px)",
                    "blur(1px)",
                    "blur(0.2px)",
                    "blur(0.8px)",
                    "blur(0px)",
                  ],
                }
              : { y: 0, skewX: 0, filter: "blur(0px)" }
          }
          transition={baseTransition}
        >
          {text}
        </motion.span>

        {/* VHS Scanline Jitter Ghost */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none opacity-60 mix-blend-difference"
          style={{ color: resolvedColor1 }}
          animate={
            isGlitchActive
              ? {
                  x: [0, -4 * mult, 3 * mult, -2 * mult, 0],
                  opacity: [0, 0.7, 0.2, 0.6, 0],
                }
              : { x: 0, opacity: 0 }
          }
          transition={baseTransition}
        >
          {text}
        </motion.span>
      </>
    );

    // -------------------------------------------------------------------------
    // Variant 4: Scramble (Matrix Rune Decode)
    // -------------------------------------------------------------------------
    const renderScramble = () => (
      <span className="relative inline-block font-mono tracking-wider">
        <span className="relative z-10">{scrambledText}</span>
        {isGlitchActive && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none blur-[1px] opacity-40"
            style={{ color: resolvedColor1 }}
          >
            {scrambledText}
          </span>
        )}
      </span>
    );

    // -------------------------------------------------------------------------
    // Variant 5: Pulse (Voltage Surge / Electrical Spike)
    // -------------------------------------------------------------------------
    const renderPulse = () => (
      <motion.span
        className="relative z-10 inline-block"
        animate={
          isGlitchActive
            ? {
                scale: [1, 1.04 * mult, 0.98, 1.03, 1],
                textShadow: [
                  "0 0 0px transparent",
                  `0 0 16px ${resolvedColor1}, 0 0 32px ${resolvedColor2}`,
                  `0 0 6px ${resolvedColor1}`,
                  `0 0 20px ${resolvedColor2}`,
                  "0 0 0px transparent",
                ],
                color: [
                  "inherit",
                  resolvedColor1,
                  "inherit",
                  resolvedColor2,
                  "inherit",
                ],
              }
            : { scale: 1, textShadow: "none" }
        }
        transition={baseTransition}
      >
        {text}
      </motion.span>
    );

    return (
      <Component
        ref={ref}
        id={instanceId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={cn(
          "relative inline-block font-bold select-none cursor-default",
          className
        )}
        style={style}
        {...props}
      >
        {variant === "rgb-split" && renderRgbSplit()}
        {variant === "slice" && renderSlice()}
        {variant === "vhs" && renderVhs()}
        {variant === "scramble" && renderScramble()}
        {variant === "pulse" && renderPulse()}
      </Component>
    );
  }
);

GlitchText.displayName = "GlitchText";

export default GlitchText;
