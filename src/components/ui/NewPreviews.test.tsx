import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Components
import { DotShader } from './DotShader';
import { GlitchText } from './GlitchText';
import { Meteors } from './Meteors';
import { RainbowButton } from './RainbowButton';
import { ScrollVelocityText } from './Scrollvelocitytext';
import { ShootingStars } from './ShootingStars';
import { SparklesCore } from './SparklesCore';
import { StickyPages, StickyPage } from './StickyPages';

// Preview items
import DotShaderPreview from '../registry/previews/items/dot-shader';
import GlitchTextPreview from '../registry/previews/items/glitch-text';
import MeteorsPreview from '../registry/previews/items/meteors';
import RainbowButtonPreview from '../registry/previews/items/rainbow-button';
import ScrollVelocityTextPreview from '../registry/previews/items/scrollvelocitytext';
import ShootingStarsPreview from '../registry/previews/items/shooting-stars';
import SparklesCorePreview from '../registry/previews/items/sparkles-core';
import StickyPagesPreview from '../registry/previews/items/sticky-pages';
import { getComponentPreview } from '../registry/previews/registry';

describe('New 8 Components and Card Previews', () => {
  describe('Component Preview Registry lookup', () => {
    it('successfully resolves all 8 new component preview definitions by primary id and aliases', () => {
      expect(getComponentPreview('dot-shader')).toBeDefined();
      expect(getComponentPreview('dotshader')).toBeDefined();
      expect(getComponentPreview('glitch-text')).toBeDefined();
      expect(getComponentPreview('meteors')).toBeDefined();
      expect(getComponentPreview('rainbow-button')).toBeDefined();
      expect(getComponentPreview('scrollvelocitytext')).toBeDefined();
      expect(getComponentPreview('scroll-velocity-text')).toBeDefined();
      expect(getComponentPreview('shooting-stars')).toBeDefined();
      expect(getComponentPreview('sparkles-core')).toBeDefined();
      expect(getComponentPreview('sticky-pages')).toBeDefined();
    });
  });

  describe('DotShader component and preview', () => {
    it('renders DotShader with children and canvas', () => {
      const { container } = render(
        <DotShader dotColor="#fff" accentColor="#00f0ff">
          <span data-testid="dot-child">Shader Content</span>
        </DotShader>
      );
      expect(screen.getByTestId('dot-child')).toBeInTheDocument();
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders DotShader card preview', () => {
      render(<DotShaderPreview isHovered={false} component={{} as any} />);
      expect(screen.getByText(/Dot Matrix Shader/i)).toBeInTheDocument();
    });
  });

  describe('GlitchText component and preview', () => {
    it('renders GlitchText correctly with text content', () => {
      render(<GlitchText text="CYBERPUNK GLITCH" variant="rgb-split" />);
      expect(screen.getAllByText('CYBERPUNK GLITCH').length).toBeGreaterThan(0);
    });

    it('renders GlitchText card preview', () => {
      render(<GlitchTextPreview isHovered={true} component={{} as any} />);
      expect(screen.getAllByText('EASYUI MOTION').length).toBeGreaterThan(0);
      expect(screen.getByText(/CHROMATIC SPLIT/i)).toBeInTheDocument();
    });
  });

  describe('Meteors component and preview', () => {
    it('renders Meteors container and wrapped children', () => {
      render(
        <div className="relative">
          <Meteors number={10} />
          <span>Space Content</span>
        </div>
      );
      expect(screen.getByText('Space Content')).toBeInTheDocument();
    });

    it('renders Meteors card preview', () => {
      render(<MeteorsPreview isHovered={false} component={{} as any} />);
      expect(screen.getByText('Meteors Stream')).toBeInTheDocument();
      expect(screen.getByText('Stream Engine')).toBeInTheDocument();
    });
  });

  describe('RainbowButton component and preview', () => {
    it('renders RainbowButton with children and animated classes', () => {
      render(<RainbowButton>Click Me</RainbowButton>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders RainbowButton card preview', () => {
      render(<RainbowButtonPreview isHovered={true} component={{} as any} />);
      expect(screen.getByText('Rainbow Button')).toBeInTheDocument();
    });
  });

  describe('ScrollVelocityText component and preview', () => {
    it('renders ScrollVelocityText as unbroken accessible node', () => {
      render(<ScrollVelocityText text="KINETIC SCROLL" />);
      expect(screen.getByText('KINETIC SCROLL')).toBeInTheDocument();
    });

    it('renders ScrollVelocityText card preview', () => {
      render(<ScrollVelocityTextPreview isHovered={false} component={{} as any} />);
      expect(screen.getByText('VELOCITY')).toBeInTheDocument();
      expect(screen.getByText(/Scroll inside to expand/i)).toBeInTheDocument();
    });
  });

  describe('ShootingStars component and preview', () => {
    it('renders ShootingStars canvas and children', () => {
      const { container } = render(
        <ShootingStars starCount={20}>
          <span data-testid="sky-text">Night Sky</span>
        </ShootingStars>
      );
      expect(screen.getByTestId('sky-text')).toBeInTheDocument();
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders ShootingStars card preview', () => {
      render(<ShootingStarsPreview isHovered={true} component={{} as any} />);
      expect(screen.getByText(/Shooting Stars/i)).toBeInTheDocument();
      expect(screen.getByText(/Click anywhere to summon meteor/i)).toBeInTheDocument();
    });
  });

  describe('SparklesCore component and preview', () => {
    it('renders SparklesCore canvas and children', () => {
      const { container } = render(
        <SparklesCore particleDensity={20}>
          <span data-testid="sparkle-text">Sparkle Text</span>
        </SparklesCore>
      );
      expect(screen.getByTestId('sparkle-text')).toBeInTheDocument();
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders SparklesCore card preview', () => {
      render(<SparklesCorePreview isHovered={false} component={{} as any} />);
      expect(screen.getByText(/Sparkles Core/i)).toBeInTheDocument();
    });
  });

  describe('StickyPages component and preview', () => {
    it('renders StickyPages and StickyPage sections', () => {
      render(
        <StickyPages>
          <StickyPage>
            <span>Page 1</span>
          </StickyPage>
          <StickyPage>
            <span>Page 2</span>
          </StickyPage>
        </StickyPages>
      );
      expect(screen.getByText('Page 1')).toBeInTheDocument();
      expect(screen.getByText('Page 2')).toBeInTheDocument();
    });

    it('renders StickyPages card preview', () => {
      render(<StickyPagesPreview isHovered={false} component={{} as any} />);
      expect(screen.getByText('01. ARCHITECTURE')).toBeInTheDocument();
      expect(screen.getByText('02. DESIGN SYSTEM')).toBeInTheDocument();
      expect(screen.getByText('03. PRODUCTION')).toBeInTheDocument();
    });
  });
});
