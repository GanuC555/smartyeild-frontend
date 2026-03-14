import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(228, 30%, 4%)',
        foreground: 'hsl(0, 0%, 95%)',
        guardian: '#3b82f6',
        balancer: '#8b5cf6',
        hunter: '#f59e0b',
        accent: '#14b8a6',
      },
    },
  },
};

export default config;
