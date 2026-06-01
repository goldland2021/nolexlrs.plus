/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101615",
        sand: "#eee7dc",
        clay: "#ad9a80",
        ember: "#7b5634",
        gold: "#d1a24e",
        dusk: "#cbb89c",
        celadon: "#267267",
        "celadon-deep": "#123d36",
        champagne: "#d1a24e",
        "stay-mist": "#d9d1c4",
        "stay-stone": "#51483f"
      },
      boxShadow: {
        soft: "0 18px 36px rgba(16, 22, 21, 0.16)",
        lift: "0 16px 32px rgba(18, 61, 54, 0.28)"
      }
    }
  },
  plugins: []
};
