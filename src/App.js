import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header          from './components/Header';
import Footer          from './components/Footer';
import HomePage        from './pages/HomePage';
import BookingPage     from './pages/BookingPage';
import ConfirmedPage   from './pages/ConfirmedPage';

export default function App() {
  return (
    <Router>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/"          element={<HomePage />}      />
          <Route path="/booking"   element={<BookingPage />}   />
          <Route path="/confirmed" element={<ConfirmedPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
