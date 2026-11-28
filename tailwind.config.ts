import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E1B33',
          900: '#0E1B33',
          800: '#132040',
          700: '#1a2d5a',
          soft: '#1B2A4A',
          ink: '#080f1f',
        },
        gold: {
          DEFAULT: '#C6A04A',
          light: '#D9BD7A',
          deep: '#A8862F',
          faint: 'rgba(198,160,74,0.12)',
          muted: 'rgba(198,160,74,0.18)'
        },
        vermilion: {
          DEFAULT: '#E84C30',
          soft: '#FEF2F0',
          faint: 'rgba(232,76,48,0.10)',
        },
        haze: '#EAF0F7',
        harbour: '#EAF0F7',
        paper: '#FFFBF5',
        cream: '#FFF9EC',
        sand: '#F5EFE6',
        ink: '#0F172A',
        charcoal: '#1E293B'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'sans-serif']
      },
      boxShadow: {
        soft: '0 8px 32px rgba(16,23,43,0.08)',
        card: '0 4px 24px rgba(16,23,43,0.06)',
        lifted: '0 12px 40px rgba(16,23,43,0.12)'
      },
      borderRadius: {
        '2xl': '1.1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
export default config
