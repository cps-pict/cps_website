import { useState } from "react";
import { Link } from "react-router-dom";
import { subjectRoadmaps, platformGuides, potdArchive, contestTemplate } from "../data/resources";

export default function ResourcesPage() {
  const [copied, setCopied] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState(subjectRoadmaps[0].id);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(contestTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeRoadmapData = subjectRoadmaps.find((r) => r.id === selectedRoadmap) || subjectRoadmaps[0];

  return (
    <div className="resources-page section-padding">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="topic-page-back-nav">
          <Link to="/" className="topic-page-back-btn">
            ← Back to Homepage
          </Link>
        </div>

        {/* Page Header */}
        <header className="topic-page-header">
          <div className="topic-page-meta-row">
            <span className="week-badge">Syllabus &amp; Hub</span>
            <span className="topic-difficulty-badge">All Skill Levels</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Curated by CPS Academic Team
            </span>
          </div>

          <h1 className="topic-page-title">Competitive Programming Resources</h1>
          <p className="topic-page-desc">
            Structured subject roadmaps, contest platform recommendations, LeetCode POTD breakdowns, and contest starter templates to streamline your algorithmic practice.
          </p>
        </header>

        {/* Section 1: Algorithmic Subject Roadmaps */}
        <section className="topic-page-section" id="roadmaps">
          <h2 className="topic-section-heading">
            <span>1. Core Algorithmic Roadmaps</span>
            <span className="topic-section-heading-badge">Pathways</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
            Select a subject to inspect the core conceptual progression, essential invariants, and landmark practice problems.
          </p>

          <div className="roadmap-tabs-container">
            <div className="roadmap-nav-tabs">
              {subjectRoadmaps.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`roadmap-nav-btn ${selectedRoadmap === r.id ? "active" : ""}`}
                  onClick={() => setSelectedRoadmap(r.id)}
                >
                  {r.title}
                </button>
              ))}
            </div>

            <div className="roadmap-detail-card">
              <div className="roadmap-detail-header">
                <h3>{activeRoadmapData.title}</h3>
                <span className="roadmap-tier-badge">{activeRoadmapData.tier}</span>
              </div>
              <p className="roadmap-summary">{activeRoadmapData.summary}</p>

              <div className="roadmap-two-col">
                <div className="roadmap-col">
                  <h4>Key Concepts &amp; Invariants</h4>
                  <ul className="roadmap-bullets">
                    {activeRoadmapData.keyConcepts.map((c, i) => (
                      <li key={i}>
                        <span style={{ color: "var(--accent-primary)", marginRight: "0.5rem" }}>▹</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="roadmap-col">
                  <h4>Landmark Problems</h4>
                  <div className="roadmap-problems-list">
                    {activeRoadmapData.recommendedProblems.map((prob, i) => (
                      <a
                        key={i}
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="roadmap-prob-link"
                      >
                        <span>{prob.name}</span>
                        <span>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contest Platforms & Guides */}
        <section className="topic-page-section" id="platforms">
          <h2 className="topic-section-heading">
            <span>2. Essential Platforms &amp; References</span>
            <span className="topic-section-heading-badge">Ecosystem</span>
          </h2>

          <div className="platforms-grid">
            {platformGuides.map((p) => (
              <div key={p.name} className="platform-card">
                <div className="platform-card-top">
                  <h3>{p.name}</h3>
                  <span className="platform-card-badge">{p.badge}</span>
                </div>
                <div className="platform-card-focus">{p.focus}</div>
                <p className="platform-card-desc">{p.description}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-visit-link"
                >
                  Visit Platform ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: LeetCode POTD Archive & Discussions */}
        <section className="topic-page-section" id="potd">
          <div className="potd-section-header">
            <div>
              <h2 className="topic-section-heading" style={{ marginBottom: "0.25rem" }}>
                <span>3. LeetCode Problem of the Day (POTD)</span>
                <span className="topic-section-heading-badge">Daily Consistency</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Keep your solving streak alive. Key intuition and video breakdown references for recent daily problems.
              </p>
            </div>
            <a
              href="https://leetcode.com/problemset/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Open Today's POTD ↗
            </a>
          </div>

          <div className="potd-cards-grid">
            {potdArchive.map((item, idx) => (
              <div key={idx} className="potd-card">
                <div className="potd-card-header">
                  <span className="potd-date">{item.date}</span>
                  <span className={`difficulty-pill difficulty-${item.difficulty.toLowerCase()}`}>
                    {item.difficulty}
                  </span>
                </div>
                <h3 className="potd-title">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title} ↗
                  </a>
                </h3>
                <span className="potd-platform">{item.platform}</span>

                <div className="potd-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="potd-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="potd-insight">
                  <strong>Intuition:</strong> {item.keyInsight}
                </div>

                <div className="potd-actions">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="potd-link-btn"
                  >
                    Solve on LeetCode ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Fast I/O & Contest Template */}
        <section className="topic-page-section" id="template">
          <div className="template-header-row">
            <div>
              <h2 className="topic-section-heading" style={{ marginBottom: "0.25rem" }}>
                <span>4. C++ Fast I/O &amp; Contest Boilerplate</span>
                <span className="topic-section-heading-badge">Boilerplate</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Speed up standard stream operations with untied streams. Reduces I/O overhead from ~350ms to ~15ms on 10⁶ integers.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCopyTemplate}
            >
              {copied ? "✓ Copied to Clipboard!" : "Copy C++ Template"}
            </button>
          </div>

          <div className="template-box">
            <pre className="template-code-box">
              <code>{contestTemplate}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}

