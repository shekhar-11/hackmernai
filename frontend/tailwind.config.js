/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'upskillr-blue': '#2563eb',
        'upskillr-light-blue': '#dbeafe',
      },
    },
  },
  plugins: [],
} 