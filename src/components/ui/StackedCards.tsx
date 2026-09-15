import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface StackedCard {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href?: string;
  ctaLabel?: string;
}

export interface StackedCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: StackedCard[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultCards: StackedCard[] = [
  {
    id: 1,
    title: 'Annual letter 2025',
    description:
      'We survived another year of meetings, deadlines, bugs, and pretending everything was part of the plan.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Modern office interior',
    href: '/annual-letter',
    ctaLabel: 'Read the damage',
  },
  {
    id: 2,
    title: 'Building for the future',
    description:
      'A deep dive into how we build things nobody asked for, then spend three weeks fixing them.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Team collaborating in an office',
    href: '/stories/future',
    ctaLabel: 'See the chaos',
  },
  {
    id: 3,
    title: 'Inside the journey',
    description:
      "One person's inspiring journey from 'this should be easy' to 47 browser tabs.",
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Person exploring a landscape',
    href: '/stories/journey',
    ctaLabel: 'Join the adventure',
  },
  {
    id: 4,
    title: 'The internet economy',
    description:
      "Servers go brrrr. Investors go hmm. Developers go 'works on my machine'.",
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Technology infrastructure',
    href: '/stories/economy',
    ctaLabel: 'Make it make sense',
  },
];

interface CardItemProps {
  card: StackedCard;
  index: number;
  total: number;
  progress: any;
}

const CardItem: React.FC<CardItemProps> = ({ card, index, total, progress }) => {
  const isEven = index % 2 === 0;

  // Calculate scaling range: card begins scaling down when the next card scrolls in
  const step = 1 / total;
  const range: [number, number] = [Math.max(0, index * step), 1];

  // Stacking depth: deeper cards in the stack scale down slightly more
  const targetScale = total > 1 ? 1 - (total - index - 1) * 0.075 : 1;

  // Smooth scale-down as cards stack, and expand back when unstacking
  const scale = useTransform(progress, range, [1, targetScale]);

  // Progressive sticky top offset creating the stacked header tabs
  const stickyTop = `calc(4.5rem + ${index * 16}px)`;

  return (
    <div
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: index + 1,
      }}
      className="w-full will-change-transform"
    >
      <motion.article
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className={cn(
          'relative w-full overflow-hidden rounded-[22px] sm:rounded-[28px]',
          'border shadow-[0_12px_36px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
          'transition-colors duration-300',
          isEven
            ? 'bg-zinc-950 text-white border-zinc-800'
            : 'bg-white text-zinc-950 border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800'
        )}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-2 min-h-[460px] sm:min-h-[500px]">
          {/* Content Column */}
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 order-2 md:order-1">
            <div className="space-y-3 sm:space-y-4">

              <h3 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                {card.title}
              </h3>
            </div>

            <div className="pt-6 sm:pt-10">
              <p
                className={cn(
                  'text-sm leading-relaxed sm:text-base lg:text-lg max-w-xl',
                  isEven ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-300'
                )}
              >
                {card.description}
              </p>

              {card.ctaLabel && (
                <div className="mt-6 sm:mt-8">
                  <a
                    href={card.href || '#'}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200',
                      isEven
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.98]'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 active:scale-[0.98]'
                    )}
                  >
                    <span>{card.ctaLabel}</span>
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="relative w-full h-[220px] sm:h-[280px] md:h-auto min-h-[220px] overflow-hidden order-1 md:order-2">
            <img
              src={card.image}
              alt={card.imageAlt || card.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle scrim on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:hidden" />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const StackedCards: React.FC<StackedCardsProps> = ({
  cards = defaultCards,
  title,
  subtitle,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track overall scroll progress through the stacked cards section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Stacked Stories"
      className={cn('relative w-full py-8 sm:py-16', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-zinc-600 sm:text-base lg:text-lg dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Naturally flowing column that progressively stacks and scales as user scrolls */}
        <div
          ref={containerRef}
          className="relative flex flex-col gap-10 sm:gap-16 pb-24 sm:pb-36"
        >
          {cards.map((card, index) => (
            <CardItem
              key={card.id}
              card={card}
              index={index}
              total={cards.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedCards;