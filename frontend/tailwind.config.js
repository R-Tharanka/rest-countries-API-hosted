/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.{js,jsx}"],

  // Extend the default theme configuration
  theme: {
    extend: {
      colors: {
        'deep-teal': '#024950',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        drift1: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        drift2: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, 40px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
        drift3: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(25px, 25px)' },
          '100%': { transform: 'translate(0, 0)' }
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'fade-up': 'fadeUp 500ms ease-out forwards',
        'slide-down': 'slide-down 200ms ease-out',
        'scale-in': 'scale-in 150ms ease-out',
        drift1: 'drift1 25s ease-in-out infinite',
        drift2: 'drift2 30s ease-in-out infinite',
        drift3: 'drift3 28s ease-in-out infinite',
      },
    },
  },

  // Add any Tailwind CSS plugins here
  plugins: [],
};