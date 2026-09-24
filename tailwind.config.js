/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0c',
        graphite: '#1b1b1d',
        paper: '#f6f5f2',
        chalk: '#ffffff',
        mist: '#e5e3dd',
        slate2: '#6b6a66',
        accent: '#c8f169',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: { xl2: '1.5rem' },
      boxShadow: { lift: '0 24px 60px -44px rgba(0,0,0,0.5)' },
      transitionTimingFunction: { smooth: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    },
  },
  plugins: [],
};
