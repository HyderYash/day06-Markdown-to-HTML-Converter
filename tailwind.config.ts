import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F5F5F7',
          text: '#1C1C1E',
          accent: '#007AFF',
          surface: '#FFFFFF',
          border: '#E5E5EA',
        },
        dark: {
          background: '#000000',
          text: '#F5F5F7',
          accent: '#0A84FF',
          surface: '#1C1C1E',
          border: '#2C2C2E',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        apple: '12px',
        'apple-lg': '20px',
      },
      boxShadow: {
        apple: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        apple: '200ms',
        'apple-slow': '350ms',
      },
      backdropBlur: {
        apple: '20px',
      },
    },
  },
  plugins: [],
}
export default config

