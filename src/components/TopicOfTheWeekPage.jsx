import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  topicOfTheWeek,
  TOPIC_SECTIONS,
  binarySearchLadder,
  specialProblem
} from "../data/topicOfTheWeek";
import { algorithmicTemplates, templateCategories } from "../data/algorithmicTemplates";

export default function TopicOfTheWeekPage({ onBackToHome }) {
  const [activeSection, setActiveSection] = useState("binary-search");
  const [activeTier, setActiveTier] = useState("all");
  const [activeTemplateCategory, setActiveTemplateCategory] = useState("All");
  const [completedMap, setCompletedMap] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const { user, signInWithGoogle } = useAuth();

  // Load user's problem completion progress from Supabase
  useEffect(() => {
    async function loadProgress() {
      if (!user || !isSupabaseConfigured) {
        setCompletedMap({});
        return;
      }

      try {
        const { data, error } = await supabase
          .from("problem_progress")
          .select("problem_id, is_completed")
          .eq("user_id", user.id);

        if (error) throw error;

        const map = {};
        data?.forEach((row) => {
          if (row.is_completed) {
            map[row.problem_id] = true;
          }
        });
        setCompletedMap(map);
      } catch (err) {
        console.error("Failed to load problem progress:", err.message);
      }
    }

    loadProgress();
  }, [user]);

  // Toggle problem completion status
  const handleToggleCompleted = async (problemId) => {
    if (!user) {
      if (!isSupabaseConfigured) {
        alert(
          "Problem progress tracking is unavailable because local Supabase credentials are not configured.\n\nAll problems can still be viewed and solved in guest mode."
        );
        return;
      }

      const proceed = window.confirm(
        "Sign in with your Google account to track and save your problem completions?"
      );
      if (proceed) {
        signInWithGoogle();
      }
      return;
    }

    const isCurrentlyDone = !!completedMap[problemId];
    const newStatus = !isCurrentlyDone;

    // Optimistic UI update
    setCompletedMap((prev) => {
      const next = { ...prev };
      if (newStatus) {
        next[problemId] = true;
      } else {
        delete next[problemId];
      }
      return next;
    });

    setSavingId(problemId);

    try {
      if (newStatus) {
        const { error } = await supabase.from("problem_progress").upsert({
          user_id: user.id,
          problem_id: problemId,
          is_completed: true,
          updated_at: new Date().toISOString()
        });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("problem_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("problem_id", problemId);
        if (error) throw error;
      }
    } catch (err) {
      console.error("Error saving progress to Supabase:", err.message);
      // Revert optimistic update on failure
      setCompletedMap((prev) => {
        const next = { ...prev };
        if (isCurrentlyDone) {
          next[problemId] = true;
        } else {
          delete next[problemId];
        }
        return next;
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleCopyCode = async (id, codeSnippet) => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy code snippet to clipboard:", err);
    }
  };

  // Section-specific problem list: exactly 20 regular problems
  const isProblemSection = activeSection === "binary-search";
  const currentSectionMeta =
    TOPIC_SECTIONS.find((s) => s.id === activeSection) || TOPIC_SECTIONS[0];

  const sectionProblems = binarySearchLadder;

  const filteredProblems =
    activeTier === "all"
      ? sectionProblems
      : sectionProblems.filter(
          (p) => p.difficultyTier.toLowerCase() === activeTier.toLowerCase()
        );

  const sectionCompletedCount = sectionProblems.filter((p) => !!completedMap[p.id]).length;
  const sectionProgressPercent =
    sectionProblems.length > 0
      ? Math.round((sectionCompletedCount / sectionProblems.length) * 100)
      : 0;

  // Global counts for the Binary Search topic
  const totalBsProblems = sectionProblems.length;
  const totalBsCompleted = sectionCompletedCount;
  const totalBsPercent = sectionProgressPercent;

  // Filter templates for Section 2 (Code Template)
  const filteredTemplates =
    activeTemplateCategory === "All"
      ? algorithmicTemplates
      : algorithmicTemplates.filter((t) => t.category === activeTemplateCategory);

  const scrollToSections = (secId) => {
    if (secId) {
      setActiveSection(secId);
      setActiveTier("all");
    }
    const el = document.getElementById("problem-ladder") || document.getElementById("topic-main-sections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToLadder = () => {
    if (activeSection !== "binary-search") {
      setActiveSection("binary-search");
    }
    setTimeout(() => {
      const el = document.getElementById("problem-ladder") || document.getElementById("topic-main-sections");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 40);
  };

  const scrollToEditorial = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === "DETAILS" && !el.open) {
        el.open = true;
      }
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="topic-page">
      <div className="container">
        {/* Header: Title, Publication Date, Contributors, Navigation Tabs */}
        <header className="topic-page-header">
          <h1 className="topic-page-title">{topicOfTheWeek.title}</h1>

          <div className="topic-meta-published">
            Published Nov 15, 2026
          </div>

          <div className="topic-contributors">
            <span className="contributors-label">Contributors:</span>
            {topicOfTheWeek.contributors || "Jayraj Rathi, Aadarsh Nichit, Siddharth Chiplunkar"}
          </div>

          {/* Section Navigation Tabs & Direct Ladder Jump Button */}
          <div className="totw-nav-row">
            <nav className="totw-section-nav" aria-label="Topic Sections Navigation">
              {TOPIC_SECTIONS.map((sec) => {
                const isSelected = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className={`totw-section-tab ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection(sec.id);
                      setActiveTier("all");
                    }}
                    id={`tab-${sec.id}`}
                  >
                    {sec.title}
                  </button>
                );
              })}
            </nav>

            {activeSection === "binary-search" && (
              <button
                type="button"
                className="btn-jump-ladder"
                onClick={scrollToLadder}
                title="Jump directly to the 20-problem ladder"
                aria-label="Jump directly to Problem Ladder"
              >
                <span className="ladder-jump-icon">⚡</span>
                <span>Jump to Problem Ladder</span>
                <span className="ladder-jump-badge">
                  {sectionCompletedCount}/20 Solved
                </span>
                <span className="ladder-jump-arrow">↓</span>
              </button>
            )}
          </div>

          {/* In-Page Quick Navigation for Binary Search */}
          {activeSection === "binary-search" && (
            <div className="totw-quick-subnav" aria-label="Quick in-page navigation">
              <span className="quick-subnav-label">Jump to:</span>
              <button
                type="button"
                className="quick-subnav-btn quick-subnav-primary"
                onClick={scrollToLadder}
              >
                ⚡ Problem Ladder (20) ↓
              </button>
              <button
                type="button"
                className="quick-subnav-btn"
                onClick={() => scrollToEditorial("editorial-intro")}
              >
                Concepts
              </button>
              <button
                type="button"
                className="quick-subnav-btn"
                onClick={() => scrollToEditorial("editorial-cp")}
              >
                Why Master BS
              </button>
              <button
                type="button"
                className="quick-subnav-btn"
                onClick={() => scrollToEditorial("editorial-prereqs")}
              >
                Prerequisites
              </button>
              <button
                type="button"
                className="quick-subnav-btn"
                onClick={() => scrollToEditorial("editorial-resources")}
              >
                Curated Resources
              </button>
            </div>
          )}
        </header>

        {activeSection === "binary-search" && (
          <>
            {/* 1. Introduction to Binary Search (Collapsible) */}
            <section className="totw-editorial-section" id="editorial-intro">
              <details className="totw-editorial-disclosure">
                <summary className="totw-disclosure-summary">
                  <span className="summary-title">Introduction to Binary Search</span>
                  <span className="summary-icon" aria-hidden="true">▾</span>
                </summary>
                <div className="totw-disclosure-body">
                  <p>
                    Binary Search is a divide-and-conquer strategy that repeatedly halves a search space in <code>O(log N)</code> time. Beyond sorted array lookups, it pinpoints the exact boundary where an arbitrary boolean condition transitions from false to true (monotonic predicate), or searches numerical ranges for optimal values (<em>Binary Search on Answer</em>).
                  </p>

                  <h4 className="body-subheading">Core Foundations &amp; Conceptual Patterns</h4>
                  <ul className="editorial-list">
                    <li>
                      <strong>Sorted Arrays &amp; STL Bounds:</strong> Bisection on indexed memory via <code>std::lower_bound</code> (first element <code>≥ target</code>) and <code>std::upper_bound</code> (first element <code>&gt; target</code>) in <code>O(log N)</code>.
                    </li>
                    <li>
                      <strong>Monotonic Predicates:</strong> Testing a boolean decision function <code>check(x)</code> that changes state at most once across the domain (e.g. <code>false → true</code>).
                    </li>
                    <li>
                      <strong>Binary Search on Answer:</strong> Reformulating minimax optimization objectives (e.g. <em>"minimize the maximum latency"</em>) into decision checks (<em>"is answer X achievable?"</em>).
                    </li>
                    <li>
                      <strong>Predicate Acceleration:</strong> Pairing feasibility checks with prefix sums, two pointers, or greedy scans to keep <code>check(mid)</code> within <code>O(N)</code> or <code>O(1)</code> time.
                    </li>
                  </ul>

                  <h4 className="body-subheading">Quick Example: First Element ≥ 10 in <code>[2, 5, 8, 12, 19, 24]</code></h4>
                  <div className="editorial-example-box">
                    <ul className="editorial-steps-list">
                      <li>
                        <strong>Search Interval:</strong> <code>[low = 0, high = 5]</code>. Safe midpoint: <code>mid = low + (high - low) / 2</code> to prevent 32-bit signed overflow.
                      </li>
                      <li>
                        <strong>Step 1:</strong> <code>mid = 2</code>, <code>A[2] = 8 &lt; 10</code> → discard left half: <code>low = mid + 1 = 3</code>. Interval: <code>[3, 5]</code>.
                      </li>
                      <li>
                        <strong>Step 2:</strong> <code>mid = 4</code>, <code>A[4] = 19 ≥ 10</code> → candidate found (<code>ans = 4</code>), contract right: <code>high = mid - 1 = 3</code>. Interval: <code>[3, 3]</code>.
                      </li>
                      <li>
                        <strong>Step 3:</strong> <code>mid = 3</code>, <code>A[3] = 12 ≥ 10</code> → earlier candidate (<code>ans = 3</code>), set <code>high = 2</code>. Loop terminates (<code>low &gt; high</code>). Final answer: index 3 (value 12) in 3 iterations.
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </section>

            {/* 2. Why Master Binary Search for Competitive Programming? (Collapsible) */}
            <section className="totw-editorial-section" id="editorial-cp">
              <details className="totw-editorial-disclosure">
                <summary className="totw-disclosure-summary">
                  <span className="summary-title">Why Master Binary Search for CP?</span>
                  <span className="summary-icon" aria-hidden="true">▾</span>
                </summary>
                <div className="totw-disclosure-body">
                  <p>
                    In competitive programming (Codeforces, AtCoder, ICPC), Binary Search routinely unlocks 1400–1800+ rated problems by turning complex optimization questions into simple yes/no checks:
                  </p>

                  <ul className="editorial-list">
                    <li>
                      <strong>Massive Domain Reduction:</strong> Search spaces as large as <code>10¹⁸</code> converge in fewer than 60 iterations (<code>log₂(10¹⁸) ≈ 60</code>), resolving in milliseconds.
                    </li>
                    <li>
                      <strong>Monotonicity Recognition:</strong> Contest problems rarely give pre-sorted arrays. The key algorithmic competency is identifying that an answer space has monotonic feasibility: if answer <code>X</code> works, all <code>X' &gt; X</code> also work (or vice versa).
                    </li>
                    <li>
                      <strong>Combinatorial Power:</strong> Combines seamlessly with greedy heuristics, prefix sums, coordinate compression, and dynamic programming (e.g. <code>O(N log N)</code> LIS).
                    </li>
                    <li>
                      <strong>Rigorous Invariants:</strong> Loop invariants like maintaining the answer inside <code>[low, high]</code> and proving strict interval shrinking prevent infinite loops and off-by-one bugs.
                    </li>
                  </ul>

                  <h4 className="body-subheading">Illustration: Feasibility on Answer (CSES Factory Machines)</h4>
                  <div className="editorial-example-box">
                    <p>
                      <em>Task:</em> Find minimum time <code>T</code> for <code>n</code> machines with speeds <code>kᵢ</code> to produce <code>m</code> items.
                    </p>
                    <p>
                      Instead of calculating <code>T</code> directly, test candidate time <code>mid</code>: each machine produces <code>⌊mid / kᵢ⌋</code> items, giving total production <code>∑ ⌊mid / kᵢ⌋</code> in <code>O(n)</code>.
                    </p>
                    <p style={{ margin: "0.4rem 0 0 0" }}>
                      Because production is strictly monotonic with time, binary searching <code>T ∈ [1, 10¹⁸]</code> finds the minimum valid time in <code>~60 × O(n)</code> operations (&lt; 50ms for <code>n = 200,000</code>).
                    </p>
                  </div>
                </div>
              </details>
            </section>

            {/* 3. Prerequisites (Collapsible) */}
            <section className="totw-editorial-section" id="editorial-prereqs">
              <details className="totw-editorial-disclosure">
                <summary className="totw-disclosure-summary">
                  <span className="summary-title">Prerequisites</span>
                  <span className="summary-icon" aria-hidden="true">▾</span>
                </summary>
                <div className="totw-disclosure-body">
                  <p>
                    Before attempting contest-level binary search problems, ensure you are comfortable with these core fundamentals:
                  </p>

                  <ul className="editorial-list">
                    <li>
                      <strong>C++ Basics &amp; Types:</strong> Loops, conditionals, fast I/O, and using <code>long long</code> to avoid 32-bit signed integer overflow in midpoint calculations.
                    </li>
                    <li>
                      <strong>Arrays &amp; Sorting:</strong> Contiguous memory (<code>std::vector</code>), sortedness invariants, and STL iterators (<code>begin()</code>, <code>end()</code>).
                    </li>
                    <li>
                      <strong>Time Complexity:</strong> Grasping logarithmic <code>O(log N)</code> bisection speed vs linear <code>O(N)</code> scans.
                    </li>
                    <li>
                      <strong>Predicate Formulation:</strong> Structuring a standalone boolean helper function <code>bool check(long long mid)</code> for answer-space problems.
                    </li>
                  </ul>
                </div>
              </details>
            </section>

            {/* 4. Curated Learning Resources (Four Collapsible Groups) */}
            <section className="totw-editorial-section" id="editorial-resources">
          <div className="section-title-wrap">
            <h2 className="topic-section-heading">
              <span>Curated Learning Resources</span>
            </h2>
            <p className="topic-section-subheading">
              High-quality conceptual guides, standard library documentation, and interactive practice courses organized by topic area.
            </p>
          </div>

          <div className="totw-resource-accordion">
            {topicOfTheWeek.learningResources.map((group, idx) => (
              <details
                key={idx}
                className="totw-resource-disclosure"
                defaultOpen={idx === 0}
              >
                <summary className="totw-resource-summary">
                  <span className="res-group-title">{group.category}</span>
                  <span className="res-chevron" aria-hidden="true">▾</span>
                </summary>
                <div className="totw-resource-body">
                  {group.intro && <p className="res-group-intro">{group.intro}</p>}
                  <ul className="editorial-resource-list">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <div className="res-link-line">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link"
                          >
                            {item.title} ↗
                          </a>
                          <span className="res-source-tag">{item.platform}</span>
                        </div>
                        <p className="res-desc">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* =================================================================
            Binary Search Curated Problem Ladder (20 Regular + 1 Special)
            ================================================================= */}
        <section className="topic-page-section" id="problem-ladder">
          <div className="problem-section-content">
            {/* Progress Summary Card for Binary Search */}
            <div className="totw-progress-card">
              <div className="totw-progress-header">
                <div className="totw-progress-title-wrap">
                  <span className="totw-progress-badge">Binary Search Progress</span>
                  <h3>
                    {user ? (
                      <>
                        Completed: <span className="highlight-green">{sectionCompletedCount}</span> / 20 regular problems
                        {completedMap[specialProblem.id] && (
                          <span style={{ color: "var(--accent-primary)", marginLeft: "0.5rem" }}>
                            (+ 1 special solved!)
                          </span>
                        )}
                      </>
                    ) : (
                      "Track Binary Search Problem Solving"
                    )}
                  </h3>
                </div>
                <div className="totw-progress-stat">
                  <span className="progress-percent-number">{sectionProgressPercent}%</span>
                  <span className="progress-percent-label">Completed</span>
                </div>
              </div>

              {/* Visual Bar */}
              <div
                className="totw-progress-bar-bg"
                role="progressbar"
                aria-valuenow={sectionProgressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="totw-progress-bar-fill" style={{ width: `${sectionProgressPercent}%` }}></div>
              </div>

              <div className="totw-progress-footer">
                {user ? (
                  <span className="totw-user-status">
                    ✓ Signed in as <strong>{user.email}</strong> • Syncing with Supabase
                  </span>
                ) : (
                  <div className="totw-guest-prompt">
                    <span>Sign in with Google to check off problems and track your progress across devices:</span>
                    <button
                      type="button"
                      className="btn btn-secondary nav-google-btn"
                      onClick={signInWithGoogle}
                      style={{ padding: "0.25rem 0.65rem", fontSize: "0.75rem" }}
                    >
                      Sign in with Google
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Ladder Controls */}
            <div className="problem-set-controls">
              <div>
                <h2 className="topic-section-heading" style={{ marginBottom: "0.25rem" }}>
                  <span>
                    {activeTier === "all"
                      ? "Binary Search Problem Ladder (20 regular problems + 1 special problem)"
                      : `Binary Search Problem Ladder (${filteredProblems.length})`}
                  </span>
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  Arranged by difficulty ladder. Solve sequentially and mark problems as completed.
                </p>
              </div>

              <div className="problem-tier-tabs" role="tablist">
                <button
                  type="button"
                  className={`tier-tab-btn ${activeTier === "all" ? "active" : ""}`}
                  onClick={() => setActiveTier("all")}
                >
                  All ({sectionProblems.length})
                </button>
                <button
                  type="button"
                  className={`tier-tab-btn ${activeTier === "easy" ? "active" : ""}`}
                  onClick={() => setActiveTier("easy")}
                >
                  Easy ({sectionProblems.filter((p) => p.difficultyTier === "Easy").length})
                </button>
                <button
                  type="button"
                  className={`tier-tab-btn ${activeTier === "medium" ? "active" : ""}`}
                  onClick={() => setActiveTier("medium")}
                >
                  Medium ({sectionProblems.filter((p) => p.difficultyTier === "Medium").length})
                </button>
                <button
                  type="button"
                  className={`tier-tab-btn ${activeTier === "hard" ? "active" : ""}`}
                  onClick={() => setActiveTier("hard")}
                >
                  Hard ({sectionProblems.filter((p) => p.difficultyTier === "Hard").length})
                </button>
              </div>
            </div>

              {/* Problem Items List */}
              <div className="problem-ladder-list">
                {filteredProblems.map((prob) => {
                  const diffClass =
                    prob.difficultyTier === "Easy"
                      ? "diff-easy"
                      : prob.difficultyTier === "Medium"
                      ? "diff-medium"
                      : "diff-hard";

                  const isDone = !!completedMap[prob.id];
                  const isSaving = savingId === prob.id;

                  return (
                    <div
                      key={prob.id}
                      className={`problem-row-card ${isDone ? "problem-card-completed" : ""}`}
                    >
                      <div className="problem-main-row">
                        {/* 1. Checkbox Column */}
                        <button
                          type="button"
                          className={`problem-check-btn ${isDone ? "checked" : ""}`}
                          onClick={() => handleToggleCompleted(prob.id)}
                          disabled={isSaving}
                          title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                          aria-label={`Mark ${prob.name} as ${isDone ? "incomplete" : "completed"}`}
                        >
                          {isDone ? "✓" : ""}
                        </button>

                        {/* 2. Platform Column */}
                        <div className="problem-col-platform">
                          <span className="problem-platform-tag">{prob.platform}</span>
                        </div>

                        {/* 3. Problem Title Column */}
                        <div className="problem-col-title">
                          <span className={`problem-title ${isDone ? "problem-title-done" : ""}`}>
                            {prob.name}
                          </span>
                          {isDone && <span className="problem-done-tag">Solved ✓</span>}
                        </div>

                        {/* 4. Technique / Tag Column */}
                        <div className="problem-col-tags">
                          {prob.tags && prob.tags.length > 0 ? (
                            prob.tags.map((t, idx) => (
                              <span key={idx} className="problem-tag-pill" title={t}>
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="problem-tag-empty">—</span>
                          )}
                        </div>

                        {/* 5. Difficulty Column */}
                        <div className="problem-col-difficulty">
                          <span className={`diff-badge ${diffClass}`}>{prob.difficulty}</span>
                        </div>

                        {/* 6. Solve Button Column */}
                        <div className="problem-col-actions">
                          <a
                            href={prob.problemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary problem-solve-btn"
                            style={{ padding: "0.35rem 0.85rem", fontSize: "0.75rem" }}
                          >
                            Solve ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Special Problem (CodeChef IC26TM) - Visual Separation after Problem #20 */}
                {activeTier === "all" && specialProblem && (
                  <div className="special-problem-container">
                    <div className="special-problem-header">
                      <div className="special-problem-header-left">
                        <span className="special-badge-pill">SPECIAL</span>
                        <span className="special-problem-section-title">
                          Contest Challenge: ICPC Online 2026 Postseason
                        </span>
                      </div>
                      <span className="special-problem-meta-note">
                        Problem G • Team Formation Tactics
                      </span>
                    </div>

                    <div
                      key={specialProblem.id}
                      className={`problem-row-card special-problem-card ${
                        completedMap[specialProblem.id] ? "problem-card-completed" : ""
                      }`}
                    >
                      <div className="problem-main-row">
                        {/* 1. Checkbox Column */}
                        <button
                          type="button"
                          className={`problem-check-btn ${
                            completedMap[specialProblem.id] ? "checked" : ""
                          }`}
                          onClick={() => handleToggleCompleted(specialProblem.id)}
                          disabled={savingId === specialProblem.id}
                          title={
                            completedMap[specialProblem.id]
                              ? "Mark as Incomplete"
                              : "Mark as Completed"
                          }
                          aria-label={`Mark ${specialProblem.name} as ${
                            completedMap[specialProblem.id] ? "incomplete" : "completed"
                          }`}
                        >
                          {completedMap[specialProblem.id] ? "✓" : ""}
                        </button>

                        {/* 2. Platform Column */}
                        <div className="problem-col-platform">
                          <span className="problem-platform-tag">{specialProblem.platform}</span>
                        </div>

                        {/* 3. Problem Title Column */}
                        <div className="problem-col-title">
                          <span
                            className={`problem-title ${
                              completedMap[specialProblem.id] ? "problem-title-done" : ""
                            }`}
                          >
                            {specialProblem.name}
                          </span>
                          {completedMap[specialProblem.id] && (
                            <span className="problem-done-tag">Solved ✓</span>
                          )}
                        </div>

                        {/* 4. Technique / Tag Column */}
                        <div className="problem-col-tags">
                          {specialProblem.tags && specialProblem.tags.length > 0 ? (
                            specialProblem.tags.map((t, idx) => (
                              <span key={idx} className="problem-tag-pill" title={t}>
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="problem-tag-pill">ICPC Online 2026</span>
                          )}
                        </div>

                        {/* 5. Difficulty Column */}
                        <div className="problem-col-difficulty">
                          <span className="diff-badge diff-special">SPECIAL</span>
                        </div>

                        {/* 6. Solve Button Column */}
                        <div className="problem-col-actions">
                          <a
                            href={specialProblem.problemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary problem-solve-btn"
                            style={{ padding: "0.35rem 0.85rem", fontSize: "0.75rem" }}
                          >
                            Solve ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </section>

        {/* =================================================================
            Section 5: Additional Practice & Next Steps (Editorial Flow)
            ================================================================= */}
        <section className="totw-editorial-section">
          <div className="section-title-wrap">
            <h2 className="topic-section-heading">
              <span>Additional Practice &amp; Next Steps</span>
            </h2>
            <p className="topic-section-subheading">
              A structured contest preparation roadmap: transition from conceptual mastery to contest agility through progressive problem ladders and disciplined upsolving.
            </p>
          </div>

          <div className="editorial-practice-flow">
            <ul className="editorial-practice-list">
              <li>
                <div className="practice-item-header">
                  <a
                    href="https://cses.fi/problemset/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    CSES Problem Set — Sorting and Searching ↗
                  </a>
                  <span className="res-source-tag">cses.fi</span>
                </div>
                <p className="practice-item-desc">
                  Navigate to the <em>Sorting and Searching</em> section. While not every problem requires binary search, foundational tasks such as{" "}
                  <a
                    href="https://cses.fi/problemset/task/1620"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-doc-link"
                  >
                    Factory Machines (Task 1620)
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://cses.fi/problemset/task/1085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-doc-link"
                  >
                    Array Division (Task 1085)
                  </a>{" "}
                  provide essential practice formulating monotonic predicate checks. Attempt these independently before consulting editorials or viewing hints.
                </p>
              </li>

              <li>
                <div className="practice-item-header">
                  <a
                    href="https://codeforces.com/problemset?tags=binary+search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    Codeforces Problemset — Binary Search Tag ↗
                  </a>
                  <span className="res-source-tag">codeforces.com</span>
                </div>
                <p className="practice-item-desc">
                  Filter Codeforces tasks by the <code>binary search</code> tag and progress systematically through difficulty rating bands:
                </p>
                <ul className="editorial-rating-ladder">
                  <li>
                    <code>800–1000</code>: Direct array lookups, sorted bounds, and simple boundary detection.
                  </li>
                  <li>
                    <code>1100–1300</code>: Invariant maintenance, lower/upper bound frequency calculations, and straightforward answer-space checks.
                  </li>
                  <li>
                    <code>1400–1600</code>: Non-trivial feasibility predicates, greedy combinations, and binary search on answer ranges.
                  </li>
                  <li>
                    <code>1700+</code>: Advanced continuous variables, multi-dimensional search spaces, and subtle hidden monotonicity.
                  </li>
                </ul>
                <p className="editorial-note">
                  <em>Note:</em> Codeforces URLs do not filter by rating via query parameters. Click the tag link, enter your minimum and maximum rating in the right-hand sidebar filter, and click Apply.
                </p>
              </li>

              <li>
                <div className="practice-item-header">
                  <a
                    href="https://usaco.guide/silver/binary-search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    USACO Guide — Binary Search (Silver) ↗
                  </a>
                  <span className="res-source-tag">usaco.guide</span>
                </div>
                <p className="practice-item-desc">
                  Work through the structured competitive programming module for rigorous invariant proofs, implementation templates, interactive practice problems, and complete editorial walkthroughs.
                </p>
              </li>

              <li>
                <div className="practice-item-header">
                  <span className="practice-item-title">Participate in CPS WA Discussions</span>
                  <span className="res-source-tag">CPS Community</span>
                </div>
                <p className="practice-item-desc">
                  Active discussion accelerates problem-solving intuition. Engage with fellow CPS members on our community channel:
                </p>
                <ul className="editorial-sublist">
                  <li>Share failed attempts and explain why they fail—diagnosing why an invariant failed reveals boundary misconceptions.</li>
                  <li>Discuss edge cases, off-by-one intervals, and mathematical proofs of monotonicity.</li>
                  <li>Ask for incremental hints before requesting full solutions to preserve the learning struggle.</li>
                  <li>Explain your accepted approaches to peers to test and solidify your mastery.</li>
                </ul>
                <p className="editorial-note">
                  <em>Note:</em> Reach out to the CPS campus leads or check the club onboarding announcements for discussion access.
                </p>
              </li>
            </ul>

            {/* Upsolving Contest Discipline — Restrained Editorial Callout */}
            <div className="totw-editorial-upsolve-callout">
              <div className="upsolve-callout-header">
                <span className="upsolve-label">Contest Discipline</span>
                <h3 className="upsolve-heading">Upsolve every contest you participate in</h3>
              </div>
              <p className="upsolve-tagline">
                Contest rating improves during the upsolving phase, not during the live contest.
              </p>
              <ol className="editorial-workflow-steps">
                <li>
                  <strong>Revisit within 24–48 hours:</strong> Re-read every problem you could not solve or had wrong submissions on during the contest while the context is fresh.
                </li>
                <li>
                  <strong>Independent Attempt:</strong> Spend 30–45 minutes trying to solve it independently without immediately opening the editorial.
                </li>
                <li>
                  <strong>Pinpoint the Missing Observation:</strong> Identify the exact missing observation, invariant, or technique that blocked you during the contest.
                </li>
                <li>
                  <strong>Incremental Hints:</strong> Read hints or the editorial incrementally only after making an earnest attempt.
                </li>
                <li>
                  <strong>Clean Implementation:</strong> Implement and submit an Accepted solution cleanly from scratch—never copy-paste editorial code.
                </li>
                <li>
                  <strong>Log Key Ideas:</strong> Record the recurring algorithmic pattern in your personal notes and revisit similar problems later.
                </li>
              </ol>
              <div className="upsolve-footer-text">
                Discuss your upsolving attempts, alternate solutions, and doubts in the CPS WA Discussions.
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {/* =================================================================
          Section 2: Code Template (C++ Binary Search Implementations Only)
          ================================================================= */}
      {activeSection === "code-templates" && (
        <section className="topic-page-section" id="topic-main-sections">
          <div className="section-intro-banner">
            <h3>{currentSectionMeta.title}</h3>
            <p>{currentSectionMeta.description}</p>
          </div>

          <div className="core-templates-section">
            {/* Category Filter Pills */}
            <div className="template-category-filter" role="tablist" aria-label="Template Categories">
              {templateCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`template-category-btn ${activeTemplateCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveTemplateCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Templates List */}
            <div className="templates-grid">
              {filteredTemplates.map((tpl) => {
                const isCopied = copiedId === tpl.id;

                return (
                  <article key={tpl.id} className="template-card">
                    <div className="template-card-header">
                      <div className="template-title-wrap">
                        <span className="template-cat-pill">{tpl.category}</span>
                        <h4>{tpl.title}</h4>
                      </div>
                      <div className="template-complexity-badges">
                        <span className="complexity-pill" title="Time Complexity">
                          ⏱ {tpl.timeComplexity}
                        </span>
                        <span className="complexity-pill" title="Space Complexity">
                          💾 {tpl.spaceComplexity}
                        </span>
                      </div>
                    </div>

                    <p className="template-summary">{tpl.summary}</p>

                    <div className="template-when-box">
                      <strong>When to use:</strong> {tpl.whenToUse}
                    </div>

                    <div className="template-code-container">
                      <button
                        type="button"
                        className={`template-copy-btn ${isCopied ? "copied" : ""}`}
                        onClick={() => handleCopyCode(tpl.id, tpl.codeSnippet)}
                        aria-label={`Copy ${tpl.title} C++ code snippet`}
                      >
                        {isCopied ? "Copied! ✓" : "📋 Copy Code"}
                      </button>
                      <pre className="concept-code-box">
                        <code>{tpl.codeSnippet}</code>
                      </pre>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
      </div>

      {/* Floating Quick Jump Button */}
      {isProblemSection && (
        <button
          type="button"
          className="floating-jump-btn"
          onClick={scrollToLadder}
          title="Jump down to Problem Ladder"
          aria-label="Jump down to Problem Ladder"
        >
          <span>Problem Ladder</span>
          <span className="floating-jump-badge">
            {sectionCompletedCount}/20
          </span>
          <span className="floating-jump-arrow">↓</span>
        </button>
      )}
    </div>
  );
}
