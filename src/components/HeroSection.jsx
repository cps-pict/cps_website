import { Link } from "react-router-dom";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          <div className="hero-philosophy-badge" aria-label="CPS Philosophy">
            <span className="philosophy-tag tag-learn">Learn</span>
            <span className="philosophy-dot">•</span>
            <span className="philosophy-tag tag-practice">Practice</span>
            <span className="philosophy-dot">•</span>
            <span className="philosophy-tag tag-compete">Compete</span>
          </div>

          <h1 className="hero-title">
            Competitive Programming Society
            <span className="hero-college-tag">
              Pune Institute of Computer Technology
            </span>
          </h1>

          <p className="hero-mission">
            PICT's student-led society dedicated to algorithmic problem-solving,
            data structure intuition, and competitive programming excellence.
            Empowering students from first code to ACM-ICPC Regionals and top engineering interviews.
          </p>

          <div className="hero-ctas">
            <Link
              to="/totw"
              className="btn btn-primary"
              id="hero-explore-topic-btn"
            >
              Explore Topic of the Week →
            </Link>

            <Link
              to="/sheet"
              className="btn btn-secondary"
              id="hero-explore-sheet-btn"
            >
              Must-Try OA Sheet
            </Link>

            <Link
              to="/resources"
              className="btn btn-secondary"
              id="hero-explore-resources-btn"
            >
              Learning Resources
            </Link>

            <a
              href={OFFICIAL_REGISTRATION_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-green"
              id="hero-join-cps-btn"
            >
              Join CPS ↗
            </a>
          </div>

          <div className="hero-pillars">
            <div className="pillar-item">
              <span className="pillar-bullet bullet-green"></span>
              <span>Weekly Algorithmic Modules</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet bullet-amber"></span>
              <span>Curated Problem Ladders</span>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet bullet-subtle"></span>
              <span>Peer Mentorship & ICPC</span>
            </div>
          </div>
        </div>

        {/* Right Column: Crest Emblem & Technical CP Terminal */}
        <div className="hero-visual">
          {/* Logo Crest Showcase */}
          <div className="hero-crest-badge">
            <div className="hero-crest-img-wrap">
              <img
                src="/images/cps-logo.jpeg"
                alt="CPS PICT Official Crest Logo"
                className="hero-crest-logo cps-logo"
              />
            </div>
            <div className="hero-crest-info">
              <h3>Official CPS PICT Emblem</h3>
              <p>Competitive Programming Society • Learn. Practice. Compete.</p>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="terminal-title">cps_pict_solution.cpp — C++20</div>
              <div className="terminal-status-badge">Fast I/O Active</div>
            </div>

            <div className="terminal-body">
              <div className="terminal-code">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="keyword">#include</span> <span className="string">&lt;bits/stdc++.h&gt;</span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="keyword">using namespace</span> std;
                </div>
                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="comment">// CPS PICT — Competitive Programming Foundation</span>
                </div>
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="type">int</span> <span className="func">main</span>() &#123;
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  &nbsp;&nbsp;ios_base::<span className="func">sync_with_stdio</span>(<span className="keyword">false</span>);
                </div>
                <div className="code-line">
                  <span className="line-num">6</span>
                  &nbsp;&nbsp;cin.<span className="func">tie</span>(<span className="keyword">NULL</span>);
                </div>
                <div className="code-line">
                  <span className="line-num">7</span>
                  &nbsp;&nbsp;cout &lt;&lt; <span className="string">"Learn. Practice. Compete.\\n"</span>;
                </div>
                <div className="code-line">
                  <span className="line-num">8</span>
                  &nbsp;&nbsp;<span className="keyword">return</span> 0;
                </div>
                <div className="code-line">
                  <span className="line-num">9</span>
                  &#125;
                </div>
              </div>

              {/* Execution Feedback */}
              <div className="terminal-verdict-bar">
                <div className="verdict-tag verdict-accepted">
                  <span className="verdict-icon">✓</span>
                  <span>Accepted (15ms, 4.2 MB)</span>
                </div>
                <div className="verdict-tag verdict-platform">
                  <span>CF Rating: 1900+ Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
