import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MorphingIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  from: React.ReactNode;
  to: React.ReactNode;
  active?: boolean;
  duration?: number;
  size?: number;
}

export function MorphingIcon({
  from,
  to,
  active = false,
  duration = 0.3,
  size = 20,
  className,
  ...props
}: MorphingIconProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: active ? 0 : 1,
          scale: active ? 0.65 : 1,
          rotate: active ? -90 : 0,
        }}
        transition={{
          duration,
          ease: [0.4, 0, 0.2, 1],
        }}
        aria-hidden={active}
      >
        {from}
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.65,
          rotate: active ? 0 : 90,
        }}
        transition={{
          duration,
          ease: [0.4, 0, 0.2, 1],
        }}
        aria-hidden={!active}
      >
        {to}
      </motion.div>
    </div>
  );
}

export default MorphingIcon;
