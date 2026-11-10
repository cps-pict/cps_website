import { Link } from "react-router-dom";
import { quickAccessItems } from "../data/quickAccess";

export default function QuickAccessSection() {
  return (
    <section className="quick-access-section section-padding" id="resources">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Resource Hub</div>
          <h2 className="section-title">Quick Access to Learning Resources</h2>
          <p className="section-subtitle">
            Direct shortcuts to CPS weekly learning modules, curated ladders, contest discussion, and workshop archives.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="quick-access-grid">
          {quickAccessItems.map((item) => (
            <div key={item.id} className="quick-card">
              <span className="quick-card-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <div className="quick-card-tagline">{item.tagline}</div>
              <p>{item.description}</p>
              <div>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-card-action"
                  >
                    {item.actionLabel} ↗
                  </a>
                ) : (
                  <Link
                    to={item.to || "/"}
                    className="quick-card-action"
                  >
                    {item.actionLabel} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
