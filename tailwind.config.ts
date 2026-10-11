import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F4F1E9',
        paper: '#FBF9F4',
        ink: '#15201B',
        forest: '#193B2C',
        moss: '#5F715B',
        limebrand: '#B9F223',
        goldbrand: '#F7D93D',
        clay: '#A76543'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(21,32,27,.10)'
      },
      letterSpacing: {
        editorial: '.18em'
      }
    }
  },
  plugins: []
};
export default config;
