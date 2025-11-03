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
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackReflectionCompleted,
  trackInsightGenerated,
  trackInsightViewed,
  trackInsightShared,
  resetAnalytics,
  getConfig,
  isEnabled,
} from './client';

// Type exports
export type {
  AnalyticsEvent,
  UserActivationEvent,
  OnboardingStepViewedEvent,
  OnboardingStepCompletedEvent,
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
