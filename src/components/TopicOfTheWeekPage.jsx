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
    const el = document.getElementById("topic-main-sections");
    if (el) {
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

          {/* Section Navigation Tabs: Exactly 2 Tabs (No emojis, matching section typography) */}
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
        </header>

        {activeSection === "binary-search" && (
          <>
            {/* 1. Introduction to Binary Search (Collapsible) */}
            <section className="totw-editorial-section">
          <details className="totw-editorial-disclosure" defaultOpen>
            <summary className="totw-disclosure-summary">
              <span className="summary-title">Introduction to Binary Search</span>
              <span className="summary-icon" aria-hidden="true">▾</span>
            </summary>
            <div className="totw-disclosure-body">
              <p>
                Binary Search is fundamentally not just a method for locating an item in a sorted list—it is a general search technique that repeatedly reduces a candidate search space by exploiting structural properties of that space. In its most familiar form, it determines whether a value exists in a sorted array of size <code>N</code> in <code>O(log N)</code> time by comparing the target with the midpoint and discarding half the elements on each step. More broadly, Binary Search can locate the exact boundary where an arbitrary condition transitions from false to true, or find an optimal numerical answer whenever problem feasibility is monotonic.
              </p>

              <h4 className="body-subheading">Core Foundations &amp; Conceptual Patterns</h4>
              <ul className="editorial-list">
                <li>
                  <strong>Searching in Sorted Arrays:</strong> Direct interval bisection on contiguous, indexed memory to find target elements or confirm their absence in logarithmic time.
                </li>
                <li>
                  <strong>Boundary &amp; Range Detection:</strong> Locating the first or last position satisfying a condition (analogous to <code>lower_bound</code> and <code>upper_bound</code>), which allows occurrence counting and range queries in <code>O(log N)</code>.
                </li>
                <li>
                  <strong>Searching Over a Monotonic Predicate:</strong> Evaluating an abstract boolean decision function <code>check(x)</code> that changes state at most once across the domain (e.g. <code>false, false, ..., true, true</code>).
                </li>
                <li>
                  <strong>Binary Search on the Answer:</strong> Reformulating an optimization objective (e.g. <em>"minimize the maximum latency"</em> or <em>"maximize minimum separation"</em>) into a decision check (<em>"is answer X achievable?"</em>).
                </li>
                <li>
                  <strong>Predicate Acceleration:</strong> Pairing the search with efficient supporting checks—such as prefix sums, greedy scans, or two pointers—so each feasibility test executes in <code>O(N)</code> or <code>O(1)</code> time.
                </li>
              </ul>

              <h4 className="body-subheading">Intuition by Example: First Element Greater Than or Equal to Target</h4>
              <p>
                Suppose we are given a sorted array <code>A = [2, 5, 8, 12, 19, 24]</code> and wish to find the first index <code>i</code> such that <code>A[i] ≥ 10</code>:
              </p>
              <div className="editorial-example-box">
                <ol className="editorial-steps-list">
                  <li>
                    <strong>Initial Search Interval:</strong> We define the inclusive boundary <code>[low = 0, high = 5]</code>.
                  </li>
                  <li>
                    <strong>Iteration 1:</strong> We evaluate midpoint <code>mid = 0 + (5 - 0) / 2 = 2</code>, where <code>A[2] = 8</code>. Since <code>8 &lt; 10</code>, no element at or before index 2 can satisfy the condition. We safely discard the entire left half by setting <code>low = mid + 1 = 3</code>. The new interval is <code>[3, 5]</code>.
                  </li>
                  <li>
                    <strong>Iteration 2:</strong> Next midpoint is <code>mid = 3 + (5 - 3) / 2 = 4</code>, where <code>A[4] = 19</code>. Because <code>19 ≥ 10</code>, index 4 is a valid candidate. An even earlier valid element might exist to the left, but we can safely discard everything to the right of index 4. We record candidate <code>ans = 4</code> and contract the right boundary: <code>high = mid - 1 = 3</code>. The new interval is <code>[3, 3]</code>.
                  </li>
                  <li>
                    <strong>Iteration 3:</strong> Final midpoint is <code>mid = 3</code>, where <code>A[3] = 12</code>. Because <code>12 ≥ 10</code>, index 3 is also valid and is earlier than 4. We update <code>ans = 3</code> and set <code>high = mid - 1 = 2</code>.
                  </li>
                  <li>
                    <strong>Termination:</strong> Because <code>low (3) &gt; high (2)</code>, the loop terminates. The algorithm has narrowed the candidate space from 6 elements to the exact optimal answer (index 3, value 12) in just 3 comparisons.
                  </li>
                </ol>
              </div>
              <p style={{ marginTop: "0.75rem", fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                Every correct Binary Search implementation relies on this structural guarantee: choosing interval boundaries carefully, computing <code>mid = low + (high - low) / 2</code> to prevent 32-bit signed integer overflow, and proving mathematically that the interval strictly shrinks on every step.
              </p>
            </div>
          </details>
        </section>

        {/* 2. Why Master Binary Search for Competitive Programming? (Collapsible) */}
        <section className="totw-editorial-section">
          <details className="totw-editorial-disclosure">
            <summary className="totw-disclosure-summary">
              <span className="summary-title">Why Master Binary Search for CP?</span>
              <span className="summary-icon" aria-hidden="true">▾</span>
            </summary>
            <div className="totw-disclosure-body">
              <p>
                In competitive programming contests on Codeforces, AtCoder, and ICPC, Binary Search is not merely an occasional utility—it is a core algorithmic paradigm. Understanding why it matters separates competitors who struggle with brute force from those who routinely solve 1400–1800+ rated problems:
              </p>

              <ul className="editorial-list">
                <li>
                  <strong>Logarithmic Search Over Massive Domains:</strong> While linear algorithms scale as <code>O(N)</code>, Binary Search scales as <code>O(log N)</code>. For search domains as large as <code>10¹⁸</code> (common when optimizing coordinates, capacities, or times), <code>log₂(10¹⁸) ≈ 59.8</code>. The algorithm needs fewer than 60 evaluations to pinpoint an exact 64-bit integer answer, turning an impossible computation into a solution running in a few milliseconds.
                </li>
                <li>
                  <strong>Ubiquity Across Contest Architectures:</strong> Binary search appears everywhere: searching sorted vectors, discrete geometric coordinate lookups, capacity and scheduling problems, network flow bottlenecks, and accelerating dynamic programming transitions (such as Longest Increasing Subsequence in <code>O(N log N)</code>).
                </li>
                <li>
                  <strong>Monotonicity Recognition is the Real Skill:</strong> In contest problems, arrays are rarely given already sorted. The true test of competitive programming skill is recognizing that an abstract problem space has an underlying monotonicity—that is, if answer <code>X</code> is achievable, then all answers <code>X' &gt; X</code> are either also achievable or impossible. Once monotonicity is proven, finding the optimal answer reduces to designing an efficient decision check.
                </li>
                <li>
                  <strong>Combinatorial Power with Other Paradigms:</strong> Binary Search reaches peak effectiveness when combined with other techniques: sorting as a preprocessing step, prefix sums for <code>O(1)</code> range checks, greedy choices inside <code>check(mid)</code>, and coordinate compression.
                </li>
                <li>
                  <strong>Rigorous Invariants &amp; Correctness Proofs:</strong> Competitive programming demands bug-free implementation under contest time pressure. Mastering loop invariants (e.g. maintaining that the answer always lies within <code>[low, high]</code>), establishing unambiguous inclusive vs. exclusive boundary rules, avoiding infinite loops, and eliminating off-by-one errors build contest discipline that transfers to all data structures and graph algorithms.
                </li>
              </ul>

              <h4 className="body-subheading">Practical Illustration: Binary Search on the Answer (CSES Factory Machines)</h4>
              <p>
                Consider a classic problem: A factory has <code>n</code> machines, where machine <code>i</code> requires <code>kᵢ</code> seconds to produce one product. All machines can operate simultaneously and independently. What is the minimum total time <code>T</code> needed to produce at least <code>m</code> products?
              </p>
              <div className="editorial-example-box">
                <p>
                  Calculating the optimal time <code>T</code> directly with a formula is complicated because machines have different speeds. However, the reverse question is straightforward:
                </p>
                <blockquote className="editorial-quote">
                  <em>"Given a fixed candidate time <code>T</code>, can the machines collectively produce at least <code>m</code> products?"</em>
                </blockquote>
                <p>
                  In <code>T</code> seconds, machine <code>i</code> produces exactly <code>⌊T / kᵢ⌋</code> products. The total products produced across all <code>n</code> machines in time <code>T</code> is simply:
                </p>
                <pre className="editorial-formula-box">
                  <code>Total Products(T) = ∑ (T / kᵢ) for i = 1 to n</code>
                </pre>
                <p>
                  Now observe the decisive property—<strong>monotonicity</strong>:
                </p>
                <ul className="editorial-list" style={{ marginTop: "0.5rem" }}>
                  <li>If in time <code>T</code> the machines produce <code>≥ m</code> products, then any longer time <code>T' &gt; T</code> will produce at least as many products (also <code>true</code>).</li>
                  <li>If in time <code>T</code> the machines produce <code>&lt; m</code> products, then any shorter time <code>T' &lt; T</code> cannot possibly suffice (also <code>false</code>).</li>
                </ul>
                <p style={{ marginTop: "0.75rem" }}>
                  The feasibility condition <code>check(T)</code> transitions monotonically from <code>false</code> to <code>true</code> (<code>FFFF...TTTT</code>). By testing the midpoint <code>mid</code> and checking if <code>Total Products(mid) ≥ m</code> in <code>O(n)</code> time, we can binary search over the time range <code>[1, 10¹⁸]</code> to find the minimal valid <code>T</code> in approximately <code>60 × O(n)</code> operations—finishing in under 50 milliseconds for <code>n = 200,000</code>.
                </p>
              </div>
            </div>
          </details>
        </section>

        {/* 3. Prerequisites (Collapsible) */}
        <section className="totw-editorial-section">
          <details className="totw-editorial-disclosure">
            <summary className="totw-disclosure-summary">
              <span className="summary-title">Prerequisites</span>
              <span className="summary-icon" aria-hidden="true">▾</span>
            </summary>
            <div className="totw-disclosure-body">
              <p>
                Before tackling competitive programming problems on Binary Search, students should have foundational familiarity with basic programming constructs and core algorithmic reasoning. You do not need advanced algorithms to get started—the essentials below will allow you to understand and implement binary search patterns effectively:
              </p>

              <ul className="editorial-list">
                <li>
                  <strong>A. C++ Fundamentals:</strong> Comfort with basic syntax—variables, arithmetic operations (preventing 32-bit signed integer overflow with <code>long long</code>), conditional branches (<code>if/else</code>), <code>while</code> loops, functions, and standard I/O (<code>cin/cout</code> with fast I/O). Binary Search is straightforward to write once the loop condition and state variables are clear.
                </li>
                <li>
                  <strong>B. Arrays, Sorting &amp; Iterators:</strong> Understanding contiguous indexed memory (<code>std::vector</code>), 0-indexed arrays, and the concept of monotonic order. Standard binary search fundamentally requires the underlying sequence to be sorted. Familiarity with iterators (<code>a.begin()</code>, <code>a.end()</code>) is also essential for using C++ Standard Library algorithms.
                </li>
                <li>
                  <strong>C. Time Complexity &amp; Asymptotic Growth:</strong> Intuitive understanding of the difference between linear time <code>O(N)</code> and logarithmic time <code>O(log N)</code>. Understanding why discarding half of the remaining candidate space on each step leads to rapid convergence, even for input ranges as large as <code>10¹⁸</code>.
                </li>
                <li>
                  <strong>D. Basic Problem-Solving &amp; Boundary Conditions:</strong> Ability to translate English problem descriptions into precise boolean condition tests, verify edge cases (empty ranges, single elements, targets outside boundaries), and formulate a modular helper function <code>check(mid)</code>.
                </li>
                <li>
                  <strong>E. Prefix Sums &amp; Greedy Reasoning (Useful Supporting Concepts):</strong> <em>Note: These are not mandatory prerequisites for basic Binary Search.</em> They become valuable in intermediate problems when the feasibility check inside <code>check(mid)</code> requires constant-time subarray sum queries or greedy item packing.
                </li>
              </ul>

              <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.875rem" }}>
                Tip: You do not need to master all supporting concepts before you begin. Start by implementing standard array lookups and lower/upper bounds, and develop predicate formulation skills as problems gradually demand them.
              </p>
            </div>
          </details>
        </section>

        {/* 4. Curated Learning Resources (Four Collapsible Groups) */}
        <section className="totw-editorial-section">
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
        <section className="topic-page-section" id="topic-main-sections">
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
          onClick={() => scrollToSections("binary-search")}
          title="Scroll down to Problem Ladder"
          aria-label="Scroll down to Problem Ladder"
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
