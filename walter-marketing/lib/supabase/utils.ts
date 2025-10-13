import { createClient } from './client';

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, subscriptions(*), notification_preferences(*)')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function getUserReflections(limit = 10) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: reflections } = await supabase
    .from('reflections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return reflections || [];
}

export async function getReflectionsByDateRange(startDate: Date, endDate: Date) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: reflections } = await supabase
    .from('reflections')
    .select('*')
    .eq('user_id', user.id)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: false });

  return reflections || [];
}

export async function getUserInsights(period: 'daily' | 'weekly' | 'monthly' = 'weekly') {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: insights } = await supabase
    .from('insights')
    .select('*')
    .eq('user_id', user.id)
    .eq('time_period', period)
    .order('created_at', { ascending: false });

  return insights || [];
}

export async function getJourneyProgress() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: progress } = await supabase
    .from('journey_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('module_id', { ascending: true });

  return progress || [];
}

export async function updateNotificationPreferences(preferences: {
  daily_reminders?: boolean;
  weekly_summaries?: boolean;
  product_updates?: boolean;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('notification_preferences')
    .upsert({
      user_id: user.id,
      ...preferences,
    })
    .select()
    .single();

  if (error) {
    console.error('Update preferences error:', error);
    return null;
  }

  return data;
}
