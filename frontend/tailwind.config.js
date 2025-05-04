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
    },
  },

  // Add any Tailwind CSS plugins here
  plugins: [],
};