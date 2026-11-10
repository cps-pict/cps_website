import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Topic of the Week", to: "/totw" },
    { label: "OA Sheet", to: "/sheet" },
    { label: "Resources", to: "/resources" },
    { label: "Events & Sessions", to: "/events" },
    { label: "About CPS", to: "/about" }
  ];

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
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
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            <span>{item.label}</span>
            <span style={{ opacity: 0.5 }}>→</span>
          </NavLink>
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
