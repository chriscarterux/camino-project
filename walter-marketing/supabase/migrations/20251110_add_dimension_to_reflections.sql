-- Add dimension column to reflections table
-- Part of HOW-512: Save Reflections API
-- Dimension tracks which of the 3 life model dimensions the prompt belongs to

-- Add the dimension column
ALTER TABLE public.reflections
ADD COLUMN dimension TEXT CHECK (dimension IN ('identity', 'worldview', 'relationships'));

-- Add index for querying reflections by dimension
CREATE INDEX idx_reflections_dimension ON public.reflections(dimension);

-- Add comment
COMMENT ON COLUMN public.reflections.dimension IS 'Life model dimension: identity, worldview, or relationships';

-- Success message
SELECT 'Dimension column added to reflections table!' AS status;
