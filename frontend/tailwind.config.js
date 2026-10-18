/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'gov-green': '#0b462d',
        'gov-green-dark': '#083321',
        'gov-gold': '#c59b27',
      }
    },
  },
  plugins: [],
}
