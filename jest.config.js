export default {
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.js',
  transform: {},
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};