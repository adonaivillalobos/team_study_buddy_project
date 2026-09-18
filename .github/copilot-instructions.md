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

Follow the StudyBuddy design theme:

- Primary: `#375ECB`
- Accent: `#FF7310`
- Background: `#F8FAFC`
- Success: `#007F2E`
- Error: `#CC0303`
- Text: `#1F2937`

Typography:

- Headings: Montserrat
- Body: Open Sans

Layout guidelines:

- Mobile-first and responsive.
- Use a centered content area with a maximum width of approximately 1200px.
- Use an 8px spacing system where practical.
- Cards use approximately 12px border radius.
- Buttons and inputs use approximately 8px border radius.
- Use subtle shadows and light borders.

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
6. Open a pull request.
7. Request review from the other team member.
8. Address review feedback.
9. Merge the pull request after approval.

## Important Instructions

Before making significant changes:

- Review the relevant specification files.
- Check the existing code before creating new components or functionality.
- Follow the existing architecture and design decisions.
- Keep the MVP scope in mind.