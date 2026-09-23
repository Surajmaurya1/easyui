"use client";

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export type RainbowButtonVariant = "default" | "outline";
export type RainbowButtonSize = "default" | "sm" | "lg" | "icon";

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual presentation style. Default: "default" */
  variant?: RainbowButtonVariant;
  /** Size dimension scale. Default: "default" */
  size?: RainbowButtonSize;
  /** Render as child element while passing through props and styles */
  asChild?: boolean;
  /** Optional custom chromatic color stops */
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  /** Animation cycle speed in seconds. Default: 3 */
  speed?: number;
  /** Whether to show the ambient blurred rainbow glow drop-shadow. Default: true */
  glow?: boolean;
}

// Slot implementation for zero-dependency asChild support
const Slot = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      ref,
      className: cn(props.className, child.props.className),
    });
  }
  return null;
});
Slot.displayName = "Slot";

export function rainbowButtonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: RainbowButtonVariant;
  size?: RainbowButtonSize;
  className?: string;
} = {}) {
  const base = cn(
    "relative cursor-pointer group transition-all duration-200 select-none",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50",
    "text-sm font-semibold whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  );

  const variantsMap: Record<RainbowButtonVariant, string> = {
    default: cn(
      "border-0 text-white shadow-sm",
      "bg-[linear-gradient(#0c0d0e,#0c0d0e),linear-gradient(#0c0d0e_50%,rgba(12,13,14,0.6)_80%,rgba(12,13,14,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
      "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
      "[border:calc(0.125rem)_solid_transparent]",
      "hover:brightness-110",
      "dark:bg-[linear-gradient(#0c0d0e,#0c0d0e),linear-gradient(#0c0d0e_50%,rgba(12,13,14,0.6)_80%,rgba(12,13,14,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]"
    ),
    outline: cn(
      "border border-input border-b-transparent text-slate-100 shadow-sm",
      "bg-[linear-gradient(#18191c,#18191c),linear-gradient(#18191c_50%,rgba(24,25,28,0.6)_80%,rgba(24,25,28,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
      "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
      "hover:brightness-110"
    ),
  };

  const sizesMap: Record<RainbowButtonSize, string> = {
    default: "h-10 px-5 py-2",
    sm: "h-8 px-3.5 text-xs rounded-lg gap-1.5",
    lg: "h-12 px-8 text-base rounded-2xl gap-2.5",
    icon: "h-10 w-10 p-0 rounded-xl justify-center",
  };

  return cn(base, variantsMap[variant], sizesMap[size], className);
}

export const RainbowButton = forwardRef<HTMLButtonElement, RainbowButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      color1 = "hsl(0 100% 63%)",
      color2 = "hsl(270 100% 63%)",
      color3 = "hsl(210 100% 63%)",
      color4 = "hsl(195 100% 63%)",
      color5 = "hsl(90 100% 63%)",
      speed = 3,
      glow = true,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const customCssVars = {
      "--color-1": color1,
      "--color-2": color2,
      "--color-3": color3,
      "--color-4": color4,
      "--color-5": color5,
      "--rainbow-speed": `${speed}s`,
      ...style,
    } as React.CSSProperties;

    return (
      <>
        <style>{`
          @keyframes easyui-rainbow-pan {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
          .easyui-rainbow-active {
            animation: easyui-rainbow-pan var(--rainbow-speed, 3s) linear infinite;
          }
          .easyui-rainbow-glow::before {
            content: '';
            position: absolute;
            bottom: -22%;
            left: 50%;
            z-index: -1;
            height: 30%;
            width: 75%;
            transform: translateX(-50%);
            animation: easyui-rainbow-pan var(--rainbow-speed, 3s) linear infinite;
            background: linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
            background-size: 200%;
            filter: blur(12px);
            opacity: 0.85;
            transition: opacity 0.3s ease, filter 0.3s ease;
          }
          .easyui-rainbow-glow:hover::before {
            opacity: 1;
            filter: blur(16px);
          }
          @media (prefers-reduced-motion: reduce) {
            .easyui-rainbow-active,
            .easyui-rainbow-glow::before {
              animation: none !important;
            }
          }
        `}</style>

        <Comp
          data-slot="button"
          ref={ref as any}
          className={cn(
            "easyui-rainbow-active",
            glow && "easyui-rainbow-glow",
            rainbowButtonVariants({ variant, size, className })
          )}
          style={customCssVars}
          {...props}
        >
          {children}
        </Comp>
      </>
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export default RainbowButton;
