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
        'slide-down': {
          '0%': { transform: 'translateY(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-down': 'slide-down 200ms ease-out',
        'scale-in': 'scale-in 150ms ease-out',
      },
    },
  },

  // Add any Tailwind CSS plugins here
  plugins: [],
};