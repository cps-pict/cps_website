# Technical Decision Register

This register captures important existing patterns. Where original discussion is absent, rationale is labeled inferred or undocumented; the recording date is not necessarily the date the original choice was made.

## D-001 — BrowserRouter with SPA hosting rewrite

- **Recorded:** 2026-11-25; original decision date unknown.
- **Context:** Pages are navigated client-side, with direct URLs such as `/totw` and `/sheet`.
- **Decision:** Use React Router `BrowserRouter`; rewrite Vercel paths to `/index.html` via `vercel.json`.
- **Reasoning:** Inferred from the current routing and deployment config; original reasoning undocumented.
- **Alternatives:** Not recorded.
- **Consequences:** Hosting must support SPA fallback for direct navigation and refresh.
- **Affected:** `src/App.jsx`, `src/main.jsx`, `vercel.json`.

## D-002 — Central feature flags gate deployable pages

- **Recorded:** 2026-11-25; original decision date unknown.
- **Context:** Some routes can be shown as under construction without removing their route implementation.
- **Decision:** Store page enablement in `src/config/features.js` and wrap pages in `FeatureGate`.
- **Reasoning:** The source comments explicitly describe flags as page deployment controls; further original rationale is undocumented.
- **Alternatives:** Not recorded.
- **Consequences:** A route can exist while its content is hidden by a false flag; update status docs when flags change.
- **Affected:** `src/config/features.js`, `src/components/FeatureGate.jsx`, `src/App.jsx`.

## D-003 — One Supabase client and shared auth context

- **Recorded:** 2026-11-25; original decision date unknown.
- **Context:** Optional authentication and cloud progress need to be shared by pages.
- **Decision:** Create the client in `src/lib/supabase.js`, provide auth through `AuthProvider`, and consume it through `useAuth()`. Use a no-op fallback when environment config is absent. Google sign-in defaults to `/totw`; an initiating page or navbar may supply a validated same-origin relative path to return to that route.
- **Reasoning:** Inferred from the architecture; original rationale undocumented. Fallback behavior is explicit in source comments.
- **Alternatives:** Not recorded.
- **Consequences:** Keep one client and avoid duplicate auth flows. Real persistence and accepted OAuth redirect URLs depend on Supabase project configuration.
- **Affected:** `src/lib/supabase.js`, `src/context/AuthContext.jsx`, `src/context/useAuth.js`.

## D-004 — Problem progress uses `problem_progress`; OA guests use localStorage

- **Recorded:** 2026-11-25; original decision date unknown.
- **Context:** TOTW and OA Sheet expose per-problem completion state; sheet use should remain possible without login.
- **Decision:** Authenticated code reads/writes `problem_progress`; OA guest progress uses the namespaced key `cps:oa-sheet:completed:v1` and merges into the signed-in user after authentication.
- **Reasoning:** Observed code pattern. Why this table/schema was chosen is undocumented; actual deployed schema and RLS are unknown.
- **Alternatives:** Not recorded.
- **Consequences:** Confirm uniqueness and per-user RLS in the real Supabase project. Do not infer live database state from client code.
- **Affected:** `src/components/TopicOfTheWeekPage.jsx`, `src/pages/OASheetPage.jsx`, `src/lib/supabase.js`.

## D-005 — Content catalogs are static JavaScript modules

- **Recorded:** 2026-11-25; original decision date unknown.
- **Context:** Educational content, events and team information are rendered from local data.
- **Decision:** Current catalogs are maintained under `src/data/` and imported by pages/components.
- **Reasoning:** Inferred from implementation; original reasoning undocumented. No content-management API was found.
- **Alternatives:** Not recorded.
- **Consequences:** Updating source data and deploying the frontend is required for catalog changes; pushing an arbitrary data file does not create a live admin publishing workflow.
- **Affected:** `src/data/`, `src/pages/`, `src/components/`.

## D-006 — Resource provenance is distinct from privacy policy

- **Recorded:** 2026-11-25.
- **Context:** Educational materials include third-party links and reported interview experiences, but repository evidence does not document comprehensive personal-data handling.
- **Decision:** Label the information page “Resource Disclaimer”; describe source limitations and third-party ownership without presenting it as a Privacy Policy.
- **Reasoning:** Avoid unsupported claims about data processing and distinguish educational content provenance from privacy practices.
- **Alternatives:** A privacy policy was not created because required data-practice information is unavailable in this repository.
- **Consequences:** Add a separate privacy document only when verified data collection, storage, sharing and user-rights details are available.
- **Affected:** `src/pages/ResourceDisclaimerPage.jsx`, `src/App.jsx`, `src/components/Footer.jsx`, `src/pages/OASheetPage.jsx`.
