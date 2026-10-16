# JobTrack

JobTrack is a guided full-stack learning project. This repository currently contains only the Milestone 1 foundation: a React/Vite frontend and an Express API in npm workspaces. See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the approved product and milestone scope.

## Requirements

- Node.js 20.19+ or 22.12+ (Node 22 LTS recommended)
- npm 10+

## Setup

```sh
npm install
```

On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

## Development

Run these in separate terminals:

```sh
npm run dev:web
npm run dev:api
```

The web app uses Vite's default local URL. The API listens on port 3001 by default; `GET http://localhost:3001/health` returns `{ "status": "ok" }`. Set `PORT` to override the API port.

## Checks

```sh
npm run build
npm run test
npm run lint
npm run typecheck
```

The frontend Jest setup uses jsdom, React Testing Library, and jest-dom. Its first status badge exercise and test are intentionally left for the learner. The backend Supertest check calls the Express app directly without starting a server. Jest uses SWC to transform TypeScript because Vite does not configure Jest.

## Dependency choices

- React 19, Vite 8, and Tailwind 4 are the current stable major lines; Tailwind uses its Vite plugin.
- Express 5 and Supertest 7 support the small HTTP API and its route test.
- TypeScript 6.0 is the newest version supported by the current `typescript-eslint` release. ESLint 10 uses a flat config.
- Jest 30 uses SWC for TypeScript/JSX transformation. `@testing-library/jest-dom` 6.9.1 supports the local Node 20 installation; the newer 7.x line requires Node 22.
- Exact direct dependency versions and `package-lock.json` keep setup reproducible.

There is no authentication, persistence, application management, dashboard, or Kanban implementation yet.
