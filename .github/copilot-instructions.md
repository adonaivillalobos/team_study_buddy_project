# StudyBuddy Copilot Instructions

## Project Overview

StudyBuddy is a web application that helps students organize study schedules and track academic progress across multiple courses.

The application should provide:

- Study plan creation
- Study item management
- Progress tracking
- Upcoming and overdue study items
- A simple and student-friendly user experience

## Technology Stack

Use the following technologies:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Clerk for authentication
- Supabase with PostgreSQL for the database

## Project Structure

Use the Next.js App Router structure.

Main application routes include:

- `/` - Landing page
- `/dashboard` - Student dashboard
- `/plans/new` - Create study plan
- `/plans/[id]` - Study plan details
- `/plans/[id]/edit` - Edit study plan
- `/progress` - Progress dashboard

## Reusable Components

The following shared components exist in `components/` and should be reused rather than recreated:

- `Button` - Primary/secondary variants. Accepts all native `<button>` props via `variant="primary" | "secondary"`.
- `Card` - Generic content container with the project's card styling.
- `ProgressBar` - Accessible progress indicator (`role="progressbar"` with ARIA value attributes). Takes `value` (0-100) and an optional `label`.
- `EmptyState` - Zero-data placeholder. Takes `title`, optional `description`, and an optional `action` (e.g. a `<Button>`).
- `Navbar` - Site header, wired into `app/layout.tsx`. Appears on every page automatically.
- `Footer` - Site footer, wired into `app/layout.tsx`. Appears on every page automatically.

Still to be built (do not duplicate as generic components — these are domain-specific and depend on the database schema in issue #2):

- `StudyPlanCard`
- `StudyItem`

## Coding Guidelines

- Use TypeScript for application code.
- Use reusable React components whenever possible.
- Use Tailwind CSS for styling.
- Follow the existing project structure.
- Keep components simple and focused on one responsibility.
- Avoid unnecessary dependencies.
- Do not duplicate code when a reusable component can be created.
- Use clear and descriptive names for variables, functions, components, and files.
- Keep code readable and beginner-friendly.
- Do not introduce changes unrelated to the current task.

## Design Guidelines

Follow the StudyBuddy design theme. Color, font, and spacing tokens are already defined in `app/globals.css` as Tailwind v4 `@theme` variables — use the utility classes below rather than hardcoding hex values or arbitrary values:

- Colors: `bg-primary` / `text-primary` (`#375ECB`), `bg-accent` / `text-accent` (`#FF7310`), `bg-background` (`#F8FAFC`), `text-success` / `bg-success` (`#007F2E`), `text-error` / `bg-error` (`#CC0303`), `text-foreground` (`#1F2937`)
- Fonts: `font-heading` (Montserrat, for headings/labels), `font-body` (Open Sans, for body text) — applied via CSS variables `--font-montserrat` and `--font-open-sans` set in `app/layout.tsx`
- Border radius: `rounded-card` (12px, for cards), `rounded-control` (8px, for buttons/inputs)

Layout guidelines:

- Mobile-first and responsive.
- Use a centered content area with a maximum width of approximately 1200px (`max-w-[1200px]`).
- Use an 8px spacing system where practical.
- Use subtle shadows and light borders (see `Card` component for the reference implementation).

## Database Guidelines

The core entities are:

- User
- Course
- Study Plan
- Study Item

Maintain the relationships documented in:

`specs/001-studybuddy/data-model.md`

Use Supabase with PostgreSQL for persistent application data.

## Git Workflow

For development work:

1. Create a feature branch.
2. Make the required changes.
3. Test the changes locally.
4. Commit with a clear message.
5. Push the branch to GitHub.
6. Open a pull request into `main`.
7. Note: as of Week 04, this project is being completed by a single team member. Pull requests are self-reviewed and documented with review comments before merging, in place of a second-member review.
8. Address any self-review feedback.
9. Merge the pull request once the review comments are resolved.

## Important Instructions

Before making significant changes:

- Review the relevant specification files.
- Check the existing code before creating new components or functionality.
- Follow the existing architecture and design decisions.
- Keep the MVP scope in mind.
