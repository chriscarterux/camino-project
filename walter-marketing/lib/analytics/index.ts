/**
 * Analytics Module Export
 *
 * Central export point for all analytics functionality
 */

// Client-side exports
export {
  initAnalytics,
  identifyUser,
  track,
  trackActivation,
  trackReflectionCompleted,
  trackInsightGenerated,
  trackInsightViewed,
  trackInsightShared,
  resetAnalytics,
  getConfig,
  isEnabled,
} from './client';

// Server-side exports
export {
  initServerAnalytics,
  trackServerEvent,
  trackServerActivation,
  trackServerReflectionCompleted,
  trackServerInsightGenerated,
  trackServerInsightViewed,
  flushServerAnalytics,
  calculateDaysSinceSignup,
  getSessionCount,
} from './server';

// Type exports
export type {
  AnalyticsEvent,
  UserActivationEvent,
  ReflectionCompletedEvent,
  InsightGeneratedEvent,
  InsightViewedEvent,
  InsightSharedEvent,
  AnalyticsConfig,
  UserProperties,
  QueuedEvent,
  EventName,
} from './types';

export { EVENT_NAMES } from './types';
