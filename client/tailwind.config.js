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
          black: '#1a1a1a',
          gold: '#d4af37', // Yellow/Gold color
          white: '#ffffff',
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

