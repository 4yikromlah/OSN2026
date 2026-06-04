-- Supabase schema for SMASA-Online CBT
-- Run this in SQL editor (Supabase) to create baseline tables.

-- 1) exams: stores entire exam object in jsonb `data`
create table if not exists public.exams (
  id text primary key,
  data jsonb not null,
  inserted_at timestamptz default now()
);

-- 2) teachers
create table if not exists public.teachers (
  id text primary key,
  nip text,
  name text not null,
  subject text,
  username text unique,
  password text,
  inserted_at timestamptz default now()
);

-- 3) students
create table if not exists public.students (
  id text primary key,
  name text not null,
  username text unique,
  nisn text,
  subject text,
  password text,
  inserted_at timestamptz default now()
);

-- 4) results (exam attempts)
create table if not exists public.results (
  id text primary key,
  student_name text,
  nisn text,
  exam_id text,
  exam_title text,
  score int,
  total_questions int,
  correct_answers int,
  date timestamptz,
  answers jsonb,
  inserted_at timestamptz default now()
);

-- 5) settings (key/value)
create table if not exists public.settings (
  key text primary key,
  value text
);

-- Index examples
create index if not exists idx_results_exam_id on public.results (exam_id);
create index if not exists idx_results_date on public.results (date desc);

-- Note: Configure RLS (Row Level Security) and policies for public anon key usage.
-- Example (recommended): enable RLS and create policies that allow only authenticated users to insert/select where appropriate.
-- See SUPABASE.md for guidance.
