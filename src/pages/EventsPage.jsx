import { useState } from "react";
import { Link } from "react-router-dom";
import { initialEvents, pastSessions, OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="events-page section-padding">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="topic-page-back-nav">
          <Link to="/" className="topic-page-back-btn">
            ← Back to Homepage
          </Link>
        </div>

        {/* Page Header */}
        <header className="topic-page-header">
          <div className="topic-page-meta-row">
            <span className="week-badge">Sessions &amp; Workshops</span>
            <span className="topic-difficulty-badge">Campus &amp; Online</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Weekly Community Events
            </span>
          </div>

          <h1 className="topic-page-title">CPS Events &amp; Sessions Hub</h1>
          <p className="topic-page-desc">
            Stay updated with upcoming algorithmic masterclasses, ICPC mock contests, and technical interview sprints conducted by CPS mentors. Revisit past session decks and recordings below.
          </p>

          {/* Tab Selector */}
          <div className="tier-tabs" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className={`tier-tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Sessions ({initialEvents.length})
            </button>
            <button
              type="button"
              className={`tier-tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Previous Sessions Archive ({pastSessions.length})
            </button>
          </div>
        </header>

        {/* Content based on Active Tab */}
        {activeTab === "upcoming" ? (
          <section className="events-tab-content">
            <div className="events-grid">
              {initialEvents.map((evt) => (
                <article key={evt.id} className="event-card">
                  <div className="event-card-header">
                    <span className="event-category-badge">{evt.category}</span>
                    <span className="event-status-pill">{evt.badge}</span>
                  </div>

                  <h3 className="event-title">{evt.title}</h3>

                  <div className="event-meta-list">
                    <div className="event-meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{evt.date}</span>
                    </div>
                    <div className="event-meta-item">
                      <span className="meta-icon">⏰</span>
                      <span>{evt.time}</span>
                    </div>
                    <div className="event-meta-item">
                      <span className="meta-icon">📍</span>
                      <span>{evt.venue}</span>
                    </div>
                    <div className="event-meta-item">
                      <span className="meta-icon">🎙️</span>
                      <span>Speaker: {evt.speaker}</span>
                    </div>
                  </div>

                  <p className="event-description">{evt.description}</p>

                  <div className="event-tags-list">
                    {evt.tags.map((tag) => (
                      <span key={tag} className="event-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="event-actions">
                    <a
                      href={evt.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Register for Session ↗
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedEvent(evt)}
                    >
                      Quick Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="events-tab-content">
            <div className="past-sessions-grid">
              {pastSessions.map((session) => (
                <article key={session.id} className="past-session-card">
                  <div className="past-session-date">{session.date}</div>
                  <h3 className="past-session-title">{session.title}</h3>
                  <div className="past-session-speaker">Conducted by: {session.speaker}</div>
                  <p className="past-session-summary">{session.summary}</p>
                  <div className="past-session-links">
                    <a
                      href={OFFICIAL_REGISTRATION_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="session-link-btn"
                    >
                      Request Deck &amp; Recording ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Modal for Quick Details */}
        {selectedEvent && (
          <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedEvent.title}</h3>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedEvent(null)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                  {selectedEvent.description}
                </p>
                <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
                  <div><strong>Date:</strong> {selectedEvent.date}</div>
                  <div><strong>Time:</strong> {selectedEvent.time}</div>
                  <div><strong>Venue:</strong> {selectedEvent.venue}</div>
                  <div><strong>Speaker:</strong> {selectedEvent.speaker}</div>
                </div>
                <a
                  href={selectedEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Complete Registration on Google Forms ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

