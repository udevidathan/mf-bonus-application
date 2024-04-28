module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.tsx",
    "src/components/**/**/*.tsx",
    "src/pages/**/*.tsx",
    "src/pages/**/**/*.tsx",
    "src/Layout/*.tsx"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: ["<rootDir>/testenv.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    "^.+\\.svg$": "<rootDir>/src/__mocks__/svgTransform.js" 
  },
  coverageThreshold: {
    global: {
      // branches: 80,
      functions: 82,
      lines: 85,
      statements: 85,
    },
  },
};
