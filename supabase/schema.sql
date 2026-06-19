-- Référence de schéma pour la fondation V3 "espace enseignant".
-- À exécuter manuellement dans le SQL editor du projet Supabase choisi.
-- Ne contient aucune donnée élève nominative ni donnée sensible.

create table if not exists public.teacher_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teacher_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  school_year text not null,
  level text not null check (level in ('CP', 'CE1', 'CE2', 'CM1', 'CM2')),
  class_name text,
  student_count integer,
  active_period text not null default 'P1' check (active_period in ('P1', 'P2', 'P3', 'P4', 'P5')),
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.teacher_profiles enable row level security;
alter table public.teacher_classes enable row level security;

-- Un enseignant ne peut lire/écrire que ses propres données.
create policy "teacher_profiles_select_own" on public.teacher_profiles
  for select using (auth.uid() = id);
create policy "teacher_profiles_upsert_own" on public.teacher_profiles
  for insert with check (auth.uid() = id);
create policy "teacher_profiles_update_own" on public.teacher_profiles
  for update using (auth.uid() = id);

create policy "teacher_classes_select_own" on public.teacher_classes
  for select using (auth.uid() = teacher_id);
create policy "teacher_classes_insert_own" on public.teacher_classes
  for insert with check (auth.uid() = teacher_id);
create policy "teacher_classes_update_own" on public.teacher_classes
  for update using (auth.uid() = teacher_id);
create policy "teacher_classes_delete_own" on public.teacher_classes
  for delete using (auth.uid() = teacher_id);
