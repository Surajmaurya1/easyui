'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface NavSectionItem {
  id: string;
  label: string;
  index?: string;
}

export interface ScrollProgressNavProps {
  /** Section navigation items */
  sections?: NavSectionItem[];
  /** Threshold in px to morph into floating pill */
  scrollThreshold?: number;
  /** Active section manual override or default */
  activeId?: string;
  /** Position mode: 'fixed' attaches to screen viewport, 'inline'/'sticky' stays within parent container */
  mode?: 'fixed' | 'inline' | 'sticky';
  /** Optional scroll container reference */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Callback fired when a section is clicked */
  onSectionClick?: (id: string) => void;
  /** Position alignment when mode is 'fixed': 'top-center' | 'bottom-center' | 'top-right' */
  position?: 'top-center' | 'bottom-center' | 'top-right';
  /** Custom class name */
  className?: string;
}

const defaultSections: NavSectionItem[] = [
  { id: 'overview', index: '01', label: 'Overview' },
  { id: 'features', index: '02', label: 'Features' },
  { id: 'components', index: '03', label: 'Components' },
  { id: 'documentation', index: '04', label: 'Documentation' },
  { id: 'pricing', index: '05', label: 'Pricing' },
];

export const ScrollProgressNav: React.FC<ScrollProgressNavProps> = ({
  sections = defaultSections,
  scrollThreshold = 150,
  activeId: controlledActiveId,
  mode = 'fixed',
  containerRef,
  onSectionClick,
  position = 'top-center',
  className,
}) => {
  const uniqueId = React.useId();
  const [isFloating, setIsFloating] = useState(mode !== 'inline');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(
    controlledActiveId || sections[0]?.id || ''
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (controlledActiveId) {
      setActiveSection(controlledActiveId);
    }
  }, [controlledActiveId]);

  const handleScroll = useCallback(() => {
    let totalHeight = 0;
    let currentScroll = 0;

    if (containerRef && containerRef.current) {
      const el = containerRef.current;
      totalHeight = el.scrollHeight - el.clientHeight;
      currentScroll = el.scrollTop;
    } else if (mode === 'fixed') {
      totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      currentScroll = window.scrollY;
    }

    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
    }

    if (mode === 'fixed') {
      setIsFloating(currentScroll > scrollThreshold);
    }

    if (!controlledActiveId) {
      if (containerRef && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = containerRef.current.querySelector(`#${sections[i].id}`) as HTMLElement | null;
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top - containerRect.top <= 120) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      } else if (mode === 'fixed') {
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      }
    }
  }, [scrollThreshold, controlledActiveId, sections, containerRef, mode]);

  useEffect(() => {
    const target = containerRef?.current || (mode === 'fixed' ? window : null);
    if (!target) return;
    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener('scroll', handleScroll);
  }, [handleScroll, containerRef, mode]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    onSectionClick?.(id);
    if (containerRef && containerRef.current) {
      const target = containerRef.current.querySelector(`#${id}`) as HTMLElement | null;
      if (target) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        containerRef.current.scrollBy({
          top: targetTop - containerTop - 20,
          behavior: 'smooth',
        });
      }
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsExpanded(false);
  };

  const scrollToTop = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentActiveItem = sections.find((s) => s.id === activeSection) || sections[0];

  const positionClasses = {
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'top-right': 'top-6 right-6',
  };

  const wrapperClass =
    mode === 'fixed'
      ? cn('fixed z-40 max-w-[95vw]', positionClasses[position])
      : mode === 'sticky'
      ? 'sticky top-3 z-20 w-fit mx-auto'
      : 'relative w-fit mx-auto';

  return (
    <div
      className={cn(
        'font-sans transition-all duration-300 select-none',
        wrapperClass,
        className
      )}
    >
      <motion.nav
        layout
        transition={motionTransitions.springMorph}
        className={cn(
          'relative rounded-full border border-[#1F1F1F] bg-[#0E0E0E]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-1 flex items-center gap-1',
          isFloating ? 'ring-1 ring-white/5' : ''
        )}
        role="navigation"
        aria-label="Table of contents"
      >
        {/* Ambient progress line */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-[1.5px] bg-[#FAFAFA] absolute top-0 left-0 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Floating compact indicator (mobile or compact state) */}
        <div className="flex md:hidden items-center px-2 py-1 gap-2">
          <span className="text-[10px] font-mono text-white/50">{currentActiveItem?.index}</span>
          <span className="text-xs font-medium text-[#FAFAFA]">{currentActiveItem?.label}</span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full text-[#6B6B6B] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle section menu"
          >
            <ChevronRight className={cn('w-3.5 h-3.5 transition-transform', isExpanded && 'rotate-90')} />
          </button>
        </div>

        {/* Full navigation buttons (Desktop / Expanded) */}
        <div className={cn('hidden md:flex items-center gap-0.5', isExpanded ? '!flex flex-col md:flex-row absolute top-12 left-0 right-0 p-2 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] md:relative md:top-auto md:p-0 md:bg-transparent md:border-none' : '')}>
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            const indexStr = section.index || `0${idx + 1}`;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-ring inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer',
                  isActive ? 'text-[#FAFAFA]' : 'text-[#6B6B6B] hover:text-[#A1A1A1]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={`active-scroll-pill-${uniqueId}`}
                    transition={motionTransitions.springMorph}
                    className="absolute inset-0 rounded-full bg-[#141414] border border-[#1F1F1F] z-0 shadow-xs"
                  />
                )}
                <span className={cn('text-[10px] font-mono relative z-10', isActive ? 'text-[#FAFAFA]/80' : 'text-[#6B6B6B]')}>
                  {indexStr}
                </span>
                <span className="relative z-10">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll To Top Action */}
        {isFloating && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-6 h-6 rounded-full bg-[#141414] hover:bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#4A4A4A] flex items-center justify-center text-[#525252] hover:text-[#FAFAFA] transition-colors focus-ring shrink-0 ml-0.5 cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        )}
      </motion.nav>
    </div>
  );
};
