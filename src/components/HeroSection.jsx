import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function HeroSection({ onExploreTopic, onExploreResources }) {
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
            <button
              type="button"
              className="btn btn-primary"
              id="hero-explore-topic-btn"
              onClick={onExploreTopic}
            >
              Explore Topic of the Week →
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              id="hero-explore-resources-btn"
              onClick={onExploreResources}
            >
              Learning Resources
            </button>

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

          {/* CP Terminal Window */}
          <div className="terminal-card" aria-hidden="true">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">solution.cpp • C++20 Fast I/O</span>
              <span className="terminal-verdict">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ACCEPTED
              </span>
            </div>

            <pre className="terminal-code">
              <code>
                <span className="code-comment">// CPS PICT - Learn. Practice. Compete.</span>{'\n'}
                <span className="code-keyword">#include</span> &lt;bits/stdc++.h&gt;{'\n'}
                <span className="code-keyword">using namespace</span> std;{'\n\n'}
                <span className="code-type">void</span> <span className="code-fn">solve</span>() &#123;{'\n'}
                {'  '}<span className="code-type">long long</span> n, k; cin &gt;&gt; n &gt;&gt; k;{'\n'}
                {'  '}<span className="code-type">vector</span>&lt;<span className="code-type">long long</span>&gt; a(n);{'\n'}
                {'  '}<span className="code-keyword">for</span> (<span className="code-type">auto</span> &amp;x : a) cin &gt;&gt; x;{'\n'}
                {'  '}<span className="code-comment">// Binary Search on Answer Space: O(N log(max_val))</span>{'\n'}
                {'  '}<span className="code-type">auto</span> <span className="code-fn">check</span> = [&amp;](<span className="code-type">long long</span> mid) -&gt; <span className="code-type">bool</span> &#123;{'\n'}
                {'    '}<span className="code-type">long long</span> cnt = <span className="code-num">0</span>, cur = <span className="code-num">0</span>;{'\n'}
                {'    '}<span className="code-keyword">for</span> (<span className="code-type">auto</span> x : a) &#123;{'\n'}
                {'      '}<span className="code-keyword">if</span> (x &gt; mid) <span className="code-keyword">return</span> <span className="code-keyword">false</span>;{'\n'}
                {'      '}<span className="code-keyword">if</span> (cur + x &gt; mid) &#123; cnt++; cur = x; &#125;{'\n'}
                {'      '}<span className="code-keyword">else</span> cur += x;{'\n'}
                {'    '}&#125;{'\n'}
                {'    '}<span className="code-keyword">return</span> cnt + <span className="code-num">1</span> &lt;= k;{'\n'}
                {'  '}&#125;;{'\n'}
                &#125;
              </code>
            </pre>

            <div className="terminal-footer-meta">
              <span>Time: 18ms • Memory: 4.2MB</span>
              <span>Complexity: O(N log M)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
