/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // Include the main HTML file
    "./src/**/*.{js,jsx,ts,tsx}" // Include JavaScript and TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
