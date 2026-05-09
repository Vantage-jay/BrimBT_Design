import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── BrimBT Design Brand Colors ──────────────────────
      colors: {
        brand: {
          black:      '#0a0a0a',
          white:      '#f5f2ee',
          cream:      '#e8e2d9',
          accent:     '#c9a96e',   // gold
          'accent-dark': '#a07840',
          gray:       '#6b6560',
          'light-gray': '#d4cfc9',
        },
      },

      // ── Brand Fonts ───────────────────────────────────────
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],   // headings
        body:    ['DM Sans', 'sans-serif'],          // body text
      },

      // ── Spacing extras ────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },

      // ── Animation ─────────────────────────────────────────
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'ticker':  'ticker 22s linear infinite',
      },

      // ── Screen breakpoints ────────────────────────────────
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

export default config
