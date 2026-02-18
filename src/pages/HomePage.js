import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SPECIALS, REVIEWS } from '../data/menuData';

/* ── Scroll reveal ──────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero" aria-label="Welcome to Little Lemon">
      <div className="hero__inner">
        <div className="reveal">
          <span className="hero__pill">🌿 Mediterranean Cuisine</span>
          <h1 className="hero__title">Little<br /><span>Lemon</span></h1>
          <p className="hero__city">Chicago, IL</p>
          <p className="hero__desc">
            A family-owned gem where ancient Mediterranean recipes meet modern craft.
            Every dish tells a story — come taste ours.
          </p>
          <div className="hero__btns">
            <button
              className="btn btn--primary"
              onClick={() => navigate('/booking')}
              aria-label="Reserve a table at Little Lemon"
            >
              🍽 Reserve a Table
            </button>
            <a href="#menu" className="btn btn--ghost" aria-label="Explore our menu">
              Explore Menu →
            </a>
          </div>
          <div className="hero__stats">
            {[['15+','Years'],['4.9★','Rating'],['200+','Dishes']].map(([v,l]) => (
              <div key={l}>
                <div className="stat__val">{v}</div>
                <div className="stat__lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__img-wrap reveal" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700"
            alt="Little Lemon signature dish"
            className="hero__img"
          />
          <div className="hero__badge">
            <span className="hero__badge-icon">🏆</span>
            <div>
              <div className="hero__badge-title">Best Mediterranean</div>
              <div className="hero__badge-sub">Chicago 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Promo bar ──────────────────────────────────────────────── */
function PromoBar() {
  return (
    <div className="promo-bar" role="banner" aria-label="Weekend promotion">
      <div className="promo-bar__inner">
        <span className="promo-bar__dot" aria-hidden="true">●</span>
        <strong>This Weekend Only:</strong>&nbsp;30% off all mains — use code&nbsp;
        <span className="promo-bar__code">LEMON30</span>
        <button className="promo-bar__btn" aria-label="Claim offer">Claim →</button>
      </div>
    </div>
  );
}

/* ── Specials ───────────────────────────────────────────────── */
function Specials() {
  const navigate = useNavigate();
  return (
    <section className="specials" id="menu" aria-label="This week's specials">
      <div className="specials__row">
        <div className="reveal">
          <span className="section-pill">🍴 Weekly Specials</span>
          <h2 className="section-title">This Week's Specials!</h2>
        </div>
        <button className="btn btn--outline reveal" aria-label="View the full online menu">
          Online Menu
        </button>
      </div>

      <div className="specials__grid">
        {SPECIALS.map((item, i) => (
          <article
            key={item.id}
            className="card reveal"
            style={{ animationDelay: `${i * 0.1}s` }}
            aria-label={`${item.name}, ${item.price}`}
          >
            <div className="card__img-wrap">
              <img src={item.img} alt={item.name} className="card__img" />
              <span className="card__tag" style={{ background: item.tagColor }}>{item.tag}</span>
            </div>
            <div className="card__body">
              <div className="card__top">
                <h3 className="card__name">{item.name}</h3>
                <span className="card__price">{item.price}</span>
              </div>
              <p className="card__desc">{item.desc}</p>
              <button className="read-more" aria-label={`Order ${item.name} for delivery`}>
                Order a delivery 🛵
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* CTA inside specials */}
      <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
        <button
          className="btn btn--primary"
          onClick={() => navigate('/booking')}
          aria-label="Reserve your table now"
        >
          🍽 Reserve a Table Now
        </button>
      </div>
    </section>
  );
}

/* ── Reviews ────────────────────────────────────────────────── */
function Reviews() {
  return (
    <section className="reviews" aria-label="Customer reviews">
      <div className="reviews__head reveal">
        <span className="section-pill" style={{ background:'rgba(244,206,20,.15)', color:'#F4CE14', borderColor:'rgba(244,206,20,.3)' }}>
          💬 Happy Guests
        </span>
        <h2 className="section-title" style={{ color:'#fff' }}>What People Say</h2>
      </div>
      <div className="reviews__grid">
        {REVIEWS.map((r, i) => (
          <blockquote key={i} className="review-card reveal" aria-label={`Review by ${r.name}`}>
            <p className="review-card__stars" aria-label={`${r.stars} stars`}>{'★'.repeat(r.stars)}</p>
            <p className="review-card__text">"{r.text}"</p>
            <footer className="review-card__author">
              <span className="review-card__avatar" aria-hidden="true">{r.avatar}</span>
              <cite>{r.name}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

/* ── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="about" aria-label="About Little Lemon">
      <div className="about__inner reveal">
        <span className="section-pill">🫒 Our Story</span>
        <h2 className="section-title" style={{ marginTop: 12 }}>About Little Lemon</h2>
        <p className="about__desc">
          Founded in 2010 by siblings <strong>Mario</strong> and <strong>Adriana</strong>,
          Little Lemon brings together the rich traditions of Mediterranean cooking with modern
          culinary techniques. We source ingredients locally and prepare every dish with love,
          care, and decades of family tradition.
        </p>
      </div>
    </section>
  );
}

/* ── HomePage ───────────────────────────────────────────────── */
export default function HomePage() {
  useScrollReveal();
  return (
    <>
      <Hero />
      <PromoBar />
      <Specials />
      <Reviews />
      <About />
    </>
  );
}
