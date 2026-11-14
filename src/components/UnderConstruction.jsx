import { Link } from "react-router-dom";
import { deploymentConfig } from "../config/features";

export default function UnderConstruction({ pageName = "This Page" }) {
  return (
    <div className="under-construction-page section-padding">
      <div className="container">
        {/* Navigation Breadcrumb if TOTW is active */}
        {deploymentConfig.totw && (
          <div className="topic-page-back-nav">
            <Link to="/totw" className="topic-page-back-btn">
              ← Go to Topic of the Week
            </Link>
          </div>
        )}

        <div className="terminal-window" style={{ maxWidth: "720px", margin: "2rem auto" }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-yellow"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title">deployment_status.cpp — Feature Flag Inactive</div>
            <div
              className="terminal-status-badge"
              style={{ color: "#F59E0B", borderColor: "rgba(245, 158, 11, 0.4)" }}
            >
              Work In Progress
            </div>
          </div>

          <div className="terminal-body" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                marginBottom: "0.75rem",
                color: "var(--text-primary)"
              }}
            >
              Under Construction - 🚧
            </h1>

            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent-muted)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                marginBottom: "1.25rem"
              }}
            >
              {pageName} • In Active Development
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                fontSize: "1rem",
                lineHeight: "1.6",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              We are currently fine-tuning this module for the upcoming CPS deployment. In the meantime, explore our active weekly algorithmic problem ladder and concept guides!
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              {deploymentConfig.totw && (
                <Link to="/totw" className="btn btn-primary" id="under-construction-totw-btn">
                  Explore Topic of the Week →
                </Link>
              )}
              {deploymentConfig.home && (
                <Link to="/" className="btn btn-secondary">
                  Back to Homepage
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

