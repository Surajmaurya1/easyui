import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AIRPORT_MATRIX_CITIES, AirportMatrixClock, type AirportMatrixCityId } from './AirportMatrixClock';
import AirportMatrixClockPreview from '../registry/previews/items/airport-matrix-clock';
import type { EasyComponentMeta } from '../../types/component';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('AirportMatrixClock', () => {
  it('renders three default cities as accessible matrix text', () => {
    const { container } = render(<AirportMatrixClock />);

    expect(screen.getByRole('region', { name: /World times:/ })).toBeInTheDocument();
    expect(screen.getByLabelText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByLabelText('London')).toBeInTheDocument();
    expect(screen.getByLabelText('Tokyo')).toBeInTheDocument();
    expect(screen.getByRole('list').querySelectorAll('li')).toHaveLength(3);
    expect(container.querySelectorAll('svg[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('formats a custom city using its IANA timezone and supports 24-hour time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T14:42:18.000Z'));
    render(<AirportMatrixClock cities={['new-york']} />);

    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'World times: 09:42 New York');
    expect(AIRPORT_MATRIX_CITIES['new-york'].timeZone).toBe('America/New_York');
  });

  it('formats 12-hour time and optional seconds through Intl', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T14:42:08.000Z'));
    render(<AirportMatrixClock cities={['london']} format="12h" showSeconds />);

    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'World times: 02:42:08 PM London');
  });

  it('caps the board at five unique cities and ignores invalid and duplicate IDs', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const cities = ['new-york', 'london', 'new-york', 'dubai', 'tokyo', 'mumbai', 'invalid'] as AirportMatrixCityId[];
    render(<AirportMatrixClock cities={cities} />);

    const rows = screen.getByRole('list').querySelectorAll('li');
    expect(rows).toHaveLength(5);
    expect(screen.getByLabelText('Mumbai')).toBeInTheDocument();
    expect(warn).toHaveBeenCalled();
  });

  it('falls back to default cities for an empty or invalid-only list', () => {
    const invalid = ['missing'] as unknown as AirportMatrixCityId[];
    const { rerender } = render(<AirportMatrixClock cities={[]} />);
    expect(screen.getByLabelText('Los Angeles')).toBeInTheDocument();

    rerender(<AirportMatrixClock cities={invalid} />);
    expect(screen.getByLabelText('Tokyo')).toBeInTheDocument();
  });

  it('shows country labels when requested', () => {
    render(<AirportMatrixClock cities={['new-delhi']} showCountry />);
    expect(screen.getByLabelText('India')).toBeInTheDocument();
  });

  it('adds and removes cities using the supported country and city selectors', () => {
    render(<AirportMatrixClock />);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByLabelText('Chicago')).toBeInTheDocument();
    expect(screen.getByText('4 / 5 CITIES')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: 'Country' }), { target: { value: 'Japan' } });
    expect(screen.getByRole('combobox', { name: 'City' })).toHaveValue('osaka');
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByLabelText('Osaka')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove Osaka' }));
    expect(screen.queryByLabelText('Osaka')).not.toBeInTheDocument();
  });

  it('keeps the catalog preview compact and unchanged on hover', () => {
    render(<AirportMatrixClockPreview isHovered component={{} as EasyComponentMeta} />);

    expect(screen.getAllByRole('list')).toHaveLength(1);
    expect(screen.getByRole('list').querySelectorAll('li')).toHaveLength(3);
    expect(screen.getByLabelText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByLabelText('Tokyo')).toBeInTheDocument();
  });

  it('updates clock glyphs instantly without replacing their animation wrappers and clears the timer', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T14:42:00.000Z'));
    const clearInterval = vi.spyOn(window, 'clearInterval');
    const { unmount } = render(<AirportMatrixClock cities={['london']} showSeconds />);
    const time = () => screen.getByLabelText(/14:42:0\d, London/);
    const lastCharacter = () => Array.from(time().querySelectorAll(':scope > span[aria-hidden="true"]')).filter((node) => node.querySelector('svg'));
    const wrappersBefore = lastCharacter();
    const changedGlyph = wrappersBefore[wrappersBefore.length - 1].firstElementChild;

    act(() => vi.advanceTimersByTime(1000));
    const wrappersAfter = lastCharacter();
    expect(time()).toHaveAttribute('aria-label', '14:42:01, London');
    expect(wrappersAfter[wrappersAfter.length - 1].firstElementChild).toBe(changedGlyph);
    unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('replays the matrix rebuild when hovering anywhere on a city row', () => {
    render(<AirportMatrixClock cities={['london']} />);
    const row = screen.getByLabelText('London').closest('li');
    const cityText = screen.getByLabelText('London');
    const character = () => Array.from(cityText.querySelectorAll(':scope > span[aria-hidden="true"]')).find((node) => node.querySelector('svg'))?.firstElementChild;
    fireEvent.pointerEnter(row!, { pointerType: 'mouse' });
    const firstHover = character();
    expect(firstHover).toBeInTheDocument();
    fireEvent.pointerLeave(row!, { pointerType: 'mouse' });
    fireEvent.pointerEnter(row!, { pointerType: 'mouse' });
    expect(character()).toBeInTheDocument();
    expect(Array.from(cityText.querySelectorAll(':scope > span[aria-hidden="true"]')).filter((node) => node.querySelector('svg'))).toHaveLength(6);
    expect(row).toHaveClass('grid');
  });
});
