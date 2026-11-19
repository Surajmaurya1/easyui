import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MorphingMegaMenu } from './MorphingMegaMenu';
import { InteractiveAreaChart } from './InteractiveAreaChart';
import MorphingMegaMenuPreview from '../registry/previews/items/morphing-mega-menu';
import InteractiveAreaChartPreview from '../registry/previews/items/interactive-area-chart';
import ProductTourPreview from '../registry/previews/items/product-tour';
import { ProductTour, type TourStep } from './ProductTour';

describe('MorphingMegaMenu component', () => {
  it('renders navigation triggers with default items', () => {
    render(<MorphingMegaMenu />);

    expect(screen.getByRole('button', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Developers' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Company' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
  });

  it('opens panel when clicking or focusing trigger button', () => {
    render(<MorphingMegaMenu />);

    const productsBtn = screen.getByRole('button', { name: 'Products' });
    expect(productsBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(productsBtn);
    expect(productsBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Accept cards and wallets worldwide')).toBeInTheDocument();
  });

  it('handles Escape key to close open panel and reset active state', () => {
    render(<MorphingMegaMenu />);

    const devsBtn = screen.getByRole('button', { name: 'Developers' });
    fireEvent.click(devsBtn);
    expect(devsBtn).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(devsBtn, { key: 'Escape' });
    expect(devsBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports custom menu items', () => {
    const customItems = [
      { id: 'custom-1', label: 'Custom Tab', content: <div>Custom Panel Content</div> },
      { id: 'custom-link', label: 'External', href: 'https://example.com' },
    ];
    render(<MorphingMegaMenu items={customItems} />);

    expect(screen.getByRole('button', { name: 'Custom Tab' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'External' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Custom Tab' }));
    expect(screen.getByText('Custom Panel Content')).toBeInTheDocument();
  });
});

describe('InteractiveAreaChart component', () => {
  it('renders header, title, default value, and range tab buttons', () => {
    render(<InteractiveAreaChart title="Portfolio Balance" />);

    expect(screen.getByText('Portfolio Balance')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '7D' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '30D' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '1Y' })).toBeInTheDocument();

    const activeTab = screen.getByRole('tab', { name: '30D' });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('switches active range tab on click', () => {
    render(<InteractiveAreaChart title="Revenue" defaultRange="30D" />);

    const tab7D = screen.getByRole('tab', { name: '7D' });
    fireEvent.click(tab7D);

    expect(tab7D).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '30D' })).toHaveAttribute('aria-selected', 'false');
  });

  it('renders svg with accessible role and aria-label', () => {
    render(<InteractiveAreaChart title="MRR Metrics" />);

    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label');
    expect(svg.getAttribute('aria-label')).toContain('MRR Metrics');
  });

  it('navigates data points via ArrowLeft and ArrowRight keyboard events', () => {
    render(<InteractiveAreaChart title="Keyboard Test" />);

    const svg = screen.getByRole('img');
    fireEvent.keyDown(svg, { key: 'ArrowLeft' });
    fireEvent.keyDown(svg, { key: 'ArrowRight' });
    fireEvent.keyDown(svg, { key: 'Escape' });

    expect(svg).toBeInTheDocument();
  });
});

describe('Card previews for new components', () => {
  const dummyMeta = {
    id: 'test',
    name: 'Test',
    tagline: 'Tagline',
    description: 'Description',
    category: 'Navigation' as const,
    badges: [],
    cliCommand: '',
    createdAt: '2026-10-13',
  };

  it('renders MorphingMegaMenuPreview in both idle and hovered states', () => {
    const { rerender } = render(<MorphingMegaMenuPreview component={dummyMeta} isHovered={false} />);
    expect(screen.getByRole('button', { name: 'Platform' })).toBeInTheDocument();

    rerender(<MorphingMegaMenuPreview component={dummyMeta} isHovered={true} />);
    expect(screen.getByRole('button', { name: 'Platform' })).toBeInTheDocument();
  });

  it('renders InteractiveAreaChartPreview in both idle and hovered states', () => {
    const { rerender } = render(<InteractiveAreaChartPreview component={dummyMeta} isHovered={false} />);
    expect(screen.getByRole('tab', { name: '30D' })).toBeInTheDocument();

    rerender(<InteractiveAreaChartPreview component={dummyMeta} isHovered={true} />);
    expect(screen.getByRole('tab', { name: '30D' })).toBeInTheDocument();
  });

  it('renders ProductTourPreview in both idle and hovered states', () => {
    const { rerender } = render(<ProductTourPreview component={dummyMeta} isHovered={false} />);
    expect(screen.getByText('Global Search')).toBeInTheDocument();

    rerender(<ProductTourPreview component={dummyMeta} isHovered={true} />);
    expect(screen.getByText('Global Search')).toBeInTheDocument();
  });
});

describe('ProductTour component', () => {
  const steps: TourStep[] = [
    { title: 'Step One', body: 'First step content' },
    { title: 'Step Two', body: 'Second step content' },
  ];

  it('does not render when open is false', () => {
    render(<ProductTour open={false} steps={steps} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog and first step when open is true', () => {
    render(<ProductTour open={true} steps={steps} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Step One')).toBeInTheDocument();
    expect(screen.getByText('First step content')).toBeInTheDocument();
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
  });

  it('navigates through steps and fires onClose when done', () => {
    let closedReason = '';
    const onClose = (reason: string) => {
      closedReason = reason;
    };

    render(<ProductTour open={true} steps={steps} onClose={onClose} />);

    const nextBtn = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextBtn);

    expect(screen.getByText('Step Two')).toBeInTheDocument();
    expect(screen.getByText('Second step content')).toBeInTheDocument();

    const doneBtn = screen.getByRole('button', { name: 'Done' });
    fireEvent.click(doneBtn);

    expect(closedReason).toBe('done');
  });

  it('calls onClose with "skip" when Skip button is clicked', () => {
    let closedReason = '';
    const onClose = (reason: string) => {
      closedReason = reason;
    };

    render(<ProductTour open={true} steps={steps} onClose={onClose} />);

    const skipBtn = screen.getByRole('button', { name: 'Skip' });
    fireEvent.click(skipBtn);

    expect(closedReason).toBe('skip');
  });

  it('dismisses when Escape key is pressed', () => {
    let closedReason = '';
    const onClose = (reason: string) => {
      closedReason = reason;
    };

    render(<ProductTour open={true} steps={steps} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(closedReason).toBe('dismiss');
  });
});
