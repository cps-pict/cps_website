import { useState } from "react";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function Navbar({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", view: "home", hash: "#home" },
    { label: "Topic of the Week", view: "topic-of-the-week", hash: "#topic-of-the-week" },
    { label: "About CPS", view: "home", hash: "#about" },
    { label: "Events & Sessions", view: "home", hash: "#events" },
    { label: "Learning Resources", view: "home", hash: "#resources" }
  ];

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    onNavigate(item.view, item.hash);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home", "#home");
          }}
          aria-label="Competitive Programming Society PICT Home"
        >
          <div className="navbar-logo-wrap">
            <img
              src="/images/cps-logo.jpeg"
              alt="CPS PICT Crest Logo"
              className="navbar-logo cps-logo"
            />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-title">
              CPS <span className="navbar-badge">PICT</span>
            </span>
            <span className="navbar-subtitle">Competitive Programming Society</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.view === "topic-of-the-week"
                ? currentView === "topic-of-the-week"
                : currentView === "home" && window.location.hash === item.hash;

            return (
              <a
                key={item.label}
                href={item.hash}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <a
            href={OFFICIAL_REGISTRATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-join-btn"
            id="nav-join-cps-btn"
          >
            Join CPS ↗
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`} aria-label="Mobile Navigation">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.hash}
            className={`mobile-nav-link ${
              currentView === item.view ? "active" : ""
            }`}
            onClick={(e) => handleLinkClick(e, item)}
          >
            <span>{item.label}</span>
            <span style={{ opacity: 0.5 }}>→</span>
          </a>
        ))}
        <div className="mobile-drawer-footer">
          <a
            href={OFFICIAL_REGISTRATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Join CPS (Official Form) ↗
          </a>
        </div>
      </div>
    </header>
  );
}
