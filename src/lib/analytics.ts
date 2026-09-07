import { useEffect } from 'react';

// Declaration for gtag on window object
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Google Analytics 4 Measurement ID.
 * Loaded from environment variables (NEXT_PUBLIC_GA_MEASUREMENT_ID or VITE_GA_MEASUREMENT_ID).
 */
export const GA_MEASUREMENT_ID: string = (
  import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  import.meta.env.VITE_GA_MEASUREMENT_ID ||
  ''
).trim();

// Track the last recorded page path to prevent duplicate page_view events
let lastTrackedPath: string | null = null;
let isGAInitialized = false;

/**
 * Initialize Google Analytics 4 dynamically.
 * Injects gtag.js script and sets up global gtag function if not already done.
 */
export function initGA(): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || isGAInitialized) {
    return;
  }

  // Prevent duplicate script tags
  const existingScript = document.getElementById('ga4-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: any[]) {
      window.dataLayer?.push(args);
    };
  }

  window.gtag('js', new Date());
  // Disable automatic pageview so our custom tracker handles SPA route changes cleanly without duplicates
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  isGAInitialized = true;
}

/**
 * List of sensitive key patterns to filter out of analytics parameters for privacy compliance.
 */
const SENSITIVE_KEYS_REGEX = /pass(word)?|token|secret|auth|api_?key|bearer|credit|card|ssn/i;

/**
 * Clean and sanitize event parameters to enforce privacy rules (no passwords, tokens, secrets, PII).
 */
function sanitizeParams(params?: Record<string, any>): Record<string, any> | undefined {
  if (!params) return undefined;
  const clean: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (SENSITIVE_KEYS_REGEX.test(key)) {
      continue; // Skip sensitive fields
    }
    // Only allow primitive types or serializable values
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    }
  }

  return clean;
}

/**
 * Track a page view event in Google Analytics 4.
 *
 * @param path - The page path (e.g. '/#components?page=2' or '/#docs/introduction')
 * @param title - The page title
 */
export function trackPageView(path?: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const currentPath = path || (window.location.pathname + (window.location.hash || ''));
  const currentTitle = title || document.title;

  // Prevent duplicate pageview dispatch for the same path
  if (lastTrackedPath === currentPath) {
    return;
  }

  lastTrackedPath = currentPath;

  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: currentPath,
      page_title: currentTitle,
      page_location: window.location.href,
    });
  }
}

/**
 * Track a custom event in Google Analytics 4.
 *
 * @example
 * ```ts
 * trackEvent("component_copy", { component: "magnetic-button", type: "cli" });
 * ```
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

  const sanitized = sanitizeParams(eventParams);
  window.gtag('event', eventName, sanitized);
}

/**
 * Known AI assistant & search referral sources.
 */
const AI_REFERRAL_PATTERNS: Array<{ engine: string; regex: RegExp }> = [
  { engine: 'ChatGPT', regex: /(chatgpt\.com|chat\.openai\.com)/i },
  { engine: 'Claude', regex: /claude\.ai/i },
  { engine: 'Perplexity', regex: /perplexity\.ai/i },
  { engine: 'Gemini', regex: /(gemini\.google\.com|bard\.google\.com)/i },
  { engine: 'Copilot', regex: /(copilot\.microsoft\.com|edgeservices\.bing\.com)/i },
  { engine: 'Phind', regex: /phind\.com/i },
  { engine: 'Poe', regex: /poe\.com/i },
  { engine: 'Mistral', regex: /(chat\.mistral\.ai|mistral\.ai)/i },
  { engine: 'Grok', regex: /(grok\.com|x\.ai)/i },
];

let hasTrackedAiReferral = false;

/**
 * Checks document.referrer and URL query parameters to detect incoming traffic
 * from AI assistants, LLM tools, or AI-powered search engines.
 */
export function detectAiReferrer(): { engine: string; source: string } | null {
  if (typeof window === 'undefined') return null;

  const referrer = document.referrer || '';
  for (const { engine, regex } of AI_REFERRAL_PATTERNS) {
    if (regex.test(referrer)) {
      return { engine, source: 'referrer' };
    }
  }

  // Check URL parameters for explicit AI UTM or ref tags (e.g. ?utm_source=chatgpt or ?ref=perplexity)
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || params.get('ref') || '';
    if (utmSource) {
      for (const { engine, regex } of AI_REFERRAL_PATTERNS) {
        if (regex.test(utmSource)) {
          return { engine, source: 'utm_param' };
        }
      }
    }
  } catch {
    /* no-op */
  }

  return null;
}

/**
 * Custom React hook for tracking route and view changes across the EasyUI application.
 * Automatically initializes GA and captures page views on mount and URL/view updates.
 */
export function useAnalyticsTracker(state?: {
  activeView?: string;
  componentPage?: number;
  activeDocTopic?: string;
}): void {
  // Initialize GA once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Detect and attribute AI assistant referrals on mount
  useEffect(() => {
    if (hasTrackedAiReferral) return;
    const aiRef = detectAiReferrer();
    if (aiRef) {
      hasTrackedAiReferral = true;
      trackEvent('ai_referral', {
        ai_engine: aiRef.engine,
        ai_source: aiRef.source,
        landing_page: window.location.pathname + (window.location.search || ''),
      });
    }
  }, []);

  // Track page view whenever view state or route changes
  useEffect(() => {
    // Construct clean descriptive route path
    let computedPath = window.location.pathname || '/';
    if (window.location.search) {
      computedPath += window.location.search;
    }

    // Set document title according to active section
    let pageTitle = 'EasyUI — Beautiful UI. Made easy.';
    if (state?.activeView === 'docs') {
      pageTitle = `Documentation - ${state.activeDocTopic || 'Introduction'} | EasyUI`;
    } else if (state?.activeView === 'components') {
      pageTitle = `Components (Page ${state.componentPage || 1}) | EasyUI`;
    }

    trackPageView(computedPath, pageTitle);
  }, [state?.activeView, state?.componentPage, state?.activeDocTopic]);
}
