import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoBox, DEFAULT_PRINTS } from './PhotoBox';
import PhotoBoxPreview from '../registry/previews/items/photo-box';
import { getComponentPreview } from '../registry/previews/registry';

describe('PhotoBox Component', () => {
  it('renders with default prints, title, and prints count', () => {
    expect(DEFAULT_PRINTS).toHaveLength(3);
    render(<PhotoBox />);

    expect(screen.getByText('写真箱')).toBeInTheDocument();
    expect(screen.getByText('Photo Box · 3 prints')).toBeInTheDocument();
    expect(screen.getByText('朝の海')).toBeInTheDocument();
    expect(screen.getByText('ねこ')).toBeInTheDocument();
    expect(screen.getByText('旅')).toBeInTheDocument();
  });

  it('supports custom title and subtitle', () => {
    render(<PhotoBox title="Memories" subtitle="Tokyo trip 2026" />);

    expect(screen.getByText('Memories')).toBeInTheDocument();
    expect(screen.getByText('Tokyo trip 2026')).toBeInTheDocument();
  });

  it('toggles open state and fires onOpenChange callback', () => {
    const onOpenChange = vi.fn();
    render(<PhotoBox onOpenChange={onOpenChange} />);

    const coverBtn = screen.getByRole('button', { name: /写真箱/i });
    expect(coverBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to pin open
    fireEvent.click(coverBtn);
    expect(coverBtn).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Escape closes pinned state
    fireEvent.keyDown(coverBtn, { key: 'Escape' });
    expect(coverBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows clicking a polaroid print to view large and closing it', () => {
    const onSelect = vi.fn();
    render(<PhotoBox open={true} onSelect={onSelect} />);

    const catPrintBtn = screen.getByRole('button', { name: /Open print: ねこ/i });
    fireEvent.click(catPrintBtn);

    expect(onSelect).toHaveBeenCalledWith('cat');
    expect(screen.getByRole('dialog', { name: /ねこ\. The cat at the window/i })).toBeInTheDocument();

    // Click backdrop layer to close
    const dialogLayer = screen.getByRole('dialog');
    fireEvent.click(dialogLayer);

    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('supports custom prints array', () => {
    const customPrints = [
      { id: 'kyoto', title: '京都', caption: 'Rain in Kyoto' },
      { id: 'fuji', title: '富士山', caption: 'Mount Fuji summit' },
    ];

    render(<PhotoBox prints={customPrints} subtitle="Japan · 2 prints" />);

    expect(screen.getByText('京都')).toBeInTheDocument();
    expect(screen.getByText('富士山')).toBeInTheDocument();
    expect(screen.getByText('Japan · 2 prints')).toBeInTheDocument();
  });
});

describe('PhotoBox Preview and Registry', () => {
  it('resolves in PREVIEW_REGISTRY by primary id and aliases', () => {
    expect(getComponentPreview('photo-box')).toBeDefined();
    expect(getComponentPreview('photobox')).toBeDefined();
    expect(getComponentPreview('photo-boxes')).toBeDefined();
  });

  it('renders PhotoBoxPreview card preview in both idle and hovered states', () => {
    const { rerender } = render(<PhotoBoxPreview isHovered={false} component={{} as any} />);
    expect(screen.getByText('写真箱')).toBeInTheDocument();

    rerender(<PhotoBoxPreview isHovered={true} component={{} as any} />);
    expect(screen.getByText('写真箱')).toBeInTheDocument();
  });
});
