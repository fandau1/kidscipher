module.exports = {
  preset: 'ts-jest',                  // Use ts-jest for TypeScript
  testEnvironment: 'node',            // Node.js environment
  testMatch: ['**/test/**/*.test.ts'], // Match all .test.ts files under test/
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts'],
  // Transform TypeScript files with ts-jest and specify tsconfig
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    // this is needed so imports without file extension work
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Optional: suppress verbose warning messages
  verbose: true,
};
