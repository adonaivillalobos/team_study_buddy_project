# StudyBuddy Project Specification

**Feature Branch**: `001-studybuddy`
**Created**: 2026-09-10
**Status**: Draft

## Title and Description

**StudyBuddy** is a web application that helps students organize study schedules and track progress across multiple courses. Students can create structured study plans, review upcoming and completed work, adjust plans as priorities change, and remove plans they no longer need.

## Purpose

StudyBuddy reduces the friction of turning course responsibilities into a manageable study routine. The product should give students one dependable place to see what they need to study, decide when to study it, and understand whether they are keeping pace.

## Target Audience

- College and university students taking multiple courses.
- Lifelong learners managing several self-directed subjects.
- Students who need a simple planning and progress view rather than a complex project-management tool.

## Technical Requirements

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode, no `any`)
- **Styling**: Tailwind CSS (utility-first, no custom CSS unless necessary)
- **Data**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **Hosting**: Vercel
- **Rendering**: Server components by default; client components only where interactivity is needed

## User Scenarios and Testing

### User Story 1 - Create an Account (Priority: P1)

As a new student, I want to sign up for StudyBuddy so that I can save my study plans and access them across sessions.

**Why this priority**: Account creation establishes the user identity required to persist private schedules and progress. It is the entry point for every returning-user workflow.

**Independent Test**: Submit valid account details, sign out or end the session, and sign back in to confirm the account is created and usable without any study plans yet.

**Acceptance Scenarios**:

1. **Given** a visitor is not signed in, **when** they submit a valid unique email address and a password meeting the stated requirements, **then** an account is created and they are signed in or directed to sign in.
2. **Given** an email address is already registered, **when** a visitor submits that address, **then** the form shows a clear error and does not create a duplicate account.
3. **Given** required fields are empty or invalid, **when** the visitor submits the form, **then** validation messages identify the fields to correct and no account is created.
4. **Given** a signed-in student has no plans, **when** they open the study dashboard, **then** they see an empty state with a clear action to create their first plan.

### User Story 2 - Create a Study Plan (Priority: P1)

As a signed-in student, I want to create a study plan for a course so that I can turn a learning goal into scheduled work.

**Why this priority**: Creating a plan is the core value of StudyBuddy and gives students actionable work to complete.

**Independent Test**: Sign in, create a plan with a course, title, dates, and study items, then reload the dashboard and verify that the plan and its items persist.

**Acceptance Scenarios**:

1. **Given** a signed-in student is on the create-plan form, **when** they provide a course, plan title, start date, target date, and at least one study item, **then** the plan is saved with incomplete items and appears in the dashboard.
2. **Given** a target date is earlier than the start date, **when** the student submits the form, **then** the form explains the date conflict and does not save the plan.
3. **Given** a study item has no title or the required plan fields are missing, **when** the student submits the form, **then** validation identifies the invalid input and preserves the entered values where possible.
4. **Given** a student creates a plan, **when** they view it, **then** the plan is associated only with their account and shows its course, dates, items, and completion status.

### User Story 3 - View Progress (Priority: P1)

As a signed-in student, I want to view my study progress across courses so that I know what is complete, upcoming, overdue, and still needs attention.

**Why this priority**: Progress visibility helps students make decisions and is necessary to tell whether planning is improving consistency.

**Independent Test**: Seed plans with a mix of completed, incomplete, upcoming, and overdue items, open the progress view, and verify each category and aggregate is accurate.

**Acceptance Scenarios**:

1. **Given** a student has plans across multiple courses, **when** they open the progress view, **then** they see progress grouped by course and an overall completion summary.
2. **Given** a study item is marked complete, **when** the progress view refreshes, **then** the completed count and percentage update without changing unrelated courses.
3. **Given** an incomplete item has a due date before today, **when** the student views the dashboard or progress view, **then** it is clearly identified as overdue.
4. **Given** a student has no plans, **when** they open the progress view, **then** they see a useful empty state rather than a misleading zero-progress chart or error.

### User Story 4 - Update a Study Plan (Priority: P2)

As a signed-in student, I want to update a study plan so that it stays accurate when my coursework, schedule, or priorities change.

**Why this priority**: Students regularly need to reschedule work or revise scope. Editing prevents stale plans from undermining trust in the application.

**Independent Test**: Create a plan, change its title, dates, course, and study items, save it, and verify the changes persist while existing completion states are retained unless explicitly changed.

**Acceptance Scenarios**:

1. **Given** a student owns a plan, **when** they update valid plan details and save, **then** the updated details are shown on the dashboard and after reload.
2. **Given** an existing study item is complete, **when** the student edits unrelated plan details, **then** that completion state remains complete.
3. **Given** the student adds, edits, or removes study items, **when** they save valid changes, **then** the plan contains exactly the requested items and recalculated progress.
4. **Given** a student attempts to save invalid dates or empty required fields, **when** they submit the update, **then** the update is rejected with actionable validation feedback and the last saved plan remains unchanged.
5. **Given** a student requests a plan they do not own, **when** they attempt to view or update it, **then** the system does not disclose its contents and returns an authorization error.

### User Story 5 - Delete a Study Plan (Priority: P2)

As a signed-in student, I want to delete a study plan so that obsolete plans do not clutter my schedule or progress view.

**Why this priority**: Deletion keeps the dashboard useful, but it is less essential than creating and understanding plans and carries destructive-action risk.

**Independent Test**: Create a plan, delete it through the user interface, confirm the deletion, and verify that it no longer appears in the dashboard or progress totals.

**Acceptance Scenarios**:

1. **Given** a student owns a plan, **when** they choose delete and confirm the action, **then** the plan and its study items are removed from their dashboard and progress calculations.
2. **Given** a student opens the delete action, **when** they have not confirmed, **then** the plan remains unchanged and the student can cancel.
3. **Given** a student requests a plan that does not exist or is not theirs, **when** they attempt deletion, **then** the system returns a safe not-found or authorization response without deleting another student's data.
4. **Given** deletion succeeds, **when** the student returns to the dashboard, **then** a confirmation message appears and the empty state is shown if no plans remain.

## Edge Cases

- Duplicate email addresses, malformed email addresses, weak passwords, and authentication failures.
- Plans with the minimum and maximum supported number of study items.
- Dates at midnight, dates in the student's local timezone, target dates equal to start dates, and plans that cross daylight-saving changes.
- Two plans for the same course with overlapping dates.
- A plan or study item being updated after another session has changed it.
- Network failure during create, update, completion, or delete, including retry without duplicate records.
- A deleted plan being opened from a stale browser tab.
- Users attempting to access, modify, or delete another user's plan by changing an identifier.
- Long course names, plan titles, and study item titles on small screens.
- A student with plans but no completed items, and a student with all items complete.

## Functional Requirements

- **FR-001**: The system MUST allow a visitor to create an account with a unique email address and password.
- **FR-002**: The system MUST validate required fields and domain rules on both the client-facing form and the server boundary.
- **FR-003**: The system MUST authenticate students before exposing or mutating their plans and progress.
- **FR-004**: The system MUST allow an authenticated student to create a study plan containing a course, title, start date, target date, and one or more study items.
- **FR-005**: The system MUST persist each plan and study item with an owner association and an incomplete initial state.
- **FR-006**: The system MUST allow students to mark study items complete or incomplete and recalculate plan and course progress.
- **FR-007**: The system MUST display upcoming, completed, incomplete, and overdue study items with accurate progress totals.
- **FR-008**: The system MUST allow a plan owner to update plan details and its study items without losing unrelated completion states.
- **FR-009**: The system MUST require explicit confirmation before permanently deleting a plan.
- **FR-010**: The system MUST prevent a student from reading or modifying plans owned by another student.
- **FR-011**: The system MUST provide loading, empty, validation-error, authorization-error, not-found, and request-failure states for the relevant workflows.
- **FR-012**: The system MUST preserve user-entered form data when validation fails where security and browser behavior permit.

## API Endpoints

The following resource-oriented endpoints define the initial API contract. Authentication is handled via Clerk; every protected endpoint must verify the authenticated user on the server.

| Method | Endpoint | Priority | Purpose | Expected result |
| --- | --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | P1 | Create an account | `201` with a safe user/session result; `400` for invalid input; `409` for duplicate email |
| `POST` | `/api/auth/login` | P1 | Authenticate an existing student | `200` with a session result; `401` for invalid credentials |
| `POST` | `/api/auth/logout` | P1 | End the current session | `204` on success |
| `GET` | `/api/plans` | P1 | List the signed-in student's plans, with optional course/status/date filters | `200` with an owned plan collection |
| `POST` | `/api/plans` | P1 | Create a plan and its initial study items | `201` with the created plan; `400` for invalid input |
| `GET` | `/api/plans/:planId` | P1 | Retrieve one owned plan and its items | `200`; `404` when unavailable to the current user |
| `PATCH` | `/api/plans/:planId` | P2 | Update owned plan fields and item changes | `200` with the updated plan; `400` for invalid input; `404` when unavailable |
| `DELETE` | `/api/plans/:planId` | P2 | Delete an owned plan and its items | `204`; `404` when unavailable |
| `PATCH` | `/api/plans/:planId/items/:itemId` | P1 | Change a study item's completion state or details | `200` with the updated item; `400` or `404` as appropriate |
| `GET` | `/api/progress` | P1 | Return overall and per-course progress summaries | `200` with counts, percentages, and status groups |

### API Data Rules

- Protected endpoints must derive the owner from the authenticated session, never from a client-supplied owner identifier.
- Request bodies must reject unknown or invalid values according to the endpoint's domain schema.
- Responses must use stable JSON shapes and must not include passwords, session secrets, or other sensitive authentication data.
- Progress percentages must be calculated from the same item set returned for the relevant plan or course and must define the zero-item behavior explicitly as `0%`.

## Key Entities

- **User**: An authenticated student account managed by Clerk, linked to StudyBuddy data by a unique user ID.
- **Course**: Stored as a plain text field on `StudyPlan` for the initial release, rather than a separate shared entity. This keeps the data model focused on the two required CRUD models (`StudyPlan` and `StudyItem`); a dedicated `Course` entity may be introduced later if course reuse across plans becomes necessary.
- **StudyPlan**: A student's goal-oriented schedule with a title, course (text), start date, target date, owner, and study items.
- **StudyItem**: A discrete task within a plan with a title, optional due date or notes, and completion state.
- **ProgressSummary**: Derived overall and per-course counts and percentages for incomplete, completed, upcoming, and overdue items.

## Implementation Priority

1. **P1 - Account and foundation**: Sign up, secure session handling via Clerk, validation, protected plan ownership, core data model, and base route structure.
2. **P1 - Plan creation**: Create a plan with course details, date validation, and initial study items.
3. **P1 - Progress tracking**: Display plans and progress across courses; support marking study items complete or incomplete.
4. **P2 - Plan updates**: Edit plan metadata and study items while preserving unrelated completion state.
5. **P2 - Plan deletion**: Add confirmed deletion, ownership enforcement, and progress cleanup.
6. **P3 - Refinements**: Filtering, reminders, richer course management, conflict detection, and advanced reporting after the core workflows are stable.

> **Team note**: Reminders were intentionally deferred to P3. The team decided to prioritize the core CRUD, auth, and progress-tracking workflows required by the assignment rubric first, and will revisit reminders as a stretch goal if time allows.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A new student can complete account creation and reach an empty dashboard in under 2 minutes with valid input.
- **SC-002**: A signed-in student can create a plan with at least three study items in under 3 minutes.
- **SC-003**: For a test dataset containing multiple courses and mixed completion states, displayed progress totals and percentages match the source study items in 100% of verification cases.
- **SC-004**: After a successful update or deletion, the changed plan state is reflected in the dashboard and progress view on the next request in 100% of acceptance tests.
- **SC-005**: Unauthorized access attempts cannot reveal or mutate another student's plans in 100% of authorization tests.
- **SC-006**: Core workflows provide clear validation, loading, empty, and failure feedback without unhandled errors in the supported responsive layouts.