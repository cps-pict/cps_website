import { useState } from "react";
import { topicOfTheWeek } from "../data/topicOfTheWeek";

export default function TopicOfTheWeekPage({ onBackToHome }) {
  const [activeTier, setActiveTier] = useState("all");
  const [openHints, setOpenHints] = useState({});

  const toggleHint = (id) => {
    setOpenHints((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProblems =
    activeTier === "all"
      ? topicOfTheWeek.problemSet
      : topicOfTheWeek.problemSet.filter(
          (p) => p.difficultyTier.toLowerCase() === activeTier.toLowerCase()
        );

  return (
    <div className="topic-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="topic-page-back-nav">
          <button type="button" className="topic-page-back-btn" onClick={onBackToHome}>
            ← Back to Homepage
          </button>
        </div>

        {/* 1 & 2: Header, Title, Week, Publication Date */}
        <header className="topic-page-header">
          <div className="topic-page-meta-row">
            <span className="week-badge">
              Week {topicOfTheWeek.week} Focus
            </span>
            <span className="topic-difficulty-badge">
              {topicOfTheWeek.difficulty}
            </span>
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
            <span>Introduction & Motivation</span>
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
            {topicOfTheWeek.learningResources.map((resCat, idx) => (
              <div key={idx} className="resource-category-card">
                <h4>{resCat.category}</h4>
                <ul className="resource-item-list">
                  {resCat.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.url}
                        target={item.url.startsWith("http") ? "_blank" : undefined}
                        rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="resource-item-link"
                      >
                        <div>
                          <strong>{item.title}</strong>
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

        {/* 7: Topic-Wise Problem Set */}
        <section className="topic-page-section" id="problem-set">
          <div className="problem-set-controls">
            <div>
              <h2 className="topic-section-heading" style={{ marginBottom: "0.25rem" }}>
                <span>Curated Problem Set ({filteredProblems.length})</span>
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                Arranged by difficulty ladder. Solve sequentially to build algorithmic intuition.
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

          <div className="problem-ladder-list">
            {filteredProblems.map((prob) => {
              const diffClass =
                prob.difficultyTier === "Easy"
                  ? "diff-easy"
                  : prob.difficultyTier === "Medium"
                  ? "diff-medium"
                  : "diff-hard";

              const isHintOpen = !!openHints[prob.id];

              return (
                <div key={prob.id} className="problem-row-card">
                  <div className="problem-main-row">
                    <div className="problem-left-info">
                      <span className="problem-platform-tag">{prob.platform}</span>
                      <span className="problem-title">{prob.name}</span>
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

        {/* 8: Additional Practice Resources */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Additional Practice Recommendations</span>
          </h2>
          <div className="topic-motivation-box" style={{ borderLeftColor: "var(--border-light)" }}>
            <ul className="additional-tips-list">
              {topicOfTheWeek.additionalResources.map((res, idx) => (
                <li key={idx}>
                  <span style={{ color: "var(--accent-primary)" }}>•</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
