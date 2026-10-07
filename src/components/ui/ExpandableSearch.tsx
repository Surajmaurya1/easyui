'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface ExpandableSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  placeholder = 'Search components, props...',
  onSearch,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setValue('');
    onSearch?.('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <motion.div
        animate={{
          width: isExpanded ? 280 : 160,
          borderColor: isExpanded ? '#4A4A4A' : '#1F1F1F',
          backgroundColor: isExpanded ? '#141414' : '#0E0E0E',
        }}
        transition={motionTransitions.springSnappy}
        className="flex items-center h-9 px-3 rounded-lg border shadow-xs cursor-text transition-colors"
        onClick={handleOpen}
      >
        <Search className="w-3.5 h-3.5 text-[#525252] shrink-0 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !value && setIsExpanded(false)}
          placeholder={isExpanded ? placeholder : 'Quick search...'}
          className="w-full bg-transparent text-xs sm:text-sm text-[#FAFAFA] placeholder-[#6B6B6B] focus:outline-none"
        />
        <AnimatePresence>
          {value ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="p-0.5 rounded text-[#525252] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] text-[10px] text-[#6B6B6B] font-mono shrink-0 select-none"
            >
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
