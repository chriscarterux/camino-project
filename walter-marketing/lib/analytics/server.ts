/**
 * Server-side Analytics for Camino
 *
 * Provides analytics tracking from server-side API routes.
 * Uses PostHog's Node.js SDK for server-side event tracking.
 */

import { AnalyticsEvent, EVENT_NAMES } from './types';
import { createClient } from '@/lib/supabase/server';

// PostHog Node client
let posthogNode: any = null;
let isInitialized = false;

/**
 * Initialize server-side analytics
 * Should be called once at application startup
 */
export async function initServerAnalytics(): Promise<void> {
  if (isInitialized) return;

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (!apiKey) {
    console.warn('[Analytics Server] PostHog API key not configured');
    return;
  }

  try {
    const { PostHog } = await import('posthog-node');
    posthogNode = new PostHog(apiKey, {
      host,
    });
    isInitialized = true;

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Server] PostHog initialized');
    }
  } catch (error) {
    console.error('[Analytics Server] Failed to initialize:', error);
  }
}

/**
 * Track event from server
 */
export function trackServerEvent(event: AnalyticsEvent): void {
  if (!isInitialized || !posthogNode) {
    console.warn('[Analytics Server] PostHog not initialized');
    return;
  }

  try {
    posthogNode.capture({
      distinctId: event.user_id,
      event: event.event,
      properties: {
        ...event.properties,
        timestamp: event.timestamp,
        $set: {
          // Update user properties
          last_event: event.event,
          last_event_at: event.timestamp,
        },
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Server] Event tracked:', event.event);
    }
  } catch (error) {
    console.error('[Analytics Server] Failed to track event:', error);
  }
}

/**
 * Track activation from server
 */
export function trackServerActivation(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.USER_ACTIVATION_ACHIEVED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  trackServerEvent(event);

  // Update user properties to mark as activated
  if (posthogNode) {
    posthogNode.capture({
      distinctId: userId,
      event: '$set',
      properties: {
        $set: {
          is_activated: true,
          activation_date: new Date().toISOString(),
        },
      },
    });
  }
}

/**
 * Track reflection completed from server
 */
export function trackServerReflectionCompleted(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.REFLECTION_COMPLETED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  trackServerEvent(event);
}

/**
 * Track insight generated from server
 */
export function trackServerInsightGenerated(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.INSIGHT_GENERATED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  trackServerEvent(event);
}

/**
 * Track insight viewed from server
 */
export function trackServerInsightViewed(
  userId: string,
  properties: AnalyticsEvent['properties']
): void {
  const event: AnalyticsEvent = {
    event: EVENT_NAMES.INSIGHT_VIEWED,
    user_id: userId,
    timestamp: new Date().toISOString(),
    properties: properties as any,
  };

  trackServerEvent(event);
}

/**
 * Flush pending events (for serverless environments)
 */
export async function flushServerAnalytics(): Promise<void> {
  try {
    if (posthogNode?.shutdown) {
      await posthogNode.shutdown();
    }
  } catch (error) {
    console.error('[Analytics Server] Failed to flush events:', error);
  }
}

/**
 * Helper to calculate days since signup
 */
export function calculateDaysSinceSignup(signupDate: Date | string): number {
  const signup = new Date(signupDate);
  const now = new Date();
  const diffMs = now.getTime() - signup.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Helper to get session count from database or user metadata
 * Counts the number of distinct days the user has created reflections
 */
export async function getSessionCount(userId: string): Promise<number> {
  try {
    const supabase = await createClient();

    // Query reflections to count unique session days
    const { data, error } = await supabase
      .from('reflections')
      .select('created_at')
      .eq('user_id', userId);

    if (error || !data) {
      console.error('[Analytics] Error fetching session count:', error);
      return 1; // Default fallback
    }

    // Count unique days (sessions)
    const uniqueDays = new Set(
      data.map(r => new Date(r.created_at).toDateString())
    );

    return Math.max(uniqueDays.size, 1);
  } catch (error) {
    console.error('[Analytics] Error calculating session count:', error);
    return 1; // Default fallback
  }
}
