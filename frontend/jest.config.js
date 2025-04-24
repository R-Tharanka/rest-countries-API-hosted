// frontend/jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
      },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  