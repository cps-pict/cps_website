import { Link } from "react-router-dom";
import { topicOfTheWeek } from "../data/topicOfTheWeek";

export default function WeeklyTopicSection() {
  return (
    <section className="weekly-topic-section section-padding" id="topic-of-week">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Featured Learning Module</div>
          <h2 className="section-title">Topic of the Week</h2>
          <p className="section-subtitle">
            Every week, CPS dives into a core algorithmic domain. Follow along with our conceptual guide,
            patterns, and curated problem set.
          </p>
        </div>

        {/* Featured Card */}
        <div className="topic-preview-card">
          <div className="topic-top-meta">
            <span className="week-badge">
              Week {topicOfTheWeek.week} Focus
            </span>
            <span className="topic-difficulty-badge">
              Difficulty: {topicOfTheWeek.difficulty}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Published: {topicOfTheWeek.publicationDate}
            </span>
          </div>

          <h3 className="topic-main-title">{topicOfTheWeek.title}</h3>
          <p className="topic-short-desc">{topicOfTheWeek.shortDescription}</p>

          {/* Key Concepts Preview */}
          <div className="topic-concepts-grid">
            {topicOfTheWeek.conceptsAndPatterns.slice(0, 3).map((item) => (
              <div key={item.id} className="concept-pill">
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>

          {/* Card Actions & Meta */}
          <div className="topic-actions">
            <div className="topic-prereqs">
              <strong>Prerequisites:</strong>{" "}
              {topicOfTheWeek.prerequisites.map((p) => p.name).join(" • ")}
            </div>

            <div>
              <Link
                to="/totw"
                className="btn btn-primary"
                id="explore-topic-btn"
              >
                Explore Full Topic Guide & Problem Set ({topicOfTheWeek.problemSet.length}) →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
