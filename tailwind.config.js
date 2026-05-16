/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#384D2E',
        secondary: '#6B8D4D',
        accent: '#D4E09B',
        highlight: '#A57C2B',
        neutral: '#F7F5EC',
      },
    },
  },
  plugins: [],
};