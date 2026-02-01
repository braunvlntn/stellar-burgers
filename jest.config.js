module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts'
  ]
};
