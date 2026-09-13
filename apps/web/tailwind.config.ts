import type { Config } from 'tailwindcss';

// darkMode "media" (padrao do Tailwind) faz o site seguir o tema do
// navegador/SO automaticamente, via prefers-color-scheme - sem precisar
// de nenhum botao ou biblioteca extra de tema.
const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F7F7F5',
          100: '#EDEDE9',
          200: '#D9D9D2',
          400: '#8A8A80',
          600: '#4A4A44',
          800: '#26261F',
          900: '#181812',
          950: '#101009',
        },
        garimpo: {
          400: '#F2B34D',
          500: '#E8A33D',
          600: '#C7822A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};

export default config;
