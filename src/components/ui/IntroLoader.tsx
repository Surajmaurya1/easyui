import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RotateCw, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface GreetingItem {
  text: string;
  lang?: string;
}

export interface IntroLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Multilingual greetings to cycle through (strings or { text, lang } objects) */
  greetings?: (string | GreetingItem)[];
  /** Callback fired when welcome sequence completes */
  onComplete?: () => void;
  /** Whether to render as fixed full-screen overlay or inline container */
  fullScreen?: boolean;
  /** Milliseconds per greeting cycle */
  intervalMs?: number;
  /** Show Apple-style hairline progress indicator */
  showProgress?: boolean;
  /** Show language badge beside the greeting */
  showLangBadge?: boolean;
  /** Allow pressing ESC or clicking Skip button to bypass */
  allowSkip?: boolean;
  /** Speed multiplier (e.g. 1 = normal, 1.5 = fast) */
  speedMultiplier?: number;
}

const DEFAULT_GREETINGS: GreetingItem[] = [
  { text: 'Hello', lang: 'EN' },
  { text: 'Hola', lang: 'ES' },
  { text: 'Bonjour', lang: 'FR' },
  { text: 'Ciao', lang: 'IT' },
  { text: 'こんにちは', lang: 'JA' },
  { text: 'नमस्कार', lang: 'HI' },
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({
  greetings = DEFAULT_GREETINGS,
  onComplete,
  fullScreen = true,
  intervalMs = 240,
  showProgress = true,
  showLangBadge = true,
  allowSkip = true,
  speedMultiplier = 1,
  className,
  ...props
}) => {
  const normalizedGreetings: GreetingItem[] = greetings.map((g) =>
    typeof g === 'string' ? { text: g } : g
  );

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [stage, setStage] = useState<'greeting' | 'done'>('greeting');
  const [cycleKey, setCycleKey] = useState(0);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustedInterval = Math.max(100, Math.round(intervalMs / speedMultiplier));

  const handleFinish = useCallback(() => {
    setStage('done');
    onComplete?.();
  }, [onComplete]);

  // Greeting cycling effect (triggers on mount and every replay)
  useEffect(() => {
    if (stage !== 'greeting') return;

    if (reducedMotion) {
      handleFinish();
      return;
    }

    setGreetingIndex(0);

    let finishTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < normalizedGreetings.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          finishTimeout = setTimeout(() => {
            handleFinish();
          }, Math.round(450 / speedMultiplier));
          return prev;
        }
      });
    }, adjustedInterval);

    return () => {
      clearInterval(interval);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [cycleKey, stage, normalizedGreetings.length, adjustedInterval, reducedMotion, handleFinish, speedMultiplier]);

  // Keyboard shortcut listener (ESC to skip)
  useEffect(() => {
    if (!allowSkip || stage === 'done') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allowSkip, stage, handleFinish]);

  const replay = () => {
    setGreetingIndex(0);
    setStage('greeting');
    setCycleKey((prev) => prev + 1);
  };

  const currentGreeting = normalizedGreetings[greetingIndex] || normalizedGreetings[0];

  const progressPercent =
    stage === 'greeting'
      ? ((greetingIndex + 1) / normalizedGreetings.length) * 100
      : 100;

  return (
    <AnimatePresence mode="wait">
      {stage !== 'done' ? (
        <motion.div
          ref={containerRef}
          key={`intro-overlay-${cycleKey}`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.02,
            filter: reducedMotion ? 'none' : 'blur(12px)',
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal={fullScreen}
          aria-label="Welcome intro screen"
          className={cn(
            'flex flex-col items-center justify-center select-none overflow-hidden',
            fullScreen
              ? 'fixed inset-0 z-[100] bg-[#090909]'
              : 'relative w-full h-80 sm:h-96',
            className
          )}
          {...(props as any)}
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-white/[0.035] blur-[80px]" />
          </div>

          {/* Screen Reader Live Announcements (WCAG AA) */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {currentGreeting.text}
          </div>

          {/* Skip Action Control (Top Right) */}
          {allowSkip && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              onClick={handleFinish}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818]/90 hover:bg-[#141414] border border-[#333333] hover:border-[#4A4A4A] text-[11px] font-mono text-[#A1A1A1] hover:text-white transition-all cursor-pointer backdrop-blur-md focus-ring shadow-sm"
              aria-label="Skip welcome sequence"
            >
              <span>Skip</span>
              <kbd className="hidden sm:inline-block text-[9px] text-[#6B6B6B] bg-[#222222] px-1 py-0.2 rounded border border-[#1F1F1F]">
                ESC
              </kbd>
              <X className="h-3 w-3 sm:hidden" />
            </motion.button>
          )}

          {/* Center Stage: Multilingual Greeting */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto">
            <motion.div
              key={`greeting-${greetingIndex}`}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, y: 10, filter: 'blur(8px)' }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.03, y: -10, filter: 'blur(8px)' }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center text-center"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#FAFAFA] tracking-tight">
                {currentGreeting.text}
              </span>
            </motion.div>
          </div>

          {/* Apple-Style Hairline Progress Tracker */}
          {showProgress && (
            <div className="absolute bottom-6 sm:bottom-8 inset-x-8 sm:inset-x-1/3 h-[2px] rounded-full bg-white/[0.08] overflow-hidden pointer-events-none">
              <motion.div
                className="h-full bg-gradient-to-r from-white/40 via-white to-white/70 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ ease: 'easeOut', duration: 0.22 }}
              />
            </div>
          )}
        </motion.div>
      ) : (
        !fullScreen && (
          /* Inline Demonstration Replay Button */
          <motion.div
            key="replay-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={motionTransitions.springGentle}
            className="flex items-center justify-center h-80 sm:h-96 w-full"
          >
            <button
              type="button"
              onClick={replay}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-4 py-2.5 text-xs font-medium text-white border border-[#1F1F1F] hover:bg-[#262626] hover:border-[#4A4A4A] transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Replay intro animation"
            >
              <RotateCw className="h-3.5 w-3.5 text-white" />
              <span>Replay Intro</span>
            </button>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
