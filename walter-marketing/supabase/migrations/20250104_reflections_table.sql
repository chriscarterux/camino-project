-- Create reflections table for storing user reflections
-- Part of HOW-512: Save Reflections API

-- Drop existing table if it has wrong schema
DROP TABLE IF EXISTS public.reflections CASCADE;

-- Create reflections table with proper schema
CREATE TABLE public.reflections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  prompt_text TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('good', 'neutral', 'low')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_reflections_user ON public.reflections(user_id);
CREATE INDEX idx_reflections_prompt ON public.reflections(prompt_id);
CREATE INDEX idx_reflections_created ON public.reflections(created_at DESC);
CREATE INDEX idx_reflections_user_created ON public.reflections(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own reflections
CREATE POLICY "Users can view their own reflections"
  ON public.reflections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reflections"
  ON public.reflections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reflections"
  ON public.reflections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reflections"
  ON public.reflections FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role can manage all reflections"
  ON public.reflections FOR ALL
  USING (auth.role() = 'service_role');

-- Add helpful comments
COMMENT ON TABLE public.reflections IS 'User reflections on daily prompts. Core table for the Reflect feature.';
COMMENT ON COLUMN public.reflections.prompt_id IS 'Reference to the daily prompt';
COMMENT ON COLUMN public.reflections.prompt_text IS 'Snapshot of prompt text at time of reflection';
COMMENT ON COLUMN public.reflections.content IS 'User''s reflection content';
COMMENT ON COLUMN public.reflections.mood IS 'User''s mood when writing reflection';

-- Success message
SELECT 'Reflections table created successfully!' AS status;
