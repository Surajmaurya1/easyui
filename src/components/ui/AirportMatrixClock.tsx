'use client';

import { memo, useEffect, useId, useMemo, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { motionTransitions } from '../../lib/motion-tokens';

export type AirportMatrixCountry =
  | 'India'
  | 'United States'
  | 'United Kingdom'
  | 'United Arab Emirates'
  | 'Japan';

export const AIRPORT_MATRIX_CITIES = {
  'new-delhi': { name: 'New Delhi', country: 'India', timeZone: 'Asia/Kolkata' },
  mumbai: { name: 'Mumbai', country: 'India', timeZone: 'Asia/Kolkata' },
  bengaluru: { name: 'Bengaluru', country: 'India', timeZone: 'Asia/Kolkata' },
  hyderabad: { name: 'Hyderabad', country: 'India', timeZone: 'Asia/Kolkata' },
  chennai: { name: 'Chennai', country: 'India', timeZone: 'Asia/Kolkata' },
  kolkata: { name: 'Kolkata', country: 'India', timeZone: 'Asia/Kolkata' },
  lucknow: { name: 'Lucknow', country: 'India', timeZone: 'Asia/Kolkata' },
  ahmedabad: { name: 'Ahmedabad', country: 'India', timeZone: 'Asia/Kolkata' },
  pune: { name: 'Pune', country: 'India', timeZone: 'Asia/Kolkata' },
  jaipur: { name: 'Jaipur', country: 'India', timeZone: 'Asia/Kolkata' },
  varanasi: { name: 'Varanasi', country: 'India', timeZone: 'Asia/Kolkata' },
  'new-york': { name: 'New York', country: 'United States', timeZone: 'America/New_York' },
  'los-angeles': { name: 'Los Angeles', country: 'United States', timeZone: 'America/Los_Angeles' },
  'san-francisco': { name: 'San Francisco', country: 'United States', timeZone: 'America/Los_Angeles' },
  chicago: { name: 'Chicago', country: 'United States', timeZone: 'America/Chicago' },
  houston: { name: 'Houston', country: 'United States', timeZone: 'America/Chicago' },
  miami: { name: 'Miami', country: 'United States', timeZone: 'America/New_York' },
  seattle: { name: 'Seattle', country: 'United States', timeZone: 'America/Los_Angeles' },
  boston: { name: 'Boston', country: 'United States', timeZone: 'America/New_York' },
  london: { name: 'London', country: 'United Kingdom', timeZone: 'Europe/London' },
  manchester: { name: 'Manchester', country: 'United Kingdom', timeZone: 'Europe/London' },
  birmingham: { name: 'Birmingham', country: 'United Kingdom', timeZone: 'Europe/London' },
  edinburgh: { name: 'Edinburgh', country: 'United Kingdom', timeZone: 'Europe/London' },
  glasgow: { name: 'Glasgow', country: 'United Kingdom', timeZone: 'Europe/London' },
  dubai: { name: 'Dubai', country: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
  'abu-dhabi': { name: 'Abu Dhabi', country: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
  sharjah: { name: 'Sharjah', country: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
  tokyo: { name: 'Tokyo', country: 'Japan', timeZone: 'Asia/Tokyo' },
  osaka: { name: 'Osaka', country: 'Japan', timeZone: 'Asia/Tokyo' },
  kyoto: { name: 'Kyoto', country: 'Japan', timeZone: 'Asia/Tokyo' },
  nagoya: { name: 'Nagoya', country: 'Japan', timeZone: 'Asia/Tokyo' },
  yokohama: { name: 'Yokohama', country: 'Japan', timeZone: 'Asia/Tokyo' },
} as const satisfies Record<string, { name: string; country: AirportMatrixCountry; timeZone: string }>;

export type AirportMatrixCityId = keyof typeof AIRPORT_MATRIX_CITIES;
export type AirportMatrixCity = (typeof AIRPORT_MATRIX_CITIES)[AirportMatrixCityId] & { id: AirportMatrixCityId };

export interface AirportMatrixClockProps {
  /** One to five IDs from the supported city list. Defaults to three cities. */
  cities?: AirportMatrixCityId[];
  /** 24-hour airport-board time by default. */
  format?: '12h' | '24h';
  /** Include seconds in each city time. */
  showSeconds?: boolean;
  /** Refresh cadence in milliseconds. Defaults to one second. */
  updateInterval?: number;
  /** Show each city's country beneath its name. */
  showCountry?: boolean;
  /** Let the viewer add and remove cities using the built-in country and city selectors. */
  showControls?: boolean;
  /** Called when a viewer changes the selected city list. */
  onCitiesChange?: (cities: AirportMatrixCityId[]) => void;
  className?: string;
}

const DEFAULT_CITIES: AirportMatrixCityId[] = ['los-angeles', 'london', 'tokyo'];
const SUPPORTED_COUNTRIES: AirportMatrixCountry[] = ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Japan'];

const GLYPHS: Readonly<Record<string, readonly string[]>> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'], D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'], F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'], H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'], J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'], N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'], P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'], R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'], T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'], V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'], X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'], Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'], '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'], '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'], '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'], '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'], '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  ':': ['00000', '00100', '00100', '00000', '00100', '00100', '00000'], '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'], ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

const DOTS = Array.from({ length: 35 }, (_, index) => ({ x: index % 5, y: Math.floor(index / 5) }));
const DOT_RADIUS = 0.34;

function createDotPath(char: string | null) {
  return DOTS.filter(({ x, y }) => char === null || GLYPHS[char][y][x] === '1')
    .map(({ x, y }) => `M${x - DOT_RADIUS},${y}a${DOT_RADIUS},${DOT_RADIUS} 0 1,0 ${DOT_RADIUS * 2},0a${DOT_RADIUS},${DOT_RADIUS} 0 1,0 ${-DOT_RADIUS * 2},0`)
    .join('');
}

const INACTIVE_DOT_PATH = createDotPath(null);
const GLYPH_PATHS = Object.fromEntries(Object.keys(GLYPHS).map((char) => [char, createDotPath(char)])) as Record<string, string>;

function resolveCities(requested?: AirportMatrixCityId[]) {
  const candidates = requested?.length ? requested : DEFAULT_CITIES;
  const seen = new Set<AirportMatrixCityId>();
  const valid = candidates.filter((id): id is AirportMatrixCityId => {
    if (!Object.prototype.hasOwnProperty.call(AIRPORT_MATRIX_CITIES, id)) {
      if (import.meta.env.DEV) console.warn(`[AirportMatrixClock] Ignoring unsupported city ID: "${String(id)}".`);
      return false;
    }
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, 5);
  if (candidates.length > 5 && import.meta.env.DEV) console.warn('[AirportMatrixClock] Only the first five unique supported cities are displayed.');
  return valid.length ? valid : DEFAULT_CITIES;
}

function formatCityTime(date: Date, timeZone: string, format: '12h' | '24h', showSeconds: boolean) {
  const formatter = new Intl.DateTimeFormat(format === '24h' ? 'en-GB' : 'en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds ? { second: '2-digit' as const } : {}),
    ...(format === '24h' ? { hourCycle: 'h23' as const } : { hour12: true }),
  });
  const parts = formatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? '';
  const hour = part('hour').padStart(2, '0');
  const minute = part('minute');
  const second = showSeconds ? `:${part('second')}` : '';
  const period = format === '12h' ? part('dayPeriod').toUpperCase() : '';
  return { matrix: `${hour}:${minute}${second}${period ? ` ${period}` : ''}`, accessible: `${hour}:${minute}${second}${period ? ` ${period}` : ''}` };
}

const MatrixGlyph = memo(function MatrixGlyph({ char }: { char: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-0.5 -0.5 5 7" className="block h-auto w-[clamp(10px,3.4vw,20px)] overflow-visible">
      <path d={INACTIVE_DOT_PATH} fill="currentColor" opacity="0.12" />
      <path d={GLYPH_PATHS[char] ?? GLYPH_PATHS[' ']} fill="currentColor" />
    </svg>
  );
});

const MatrixCharacter = memo(function MatrixCharacter({ char, index, reduceMotion, rebuildId }: { char: string; index: number; reduceMotion: boolean; rebuildId: number }) {
  const shouldAnimate = rebuildId > 0 && !reduceMotion;
  return (
    <span className="relative inline-flex w-[clamp(10px,3.4vw,20px)] shrink-0 items-center justify-center overflow-hidden align-middle" aria-hidden="true">
      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={rebuildId}
          initial={shouldAnimate ? { y: '72%', opacity: 0.45 } : false}
          animate={{ y: '0%', opacity: 1 }}
          exit={shouldAnimate ? { y: '-72%', opacity: 0.45 } : { opacity: 0 }}
          transition={shouldAnimate ? { ...motionTransitions.springSnappy, delay: Math.min(index * 0.012, 0.09) } : { duration: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <MatrixGlyph char={char} />
        </motion.span>
      </AnimatePresence>
      <span className="invisible"><MatrixGlyph char="0" /></span>
    </span>
  );
});

const MatrixText = memo(function MatrixText({ text, reduceMotion, rebuildId, label, className = '' }: { text: string; reduceMotion: boolean; rebuildId: number; label: string; className?: string }) {
  return (
    <span
      aria-label={label}
      className={`inline-flex min-w-0 items-center gap-[clamp(0.5px,0.2vw,2px)] text-current ${className}`}
    >
      <span aria-hidden="true" className="sr-only">{label}</span>
      {Array.from(text.toUpperCase()).map((char, index) => (
        <MatrixCharacter key={index} char={GLYPHS[char] ? char : ' '} index={index} reduceMotion={reduceMotion} rebuildId={rebuildId} />
      ))}
    </span>
  );
});

const CountryLabel = memo(function CountryLabel({ country, rebuildId, reduceMotion }: { country: AirportMatrixCountry; rebuildId: number; reduceMotion: boolean }) {
  return (
    <span
      aria-label={country}
      className="mt-1 block break-words font-mono text-[8px] tracking-[0.12em] text-text-muted dark:text-[#8A8A8A]"
    >
      {Array.from(country.toUpperCase()).map((char, index) => (
        char === ' '
          ? ' '
          : <motion.span
              key={`${index}-${char}-${rebuildId}`}
              aria-hidden="true"
              initial={rebuildId === 0 || reduceMotion ? false : { opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={rebuildId === 0 || reduceMotion ? { duration: 0 } : { ...motionTransitions.easeFast, delay: Math.min(index * 0.008, 0.08) }}
              className="inline-block"
            >
              {char}
            </motion.span>
      ))}
    </span>
  );
});

type AirportClockRowData = {
  id: AirportMatrixCityId;
  name: string;
  country: AirportMatrixCountry;
  time: ReturnType<typeof formatCityTime>;
};

const AirportMatrixClockRow = memo(function AirportMatrixClockRow({
  row, rowIndex, rowCount, showCountry, showControls, reduceMotion, onRemove,
}: {
  row: AirportClockRowData;
  rowIndex: number;
  rowCount: number;
  showCountry: boolean;
  showControls: boolean;
  reduceMotion: boolean;
  onRemove: (id: AirportMatrixCityId) => void;
}) {
  const [rebuildId, setRebuildId] = useState(0);
  const handlePointerEnter = (event: PointerEvent<HTMLLIElement>) => {
    if (!reduceMotion && event.pointerType !== 'touch') setRebuildId((current) => current + 1);
  };

  return (
    <li
      onPointerEnter={handlePointerEnter}
      className={`grid items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 ${showControls ? 'grid-cols-[minmax(66px,0.72fr)_minmax(0,1.28fr)_22px] sm:grid-cols-[minmax(112px,0.72fr)_minmax(0,1.28fr)_24px]' : 'grid-cols-[minmax(84px,0.8fr)_minmax(0,1.2fr)] sm:grid-cols-[minmax(140px,0.8fr)_minmax(0,1.2fr)]'} ${rowIndex < rowCount - 1 ? 'border-b border-border/50 dark:border-[#363636]/70' : ''}`}
    >
      <div className="min-w-0 text-text-primary dark:text-[#F5F5F5]">
        <MatrixText text={row.time.matrix} label={`${row.time.accessible}, ${row.name}`} reduceMotion={reduceMotion} rebuildId={rebuildId} />
      </div>
      <div className="min-w-0 text-text-primary dark:text-[#F5F5F5]">
        <MatrixText text={row.name} label={row.name} reduceMotion={reduceMotion} rebuildId={rebuildId} />
        {showCountry && <CountryLabel country={row.country} rebuildId={rebuildId} reduceMotion={reduceMotion} />}
      </div>
      {showControls && (
        <button
          type="button"
          onClick={() => onRemove(row.id)}
          disabled={rowCount <= 1}
          aria-label={`Remove ${row.name}`}
          className="flex h-6 w-6 items-center justify-center rounded text-sm leading-none text-text-muted transition-colors hover:bg-black/5 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30 dark:text-[#8A8A8A] dark:hover:bg-white/10 dark:hover:text-white"
        >
          ×
        </button>
      )}
    </li>
  );
});

export function AirportMatrixClock({
  cities,
  format = '24h',
  showSeconds = false,
  updateInterval = 1000,
  showCountry = false,
  showControls,
  onCitiesChange,
  className = '',
}: AirportMatrixClockProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [now, setNow] = useState(() => Date.now());
  const [internalCities, setInternalCities] = useState(() => resolveCities(cities));
  const [selectedCountry, setSelectedCountry] = useState<AirportMatrixCountry>('United States');
  const [selectedCity, setSelectedCity] = useState<AirportMatrixCityId>('chicago');
  const countrySelectId = useId();
  const citySelectId = useId();
  const controlsVisible = showControls ?? cities === undefined;
  const isControlled = cities !== undefined && onCitiesChange !== undefined;
  const citiesSignature = cities?.join('\u0000') ?? null;
  const selectedCities = useMemo(() => resolveCities(isControlled ? cities : internalCities), [cities, internalCities, isControlled]);
  const countryCityIds = useMemo(
    () => (Object.keys(AIRPORT_MATRIX_CITIES) as AirportMatrixCityId[]).filter((id) => AIRPORT_MATRIX_CITIES[id].country === selectedCountry),
    [selectedCountry],
  );

  useEffect(() => {
    if (citiesSignature !== null && !isControlled) {
      const nextCities = citiesSignature ? citiesSignature.split('\u0000') as AirportMatrixCityId[] : [];
      setInternalCities(resolveCities(nextCities));
    }
  }, [citiesSignature, isControlled]);

  const updateCities = (nextCities: AirportMatrixCityId[]) => {
    if (!isControlled) setInternalCities(nextCities);
    onCitiesChange?.(nextCities);
  };

  const handleAddCity = () => {
    if (selectedCities.length >= 5 || selectedCities.includes(selectedCity)) return;
    const nextCities = [...selectedCities, selectedCity];
    updateCities(nextCities);
    const nextAvailable = countryCityIds.find((id) => id !== selectedCity && !nextCities.includes(id));
    if (nextAvailable) setSelectedCity(nextAvailable);
  };

  const handleRemoveCity = (id: AirportMatrixCityId) => {
    if (selectedCities.length <= 1) return;
    updateCities(selectedCities.filter((cityId) => cityId !== id));
  };

  useEffect(() => {
    const interval = Number.isFinite(updateInterval) && updateInterval > 0 ? updateInterval : 1000;
    const timer = window.setInterval(() => setNow(Date.now()), interval);
    return () => window.clearInterval(timer);
  }, [updateInterval]);

  const rows = useMemo(() => selectedCities.map((id) => {
    const city = AIRPORT_MATRIX_CITIES[id];
    return { id, ...city, time: formatCityTime(new Date(now), city.timeZone, format, showSeconds) };
  }), [selectedCities, now, format, showSeconds]);

  return (
    <section
      aria-label={`World times: ${rows.map((row) => `${row.time.accessible} ${row.name}`).join(', ')}`}
      className={`relative w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-[#F5F5F5] text-text-primary shadow-sm [--amc-grid:rgba(0,0,0,0.008)] dark:border-[#363636] dark:bg-[#202020] dark:text-[#F5F5F5] dark:[--amc-grid:rgba(255,255,255,0.01)] ${className}`}
      style={{ backgroundImage: 'linear-gradient(var(--amc-grid) 1px, transparent 1px), linear-gradient(90deg, var(--amc-grid) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
    >
      <div>
        <header className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-6 dark:border-[#363636]">
          <p className="font-mono text-[10px] tracking-[0.18em] text-text-muted dark:text-[#8A8A8A]">WORLD CLOCK</p>
        </header>
        <ul className="m-0 list-none p-0">
          {rows.map((row, rowIndex) => (
            <AirportMatrixClockRow key={row.id} row={row} rowIndex={rowIndex} rowCount={rows.length} showCountry={showCountry} showControls={controlsVisible} reduceMotion={reduceMotion} onRemove={handleRemoveCity} />
          ))}
        </ul>
        {controlsVisible && (
          <div className="border-t border-border/70 px-3 py-3 dark:border-[#363636] sm:px-5">
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] tracking-[0.12em] text-text-muted dark:text-[#8A8A8A]">
              <span>ADD A CITY</span><span>{selectedCities.length} / 5 CITIES</span>
            </div>
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_auto] gap-1.5 sm:gap-2">
              <label className="sr-only" htmlFor={countrySelectId}>Country</label>
              <select
                id={countrySelectId}
                aria-label="Country"
                value={selectedCountry}
                onChange={(event) => {
                  const country = event.target.value as AirportMatrixCountry;
                  setSelectedCountry(country);
                  const firstAvailable = (Object.keys(AIRPORT_MATRIX_CITIES) as AirportMatrixCityId[]).find(
                    (id) => AIRPORT_MATRIX_CITIES[id].country === country && !selectedCities.includes(id),
                  );
                  const firstInCountry = (Object.keys(AIRPORT_MATRIX_CITIES) as AirportMatrixCityId[]).find((id) => AIRPORT_MATRIX_CITIES[id].country === country) ?? 'new-york';
                  setSelectedCity(firstAvailable ?? firstInCountry);
                }}
                className="min-w-0 rounded-md border border-border bg-white px-2 py-2 font-sans text-[10px] text-text-primary outline-none transition-colors focus-visible:border-accent-blue dark:border-[#363636] dark:bg-[#242424] dark:text-[#F5F5F5]"
              >
                {SUPPORTED_COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
              <label className="sr-only" htmlFor={citySelectId}>City</label>
              <select
                id={citySelectId}
                aria-label="City"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value as AirportMatrixCityId)}
                className="min-w-0 rounded-md border border-border bg-white px-2 py-2 font-sans text-[10px] text-text-primary outline-none transition-colors focus-visible:border-accent-blue dark:border-[#363636] dark:bg-[#242424] dark:text-[#F5F5F5]"
              >
                {countryCityIds.map((id) => <option key={id} value={id}>{AIRPORT_MATRIX_CITIES[id].name}</option>)}
              </select>
              <button
                type="button"
                onClick={handleAddCity}
                disabled={selectedCities.length >= 5 || selectedCities.includes(selectedCity)}
                className="rounded-md bg-[#242424] px-3 py-2 font-sans text-[10px] font-medium text-white transition-colors hover:bg-[#363636] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#F5F5F5] dark:text-[#151515] dark:hover:bg-white"
              >
                Add
              </button>
            </div>
          </div>
        )}
        {!controlsVisible && (
          <footer className="border-t border-[#363636] px-3 py-2 font-mono text-[9px] tracking-[0.12em] text-[#8A8A8A] sm:px-5">
            {rows.length} CITIES <span className="px-1.5 opacity-50">/</span> IANA TIME ZONES
          </footer>
        )}
      </div>
    </section>
  );
}
