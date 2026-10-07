'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TextScrambleDecoderProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  characters?: string;
  duration?: number;
  trigger?: 'mount' | 'hover' | 'manual';
  replayLabel?: string;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$%&';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

export const TextScrambleDecoder: React.FC<TextScrambleDecoderProps> = ({
  text,
  characters = DEFAULT_CHARACTERS,
  duration = 800,
  trigger = 'mount',
  replayLabel = 'Replay text decode',
  className,
  onMouseEnter,
  ...props
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const resolvedRef = useRef<number[]>([]);

  const glyphs = useMemo(() => characters.split(''), [characters]);

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const decode = useCallback(() => {
    stop();
    if (reducedMotion) {
      setDisplayText(text);
      setIsDecoding(false);
      return;
    }

    startRef.current = performance.now();
    resolvedRef.current = text.split('').map((char, index) => {
      if (char.trim() === '') return 0;
      return 0.15 + (index / Math.max(text.length - 1, 1)) * 0.7 + Math.random() * 0.08;
    });
    setIsDecoding(true);

    const tick = (now: number) => {
      const progress = Math.min((now - startRef.current) / duration, 1);
      const next = text
        .split('')
        .map((char, index) => {
          if (char.trim() === ' ') return char;
          if (progress >= resolvedRef.current[index]) return char;
          const cadence = Math.floor((now + index * 19) / 36);
          return glyphs[(cadence + index * 7) % glyphs.length] || char;
        })
        .join('');

      setDisplayText(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        setIsDecoding(false);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [duration, glyphs, reducedMotion, stop, text]);

  useEffect(() => {
    setDisplayText(text);
    if (trigger === 'mount') decode();
    return stop;
  }, [decode, stop, text, trigger]);

  const content = (
    <span
      className={cn(
        'font-mono text-sm font-medium tracking-tight tabular-nums transition-colors duration-150 inline-block select-none',
        isDecoding ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.35)]' : 'text-[#FAFAFA]',
        className
      )}
      aria-label={text}
      onMouseEnter={(event) => {
        if (trigger === 'hover') decode();
        onMouseEnter?.(event);
      }}
      {...props}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );

  if (trigger !== 'manual') return content;

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {content}
      <button
        type="button"
        onClick={decode}
        disabled={isDecoding}
        className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#1F1F1F] bg-[#0E0E0E] text-[#525252] transition-all hover:border-[#4A4A4A] hover:bg-[#141414] hover:text-[#FAFAFA] active:scale-[0.95] cursor-pointer disabled:opacity-50"
        aria-label={replayLabel}
      >
        <RefreshCw className={cn('h-3.5 w-3.5 transition-transform duration-500', isDecoding && 'animate-spin text-emerald-400')} />
      </button>
    </span>
  );
};

