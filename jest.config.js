module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/src/index.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupTestFrameworkScriptFile: '<rootDir>/test/setup-test-framework.ts',
  moduleDirectories: ['node_modules', '<rootDir>/src/util']
};
