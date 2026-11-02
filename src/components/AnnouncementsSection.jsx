import { useState } from "react";
import { initialAnnouncements } from "../data/announcements";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function AnnouncementsSection() {
  const [showEmpty, setShowEmpty] = useState(false);

  const announcements = showEmpty ? [] : initialAnnouncements;

  return (
    <section className="announcements-section section-padding" id="announcements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Notices & Updates</div>
          <h2 className="section-title">Important Announcements</h2>
          <p className="section-subtitle">
            Official announcements regarding CPS cohort registrations, contest alerts, and community notices.
          </p>
        </div>

        {/* Announcements List */}
        <div className="announcements-list">
          {announcements.length > 0 ? (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className={`announcement-card ${ann.highlight ? "highlight" : ""}`}
              >
                <div className="announcement-body">
                  <div className="announcement-meta">
                    <span className="announcement-category">{ann.category}</span>
                    <span className="announcement-date">{ann.date}</span>
                  </div>
                  <h3>{ann.title}</h3>
                  <p>{ann.summary}</p>
                </div>

                <div className="announcement-action">
                  {ann.isExternal ? (
                    <a
                      href={ann.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: "0.8125rem", padding: "0.45rem 0.85rem" }}
                    >
                      {ann.actionText} ↗
                    </a>
                  ) : (
                    <a
                      href={ann.actionUrl}
                      className="btn btn-secondary"
                      style={{ fontSize: "0.8125rem", padding: "0.45rem 0.85rem" }}
                    >
                      {ann.actionText} →
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            /* Graceful Empty State */
            <div className="empty-state-box">
              <div className="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3>No Active Announcements Right Now</h3>
              <p>
                All latest notices, contest alerts, and schedule changes are posted here and shared through official CPS communication channels.
              </p>
              <a
                href={OFFICIAL_REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join CPS for Direct Alerts ↗
              </a>
            </div>
          )}

          {/* Test toggle for reviewing empty state */}
          <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: "0.6875rem", padding: "0.25rem 0.6rem", opacity: 0.7 }}
              onClick={() => setShowEmpty(!showEmpty)}
            >
              {showEmpty ? "Show Active Announcements" : "Preview Announcements Empty State"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
