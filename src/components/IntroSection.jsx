export default function IntroSection() {
  return (
    <section className="intro-section section-padding" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">About CPS</div>
          <h2 className="section-title">What is Competitive Programming Society?</h2>
          <p className="section-subtitle">
            CPS is the dedicated student algorithmic society at Pune Institute of Computer Technology.
            We turn problem-solving into a disciplined technical craft, cultivating analytical rigor,
            contest speed, and algorithmic mastery.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="intro-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h3>Algorithmic Learning</h3>
            <p>
              Moving beyond basic programming syntax into data structure internals, graph theory,
              dynamic programming, segment trees, and mathematical foundations.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="22" y1="12" x2="18" y2="12"></line>
                <line x1="6" y1="12" x2="2" y2="12"></line>
                <line x1="12" y1="6" x2="12" y2="2"></line>
                <line x1="12" y1="22" x2="12" y2="18"></line>
              </svg>
            </div>
            <h3>Problem-Solving Intuition</h3>
            <p>
              Developing the ability to dismantle ambiguous problem statements, identify invariants,
              bound time constraints, and rigorously prove correctness before implementation.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Competitive Programming</h3>
            <p>
              Mastering timed contest psychology, rapid debugging, edge-case testing, and team strategies
              across Codeforces, AtCoder, CSES, and ACM-ICPC.
            </p>
          </div>
        </div>

        {/* Dual Pathways: Beginners vs Experienced Coders */}
        <div className="pathways-container">
          {/* Beginner Pathway */}
          <div className="pathway-box">
            <div className="pathway-header">
              <span className="pathway-badge">Beginner Track</span>
              <h3 className="pathway-title">Starting from Scratch?</h3>
            </div>
            <p className="pathway-desc">
              No prior competitive programming background required. We bridge the gap between basic
              first-year syntax and confident algorithmic problem-solving.
            </p>
            <ul className="pathway-list">
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Structured roadmap starting with Time/Space complexity and STL/Collections</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Peer mentorship pods led by experienced seniors</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Curated beginner problem ladders (LeetCode Easy, Codeforces Div. 3/4 A-C)</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Judgment-free contest upsolving and doubt-clearing sessions</span>
              </li>
            </ul>
          </div>

          {/* Experienced Pathway */}
          <div className="pathway-box">
            <div className="pathway-header">
              <span className="pathway-badge">Advanced Track</span>
              <h3 className="pathway-title">Aiming for 1800+ & ICPC?</h3>
            </div>
            <p className="pathway-desc">
              For programmers already familiar with DSA who want to break through contest rating plateaus
              and compete in high-stakes regional contests.
            </p>
            <ul className="pathway-list">
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Advanced algorithmic workshops: Segment Trees, Fenwick Trees, Flow, DP with Bitmask</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>PICT ICPC team formation, mock regional contests, and problem set design</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>Deep post-mortems of hard Codeforces Div. 1/Div. 2 D/E problems</span>
              </li>
              <li>
                <span className="pathway-list-check">✓</span>
                <span>High-frequency OA speed runs & technical interview problem deconstruction</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
