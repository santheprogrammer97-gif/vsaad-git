/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A8F3D',
          green: '#0A8F3D',
          darkGreen: '#056B2D',
          deepGreen: '#034D22',
          forest: '#056B2D',
          deep: '#034D22',
          dark: '#034D22',
          light: '#F7F9F8',
          offWhite: '#F7F9F8',
          surface: '#FFFFFF',
          charcoal: '#111827',
          textDark: '#111827',
          secondary: '#5B6470',
          muted: '#5B6470',
          subtle: '#6B7280',
          border: '#E5E7EB',
          borderLight: '#F3F4F6',
          accent: '#0A8F3D',
        },
        vsaad: {
          obsidian: '#08080A',
          charcoal: '#0F0F14',
          stone: '#171720',
          slate: '#22222E',
          card: '#13131A',
          border: '#2A2A38',
          borderLight: '#3A3A4D',
          purple: {
            DEFAULT: '#A855F7',
            light: '#C084FC',
            electric: '#9333EA',
            deep: '#581C87',
            fissure: '#D946EF',
            glow: 'rgba(168, 85, 247, 0.45)',
            dim: 'rgba(168, 85, 247, 0.15)',
          },
          ivory: {
            DEFAULT: '#F8FAFC',
            warm: '#F5F4EF',
            muted: '#94A3B8',
            dark: '#64748B',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(11, 31, 26, 0.08), 0 8px 10px -6px rgba(11, 31, 26, 0.04)',
        'modal': '0 25px 50px -12px rgba(11, 31, 26, 0.25)',
      },
    },
  },
  plugins: [],
};
