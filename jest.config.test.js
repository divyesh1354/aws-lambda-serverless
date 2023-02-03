module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  roots: ['<rootDir>/test'],
  testMatch: ["**/recruitment-nodejs-test.test.ts"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  "modulePaths": [
    "<rootDir>"
  ],
};