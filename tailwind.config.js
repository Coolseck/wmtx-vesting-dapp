/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xl': '1440px'
      },
      colors: {
        'primary-bg': 'var(--color-primary-bg)',
        'primary': 'var(--color-primary)',
        'light': 'var(--color-light)',
        'light-border': 'var(--color-light-border)',
        'card-bg': 'var(--color-card-bg)',
      },
    },
  },
  plugins: [],
};
