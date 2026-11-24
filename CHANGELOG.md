# Changelog

Significant changes only. Git history remains the authoritative record of commits. New entries are added first.

## 2026-11-25 — Preserve OA Sheet route after Google sign-in

Developer: Not specified
Feature/Area: Authentication and OA Sheet

### Added
- OA Sheet prompt and navbar sign-in when on `/sheet` pass the current route to the shared Google sign-in function.
- Shared auth validates the supplied path and constructs `redirectTo` from the current origin; callers without a route retain the `/totw` fallback.

### Modified
- Redirect behavior for the OA Sheet prompt now returns users to `/sheet` after OAuth.

### Files affected
- `src/context/AuthContext.jsx`, `src/pages/OASheetPage.jsx`, `src/components/Navbar.jsx`.

### Database changes
- None. Supabase redirect URL allow-list configuration may need local and production URLs.

### Technical decisions
- Kept `/totw` as the default for existing callers and made the originating route an explicit optional argument.

### Verification
- `npm run build` passed on 2026-11-25.
- Google OAuth was not executed; Supabase credentials/allowed redirect settings and an interactive browser flow were unavailable.

### Pending
- Verify the allowed redirect URLs in the Supabase project and manually test sign-in from `/sheet` and an existing page.

## 2026-11-25 — Shared project context and developer handoff

Developer: Not specified  
Feature/Area: Project documentation

### Added
- Current project snapshot, decision register and reusable task handoff template.
- Task-start/task-completion workflow in `AGENTS.md`; project-specific README and documentation links.

### Modified
- Expanded stable development, architecture, Git-safety and verification instructions.

### Files affected
- `AGENTS.md`, `README.md`, `PROJECT_STATUS.md`, `CHANGELOG.md`, `docs/DECISIONS.md`, `docs/templates/TASK_HANDOFF.md`.

### Database changes
- None.

### Technical decisions
- Kept the four requested primary context documents and one reusable handoff template; did not add a separate per-task handoff log.

### Verification
- Source, scripts, routes, auth, styles, dataset, Git history and working tree inspected.
- `npm run lint` executed; failed with six existing errors in `TopicOfTheWeekPage.jsx` and `AuthContext.jsx`.
- `npm run build`, internal Markdown link checks across six files, and `git diff --check` passed on 2026-11-25.

### Pending
- Existing lint errors, browser verification, and live Supabase schema/RLS verification remain open.

## 2026-11-25 — Resource Disclaimer added to learning resources

Developer: Not specified  
Feature/Area: OA Sheet and resource transparency

### Added
- `/resource-disclaimer` page covering student-reported sources, interview uncertainty, third-party materials, accuracy, educational use and corrections.
- Shared footer link and a compact disclaimer after the OA Sheet problem list.

### Modified
- Added route and responsive styles. The disclaimer distinguishes third-party materials from CPS original content and is not described as a privacy policy.

### Files affected
- `src/pages/ResourceDisclaimerPage.jsx`, `src/App.jsx`, `src/components/Footer.jsx`, `src/pages/OASheetPage.jsx`, `src/styles/sections.css`.

### Database changes
- None.

### Technical decisions
- No privacy policy was created because repository evidence about personal-data processing is insufficient. No contact address was invented.

### Verification
- `npm run build`, targeted ESLint on changed React modules and `git diff --check` passed during the implementation.
- No browser visual check was performed.

### Pending
- Inspect page and direct refresh in a browser. Provide an actual correction channel if CPS identifies one.

## 2026-11-24 — OA problem sheet

Developer: Not specified  
Feature/Area: Placement preparation

### Added
- Must-Try LeetCode/OA Sheet route with filtering, search, hints, problem links, progress display and a 55-problem dataset.
- Guest localStorage progress and Supabase progress synchronization/merge code.

### Modified
- Enabled the `sheet` deployment feature flag and added responsive sheet styles.

### Files affected
- Commit `6114056` (`feat: implement OA problem sheet`): `src/config/features.js`, `src/data/oaSheet.js`, `src/pages/OASheetPage.jsx`, `src/styles/sections.css`.

### Database changes
- None checked in. Existing `problem_progress` table is used; live schema/RLS were not verified.

### Technical decisions
- Kept the problem catalog as local JS data; this does not provide an admin upload workflow.

### Verification
- Production build passed. Dataset audit found 55 unique problem IDs, 28 topics and valid-form URLs. Full lint was blocked by existing errors; browser and live Supabase checks were not performed.

### Pending
- Verify user progress against configured Supabase/RLS and perform browser/mobile testing.

## 2026-11-15 — Topic of the Week binary-search section updates

Developer: Not specified  
Feature/Area: Topic of the Week

### Added
- Binary-search ladder navigation and related visual refinements, as recorded in commits `d7ada8e` and `20d3e1e`.

### Modified
- Topic of the Week binary-search presentation and navigation.

### Files affected
- Commit subjects identify `src/components/TopicOfTheWeekPage.jsx` and related styles/data; exact historical file lists are available from Git.

### Database changes
- No database change is established by the recorded commit subjects.

### Technical decisions
- Original reasoning is undocumented.

### Verification
- Historical verification is unknown.

### Pending
- None inferred from these commits alone.
