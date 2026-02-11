/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(4px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        'fade-in': 'fade-in 0.8s ease forwards',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        'bounce-slow': 'bounce-slow 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2.4s ease-in-out infinite',
      },
      colors: {
        cream: '#FCFAF8',
        charcoal: '#1A1A1A',
        ink: {
          50: '#f2f2f5',
          100: '#e3e3ea',
          200: '#c4c6d3',
          300: '#9fa3b7',
          400: '#6c6f89',
          500: '#4b4c62',
          600: '#34354a',
          700: '#242436',
          800: '#171724',
          900: '#0d0d17',
        },
        blush: {
          50: '#fff4f6',
          100: '#ffe6ec',
          200: '#ffcfd9',
          300: '#ff9fb4',
          400: '#ff6f90',
          500: '#f25178',
          600: '#d43a64',
          700: '#a1254b',
          800: '#711736',
          900: '#410920',
        },
        golden: {
          50: '#fff8e6',
          100: '#ffeec2',
          200: '#ffd980',
          300: '#ffc347',
          400: '#f7a114',
          500: '#d78007',
          600: '#b26005',
          700: '#8e4704',
          800: '#5f2e02',
          900: '#2f1601',
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        glow: '0 15px 80px rgba(242, 81, 120, 0.35)',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
}

