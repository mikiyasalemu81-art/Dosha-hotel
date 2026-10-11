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
        paper: 'var(--paper)',
        white: 'var(--white)',
        champagne: 'var(--champagne)',
        sand: 'var(--sand)',
        bronze: {
          DEFAULT: 'var(--bronze)',
          deep: 'var(--bronze-deep)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif-ethiopic)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-noto-sans-ethiopic)', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
        arch: '9999px 9999px 0 0',
      },
      maxWidth: {
        site: '1280px',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        sm: 'var(--shadow-sm)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        arch: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
