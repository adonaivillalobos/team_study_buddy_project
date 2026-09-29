# StudyBuddy

StudyBuddy is a web application that helps students organize their study
schedules and track progress across multiple courses. It provides a simple
interface for creating study plans, listing study items with due dates, and
monitoring completion by course and overall -- built for college students
and lifelong learners who want to stay consistent and motivated.

## Team

- Adonai Villalobos

*Note: this project started as a two-person team assignment. My original
teammate, Emmanuel Nduka Eze, was no longer able to participate as of Week
03, and all subsequent work was completed individually.*

## Live Application

- **Production URL:** https://team-study-buddy-project.vercel.app/
- **Repository:** https://github.com/adonaivillalobos/team_study_buddy_project

## Tech Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4
- Clerk for authentication
- Supabase (Postgres) for the database, accessed via `@supabase/supabase-js`
- Vercel for deployment

## Features

- Public marketing landing page; signed-in users are redirected to the dashboard
- Sign up / sign in / sign out via Clerk
- Dashboard with real stats (active plans, total courses, tasks due this
  week, overall completion) and a sidebar for navigation
- Create, edit, and delete study plans, each with a course, start/target
  dates, and a list of study items
- Progress page showing overall and per-course completion, plus items
  grouped as overdue, upcoming, and completed -- with a checkbox to toggle
  an item's completion directly from this page
- Course filter on the dashboard
- Every study plan, study item, and course is scoped to the signed-in
  user at the database query level, not just checked in the UI -- a user
  cannot view, edit, delete, or toggle another user's data even by
  guessing a valid ID

## Getting Started

Clone the repository and install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root with the following
variables (see "Environment Variables" below for where to get each one):

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → Data API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase project → Settings → API Keys |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk application → API Keys |
| `CLERK_SECRET_KEY` | Clerk application → API Keys |

## Database Schema

The full schema (four tables: `users`, `courses`, `study_plans`,
`study_items`, with foreign keys and `ON DELETE CASCADE`) is version
controlled at [`supabase/schema.sql`](./supabase/schema.sql). Row Level
Security is intentionally not enabled, since this project uses Clerk for
authentication rather than Supabase Auth; every database query that reads,
updates, or deletes a user's data filters by `user_id` directly in the
query itself.

## API Notes

Most mutations (creating/updating/deleting study plans, syncing a new
Clerk user into the database) go through Next.js Server Actions in
`lib/actions.ts`.

One feature uses a traditional Route Handler instead, called from a
Client Component via `fetch()`:

- **`PATCH /api/study-items/[id]`** — toggles a study item's completion
  status. Called from `components/StudyItemToggle.tsx` on the Progress
  page. Requires authentication (checked via Clerk's `auth()` inside the
  handler itself, not just via middleware) and verifies the item belongs
  to the requesting user before updating it. Returns `401` if
  unauthenticated, `400` for a malformed request body, `404` if the item
  doesn't exist or isn't owned by the caller, and the updated row as JSON
  on success.

## Testing the App

The app requires a Clerk account to create or manage study plans. A test
account is available for grading:

- **Email:** *(see Canvas submission for the test account credentials)*
- **Password:** *(see Canvas submission for the test account credentials)*

Sign in with those credentials at the production URL above to see a
populated dashboard, or sign up with your own email to start fresh.

## Known Issues / Opportunities

- The dashboard's "Tasks This Week" stat and the Progress page's overdue
  calculation are based on the server's date at request time, not the
  visitor's local timezone
- Deleting a course is not exposed in the UI (courses are created
  automatically the first time a study plan references a new course name)
- No email notifications or reminders yet for upcoming/overdue items
- The course filter on the dashboard is a plain dropdown rather than a
  searchable/autocomplete field, which could get unwieldy with many courses
- Study items can only be added/edited as a block of text when
  creating/editing a study plan; there's no dedicated "add a single item"
  action outside that form

## Project Specification

See the original project specification, including user stories and data
model, in [specs/001-studybuddy/spec.md](./specs/001-studybuddy/spec.md).