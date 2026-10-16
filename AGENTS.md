# JobTrack — Codex Collaboration Rules

## Source of truth
- Read `PROJECT_PLAN.md` before proposing or implementing changes.
- Follow the approved MVP scope, architecture, and milestone sequence.
- If a task conflicts with the plan, flag the conflict and ask before changing scope.

## Learning-first workflow
- The developer is learning Jest, React Testing Library, and backend engineering.
- Do not solve exercises explicitly reserved for the developer. Offer hints, explain failures, and review submitted attempts instead.
- For each task, explain the intent, outline the smallest change, and summarize what was learned.
- Work on one bounded task at a time; do not generate the full product in one pass.

## Stack and architecture
- Monorepo using npm workspaces: `apps/web` (React, Vite, TypeScript, Tailwind CSS) and `apps/api` (Express, TypeScript).
- PostgreSQL + Prisma for persistence; JWT authentication carried by HttpOnly cookies.
- Jest + React Testing Library for frontend tests; Jest + Supertest for backend HTTP tests. Introduce MSW when testing frontend API interactions.
- Use strict TypeScript. Avoid `any` unless justified and documented.
- Keep UI copy, code identifiers, comments, documentation, and commit messages in English.
- Prefer simple, accessible components and small functions over premature abstractions.

## Safety and security
- Never commit secrets, `.env` files, credentials, tokens, or real user data.
- Do not store JWTs in localStorage or sessionStorage.
- Treat authentication and authorization as backend responsibilities; derive application ownership from the authenticated user.
- Plan secure cookie flags, CSRF defenses, password hashing, validation, session expiration, and logout invalidation before implementing authentication.
- Do not modify unrelated files, remove data, or run destructive commands without explicit approval.

## Code changes and verification
- Before editing, state which files you intend to change and why.
- Make minimal changes relevant to the active task.
- Add or update tests for behavioral changes, except when tests are intentionally assigned to the learner.
- Run relevant lint, typecheck, and test commands when available. Never claim checks passed if they were not run.
- Report commands run, results, outstanding issues, and any decisions requiring approval.
- Do not install dependencies or change package versions without stating the rationale.
- Update documentation when architectural decisions or public contracts change.

## First task constraints
- Scaffold only the repository foundation: npm workspaces, `apps/web`, `apps/api`, TypeScript configurations, Vite/React, Tailwind, minimal Express health endpoint, basic lint/test configuration, and supporting docs.
- Do not implement authentication, application CRUD, dashboard, Kanban, Prisma schema, or production deployment in the initial scaffold.
- Keep the first React Testing Library exercise for the developer to implement, rather than generating its solution.
