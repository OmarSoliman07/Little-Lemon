# 🍋 Little Lemon Restaurant — Capstone Project

React web app for the **Meta Front-End Developer Certificate** capstone.

## 🚀 Quick Start

```bash
npm install
npm start        # → http://localhost:3000
npm test         # run all unit tests
npm run build    # production build
```

## 📁 Structure

```
src/
├── App.js                        ← Router
├── index.js / index.css          ← Entry + Design system
├── data/
│   ├── bookingAPI.js             ← fetchAPI, submitAPI, timesReducer
│   └── menuData.js               ← Menu items & reviews
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── BookingForm.js            ← 3-step booking form ⭐
│   └── BookingForm.test.js       ← Unit tests
└── pages/
    ├── HomePage.js               ← Hero, Specials, Reviews, About
    ├── BookingPage.js            ← Booking page wrapper
    └── ConfirmedPage.js          ← Confirmation screen
```

## ✅ Booking Flow

1. **Step 1** — Pick date → time slots load automatically → pick guests & occasion
2. **Step 2** — Enter name, email, phone, special requests  
3. **Step 3** — Review all details → Confirm → Success screen

## 📤 Deploy to GitHub

```bash
git init
git add .
git commit -m "feat: Little Lemon capstone - full booking flow"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/little-lemon.git
git push -u origin main
```
"# Little-Lemon" 
