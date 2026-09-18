# StudyBuddy Team Plan

## Feature Ownership

### Adonai Villalobos Riveiro

Responsible for:

- Set up Clerk authentication and sign-up flow
- Build study plan creation form and API route
- Build update/edit study plan functionality
- Build reusable UI components

### Emmanuel Nduka Eze

Responsible for:

- Design and set up Supabase database schema
- Build progress dashboard view
- Build delete study plan functionality
- Additional assigned StudyBuddy feature work

## Dependencies

The StudyBuddy project has the following dependencies:

1. Clerk authentication needs to be configured before protected application features can be fully tested.
2. The Supabase database schema needs to be established before study plans and study items can be stored permanently.
3. Reusable UI components should be created early so they can be used consistently across the application's pages.
4. The study plan creation functionality depends on the database structure being available.
5. The dashboard and progress features depend on study plan and study item data being available.
6. Edit and delete functionality depends on existing study plans being created and stored.

## Async Check-In Cadence

Team members will communicate asynchronously through GitHub Issues and the project's agreed communication channel.

Each team member will:

- Provide updates on assigned work.
- Comment on GitHub Issues when work is completed or blocked.
- Communicate blockers as soon as possible.
- Review pull requests from the other team member.
- Keep the GitHub Project Board updated.

The team will check in regularly during the week and communicate before making major changes that could affect the other team member's work.

## Pull Request Workflow

Team members will use the following workflow:

1. Create a branch for assigned work.
2. Make and test the changes locally.
3. Commit the changes with a clear commit message.
4. Push the branch to GitHub.
5. Open a pull request.
6. The other team member reviews the pull request.
7. Address any requested changes.
8. Merge the pull request after review.
9. Update the GitHub Project Board.