# StudyBuddy Data Model

## Core Entities

### User

Represents a student who uses StudyBuddy.

Key fields:

- `id` - Unique identifier for the user.
- `name` - User's display name.
- `email` - User's email address.

### Course

Represents a course that a student is studying.

Key fields:

- `id` - Unique identifier for the course.
- `name` - Name of the course.
- `code` - Course code or identifier.

### Study Plan

Represents a study plan created by a user for a specific course.

Key fields:

- `id` - Unique identifier for the study plan.
- `userId` - Identifies the user who created the plan.
- `courseId` - Identifies the course associated with the plan.
- `title` - Title of the study plan.
- `startDate` - Date the study plan begins.
- `targetDate` - Target completion date.

### Study Item

Represents an individual study task within a study plan.

Key fields:

- `id` - Unique identifier for the study item.
- `studyPlanId` - Identifies the study plan containing the item.
- `title` - Name or description of the study task.
- `dueDate` - Date the task should be completed.
- `completed` - Indicates whether the task has been completed.

## Relationships

- A `User` can create many `Study Plans`.
- A `Course` can have many `Study Plans`.
- A `Study Plan` belongs to one `User`.
- A `Study Plan` belongs to one `Course`.
- A `Study Plan` can contain many `Study Items`.
- A `Study Item` belongs to one `Study Plan`.

## Relationship Diagram

```text
User
 │
 │ 1-to-many
 ▼
Study Plan ───── many-to-1 ───── Course
    │
    │ 1-to-many
    ▼
Study Item

## Database Solution

StudyBuddy will use PostgreSQL as its relational database.

PostgreSQL will store the core application data, including users, courses, study plans, and study items.

The application will use relationships between these entities to organize each student's study plans and track their progress.

The database structure will support:

- Users creating multiple study plans.
- Courses being associated with study plans.
- Study plans containing multiple study items.
- Study items tracking completion and due dates.

