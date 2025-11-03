-- Analytics Tables Migration
-- Created: 2025-11-03
-- Issue: HOW-177
-- Purpose: Add tables and columns for analytics tracking and activation

-- 1. Create user_activations table
CREATE TABLE IF NOT EXISTS user_activations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  reflection_count INTEGER NOT NULL,
  insight_id UUID REFERENCES insights(id) ON DELETE SET NULL,
  days_since_signup INTEGER NOT NULL,
  session_count INTEGER NOT NULL,
  activation_path VARCHAR(50) NOT NULL CHECK (activation_path IN ('organic', 'onboarding', 'email_prompt')),
  created_at TIMESTAMP DEFAULT NOW(),

  -- Ensure each user can only be activated once
  CONSTRAINT unique_user_activation UNIQUE(user_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_activations_user ON user_activations(user_id);
CREATE INDEX IF NOT EXISTS idx_activations_date ON user_activations(activated_at);
CREATE INDEX IF NOT EXISTS idx_activations_path ON user_activations(activation_path);

-- Add RLS policies
ALTER TABLE user_activations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activation"
  ON user_activations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert activations"
  ON user_activations FOR INSERT
  WITH CHECK (true);

-- 2. Add activation columns to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS is_activated BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS activated_at TIMESTAMP;

-- Add index on activation status
CREATE INDEX IF NOT EXISTS idx_profiles_activated ON profiles(is_activated);
CREATE INDEX IF NOT EXISTS idx_profiles_activated_at ON profiles(activated_at);

-- 3. Create insights table if it doesn't exist
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('pattern', 'theme', 'lens_shift')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  dimension VARCHAR(50) CHECK (dimension IN ('identity', 'worldview', 'relationships')),
  reflection_ids UUID[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Add analytics columns to insights table
ALTER TABLE insights
  ADD COLUMN IF NOT EXISTS viewed_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_insights_user ON insights(user_id);
CREATE INDEX IF NOT EXISTS idx_insights_type ON insights(type);
CREATE INDEX IF NOT EXISTS idx_insights_created ON insights(created_at);
CREATE INDEX IF NOT EXISTS idx_insights_viewed ON insights(viewed_at);

-- Add RLS policies for insights
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own insights"
  ON insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insights"
  ON insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights"
  ON insights FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights"
  ON insights FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Add analytics columns to reflections table (if needed)
ALTER TABLE reflections
  ADD COLUMN IF NOT EXISTS dimension VARCHAR(50) CHECK (dimension IN ('identity', 'worldview', 'relationships'));

CREATE INDEX IF NOT EXISTS idx_reflections_dimension ON reflections(dimension);

-- 6. Create analytics views for easy querying

-- Activation funnel view
CREATE OR REPLACE VIEW activation_funnel AS
SELECT
  COUNT(DISTINCT u.id) as total_signups,
  COUNT(DISTINCT CASE WHEN r1.user_id IS NOT NULL THEN r1.user_id END) as completed_reflection_1,
  COUNT(DISTINCT CASE WHEN r2.user_id IS NOT NULL THEN r2.user_id END) as completed_reflection_2,
  COUNT(DISTINCT CASE WHEN r3.user_id IS NOT NULL THEN r3.user_id END) as completed_reflection_3,
  COUNT(DISTINCT ua.user_id) as activated_users
FROM auth.users u
LEFT JOIN (
  SELECT DISTINCT user_id
  FROM reflections
  GROUP BY user_id
  HAVING COUNT(*) >= 1
) r1 ON u.id = r1.user_id
LEFT JOIN (
  SELECT DISTINCT user_id
  FROM reflections
  GROUP BY user_id
  HAVING COUNT(*) >= 2
) r2 ON u.id = r2.user_id
LEFT JOIN (
  SELECT DISTINCT user_id
  FROM reflections
  GROUP BY user_id
  HAVING COUNT(*) >= 3
) r3 ON u.id = r3.user_id
LEFT JOIN user_activations ua ON u.id = ua.user_id;

-- Activation metrics view
CREATE OR REPLACE VIEW activation_metrics AS
SELECT
  ua.user_id,
  ua.activated_at,
  ua.days_since_signup,
  ua.session_count,
  ua.activation_path,
  ua.reflection_count,
  i.type as insight_type,
  i.dimension as first_dimension,
  DATE_PART('day', ua.activated_at - u.created_at) as actual_days_to_activation
FROM user_activations ua
JOIN auth.users u ON ua.user_id = u.id
LEFT JOIN insights i ON ua.insight_id = i.id;

-- 7. Add helpful functions

-- Function to check if user is activated
CREATE OR REPLACE FUNCTION is_user_activated(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_activations WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user reflection count
CREATE OR REPLACE FUNCTION get_reflection_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM reflections WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to trigger activation check
CREATE OR REPLACE FUNCTION check_and_trigger_activation()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is the user's first insight view and they're not activated
  IF NEW.viewed_at IS NOT NULL AND OLD.viewed_at IS NULL THEN
    -- Check if user is not already activated
    IF NOT EXISTS (SELECT 1 FROM user_activations WHERE user_id = NEW.user_id) THEN
      -- Check if this is their first insight
      IF NOT EXISTS (
        SELECT 1 FROM insights
        WHERE user_id = NEW.user_id
        AND id != NEW.id
        AND viewed_at IS NOT NULL
      ) THEN
        -- Mark user as activated in profiles
        UPDATE profiles
        SET is_activated = TRUE, activated_at = NOW()
        WHERE id = NEW.user_id;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic activation
DROP TRIGGER IF EXISTS trigger_activation_on_insight_view ON insights;
CREATE TRIGGER trigger_activation_on_insight_view
  AFTER UPDATE OF viewed_at ON insights
  FOR EACH ROW
  EXECUTE FUNCTION check_and_trigger_activation();

-- 8. Grant necessary permissions (adjust for your setup)
-- GRANT SELECT ON activation_funnel TO authenticated;
-- GRANT SELECT ON activation_metrics TO authenticated;
-- GRANT EXECUTE ON FUNCTION is_user_activated(UUID) TO authenticated;
-- GRANT EXECUTE ON FUNCTION get_reflection_count(UUID) TO authenticated;

-- 9. Add comments for documentation
COMMENT ON TABLE user_activations IS 'Tracks when users reach the activation moment (3 reflections + first insight viewed)';
COMMENT ON COLUMN user_activations.activation_path IS 'How the user reached activation: organic, onboarding, or email_prompt';
COMMENT ON COLUMN user_activations.days_since_signup IS 'Number of days from signup to activation';
COMMENT ON VIEW activation_funnel IS 'Shows conversion rates through the activation funnel';
COMMENT ON VIEW activation_metrics IS 'Detailed metrics for each activated user';
