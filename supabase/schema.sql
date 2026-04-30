create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  updated_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  order_id text,
  payment_id text not null,
  signature text,
  course_slug text,
  course_title text,
  amount numeric,
  status text not null default 'success',
  created_at timestamptz not null default now()
);

alter table public.purchases
  add column if not exists order_id text,
  add column if not exists payment_id text,
  add column if not exists signature text,
  add column if not exists course_title text,
  add column if not exists amount numeric,
  add column if not exists status text not null default 'success';

create unique index if not exists purchases_payment_id_key
  on public.purchases(payment_id)
  where payment_id is not null;
