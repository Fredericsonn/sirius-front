/** @type {import('tailwindcss').Config} */
export default {
  future: {
    unstable_tailwindColorPalette: false, // 🔹 This forces Tailwind to use rgb() instead of oklch()
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: { 'inherit': 'inherit' },
      width: { 'inherit': 'inherit' },
    },
    screens: {
      'sm': '640px',
      'sm-2': '740px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'max-s': {'max': '420px'}, 
      'max-sm': {'max': '639px'}, 
      'max-sm-2': {'max': '740px'}, 
      'max-md': {'max': '767px'}, 
      'max-lg': {'max': '1023px'},
      'max-lg-2': {'max': '1094px'},
    },
    keyframes: {
      'modal-pop': {
        '0%': { transform: 'scale(0.9)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
    animation: {
      'modal-pop': 'modal-pop 0.2s ease-out',
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin Typography
    require('@tailwindcss/forms'),      // Plugin Forms
    require('daisyui'),                 // Plugin DaisyUI
  ],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald",
      "corporate", "synthwave", "retro", "cyberpunk", "valentine",
      "halloween", "garden", "forest", "aqua", "lofi", "pastel",
      "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk",
      "autumn", "business", "acid", "lemonade", "night", "coffee",
      "winter", "dim", "nord", "sunset",
    ],
  },
};