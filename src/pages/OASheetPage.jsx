import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../context/useAuth";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { oaProblems, oaCompanies, oaTopics } from "../data/oaSheet";

const STORAGE_KEY = "cps:oa-sheet:completed:v1";
const requestedCompanies = ["Google", "Microsoft", "Amazon", "PhonePe", "Goldman Sachs", "Uber", "DE Shaw", "Adobe", "Atlassian", "Flipkart", "Walmart", "Oracle", "Salesforce", "Paytm", "JPMorgan"];
const availableCompanies = [...new Set([...requestedCompanies, ...oaCompanies])].sort();
const readGuestProgress = () => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
};

export default function OASheetPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [completed, setCompleted] = useState(() => new Set(readGuestProgress()));
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [seasonMode, setSeasonMode] = useState("general");
  const [difficulty, setDifficulty] = useState("All");
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [syncError, setSyncError] = useState("");
  const [signInPrompt, setSignInPrompt] = useState(false);
  const [saving, setSaving] = useState(new Set());
  const requestVersions = useRef(new Map());
  const listingRef = useRef(null);

  const announce = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }, []);

  useEffect(() => {
    if (!user || authLoading || !isSupabaseConfigured) return undefined;
    let cancelled = false;
    const loadAndMerge = async () => {
      try {
        const { data, error } = await supabase.from("problem_progress").select("problem_id, is_completed").eq("user_id", user.id);
        if (error) throw error;
        const merged = new Set((data || []).filter((row) => row.is_completed).map((row) => row.problem_id));
        const guestIds = readGuestProgress();
        guestIds.forEach((id) => merged.add(id));
        if (guestIds.length) {
          const { error: upsertError } = await supabase.from("problem_progress").upsert(
            guestIds.map((problem_id) => ({ user_id: user.id, problem_id, is_completed: true, updated_at: new Date().toISOString() })),
            { onConflict: "user_id,problem_id" }
          );
          if (upsertError) throw upsertError;
          window.localStorage.removeItem(STORAGE_KEY);
        }
        if (!cancelled) {
          setCompleted(merged);
          setLoadedUserId(user.id);
          setSyncError("");
        }
      } catch (error) {
        if (!cancelled) {
          setSyncError("Could not sync saved progress. Your guest progress remains on this device; retry by refreshing.");
          setCompleted(new Set([...readGuestProgress()]));
          setLoadedUserId(user.id);
          console.error("Failed to load OA sheet progress:", error.message);
        }
      }
    };
    loadAndMerge();
    return () => { cancelled = true; };
  }, [user, authLoading]);

  useEffect(() => {
    if (!user && !authLoading) {
      const timer = window.setTimeout(() => {
        setCompleted(new Set(readGuestProgress()));
        setLoadedUserId(null);
      }, 0);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [user, authLoading]);

  const filteredProblems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return oaProblems.filter((problem) => {
      if (seasonMode === "recent" && !problem.season.some((tag) => ["2026-season", "placement-2025", "internship-2026", "internship-2025"].includes(tag))) return false;
      if (seasonMode === "general" && !problem.season.includes("general")) return false;
      if (difficulty !== "All" && problem.difficulty !== difficulty) return false;
      if (topics.length && !topics.some((topic) => problem.topic === topic)) return false;
      if (companies.length && !companies.some((company) => problem.companies.includes(company))) return false;
      if (normalized && ![problem.name, problem.platform, problem.topic, problem.hint, problem.frequency, ...problem.companies].some((value) => value.toLowerCase().includes(normalized))) return false;
      return true;
    });
  }, [seasonMode, difficulty, topics, companies, query]);

  const resetFilters = () => {
    setSeasonMode("general"); setDifficulty("All"); setTopics([]); setCompanies([]); setQuery("");
  };
  const toggle = (value, selected, setter) => setter(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  const jumpToProblems = () => listingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggleComplete = async (problemId) => {
    if (!user && !signInPrompt) { setSignInPrompt(true); return; }
    const wasComplete = completed.has(problemId);
    const nextComplete = !wasComplete;
    const version = (requestVersions.current.get(problemId) || 0) + 1;
    requestVersions.current.set(problemId, version);
    const optimistic = new Set(completed);
    nextComplete ? optimistic.add(problemId) : optimistic.delete(problemId);
    if (!user) {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...optimistic])); }
      catch { setSyncError("Browser storage is unavailable; guest progress may not persist after closing this page."); }
    }
    setCompleted((previous) => {
      const next = new Set(previous);
      nextComplete ? next.add(problemId) : next.delete(problemId);
      return next;
    });
    if (!user) return;
    if (!isSupabaseConfigured) { announce("Sign in persistence is unavailable; progress is saved as guest on this device."); return; }
    setSaving((previous) => new Set(previous).add(problemId));
    try {
      const result = nextComplete
        ? await supabase.from("problem_progress").upsert({ user_id: user.id, problem_id: problemId, is_completed: true, updated_at: new Date().toISOString() }, { onConflict: "user_id,problem_id" })
        : await supabase.from("problem_progress").delete().eq("user_id", user.id).eq("problem_id", problemId);
      if (result.error) throw result.error;
    } catch (error) {
      if (requestVersions.current.get(problemId) === version) {
        setCompleted((previous) => { const next = new Set(previous); wasComplete ? next.add(problemId) : next.delete(problemId); return next; });
      }
      announce("Could not save progress. Please try again.");
      console.error("Failed to save OA sheet progress:", error.message);
    } finally {
      if (requestVersions.current.get(problemId) === version) setSaving((previous) => { const next = new Set(previous); next.delete(problemId); return next; });
    }
  };

  const total = oaProblems.length;
  const completedCount = oaProblems.filter(({ id }) => completed.has(id)).length;
  const percentage = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="sheet-page section-padding">
      <div className="container">
        <header className="sheet-header">
          <span className="week-badge">Placement &amp; OA Prep</span>
          <h1 className="topic-page-title">Must-Try Problems</h1>
          <p className="topic-page-desc">A practical LeetCode sheet for placement and internship OAs, plus core problems for general coding interviews.</p>
          <p className="sheet-data-note">Company tags are practice recommendations drawn from common public preparation lists; they do not claim verified company-specific interview frequency.</p>
          <div className="sheet-season-toggle" role="group" aria-label="Problem season">
            <button type="button" className={seasonMode === "recent" ? "active" : ""} aria-pressed={seasonMode === "recent"} onClick={() => setSeasonMode("recent")}>Recent placement drives (2025–2026)</button>
            <button type="button" className={seasonMode === "general" ? "active" : ""} aria-pressed={seasonMode === "general"} onClick={() => setSeasonMode("general")}>General coding interview sheet</button>
          </div>
        </header>

        <section className="sheet-progress-card" aria-label="Overall sheet progress">
          <div className="sheet-progress-copy"><span className="sheet-progress-kicker">Your progress · all problems</span><strong>{completedCount} <span>/ {total} completed</span></strong><span>{percentage}% complete</span></div>
          <div className="sheet-progress-track" role="progressbar" aria-label="Problems completed" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${percentage}%` }} /></div>
          <button type="button" className="btn btn-primary" onClick={jumpToProblems}>Jump to Problems ↓</button>
          {!user && <span className="sheet-guest-note">Guest progress saves in this browser</span>}
        </section>

        {(syncError || (user && loadedUserId !== user.id)) && <p className="sheet-notice" role="status">{syncError || "Loading and syncing your saved progress…"}</p>}
        {signInPrompt && !user && <div className="sheet-signin-prompt" role="dialog" aria-label="Choose progress mode"><div><strong>Save your progress</strong><p>Sign in with Google to sync across devices, or continue as a guest on this browser.</p></div><button className="btn btn-primary" type="button" onClick={signInWithGoogle}>Sign in with Google</button><button className="btn btn-secondary" type="button" onClick={() => setSignInPrompt(false)}>Continue in guest mode</button></div>}

        <section className="sheet-controls-section" aria-label="Problem filters">
          <label className="sheet-search-wrap"><span className="sr-only">Search problems</span><span className="sheet-search-icon" aria-hidden="true">⌕</span><input className="sheet-search-input" type="search" placeholder="Search problems, platform, company, topic or idea…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <div className="sheet-filter-group"><span className="sheet-filter-label">Difficulty</span><div className="tier-tabs" role="group" aria-label="Filter by difficulty">{["All", "Easy", "Medium", "Hard"].map((level) => <button key={level} type="button" className={`tier-tab ${difficulty === level ? "active" : ""}`} aria-pressed={difficulty === level} onClick={() => setDifficulty(level)}>{level}</button>)}</div></div>
          <details className="sheet-filter-disclosure"><summary>Topics <span>{topics.length ? `${topics.length} selected` : "All topics"}</span></summary><div className="sheet-chips-wrap">{oaTopics.map((topic) => <button key={topic} type="button" className={`sheet-chip ${topics.includes(topic) ? "active" : ""}`} aria-pressed={topics.includes(topic)} onClick={() => toggle(topic, topics, setTopics)}>{topic}</button>)}</div></details>
          <details className="sheet-filter-disclosure"><summary>Companies <span>{companies.length ? `${companies.length} selected` : "All companies"}</span></summary><div className="sheet-chips-wrap">{availableCompanies.map((company) => <button key={company} type="button" className={`sheet-chip ${companies.includes(company) ? "active" : ""}`} aria-pressed={companies.includes(company)} onClick={() => toggle(company, companies, setCompanies)}>{company}</button>)}</div></details>
          <div className="sheet-active-filters"><span>{filteredProblems.length} matching {filteredProblems.length === 1 ? "problem" : "problems"}</span><button type="button" className="sheet-reset-btn" onClick={resetFilters}>Reset filters</button></div>
        </section>

        <section className="sheet-problems-section" id="sheet-problems" ref={listingRef} aria-label="Problems">
          {filteredProblems.length === 0 ? <div className="events-empty-state"><h3>No problems match these filters</h3><p>Try another search, company, topic, season or difficulty.</p><button type="button" className="btn btn-secondary" onClick={resetFilters}>Reset filters</button></div> : <div className="sheet-problem-list">{filteredProblems.map((problem) => <article className="sheet-problem-card" key={problem.id}>
            <div className="sheet-problem-top"><label className="sheet-completion"><input type="checkbox" checked={completed.has(problem.id)} disabled={saving.has(problem.id) || (user && loadedUserId !== user.id)} onChange={() => toggleComplete(problem.id)} aria-label={`Mark ${problem.name} complete`} /><span className="sr-only">Completed</span></label><div className="sheet-problem-main"><div className="sheet-problem-title-line"><a href={problem.problemUrl} target="_blank" rel="noopener noreferrer" className="problem-name-link">{problem.name} ↗</a><span className={`difficulty-pill difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></div><div className="sheet-problem-meta"><span className="problem-platform-tag">{problem.platform}</span><span className="problem-topic-text">{problem.topic}</span><span className="problem-must-tag">{problem.frequency}</span><span className="sheet-round-tag">{problem.round}</span></div></div></div>
            <div className="company-tags-list">{problem.companies.map((company) => <span key={company} className="company-tag-pill">{company}</span>)}</div>
            <details className="sheet-hint-disclosure"><summary>Show key intuition <span className="sheet-chevron" aria-hidden="true">⌄</span></summary><p>{problem.hint}</p></details>
            <div className="problem-action-links"><a href={problem.problemUrl} target="_blank" rel="noopener noreferrer" className="problem-action-btn">Solve ↗</a><a href={problem.editorialUrl} target="_blank" rel="noopener noreferrer" className="problem-editorial-btn">Editorial ↗</a></div>
          </article>)}</div>}
        </section>
        {toast && <div className="sheet-toast" role="status">{toast}</div>}
      </div>
    </div>
  );
}
