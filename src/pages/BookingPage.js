import React from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

export default function BookingPage() {
  return (
    <section className="booking-page" aria-label="Table reservation page">
      <div className="booking-page__inner">

        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span
            className="section-pill"
            style={{ background:'rgba(244,206,20,.15)', color:'#F4CE14', borderColor:'rgba(244,206,20,.3)' }}
          >
            📅 Make a Reservation
          </span>
          <h1 style={{ fontFamily:"'Markazi Text',serif", fontSize:'clamp(2.4rem,4vw,3.2rem)', color:'#fff', marginTop:10 }}>
            Reserve Your Table
          </h1>
          <p style={{ color:'rgba(255,255,255,.6)', marginTop:8, marginBottom:40 }}>
            We'd love to host you. Complete the steps below to book your table.
          </p>
        </div>

        {/* Multi-step form */}
        <BookingForm />

        <p style={{ textAlign:'center', marginTop:24 }}>
          <Link to="/" style={{ color:'rgba(255,255,255,.4)', fontSize:'.85rem' }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </section>
  );
}
