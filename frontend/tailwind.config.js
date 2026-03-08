/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        spice: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        ember: '#1a0a00',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 70%, #fbbf24 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1a0a00 0%, #0f0600 100%)',
      },
      animation: {
        'flame': 'flame 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scaleY(1) translateY(0)' },
          '100%': { transform: 'scaleY(1.05) translateY(-4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
