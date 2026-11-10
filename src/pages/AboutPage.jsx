import { Link } from "react-router-dom";
import { teamMembers, societyPillars } from "../data/team";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function AboutPage() {
  return (
    <div className="about-page section-padding">
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
            <span className="week-badge">Organization &amp; Team</span>
            <span className="topic-difficulty-badge">Student Chapter</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Est. Pune Institute of Computer Technology
            </span>
          </div>

          <h1 className="topic-page-title">About CPS PICT &amp; Mentorship Team</h1>
          <p className="topic-page-desc">
            The Competitive Programming Society (CPS) is PICT's premier student community dedicated to fostering algorithmic intuition, competitive contest performance, and high-standard software engineering problem-solving.
          </p>
        </header>

        {/* Mission & Vision Section */}
        <section className="topic-page-section">
          <div className="pathways-container" style={{ marginBottom: "3rem" }}>
            <div className="pathway-box">
              <div className="pathway-header">
                <span className="pathway-badge">Core Mission</span>
                <h3>Democratize Algorithmic Excellence</h3>
              </div>
              <p>
                To provide every PICT student—regardless of year or branch—with a structured, zero-fluff pathway to master data structures, algorithm design, and contest-level intuition without getting lost in tutorial hell.
              </p>
            </div>

            <div className="pathway-box">
              <div className="pathway-header">
                <span className="pathway-badge" style={{ borderColor: "#F59E0B", color: "#F59E0B" }}>
                  Contest Vision
                </span>
                <h3>Global Competitive Standing</h3>
              </div>
              <p>
                To consistently qualify PICT teams for ACM-ICPC Asia Regional finals, foster Codeforces Candidate Masters, and prepare students for technical interviews at world-class technology companies.
              </p>
            </div>
          </div>
        </section>

        {/* Society Pillars */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Our Foundational Pillars</span>
            <span className="topic-section-heading-badge">Values</span>
          </h2>

          <div className="intro-pillars-grid">
            {societyPillars.map((p, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-icon-box">0{idx + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dual Pathways */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Curriculum Pathways</span>
            <span className="topic-section-heading-badge">Tracks</span>
          </h2>

          <div className="pathways-container">
            <div className="pathway-box">
              <div className="pathway-header">
                <span className="pathway-badge">Track 1</span>
                <h3>Beginner &amp; Placement Foundation</h3>
              </div>
              <p>
                Designed for students taking their first steps in competitive programming or gearing up for company online assessments:
              </p>
              <ul className="pathway-list" style={{ marginTop: "1rem" }}>
                <li>C++ STL syntax, time &amp; space complexity guardrails</li>
                <li>Arrays, Two Pointers, and Sliding Window techniques</li>
                <li>Binary search on sorted structures and monotonic answer spaces</li>
                <li>High-frequency interview problems from Google, Amazon &amp; Microsoft</li>
              </ul>
            </div>

            <div className="pathway-box">
              <div className="pathway-header">
                <span className="pathway-badge" style={{ borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}>
                  Track 2
                </span>
                <h3>Advanced Contest &amp; ICPC Track</h3>
              </div>
              <p>
                Focused on active Codeforces &amp; AtCoder contest participants aiming for Division 1/2 ratings and ICPC qualification:
              </p>
              <ul className="pathway-list" style={{ marginTop: "1rem" }}>
                <li>Dynamic Programming on trees, bitmasking, and digit DP</li>
                <li>Graph algorithms: Tarjan's bridges, DSU, Dijkstra variants</li>
                <li>Segment Trees with lazy propagation, Fenwick Trees, and Treaps</li>
                <li>Game theory, number theory, and advanced combinatorics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mentors & Team Section */}
        <section className="topic-page-section">
          <h2 className="topic-section-heading">
            <span>Core Team &amp; Faculty Advisors</span>
            <span className="topic-section-heading-badge">Leadership</span>
          </h2>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-card-header">
                  <div className="team-avatar-box">
                    <span>{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="team-member-name">{member.name}</h3>
                    <div className="team-member-role">{member.role}</div>
                  </div>
                </div>

                <div className="team-department">{member.department}</div>
                <p className="team-bio">{member.bio}</p>

                {member.links && (
                  <div className="team-social-links">
                    {member.links.codeforces && (
                      <a
                        href={member.links.codeforces}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-social-tag"
                      >
                        Codeforces
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-social-tag"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-social-tag"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA Banner */}
        <section className="about-join-banner">
          <div className="about-join-content">
            <h2>Ready to level up your competitive programming?</h2>
            <p>
              Join the official CPS PICT cohort to participate in weekly problem reviews, mock online assessments, and team contests.
            </p>
            <div className="about-join-actions">
              <a
                href={OFFICIAL_REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join CPS (Official Registration Form) ↗
              </a>
              <Link to="/sheet" className="btn btn-secondary">
                Explore Must-Try OA Sheet →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

