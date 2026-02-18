/**
 * Simulates fetching available time slots from backend.
 * Returns a deterministic list based on the date (stable for unit tests).
 * @param {string} date - YYYY-MM-DD
 * @returns {string[]} array of "HH:MM" strings
 */
export const fetchAPI = (date) => {
  const ALL  = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const seed = date ? new Date(date).getDate() : 1;
  return ALL.filter((_, i) => (seed + i) % 3 !== 0);
};

/**
 * Simulates submitting a booking to the backend.
 * Replace body with real fetch() call in production.
 * @param {object} formData
 * @returns {boolean}
 */
export const submitAPI = (formData) => {
  console.log("📋 Booking submitted:", formData);
  return true;
};

/**
 * Reducer — manages available time slots.
 * Dispatch { type: "UPDATE_TIMES", date: "YYYY-MM-DD" } to refresh.
 */
export function timesReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return fetchAPI(action.date);
    default:
      return state;
  }
}
