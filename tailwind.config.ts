import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        charcoal: '#151517',
        graphite: '#232326',
        ivory: '#F7F2E9',
        sand: '#D9CDB8',
        gold: {
          light: '#E6C979',
          DEFAULT: '#C9A24B',
          deep: '#9C7A2E',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E6C979 0%, #C9A24B 55%, #9C7A2E 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #F3DE9E 0%, #DBB75F 55%, #B38E37 100%)',
        'charcoal-fade': 'linear-gradient(180deg, rgba(21, 21, 23, 0.8) 0%, #0B0B0C 100%)',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif-ethiopic)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-noto-sans-ethiopic)', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
        full: '9999px',
      },
      maxWidth: {
        site: '1280px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
