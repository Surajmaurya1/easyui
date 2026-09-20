import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentPreviewRenderer } from './ComponentPreviewRenderer';
import { ComponentCard } from './ComponentCard';
import { PreviewErrorBoundary } from './PreviewErrorBoundary';
import type { EasyComponentMeta } from '../../types/component';

const mockMeta: EasyComponentMeta = {
  id: 'test-button',
  name: 'Test Button',
  tagline: 'A modern test button',
  description: 'Test button component description',
  category: 'Buttons',
  badges: ['Interactive', 'New'],
  cliCommand: 'npx shadcn add test-button',
  features: ['Accessible', 'Snappy'],
  props: [],
  accessibility: [],
  createdAt: '2026-08-01',
  usageCode: 'export function Demo() {}',
  dependencies: [],
  files: [],
};

describe('ComponentPreviewRenderer', () => {
  it('renders default fallback when a component has no registered preview', () => {
    render(<ComponentPreviewRenderer component={mockMeta} />);

    expect(screen.getByTestId('default-preview-fallback')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByText('A modern test button')).toBeInTheDocument();
  });

  it('renders registered preview lazily for a valid registered component slug', async () => {
    const magneticMeta: EasyComponentMeta = {
      ...mockMeta,
      id: 'magnetic-button',
      name: 'Magnetic Button',
    };

    render(<ComponentPreviewRenderer component={magneticMeta} />);

    // Since mock IntersectionObserver notifies immediate intersection, the lazy chunk loads
    await waitFor(() => {
      // Magnetic button renders "Hover me" or magnetic content
      expect(document.querySelector('.h-52')).toBeInTheDocument();
    });
  });

  it('isolates errors with PreviewErrorBoundary and renders retry UI', () => {
    // Suppress console.warn during intentional error test
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const ThrowingComponent = () => {
      throw new Error('Simulated preview crash');
    };

    render(
      <PreviewErrorBoundary componentId="broken-comp" componentName="Broken Component">
        <ThrowingComponent />
      </PreviewErrorBoundary>
    );

    expect(screen.getByTestId('preview-error-fallback')).toBeInTheDocument();
    expect(screen.getByText('Preview unavailable')).toBeInTheDocument();
    expect(screen.getByText('Broken Component')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry loading preview/i })).toBeInTheDocument();

    warnSpy.mockRestore();
  });
});

describe('ComponentCard with refactored preview architecture', () => {
  it('renders card shell, footer, CLI button, and preview renderer correctly', () => {
    const onSelect = vi.fn();

    render(
      <ComponentCard
        component={mockMeta}
        isNew={true}
        onSelect={onSelect}
      />
    );

    expect(screen.getByRole('heading', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByTitle('Copy CLI command')).toBeInTheDocument();
    expect(screen.getByTestId('default-preview-fallback')).toBeInTheDocument();

    // Clicking card triggers onSelect
    fireEvent.click(screen.getByRole('link'));
    expect(onSelect).toHaveBeenCalledWith('test-button');
  });
});
