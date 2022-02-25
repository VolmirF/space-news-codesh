/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  setupFilesAfterEnv: [
    './__tests__/setup.js',
    // can have more setup files here
  ],
};
