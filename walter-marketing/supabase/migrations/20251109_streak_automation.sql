-- HOW-515: Build Automated Streak Tracking System
-- Implements database-level streak calculation with PostgreSQL function and trigger
-- Replaces JavaScript-based calculation in API route for better performance and consistency

-- =============================================================================
-- STREAK CALCULATION FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION calculate_user_streak(p_user_id UUID)
RETURNS TABLE(current_streak INT, record_streak INT, is_new_record BOOLEAN)
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_streak INT := 1;
  v_previous_date DATE;
  v_current_date DATE;
  v_record_streak INT := 1;
  v_is_new_record BOOLEAN := FALSE;
  v_reflection_date DATE;
BEGIN
  -- Get all reflection dates for the user (distinct dates, ordered desc)
  -- Using DATE instead of TIMESTAMP to handle same-day multiple reflections
  FOR v_reflection_date IN
    SELECT DISTINCT DATE(created_at AT TIME ZONE 'UTC') as reflection_date
    FROM reflections
    WHERE user_id = p_user_id
    ORDER BY reflection_date DESC
  LOOP
    -- First iteration: set initial date
    IF v_current_date IS NULL THEN
      v_current_date := v_reflection_date;
      v_current_streak := 1;
      v_previous_date := v_reflection_date;
      CONTINUE;
    END IF;

    -- Calculate days between reflections
    v_current_date := v_reflection_date;

    -- If consecutive days (exactly 1 day apart)
    IF (v_previous_date - v_current_date) = 1 THEN
      v_current_streak := v_current_streak + 1;
    -- If more than 1 day apart, streak is broken
    ELSIF (v_previous_date - v_current_date) > 1 THEN
      EXIT; -- Stop counting, streak is broken
    END IF;

    v_previous_date := v_current_date;
  END LOOP;

  -- Get the current record_streak from profiles table
  SELECT COALESCE(streak_days, 0) INTO v_record_streak
  FROM profiles
  WHERE id = p_user_id;

  -- Check if this is a new record
  IF v_current_streak > v_record_streak THEN
    v_is_new_record := TRUE;
    v_record_streak := v_current_streak;
  END IF;

  -- Return the calculated values
  RETURN QUERY SELECT v_current_streak, v_record_streak, v_is_new_record;
END;
$$;

-- Add helpful comment
COMMENT ON FUNCTION calculate_user_streak(UUID) IS
'Calculates current streak and checks if it''s a new record for a user. Returns current_streak, record_streak, and is_new_record boolean.';

-- =============================================================================
-- AUTO-UPDATE TRIGGER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION update_streak_on_reflection()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_streak INT;
  v_record_streak INT;
  v_is_new_record BOOLEAN;
BEGIN
  -- Calculate the new streak using our function
  SELECT current_streak, record_streak, is_new_record
  INTO v_current_streak, v_record_streak, v_is_new_record
  FROM calculate_user_streak(NEW.user_id);

  -- Update the profile with the new streak information
  UPDATE profiles
  SET
    streak_days = v_current_streak,
    updated_at = NOW()
  WHERE id = NEW.user_id;

  -- Log the streak update (optional, for debugging)
  RAISE NOTICE 'Streak updated for user %: current=%, record=%, new_record=%',
    NEW.user_id, v_current_streak, v_record_streak, v_is_new_record;

  RETURN NEW;
END;
$$;

-- Add helpful comment
COMMENT ON FUNCTION update_streak_on_reflection() IS
'Trigger function that auto-updates user streak when a new reflection is created.';

-- =============================================================================
-- CREATE TRIGGER
-- =============================================================================

-- Drop trigger if it exists (for re-running migration)
DROP TRIGGER IF EXISTS trigger_update_streak ON reflections;

-- Create trigger that fires after each reflection insert
CREATE TRIGGER trigger_update_streak
  AFTER INSERT ON reflections
  FOR EACH ROW
  EXECUTE FUNCTION update_streak_on_reflection();

-- Add helpful comment
COMMENT ON TRIGGER trigger_update_streak ON reflections IS
'Automatically updates user streak when a new reflection is created.';

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

SELECT 'Streak automation system created successfully! ✅' AS status,
       'Function: calculate_user_streak(user_id)' AS function_info,
       'Trigger: trigger_update_streak on reflections table' AS trigger_info;
