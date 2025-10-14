-- Camino Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  plan text not null default 'reflect' check (plan in ('reflect', 'journey', 'coach')),
  streak_days integer not null default 0,
  lms_user_id text, -- Frappe user email
  lms_api_token text, -- Encrypted Frappe API token
  lms_synced_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Reflections table
create table public.reflections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prompt_id integer not null,
  prompt_text text not null,
  content text not null,
  mood text check (mood in ('good', 'neutral', 'low')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reflections enable row level security;

create policy "Users can view own reflections"
  on public.reflections for select
  using (auth.uid() = user_id);

create policy "Users can create own reflections"
  on public.reflections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reflections"
  on public.reflections for update
  using (auth.uid() = user_id);

create policy "Users can delete own reflections"
  on public.reflections for delete
  using (auth.uid() = user_id);

-- Insights table (AI-generated summaries)
create table public.insights (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  summary text not null,
  themes text[] not null default '{}',
  time_period text not null default 'weekly' check (time_period in ('daily', 'weekly', 'monthly')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.insights enable row level security;

create policy "Users can view own insights"
  on public.insights for select
  using (auth.uid() = user_id);

-- Journey progress table
create table public.journey_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id integer not null,
  module_name text not null,
  completed boolean not null default false,
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, module_id)
);

alter table public.journey_progress enable row level security;

create policy "Users can view own progress"
  on public.journey_progress for select
  using (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.journey_progress for update
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.journey_progress for insert
  with check (auth.uid() = user_id);

-- Subscriptions table (synced with Stripe)
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null check (plan in ('reflect', 'journey', 'coach')),
  status text not null check (status in ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Notification preferences
create table public.notification_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  daily_reminders boolean not null default true,
  weekly_summaries boolean not null default true,
  product_updates boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

alter table public.notification_preferences enable row level security;

create policy "Users can view own preferences"
  on public.notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.notification_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.notification_preferences for insert
  with check (auth.uid() = user_id);

-- Function to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'name');

  insert into public.notification_preferences (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.reflections
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.journey_progress
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.notification_preferences
  for each row execute procedure public.handle_updated_at();

-- Course enrollments table (tracks LMS access)
create table public.course_enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  course_name text not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_slug)
);

alter table public.course_enrollments enable row level security;

create policy "Users can view own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

-- Lesson progress table (cache of LMS progress for fast queries)
create table public.lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  lesson_id text not null,
  lesson_name text not null,
  completed_at timestamp with time zone,
  is_completed boolean not null default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_slug, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

-- Certificates table (course completion certificates)
create table public.certificates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  course_name text not null,
  certificate_url text, -- Link to generated certificate PDF/image
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_slug)
);

alter table public.certificates enable row level security;

create policy "Users can view own certificates"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "Users can insert own certificates"
  on public.certificates for insert
  with check (auth.uid() = user_id);

-- Achievements table (badges and milestones)
create table public.achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_type text not null check (achievement_type in (
    'first_reflection',
    'week_streak',
    'month_streak',
    'first_module',
    'all_modules',
    'fifty_reflections',
    'hundred_reflections'
  )),
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, achievement_type)
);

alter table public.achievements enable row level security;

create policy "Users can view own achievements"
  on public.achievements for select
  using (auth.uid() = user_id);

-- Indexes for performance
create index reflections_user_id_idx on public.reflections(user_id);
create index reflections_created_at_idx on public.reflections(created_at desc);
create index insights_user_id_idx on public.insights(user_id);
create index journey_progress_user_id_idx on public.journey_progress(user_id);
create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index subscriptions_stripe_customer_id_idx on public.subscriptions(stripe_customer_id);
create index course_enrollments_user_id_idx on public.course_enrollments(user_id);
create index lesson_progress_user_id_idx on public.lesson_progress(user_id);
create index lesson_progress_course_slug_idx on public.lesson_progress(course_slug);
create index certificates_user_id_idx on public.certificates(user_id);
create index achievements_user_id_idx on public.achievements(user_id);
