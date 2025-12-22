/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffef7',
          100: '#fffcee',
          200: '#fff8d6',
          300: '#fff2b8',
          400: '#ffe88a',
          500: '#ffd700',
          600: '#e6c200',
          700: '#ccaa00',
          800: '#b39200',
          900: '#997a00',
        },
        wedding: {
          black: '#0B0B0B', // Deep Black - Primary Background
          gold: '#D4AF37', // Wedding Gold - Primary Accent
          'soft-gold': '#F4D03F', // Soft Gold - Secondary Gold
          ivory: '#FAF9F6', // Ivory White - Light Background
          charcoal: '#2C2C2C', // Charcoal - Dark Text
          'champagne-gold': '#E6C77D', // Champagne Gold
          'light-gold': '#EADFB4', // Light Gold Border
          white: '#FFFFFF', // Pure White
          'light-gray': '#B0B0B0', // Muted Text
        }
      },
      fontFamily: {
        elegant: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

