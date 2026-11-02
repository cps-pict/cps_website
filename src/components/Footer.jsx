import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Col 1: Brand & Identity */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-logo-wrap">
                <img
                  src="/images/cps-logo.jpeg"
                  alt="CPS PICT Crest Logo"
                  className="footer-logo cps-logo"
                />
              </div>
              <div className="footer-brand-text">
                <h2>Competitive Programming Society</h2>
                <p>Pune Institute of Computer Technology</p>
              </div>
            </div>

            <p className="footer-mission">
              Empowering PICT students to master data structures, algorithmic design, and competitive
              programming through structured learning modules and peer mentorship.
            </p>

            <div className="footer-philosophy">
              Learn • Practice • Compete
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link" onClick={() => onNavigate("home", "#hero")}>
                  Home
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate("topic-of-the-week", "#topic-of-the-week")}>
                  Topic of the Week
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate("home", "#about")}>
                  About CPS
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate("home", "#events")}>
                  Events & Sessions
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate("home", "#resources")}>
                  Learning Resources
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: External Platforms */}
          <div className="footer-col">
            <h4>Contest Platforms</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://codeforces.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Codeforces ↗
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LeetCode ↗
                </a>
              </li>
              <li>
                <a
                  href="https://cses.fi/problemset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  CSES Problem Set ↗
                </a>
              </li>
              <li>
                <a
                  href="https://pict.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  PICT Official Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Join CTA */}
          <div className="footer-col">
            <h4>Join CPS</h4>
            <div className="footer-cta-box">
              <h5>Become a Member</h5>
              <p>
                Access weekly algorithmic discussion cohorts, peer problem ladders, and mock coding rounds.
              </p>
              <a
                href={OFFICIAL_REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.8125rem" }}
              >
                CPS Registration Form ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="footer-bottom">
          <p>© {currentYear} Competitive Programming Society (CPS), PICT. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Pune Institute of Computer Technology, Dhankawadi, Pune</span>
            <a href="#hero" onClick={() => onNavigate("home", "#hero")}>
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
