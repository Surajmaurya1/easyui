import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Airport Matrix Clock',
  description: 'A live world clock that renders local times and city names as crisp dot-matrix characters with restrained, character-level rolling transitions.',
  category: 'Motion',
  tagline: 'World time, one rolling matrix character at a time',
  badges: ['Live Time', 'Dot Matrix', 'Reduced Motion'],
  createdAt: '2026-10-05',
  features: [
    'IANA timezone formatting handles local time and daylight-saving changes without a time service',
    'Three-city default with a five-city maximum, duplicate removal, and safe fallback for invalid input',
    'Built-in country and city selectors let viewers add or remove cities from the supported set',
    'Compact bitmap glyphs for city names and 12-hour or 24-hour time',
    'Only changed character cells roll; unchanged cells retain their rendered state',
    'Hovering a city or time rolls its characters through a brief staggered rebuild',
    'Dedicated dark matrix board surface with authentic high-contrast dot matrix typography',
  ],
  props: [
    { name: 'cities', type: 'AirportMatrixCityId[]', default: "['los-angeles', 'london', 'tokyo']", description: 'Initial or controlled city IDs; supports one to five cities.' },
    { name: 'format', type: "'12h' | '24h'", default: "'24h'", description: 'Local time display format.' },
    { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Include seconds in each displayed time.' },
    { name: 'updateInterval', type: 'number', default: '1000', description: 'Shared clock refresh interval in milliseconds.' },
    { name: 'showCountry', type: 'boolean', default: 'false', description: 'Show the country name under each city.' },
    { name: 'showControls', type: 'boolean', default: 'true when cities is omitted', description: 'Show country and city selectors plus add and remove controls.' },
    { name: 'onCitiesChange', type: '(cities: AirportMatrixCityId[]) => void', default: 'undefined', description: 'Receive city selection changes when using a controlled cities prop.' },
    { name: 'className', type: 'string', default: "''", description: 'Additional classes for the board container.' },
  ],
  accessibility: [
    'The board exposes a concise accessible name with the current times and city names; decorative dot SVGs are hidden from assistive technology.',
    'Framer Motion reduced-motion preference removes character travel while retaining current values and live updates.',
    'Semantic section and list markup provides a clear reading order.',
    'Native country and city selects and labeled remove buttons support keyboard use.',
  ],
  usageCode: `import { AirportMatrixClock } from "@/components/ui/airport-matrix-clock";

export function WorldClocks() {
  return (
    <AirportMatrixClock
      cities={["los-angeles", "london", "tokyo"]}
      format="24h"
    />
  );
}

// India: new-delhi, mumbai, bengaluru, hyderabad, chennai, kolkata, lucknow,
// ahmedabad, pune, jaipur, varanasi. United States: new-york, los-angeles,
// san-francisco, chicago, houston, miami, seattle, boston. United Kingdom:
// london, manchester, birmingham, edinburgh, glasgow. UAE: dubai, abu-dhabi,
// sharjah. Japan: tokyo, osaka, kyoto, nagoya, yokohama.
<AirportMatrixClock cities={["new-delhi", "mumbai", "tokyo"]} format="12h" showSeconds showCountry showControls />`,
};

export default meta;
