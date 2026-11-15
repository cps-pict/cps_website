import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { topicOfTheWeek, TOPIC_SECTIONS } from "../data/topicOfTheWeek";
import { algorithmicTemplates, templateCategories } from "../data/algorithmicTemplates";

export default function TopicOfTheWeekPage({ onBackToHome }) {
  const [activeSection, setActiveSection] = useState("binary-search");
  const [activeTier, setActiveTier] = useState("all");
  const [activeTemplateCategory, setActiveTemplateCategory] = useState("All");
  const [openHints, setOpenHints] = useState({});
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

  const toggleHint = (id) => {
    setOpenHints((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  // Section-specific problem list
  const isProblemSection = activeSection !== "core-patterns";
  const currentSectionMeta =
    TOPIC_SECTIONS.find((s) => s.id === activeSection) || TOPIC_SECTIONS[0];

  const sectionProblems = topicOfTheWeek.problemSet.filter((p) =>
    p.categories?.includes(activeSection)
  );

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

  // Global counts for the whole topic
  const totalAllProblems = topicOfTheWeek.problemSet.length;
  const totalAllCompleted = topicOfTheWeek.problemSet.filter((p) => !!completedMap[p.id]).length;
  const totalAllPercent =
    totalAllProblems > 0 ? Math.round((totalAllCompleted / totalAllProblems) * 100) : 0;

  // Filter templates for Section 4
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

        {/* Header, Title, Week, Publication Date */}
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

          {/* Quick Jump Action Bar */}
          <div className="topic-header-quick-bar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSections("binary-search")}
              id="jump-to-sheet-btn"
            >
              <span>Binary Search ({topicOfTheWeek.problemSet.filter(p => p.categories?.includes("binary-search")).length}Q)</span>
              <span>↓</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSections("two-pointers")}
            >
              <span>Two Pointers ({topicOfTheWeek.problemSet.filter(p => p.categories?.includes("two-pointers")).length}Q)</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSections("sliding-window")}
            >
              <span>Sliding Window ({topicOfTheWeek.problemSet.filter(p => p.categories?.includes("sliding-window")).length}Q)</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSections("core-patterns")}
            >
              <span>Core Templates ({algorithmicTemplates.length})</span>
            </button>
            <div className="topic-quick-stats">
              {user ? (
                <span>
                  Your Progress: <strong>{totalAllCompleted}/{totalAllProblems}</strong> ({totalAllPercent}%)
                </span>
              ) : (
                <span>{totalAllProblems} Total Curated Problems • 4 Topic Sections</span>
              )}
            </div>
          </div>
        </header>

        {/* Introduction & Motivation */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Introduction &amp; Motivation</span>
          </h2>
          <div className="topic-motivation-box">
            <p>{topicOfTheWeek.introduction}</p>
          </div>
        </section>

        {/* Prerequisites */}
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

        {/* Curated Learning Resources */}
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

        {/* =================================================================
            FOUR MAIN SECTIONS:
            1. Binary Search
            2. Two Pointers
            3. Sliding Window
            4. Core Algorithmic Patterns (Code Templates Only)
            ================================================================= */}
        <section className="topic-page-section" id="topic-main-sections">
          {/* Section Navigation Tabs */}
          <nav className="totw-section-nav" aria-label="Topic Sections Navigation">
            {TOPIC_SECTIONS.map((sec) => {
              const isSelected = activeSection === sec.id;
              let countLabel = sec.badge;
              if (sec.id === "binary-search") {
                const cnt = topicOfTheWeek.problemSet.filter((p) => p.categories?.includes("binary-search")).length;
                countLabel = `${cnt} Problems`;
              } else if (sec.id === "two-pointers") {
                const cnt = topicOfTheWeek.problemSet.filter((p) => p.categories?.includes("two-pointers")).length;
                countLabel = `${cnt} Problems`;
              } else if (sec.id === "sliding-window") {
                const cnt = topicOfTheWeek.problemSet.filter((p) => p.categories?.includes("sliding-window")).length;
                countLabel = `${cnt} Problems`;
              }

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
                  <span className="tab-icon">{sec.icon}</span>
                  <span>{sec.shortTitle}</span>
                  <span className="tab-badge">{countLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Section Overview Banner */}
          <div className="section-intro-banner">
            <h3>
              <span>{currentSectionMeta.icon}</span>
              <span>{currentSectionMeta.title}</span>
            </h3>
            <p>{currentSectionMeta.description}</p>
          </div>

          {/* If Active Section is a Problem Section (Binary Search, Two Pointers, or Sliding Window) */}
          {isProblemSection && (
            <div className="problem-section-content">
              {/* Progress Summary Card for this section */}
              <div className="totw-progress-card">
                <div className="totw-progress-header">
                  <div className="totw-progress-title-wrap">
                    <span className="totw-progress-badge">{currentSectionMeta.shortTitle} Progress</span>
                    <h3>
                      {user ? (
                        <>
                          Completed: <span className="highlight-green">{sectionCompletedCount}</span> / {sectionProblems.length} problems
                        </>
                      ) : (
                        `Track ${currentSectionMeta.shortTitle} Problem Solving`
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
                      ✓ Signed in as <strong>{user.email}</strong> • Syncing with Supabase ({totalAllCompleted}/{totalAllProblems} overall)
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
                      {currentSectionMeta.shortTitle} Problem Ladder ({filteredProblems.length})
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

                  const isHintOpen = !!openHints[prob.id];
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
                          {prob.editorialUrl && (
                            <a
                              href={prob.editorialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary problem-editorial-btn"
                              style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                            >
                              Editorial ↗
                            </a>
                          )}

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
            </div>
          )}

          {/* =================================================================
              Section 4: Core Algorithmic Patterns (CODE TEMPLATES ONLY)
              ================================================================= */}
          {activeSection === "core-patterns" && (
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
          )}
        </section>

        {/* Additional Practice Recommendations */}
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

      {/* Floating Quick Jump Button */}
      <button
        type="button"
        className="floating-jump-btn"
        onClick={() => scrollToSections(activeSection)}
        title="Scroll down to active section"
        aria-label="Scroll down to active section"
      >
        <span>{currentSectionMeta.shortTitle}</span>
        <span className="floating-jump-badge">
          {isProblemSection ? `${sectionCompletedCount}/${sectionProblems.length}` : "Code"}
        </span>
        <span className="floating-jump-arrow">↓</span>
      </button>
    </div>
  );
}
