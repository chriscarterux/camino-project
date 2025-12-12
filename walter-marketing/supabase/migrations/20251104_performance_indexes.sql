-- Performance Optimization: Add Database Indexes
-- Created: 2025-11-04
-- Issue: HOW-501
-- Purpose: Improve query performance for frequently accessed tables

-- Note: Some indexes may already exist from previous migrations
-- Using IF NOT EXISTS to prevent errors on re-run

-- ==========================================
-- 1. LEADS TABLE INDEXES
-- ==========================================
-- Email index already exists in 20250103_leads_table.sql (line 17)
-- Adding this as a safety check
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

-- Additional performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(converted_user_id)
  WHERE converted_user_id IS NOT NULL;

-- ==========================================
-- 2. REFLECTIONS TABLE INDEXES
-- ==========================================
-- Reflections table is referenced in analytics migration but not created there
-- Adding index on user_id for common user reflection queries

CREATE INDEX IF NOT EXISTS idx_reflections_user_id ON public.reflections(user_id);
CREATE INDEX IF NOT EXISTS idx_reflections_created_at ON public.reflections(created_at DESC);

-- Composite index for user + date queries (most common pattern)
CREATE INDEX IF NOT EXISTS idx_reflections_user_created ON public.reflections(user_id, created_at DESC);

-- ==========================================
-- 3. INSIGHTS TABLE INDEXES
-- ==========================================
-- User index already exists in 20251103_analytics_tables.sql (line 66)
-- Adding composite index for common query patterns

CREATE INDEX IF NOT EXISTS idx_insights_user_created ON public.insights(user_id, created_at DESC);

-- ==========================================
-- 4. ANALYTICS_EVENTS TABLE INDEXES
-- ==========================================
-- This table may not exist yet - create it if needed
-- Common pattern for client-side analytics tracking

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_name VARCHAR(100) NOT NULL,
  event_properties JSONB,
  user_properties JSONB,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  session_id UUID,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for analytics_events
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON public.analytics_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON public.analytics_events(session_id);

-- Composite index for user event queries
CREATE INDEX IF NOT EXISTS idx_analytics_user_event ON public.analytics_events(user_id, event_name, timestamp DESC);

-- GIN index for JSONB property searches
CREATE INDEX IF NOT EXISTS idx_analytics_event_properties ON public.analytics_events USING GIN (event_properties);
CREATE INDEX IF NOT EXISTS idx_analytics_user_properties ON public.analytics_events USING GIN (user_properties);

-- ==========================================
-- 5. USER ACTIVATIONS TABLE INDEXES
-- ==========================================
-- Most indexes already exist in analytics migration
-- Adding composite index for dashboard queries

CREATE INDEX IF NOT EXISTS idx_activations_path_date ON public.user_activations(activation_path, activated_at DESC);

-- ==========================================
-- 6. PROFILES TABLE INDEXES
-- ==========================================
-- Indexes for common profile queries

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- ==========================================
-- 7. RLS POLICIES FOR ANALYTICS_EVENTS
-- ==========================================

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can view their own events
CREATE POLICY "Users can view their own analytics events"
  ON public.analytics_events FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can insert their own events
CREATE POLICY "Users can insert analytics events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Service role can view all events (for analytics dashboards)
CREATE POLICY "Service role can view all analytics events"
  ON public.analytics_events FOR SELECT
  USING (auth.role() = 'service_role');

-- ==========================================
-- 8. HELPFUL ANALYTICS VIEWS
-- ==========================================

-- Daily active users view
CREATE OR REPLACE VIEW public.daily_active_users AS
SELECT
  DATE(timestamp) as date,
  COUNT(DISTINCT user_id) as dau,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as sessions
FROM public.analytics_events
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Popular events view
CREATE OR REPLACE VIEW public.popular_events AS
SELECT
  event_name,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM public.analytics_events
WHERE timestamp >= NOW() - INTERVAL '7 days'
GROUP BY event_name
ORDER BY event_count DESC;

-- ==========================================
-- 9. COMMENTS FOR DOCUMENTATION
-- ==========================================

COMMENT ON TABLE public.analytics_events IS 'Stores client-side analytics events for product usage tracking';
COMMENT ON COLUMN public.analytics_events.event_name IS 'Name of the event (e.g., page_view, button_click, form_submit)';
COMMENT ON COLUMN public.analytics_events.event_properties IS 'Custom properties specific to this event';
COMMENT ON COLUMN public.analytics_events.user_properties IS 'User properties at the time of the event';
COMMENT ON COLUMN public.analytics_events.session_id IS 'Browser session identifier for grouping events';

COMMENT ON VIEW public.daily_active_users IS 'Shows daily active user counts and engagement metrics';
COMMENT ON VIEW public.popular_events IS 'Shows most common events in the last 7 days';

-- ==========================================
-- 10. PERFORMANCE MONITORING
-- ==========================================

-- Function to check index usage
-- Run this query to see which indexes are being used:
-- SELECT * FROM pg_stat_user_indexes WHERE schemaname = 'public' ORDER BY idx_scan DESC;

-- To monitor index bloat, run:
-- SELECT schemaname, tablename, indexname, pg_size_pretty(pg_relation_size(indexrelid)) as index_size
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY pg_relation_size(indexrelid) DESC;
