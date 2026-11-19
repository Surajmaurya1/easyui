type SponsorEnvKey =
  | 'NEXT_PUBLIC_DODO_PAYMENT_LINK'
  | 'NEXT_PUBLIC_TALLY_FORM_URL';

// Vite provides import.meta.env in the browser bundle, while the prerender
// script runs under Node where that object is unavailable.
const viteEnv = import.meta.env ?? {};
const runtimeEnv = (
  globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
).process?.env ?? {};
const env = { ...runtimeEnv, ...viteEnv };
const isDev = viteEnv.DEV ?? runtimeEnv.NODE_ENV === 'development';

function readUrl(key: SponsorEnvKey, value: string | undefined): string {
  const normalized = value?.trim() ?? '';
  if (!normalized) {
    if (isDev) console.warn(`[EasyUI sponsorship] Missing ${key}. Sponsorship flow is disabled.`);
    return '';
  }

  try {
    const url = new URL(normalized);
    if (url.protocol === 'https:') return url.toString();
  } catch {
    // Invalid configuration is treated as unavailable; pages remain renderable.
  }

  if (isDev) console.warn(`[EasyUI sponsorship] Invalid ${key}; expected an https URL.`);
  return '';
}

/** Validated once at module load; absent/invalid values safely disable their related feature. */
export const DODO_PAYMENT_LINK = readUrl(
  'NEXT_PUBLIC_DODO_PAYMENT_LINK',
  env.NEXT_PUBLIC_DODO_PAYMENT_LINK,
);
export const TALLY_FORM_URL = readUrl(
  'NEXT_PUBLIC_TALLY_FORM_URL',
  env.NEXT_PUBLIC_TALLY_FORM_URL,
);
export const SPONSOR_CONTACT_EMAIL = 'surajmaurya.pvt@gmail.com';

export const isPaymentLinkReady = Boolean(DODO_PAYMENT_LINK);
export const isTallyFormReady = Boolean(TALLY_FORM_URL);
export const isSponsorContactReady = true;
