# CPS Website — Agent and Developer Instructions

## Project overview

CPS is the Competitive Programming Society at Pune Institute of Computer Technology (PICT). This React website organizes algorithm learning, problem practice, placement preparation, events and community information. It is a content-driven client-side application with optional Supabase-backed Google authentication and problem progress.

## Task start (required)

1. Read this file, [PROJECT_STATUS.md](PROJECT_STATUS.md), relevant entries in [CHANGELOG.md](CHANGELOG.md), and relevant decisions in [docs/DECISIONS.md](docs/DECISIONS.md).
2. Inspect `git status`, `git branch --show-current`, and `git log -5 --oneline`. Preserve all uncommitted work; do not reset, stage, commit, or include another developer's changes without explicit authorization.
3. Verify relevant documentation against source. Code is the implementation source of truth; flag and correct stale documentation.
4. Identify affected routes, shared components, data, auth/backend dependencies, and likely conflicts. Give a brief task context before implementation and continue unless a real decision, missing credential, destructive action, or external approval is required.

## Architecture and source map

- Stack: React 19, Vite 8, React Router 7, plain JavaScript/JSX and CSS; npm lockfile is authoritative.
- `src/main.jsx` mounts `App`; `src/App.jsx` defines `BrowserRouter`, `AuthProvider`, shared navigation/footer, route table and not-found route.
- `src/pages/` contains route-level pages; `src/components/` contains shared/page sections; `src/data/` holds local content datasets; `src/context/` holds auth context; `src/lib/` contains integrations; `src/config/` contains deployment feature flags; `src/styles/` contains global theme and section styles.
- `FeatureGate` reads `deploymentConfig` in `src/config/features.js`. Routes and aliases live in `src/App.jsx`; Vercel's `vercel.json` rewrites paths to `index.html` for SPA navigation/refresh.
- State is local React state/hooks. Content is mostly imported from static JS modules; do not add a backend or state library for static content without need.
- Auth is provided once by `src/context/AuthContext.jsx` and consumed through `useAuth()` in `src/context/useAuth.js`. Reuse it; do not create a second auth flow.
- `src/lib/supabase.js` owns the only Supabase client and a no-op fallback when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing. Never expose service-role keys. Auth uses Google OAuth; `signInWithGoogle` defaults to `/totw`, but a page may pass a validated same-origin relative path to return to its initiating route. Supabase's allowed redirect URL list must include the local and production callback URLs.
- `problem_progress` is queried by TOTW and OA Sheet with `user_id`, `problem_id`, and `is_completed`; OA Sheet upserts completions and deletes on uncheck. No schema or migration is present in this repository. Treat live schema, RLS policies and deployed state as unknown until checked in Supabase.
- No database migrations, API server, or automated test suite are present in the repository at the time of this writing.

## Design and implementation conventions

- Use existing CSS variables in `src/styles/theme.css`: background `--bg-primary` (`#080B09`), card `--bg-card`, green `--accent-primary` (`#22C55E`), border `--border` (`#26352B`), typography `--font-heading`, `--font-body`, `--font-mono`, and existing radii/spacing.
- Reuse the shared `Navbar`, `Footer`, `FeatureGate`, existing buttons/cards and CSS patterns. Add site-wide information/navigation in the shared footer; keep page-specific context beside its content.
- Use PascalCase React component filenames/names, camelCase utilities/data fields, named exports for shared utilities and default exports for page/components, following neighboring files.
- Keep CSS in the existing style files; use scoped class names and current responsive breakpoints. Avoid global selectors that affect unrelated pages.
- Use semantic elements, accessible labels and keyboard-operable controls. External links opened in a new tab must use `rel="noopener noreferrer"`.
- Handle loading, empty, fallback and error states where integrations are involved. Do not silently discard progress or claim live backend success without verification.
- Student-reported interview questions and company associations must be represented as reports or preparation guidance, not verified or guaranteed claims without evidence. Do not invent company frequency or contact details.
- Keep resource-provenance disclaimers separate from privacy policies. Do not make unsupported claims about personal-data processing.

## Git safety

- Use feature branches and pull requests. Do not switch branches unexpectedly, force-push, merge, or push unless explicitly asked.
- Before editing, inspect working-tree changes and diffs. Do not overwrite or clean up work unrelated to the request.
- Recommend concise commits such as `feat: add resource disclaimer` or `fix: handle empty progress state`. Do not commit automatically unless asked.
- When documentation conflicts occur, preserve both developers' useful entries, reconcile current status, keep changelog newest-first, and resolve conflicts manually instead of accepting one side wholesale.

## Verification

- Available commands: `npm run build`, `npm run lint`, `npm run dev`, `npm run preview`. No test or typecheck script currently exists.
- Run the build for application changes. Run applicable lint/tests; distinguish existing failures from new ones. Do not claim a test ran if it did not.
- For route, visual or interaction changes, use browser verification when available. If unavailable, report code/build checks separately and state that visual/browser behavior remains unverified.
- Check responsive behavior and direct route refresh when changing pages. Do not change database schema or security policies without a reviewed migration and appropriate authorization.

## Task completion and documentation (required)

1. Inspect `git status`, `git diff --stat`, and relevant diffs; ensure unrelated work is not attributed to this task.
2. Update `PROJECT_STATUS.md` as a current snapshot after significant implementation changes. Mark features implemented only when supported by code and distinguish implementation from verification.
3. Add a concise newest-first entry to `CHANGELOG.md` for significant work, including files, database impact, actual checks, unverified areas and remaining work. Do not invent authors or test results.
4. Update `docs/DECISIONS.md` only for meaningful decisions; mark inferred rationale and unknown dates as such.
5. Update this file only when stable conventions/workflow change. Keep README and linked docs consistent; don't add duplicate documentation.
6. Recheck links, status claims, dates, and `git diff --check`. Do not commit or push unless explicitly instructed.

For a paused multi-developer task, leave the current state, completed/remaining work, relevant files, known issues, dependencies, verification and a concrete next action in `PROJECT_STATUS.md` or the reusable [handoff template](docs/templates/TASK_HANDOFF.md). Do not invent active work or owners.
