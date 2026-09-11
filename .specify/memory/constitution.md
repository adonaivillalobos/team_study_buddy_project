# StudyBuddy Constitution

## Core Principles

### I. Student-Centered Reliability
StudyBuddy features must make it easier for students to plan, prioritize, and understand progress across multiple courses. Requirements and UI states must account for empty, loading, error, overdue, and completed cases. Schedule and progress data must be represented consistently so that a student can trust what the application reports.

### II. Type-Safe TypeScript
TypeScript is required for application code, with strict mode enabled. The codebase must not use `any`; use precise types, generics, discriminated unions, or `unknown` with explicit narrowing instead. Public component props, route handlers, server actions, data models, and shared utilities must have intentional types. Type errors are quality-gate failures, not warnings to defer.

### III. App Router and Clear Boundaries
The application uses Next.js App Router and file-based routing. Components are Server Components by default; add `"use client"` only when browser APIs, local state, effects, or event handlers require it. Keep data access and secrets on the server, pass serializable data to client components, and keep route segments focused on composition and loading/error/not-found states. Follow the repository's current Next.js guidance in `AGENTS.md` and the installed Next.js documentation when APIs differ from familiar versions.

### IV. Utility-First, Accessible UI
Tailwind CSS utilities are the default styling mechanism. Do not add custom CSS when Tailwind utilities or existing shared patterns can express the design; custom CSS is permitted only for genuinely unsupported behavior or reusable primitives and must be justified in the change. Interfaces must be keyboard usable, readable at responsive sizes, provide labels and accessible states for controls, and preserve clear feedback for schedule and progress actions.

### V. Tests Protect Behavior
Every feature or bug fix must include tests appropriate to its risk. Test pure scheduling, progress, and validation logic with unit tests; test important component and route behavior with integration or end-to-end tests. Tests must cover success and meaningful failure or boundary states, including multiple courses, empty schedules, overdue work, and progress transitions where applicable. A change is complete only when linting, type checking, and the relevant test suite pass.

## Technical Standards

- **Required stack:** Next.js with App Router, TypeScript, and Tailwind CSS. Prefer existing dependencies and patterns before adding a package.
- **Source organization:** Use route segments under `app/`, colocate route-specific UI and tests where practical, and extract shared components or domain utilities only when they have more than one clear consumer.
- **Naming:** Use `PascalCase` for React components and types, `camelCase` for variables, functions, hooks, and files that are not route conventions, and `UPPER_SNAKE_CASE` only for true constants. Name files after their primary export. Use descriptive names tied to the domain, such as `CourseProgress` or `studySessions`, rather than generic names such as `Thing` or `data`.
- **Data and security:** Validate external and user-provided data at boundaries. Never expose secrets or server-only credentials to client components. Preserve course and schedule associations when mutating progress.
- **Simplicity:** Prefer the smallest design that satisfies the requirement. Avoid speculative abstractions, duplicated domain rules, and client-side state when server rendering or URL state is sufficient.

## Development Workflow

Each change must identify the user behavior it affects, keep the implementation focused, and update relevant documentation or tests. Before opening a pull request, run `npm run lint`, the TypeScript check used by the project, and the focused tests; run the production build when routing, configuration, or server/client boundaries change. Pull requests must explain the behavior change, verification performed, and any known limitations. Reviewers should check constitution compliance, accessibility, responsive behavior, and regression coverage.

Commits should be small and describe one coherent change. Team members must communicate ownership of overlapping files, rebase or resolve conflicts carefully, and never overwrite another contributor's uncommitted work. Dependency additions and changes to shared data contracts require explicit review.

## Governance

This constitution is the governing quality standard for StudyBuddy and takes precedence over informal conventions. Every feature plan and pull request must include a constitution check. A violation requires either correction or a documented exception explaining the tradeoff, scope, owner, and follow-up date; exceptions are reviewed with the change.

Amendments require a proposed diff, rationale, impact assessment, and agreement from the active team. After approval, update the version and amendment date, then communicate any required migration or workflow changes. Principles are reviewed whenever the stack, product scope, or testing strategy changes materially.

**Version**: 1.0.0 | **Ratified**: 2026-09-10 | **Last Amended**: 2026-09-10
