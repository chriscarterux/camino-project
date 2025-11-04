/**
 * Analytics Event Types for Camino
 *
 * This file defines all analytics events tracked in the application,
 * with type-safe interfaces for each event's properties.
 *
 * Provider: PostHog (selected for 2025)
 * Rationale:
 * - Privacy-first: Self-hostable, GDPR compliant
 * - Cost-effective: Generous free tier, transparent pricing
 * - Real-time: Instant event tracking and dashboards
 * - Feature-rich: Session replay, feature flags, A/B testing
 * - Developer-friendly: Excellent TypeScript support
 * - Open source: Community-driven, no vendor lock-in
 */

// Base event interface
export interface BaseEvent {
  user_id: string;
  timestamp: string; // ISO 8601 format
}

// Activation event - Primary metric for user activation
export interface UserActivationEvent extends BaseEvent {
  event: 'user_activation_achieved';
  properties: {
    reflection_count: number;
    insight_id: string;
    insight_type: 'pattern' | 'theme' | 'lens_shift';
    days_since_signup: number;
    session_count: number;
    first_dimension: 'identity' | 'worldview' | 'relationships';
    activation_path: 'organic' | 'onboarding' | 'email_prompt';
  };
}

// Secondary events supporting activation journey
export interface ReflectionCompletedEvent extends BaseEvent {
  event: 'reflection_completed';
  properties: {
    reflection_id: string;
    reflection_count: number; // 1, 2, 3...
    prompt_id: string;
    // SECURITY: prompt_text removed - contains PII
    // Only send prompt_id for tracking, never the actual text
    dimension?: 'identity' | 'worldview' | 'relationships';
    word_count: number;
    time_spent_seconds: number;
    mood?: string;
    session_number: number;
    days_since_signup: number;
  };
}

export interface InsightGeneratedEvent extends BaseEvent {
  event: 'insight_generated';
  properties: {
    insight_id: string;
    insight_type: 'pattern' | 'theme' | 'lens_shift';
    reflection_count: number;
    reflection_ids: string[];
    dimension: 'identity' | 'worldview' | 'relationships';
    generation_time_ms: number;
    ai_model: string;
    days_since_signup: number;
  };
}

export interface InsightViewedEvent extends BaseEvent {
  event: 'insight_viewed';
  properties: {
    insight_id: string;
    insight_type: 'pattern' | 'theme' | 'lens_shift';
    is_first_insight: boolean;
    time_since_generation_seconds: number;
    source: 'notification' | 'dashboard' | 'direct_link' | 'onboarding';
    days_since_signup: number;
  };
}

export interface InsightSharedEvent extends BaseEvent {
  event: 'insight_shared';
  properties: {
    insight_id: string;
    insight_type: 'pattern' | 'theme' | 'lens_shift';
    share_method: 'copy_link' | 'social_media' | 'email' | 'download';
    platform?: 'twitter' | 'facebook' | 'linkedin' | 'other';
    days_since_signup: number;
  };
}

// Union type for all analytics events
export type AnalyticsEvent =
  | UserActivationEvent
  | ReflectionCompletedEvent
  | InsightGeneratedEvent
  | InsightViewedEvent
  | InsightSharedEvent;

// Event names for type-safe event tracking
export const EVENT_NAMES = {
  USER_ACTIVATION_ACHIEVED: 'user_activation_achieved',
  REFLECTION_COMPLETED: 'reflection_completed',
  INSIGHT_GENERATED: 'insight_generated',
  INSIGHT_VIEWED: 'insight_viewed',
  INSIGHT_SHARED: 'insight_shared',
} as const;

// Type for event names
export type EventName = typeof EVENT_NAMES[keyof typeof EVENT_NAMES];

// Analytics configuration
export interface AnalyticsConfig {
  apiKey: string;
  host?: string;
  enabled: boolean;
  debug?: boolean;
}

// User properties for identification
export interface UserProperties {
  email?: string;
  name?: string;
  signup_date?: string;
  plan?: 'reflect' | 'journey' | 'coach';
  total_reflections?: number;
  total_insights?: number;
  is_activated?: boolean;
  activation_date?: string;
}

// Queue item for offline support
export interface QueuedEvent {
  event: AnalyticsEvent;
  retries: number;
  timestamp: string;
}
