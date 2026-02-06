import type { Config } from 'jest';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const config: Config = {
  rootDir: '.',
  testMatch: ['<rootDir>/test/e2e/**/*.e2e-spec.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setup-env.ts'],
  globalSetup: '<rootDir>/test/setup-global.ts',
  moduleNameMapper: {
    '^(\\.\\.?/.*)\\.js$': '$1',
  },
  maxWorkers: 1,
  forceExit: true,
};

export default config;
