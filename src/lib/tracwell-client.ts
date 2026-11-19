import { createTracwell, type TracwellClient } from 'tracwell'

const PROJECT_KEY = 'tw_live_c883c90c593d407dadb0543701499557'

let analytics: TracwellClient | undefined

export function initializeTracwell(): void {
  // Keep analytics out of local development, matching the app's production-only insights.
  if (!import.meta.env.PROD) return

  try {
    analytics ??= createTracwell({
      collectionMode: 'private',
      consent: 'granted',
      projectKey: PROJECT_KEY,
      respectDoNotTrack: true,
    })
  } catch (error) {
    console.warn('[Tracwell] Analytics initialization failed; continuing without analytics.', error)
  }
}

export function trackTracwellEvent(
  eventName: string,
  properties: Record<string, string | number | boolean>,
): void {
  if (!import.meta.env.PROD) return
  try {
    analytics?.track(eventName, properties)
  } catch (error) {
    console.warn('[Tracwell] Could not send analytics event.', error)
  }
}

export async function flushTracwellEvents(): Promise<void> {
  try {
    await analytics?.flush()
  } catch (error) {
    console.warn('[Tracwell] Could not flush analytics events.', error)
  }
}
