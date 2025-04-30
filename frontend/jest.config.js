// frontend/jest.config.js
module.exports = {
  // Specifies the test environment to simulate a browser-like environment
  testEnvironment: 'jsdom',

  // Directories Jest should use to search for modules
  moduleDirectories: ['node_modules', 'src'],

  // Maps module names to specific paths for resolving imports
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
  },

  // Specifies how files should be transformed before testing
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript and JSX files using Babel
  },
};