import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';

export interface HeroSectionProps {
  onExplore: () => void;
  onSelectComponent?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="relative pt-14 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 overflow-hidden">
      <Container size="lg">
        <div className="relative flex flex-col items-center text-center max-w-3xl lg:max-w-5xl mx-auto">
          {/* Primary product description */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 sm:mt-3 text-[36px] sm:text-[56px] lg:text-[72px] font-medium tracking-[-0.035em] text-text-primary leading-[1.02]"
          >
            <span className="block lg:whitespace-nowrap">
              <span className="block lg:inline">Open-Source</span>{" "}
              <span className="block lg:inline">React UI Library</span>
            </span>
            <span className="block lg:whitespace-nowrap">with Animated Components</span>
          </motion.h1>

          {/* Short product summary */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] text-text-secondary max-w-md leading-relaxed"
          >
            Copy and paste React components for Tailwind, with live previews, TypeScript source, and Framer Motion interactions.
          </motion.p>

          {/* Browse components CTA */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6"
          >
            <button
              type="button"
              onClick={onExplore}
              aria-label="Browse components"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-text-primary text-background text-[14px] font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-150 cursor-pointer"
            >
              Browse components
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
