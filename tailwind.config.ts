import type { Config } from 'tailwindcss'

/** Extend with site-wide colours — use as Tailwind utilities, e.g. `bg-brand`, `text-brand-muted` */
export default {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#dc2626',
          muted: '#991b1b',
          dark: '#7f1d1d'
        }
      }
    }
  },
  plugins: []
} satisfies Config
