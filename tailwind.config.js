/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', 'Inter', 'sans-serif'],
      },
      colors: {
        bg: '#0b0b0b',
        surface: '#0f0f0f',
        muted: '#9aa3ad',
        accent: '#7dd3fc',
        outline: '#e5e7eb'
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(0,0,0,0.6)'
      }
    }
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn-outline': {
          '@apply px-4 py-2 rounded-md text-sm border border-outline inline-flex items-center gap-2': {},
        },
        '.btn-accent': {
          '@apply px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 bg-accent/10 border border-accent': {},
        },
      })
    }
  ],
}