/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // fundo principal
        surface: '#1e293b', // cards

        primary: '#3b82f6', // azul principal
        primaryHover: '#2563eb',
        textWhite: '#fff',

        secondary: '#94a3b8', // texto secundário
        muted: '#64748b',

        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',

        border: '#334155',
      },
    },
  },
  plugins: [],
};
