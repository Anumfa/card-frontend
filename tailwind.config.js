/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-gold': '#D4AF37',
        'wedding-dark': '#1a1a2e',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        arabic: ['"Amiri"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
