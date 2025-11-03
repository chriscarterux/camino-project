/**
 * Analytics Client for Camino
 *
 * Provides type-safe event tracking with PostHog integration.
 * Features:
 * - Type-safe event tracking
 * - Offline event queuing
 * - Privacy-respecting (respects Do Not Track)
 * - Error handling and retry logic
 * - Server and client-side support
 */

import {
  AnalyticsConfig,
  AnalyticsEvent,
  UserProperties,
  QueuedEvent,
  EVENT_NAMES,
} from './types';

// PostHog client (loaded dynamically to avoid SSR issues)
let posthog: any = null;

// Event queue for offline support
let eventQueue: QueuedEvent[] = [];
const MAX_QUEUE_SIZE = 100;
const MAX_RETRIES = 3;

// Configuration
let config: AnalyticsConfig = {
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  enabled: false,
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Initialize analytics client
 * Must be called before tracking events
 */
export async function initAnalytics(customConfig?: Partial<AnalyticsConfig>): Promise<void> {
  // Merge custom config
  config = { ...config, ...customConfig };

  // Check if analytics should be enabled
  if (!config.apiKey) {
    console.warn('[Analytics] PostHog API key not configured');
    config.enabled = false;
    return;
  }

  // Respect Do Not Track
  if (typeof window !== 'undefined' && navigator.doNotTrack === '1') {
    console.info('[Analytics] Do Not Track enabled, analytics disabled');
    config.enabled = false;
    return;
  }

  config.enabled = true;

  // Load PostHog client-side only
  if (typeof window !== 'undefined') {
    try {
      const { default: posthogJS } = await import('posthog-js');
      posthog = posthogJS;

      posthog.init(config.apiKey, {
        api_host: config.host,
        debug: config.debug,
        capture_pageview: false, // We'll handle pageviews manually
        capture_pageleave: true,
        autocapture: false, // Explicit tracking only
        disable_session_recording: false, // Enable session replay
        session_recording: {
          maskAllInputs: true, // Privacy: mask all inputs
          maskTextSelector: '[data-private]', // Mask elements with data-private attribute
        },
        loaded: (ph) => {
          if (config.debug) {
            console.log('[Analytics] PostHog initialized');
          }
        },
      });

      // Process queued events
      await processQueue();
    } catch (error) {
      console.error('[Analytics] Failed to initialize PostHog:', error);
      config.enabled = false;
    }
  }
}

/**
 * Identify user for analytics
 */
export function identifyUser(userId: string, properties?: UserProperties): void {
  if (!config.enabled || !posthog) {
    if (config.debug) console.log('[Analytics] Identify skipped (not enabled)');
    return;
  }

  try {
    posthog.identify(userId, properties);

    if (config.debug) {
      console.log('[Analytics] User identified:', userId, properties);
    }
  } catch (error) {
    console.error('[Analytics] Failed to identify user:', error);
  }
}

/**
 * Track analytics event
 */
export function track(event: AnalyticsEvent): void {
  if (!config.enabled) {
    if (config.debug) {
      console.log('[Analytics] Event skipped (not enabled):', event.event);
    }
    return;
  }

  // Validate event has required fields
  if (!event.user_id || !event.timestamp) {
    console.error('[Analytics] Invalid event (missing user_id or timestamp):', event);
    return;
  }

  // If PostHog not loaded, queue the event
  if (!posthog) {
    queueEvent(event);
    return;
  }

  try {
    posthog.capture(event.event, {
      ...event.properties,
      user_id: event.user_id,
      timestamp: event.timestamp,
    });

    if (config.debug) {
      console.log('[Analytics] Event tracked:', event.event, event.properties);
    }
  } catch (error) {
    console.error('[Analytics] Failed to track event:', error);
    queueEvent(event);
  }
}

/**
 * Track user activation achieved
 */
export function trackActivation(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.USER_ACTIVATION_ACHIEVED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  track(event);

  // Update user properties
  if (posthog) {
    posthog.people?.set({
      is_activated: true,
      activation_date: new Date().toISOString(),
    });
  }
}

/**
 * Track onboarding step viewed
 */
export function trackOnboardingStepViewed(
  userId: string,
  stepNumber: number,
  stepName: string
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.ONBOARDING_STEP_VIEWED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: {
      step_number: stepNumber,
      step_name: stepName,
    } as any,
  };

  track(event);
}

/**
 * Track onboarding step completed
 */
export function trackOnboardingStepCompleted(
  userId: string,
  stepNumber: number,
  stepName: string,
  timeSpentSeconds: number
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.ONBOARDING_STEP_COMPLETED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: {
      step_number: stepNumber,
      step_name: stepName,
      time_spent_seconds: timeSpentSeconds,
    } as any,
  };

  track(event);
}

/**
 * Track reflection completed
 */
export function trackReflectionCompleted(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.REFLECTION_COMPLETED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  track(event);
}

/**
 * Track insight generated
 */
export function trackInsightGenerated(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.INSIGHT_GENERATED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  track(event);
}

/**
 * Track insight viewed
 */
export function trackInsightViewed(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.INSIGHT_VIEWED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  track(event);
}

/**
 * Track insight shared
 */
export function trackInsightShared(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.INSIGHT_SHARED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  track(event);
}

/**
 * Queue event for later processing
 */
function queueEvent(event: AnalyticsEvent): void {
  if (eventQueue.length >= MAX_QUEUE_SIZE) {
    console.warn('[Analytics] Event queue full, dropping oldest event');
    eventQueue.shift();
  }

  eventQueue.push({
    event,
    retries: 0,
    timestamp: new Date().toISOString(),
  });

  if (config.debug) {
    console.log('[Analytics] Event queued:', event.event);
  }
}

/**
 * Process queued events
 */
async function processQueue(): Promise<void> {
  if (eventQueue.length === 0) return;

  if (config.debug) {
    console.log(`[Analytics] Processing ${eventQueue.length} queued events`);
  }

  const eventsToProcess = [...eventQueue];
  eventQueue = [];

  for (const queuedEvent of eventsToProcess) {
    try {
      track(queuedEvent.event);
    } catch (error) {
      // Retry logic
      if (queuedEvent.retries < MAX_RETRIES) {
        queuedEvent.retries++;
        eventQueue.push(queuedEvent);
      } else {
        console.error('[Analytics] Failed to process event after retries:', error);
      }
    }
  }
}

/**
 * Reset analytics (for testing or logout)
 */
export function resetAnalytics(): void {
  if (posthog) {
    posthog.reset();
  }
  eventQueue = [];

  if (config.debug) {
    console.log('[Analytics] Reset complete');
  }
}

/**
 * Get current configuration (for debugging)
 */
export function getConfig(): AnalyticsConfig {
  return { ...config };
}

/**
 * Check if analytics is enabled
 */
export function isEnabled(): boolean {
  return config.enabled;
}
