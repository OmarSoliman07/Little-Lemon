import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__grid">
        <div>
          <p className="footer__logo">🍋 Little Lemon</p>
          <p className="footer__tagline">
            A family-owned Mediterranean restaurant focused on traditional recipes served with a modern twist.
          </p>
        </div>
        <div>
          <h3 className="footer__heading">Navigation</h3>
          <ul className="footer__list">
            {['Home','Menu','About'].map(l => (
              <li key={l}>
                <Link to={l==='Home'?'/':'/#'+l.toLowerCase()} className="footer__link">{l}</Link>
              </li>
            ))}
            <li><Link to="/booking" className="footer__link">Reservations</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Hours</h3>
          <ul className="footer__list">
            <li className="footer__text">Mon–Fri: 2 pm – 10 pm</li>
            <li className="footer__text">Sat–Sun: 11 am – 11 pm</li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list">
            <li className="footer__text">📍 123 Lemon St, Chicago</li>
            <li className="footer__text">📞 +1 (312) 555-0123</li>
            <li className="footer__text">✉️ hello@littlelemon.com</li>
          </ul>
        </div>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Little Lemon Restaurant — All rights reserved.
      </p>
    </footer>
  );
}
