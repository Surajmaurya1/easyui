// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "airport-matrix-clock",
  "name": "Airport Matrix Clock",
  "tagline": "World time, one rolling matrix character at a time",
  "description": "A live world clock that renders local times and city names as crisp dot-matrix characters with restrained, character-level rolling transitions.",
  "category": "Motion",
  "badges": [
    "Live Time",
    "Dot Matrix",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/airport-matrix-clock",
  "installPromptHash": "3359299f767dff76f154a8aa7fe801ce68c77193fd4350e475e86326df0951ba",
  "features": [
    "IANA timezone formatting handles local time and daylight-saving changes without a time service",
    "Three-city default with a five-city maximum, duplicate removal, and safe fallback for invalid input",
    "Built-in country and city selectors let viewers add or remove cities from the supported set",
    "Compact bitmap glyphs for city names and 12-hour or 24-hour time",
    "Only changed character cells roll; unchanged cells retain their rendered state",
    "Hovering a city or time rolls its characters through a brief staggered rebuild",
    "Dedicated dark matrix board surface with authentic high-contrast dot matrix typography"
  ],
  "props": [
    {
      "name": "cities",
      "type": "AirportMatrixCityId[]",
      "default": "['los-angeles', 'london', 'tokyo']",
      "description": "Initial or controlled city IDs; supports one to five cities."
    },
    {
      "name": "format",
      "type": "'12h' | '24h'",
      "default": "'24h'",
      "description": "Local time display format."
    },
    {
      "name": "showSeconds",
      "type": "boolean",
      "default": "false",
      "description": "Include seconds in each displayed time."
    },
    {
      "name": "updateInterval",
      "type": "number",
      "default": "1000",
      "description": "Shared clock refresh interval in milliseconds."
    },
    {
      "name": "showCountry",
      "type": "boolean",
      "default": "false",
      "description": "Show the country name under each city."
    },
    {
      "name": "showControls",
      "type": "boolean",
      "default": "true when cities is omitted",
      "description": "Show country and city selectors plus add and remove controls."
    },
    {
      "name": "onCitiesChange",
      "type": "(cities: AirportMatrixCityId[]) => void",
      "default": "undefined",
      "description": "Receive city selection changes when using a controlled cities prop."
    },
    {
      "name": "className",
      "type": "string",
      "default": "''",
      "description": "Additional classes for the board container."
    }
  ],
  "accessibility": [
    "The board exposes a concise accessible name with the current times and city names; decorative dot SVGs are hidden from assistive technology.",
    "Framer Motion reduced-motion preference removes character travel while retaining current values and live updates.",
    "Semantic section and list markup provides a clear reading order.",
    "Native country and city selects and labeled remove buttons support keyboard use."
  ],
  "createdAt": "2026-10-05",
  "usageCode": "import { AirportMatrixClock } from \"@/components/ui/airport-matrix-clock\";\n\nexport function WorldClocks() {\n  return (\n    <AirportMatrixClock\n      cities={[\"los-angeles\", \"london\", \"tokyo\"]}\n      format=\"24h\"\n    />\n  );\n}\n\n// India: new-delhi, mumbai, bengaluru, hyderabad, chennai, kolkata, lucknow,\n// ahmedabad, pune, jaipur, varanasi. United States: new-york, los-angeles,\n// san-francisco, chicago, houston, miami, seattle, boston. United Kingdom:\n// london, manchester, birmingham, edinburgh, glasgow. UAE: dubai, abu-dhabi,\n// sharjah. Japan: tokyo, osaka, kyoto, nagoya, yokohama.\n<AirportMatrixClock cities={[\"new-delhi\", \"mumbai\", \"tokyo\"]} format=\"12h\" showSeconds showCountry showControls />",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/AirportMatrixClock.tsx",
      "type": "registry:ui",
      "target": "components/ui/airport-matrix-clock.tsx"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
