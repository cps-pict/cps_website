import { Link } from "react-router-dom";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function Footer() {
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
            <h4>Platform Pages</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/totw" className="footer-link">
                  Topic of the Week
                </Link>
              </li>
              <li>
                <Link to="/sheet" className="footer-link">
                  Must-Try OA Sheet
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/events" className="footer-link">
                  Events & Sessions
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About CPS & Team
                </Link>
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
                  href="https://atcoder.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  AtCoder ↗
                </a>
              </li>
              <li>
                <a
                  href="https://cp-algorithms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  CP-Algorithms ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Join */}
          <div className="footer-col">
            <h4>Community</h4>
            <p className="footer-subtext">
              Join the student competitive programming community at PICT. Open to all branches and skill levels.
            </p>
            <div className="footer-cta-box">
              <a
                href={OFFICIAL_REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="footer-join-cps-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Join CPS PICT ↗
              </a>
            </div>
            <p className="footer-note">
              Official registration form for new cohorts, contest teams & updates.
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {currentYear} Competitive Programming Society, Pune Institute of Computer Technology.
            All rights reserved.
          </div>
          <div className="footer-disclaimer">
            Built by CPS PICT • Designed for algorithmic learners
          </div>
        </div>
      </div>
    </footer>
  );
}
