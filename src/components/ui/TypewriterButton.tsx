'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TypewriterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Full text label revealed character-by-character. */
  children: string;
  /** Click callback. */
  onClick?: () => void;
  /** Callback fired when typing animation completes. */
  onComplete?: () => void;
  /** Milliseconds per character reveal. Default is 75. */
  charDuration?: number;
  /** Enable mechanical typewriter keystroke audio feedback using Web Audio API. Default is false. */
  soundEnabled?: boolean;
  /** Volume of synthesized audio feedback (0 to 1). Default is 0.25. */
  soundVolume?: number;
  /** Visual button style. Default is 'primary'. */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Start typing immediately on mount. Default is false. */
  autoStart?: boolean;
}

// Synthesize a soft mechanical typewriter click with Web Audio API (Zero external assets)
function playTypewriterClick(volume: number = 0.25) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Quick burst of shaped noise + soft bandpass filter
    const bufferSize = ctx.sampleRate * 0.03; // 30ms click
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    setTimeout(() => ctx.close(), 60);
  } catch {
    // Graceful fallback if Web Audio is blocked or not supported
  }
}

export const TypewriterButton: React.FC<TypewriterButtonProps> = ({
  children,
  onClick,
  onComplete,
  charDuration = 75,
  soundEnabled = false,
  soundVolume = 0.25,
  variant = 'primary',
  autoStart = false,
  disabled = false,
  className,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState(autoStart ? '' : children);
  const [isTyping, setIsTyping] = useState(false);
  const isTypingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullText = typeof children === 'string' ? children : String(children);

  const startTyping = useCallback(() => {
    if (isTypingRef.current || disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    isTypingRef.current = true;
    setIsTyping(true);
    setDisplayedText('');

    let index = 1;
    const typeNextChar = () => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        if (soundEnabled) {
          playTypewriterClick(soundVolume);
        }
        index++;
        timeoutRef.current = setTimeout(typeNextChar, charDuration);
      } else {
        isTypingRef.current = false;
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, 30);
  }, [fullText, disabled, soundEnabled, soundVolume, charDuration, onComplete]);

  useEffect(() => {
    if (autoStart) {
      startTyping();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoStart, startTyping]);

  const handleClick = () => {
    if (isTypingRef.current) return;
    startTyping();
    if (onClick) onClick();
  };

  const variantClasses = {
    primary: 'bg-[#FAFAFA] text-[#050505] hover:bg-white border-transparent shadow-xs cursor-pointer',
    secondary: 'bg-[#0E0E0E] text-[#FAFAFA] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] cursor-pointer',
    outline: 'bg-transparent text-[#FAFAFA] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] cursor-pointer',
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileHover={!isTyping && !disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isTyping && !disabled ? { scale: 0.97 } : {}}
      transition={motionTransitions.springSnappy}
      aria-label={fullText}
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40 disabled:cursor-not-allowed min-w-[120px]',
        variantClasses[variant],
        className
      )}
      {...(props as any)}
    >
      <span className="flex items-center">
        <span>{displayedText}</span>
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1.5 h-3.5 bg-current ml-0.5"
          />
        )}
      </span>
    </motion.button>
  );
};
