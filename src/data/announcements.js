import { OFFICIAL_REGISTRATION_LINK } from "./events";

export const initialAnnouncements = [
  {
    id: "ann-1",
    title: "CPS Membership & Cohort Registrations Now Open for 2026-27",
    category: "Important Notice",
    date: "Nov 02, 2026",
    summary:
      "Join the Competitive Programming Society! Get access to weekly curated problem sets, internal peer contests, mentorship circles, and algorithmic discussion forums.",
    actionUrl: OFFICIAL_REGISTRATION_LINK,
    actionText: "Register for CPS",
    isExternal: true,
    highlight: true
  },
  {
    id: "ann-2",
    title: "Weekly Codeforces & LeetCode Upsolving Group Call",
    category: "Community",
    date: "Oct 29, 2026",
    summary:
      "Every Sunday evening at 8:30 PM, senior mentors walk through problems from the latest Codeforces Div. 2/Div. 3 contests. All members welcome to ask doubts.",
    actionUrl: "#sessions",
    actionText: "View Session Details",
    isExternal: false,
    highlight: false
  }
];
