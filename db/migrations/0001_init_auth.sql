-- V1 auth schema (Auth.js, JWT sessions, credentials provider).
-- Roles: teacher, member, admin. No student role, no student data.
create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('teacher', 'member', 'admin')),
  created_at timestamptz not null default now()
);
