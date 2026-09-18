# StudyBuddy Architecture

## MVP Pages and Routes

### `/`

Landing page for StudyBuddy.

Purpose:

- Introduce StudyBuddy
- Explain the main benefits
- Provide access to sign in and get started

### `/dashboard`

Main student dashboard.

Purpose:

- Display the student's study plans
- Show overall progress
- Display upcoming study items
- Provide access to create a new study plan

### `/plans/new`

Create a new study plan.

Purpose:

- Enter course information
- Enter study plan title
- Set start and target dates
- Add study items

### `/plans/[id]`

Study plan details.

Purpose:

- Display a selected study plan
- Display study items
- Show completion progress
- Allow study items to be marked complete or incomplete

### `/plans/[id]/edit`

Edit an existing study plan.

Purpose:

- Update course information
- Update study plan title
- Update dates
- Add, edit, or remove study items
- Delete a study plan

### `/progress`

Progress dashboard.

Purpose:

- Display overall study progress
- Display progress by course
- Show completed, upcoming, incomplete, and overdue study items

## Authentication

Authentication will be handled using Clerk.

Protected application pages will require the user to be authenticated.

## Technology Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Clerk

## Reusable Components

The following reusable components will be used throughout the StudyBuddy application:

- `Navbar` - Provides shared navigation.
- `Footer` - Provides a shared footer.
- `Button` - Provides consistent buttons throughout the application.
- `Card` - Provides a reusable content container.
- `StudyPlanCard` - Displays study plan information.
- `StudyItem` - Displays an individual study task.
- `ProgressBar` - Displays study completion progress.
- `EmptyState` - Displays a message when no data is available.

## Component Hierarchy

```text
StudyBuddy
│
├── Navbar
│
├── Page Content
│   │
│   ├── Landing Page
│   │   └── Button
│   │
│   ├── Dashboard
│   │   ├── StudyPlanCard
│   │   │   └── ProgressBar
│   │   ├── StudyItem
│   │   └── EmptyState
│   │
│   ├── Create Study Plan
│   │   └── Button
│   │
│   ├── Study Plan Details
│   │   ├── StudyItem
│   │   ├── ProgressBar
│   │   └── Button
│   │
│   ├── Edit Study Plan
│   │   └── Button
│   │
│   └── Progress
│       ├── ProgressBar
│       └── Card
│
└── Footer
```