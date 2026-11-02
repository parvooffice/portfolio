-- Run this once in Supabase: SQL Editor -> New query -> Run.
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name)    between 2 and 100),
  email      text not null check (char_length(email)   between 5 and 200),
  message    text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

-- Lock the table: no public access. Only the server (service role key) can write.
alter table public.messages enable row level security;
