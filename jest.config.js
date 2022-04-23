module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
