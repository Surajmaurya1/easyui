import React, { useMemo } from 'react';
import { Container } from '../layout/Container';
import { CATALOG_INDEX } from '../registry/catalog-index';
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
  const featuredComponents = useMemo(() => getFeaturedComponents(CATALOG_INDEX), []);

  return (
    <section id="components-directory" className="pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24 bg-background">
      <Container size="xl">
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
