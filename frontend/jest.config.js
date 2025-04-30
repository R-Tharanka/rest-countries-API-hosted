// Jest configuration file
module.exports = {
  // Test environment simulating a browser
  testEnvironment: 'jsdom',

  // Directories for module resolution
  moduleDirectories: ['node_modules', '<rootDir>/src'], // Ensure Jest resolves modules correctly

  // Map module names to specific paths
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    '^.+\\.(css|scss|png|jpg|svg)$': 'identity-obj-proxy', // Mock static assets
  },

  // Transform files before testing
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for JavaScript and JSX files
  },
  
  // Ignore transforming specific node_modules except listed ones
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-dom|@amcharts)/)', // Include @amcharts for transformation
  ],
};