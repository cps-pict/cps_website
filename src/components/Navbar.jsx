import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { OFFICIAL_REGISTRATION_LINK } from "../data/events";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();

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

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

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
          {/* User Auth Section */}
          {user ? (
            <div className="navbar-user-section">
              <div className="navbar-user-pill" title={user.email}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="navbar-user-avatar" />
                ) : (
                  <div className="navbar-user-fallback">{displayName.charAt(0).toUpperCase()}</div>
                )}
                <span className="navbar-user-name">{displayName}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary nav-auth-btn"
                onClick={signOut}
                title="Sign out of CPS"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-secondary nav-auth-btn nav-google-btn"
              onClick={signInWithGoogle}
              title="Sign in with your Google account"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" className="google-icon">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}

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
        {user ? (
          <div className="mobile-user-card">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="navbar-user-avatar" />
            ) : (
              <div className="navbar-user-fallback">{displayName.charAt(0).toUpperCase()}</div>
            )}
            <div className="mobile-user-info">
              <span className="mobile-user-name">{displayName}</span>
              <span className="mobile-user-email">{user.email}</span>
            </div>
            <button type="button" className="btn btn-secondary nav-auth-btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-secondary nav-google-btn"
            style={{ width: "100%", justifyContent: "center", marginBottom: "0.5rem" }}
            onClick={signInWithGoogle}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>
        )}

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
