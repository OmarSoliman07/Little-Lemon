import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI, timesReducer } from '../data/bookingAPI';

/* ─── validators ──────────────────────────────────────────────── */
const TODAY = new Date().toISOString().split('T')[0];

const validate = {
  date:   v => !v ? 'Please select a date.'
              : v < TODAY ? 'Date cannot be in the past.' : '',
  time:   v => v ? '' : 'Please choose a time slot.',
  guests: v => {
    const n = parseInt(v, 10);
    if (!v)    return 'Number of guests is required.';
    if (n < 1) return 'Minimum 1 guest.';
    if (n > 10)return 'Maximum 10 guests.';
    return '';
  },
  name:  v => v.trim().length >= 2 ? '' : 'Full name must be at least 2 characters.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email.',
  phone: v => v.trim() === '' || /^[+\d\s\-()]{7,}$/.test(v) ? '' : 'Please enter a valid phone number.',
};

/* ─── Step labels ─────────────────────────────────────────────── */
const STEPS = ['Date & Time', 'Your Details', 'Confirm'];

/* ─── Progress bar ────────────────────────────────────────────── */
function ProgressBar({ step }) {
  return (
    <div className="progress" role="list" aria-label="Booking steps">
      {STEPS.map((label, i) => {
        const status = i < step ? 'done' : i === step ? 'active' : '';
        return (
          <React.Fragment key={label}>
            <div className={`progress__step ${status}`} role="listitem">
              <div className="progress__circle" aria-current={i === step ? 'step' : undefined}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="progress__label">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`progress__line ${i < step ? 'done' : ''}`} aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── BookingForm main component ─────────────────────────────── */
export default function BookingForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Available times via useReducer
  const [availableTimes, dispatch] = useReducer(
    timesReducer,
    fetchAPI(new Date().toISOString().split('T')[0])
  );

  // Form data — all fields
  const [form, setForm] = useState({
    date: '', time: '', guests: '', occasion: '',
    name: '', email: '', phone: '', specialRequests: '',
  });

  // Errors
  const [errors, setErrors] = useState({});

  /* ── helpers ─────────────────────────────────────────────── */
  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      dispatch({ type: 'UPDATE_TIMES', date: value });
      setForm(prev => ({ ...prev, date: value, time: '' }));
    }
  };

  const touchField = (name, value) => {
    const msg = validate[name]?.(value ?? form[name]) ?? '';
    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  /* ── step validation ─────────────────────────────────────── */
  const validateStep = (s) => {
    let fields = [];
    if (s === 0) fields = ['date', 'time', 'guests'];
    if (s === 1) fields = ['name', 'email'];
    const newErrors = {};
    fields.forEach(f => {
      const msg = validate[f]?.(form[f]) ?? '';
      if (msg) newErrors[f] = msg;
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  /* ── navigation ──────────────────────────────────────────── */
  const goNext = () => {
    if (!validateStep(step)) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── submit ──────────────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = submitAPI(form);
    if (ok) navigate('/confirmed', { state: { booking: form } });
  };

  /* ── field shorthand ─────────────────────────────────────── */
  const inputProps = (name, type = 'text') => ({
    id:              name,
    name,
    type,
    value:           form[name],
    onChange:        e => setField(name, e.target.value),
    onBlur:          e => touchField(name, e.target.value),
    className:       errors[name] ? 'err' : '',
    'aria-required': ['date','time','guests','name','email'].includes(name) ? 'true' : 'false',
    'aria-invalid':  errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-err` : undefined,
  });

  /* ──────────────────────────────────────────────────────────
     STEP 0 — Date & Time & Guests
  ──────────────────────────────────────────────────────────── */
  const renderStep0 = () => (
    <>
      <h2 className="form-card__title">Pick a Date & Time</h2>
      <p className="form-card__sub">Choose when you'd like to visit Little Lemon.</p>

      {/* Date */}
      <div className="form-group">
        <label htmlFor="date">Reservation Date *</label>
        <input type="date" min={TODAY} {...inputProps('date', 'date')} />
        {errors.date && <p id="date-err" className="err-msg" role="alert">⚠ {errors.date}</p>}
      </div>

      {/* Time slots */}
      <div className="form-group">
        <label>Available Time Slots *</label>
        {!form.date ? (
          <p className="form-hint" style={{ padding: '12px 0', color: '#aaa' }}>
            👆 Select a date first to see available times
          </p>
        ) : availableTimes.length === 0 ? (
          <p className="form-hint" style={{ color: '#e53e3e' }}>
            No available slots for this date. Please choose another.
          </p>
        ) : (
          <div
            className="times-grid"
            role="group"
            aria-label="Available time slots"
          >
            {availableTimes.map(t => (
              <button
                key={t}
                type="button"
                className={`time-btn${form.time === t ? ' selected' : ''}${errors.time && !form.time ? ' err-border' : ''}`}
                onClick={() => setField('time', t)}
                aria-pressed={form.time === t}
                aria-label={`Book table at ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {errors.time && <p id="time-err" className="err-msg" role="alert">⚠ {errors.time}</p>}
      </div>

      {/* Guests */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="guests">Number of Guests *</label>
          <input
            type="number" min="1" max="10" placeholder="1 – 10"
            {...inputProps('guests', 'number')}
          />
          <p id="guests-hint" className="form-hint">Max 10 guests per reservation</p>
          {errors.guests && <p id="guests-err" className="err-msg" role="alert">⚠ {errors.guests}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion (optional)</label>
          <select
            id="occasion"
            name="occasion"
            value={form.occasion}
            onChange={e => setField('occasion', e.target.value)}
          >
            <option value="">Select occasion</option>
            <option value="Birthday">🎂 Birthday</option>
            <option value="Anniversary">💍 Anniversary</option>
            <option value="Business Meal">💼 Business Meal</option>
            <option value="Other Celebration">🎉 Other Celebration</option>
          </select>
          <p className="form-hint">We'll make it extra special!</p>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn--green"
          onClick={goNext}
          aria-label="Go to step 2: your details"
        >
          Next — Your Details →
        </button>
      </div>
    </>
  );

  /* ──────────────────────────────────────────────────────────
     STEP 1 — Personal Details
  ──────────────────────────────────────────────────────────── */
  const renderStep1 = () => (
    <>
      <h2 className="form-card__title">Your Details</h2>
      <p className="form-card__sub">We'll use these to confirm your reservation.</p>

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input placeholder="e.g. John Smith" autoComplete="name" {...inputProps('name')} />
        {errors.name && <p id="name-err" className="err-msg" role="alert">⚠ {errors.name}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input placeholder="you@example.com" autoComplete="email" {...inputProps('email', 'email')} />
        {errors.email && <p id="email-err" className="err-msg" role="alert">⚠ {errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number (optional)</label>
        <input placeholder="+1 (312) 555-0123" autoComplete="tel" {...inputProps('phone', 'tel')} />
        {errors.phone && <p id="phone-err" className="err-msg" role="alert">⚠ {errors.phone}</p>}
      </div>

      {/* Special requests */}
      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests (optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={3}
          value={form.specialRequests}
          onChange={e => setField('specialRequests', e.target.value)}
          placeholder="Allergies, dietary needs, seating preferences…"
          aria-describedby="sr-hint"
        />
        <p id="sr-hint" className="form-hint">We'll do our best to accommodate you.</p>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--outline" onClick={goBack} aria-label="Go back to step 1">
          ← Back
        </button>
        <button type="button" className="btn btn--green" onClick={goNext} aria-label="Go to step 3: review booking">
          Review Booking →
        </button>
      </div>
    </>
  );

  /* ──────────────────────────────────────────────────────────
     STEP 2 — Summary & Confirm
  ──────────────────────────────────────────────────────────── */
  const renderStep2 = () => (
    <>
      <h2 className="form-card__title">Review & Confirm</h2>
      <p className="form-card__sub">Please check your booking details before confirming.</p>

      <div className="summary" role="region" aria-label="Booking summary">
        {[
          ['📅 Date',     form.date],
          ['🕐 Time',     form.time],
          ['👥 Guests',   `${form.guests} guest${form.guests > 1 ? 's' : ''}`],
          ['🎉 Occasion', form.occasion || '—'],
          ['👤 Name',     form.name],
          ['✉️ Email',    form.email],
          ['📞 Phone',    form.phone || '—'],
          ...(form.specialRequests ? [['📝 Requests', form.specialRequests]] : []),
        ].map(([label, value]) => (
          <div key={label} className="summary__row">
            <span className="summary__label">{label}</span>
            <span className="summary__value">{value}</span>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--outline" onClick={goBack} aria-label="Go back and edit details">
          ← Edit Details
        </button>
        <button
          type="submit"
          className="btn btn--green"
          aria-label="Confirm and submit your reservation"
        >
          ✓ Confirm Reservation
        </button>
      </div>
    </>
  );

  /* ─── render ──────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Table reservation form"
      noValidate
    >
      <ProgressBar step={step} />

      <div className="form-card">
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>
    </form>
  );
}
