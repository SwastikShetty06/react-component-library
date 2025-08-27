/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f4ff',
          200: '#bfe7ff',
          300: '#99d9ff',
          400: '#4fbfff',
          500: '#0096ff',
          600: '#0077cc',
          700: '#005999',
          800: '#003b66',
          900: '#001d33',
        },
      },
      boxShadow: {
        'card': '0 6px 18px rgba(16,24,40,0.06)',
        'input-focus': '0 0 0 4px rgba(0,150,255,0.12)',
      },
      borderRadius: {
        'btn': '12px',
      }
    },
  },
  plugins: [],
}
