# CPS Project Status

Last updated: 2026-11-25. This is a repository snapshot, not a claim that every route or integration was reverified on this date. Source code is authoritative when it differs from this document.

## 1. Project overview

CPS (Competitive Programming Society, PICT) is a React single-page site for competitive programming education, problem practice, placements, events and community information. The frontend uses React 19, Vite 8, React Router 7, JavaScript/JSX and plain CSS. Content is primarily static JS data. Supabase is an optional external service for Google authentication and per-user problem progress.

The application mounts in `src/main.jsx`; routing, shared auth provider, navbar and footer are in `src/App.jsx`. Page content is under `src/pages/` and `src/components/`; deployment feature flags are in `src/config/features.js`.

## 2. Feature inventory

| Feature | Status | Location | Notes |
|---|---|---|---|
| Topic of the Week | Implemented; integration needs testing | `/totw`, `src/components/TopicOfTheWeekPage.jsx`, `src/data/topicOfTheWeek.js` | Feature gate enabled. Current content focuses on binary search, concepts, resources, problem ladder and templates. Reads/writes `problem_progress` when Supabase is configured. |
| Must-Try LeetCode / OA Sheet | Implemented; backend needs testing | `/sheet`, aliases `/sheets` and `/oa-sheet`; `src/pages/OASheetPage.jsx`, `src/data/oaSheet.js` | Feature gate enabled. 55 static problems, combined filters/search, expandable hints, guest localStorage progress and Supabase sync/merge code. Browser and live database behavior are unverified. |
| Resource Disclaimer | Implemented in uncommitted working tree; needs browser check | `/resource-disclaimer`, `src/pages/ResourceDisclaimerPage.jsx` | Direct route, shared footer link and OA Sheet notice exist in source. Content covers provenance and limitations; it is not a privacy policy. No built-in feedback form/contact channel was found. |
| Google authentication | Implemented; external configuration needs verification | `src/context/AuthContext.jsx`, `src/context/useAuth.js`, `src/lib/supabase.js` | Google OAuth defaults to `/totw`; navbar sign-in from `/sheet` and the OA Sheet sign-in prompt pass the current route. Other routes retain the `/totw` fallback. The redirect URL allow-list and live OAuth flow remain unverified. Otherwise a no-op Supabase client supports guest use. |
| Problem progress | Partially implemented; deployed schema/RLS unknown | `src/components/TopicOfTheWeekPage.jsx`, `src/pages/OASheetPage.jsx` | Uses table `problem_progress`; OA Sheet also stores guest progress in localStorage. No migrations/schema definitions are checked into this repo. |
| Learning Resources Hub | Implemented; feature gated off | `/resources`, `src/pages/ResourcesPage.jsx`, `src/data/resources.js` | Gate `resources: false`; contains local roadmaps, platform guides, POTD archive and contest template. |
| Homepage | Implemented; feature gated off | `/`, `src/pages/HomePage.jsx` and section components/data | Gate `home: false`; renders under-construction view while disabled. |
| Events & Sessions | Implemented; feature gated off | `/events`, `src/pages/EventsPage.jsx`, `src/data/events.js` | Gate `events: false`; event/session data is local. |
| About / Team | Implemented; feature gated off | `/about`, `src/pages/AboutPage.jsx`, `src/data/team.js` | Gate `about: false`; team and society content is local. |

`/topic-of-the-week` redirects to `/totw`. `FeatureGate` is in `src/components/FeatureGate.jsx`. Vercel rewrites all paths to `index.html` through `vercel.json` for SPA refreshes.

### Documentation discrepancies found

- The old `README.md` was the generic React/Vite starter README; it did not describe CPS. It is now a CPS quickstart and documentation index.
- `prd.md` labels the product status “Proposed”, while the repository contains implemented routes/features. Treat the PRD as planned product scope; use source code and this status snapshot for current implementation state.
- No prior `PROJECT_STATUS.md`, `CHANGELOG.md`, `docs/DECISIONS.md`, or `docs/` directory existed. The pre-existing short `AGENTS.md` contained useful disclaimer/design conventions, which were retained and consolidated.

## 3. Current development status

- Current branch at audit: `feat/oa-sheet`, tracking `origin/feat/oa-sheet`.
- HEAD at audit: `a1925a7` (`docs: add project handoff documentation`), also present on `origin/feat/oa-sheet` at inspection.
- The working tree contains uncommitted Resource Disclaimer changes in `src/App.jsx`, `src/components/Footer.jsx`, `src/pages/OASheetPage.jsx`, `src/styles/sections.css`, and `src/pages/ResourceDisclaimerPage.jsx`.
- Current redirect work changes `src/context/AuthContext.jsx`, the OA Sheet sign-in prompt in `src/pages/OASheetPage.jsx`, and navbar sign-in handling in `src/components/Navbar.jsx`. This task also updates `AGENTS.md`, `CHANGELOG.md`, `PROJECT_STATUS.md` and `docs/DECISIONS.md`; these changes are uncommitted. Preserve them unless the developer directs otherwise.
- The disclaimer implementation had a successful `npm run build` and targeted ESLint check during its implementation. No browser visual check was performed.
- Do not infer an assigned owner or other active feature work from this snapshot.

## 4. Known issues and limitations

| Issue | Area / severity | Status / reproduction |
|---|---|---|
| Full repository lint fails with six errors | `TopicOfTheWeekPage.jsx` (five unused declarations/prop) and `AuthContext.jsx` (React hooks lint rule); severity not assessed | Confirmed by `npm run lint` on 2026-11-25. Fixes were outside the documentation task scope. |
| Supabase database schema and RLS are not in the repo | Progress/auth; backend dependency | Table usage is visible in source, but live schema, policies, OAuth provider settings and deployed state are unknown. Check Supabase project before relying on account progress. |
| Supabase OAuth redirect allow-list is unknown | Google sign-in | The application now requests the initiating OA Sheet URL using `window.location.origin`; Supabase must allow the local development URL and production URL. External configuration and end-to-end OAuth are not verified. |
| OA Sheet and Resource Disclaimer lack browser verification in this checkout | UI/routes | Build and targeted static checks passed for the disclaimer work; layout/refresh/interactions need manual browser inspection. |
| No app-level feedback or contribution mechanism found | Resource corrections | Disclaimer points students to CPS administrators/community contribution channels without inventing contact details. Add a concrete channel only when the project supplies one. |
| No automated test script | Package scripts | `package.json` has build, lint, dev and preview; no `test` or typecheck script. |

## 5. Database and backend status

- Integration: `@supabase/supabase-js` client created only in `src/lib/supabase.js`.
- Auth: Supabase session is loaded/listened to by `AuthProvider`; Google OAuth requires configured Supabase URL/key and provider/redirect setup.
- Progress table used by code: `public.problem_progress` with `user_id`, `problem_id`, `is_completed`; OA Sheet upserts using conflict target `(user_id, problem_id)` and deletes uncompleted rows. `updated_at` is sent on upsert.
- OA guest progress key: `cps:oa-sheet:completed:v1`; merge code reads guest IDs after sign-in and clears the local copy only after a successful upsert.
- No SQL migrations or schema declarations were found. Actual columns, uniqueness, foreign keys and RLS must be verified in the configured Supabase project; do not assume deployment or alter policies without review.

## 6. Configuration

- Copy `.env.example` to `.env` for local Supabase setup. Required variable names: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable/anon client key only; never put service-role secrets in frontend env).
- Without valid non-placeholder values, auth/cloud progress are unavailable and the existing no-op client is used.
- `src/config/features.js` controls page gates.
- `vercel.json` provides SPA route rewrites.
- No credential values are recorded here.

## 7. Recent significant changes

- 2026-11-25: Resource Disclaimer page, shared footer entry and OA Sheet notice are present as uncommitted source changes; docs do not claim browser verification. See newest [CHANGELOG.md](CHANGELOG.md) entry.
- 2026-11-24: Commit `6114056` added the OA Sheet implementation and dataset.
- 2026-11-15: Commits `d7ada8e` and `20d3e1e` updated the Topic of the Week binary-search section and navigation.

## 8. Next recommended steps

1. Verify local and production callback URLs are allowed in Supabase, then test Google sign-in initiated from `/sheet` and from other pages.
2. Review and commit the current Resource Disclaimer plus redirect changes on the intended feature branch; push/create a PR using an authenticated GitHub client.
3. Manually inspect `/sheet`, `/resource-disclaimer`, and `/totw` at desktop/mobile widths and test direct refresh/navigation.
4. Verify the live `problem_progress` schema, unique constraint, RLS, and Google OAuth provider with the backend owner.
5. Resolve the six existing full-lint errors or track them separately, then rerun `npm run lint`.
6. Add a concrete feedback/correction channel only after CPS provides the appropriate destination.

## 9. Verification record

For the Resource Disclaimer implementation, `npm run build`, ESLint on changed React modules and `git diff --check` passed on 2026-11-24 (per task output). Full `npm run lint` was run on 2026-11-25 and failed with the six errors above. Documentation build and link checks passed on 2026-11-25. The OAuth redirect change passed `npm run build` on 2026-11-25; Google OAuth was not executed because this environment has no configured project credentials/browser flow. No live Supabase configuration was inspected.
