# CPS Website

The CPS (Competitive Programming Society) website for PICT brings together competitive programming learning materials, problem sheets, events and community information.

## Run locally

Requirements: Node.js and npm compatible with the versions in `package-lock.json`.

```bash
npm ci
npm run dev
```

Vite prints a local URL. Optional Supabase configuration is documented in `.env.example`; copy the variable names to `.env` and provide project values to enable Google sign-in and cloud progress. Without configured credentials, the application uses guest behavior and a safe fallback client.

## Useful commands

```bash
npm run build    # production build
npm run lint     # ESLint across the repository
npm run preview  # preview the built site
```

There is currently no test script in `package.json`.

## Project context

- [AGENTS.md](AGENTS.md): architecture, conventions and required task workflow.
- [PROJECT_STATUS.md](PROJECT_STATUS.md): current feature inventory, known issues and next steps.
- [CHANGELOG.md](CHANGELOG.md): significant implementation history.
- [docs/DECISIONS.md](docs/DECISIONS.md): decisions and inferred existing conventions.
- [docs/templates/TASK_HANDOFF.md](docs/templates/TASK_HANDOFF.md): reusable handoff format.
- [prd.md](prd.md): product requirements draft; it describes proposed scope and is not the source of truth for implemented behavior.

Application source is under `src/`. Route and deployment feature gates are configured in `src/App.jsx` and `src/config/features.js`.
