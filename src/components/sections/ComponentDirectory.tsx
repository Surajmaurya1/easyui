import React, { useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import { ArrowRight } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { getFeaturedComponents, isComponentNew } from '../../lib/components';

export interface ComponentDirectoryProps {
  onSelectComponent: (id: string) => void;
  onNavigateAllComponents?: () => void;
}

/**
 * Homepage component showcase — displays the 9 curated featured components.
 *
 * Featured components are determined by `featured: true` in the registry,
 * ordered by FEATURED_COMPONENT_IDS in lib/components.ts.
 *
 * No pagination on the homepage — all 9 are rendered at once.
 * The All Components page (AllComponentsPage.tsx) is completely unchanged.
 */
export const ComponentDirectory: React.FC<ComponentDirectoryProps> = ({
  onSelectComponent,
  onNavigateAllComponents,
}) => {
  const featuredComponents = useMemo(() => getFeaturedComponents(EASY_COMPONENTS), []);

  return (
    <section id="components-directory" className="py-24 sm:py-32 lg:py-40 bg-background border-t border-border">
      <Container size="xl">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
              Featured
            </span>
            <h2 className="mt-3 text-3xl sm:text-[44px] font-semibold text-text-primary tracking-[-0.02em] leading-[1.1]">
              Components
            </h2>
          </div>
        </div>

        {/* Featured Components Grid — no pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredComponents.map((comp) => (
            <ComponentCard
              key={comp.id}
              component={comp}
              isNew={isComponentNew(comp)}
              onSelect={onSelectComponent}
            />
          ))}
        </div>

        {/* View all components — text-led, centered */}
        {onNavigateAllComponents && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={onNavigateAllComponents}
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              <span className="relative">
                View all components
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-text-secondary transition-transform duration-300" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
