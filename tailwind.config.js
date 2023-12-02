/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-yellow': '#FEE3BC',
        'font-gray': '#313341',
      }
    },
  },
  plugins: [],
}