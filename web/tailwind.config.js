/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0E17',
          surface: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          accent: '#38BDF8',
          accent2: '#818CF8',
          gold: '#F59E0B',
          green: '#4ADE80',
          red: '#F87171',
          muted: '#64748B',
          text: '#CBD5E1',
          heading: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
