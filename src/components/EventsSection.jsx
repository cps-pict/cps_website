import { useState } from "react";
import { initialEvents, pastSessions, OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const displayedEvents = simulateEmpty ? [] : initialEvents;

  return (
    <section className="events-section section-padding" id="events">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Events & Sessions</div>
          <h2 className="section-title">Upcoming CPS Events & Sessions</h2>
          <p className="section-subtitle">
            Participate in algorithmic masterclasses, contest upsolving, and roadmap sessions conducted by CPS mentors.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="events-controls">
          <div className="events-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "upcoming"}
              className={`events-tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("upcoming");
                setSimulateEmpty(false);
              }}
            >
              Upcoming ({simulateEmpty ? 0 : initialEvents.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "past"}
              className={`events-tab-btn ${activeTab === "past" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("past");
                setSimulateEmpty(false);
              }}
            >
              Previous Sessions ({pastSessions.length})
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
            onClick={() => setSimulateEmpty(!simulateEmpty)}
            title="Toggle empty state view for review"
          >
            {simulateEmpty ? "Show Scheduled Events" : "Preview Empty State"}
          </button>
        </div>

        {/* Upcoming Events Tab */}
        {activeTab === "upcoming" && (
          <div className="events-grid">
            {displayedEvents.length > 0 ? (
              displayedEvents.map((evt) => (
                <article key={evt.id} className="event-card">
                  <div className="event-top">
                    <span className="event-category-badge">{evt.category}</span>
                    <span className="event-date-chip">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {evt.date}
                    </span>
                  </div>

                  <h3>{evt.title}</h3>
                  <p className="event-description">{evt.description}</p>

                  <div className="event-meta">
                    <div className="event-meta-item">
                      <span style={{ color: "var(--text-muted)" }}>Time:</span>
                      <strong>{evt.time}</strong>
                    </div>
                    <div className="event-meta-item">
                      <span style={{ color: "var(--text-muted)" }}>Venue:</span>
                      <strong>{evt.venue}</strong>
                    </div>
                    <div className="event-meta-item">
                      <span style={{ color: "var(--text-muted)" }}>Speaker:</span>
                      <span>{evt.speaker}</span>
                    </div>
                  </div>

                  <div>
                    {evt.registrationLink ? (
                      <a
                        href={evt.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        Register for Session ↗
                      </a>
                    ) : (
                      <span className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", cursor: "default" }}>
                        Open Entry
                      </span>
                    )}
                  </div>
                </article>
              ))
            ) : (
              /* Meaningful Empty State */
              <div className="empty-state-box">
                <div className="empty-state-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3>No Upcoming Sessions Scheduled Right Now</h3>
                <p>
                  New sessions, workshops, and contest upsolving dates will be published here.
                  Join CPS to receive alerts when registration opens for the next session.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <a
                    href={OFFICIAL_REGISTRATION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Join CPS for Session Alerts ↗
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setSimulateEmpty(false);
                      setActiveTab("past");
                    }}
                  >
                    Browse Previous Sessions
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Previous Sessions Tab */}
        {activeTab === "past" && (
          <div className="events-grid">
            {pastSessions.map((session) => (
              <article key={session.id} className="event-card">
                <div className="event-top">
                  <span className="event-category-badge" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}>
                    Conducted Session
                  </span>
                  <span className="event-date-chip">
                    {session.date}
                  </span>
                </div>
                <h3>{session.title}</h3>
                <p className="event-description">{session.summary}</p>
                <div className="event-meta">
                  <div className="event-meta-item">
                    <span style={{ color: "var(--text-muted)" }}>Conducted by:</span>
                    <strong>{session.speaker}</strong>
                  </div>
                </div>
                <div>
                  <a
                    href={OFFICIAL_REGISTRATION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-green"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Request Session Recording ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
