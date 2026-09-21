-- Users: synced from Clerk (Clerk's user ID is the primary key, not a generated UUID)
create table users (
  id text primary key,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Courses: each user manages their own list of courses
create table courses (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references users(id) on delete cascade,
  name text not null,
  code text,
  created_at timestamptz not null default now()
);

-- Study Plans: belongs to one user and one course
create table study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  start_date date not null,
  target_date date not null,
  created_at timestamptz not null default now()
);

-- Study Items: individual tasks within a study plan
create table study_items (
  id uuid primary key default gen_random_uuid(),
  study_plan_id uuid not null references study_plans(id) on delete cascade,
  title text not null,
  due_date date,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indexes to speed up the most common lookups
create index idx_courses_user_id on courses(user_id);
create index idx_study_plans_user_id on study_plans(user_id);
create index idx_study_plans_course_id on study_plans(course_id);
create index idx_study_items_study_plan_id on study_items(study_plan_id);