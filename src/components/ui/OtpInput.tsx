import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  boxClassName?: string;
  'aria-label'?: string;
}

const DIGIT_REGEX = /^[0-9]$/;

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  autoFocus = false,
  disabled = false,
  className,
  boxClassName,
  'aria-label': ariaLabel = 'One-time passcode',
}) => {
  const isControlled = value !== undefined;
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, (_, i) => value?.[i] ?? '')
  );
  const [poppedIndex, setPoppedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Keep internal state in sync when used as a controlled component.
  useEffect(() => {
    if (isControlled) {
      setDigits(Array.from({ length }, (_, i) => value?.[i] ?? ''));
    }
  }, [value, length, isControlled]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const emit = (next: string[]) => {
    const joined = next.join('');
    onChange?.(joined);
    if (joined.length === length && next.every(Boolean)) {
      onComplete?.(joined);
    }
  };

  const setDigitAt = (index: number, char: string) => {
    const next = [...digits];
    next[index] = char;
    if (!isControlled) setDigits(next);
    emit(next);
    setPoppedIndex(index);
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.slice(-1);
    if (char && !DIGIT_REGEX.test(char)) return;

    setDigitAt(index, char);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        setDigitAt(index, '');
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setDigitAt(index - 1, '');
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    e.preventDefault();

    const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
    if (!isControlled) setDigits(next);
    emit(next);
    setPoppedIndex(pasted.length - 1);

    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex gap-2', className)}
    >
      {Array.from({ length }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digits[i] ?? ''}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          animate={poppedIndex === i ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          onAnimationComplete={() => {
            if (poppedIndex === i) setPoppedIndex(null);
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className={cn(
            'h-12 w-10 rounded-md border border-white bg-gray-200 text-black dark:border-[#1F1F1F] dark:bg-[#0E0E0E] dark:text-white',
            'text-center text-lg font-medium',
            'outline-none focus:border-[#7C3AED] placeholder:text-gray-400',
            'disabled:cursor-not-allowed disabled:opacity-50',
            boxClassName
          )}
        />
      ))}
    </div>
  );
};