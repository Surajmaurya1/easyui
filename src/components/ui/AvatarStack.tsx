'use client';

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '../../lib/utils';

export interface AvatarStackItem {
  id: string | number;
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
}

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of avatar objects to render */
  avatars: AvatarStackItem[];
  /** Maximum number of avatars shown before truncation (+N badge) */
  max?: number;
  /** Size of each avatar circle */
  size?: "sm" | "md" | "lg" | "xl";
  /** Spacing / overlap amount between adjacent avatars */
  overlap?: "sm" | "md" | "lg";
  /** Whether to show the count badge when total avatars exceed max */
  showCount?: boolean;
  /** Whether to display a floating name/alt tooltip on hover */
  showTooltip?: boolean;
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-14 w-14 text-lg",
};

const overlapClasses = {
  sm: "-ml-2",
  md: "-ml-3",
  lg: "-ml-4",
};

function getInitials(name?: string) {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function AvatarStack({
  avatars,
  max = 5,
  size = "lg",
  overlap = "md",
  showCount = true,
  showTooltip = true,
  className,
  ...props
}: AvatarStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(avatars.length - max, 0);

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      role="group"
      {...props}
    >
      {visibleAvatars.map((avatar, index) => {
        const isHovered = hoveredIndex === index;
        const displayName = avatar.name ?? avatar.alt;

        return (
          <div
            key={avatar.id}
            className={cn(
              "relative shrink-0 select-none",
              index > 0 && overlapClasses[overlap]
            )}
            style={{
              zIndex: isHovered ? 50 : visibleAvatars.length - index,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip on hover */}
            <AnimatePresence>
              {showTooltip && isHovered && displayName && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 z-60 pointer-events-none whitespace-nowrap rounded-md bg-[#121214] px-2 py-0.5 text-xs font-medium text-white shadow-xl border border-white/10"
                >
                  {displayName}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[#121214] border-r border-b border-white/10" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar Circle */}
            <motion.div
              animate={{
                scale: isHovered ? 1.25 : 1,
                y: isHovered ? -6 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className={cn(
                "relative overflow-hidden rounded-full cursor-pointer",
                "border-2 border-background bg-muted",
                isHovered && "ring-2 ring-primary/40 shadow-xl shadow-black/40",
                sizeClasses[size]
              )}
            >
              {avatar.src ? (
                <img
                  src={avatar.src}
                  alt={avatar.alt ?? ""}
                  className="block h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center bg-muted",
                    "font-medium text-muted-foreground"
                  )}
                >
                  {avatar.fallback ?? getInitials(avatar.alt)}
                </div>
              )}
            </motion.div>
          </div>
        );
      })}

      {showCount && remainingCount > 0 && (
        <div
          className={cn(
            "relative z-10 flex shrink-0 items-center justify-center",
            "rounded-full border-2 border-background",
            "bg-muted font-medium text-muted-foreground",
            overlapClasses[overlap],
            sizeClasses[size]
          )}
          aria-label={`${remainingCount} more users`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;