/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'center-sm': '0 0 3px rgba(0, 0, 0, 0.3)',
        'center-lg': '0 0 5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

