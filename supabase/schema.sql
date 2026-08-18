-- ============================================================
-- TECHREEL AI — Supabase Database Schema & RLS Policies
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  role text not null default 'STUDENT' check (role in ('STUDENT', 'ADMIN')),
  avatar_url text,
  focus_mode text default 'focus' check (focus_mode in ('focus', 'explore')),
  inferred_level text default 'Intermediate' check (inferred_level in ('Beginner', 'Intermediate', 'Advanced')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. REEL INTERACTIONS TABLE
create table if not exists public.reel_interactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  caption text,
  category text not null,
  interaction_type text not null check (interaction_type in ('Watched', 'Liked', 'Saved', 'Shared')),
  watch_percentage integer not null check (watch_percentage >= 0 and watch_percentage <= 100),
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. DETECTED INTERESTS TABLE
create table if not exists public.detected_interests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  inferred_interest text not null,
  confidence text not null check (confidence in ('High', 'Medium', 'Low')),
  confidence_score integer not null,
  contributing_topics text[] default array[]::text[],
  evidence_count integer not null default 0,
  evidence_summary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. RECOMMENDATIONS TABLE
create table if not exists public.recommendations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  category text not null,
  description text not null,
  difficulty text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  confidence text not null check (confidence in ('High', 'Medium', 'Low')),
  interest_match integer not null,
  context_match integer not null,
  novelty integer not null,
  learning_value integer not null,
  difficulty_fit integer not null,
  hype_risk text not null check (hype_risk in ('Low', 'Medium', 'High')),
  why_this text not null,
  why_not_keyword text not null,
  why_not_hype text not null,
  required_output jsonb,
  benchmark_comparison jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. RECOMMENDATION FEEDBACK TABLE
create table if not exists public.recommendation_feedback (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  recommendation_id text not null,
  recommendation_title text not null,
  category text not null,
  feedback_type text not null check (feedback_type in ('useful', 'not_relevant', 'try_another')),
  not_relevant_reason text,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  message text not null,
  read boolean not null default false,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

alter table public.profiles enable row level security;
alter table public.reel_interactions enable row level security;
alter table public.detected_interests enable row level security;
alter table public.recommendations enable row level security;
alter table public.recommendation_feedback enable row level security;
alter table public.notifications enable row level security;

-- PROFILES
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- REEL INTERACTIONS
create policy "Users can manage own reels" on public.reel_interactions
  for all using (auth.uid() = user_id);

-- DETECTED INTERESTS
create policy "Users can view own detected interests" on public.detected_interests
  for all using (auth.uid() = user_id);

-- RECOMMENDATIONS
create policy "Users can view own recommendations" on public.recommendations
  for all using (auth.uid() = user_id);

-- FEEDBACK
create policy "Users can manage own feedback" on public.recommendation_feedback
  for all using (auth.uid() = user_id);

-- NOTIFICATIONS
create policy "Users can view own notifications" on public.notifications
  for all using (auth.uid() = user_id);

-- ADMIN AGGREGATE ACCESS (Read-only aggregate metrics, never exposes raw private user reels to admins)
create policy "Admins can view profiles role" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- Indexes for performance
create index if not exists idx_reels_user_id on public.reel_interactions(user_id);
create index if not exists idx_recommendations_user_id on public.recommendations(user_id);
create index if not exists idx_feedback_user_id on public.recommendation_feedback(user_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
