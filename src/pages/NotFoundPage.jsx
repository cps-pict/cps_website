import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page section-padding">
      <div className="container">
        <div className="terminal-window" style={{ maxWidth: "680px", margin: "2rem auto" }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title">runtime_error.cpp — Exit Code 404</div>
            <div className="terminal-status-badge" style={{ color: "#EF4444", borderColor: "rgba(239, 68, 68, 0.4)" }}>
              Segmentation Fault
            </div>
          </div>

          <div className="terminal-body" style={{ padding: "2rem 1.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>
              404 — Page Not Found
            </h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
              The route you requested could not be resolved in the algorithmic index. Perhaps it has been moved or refactored.
            </p>

            <div className="terminal-code" style={{ marginBottom: "1.75rem" }}>
              <div className="code-line">
                <span className="line-num">1</span>
                <span className="keyword">throw</span> <span className="string">std::out_of_range("Invalid URL path");</span>
              </div>
              <div className="code-line">
                <span className="line-num">2</span>
                <span className="comment">// Suggested fix: Redirect to valid CPS route</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link to="/" className="btn btn-primary">
                Return to Homepage →
              </Link>
              <Link to="/totw" className="btn btn-secondary">
                Topic of the Week
              </Link>
              <Link to="/sheet" className="btn btn-secondary">
                Must-Try OA Sheet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

