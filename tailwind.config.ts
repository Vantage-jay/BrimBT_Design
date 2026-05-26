import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Backgrounds
          black:        '#1a1208',   // deep warm brown-black
          white:        '#faf7f2',   // warm cream
          cream:        '#f2ece2',   // parchment
          surface:      '#f7f3ec',   // main page bg
          'surface-2':  '#ede7da',   // card bg

          // Accent gold
          accent:       '#b8860b',   // dark goldenrod
          'accent-light': '#d4a017', // bright gold
          'accent-dark':  '#8b6508', // deep gold
          'accent-bg':    '#f5edd6', // light gold tint

          // Text
          'text-primary':   '#1a1208',
          'text-secondary': '#5a4e3c',
          'text-muted':     '#9c8e7a',

          // Legacy aliases (so existing code doesn't break)
          gray:         '#9c8e7a',
          'light-gray': '#c4b9a8',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity:'0', transform:'translateY(30px)' },
          '100%': { opacity:'1', transform:'translateY(0)' },
        },
        ticker: {
          '0%':   { transform:'translateX(0)' },
          '100%': { transform:'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'ticker':  'ticker 22s linear infinite',
      },
      screens: {
        'xs':  '480px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        'brand':    '0 2px 16px rgba(184,134,11,0.08), 0 1px 4px rgba(26,18,8,0.06)',
        'brand-lg': '0 4px 32px rgba(184,134,11,0.14), 0 2px 8px rgba(26,18,8,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
