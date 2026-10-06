'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface RevealCardProps {
  children: React.ReactNode;
  revealContent?: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export const RevealCard: React.FC<RevealCardProps> = ({
  children,
  revealContent,
  maxTilt = 12,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 260, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(rotX);
    rotateY.set(rotY);

    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-6 transition-colors duration-200 hover:border-[#4A4A4A] overflow-hidden',
          className
        )}
      >
        {/* Subtle dynamic glare overlay */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-20"
            style={{
              background: glareBackground,
            }}
          />
        )}

        {/* Primary Content */}
        <div className="relative z-10">{children}</div>

        {/* Revealed Content on hover/interaction */}
        {revealContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 mt-4 pt-4 border-t border-[#1F1F1F]"
          >
            {revealContent}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
