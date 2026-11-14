import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { supabase } from "../lib/supabase";
import { topicOfTheWeek } from "../data/topicOfTheWeek";

export default function TopicOfTheWeekPage({ onBackToHome }) {
  const [activeTier, setActiveTier] = useState("all");
  const [openHints, setOpenHints] = useState({});
  const [completedMap, setCompletedMap] = useState({});
  const [savingId, setSavingId] = useState(null);

  const { user, signInWithGoogle } = useAuth();

  // Load user's problem completion progress from Supabase
  useEffect(() => {
    async function loadProgress() {
      if (!user) {
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

  const toggleHint = (id) => {
    setOpenHints((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle problem completion status
  const handleToggleCompleted = async (problemId) => {
    if (!user) {
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

  const filteredProblems =
    activeTier === "all"
      ? topicOfTheWeek.problemSet
      : topicOfTheWeek.problemSet.filter(
          (p) => p.difficultyTier.toLowerCase() === activeTier.toLowerCase()
        );

  const totalProblems = topicOfTheWeek.problemSet.length;
  const completedCount = topicOfTheWeek.problemSet.filter((p) => !!completedMap[p.id]).length;
  const progressPercent = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  return (
    <div className="topic-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="topic-page-back-nav">
          <Link
            to="/"
            className="topic-page-back-btn"
            onClick={onBackToHome ? onBackToHome : undefined}
          >
            ← Back to Homepage
          </Link>
        </div>

        {/* 1 & 2: Header, Title, Week, Publication Date */}
        <header className="topic-page-header">
          <div className="topic-page-meta-row">
            <span className="week-badge">Week {topicOfTheWeek.week} Focus</span>
            <span className="topic-difficulty-badge">{topicOfTheWeek.difficulty}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Published: {topicOfTheWeek.publicationDate}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
              {topicOfTheWeek.estimatedTime}
            </span>
          </div>

          <h1 className="topic-page-title">{topicOfTheWeek.title}</h1>
          <p className="topic-page-desc">{topicOfTheWeek.shortDescription}</p>
        </header>

        {/* 3: Introduction & Motivation */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Introduction &amp; Motivation</span>
          </h2>
          <div className="topic-motivation-box">
            <p>{topicOfTheWeek.introduction}</p>
          </div>
        </section>

        {/* 5: Prerequisites */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Prerequisites</span>
          </h2>
          <div className="prereqs-grid">
            {topicOfTheWeek.prerequisites.map((req, idx) => (
              <div key={idx} className="prereq-card">
                <h4>
                  <span style={{ color: "var(--accent-primary)" }}>✓</span> {req.name}
                </h4>
                <p>{req.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4: Important Concepts & Algorithmic Patterns */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Core Algorithmic Patterns</span>
          </h2>
          <div className="concept-details-list">
            {topicOfTheWeek.conceptsAndPatterns.map((concept) => (
              <article key={concept.id} className="concept-detail-block">
                <h4>{concept.title}</h4>
                <div className="concept-detail-summary">{concept.summary}</div>
                <p className="concept-detail-explanation">{concept.explanation}</p>
                <pre className="concept-code-box">
                  <code>{concept.codeSnippet}</code>
                </pre>
              </article>
            ))}
          </div>
        </section>

        {/* 6: Curated Learning Resources */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Curated Learning Resources</span>
          </h2>
          <div className="resources-columns">
            {topicOfTheWeek.learningResources.map((group, idx) => (
              <div key={idx} className="resource-group-box">
                <div className="resource-group-header">
                  <h3>{group.category}</h3>
                </div>
                <ul className="resource-items-list">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-item-link"
                      >
                        <div className="resource-link-title">
                          <span style={{ color: "var(--accent-primary)", marginRight: "0.4rem" }}>
                            ▹
                          </span>
                          {item.title}
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {item.platform}
                          </div>
                        </div>
                        <span className="resource-type-tag">{item.type} ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 7: Topic-Wise Problem Set with Checkmarks & Progress */}
        <section className="topic-page-section" id="problem-set">
          {/* Progress Summary Card */}
          <div className="totw-progress-card">
            <div className="totw-progress-header">
              <div className="totw-progress-title-wrap">
                <span className="totw-progress-badge">Student Progress</span>
                <h3>
                  {user ? (
                    <>
                      Completed: <span className="highlight-green">{completedCount}</span> / {totalProblems} problems
                    </>
                  ) : (
                    "Track Your Problem Solving"
                  )}
                </h3>
              </div>
              <div className="totw-progress-stat">
                <span className="progress-percent-number">{progressPercent}%</span>
                <span className="progress-percent-label">Completed</span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="totw-progress-bar-bg" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
              <div className="totw-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <div className="totw-progress-footer">
              {user ? (
                <span className="totw-user-status">
                  ✓ Signed in as <strong>{user.email}</strong> • Syncing with Supabase
                </span>
              ) : (
                <div className="totw-guest-prompt">
                  <span>Sign in with Google to check off problems and track your progress across devices:</span>
                  <button type="button" className="btn btn-secondary nav-google-btn" onClick={signInWithGoogle} style={{ padding: "0.25rem 0.65rem", fontSize: "0.75rem" }}>
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
                <span>Curated Problem Ladder ({filteredProblems.length})</span>
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
                All ({topicOfTheWeek.problemSet.length})
              </button>
              <button
                type="button"
                className={`tier-tab-btn ${activeTier === "easy" ? "active" : ""}`}
                onClick={() => setActiveTier("easy")}
              >
                Easy ({topicOfTheWeek.problemSet.filter((p) => p.difficultyTier === "Easy").length})
              </button>
              <button
                type="button"
                className={`tier-tab-btn ${activeTier === "medium" ? "active" : ""}`}
                onClick={() => setActiveTier("medium")}
              >
                Medium ({topicOfTheWeek.problemSet.filter((p) => p.difficultyTier === "Medium").length})
              </button>
              <button
                type="button"
                className={`tier-tab-btn ${activeTier === "hard" ? "active" : ""}`}
                onClick={() => setActiveTier("hard")}
              >
                Hard ({topicOfTheWeek.problemSet.filter((p) => p.difficultyTier === "Hard").length})
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

              const isHintOpen = !!openHints[prob.id];
              const isDone = !!completedMap[prob.id];
              const isSaving = savingId === prob.id;

              return (
                <div
                  key={prob.id}
                  className={`problem-row-card ${isDone ? "problem-card-completed" : ""}`}
                >
                  <div className="problem-main-row">
                    {/* Checkmark Button */}
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

                    <div className="problem-left-info">
                      <div className="problem-title-line">
                        <span className="problem-platform-tag">{prob.platform}</span>
                        <span className={`problem-title ${isDone ? "problem-title-done" : ""}`}>
                          {prob.name}
                        </span>
                        {isDone && <span className="problem-done-tag">Solved ✓</span>}
                      </div>
                      <div className="problem-tags-row">
                        {prob.tags.map((t, idx) => (
                          <span key={idx} className="problem-tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="problem-right-actions">
                      <span className={`diff-badge ${diffClass}`}>{prob.difficulty}</span>

                      {prob.editorialUrl && (
                        <a
                          href={prob.editorialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                        >
                          Editorial ↗
                        </a>
                      )}

                      <a
                        href={prob.problemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: "0.35rem 0.85rem", fontSize: "0.75rem" }}
                      >
                        Solve ↗
                      </a>
                    </div>
                  </div>

                  {prob.hint && (
                    <div className="problem-hint-toggle">
                      <button
                        type="button"
                        className="hint-btn"
                        onClick={() => toggleHint(prob.id)}
                        aria-expanded={isHintOpen}
                      >
                        <span>{isHintOpen ? "▼ Hide Hint" : "▶ Need a hint?"}</span>
                      </button>

                      {isHintOpen && (
                        <div className="hint-content-box">
                          <strong>Hint:</strong> {prob.hint}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8: Additional Practice Recommendations */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Additional Practice &amp; Next Steps</span>
          </h2>
          <div className="topic-motivation-box">
            <ul className="additional-tips-list">
              {topicOfTheWeek.additionalResources.map((tip, idx) => (
                <li key={idx}>
                  <span style={{ color: "var(--accent-primary)" }}>▹</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
