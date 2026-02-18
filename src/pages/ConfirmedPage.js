import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ConfirmedPage() {
  const { state } = useLocation();
  const b = state?.booking;

  return (
    <section className="confirmed" aria-label="Booking confirmed">
      <div className="confirmed__card" role="status" aria-live="polite">
        <div className="confirmed__icon" aria-hidden="true">🎉</div>

        <h1 className="confirmed__title">
          {b ? `You're all set, ${b.name.split(' ')[0]}!` : 'Booking Confirmed!'}
        </h1>

        <p className="confirmed__desc">
          Your table has been reserved successfully at Little Lemon.
          {b?.email && <> A confirmation will be sent to <strong>{b.email}</strong>.</>}
        </p>

        {b && (
          <div className="confirmed__detail" aria-label="Booking details">
            <p>📅 <strong>Date:</strong> {b.date}</p>
            <p>🕐 <strong>Time:</strong> {b.time}</p>
            <p>👥 <strong>Guests:</strong> {b.guests} guest{b.guests > 1 ? 's' : ''}</p>
            {b.occasion && <p>🎉 <strong>Occasion:</strong> {b.occasion}</p>}
            {b.specialRequests && <p>📝 <strong>Requests:</strong> {b.specialRequests}</p>}
          </div>
        )}

        {b?.occasion && (
          <p style={{ color:'#495E57', fontWeight:800, marginBottom:24, fontSize:'1rem' }}>
            🎊 We'll make your {b.occasion} extra special!
          </p>
        )}

        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/" className="btn btn--primary" aria-label="Return to homepage">
            Back to Home
          </Link>
          <Link to="/booking" className="btn btn--outline" aria-label="Make another reservation">
            New Reservation
          </Link>
        </div>
      </div>
    </section>
  );
}
