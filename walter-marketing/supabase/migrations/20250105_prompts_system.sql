-- Create prompts table for daily reflection questions
-- Part of HOW-511: Build Prompts System and API

-- Create prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  dimension TEXT CHECK (dimension IN ('identity', 'worldview', 'relationships')),
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 84),
  phase TEXT CHECK (phase IN ('foundation', 'exploration', 'integration')),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_prompts_day ON public.prompts(day_number);
CREATE INDEX IF NOT EXISTS idx_prompts_dimension ON public.prompts(dimension);
CREATE INDEX IF NOT EXISTS idx_prompts_phase ON public.prompts(phase);

-- Enable Row Level Security
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Everyone can read prompts (they're not user-specific)
CREATE POLICY "Prompts are viewable by everyone"
  ON public.prompts
  FOR SELECT
  USING (true);

-- Only allow inserts/updates/deletes from service role (admin only)
CREATE POLICY "Only service role can modify prompts"
  ON public.prompts
  FOR ALL
  USING (auth.role() = 'service_role');

-- Add helpful comment
COMMENT ON TABLE public.prompts IS 'Daily reflection prompts for the Reflect feature. Contains questions organized by dimension (identity, worldview, relationships) and phase of the 84-day journey.';

-- Success message
SELECT 'Prompts table created successfully!' AS status;
