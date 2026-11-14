/**
 * CPS Platform Deployment Configuration & Feature Flags
 *
 * Controls which pages/features are live and visible in deployment.
 * - Set to `true`: The full feature page renders normally.
 * - Set to `false`: The page displays "Under Construction - 🚧".
 *
 * To deploy or enable a feature, toggle its flag from `false` to `true`.
 */
export const deploymentConfig = {
  // Topic of the Week (/totw, /topic-of-the-week) — Currently ACTIVE
  totw: true,

  // Homepage (/)
  home: false,

  // Must-Try LeetCode & OA Sheet (/sheet, /sheets, /oa-sheet)
  sheet: false,

  // Learning Resources Hub (/resources)
  resources: false,

  // Events & CPS Sessions (/events)
  events: false,

  // About CPS & Team (/about)
  about: false,
};

