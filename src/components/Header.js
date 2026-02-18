import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const LINKS = [
  { label: 'Home',        to: '/'        },
  { label: 'Menu',        to: '/#menu'   },
  { label: 'About',       to: '/#about'  },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="header__inner">

        {/* Logo */}
        <Link to="/" className="logo" aria-label="Little Lemon home">
          <span className="logo__icon" aria-hidden="true">🍋</span>
          <div>
            <div className="logo__name">Little Lemon</div>
            <div className="logo__city">Chicago</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation">
          <ul className="nav__list" role="list">
            {LINKS.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `nav__link${isActive ? ' active' : ''}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <button
          className="nav__cta"
          onClick={() => navigate('/booking')}
          aria-label="Reserve a table"
        >
          Reserve a Table
        </button>

        {/* Hamburger */}
        <button
          className="nav__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="nav__mobile" aria-label="Mobile navigation">
          {LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="nav__mobile-link"
            onClick={() => setMenuOpen(false)}
            style={{ color: '#495E57', fontWeight: 800 }}
          >
            🍽 Reserve a Table
          </Link>
        </nav>
      )}
    </header>
  );
}
