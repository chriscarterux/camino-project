-- Seed initial reflection prompts
-- Part of HOW-511: Build Prompts System and API
-- 28 prompts (1 week rotation, 4 per day) balanced across 3 dimensions

-- Clear any existing test data
TRUNCATE TABLE public.prompts;

-- IDENTITY DIMENSION (9 prompts)
-- Foundation phase prompts (days 1-28)
INSERT INTO public.prompts (text, dimension, day_number, phase, tags) VALUES
  ('What did you learn about yourself today that surprised you?', 'identity', 1, 'foundation', ARRAY['self-discovery', 'awareness']),
  ('Describe a moment today when you felt most like yourself. What were you doing?', 'identity', 4, 'foundation', ARRAY['authenticity', 'self-expression']),
  ('What strength did you rely on today? How did it serve you?', 'identity', 7, 'foundation', ARRAY['strengths', 'resilience']),
  ('If you could describe your day in three words that capture who you are, what would they be?', 'identity', 10, 'foundation', ARRAY['self-concept', 'values']),
  ('What part of your identity felt most visible or invisible today?', 'identity', 13, 'foundation', ARRAY['visibility', 'authenticity']),
  ('What did you say "yes" to today that aligned with who you want to be?', 'identity', 16, 'foundation', ARRAY['values', 'alignment']),
  ('Describe a choice you made today. What does it reveal about your priorities?', 'identity', 19, 'foundation', ARRAY['choices', 'priorities']),
  ('What would you do differently today if you were being completely authentic?', 'identity', 22, 'foundation', ARRAY['authenticity', 'growth']),
  ('What aspect of yourself are you developing right now? How did it show up today?', 'identity', 25, 'foundation', ARRAY['growth', 'development']);

-- WORLDVIEW DIMENSION (10 prompts)
INSERT INTO public.prompts (text, dimension, day_number, phase, tags) VALUES
  ('What assumption about the world was challenged today?', 'worldview', 2, 'foundation', ARRAY['assumptions', 'perspective']),
  ('How did your perspective shift from the beginning to the end of today?', 'worldview', 5, 'foundation', ARRAY['perspective', 'change']),
  ('What did you notice today that you usually overlook?', 'worldview', 8, 'foundation', ARRAY['awareness', 'mindfulness']),
  ('Describe something that happened today from two different perspectives.', 'worldview', 11, 'foundation', ARRAY['perspective-taking', 'empathy']),
  ('What pattern did you notice in your day? What might it mean?', 'worldview', 14, 'foundation', ARRAY['patterns', 'meaning-making']),
  ('What surprised you about today? What does that surprise reveal about your expectations?', 'worldview', 17, 'foundation', ARRAY['expectations', 'surprise']),
  ('If today was a chapter in your life story, what would it be called and why?', 'worldview', 20, 'foundation', ARRAY['narrative', 'meaning']),
  ('What did you believe was possible today that you didn''t believe yesterday?', 'worldview', 23, 'foundation', ARRAY['beliefs', 'possibility']),
  ('What did you pay attention to today? What does that tell you about what matters to you?', 'worldview', 26, 'foundation', ARRAY['attention', 'values']),
  ('How did you make sense of something confusing or uncertain today?', 'worldview', 28, 'foundation', ARRAY['uncertainty', 'sense-making']);

-- RELATIONSHIPS DIMENSION (9 prompts)
INSERT INTO public.prompts (text, dimension, day_number, phase, tags) VALUES
  ('Describe a meaningful interaction you had today. What made it meaningful?', 'relationships', 3, 'foundation', ARRAY['connection', 'meaning']),
  ('How did you show up for someone today, even in a small way?', 'relationships', 6, 'foundation', ARRAY['support', 'presence']),
  ('What did someone teach you today, whether they meant to or not?', 'relationships', 9, 'foundation', ARRAY['learning', 'insight']),
  ('Describe a moment when you felt truly heard or understood today.', 'relationships', 12, 'foundation', ARRAY['understanding', 'connection']),
  ('How did you navigate a difference between yourself and someone else today?', 'relationships', 15, 'foundation', ARRAY['conflict', 'difference']),
  ('What boundary did you honor (or wish you had honored) today?', 'relationships', 18, 'foundation', ARRAY['boundaries', 'self-care']),
  ('Who made you smile today? What did they do or say?', 'relationships', 21, 'foundation', ARRAY['joy', 'connection']),
  ('How did you contribute to someone else's day today?', 'relationships', 24, 'foundation', ARRAY['contribution', 'impact']),
  ('What do you appreciate about the people in your life right now?', 'relationships', 27, 'foundation', ARRAY['gratitude', 'appreciation']);

-- Verify seed data
SELECT
  dimension,
  COUNT(*) as prompt_count,
  MIN(day_number) as first_day,
  MAX(day_number) as last_day
FROM public.prompts
GROUP BY dimension
ORDER BY dimension;

SELECT 'Seeded 28 reflection prompts successfully!' AS status;
