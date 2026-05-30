/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f1b16",
        sand: "#f6efe7",
        clay: "#d9c3ad",
        ember: "#c46b3b",
        gold: "#cfa052",
        dusk: "#f1e2d2"
      },
      boxShadow: {
        soft: "0 18px 36px rgba(31, 27, 22, 0.12)",
        lift: "0 12px 26px rgba(196, 107, 59, 0.22)"
      }
    }
  },
  plugins: []
};
