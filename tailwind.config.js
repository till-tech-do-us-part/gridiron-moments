/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FCD34D',
          dim: 'rgba(245, 158, 11, 0.15)',
        },
        rarity: {
          common: '#9CA3AF',
          rare: '#3B82F6',
          epic: '#A855F7',
          legendary: '#F59E0B',
          ultimate: '#EF4444',
        },
        dark: {
          bg: '#000000',
          card: '#0A0A0A',
          elevated: '#111111',
          surface: '#1A1A1A',
          'surface-2': '#212127',
          'surface-3': '#2B2C33',
          border: '#222222',
          'border-hover': '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', 'sans-serif'],
        condensed: ['"Sofia Sans Extra Condensed"', '"Barlow Condensed"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: [
          'clamp(3rem, 7vw, 5rem)',
          { lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: '900' },
        ],
        section: [
          'clamp(2rem, 4.5vw, 3.5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.01em', fontWeight: '800' },
        ],
        'card-title': [
          'clamp(1.5rem, 2.5vw, 2rem)',
          { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        stat: [
          'clamp(2.5rem, 5vw, 4rem)',
          { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '900' },
        ],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slab-rotate': {
          '0%': { transform: 'rotateY(-15deg)' },
          '100%': { transform: 'rotateY(345deg)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'skeleton-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'slab-rotate': 'slab-rotate 10s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'skeleton-shimmer': 'skeleton-shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
