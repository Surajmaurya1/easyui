import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface StoryCard {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  href?: string;
  ctaLabel?: string;
}

export interface StoryCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cards: StoryCard[];
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  loop?: boolean;
  enableWheelScroll?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Normalizes an integer index to a circular array index in [0, length - 1].
 */
const getWrappedIndex = (index: number, length: number) => {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
};

export const StoryCards: React.FC<StoryCardsProps> = ({
  cards,
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  showNavigation = true,
  loop = true,
  enableWheelScroll = true,
  title = "What's happening",
  subtitle = 'Discover the latest stories.',
  className,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const hasCards = cards.length > 0;
  const hasMultipleCards = cards.length > 1;

  // Track viewport width for responsive card staging
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  // Virtual continuous index allowing endless forward and backward looping
  const [virtualIndex, setVirtualIndex] = useState<number>(initialIndex);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Derive real active card from wrapped virtual index
  const activeIndex = useMemo(() => {
    if (!hasCards) return 0;
    return getWrappedIndex(virtualIndex, cards.length);
  }, [virtualIndex, cards.length, hasCards]);

  const activeCard = useMemo(() => {
    if (!hasCards) return undefined;
    return cards[activeIndex];
  }, [cards, activeIndex, hasCards]);

  /*
   * Navigate to a specific virtual or real index.
   */
  const goTo = useCallback(
    (targetVirtualIndex: number) => {
      if (!hasCards) return;
      setVirtualIndex(targetVirtualIndex);
    },
    [hasCards]
  );

  /*
   * Step forward in the infinite loop.
   */
  const next = useCallback(() => {
    if (!hasMultipleCards) return;
    setVirtualIndex((current) => current + 1);
  }, [hasMultipleCards]);

  /*
   * Step backward in the infinite loop.
   */
  const previous = useCallback(() => {
    if (!hasMultipleCards) return;
    setVirtualIndex((current) => current - 1);
  }, [hasMultipleCards]);

  /*
   * Mouse wheel / trackpad scroll navigation.
   * Enables continuous looping scroll across the cards.
   */
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!enableWheelScroll || !hasMultipleCards) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      // Small threshold to ignore micro-jitters
      if (Math.abs(delta) < 18) return;

      const now = Date.now();
      // Throttle wheel ticks to avoid rapid multi-skips on high-frequency trackpads
      if (now - lastWheelTime.current < 320) return;
      lastWheelTime.current = now;

      if (delta > 0) {
        next();
      } else {
        previous();
      }
    },
    [enableWheelScroll, hasMultipleCards, next, previous]
  );

  /*
   * Touch swipe handling for mobile / tablet gestures.
   */
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const deltaX = touchStartX.current - event.changedTouches[0].clientX;
      const deltaY = touchStartY.current - event.changedTouches[0].clientY;

      // Horizontal gesture priority
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
          next();
        } else {
          previous();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [next, previous]
  );

  /*
   * Keyboard arrow key navigation (ignores inputs / textareas).
   */
  useEffect(() => {
    if (!hasMultipleCards) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleCards, next, previous]);

  /*
   * Autoplay timer (paused when user hovers over component).
   */
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion || !hasMultipleCards || isHovered) {
      return;
    }

    const interval = Math.max(autoPlayInterval, 1200);
    const timer = window.setInterval(next, interval);
    return () => window.clearInterval(timer);
  }, [
    autoPlay,
    autoPlayInterval,
    hasMultipleCards,
    isHovered,
    next,
    shouldReduceMotion,
  ]);

  if (!hasCards) {
    return null;
  }

  /*
   * Construct the visible sliding window of virtual cards around virtualIndex.
   * Range [-1 to 4]:
   *  -1: Card currently collapsing & exiting to the left
   *   0: Active expanded story card
   *   1: 1st preview card
   *   2: 2nd preview card
   *   3: 3rd preview card
   *   4: Entering card on the far right
   */
  const windowSlots = [-1, 0, 1, 2, 3, 4];
  const visibleCards = windowSlots.map((offset) => {
    const slotVirtualIndex = virtualIndex + offset;
    const realIndex = getWrappedIndex(slotVirtualIndex, cards.length);
    return {
      virtualIndex: slotVirtualIndex,
      relativePos: offset,
      card: cards[realIndex],
      realIndex,
    };
  });

  return (
    <section
      aria-label="Stories"
      className={cn('w-full select-none', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Section Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end justify-end sm:justify-end sm:gap-6">


        {hasMultipleCards && (
          <div className="flex items-center justify-end sm:justify-end gap-3 shrink-0">
            {/* Navigation Buttons */}
            {showNavigation && (
              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <motion.button
                  type="button"
                  onClick={previous}
                  aria-label="Previous story"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-950 cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="sm:w-4.5 sm:h-4.5"
                  >
                    <path
                      d="M19 12H5M11 18L5 12L11 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                {/* Next Button */}
                <motion.button
                  type="button"
                  onClick={next}
                  aria-label="Next story"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-xs transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-950 cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="sm:w-4.5 sm:h-4.5"
                  >
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Looped Cards Track */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex h-[320px] w-full gap-2.5 sm:gap-3 overflow-hidden sm:h-[400px] lg:h-[460px]"
        role="region"
        aria-live="polite"
        aria-label={`Story ${activeIndex + 1} of ${cards.length}`}
      >
        {visibleCards.map(({ virtualIndex: slotVirtualIndex, relativePos, card }) => {
          const isActive = relativePos === 0;
          const isExiting = relativePos < 0;
          const isEntering = isMobile ? relativePos >= 3 : relativePos >= 4;
          const isHidden = isExiting || isEntering;

          // Responsive width configuration adapting cleanly to mobile, tablet, and desktop
          let widthStyle = '0%';
          if (isExiting) {
            widthStyle = '0%';
          } else if (isMobile) {
            // Mobile viewport (<640px): Active card takes 82%, preview takes 13%, peek takes 5%
            widthStyle =
              relativePos === 0
                ? '82%'
                : relativePos === 1
                  ? '13%'
                  : relativePos === 2
                    ? '5%'
                    : '0%';
          } else if (isTablet) {
            // Tablet viewport (640px - 1024px): 74% active, 15% preview 1, 8% preview 2, 3% peek
            widthStyle =
              relativePos === 0
                ? '74%'
                : relativePos === 1
                  ? '15%'
                  : relativePos === 2
                    ? '8%'
                    : relativePos === 3
                      ? '3%'
                      : '0%';
          } else {
            // Desktop viewport (>=1024px): 68% active, 15% preview 1, 11% preview 2, 6% preview 3
            widthStyle =
              relativePos === 0
                ? '68%'
                : relativePos === 1
                  ? '12%'
                  : relativePos === 2
                    ? '8%'
                    : relativePos === 3
                      ? '6%'
                      : '0%';
          }

          // Collapsing margin prevents leaving an empty flex gap on the left during exit
          const marginCompensation = isExiting
            ? isMobile
              ? '-0.625rem'
              : '-0.75rem'
            : '0rem';

          return (
            <motion.div
              key={slotVirtualIndex}
              onClick={() => {
                if (!isActive) {
                  goTo(slotVirtualIndex);
                }
              }}
              initial={false}
              animate={{
                width: widthStyle,
                marginRight: marginCompensation,
                opacity: isHidden ? 0 : 1,
              }}
              whileHover={{ scale: 1.02 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                    type: 'spring',
                    stiffness: 150,
                    damping: 24,
                    mass: 0.8,
                  }
              }
              tabIndex={isHidden ? -1 : 0}
              role="button"
              aria-label={`Story: ${card.title}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative min-w-0 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl text-left',
                'border border-black/5 dark:border-white/10',
                'focus:outline-none',
                isActive ? 'cursor-default' : 'cursor-pointer',
                isHidden && 'pointer-events-none'
              )}
            >
              {/* Story Image */}
              <img
                src={card.image}
                alt={card.imageAlt ?? card.title}
                loading={isActive ? 'eager' : 'lazy'}
                draggable={false}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out',
                  !isActive && 'group-hover:scale-105'
                )}
              />

              {/* Ambient overlay gradient for crystal clear text readability in light and dark modes */}
              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  isActive
                    ? 'bg-gradient-to-t from-black/90 via-black/35 to-transparent'
                    : 'bg-black/20 hover:bg-black/10 dark:bg-black/40 dark:hover:bg-black/20'
                )}
              />

              {/* Active Story Expanded Content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`active-content-${card.id}-${slotVirtualIndex}`}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 6 }
                    }
                    transition={{ duration: 0.28, delay: 0.05 }}
                    className="absolute inset-x-0 bottom-0 p-4 sm:p-7 lg:p-10 pointer-events-auto"
                  >
                    <div className="max-w-2xl">
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-semibold tracking-tight text-white line-clamp-2">
                        {card.title}
                      </h3>

                      {card.description && (
                        <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-white/90 line-clamp-2 sm:line-clamp-3">
                          {card.description}
                        </p>
                      )}

                      {card.href && (
                        <a
                          href={card.href}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3.5 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 active:bg-white/30"
                        >
                          {card.ctaLabel ?? 'Read more'}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="sm:w-4 sm:h-4"
                          >
                            <path
                              d="M5 12H19M13 6L19 12L13 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inactive preview bottom gradient indicator */}
              {!isActive && (
                <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Active story summary below cards */}
      {activeCard?.description && (
        <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl text-xs sm:text-sm lg:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {activeCard.description}
          </p>

          {activeCard.href && (
            <a
              href={activeCard.href}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
            >
              {activeCard.ctaLabel ?? 'Read more'}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </section>
  );
};