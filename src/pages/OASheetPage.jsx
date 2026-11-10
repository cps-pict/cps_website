import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { oaProblems, oaCompanies, oaTopics, oaSheetStats } from "../data/oaSheet";

export default function OASheetPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openHints, setOpenHints] = useState({});

  const toggleHint = (id) => {
    setOpenHints((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProblems = useMemo(() => {
    return oaProblems.filter((problem) => {
      // Difficulty match
      if (selectedDifficulty !== "All" && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Company match
      if (selectedCompany !== "All" && !problem.companies.includes(selectedCompany)) {
        return false;
      }

      // Topic match
      if (selectedTopic !== "All" && problem.topic !== selectedTopic) {
        return false;
      }

      // Search match (name, topic, or company)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = problem.name.toLowerCase().includes(query);
        const matchesTopic = problem.topic.toLowerCase().includes(query);
        const matchesCompany = problem.companies.some((c) =>
          c.toLowerCase().includes(query)
        );
        const matchesPlatform = problem.platform.toLowerCase().includes(query);

        if (!matchesName && !matchesTopic && !matchesCompany && !matchesPlatform) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDifficulty, selectedCompany, selectedTopic, searchQuery]);

  const resetFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCompany("All");
    setSelectedTopic("All");
    setSearchQuery("");
  };

  return (
    <div className="sheet-page section-padding">
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
            <span className="week-badge">Placement & OA Prep</span>
            <span className="topic-difficulty-badge">Top Product Companies</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Updated for 2026 Season
            </span>
          </div>

          <h1 className="topic-page-title">Must-Try LeetCode / OA Sheet</h1>
          <p className="topic-page-desc">
            {oaSheetStats.description} Filter by company hiring rounds, algorithmic pattern, or difficulty.
          </p>

          {/* Quick Stats Bar */}
          <div className="sheet-stats-bar">
            <div className="sheet-stat-box">
              <span className="sheet-stat-number">{oaSheetStats.totalProblems}</span>
              <span className="sheet-stat-label">Curated Problems</span>
            </div>
            <div className="sheet-stat-box">
              <span className="sheet-stat-number">{oaSheetStats.companiesCount}+</span>
              <span className="sheet-stat-label">Hiring Companies</span>
            </div>
            <div className="sheet-stat-box">
              <span className="sheet-stat-number">{oaSheetStats.topicsCount}</span>
              <span className="sheet-stat-label">Core Topic Ladders</span>
            </div>
            <div className="sheet-stat-box">
              <span className="sheet-stat-number">{filteredProblems.length}</span>
              <span className="sheet-stat-label">Matching Filters</span>
            </div>
          </div>
        </header>

        {/* Filter Controls & Search */}
        <section className="sheet-controls-section">
          {/* Search Input */}
          <div className="sheet-search-wrap">
            <span className="sheet-search-icon">🔍</span>
            <input
              type="text"
              className="sheet-search-input"
              placeholder="Search problems by name, company (e.g. Google), or pattern (e.g. DP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="sheet-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Difficulty Tiers */}
          <div className="sheet-filter-group">
            <span className="sheet-filter-label">Difficulty:</span>
            <div className="tier-tabs">
              {["All", "Easy", "Medium", "Hard"].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  className={`tier-tab ${selectedDifficulty === tier ? "active" : ""}`}
                  onClick={() => setSelectedDifficulty(tier)}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Company Filter Chips */}
          <div className="sheet-filter-group">
            <span className="sheet-filter-label">Company:</span>
            <div className="sheet-chips-wrap">
              {oaCompanies.map((company) => (
                <button
                  key={company}
                  type="button"
                  className={`sheet-chip ${selectedCompany === company ? "active" : ""}`}
                  onClick={() => setSelectedCompany(company)}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter Chips */}
          <div className="sheet-filter-group">
            <span className="sheet-filter-label">Topic:</span>
            <div className="sheet-chips-wrap">
              {oaTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`sheet-chip ${selectedTopic === topic ? "active" : ""}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Summary */}
          {(selectedDifficulty !== "All" ||
            selectedCompany !== "All" ||
            selectedTopic !== "All" ||
            searchQuery !== "") && (
            <div className="sheet-active-filters">
              <span>Showing {filteredProblems.length} results</span>
              <button type="button" className="sheet-reset-btn" onClick={resetFilters}>
                Reset all filters ↺
              </button>
            </div>
          )}
        </section>

        {/* Problems List */}
        <section className="sheet-problems-section">
          {filteredProblems.length === 0 ? (
            <div className="events-empty-state">
              <div className="empty-icon-box">🔍</div>
              <h3>No matching problems found</h3>
              <p>Try clearing your search query or relaxing your difficulty/company filter.</p>
              <button type="button" className="btn btn-secondary" onClick={resetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="problems-table-container">
              <table className="problems-table">
                <thead>
                  <tr>
                    <th style={{ width: "6%" }}>#</th>
                    <th style={{ width: "32%" }}>Problem Title</th>
                    <th style={{ width: "12%" }}>Difficulty</th>
                    <th style={{ width: "22%" }}>Companies</th>
                    <th style={{ width: "16%" }}>Core Pattern</th>
                    <th style={{ width: "12%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.map((prob, idx) => (
                    <tr key={prob.id} className="problem-row">
                      <td className="problem-index">{idx + 1}</td>
                      <td>
                        <div className="problem-title-cell">
                          <a
                            href={prob.problemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="problem-name-link"
                          >
                            {prob.name} ↗
                          </a>
                          <span className="problem-platform-tag">{prob.platform}</span>
                          {prob.badge && (
                            <span className="problem-must-tag">{prob.badge}</span>
                          )}
                        </div>

                        {/* Expandable Hint Container */}
                        {prob.hint && (
                          <div className="problem-hint-container">
                            <button
                              type="button"
                              className="problem-hint-btn"
                              onClick={() => toggleHint(prob.id)}
                            >
                              {openHints[prob.id] ? "Hide Key Intuition ▴" : "Show Key Intuition ▾"}
                            </button>
                            {openHints[prob.id] && (
                              <div className="problem-hint-content">
                                <strong>Intuition &amp; Invariant:</strong> {prob.hint}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`difficulty-pill difficulty-${prob.difficulty.toLowerCase()}`}
                        >
                          {prob.difficulty}
                        </span>
                      </td>
                      <td>
                        <div className="company-tags-list">
                          {prob.companies.map((c) => (
                            <span key={c} className="company-tag-pill">
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className="problem-topic-text">{prob.topic}</span>
                      </td>
                      <td>
                        <div className="problem-action-links">
                          <a
                            href={prob.problemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="problem-action-btn"
                          >
                            Solve ↗
                          </a>
                          {prob.editorialUrl && (
                            <a
                              href={prob.editorialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="problem-editorial-btn"
                            >
                              Editorial
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

