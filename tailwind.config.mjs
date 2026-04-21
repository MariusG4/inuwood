/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"League Spartan"', 'sans-serif'],
      },
      colors: {
        primary: {
          bg: '#F9F7F2',
          text: '#2D2C2C',
        },
        secondary: {
          bg: '#EFECE5',
          text: '#5D4037',
        },
        accent: '#334B49',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'bounce-slow': 'bounceSlow 4s ease-in-out infinite',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
      },
    },
  },
  plugins: [],
};
