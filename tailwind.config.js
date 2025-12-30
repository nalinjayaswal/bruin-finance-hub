/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: 'hsl(168, 100%, 45%)',      // Primary Action - Bright Cyan
          'cyan-hover': 'hsl(168, 100%, 40%)', // Hover state
          black: '#151715',      // Dark Mode Background
          surface: '#1e221e',    // Dark Mode Card Background
          surfaceLight: '#27272a' // Dark Mode "Pulse" Card Background
        }
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'Barlow', 'sans-serif'],
      }
    }
  },
  plugins: [],
}




